"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  pricesLoading: boolean;
  canSwap: boolean;
  hasErrors: boolean;
}

export function SubmitButton({
  isSubmitting,
  pricesLoading,
  canSwap,
  hasErrors,
}: SubmitButtonProps) {
  const getButtonText = () => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing Swap...
        </>
      );
    }

    if (pricesLoading) {
      return (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading Prices...
        </>
      );
    }

    return "Swap Tokens";
  };

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isSubmitting || pricesLoading || !canSwap || hasErrors}
    >
      {getButtonText()}
    </Button>
  );
}
