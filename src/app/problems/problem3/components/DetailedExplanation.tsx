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
    <Card className="border-2 border-dashed border-muted-foreground/20">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="w-5 h-5 text-blue-400" />
          Detailed Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 bg-muted/10">
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">

            Issues Fixed
          </h3>
          <div className="space-y-4">
            {fixes.map((fix, index) => (
              <div key={index} className="p-4rounded-lg">
                <h4 className="font-medium text-white mb-3">
                  {index + 1}. {fix.title}
                </h4>
                <div className="space-y-2 text-sm bg-background rounded-lg p-4">
                  <div>
                    <span className="text-green-200 font-medium">Before:</span>
                    <code className="block mt-1 p-2 bg-red-900/20 border border-red-800/30 rounded text-red-300 text-xs font-mono">
                      {fix.before}
                    </code>
                  </div>
                  <div>
                    <span className="text-green-200 font-medium">After:</span>
                    <code className="block mt-1 p-2 bg-green-900/20 border border-green-800/30 rounded text-green-300 text-xs font-mono">
                      {fix.after}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
            Performance Improvements
          </h3>
          <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-sm text-yellow-100">
              {performanceImprovements.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  <strong className="text-yellow-200">{item.split(":")[0]}:</strong> {item.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
            Best Practices Applied
          </h3>
          <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-sm text-blue-100">
              {bestPractices.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  <strong className="text-blue-200">{item.split(":")[0]}:</strong> {item.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
