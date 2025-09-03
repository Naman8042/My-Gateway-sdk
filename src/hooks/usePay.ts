import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export function usePay() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  const pay = async (merchant: `0x${string}`, amount: bigint) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pay",
      args: [merchant],
      value: amount,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return { pay, isPending, isConfirming, isConfirmed, hash };
}
