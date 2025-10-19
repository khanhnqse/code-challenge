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
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./solution";

export default function Problem1Page() {
  const [inputValue, setInputValue] = useState("5");
  const [results, setResults] = useState<{
    methodA: number | null;
    methodB: number | null;
    methodC: number | null;
    executionTimes: { methodA: number; methodB: number; methodC: number };
  } | null>(null);

  const testFunctions = () => {
    const n = parseInt(inputValue);

    if (isNaN(n) || n < 0) {
      alert("Please enter a valid non-negative number.");
      return;
    }

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

  const runPerformanceTest = () => {
    const testValues = [100, 1000, 5000];
    let results = "Performance Comparison:\n\n";

    testValues.forEach((n) => {
      // Test Method A
      const startA = performance.now();
      for (let i = 0; i < 1000; i++) sum_to_n_a(n);
      const timeA = (performance.now() - startA) / 1000;

      // Test Method B
      const startB = performance.now();
      for (let i = 0; i < 1000; i++) sum_to_n_b(n);
      const timeB = (performance.now() - startB) / 1000;

      // Test Method C (limited to smaller values for recursion)
      let timeC = "N/A";
      if (n <= 1000) {
        const startC = performance.now();
        for (let i = 0; i < 100; i++) sum_to_n_c(n);
        timeC = ((performance.now() - startC) / 100).toFixed(4) + "ms";
      }

      results += `n = ${n}:\n`;
      results += `  Method A: ${timeA.toFixed(4)}ms (1000 iterations)\n`;
      results += `  Method B: ${timeB.toFixed(4)}ms (1000 iterations)\n`;
      results += `  Method C: ${timeC} ${
        n <= 1000 ? "(100 iterations)" : "(skipped - too large for recursion)"
      }\n\n`;
    });

    alert(results);
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
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              {`var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};`}
            </pre>
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
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              {`var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};`}
            </pre>
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
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              {`var sum_to_n_c = function(n) {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
};`}
            </pre>
          </CardContent>
        </Card>
      </div>

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
              <Input
                id="testInput"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                min="0"
                max="10000"
                className="w-32"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={testFunctions}>Test All Methods</Button>
              <Button onClick={runPerformanceTest} variant="outline">
                Performance Test
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
