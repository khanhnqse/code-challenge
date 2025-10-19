"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const problems = [
  {
    id: "problem1",
    title: "Three Ways to Sum to N",
    description: "Three unique implementations of sum_to_n function",
    status: "completed",
  },
  {
    id: "problem2",
    title: "Currency Swap Form",
    description: "Interactive currency swap with real-time rates",
    status: "completed",
  },
  {
    id: "problem3",
    title: "Problem 3",
    description: "Code Analysis & Refactoring",
    status: "completed",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              Code Challenge
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {problems.map((problem) => (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.id}`}
                  className="flex items-center space-x-2"
                >
                  <Button
                    variant={
                      pathname === `/problems/${problem.id}`
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    className="h-8"
                  >
                    {problem.title}
                  </Button>
                  <Badge
                    variant={
                      problem.status === "completed" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {problem.status}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
