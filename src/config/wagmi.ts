import { cookieStorage,createStorage,  createConfig, http, injected } from '@wagmi/core';
import * as wagmiChains from '@wagmi/core/chains'; // imports all exported chains
import { metaMask, walletConnect } from 'wagmi/connectors';

import { PROJECT_ID } from '@/consts/usdc';

const allChains = Object.values(wagmiChains);
const firstChain = allChains[0];

export const config = createConfig({
  chains: [firstChain, ...allChains.filter(c => c.id !== firstChain.id)], // first chain + rest
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: PROJECT_ID }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  // allow us to communicate with certain blockchain network (JSON RPC), http use by default ir
  transports: allChains.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  ssr: true,
});
