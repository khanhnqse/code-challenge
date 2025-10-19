import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/CandidateCard";

const problems = [
  {
    id: "problem1",
    title: "Three Ways to Sum to N",
    description:
      "Three unique implementations of sum_to_n function using iterative, mathematical formula, and recursive approaches.",
    status: "completed",
  },
  {
    id: "problem2",
    title: "Currency Swap Form",
    description:
      "Interactive currency swap form with real-time exchange rates, token selection, and validation.",
    status: "completed",
  },
  {
    id: "problem3",
    title: "Code Analysis & Refactoring",
    description:
      "Comprehensive analysis of computational inefficiencies and anti-patterns in React/TypeScript code with refactored solution.",
    status: "completed",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Code Challenge Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of coding challenge solutions built with Next.js,
            TypeScript, and shadcn/ui
          </p>
        </div>

        {/* Candidate Information */}
        <CandidateCard />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{problem.title}</CardTitle>
                <Badge
                  variant={
                    problem.status === "completed" ? "default" : "secondary"
                  }
                >
                  {problem.status}
                </Badge>
              </div>
              <CardDescription>{problem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/problems/${problem.id}`}>
                <Button
                  className="w-full"
                  variant={
                    problem.status === "completed" ? "default" : "outline"
                  }
                  disabled={problem.status === "pending"}
                >
                  {problem.status === "completed"
                    ? "View Solution"
                    : "Coming Soon"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui</p>
      </div>
    </div>
  );
}
