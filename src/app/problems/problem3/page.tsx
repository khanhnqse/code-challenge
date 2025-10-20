import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IssuesAnalysis,
  CodeComparison,
  DetailedExplanation,
} from "./components";

export default function Problem3Page() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Problem 3: Code Analysis & Refactoring
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Analysis of computational inefficiencies and anti-patterns in
          React/TypeScript code, with a refactored solution.
        </p>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Issues Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Code Comparison</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <IssuesAnalysis />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <CodeComparison />
        </TabsContent>

        <TabsContent value="explanation" className="space-y-6">
          <DetailedExplanation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
