import { SwapForm } from "./components/SwapForm";
import { ImplementationNotes } from "./components/ImplementationNotes";

export default function Problem2Page() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Problem 2: Currency Swap Form</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern, intuitive currency swap form with real-time exchange rates,
          token selection, and interactive validation.
        </p>
      </div>

      <SwapForm />

      <ImplementationNotes />
    </div>
  );
}
