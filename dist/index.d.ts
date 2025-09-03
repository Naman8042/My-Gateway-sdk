import * as viem from 'viem';
import * as _tanstack_query_core from '@tanstack/query-core';

declare function useMerchantBalance(merchant: `0x${string}`): {
    balance: bigint | undefined;
    isLoading: boolean;
    refetch: (options?: _tanstack_query_core.RefetchOptions) => Promise<_tanstack_query_core.QueryObserverResult<unknown, viem.ReadContractErrorType>>;
};

declare function usePay(): {
    pay: (merchant: `0x${string}`, amount: bigint) => Promise<`0x${string}`>;
    isPending: boolean;
    isConfirming: boolean;
    isConfirmed: boolean;
    hash: `0x${string}` | undefined;
};

declare function useWithdraw(): {
    withdraw: (amount: bigint) => Promise<`0x${string}`>;
    isPending: boolean;
    isConfirming: boolean;
    isConfirmed: boolean;
    hash: `0x${string}` | undefined;
};

export { useMerchantBalance, usePay, useWithdraw };
