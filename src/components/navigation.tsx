"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const problems = [
  {
    id: "problem1",
    title: "Problem 1",
    description: "Three unique implementations of sum_to_n function",
    status: "completed",
  },
  {
    id: "problem2",
    title: "Problem 2",
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
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
            >
              99Tech
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {problems.map((problem, index) => (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.id}`}
                  className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <Button
                    variant={
                      pathname === `/problems/${problem.id}`
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    className="h-8 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20"
                  >
                    {problem.title}
                  </Button>
                  <Badge
                    variant={
                      problem.status === "completed" ? "default" : "secondary"
                    }
                    className="text-xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm"
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
    </>
  );
}
