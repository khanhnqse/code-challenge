"use client";

import { Button } from "@/components/ui/button";

interface ClearFormButtonProps {
  show: boolean;
  disabled: boolean;
  onClear: () => void;
}

export function ClearFormButton({
  show,
  disabled,
  onClear,
}: ClearFormButtonProps) {
  if (!show) return null;

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClear}
      className="w-full"
      disabled={disabled}
    >
      Clear Form
    </Button>
  );
}
