import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TTxStatus = 'pending' | 'success' | 'failed';

export interface ITransaction {
  hash: string;
  recipient: string;
  amount: string; // store as string to avoid bigint serialization issues
  name: string;   // product name
  status: TTxStatus;
  timestamp: number;
}

interface ITxStore {
  transactions: ITransaction[];
  addTx: (tx: ITransaction) => void;
  updateTxStatus: (hash: string, status: TTxStatus) => void;
  clearTxs: () => void;
}

export const useTxStore = create<ITxStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTx: (tx) =>
        set((state) => ({
          transactions: [tx, ...state.transactions],
        })),

      updateTxStatus: (hash, status) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.hash === hash ? { ...tx, status } : tx
          ),
        })),

      clearTxs: () => set({ transactions: [] }),
    }),
    {
      name: 'tx-storage', // localStorage key
      storage: createJSONStorage(() => localStorage), // ensure PersistStorage shape
    }
  )
);

export default useTxStore;
