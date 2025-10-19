"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TokenSelector } from "./TokenSelector";
import { TOKENS } from "../tokenData";
import { Token } from "../types";

interface TokenInputSectionProps {
  label: string;
  token: Token | null;
  amount: string;
  estimatedValue?: string;
  tokens: Token[];
  errors: Record<string, string>;
  onTokenSelect: (token: Token) => void;
  onAmountChange: (amount: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function TokenInputSection({
  label,
  token,
  amount,
  estimatedValue,
  tokens,
  errors,
  onTokenSelect,
  onAmountChange,
  placeholder = "0.0",
  readOnly = false,
}: TokenInputSectionProps) {
  const fieldKey = label.toLowerCase().replace(" ", "");

  return (
    <div className="space-y-2">
      <Label htmlFor={`${fieldKey}-token`}>{label}</Label>
      <TokenSelector
        tokens={tokens}
        selectedToken={token}
        onTokenSelect={onTokenSelect}
        placeholder={`Select token to swap ${label.toLowerCase()}`}
        totalTokens={TOKENS.length}
      />
      {errors[`${fieldKey}Token`] && (
        <p className="text-sm text-destructive">{errors[`${fieldKey}Token`]}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${fieldKey}-amount`}>
          {label === "From" ? "Amount" : "You will receive"}
        </Label>
        <div className="relative">
          <Input
            id={`${fieldKey}-amount`}
            type={readOnly ? "text" : "number"}
            placeholder={placeholder}
            value={amount}
            onChange={
              readOnly ? undefined : (e) => onAmountChange(e.target.value)
            }
            onKeyDown={
              readOnly
                ? undefined
                : (e) => {
                    // Prevent multiple decimal points
                    if (e.key === "." && amount.includes(".")) {
                      e.preventDefault();
                    }
                    // Prevent negative numbers
                    if (e.key === "-") {
                      e.preventDefault();
                    }
                  }
            }
            className={`${estimatedValue ? "pr-20" : ""} ${
              errors[`${fieldKey}Amount`] ? "border-destructive" : ""
            } ${readOnly ? "bg-muted" : ""}`}
            min={readOnly ? undefined : "0"}
            step={readOnly ? undefined : "0.000001"}
            readOnly={readOnly}
          />
          {estimatedValue && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {estimatedValue}
            </div>
          )}
        </div>
        {errors[`${fieldKey}Amount`] && (
          <p className="text-sm text-destructive">
            {errors[`${fieldKey}Amount`]}
          </p>
        )}
      </div>
    </div>
  );
}
