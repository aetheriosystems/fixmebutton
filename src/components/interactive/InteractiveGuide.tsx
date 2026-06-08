"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { StepCard, type Step } from "./StepCard";
import { BranchingHelp } from "./BranchingHelp";
import { VoiceGuide } from "./VoiceGuide";

interface Props {
  slug: string;
  steps: Step[];
}

export function InteractiveGuide({ slug, steps }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep - 1];

  // Load saved progress on mount
  useEffect(() => {
    fetch(`/api/guides/${slug}/progress`)
      .then((r) => r.json())
      .then((data) => {
        if (data.currentStep > 1) setCurrentStep(data.currentStep);
        if (data.isCompleted) setIsComplete(true);
      })
      .catch(() => {}); // Not logged in or no progress yet
  }, [slug]);

  // Save progress on step change
  const saveProgress = async (stepNum: number, completed = false) => {
    setSaving(true);
    try {
      await fetch(`/api/guides/${slug}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentStep: stepNum, isCompleted: completed }),
      });
    } catch {
      // Silent fail — progress saving is best-effort
    } finally {
      setSaving(false);
    }
  };

  const goNext = () => {
    if (currentStep >= totalSteps) {
      setIsComplete(true);
      saveProgress(totalSteps, true);
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      saveProgress(next);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveProgress(prev);
    }
  };

  const goToStep = (stepNum: number) => {
    setCurrentStep(stepNum);
    saveProgress(stepNum);
  };

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case "next":
        goNext();
        break;
      case "back":
        goBack();
        break;
      case "repeat":
        // Re-trigger TTS for current step
        break;
      case "stop":
        setVoiceEnabled(false);
        break;
    }
  };

  // Completion screen
  if (isComplete) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          All Done!
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          You&apos;ve completed all {totalSteps} steps. Great job!
        </p>
        <button
          onClick={() => {
            setIsComplete(false);
            setCurrentStep(1);
          }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <ProgressBar current={currentStep} total={totalSteps} />

      {/* Step */}
      <StepCard step={step} stepNumber={currentStep} />

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goBack}
          disabled={currentStep === 1}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          {/* I'm Stuck */}
          <button
            onClick={() => setShowBranch(!showBranch)}
            className="px-4 py-2.5 text-sm font-medium text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
          >
            {showBranch ? "Hide Help" : "I'm Stuck"}
          </button>

          {/* Voice Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              voiceEnabled
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : "text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {voiceEnabled ? "🎤 Voice On" : "🎤 Voice"}
          </button>
        </div>

        <button
          onClick={goNext}
          disabled={saving}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {currentStep === totalSteps ? "Finish ✓" : "Next →"}
        </button>
      </div>

      {/* Branching Help */}
      {showBranch && (
        <div className="mt-4">
          <BranchingHelp currentStep={currentStep} step={step} />
        </div>
      )}

      {/* Voice Guide */}
      {voiceEnabled && (
        <VoiceGuide
          text={step.content}
          stepTitle={step.title}
          stepNumber={currentStep}
          onCommand={handleVoiceCommand}
        />
      )}
    </div>
  );
}
