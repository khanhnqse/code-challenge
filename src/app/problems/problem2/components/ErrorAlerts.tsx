"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorAlertsProps {
  errors: Record<string, string>;
  pricesError: string | null;
  onRetryPrices: () => void;
}

export function ErrorAlerts({
  errors,
  pricesError,
  onRetryPrices,
}: ErrorAlertsProps) {
  return (
    <>
      {/* General Error */}
      {errors.general && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {/* Price Loading Error */}
      {pricesError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              Failed to load token prices. Some features may not work correctly.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetryPrices}
              className="ml-2"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
