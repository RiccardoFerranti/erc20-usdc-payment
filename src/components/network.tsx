import { useAccount, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";

import { Badge } from "@/components/ui/badge";

export default function Network() {
  const chainId = useChainId();
  const { isConnected, chain } = useAccount();

  if (!isConnected) return null;

  if (chainId !== sepolia.id) {
    return (
      <Badge
        className="p-2 rounded-md text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border
        border-red-400 dark:border-red-600"
      >
        {chain?.name ?? "Unknown"}
      </Badge>
    );
  }

  return (
    <Badge
      className="p-2 rounded-md text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border
      border-indigo-400 dark:border-indigo-700"
    >
      {chain?.name}
    </Badge>
  );
}
