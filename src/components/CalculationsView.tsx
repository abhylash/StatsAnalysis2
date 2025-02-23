import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { calculateStats } from "../utils/statistics";
import ResultsView from "./ResultsView.tsx";

interface CalculationsViewProps {
  rows: any[];
  onBack: () => void;
}

function CalculationsView({ rows, onBack }: CalculationsViewProps) {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [calculations, setCalculations] = useState<any>(null);

  const statisticalProblems = [
    "Mean, Median & Mode (Discrete Data)",
    "Median & Mode (Continuous Data)",
    "Mean Deviation & Std Dev (Discrete Data)",
    "Mean Deviation & Std Dev (Continuous Data)",
    "Skewness & Kurtosis",
    "Correlation Coefficient",
    "Regression (Y on X)",
    "Regression (X on Y)",
    "Straight Line Fit",
    "Parabola Fit",
    "Exponential Curve Fit",
    "Power Curve Fit"
  ];

  const handleProblemSelection = (type: string) => {
    setSelectedProblem(type);
    const results = calculateStats(type, rows);
    setCalculations(results);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Choose Calculation Type</h2>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Data Entry
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {statisticalProblems.map((problem) => (
            <button
              key={problem}
              onClick={() => handleProblemSelection(problem)}
              className={`p-6 text-white rounded-lg transition-colors text-center ${
                selectedProblem === problem 
                  ? 'bg-blue-700 shadow-lg' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {problem}
            </button>
          ))}
        </div>
      </div>

      {selectedProblem && calculations && (
        <ResultsView problem={selectedProblem} calculations={calculations} />
      )}
    </div>
  );
}

export default CalculationsView;