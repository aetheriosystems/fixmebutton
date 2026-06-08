"use client";

import { useState } from "react";
import type { Step } from "./StepCard";

const BRANCHES: Record<string, { question: string; options: { label: string; result: string }[] }[]> = {
  // Generic troubleshooting branches
  default: [
    {
      question: "Is the button or option visible on your screen?",
      options: [
        { label: "Yes, I see it", result: "Great! Tap or click it, then continue to the next step." },
        { label: "No, it's not there", result: "Try scrolling down. Some settings are hidden below the visible area. If you still don't see it, check that you're in the right menu or screen." },
      ],
    },
    {
      question: "Did the action work as expected?",
      options: [
        { label: "Yes, it worked", result: "Perfect! You can move on to the next step." },
        { label: "No, nothing happened", result: "Try again. Sometimes it takes a second tap or a longer press. If it still doesn't work, try restarting the app or device and come back to this step." },
      ],
    },
  ],
};

interface Props {
  currentStep: number;
  step: Step;
}

export function BranchingHelp({ currentStep, step }: Props) {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const branches = BRANCHES.default;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
      <h4 className="font-semibold text-orange-800 mb-3">
        🆘 Troubleshooting Help for Step {currentStep}
      </h4>
      <p className="text-sm text-orange-600 mb-4">
        &ldquo;{step.title}&rdquo;
      </p>

      {branches.map((branch, bi) => (
        <div key={bi} className="mb-4 last:mb-0">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {branch.question}
          </p>
          <div className="flex flex-wrap gap-2">
            {branch.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => {
                  setSelectedBranch(bi);
                  setSelectedOption(oi);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedBranch === bi && selectedOption === oi
                    ? "bg-orange-600 text-white"
                    : "bg-white text-orange-700 border border-orange-300 hover:bg-orange-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {selectedBranch === bi && selectedOption !== null && (
            <div className="mt-2 p-3 bg-white border border-orange-200 rounded-lg">
              <p className="text-sm text-gray-700">
                💡 {branch.options[selectedOption].result}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
