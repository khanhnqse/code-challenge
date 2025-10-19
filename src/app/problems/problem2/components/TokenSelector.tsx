"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Token } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, X } from "lucide-react";
import { useImageError } from "../hooks/useImageError";

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  placeholder?: string;
  disabled?: boolean;
  totalTokens?: number;
}

export function TokenSelector({
  tokens,
  selectedToken,
  onTokenSelect,
  placeholder = "Select token",
  disabled = false,
  totalTokens,
}: TokenSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { handleImageError, getImageSrc } = useImageError();

  // Memoize filtered tokens for better performance
  const filteredTokens = useMemo(() => {
    if (!searchTerm.trim()) return tokens;

    const term = searchTerm.toLowerCase();
    return tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(term) ||
        token.name.toLowerCase().includes(term)
    );
  }, [tokens, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full justify-between h-12 px-3"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {selectedToken ? (
            <>
              <Image
                src={getImageSrc(selectedToken.iconUrl)}
                alt={selectedToken.symbol}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
                onError={() => handleImageError(selectedToken.iconUrl)}
              />
              <div className="text-left">
                <div className="font-medium">{selectedToken.symbol}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedToken.name}
                </div>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-8 pr-8"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            {totalTokens && totalTokens > tokens.length && (
              <div className="text-xs text-muted-foreground mt-2 px-2">
                Showing {tokens.length} of {totalTokens} tokens (only tokens
                with prices)
              </div>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredTokens.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No tokens found
              </div>
            ) : (
              filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors focus:bg-muted focus:outline-none"
                  onClick={() => {
                    onTokenSelect(token);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <Image
                    src={getImageSrc(token.iconUrl)}
                    alt={token.symbol}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                    onError={() => handleImageError(token.iconUrl)}
                  />
                  <div className="text-left flex-1">
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {token.name}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {token.price && (
                      <div className="text-sm text-muted-foreground">
                        ${token.price.toFixed(2)}
                      </div>
                    )}
                    {selectedToken?.symbol === token.symbol && (
                      <Badge variant="secondary" className="text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
