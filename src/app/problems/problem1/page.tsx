"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./solution";

export default function Problem1Page() {
  const [inputValue, setInputValue] = useState("5");
  const [inputError, setInputError] = useState<string>("");
  const [results, setResults] = useState<{
    methodA: number | null;
    methodB: number | null;
    methodC: number | null;
    executionTimes: { methodA: number; methodB: number; methodC: number };
  } | null>(null);

  const validateInput = (value: string) => {
    if (value === "") {
      setInputError("Please enter a number");
      return false;
    }

    const n = parseInt(value);
    
    if (isNaN(n)) {
      setInputError("Please enter a valid number");
      return false;
    }

    if (n < 0) {
      setInputError("Number must be non-negative");
      return false;
    }

    if (n > 10000) {
      setInputError("Number must be ≤ 10,000 (prevents stack overflow in recursive method)");
      return false;
    }

    setInputError("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };

  const testFunctions = () => {
    if (!validateInput(inputValue)) {
      return;
    }

    const n = parseInt(inputValue);

    // Test Method A
    const startA = performance.now();
    const resultA = sum_to_n_a(n);
    const timeA = performance.now() - startA;

    // Test Method B
    const startB = performance.now();
    const resultB = sum_to_n_b(n);
    const timeB = performance.now() - startB;

    // Test Method C
    const startC = performance.now();
    const resultC = sum_to_n_c(n);
    const timeC = performance.now() - startC;

    setResults({
      methodA: resultA,
      methodB: resultB,
      methodC: resultC,
      executionTimes: { methodA: timeA, methodB: timeB, methodC: timeC },
    });
  };


  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Problem 1: Three Ways to Sum to N
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Three unique implementations of the sum_to_n function using different
          approaches: iterative, mathematical formula, and recursive.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Method A: Iterative
              <Badge variant="outline">O(n)</Badge>
            </CardTitle>
            <CardDescription>
              Uses a simple for loop to iterate from 1 to n and accumulate the
              sum.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="javascript"
              code={`var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Method B: Mathematical Formula
              <Badge variant="outline">O(1)</Badge>
            </CardTitle>
            <CardDescription>
              Uses Gauss&apos;s formula: n(n+1)/2 to calculate the sum directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="javascript"
              code={`var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Method C: Recursive
              <Badge variant="outline">O(n)</Badge>
            </CardTitle>
            <CardDescription>
              Uses recursion to break down the problem into smaller subproblems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="javascript"
              code={`var sum_to_n_c = function(n) {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
};`}
            />
          </CardContent>
        </Card>
      </div>

      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Input Limit: 10,000</strong> - This limit prevents stack overflow in the recursive method (Method C). 
          Each recursive call adds to the call stack, and JavaScript has a maximum call stack size. 
          Larger values would cause the browser to crash with &quot;Maximum call stack size exceeded&quot; error.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Test the Functions</CardTitle>
          <CardDescription>
            Enter a number to test all three implementations and compare their
            performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="testInput">Enter a number (n):</Label>
              <div className="space-y-1">
                <Input
                  id="testInput"
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  min="0"
                  max="10000"
                  className={`w-32 ${inputError ? "border-red-500" : ""}`}
                />
                {inputError && (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      {inputError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={testFunctions}
                disabled={!!inputError || inputValue === ""}
              >
                Test All Methods
              </Button>
            </div>
          </div>

          {results && (
            <div className="space-y-4 p-4 bg-muted rounded-md">
              <h4 className="font-semibold">Results for n = {inputValue}:</h4>
              <div className="grid gap-2 md:grid-cols-3">
                <div className="p-3 bg-background rounded border">
                  <p className="font-medium">Method A (Iterative)</p>
                  <p className="text-2xl font-bold">{results.methodA}</p>
                  <p className="text-sm text-muted-foreground">
                    {results.executionTimes.methodA.toFixed(4)}ms
                  </p>
                </div>
                <div className="p-3 bg-background rounded border">
                  <p className="font-medium">Method B (Formula)</p>
                  <p className="text-2xl font-bold">{results.methodB}</p>
                  <p className="text-sm text-muted-foreground">
                    {results.executionTimes.methodB.toFixed(4)}ms
                  </p>
                </div>
                <div className="p-3 bg-background rounded border">
                  <p className="font-medium">Method C (Recursive)</p>
                  <p className="text-2xl font-bold">{results.methodC}</p>
                  <p className="text-sm text-muted-foreground">
                    {results.executionTimes.methodC.toFixed(4)}ms
                  </p>
                </div>
              </div>
              <div className="text-center">
                <Badge
                  variant={
                    results.methodA === results.methodB &&
                    results.methodB === results.methodC
                      ? "default"
                      : "destructive"
                  }
                >
                  All results equal:{" "}
                  {results.methodA === results.methodB &&
                  results.methodB === results.methodC
                    ? "✓ Yes"
                    : "✗ No"}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
