"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
  disabled?: boolean;
}

export function SwapButton({ onSwap, disabled = false }: SwapButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onSwap}
        className="rounded-full"
        disabled={disabled}
      >
        <ArrowUpDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
