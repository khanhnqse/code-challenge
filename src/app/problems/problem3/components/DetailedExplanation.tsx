import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const fixes = [
  {
    title: "Filter Logic Correction",
    before: "balance.amount <= 0 (kept negative balances)",
    after: "balance.amount > 0 (keeps positive balances)",
  },
  {
    title: "Variable Reference Fix",
    before: "lhsPriority (undefined variable)",
    after: "balancePriority (correct variable name)",
  },
  {
    title: "Complete Sort Function",
    before: "Missing return for equal priorities",
    after: "return priorityB - priorityA (complete comparison)",
  },
  {
    title: "Performance Optimization",
    before: "Multiple separate operations",
    after: "Single chained operation with proper memoization",
  },
  {
    title: "Type Safety",
    before: "blockchain: any",
    after: "Blockchain union type with constants",
  },
];

const performanceImprovements = [
  "Reduced Re-renders: Proper memoization prevents unnecessary recalculations",
  "Single Pass Processing: Combined filter, sort, and map into one operation",
  "Stable Keys: Using blockchain-currency combination instead of array index",
  "Type Safety: Compile-time error detection instead of runtime errors",
  "Memory Efficiency: Eliminated intermediate arrays and redundant calculations",
];

const bestPractices = [
  "Single Responsibility: Each operation has a clear purpose",
  "Immutability: No mutations of original data",
  "Predictable Behavior: Consistent sorting and filtering logic",
  "Error Handling: Safe property access with fallbacks",
  "Code Readability: Clear variable names and logical flow",
];

export function DetailedExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-500" />
          Detailed Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">🔧 Issues Fixed:</h3>
          <div className="space-y-3">
            {fixes.map((fix, index) => (
              <div key={index} className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">
                  {index + 1}. {fix.title}
                </h4>
                <p className="text-sm text-green-700">
                  <strong>Before:</strong> <code>{fix.before}</code>
                  <br />
                  <strong>After:</strong> <code>{fix.after}</code>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">⚡ Performance Improvements:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {performanceImprovements.map((item, index) => (
              <li key={index}>
                <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">🎯 Best Practices Applied:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {bestPractices.map((item, index) => (
              <li key={index}>
                <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
