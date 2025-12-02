// import type { CreateConnectorFn } from '@wagmi/core';
import { cookieStorage, createStorage, createConfig, http, injected } from '@wagmi/core';
import * as wagmiChains from '@wagmi/core/chains';

const allChains = Object.values(wagmiChains);
const firstChain = allChains[0];

// let connectors: CreateConnectorFn[]  = [];

// if (typeof window !== 'undefined') {
//   const { injected } = require('wagmi/connectors');
//   const { metaMask, walletConnect } = require('wagmi/connectors');
//   const { PROJECT_ID } = require('@/consts/usdc');

//   connectors = [
//     injected(),
//     metaMask(),
//     walletConnect({ projectId: PROJECT_ID }),
//   ];
// }

export const config = createConfig({
  chains: [firstChain, ...allChains.filter(c => c.id !== firstChain.id)],
  connectors:[injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: allChains.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  ssr: true,
});
