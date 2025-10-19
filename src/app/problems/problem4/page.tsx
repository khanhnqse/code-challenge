import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Problem4Page() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Problem 4</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This problem is coming soon. Check back later for the implementation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Status
            <Badge variant="secondary">Pending</Badge>
          </CardTitle>
          <CardDescription>
            This problem is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The solution for Problem 4 will be implemented soon. Stay tuned for
            updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
