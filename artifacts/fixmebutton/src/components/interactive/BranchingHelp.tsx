import { useState } from "react";
import type { Step } from "./StepCard";

interface Props {
  currentStep: number;
  step: Step;
}

const TIPS: Record<number, string[]> = {
  1: ["Make sure your device is turned on and charged", "Try restarting it first", "Check the manual for your specific model"],
  2: ["Move closer to the device you're connecting to", "Turn off and back on the feature you're using", "Check for interference from other devices"],
  3: ["Take a photo of your screen for reference", "Try Googling the exact error message you see", "Ask someone nearby to take a look too"],
};

export function BranchingHelp({ currentStep, step }: Props) {
  const [expanded, setExpanded] = useState(false);
  const tips = TIPS[currentStep] || [
    "Double-check each previous step was done correctly",
    "A restart often fixes many tech problems",
    "Search online for the specific error message",
  ];

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h4 className="font-semibold text-orange-800">Having trouble with this step?</h4>
          <p className="text-sm text-orange-600 mt-0.5">{step.title}</p>
        </div>
        <span className="text-orange-600 text-xl">{expanded ? "↑" : "↓"}</span>
      </button>
      {expanded && (
        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium text-orange-800">Try these:</p>
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-orange-700">
              <span className="font-bold mt-0.5">{i + 1}.</span>
              <span>{tip}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-orange-200">
            <p className="text-xs text-orange-500">
              Still stuck?{" "}
              <a href="mailto:help@fixmebutton.com" className="underline font-medium">Email us</a>{" "}
              and we&apos;ll help.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
