"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  text: string;
  stepTitle: string;
  stepNumber: number;
  onCommand: (command: string) => void;
}

export function VoiceGuide({ text, stepTitle, stepNumber, onCommand }: Props) {
  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Check browser support
  useEffect(() => {
    const hasSpeech =
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      "SpeechRecognition" in window;
    const hasWebkitSpeech =
      typeof window !== "undefined" && "webkitSpeechRecognition" in window;

    if (!hasSpeech && !hasWebkitSpeech) {
      setSupported(false);
    }
  }, []);

  // Speak the step text
  const speak = useCallback(() => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `Step ${stepNumber}: ${stepTitle}. ${text}`
    );
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Female")
    );
    if (enVoice) utterance.voice = enVoice;

    window.speechSynthesis.speak(utterance);
  }, [text, stepTitle, stepNumber]);

  // Start listening for voice commands
  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const last = event.results[event.results.length - 1];
      const transcript = last[0].transcript.toLowerCase().trim();
      setSpokenText(transcript);

      // Match voice commands
      if (transcript.includes("next")) onCommand("next");
      else if (transcript.includes("back") || transcript.includes("go back"))
        onCommand("back");
      else if (transcript.includes("repeat") || transcript.includes("again"))
        onCommand("repeat");
      else if (transcript.includes("stop")) onCommand("stop");
    };

    recognition.onend = () => {
      if (listening) recognition.start(); // Keep listening
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening, onCommand]);

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  // Speak on mount
  useEffect(() => {
    speak();
  }, [speak]);

  // Start/stop listening based on state
  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
    return () => stopListening();
  }, [listening]);

  if (!supported) {
    return (
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
        <p className="text-sm text-gray-500">
          Voice control is not supported in this browser. Try Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-purple-800 flex items-center gap-2">
          <span className={listening ? "animate-pulse" : ""}>🎤</span>
          Voice Guide Active
        </h4>
        <button
          onClick={() => {
            stopListening();
            onCommand("stop");
          }}
          className="text-xs text-purple-600 hover:underline"
        >
          Turn Off
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={speak}
          className="px-3 py-1.5 text-xs font-medium bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          🔄 Repeat Step
        </button>
        <button
          onClick={() => setListening(!listening)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            listening
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200"
          }`}
        >
          {listening ? "⏹ Stop Listening" : "🎙 Start Listening"}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["next", "back", "repeat", "stop"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => onCommand(cmd)}
            className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Say &ldquo;{cmd}&rdquo;
          </button>
        ))}
      </div>

      {listening && (
        <div className="mt-3 flex items-center gap-2 text-sm text-purple-600">
          <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
          Listening...
          {spokenText && (
            <span className="text-gray-400 italic">
              Heard: &ldquo;{spokenText}&rdquo;
            </span>
          )}
        </div>
      )}
    </div>
  );
}
