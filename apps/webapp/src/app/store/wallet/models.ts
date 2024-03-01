export type TokenBalanceResponse = {
  success: boolean;
  message: string;
  result: {
    address: string;
    balance: number;
    associated_account: string;
    info: {
      name: string;
      symbol: string;
      image: string;
      decimals: number;
    };
    isFrozen: false;
  };
};

export type TransactionType = 'SOL_TRANSFER' | 'TOKEN_TRANSFER';

export type TransactionProtocol = {
  address: string;
  name: string;
};

export type TransactionAction = {
  info: {
    sender: string;
    receiver: string;
    amount: number;
    message?: string;
  };
  source_protocol: string;
  type: TransactionType;
};

export type TransactionRawMeta = {
  computeUnitsConsumed: number;
  err: null | Error;
  fee: number;
  innerInstructions: [];
  logMessages: Array<string>;
  postBalances: Array<number>;
  postTokenBalances: [];
  preBalances: Array<number>;
  preTokenBalances: [];
  rewards: [];
  status: {
    Ok: null;
  };
};

export type AccountKey = {
  pubkey: string;
  signer: boolean;
  source: string;
  writable: boolean;
};

export type TransactionInstruction = {
  parsed: {
    info: {
      destination: string;
      lamports: number;
      source: string;
    };
    type: string;
  };
  program: string;
  programId: string;
};

export type Transaction = {
  timestamp: string;
  fee: number;
  fee_payer: string;
  signers: Array<string>;
  signatures: Array<string>;
  protocol: TransactionProtocol;
  type: TransactionType;
  actions: Array<TransactionAction>;
  raw: {
    blockTime: number;
    meta: TransactionRawMeta;
    slot: number;
    transaction: {
      message: {
        accountKeys: Array<AccountKey>;
        addressTableLookups: null;
        instructions: Array<TransactionInstruction>;
        recentBlockhash: string;
      };
      signatures: Array<string>;
    };
    version: string;
  };
};

export type TransactionHistoryResponse = {
  success: boolean;
  message: string;
  result: Array<Transaction>;
};

export type Transactions = Array<{
  timestamp: Date;
  type: 'transfer' | 'unknown';
  memo?: string;
  amount?: number;
  sign?: -1 | 1;
}>;

export type TokenInfoResponse = {
  success: boolean;
  message: string;
  result: {
    name: string;
    symbol: string;
    image: string;
    decimals: number;
    address: string;
    freeze_authority: string;
    current_supply: number;
    extensions: Array<{
      extension: string;
      state: {
        newerTransferFee: {
          epoch: number;
          maximumFee: number;
          transferFeeBasisPoints: number;
        };
        olderTransferFee: {
          epoch: number;
          maximumFee: number;
          transferFeeBasisPoints: number;
        };
        transferFeeConfigAuthority: null;
        withdrawWithheldAuthority: string;
        withheldAmount: number;
      };
    }>;
  };
};
