export interface Token {
  symbol: string;
  name: string;
  iconUrl: string;
  price?: number;
}

export interface SwapFormData {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
}

export interface PriceData {
  [symbol: string]: number;
}
