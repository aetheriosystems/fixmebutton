export interface Step {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

export function StepCard({ step, stepNumber }: { step: Step; stepNumber: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
          {stepNumber}
        </span>
        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
      </div>
      <div className="prose prose-lg prose-blue max-w-none text-gray-600">
        <p>{step.content}</p>
      </div>
      {step.image && (
        <div className="mt-6">
          <img
            src={step.image}
            alt={step.imageAlt || step.title}
            width={720}
            height={480}
            className="rounded-xl shadow-md mx-auto"
          />
        </div>
      )}
    </div>
  );
}
