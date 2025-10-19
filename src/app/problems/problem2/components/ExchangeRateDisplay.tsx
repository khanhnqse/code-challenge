"use client";

import { TrendingUp } from "lucide-react";

interface ExchangeRateDisplayProps {
  exchangeRate: number | null;
  fromToken: { symbol: string } | null;
  toToken: { symbol: string } | null;
  priceImpact: number | null;
  minimumReceived: string;
}

export function ExchangeRateDisplay({
  exchangeRate,
  fromToken,
  toToken,
  priceImpact,
  minimumReceived,
}: ExchangeRateDisplayProps) {
  const exchangeRateDisplay =
    exchangeRate && fromToken && toToken
      ? `1 ${fromToken.symbol} = ${exchangeRate.toFixed(6)} ${toToken.symbol}`
      : "";

  if (!exchangeRateDisplay) return null;

  return (
    <div className="space-y-2">
      <div className="text-center text-sm text-muted-foreground">
        {exchangeRateDisplay}
      </div>
      {priceImpact && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          <span className="text-orange-500">
            Price Impact: {priceImpact.toFixed(2)}%
          </span>
        </div>
      )}
      {minimumReceived && (
        <div className="text-center text-xs text-muted-foreground">
          Minimum received: {minimumReceived} {toToken?.symbol}
        </div>
      )}
    </div>
  );
}
