import React, { useState } from "react";
import { Calculator } from "lucide-react";
import DataEntryView from "./components/DataEntryView.tsx";
import CalculationsView from "./components/CalculationsView.tsx";

function App() {
  const [rowsLimit, setRowsLimit] = useState("");
  const [rows, setRows] = useState([]);
  const [showCalculations, setShowCalculations] = useState(false);

  const handleCalculate = () => {
    setShowCalculations(true);
  };

  const handleBack = () => {
    setShowCalculations(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="h-10 w-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Statistical Analysis Dashboard</h1>
        </div>

        {showCalculations ? (
          <CalculationsView rows={rows} onBack={handleBack} />
        ) : (
          <DataEntryView
            rows={rows}
            setRows={setRows}
            rowsLimit={rowsLimit}
            setRowsLimit={setRowsLimit}
            onCalculate={handleCalculate}
          />
        )}
      </div>
    </div>
  );
}

export default App;