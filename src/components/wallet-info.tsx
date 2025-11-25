"use client";

import { useAccount, useConnect } from 'wagmi';

import { Button } from '@/components/ui/button';

export default function WalletInfo() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) return null;

  return (
    <div className='flex flex-col items-center gap-3'>
      {connectors
        .filter((c) => c.name.toLowerCase() !== "keplr")
        .map((c) => (
          <Button
            className="w-full max-w-75 font-medium rounded-md px-4 py-2 bg-indigo-500 hover:bg-indigo-600 focus:outline-none
            cursor-pointer text-white"
            type="button"
            key={c.id}
            onClick={() => connect({ connector: c })}
          >
            Connect {c.name}
          </Button>
      ))}
    </div>
  );
}
