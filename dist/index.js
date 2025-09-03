// src/hooks/useMerchantBalance.ts
import { useReadContract } from "wagmi";

// src/paymentgateway.json
var paymentgateway_default = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "merchant",
        type: "address"
      }
    ],
    name: "MerchantRegistered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payer",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "merchant",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "PaymentReceived",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "merchant",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Withdrawal",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllMerchants",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "merchant",
        type: "address"
      }
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "merchant",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "year",
        type: "uint16"
      },
      {
        internalType: "uint8",
        name: "month",
        type: "uint8"
      }
    ],
    name: "getMonthlyRevenue",
    outputs: [
      {
        internalType: "uint256",
        name: "revenue",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "merchant",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "getPayment",
    outputs: [
      {
        internalType: "address",
        name: "payer",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "merchant",
        type: "address"
      }
    ],
    name: "getPaymentCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "isMerchant",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "merchants",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "merchant",
        type: "address"
      }
    ],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "registerMerchant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/constants.ts
var CONTRACT_ADDRESS = "0x9915dc69138fb0a441559722762fc7eb248198d8";
var CONTRACT_ABI = paymentgateway_default;

// src/hooks/useMerchantBalance.ts
function useMerchantBalance(merchant) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balances",
    args: [merchant]
  });
  return { balance: data, isLoading, refetch };
}

// src/hooks/usePay.ts
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
function usePay() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const pay = async (merchant, amount) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pay",
      args: [merchant],
      value: amount
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  return { pay, isPending, isConfirming, isConfirmed, hash };
}

// src/hooks/useWithdraw.ts
import { useWriteContract as useWriteContract2, useWaitForTransactionReceipt as useWaitForTransactionReceipt2 } from "wagmi";
function useWithdraw() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract2();
  const withdraw = async (amount) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [amount]
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt2({ hash });
  return { withdraw, isPending, isConfirming, isConfirmed, hash };
}
export {
  useMerchantBalance,
  usePay,
  useWithdraw
};
//# sourceMappingURL=index.js.map