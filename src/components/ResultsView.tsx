import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter
} from "recharts";

interface ResultsViewProps {
  problem: string;
  calculations: any;
}

function ResultsView({ problem, calculations }: ResultsViewProps) {
  const formatTableValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') {
      if (value.x !== undefined && value.y !== undefined) {
        return `(${value.x.toFixed(2)}, ${value.y.toFixed(2)})`;
      }
      return JSON.stringify(value);
    }
    if (typeof value === 'number') return value.toFixed(2);
    return value;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{problem}</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Formulas</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            {Object.entries(calculations.formulas).map(([key, formula]) => (
              <p key={key} className="mb-2">
                <span className="font-medium capitalize">{key}: </span>
                {formula}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Calculation Steps</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(calculations.steps.calculationTable[0]).map(key => (
                    <th 
                      key={key} 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calculations.steps.calculationTable.map((row: any, index: number) => (
                  <tr key={index}>
                    {Object.values(row).map((value: any, i: number) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap">
                        {formatTableValue(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Final Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Measure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(calculations.results).map(([key, value]: [string, any]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatTableValue(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Visualizations</h3>
          <div className="space-y-6">
            {["Correlation Coefficient", "Regression (Y on X)", "Regression (X on Y)"].includes(problem) ? (
              <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <ScatterChart
                  width={800}
                  height={300}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="X" />
                  <YAxis type="number" dataKey="y" name="Y" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter
                    name="Data Points"
                    data={calculations.steps.calculationTable}
                    fill="#3B82F6"
                  />
                  {calculations.results.regressionLine && (
                    <Line
                      type="monotone"
                      data={calculations.results.regressionLine}
                      dataKey="y"
                      stroke="#10B981"
                      name="Regression Line"
                      dot={false}
                    />
                  )}
                </ScatterChart>
              </div>
            ) : (
              <>
                <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                  <BarChart 
                    width={800} 
                    height={300} 
                    data={calculations.steps.calculationTable}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="classInterval" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="frequency" fill="#3B82F6" name="Frequency" />
                  </BarChart>
                </div>

                {(calculations.results.fittedLine || calculations.results.fittedCurve) && (
                  <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                    <ScatterChart
                      width={800}
                      height={300}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="x" name="X" />
                      <YAxis type="number" dataKey="y" name="Y" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter
                        name="Data Points"
                        data={calculations.steps.calculationTable}
                        fill="#3B82F6"
                      />
                      <Line
                        type="monotone"
                        data={calculations.results.fittedLine || calculations.results.fittedCurve}
                        dataKey="y"
                        stroke="#10B981"
                        name="Fitted Line"
                        dot={false}
                      />
                    </ScatterChart>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsView;