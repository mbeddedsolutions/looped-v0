import React from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function SetupSteps({ currentStep }) {
  const steps = [
    { number: 1, title: "Prepare", description: "Get the phone ready" },
    { number: 2, title: "Discover", description: "Find the device" },
    { number: 3, title: "Connect", description: "Set up Wi-Fi" },
    { number: 4, title: "Complete", description: "Name the phone" }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step.number 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-slate-300 text-slate-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step.number}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-slate-300'
                }`} />
              )}
            </div>
            <div className="text-center mt-2">
              <p className="text-xs font-medium text-slate-900">{step.title}</p>
              <p className="text-xs text-slate-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}