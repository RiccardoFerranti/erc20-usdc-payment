import { isAddress } from "viem";

import { Input } from "@/components/ui/input";
import { Label } from "@/components//ui/label";
import { useRecipient } from "@/app/recipient-provider";
import { cn } from "@/lib/utils";

export default function RecipientAddress() {
  const { recipient, setRecipient, recipientError, setRecipientError } = useRecipient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value as `0x${string}`);
    if (e.target.value === '') {
      setRecipientError("Recipient address is required");
      return;
    }
    setRecipientError(isAddress(e.target.value) ? undefined : "Invalid Ethereum address");
  };

  return (
    <div className="flex flex-col items-start gap-3 w-full text-sm">
      <p>This is the default demo recipient address (Sepolia). All purchased USDC will be sent to this address. You can
        replace it with your own wallet below.</p>
      <div className="flex items-center gap-3 w-full">
      <Label htmlFor="recipient">Recipient Address:</Label>
      <Input
        id="recipient"
        value={recipient}
        onChange={handleChange}
        aria-invalid={!!recipientError}
        className={cn(
          "px-3 py-2 rounded-md text-sm max-w-[380px] flex-1",
          recipientError
            ? "border-red-500 focus-visible:border-red-500"
            : "border-gray-300 focus-visible:border-indigo-500"
        )}
      />
      {recipientError && <span className="text-red-500 text-xs">{recipientError}</span>}
      </div>
    </div>
  );
}
