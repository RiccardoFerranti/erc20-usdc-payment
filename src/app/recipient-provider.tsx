"use client";

import type { Dispatch, SetStateAction} from "react";
import { createContext, useContext, useState } from "react";

import { RECIPIENT_ADDRESS } from "@/consts/usdc";

interface IRecipientContextType {
  recipient: string;
  setRecipient: Dispatch<SetStateAction<string>>;
  recipientError: string | undefined,
  setRecipientError: Dispatch<SetStateAction<string | undefined>>;
}

const RecipientContext = createContext<IRecipientContextType | undefined>(undefined);

export const RecipientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipient, setRecipient] = useState<string>(RECIPIENT_ADDRESS || '');
  const [recipientError, setRecipientError] = useState<string | undefined>(undefined);

  return (
    <RecipientContext.Provider value={{ recipient, setRecipient, recipientError, setRecipientError }}>
      {children}
    </RecipientContext.Provider>
  );
};

export const useRecipient = () => {
  const context = useContext(RecipientContext);
  if (!context) throw new Error('useRecipient must be used within RecipientProvider');
  return context;
};
