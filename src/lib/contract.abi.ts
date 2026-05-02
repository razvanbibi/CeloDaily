// src/lib/contract.abi.ts
export const OXTXN_STREAK_ABI = [
  {
    type: "function",
    name: "streak",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "highestStreak",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  // 👉 দরকারি read ABI গুলোই রাখো
] as const;
export const OXTXN_STREAK_CONTRACT =
  "0xd7fbd56e05f29184e235C991e680f1D57e1C7924" as const;