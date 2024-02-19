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
