'use client';

import { ExternalLink } from 'lucide-react';
import { useMemo } from 'react';
import { useAccount, useChainId } from 'wagmi';

import BackButton from '@/components/back-button';
import { Badge } from '@/components/ui/badge';
import { ETHERSCAN_SEPOLIA, USDC_TOKEN_ADDRESS } from '@/consts/usdc';
import { cn } from '@/lib/utils';
import useTxStore from '@/store/tx-store';
import { shortenAddress } from '@/utils/short-address';
import useSymbol from '@/hooks/use-symbol';
import { Skeleton } from '@/components/ui/skeleton';

export default function LatestTransactionsPage() {
  const { isConnected } = useAccount();

  // Subscribe to the store; automatically re-renders when store updates
  const allTransactions = useTxStore((state) => state.transactions);

  const transactions = useMemo(() => allTransactions.slice(0, 10), [allTransactions]);

  const chainId = useChainId();

  const { symbol, isSymbolLoading } = useSymbol(USDC_TOKEN_ADDRESS, chainId);

  if (!isConnected) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        Please connect your wallet to see your transactions.
      </div>
    );
  }

  if (!transactions.length) {
    return <div className="p-6 text-center text-gray-600 dark:text-gray-300">No transactions yet.</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full flex items-center">
        <div className="flex-1">
          <BackButton className="flex z-10" />
        </div>
        <h1 className="flex-1 text-center text-xl md:text-2xl">Latest Transactions</h1>
        <div className="flex-1" />
      </div>
      <div className="flex flex-col gap-4">
        {transactions.map((tx) => (
          <div
            key={tx.hash}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg bg-white
            dark:bg-black relative"
          >
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-semibold">From:</span> {shortenAddress(tx.hash)}
              </div>
              <div>
                <span className="font-semibold">To:</span> {shortenAddress(tx.recipient)}
              </div>
              <div>
                <span className="font-semibold flex items-center gap-2">
                  Amount: {tx.amount} <span>{isSymbolLoading ? <Skeleton className="h-4 w-[50px]" /> : symbol ?? 'USDC'}</span>
                </span>
              </div>
              <div>
                <span className="font-semibold">Time:</span> {new Date(tx.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 mt-2 md:mt-0">
              <Badge
                className={cn(
                  `px-3 py-1 text-sm absolute top-4 right-4 md:static md:self-end`,
                  tx.status === 'success'
                    ? `bg-green-100 text-green-700 border border-green-400 dark:bg-green-900 dark:text-green-300`
                    : '',
                  tx.status === 'failed' ? `bg-red-100 text-red-700 border border-red-400 dark:bg-red-900 dark:text-red-300` : '',
                  tx.status === 'pending'
                    ? `bg-yellow-100 text-yellow-700 border border-yellow-400 dark:bg-yellow-900 dark:text-yellow-300`
                    : '',
                )}
              >
                {tx.status.toUpperCase()}
              </Badge>

              <a
                href={`${ETHERSCAN_SEPOLIA}${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View on Etherscan <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
