import { useState } from "react";
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

  const totalSteps = steps.length;
  const step = steps[currentStep - 1];

  const goNext = () => {
    if (currentStep >= totalSteps) {
      setIsComplete(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
        <p className="text-lg text-gray-500 mb-8">You've completed all {totalSteps} steps. Great job!</p>
        <button
          onClick={() => { setIsComplete(false); setCurrentStep(1); }}
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
