"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as DefaultWagmiProvider } from 'wagmi';

import { config } from '@/config/wagmi';

const queryClient = new QueryClient();

interface IProviders {
  children: React.ReactNode;
}

export default function WagmiProvider({ children }: IProviders) {
  return (
    <DefaultWagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </DefaultWagmiProvider>
  );
}
