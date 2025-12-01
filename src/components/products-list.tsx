'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { toast } from 'sonner';
import { useAccount, useChainId } from "wagmi";

import ProductCard from "@/components/product-card";
import PRODUCTS from "@/consts/products";
import { USDC_TOKEN_ADDRESS } from "@/consts/usdc";
import { useTokenInfo } from "@/hooks/use-token-info";

export default function ProductsList() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentToastId, setCurrentToastId] = useState<string | number | null>(null);

  const { address } = useAccount();
  const chainId = useChainId();

  const {
    decimals,
    symbol,
    balance,
  } = useTokenInfo(USDC_TOKEN_ADDRESS, chainId, address);

  // Add or remove product price
  const calculateTotalAmount = useCallback((price: number, add: boolean = true) => {
    setTotalAmount(prev => add ? prev + price : prev - price);
  }, []);

  // Check if current total exceeds wallet balance
  const exceedsBalance = useMemo(() => {
    if (!balance || !decimals) return false;
    const totalParsed = parseUnits(totalAmount.toString(), decimals);
    return totalParsed > balance;
  }, [totalAmount, balance, decimals]);

  // Show persistent warning toast if total exceeds balance
  useEffect(() => {
    if (!exceedsBalance) return;

    // dismiss previous PayButton toast if any
    if (currentToastId) {
      toast.dismiss(currentToastId);
      setCurrentToastId(null);
    }

    if (exceedsBalance && balance && symbol && decimals) {
      toast.warning(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Insufficient balance</span>
          <span>
            Your total is <b>{totalAmount} {symbol}</b>, but your wallet has{' '}
            {balance && decimals ? <b>{formatUnits(balance, decimals)} {symbol}</b> : '…'}.
            Top up or remove some products before trying again.
          </span>
        </div>,
      );
    }
  }, [exceedsBalance, totalAmount, balance, symbol, decimals, currentToastId]);

  return (
    <div className="mx-auto mb-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {PRODUCTS?.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          calculateTotalAmount={calculateTotalAmount}
          isDisabledBuy={exceedsBalance}
          registerToastId={setCurrentToastId} // Pass callback for PayButton toast ID
        />
      ))}
    </div>
  );
}
