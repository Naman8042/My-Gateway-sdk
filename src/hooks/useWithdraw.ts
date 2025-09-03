import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export function useWithdraw() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  const withdraw = async (amount: bigint) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [amount],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return { withdraw, isPending, isConfirming, isConfirmed, hash };
}
