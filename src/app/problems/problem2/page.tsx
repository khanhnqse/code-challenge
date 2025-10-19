import { SwapForm } from "./components/SwapForm";
import { ImplementationNotes } from "./components/ImplementationNotes";
import { Badge } from "@/components/ui/badge";

export default function Problem2Page() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Problem 2: Currency Swap Form</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern, intuitive currency swap form with real-time exchange rates,
          token selection, and interactive validation.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="default">Completed</Badge>
          <Badge variant="outline">Interactive</Badge>
          <Badge variant="outline">Real-time Rates</Badge>
        </div>
      </div>

      <SwapForm />

      <ImplementationNotes />
    </div>
  );
}
