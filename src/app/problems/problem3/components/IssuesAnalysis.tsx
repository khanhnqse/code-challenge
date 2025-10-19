import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IssueAlert } from "./IssueAlert";
import { Bug, Zap } from "lucide-react";

const criticalIssues = [
  {
    number: 1,
    title: "Incorrect Filter Logic",
    description:
      "The filter condition is inverted - it returns true when balance is ≤ 0, which filters OUT positive balances instead of keeping them.",
  },
  {
    number: 2,
    title: "Undefined Variable",
    description:
      "`lhsPriority` is used but never defined. Should be `balancePriority`.",
  },
  {
    number: 3,
    title: "Incomplete Sort Function",
    description:
      "The sort function doesn't return anything when priorities are equal, causing inconsistent sorting.",
  },
  {
    number: 4,
    title: "Unused Dependencies",
    description:
      "`prices` is in useMemo dependencies but never used in the calculation.",
  },
  {
    number: 5,
    title: "Performance Issues",
    description:
      "Multiple unnecessary re-renders and calculations due to poor memoization.",
  },
];

const computationalInefficiencies = [
  "Redundant Calculations: `getPriority()` called multiple times for same blockchain",
  "Unnecessary Array Operations: Multiple map operations instead of single transformation",
  "Poor Memoization: Missing dependencies and incorrect dependency arrays",
  "Inefficient Filtering: Filter logic runs on every render",
  "Array Index as Key: Using index as React key causes unnecessary re-renders",
];

const antiPatterns = [
  "Any Type Usage: `blockchain: any` removes type safety",
  "Magic Numbers: Hard-coded priority values without constants",
  "Mixed Responsibilities: Component handles both data processing and rendering",
  "Unused Props: `children` is destructured but never used",
  "Inconsistent Naming: `lhs`/`rhs` vs `left`/`right` variable naming",
];

export function IssuesAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-red-500" />
            Critical Issues Found
          </CardTitle>
          <CardDescription>
            Major computational inefficiencies and anti-patterns identified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {criticalIssues.map((issue) => (
            <IssueAlert
              key={issue.number}
              issueNumber={issue.number}
              title={issue.title}
              description={issue.description}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Performance Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold">Computational Inefficiencies:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {computationalInefficiencies.map((item, index) => (
                <li key={index}>
                  <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Anti-patterns:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {antiPatterns.map((item, index) => (
                <li key={index}>
                  <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
