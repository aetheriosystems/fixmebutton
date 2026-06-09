import { useState, useEffect, useCallback } from "react";
import { ProgressBar } from "./ProgressBar";
import { StepCard, type Step } from "./StepCard";
import { BranchingHelp } from "./BranchingHelp";
import { VoiceGuide } from "./VoiceGuide";
import { useAuth } from "@/lib/auth-context";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Props {
  slug: string;
  steps: Step[];
}

interface ProgressData {
  currentStep: number;
  isCompleted: boolean;
}

export function InteractiveGuide({ slug, steps }: Props) {
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep - 1];

  // Load saved progress on mount (only when authenticated)
  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/guides/${slug}/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? (r.json() as Promise<ProgressData>) : null))
      .then((data) => {
        if (data) {
          setCurrentStep(data.currentStep || 1);
          setIsComplete(data.isCompleted || false);
        }
      })
      .catch(() => {});
  }, [slug, token]);

  // Save progress after each step change (only when authenticated)
  const saveProgress = useCallback(
    (step: number, completed: boolean) => {
      if (!token) return;
      fetch(`${API_BASE}/api/guides/${slug}/progress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentStep: step, isCompleted: completed }),
      }).catch(() => {});
    },
    [slug, token]
  );

  const goNext = () => {
    if (currentStep >= totalSteps) {
      setIsComplete(true);
      saveProgress(currentStep, true);
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      saveProgress(next, false);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveProgress(prev, false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command === "next") goNext();
    else if (command === "back") goBack();
    else if (command === "stop") setVoiceEnabled(false);
  };

  if (isComplete) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">All Done!</h2>
        <p className="text-lg text-gray-500 mb-8">
          You've completed all {totalSteps} steps. Great job!
        </p>
        <button
          onClick={() => {
            setIsComplete(false);
            setCurrentStep(1);
            saveProgress(1, false);
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
      <ProgressBar current={currentStep} total={totalSteps} />
      <StepCard step={step} stepNumber={currentStep} />
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goBack}
          disabled={currentStep === 1}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBranch(!showBranch)}
            className="px-4 py-2.5 text-sm font-medium text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
          >
            {showBranch ? "Hide Help" : "I'm Stuck"}
          </button>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${voiceEnabled ? "bg-purple-100 text-purple-700 border border-purple-200" : "text-gray-500 border border-gray-200 hover:bg-gray-50"}`}
          >
            {voiceEnabled ? "🎤 Voice On" : "🎤 Voice"}
          </button>
        </div>
        <button
          onClick={goNext}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentStep === totalSteps ? "Finish ✓" : "Next →"}
        </button>
      </div>
      {showBranch && (
        <div className="mt-4">
          <BranchingHelp currentStep={currentStep} step={step} />
        </div>
      )}
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
