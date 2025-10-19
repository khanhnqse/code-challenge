"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  show: boolean;
}

export function SuccessMessage({ show }: SuccessMessageProps) {
  if (!show) return null;

  return (
    <Alert>
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>
        Swap completed successfully! Your tokens have been exchanged.
      </AlertDescription>
    </Alert>
  );
}
