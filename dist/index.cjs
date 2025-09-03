"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useMerchantBalance: () => useMerchantBalance,
  usePay: () => usePay,
  useWithdraw: () => useWithdraw
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useMerchantBalance.ts
var import_wagmi = require("wagmi");

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
  const { data, isLoading, refetch } = (0, import_wagmi.useReadContract)({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balances",
    args: [merchant]
  });
  return { balance: data, isLoading, refetch };
}

// src/hooks/usePay.ts
var import_wagmi2 = require("wagmi");
function usePay() {
  const { writeContractAsync, data: hash, isPending } = (0, import_wagmi2.useWriteContract)();
  const pay = async (merchant, amount) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pay",
      args: [merchant],
      value: amount
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, import_wagmi2.useWaitForTransactionReceipt)({ hash });
  return { pay, isPending, isConfirming, isConfirmed, hash };
}

// src/hooks/useWithdraw.ts
var import_wagmi3 = require("wagmi");
function useWithdraw() {
  const { writeContractAsync, data: hash, isPending } = (0, import_wagmi3.useWriteContract)();
  const withdraw = async (amount) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [amount]
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, import_wagmi3.useWaitForTransactionReceipt)({ hash });
  return { withdraw, isPending, isConfirming, isConfirmed, hash };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useMerchantBalance,
  usePay,
  useWithdraw
});
//# sourceMappingURL=index.cjs.map