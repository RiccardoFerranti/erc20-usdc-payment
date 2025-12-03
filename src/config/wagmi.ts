import { cookieStorage, createStorage, createConfig, http, injected } from '@wagmi/core';
import * as wagmiChains from '@wagmi/core/chains';

const allChains = Object.values(wagmiChains);
const firstChain = allChains[0];

let connectors = [injected()];

// Only load MetaMask and WalletConnect in browser
if (typeof window !== 'undefined') {
  const { metaMask, walletConnect } = require('wagmi/connectors');
  const { PROJECT_ID } = require('@/consts/usdc');

  connectors.push(metaMask());
  connectors.push(walletConnect({ projectId: PROJECT_ID }));
}

export const config = createConfig({
  chains: [firstChain, ...allChains.filter(c => c.id !== firstChain.id)],
  connectors,
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }),
  transports: allChains.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  ssr: true,
});
