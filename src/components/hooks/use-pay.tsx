'use client';

import { useState } from 'react';
import { useAccount, useChainId, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import { sepolia } from 'viem/chains';
import { erc20Abi, parseUnits } from 'viem';
import { toast } from 'sonner';
import { ExternalLink } from 'lucide-react';

import { ETHERSCAN_SEPOLIA, USDC_TOKEN_ADDRESS } from '@/consts/usdc';
import useUserBalance from '@/hooks/useUserBalance';
import useDecimals from '@/hooks/useDecimals';
import useSymbol from '@/hooks/useSymbol';
import { config } from '@/config/wagmi';
import getErrorMessage from '@/utils/get-error-message';
import getErrorDetails from '@/utils/get-error-details';
import { useRecipient } from '@/app/recipient-provider';

interface IUsePayProps {
  price: number;
  name: string;
  calculateTotalAmount: (price: number, add?: boolean) => void;
  registerToastId: (id: string | number) => void;
}

export function usePay(props: IUsePayProps) {
  const { price, name, calculateTotalAmount, registerToastId } = props;

  const [isTxPending, setTxPending] = useState(false);

  const { isConnected } = useAccount();
  const chainId = useChainId();

  const { balance, isBalanceLoading, isBalanceError, refetchBalance } = useUserBalance(USDC_TOKEN_ADDRESS);
  const { decimals, isDecimalsLoading, isDecimalsError } = useDecimals(USDC_TOKEN_ADDRESS);
  const { symbol, isSymbolLoading, isSymbolError } = useSymbol(USDC_TOKEN_ADDRESS);

  const { recipient, recipientError } = useRecipient();

  const { writeContractAsync } = useWriteContract();

  const showToast = {
    walletNotConnected: () =>
      toast.info(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Wallet not connected</span>
          <span>Connect your wallet before buying {name}.</span>
        </div>
      ),
    networkError: () =>
      toast.warning(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Network error</span>
          <span>Wrong network. Please switch to <b>Sepolia</b>.</span>
        </div>
      ),
    loadingWalletData: () =>
      toast.info(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Loading wallet data…</span>
          <span>Please wait while we fetch your balance and token info.</span>
        </div>
      ),
    walletError: () =>
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Wallet error</span>
          <span>Cannot read your balance or token metadata.</span>
        </div>
      ),
    recipientRequired: () =>
      toast.warning(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Recipient Address Required</span>
          <span>Please enter a valid recipient wallet address.</span>
        </div>
      ),
    recipientInvalid: () =>
      toast.warning(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Invalid Recipient Address</span>
          <span>The address you entered is not valid. Please check and try again.</span>
        </div>
      ),
    insufficientBalance: () =>
      toast.warning(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Insufficient balance</span>
          <span>You don’t have enough {symbol} to buy <b>{name}</b>. Top up before trying again.</span>
        </div>
      ),
    waitingConfirmation: () =>
      toast.loading(
        <div className="flex flex-col gap-2">
          <span className="font-bold">Waiting for wallet confirmation…</span>
          <span>Paying <b>{price} {symbol}</b> for {name}</span>
        </div>,
        { duration: Infinity }
      ),
    transactionBroadcasted: (txHash: string) =>
      toast.loading(
        <div className="flex flex-col gap-2">
          <span className="font-bold">Transaction broadcasted</span>
          <span className="inline">
            It may take a few moments to be included in a block.{' '}
            <a
              href={`${ETHERSCAN_SEPOLIA}${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline font-bold"
              title="View transaction on Etherscan"
              aria-label="View transaction on Etherscan"
            >
              See your Tx <ExternalLink size={16} />
            </a>
          </span>
        </div>,
        { duration: Infinity }
      ),
    paymentSuccess: (txHash: string) =>
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Payment successful</span>
          <span>
            Your transaction was included in the blockchain.
            <a
              href={`${ETHERSCAN_SEPOLIA}${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-300 hover:underline font-bold"
              title="View transaction on Etherscan"
              aria-label="View transaction on Etherscan"
            >
              See your Tx <ExternalLink size={16} />
            </a>
          </span>
        </div>
      ),
  };

  const handlePayment = async () => {
    if (!isConnected) return showToast.walletNotConnected();
    if (chainId !== sepolia.id) return showToast.networkError();
    if (isBalanceLoading || isDecimalsLoading || isSymbolLoading) return showToast.loadingWalletData();
    if (isBalanceError || isDecimalsError || isSymbolError || !balance || !decimals || !symbol) return showToast.walletError();
    if (!recipient) return showToast.recipientRequired();
    if (recipientError) return showToast.recipientInvalid();

    const amount = parseUnits(price.toString(), decimals);
    if (balance < amount) return showToast.insufficientBalance();

    let toastIdBroadcast: string | number = '';
    setTxPending(true);

    const toastIdApproval = showToast.waitingConfirmation();
    registerToastId(toastIdApproval);

    try {
      calculateTotalAmount(price);

      const txHash = await writeContractAsync({
        address: USDC_TOKEN_ADDRESS,
        functionName: 'transfer',
        abi: erc20Abi,
        args: [recipient as `0x${string}`, amount],
      });

      if (toastIdApproval) toast.dismiss(toastIdApproval);

      toastIdBroadcast = showToast.transactionBroadcasted(txHash);

      const receipt = await waitForTransactionReceipt(config, {
        hash: txHash,
        confirmations: 3,
      });

      if (receipt.status === 'success') {
        toast.dismiss(toastIdBroadcast);
        showToast.paymentSuccess(txHash);
        refetchBalance();
        calculateTotalAmount(price, false);
      }
    } catch (err: unknown) {
      calculateTotalAmount(price, false);

      console.error(err);
      const errorMessage = getErrorMessage(err);

      if (toastIdApproval) toast.dismiss(toastIdApproval);
      if (toastIdBroadcast) toast.dismiss(toastIdBroadcast);

      toast.error(getErrorDetails(errorMessage) || 'Payment failed. Please try again.');
    } finally {
      setTxPending(false);
    }
  };

  return { handlePayment, isTxPending };
}
