import { useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export function useMerchantBalance(merchant: `0x${string}`) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balances",
    args: [merchant],
  });

  return { balance: data as bigint | undefined, isLoading, refetch };
}
