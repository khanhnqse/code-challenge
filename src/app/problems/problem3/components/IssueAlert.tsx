import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface IssueAlertProps {
  issueNumber: number;
  title: string;
  description: string;
}

export function IssueAlert({
  issueNumber,
  title,
  description,
}: IssueAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>
          {issueNumber}. {title}:
        </strong>{" "}
        {description}
      </AlertDescription>
    </Alert>
  );
}
