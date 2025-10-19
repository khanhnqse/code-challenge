import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";
import { Token } from "../types";

interface SwapResultsProps {
  show: boolean;
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number | null;
  priceImpact: number | null;
  minimumReceived: string;
  estimatedValue: string;
  onClose: () => void;
}

export function SwapResults({
  show,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  exchangeRate,
  priceImpact,
  minimumReceived,
  estimatedValue,
  onClose,
}: SwapResultsProps) {
  if (!show || !fromToken || !toToken) return null;

  const swapDetails = [
    {
      label: "Exchange Rate",
      value: exchangeRate
        ? `1 ${fromToken.symbol} = ${exchangeRate.toFixed(6)} ${toToken.symbol}`
        : "N/A",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: "Price Impact",
      value: priceImpact ? `${priceImpact.toFixed(2)}%` : "< 0.01%",
      icon: <TrendingUp className="w-4 h-4" />,
      warning: priceImpact && priceImpact > 1,
    },
    {
      label: "Minimum Received",
      value: `${minimumReceived} ${toToken.symbol}`,
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      label: "Estimated Value",
      value: estimatedValue,
      icon: <DollarSign className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Swap Completed Successfully!
        </CardTitle>
        <CardDescription className="text-green-700">
          Your tokens have been exchanged successfully
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Swap Summary */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {fromAmount}
              </div>
              <div className="text-sm text-gray-600">{fromToken.symbol}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{toAmount}</div>
              <div className="text-sm text-gray-600">{toToken.symbol}</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Transaction Details */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Transaction Details
          </h4>

          <div className="grid gap-3">
            {swapDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  {detail.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {detail.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {detail.warning && (
                    <Badge variant="destructive" className="text-xs">
                      High Impact
                    </Badge>
                  )}
                  <span
                    className={`text-sm font-mono ${
                      detail.warning ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {detail.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />
      </CardContent>
    </Card>
  );
}
