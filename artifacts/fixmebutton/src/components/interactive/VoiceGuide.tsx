import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  text: string;
  stepTitle: string;
  stepNumber: number;
  onCommand: (command: string) => void;
}

export function VoiceGuide({ text, stepTitle, stepNumber, onCommand }: Props) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speak = useCallback((t: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(t);
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  }, []);

  useEffect(() => {
    speak(`Step ${stepNumber}: ${stepTitle}`);
    return () => { window.speechSynthesis?.cancel(); };
  }, [stepNumber, stepTitle, speak]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Voice recognition isn't supported in this browser."); return; }
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript.toLowerCase().trim();
      setTranscript(t);
      if (t.includes("next")) onCommand("next");
      else if (t.includes("back") || t.includes("previous")) onCommand("back");
      else if (t.includes("stop") || t.includes("quit")) onCommand("stop");
      else if (t.includes("repeat") || t.includes("read")) speak(`Step ${stepNumber}: ${stepTitle}. ${text}`);
    };
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-purple-800">Voice Guide Active</p>
          <p className="text-xs text-purple-500 mt-0.5">Say "next", "back", or "repeat"</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => speak(`Step ${stepNumber}: ${stepTitle}. ${text}`)}
            className="px-3 py-1.5 text-xs text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            {speaking ? "🔊 Playing..." : "🔊 Read Aloud"}
          </button>
          <button
            onClick={listening ? stopListening : startListening}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${listening ? "bg-purple-600 text-white" : "text-purple-700 border border-purple-200 hover:bg-purple-100"}`}
          >
            {listening ? "🎤 Listening..." : "🎤 Listen"}
          </button>
        </div>
      </div>
      {transcript && (
        <p className="mt-2 text-xs text-purple-600 italic">You said: "{transcript}"</p>
      )}
    </div>
  );
}
