import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface DataEntryViewProps {
  rows: any[];
  setRows: (rows: any[]) => void;
  rowsLimit: string;
  setRowsLimit: (limit: string) => void;
  onCalculate: () => void;
}

function DataEntryView({ rows, setRows, rowsLimit, setRowsLimit, onCalculate }: DataEntryViewProps) {
  const [currentInput, setCurrentInput] = useState({
    classInterval: "",
    frequency: ""
  });
  const [error, setError] = useState("");

  const isValidClassInterval = (interval: string) => {
    const pattern = /^\d+-\d+$/;
    if (!pattern.test(interval)) return false;
    const [min, max] = interval.split("-").map(Number);
    return min < max;
  };

  const handleRowsLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value > "0") {
      setRowsLimit(value);
      if (parseInt(value) < rows.length) {
        setRows([]);
      }
    } else {
      setRowsLimit("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setCurrentInput(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleAddRow = () => {
    setError("");

    if (!rowsLimit) {
      setError("Please set a rows limit first");
      return;
    }

    if (!isValidClassInterval(currentInput.classInterval)) {
      setError("Class interval must be in format 'x-x' (e.g., 10-20)");
      return;
    }

    if (!currentInput.frequency || isNaN(Number(currentInput.frequency)) || Number(currentInput.frequency) <= 0) {
      setError("Frequency must be a positive number");
      return;
    }

    if (rows.length >= parseInt(rowsLimit)) {
      setError("Row limit reached");
      return;
    }

    const newRow = {
      id: Date.now(),
      classInterval: currentInput.classInterval,
      frequency: parseInt(currentInput.frequency)
    };

    setRows([...rows, newRow]);
    setCurrentInput({ classInterval: "", frequency: "" });
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Rows Limit"
            value={rowsLimit}
            onChange={handleRowsLimitChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <input
            type="text"
            placeholder="Class Interval (e.g., 10-20)"
            value={currentInput.classInterval}
            onChange={(e) => handleInputChange(e, 'classInterval')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Frequency"
            value={currentInput.frequency}
            onChange={(e) => handleInputChange(e, 'frequency')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <button 
            onClick={handleAddRow}
            disabled={!rowsLimit || rows.length >= parseInt(rowsLimit)}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Row
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {rows.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Interval
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.classInterval}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.frequency}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {rows.length > 0 && rows.length === parseInt(rowsLimit) && (
          <button 
            onClick={onCalculate}
            className="mt-8 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Calculate
          </button>
        )}
      </div>
    </div>
  );
}

export default DataEntryView;