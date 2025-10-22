import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/CandidateCard";

const problems = [
  {
    id: "problem1",
    title: "[Problem 1] Three Ways to Sum to N",
    description:
      "Three unique implementations of sum_to_n function using iterative, mathematical formula, and recursive approaches.",
  },
  {
    id: "problem2",
    title: "[Problem 2] Fancy Form",
    description:
      "Interactive currency swap form with real-time exchange rates, token selection, and validation.",
  },
  {
    id: "problem3",
    title: "[Problem 3] Messy React",
    description:
      "Comprehensive analysis of computational inefficiencies and anti-patterns in React/TypeScript code with refactored solution.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
          [ GetLinks x 99Tech] - Code Challenge Test for Frontend Role
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
              </div>
              <CardDescription>{problem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/problems/${problem.id}`}>
                <Button
                  className="w-full"
                >
                  View Solution
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui </p>
        <p>I used ChatGPT as a reference for ideas and best practices during implementation.</p>
      </div>
    </div>
  );
}
