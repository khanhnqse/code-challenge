"use client";

import { Loader2 } from "lucide-react";

interface PriceLoadingIndicatorProps {
  show: boolean;
}

export function PriceLoadingIndicator({ show }: PriceLoadingIndicatorProps) {
  if (!show) return null;

  return (
    <div className="mt-4 text-center text-sm text-muted-foreground">
      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
      Loading token prices...
    </div>
  );
}
