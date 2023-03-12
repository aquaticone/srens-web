const alchemistABI = [
  { stateMutability: "nonpayable", type: "constructor", inputs: [] },
  {
    type: "error",
    inputs: [
      { name: "target", internalType: "address", type: "address" },
      { name: "success", internalType: "bool", type: "bool" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "ERC20CallFailed",
  },
  {
    type: "error",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "expectedValue", internalType: "uint256", type: "uint256" },
      {
        name: "maximumExpectedValue",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "ExpectedValueExceeded",
  },
  { type: "error", inputs: [], name: "IllegalArgument" },
  { type: "error", inputs: [], name: "IllegalState" },
  {
    type: "error",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "available", internalType: "uint256", type: "uint256" },
    ],
    name: "LiquidationLimitExceeded",
  },
  { type: "error", inputs: [], name: "LockAlreadyClaimed" },
  {
    type: "error",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "loss", internalType: "uint256", type: "uint256" },
      { name: "maximumLoss", internalType: "uint256", type: "uint256" },
    ],
    name: "LossExceeded",
  },
  {
    type: "error",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "available", internalType: "uint256", type: "uint256" },
    ],
    name: "MintingLimitExceeded",
  },
  {
    type: "error",
    inputs: [
      { name: "data", internalType: "bytes", type: "bytes" },
      { name: "result", internalType: "bytes", type: "bytes" },
    ],
    name: "MulticallFailed",
  },
  {
    type: "error",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "available", internalType: "uint256", type: "uint256" },
    ],
    name: "RepayLimitExceeded",
  },
  {
    type: "error",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "minimumAmountOut", internalType: "uint256", type: "uint256" },
    ],
    name: "SlippageExceeded",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "TokenDisabled",
  },
  { type: "error", inputs: [], name: "Unauthorized" },
  { type: "error", inputs: [], name: "Undercollateralized" },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "UnsupportedToken",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "underlyingToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AddUnderlyingToken",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AddYieldToken",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "admin",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "AdminUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ApproveMint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ApproveWithdraw",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "recipient",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Burn",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "blocks",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "CreditUnlockRateUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "recipient",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Deposit",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Donate",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "minimumAmountOut",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "totalHarvested",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "credit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Harvest",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "version", internalType: "uint8", type: "uint8", indexed: false },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sentinel",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "flag", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "KeeperSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "underlyingToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "shares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "credit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Liquidate",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "underlyingToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "maximum",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "blocks",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "LiquidationLimitUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "maximumExpectedValue",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MaximumExpectedValueUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "maximumLoss",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MaximumLossUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "minimumCollateralization",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MinimumCollateralizationUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "recipient",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Mint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "maximum",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "blocks",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MintingLimitUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "pendingAdmin",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "PendingAdminUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "protocolFeeReceiver",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "ProtocolFeeReceiverUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "protocolFee",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ProtocolFeeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "underlyingToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "recipient",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "credit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Repay",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "underlyingToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "maximum",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "blocks",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "RepayLimitUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sentinel",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "flag", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "SentinelSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "expectedValue",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Snap",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "rewardToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SweepRewardTokens",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SweepTokens",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "tokenAdapter",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TokenAdapterUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "transmuter",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TransmuterUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "underlyingToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "enabled", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "UnderlyingTokenEnabled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "shares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "recipient",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Withdraw",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "yieldToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "enabled", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "YieldTokenEnabled",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "BPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "FIXED_POINT_SCALAR",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "acceptAdmin",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "accounts",
    outputs: [
      { name: "debt", internalType: "int256", type: "int256" },
      { name: "depositedTokens", internalType: "address[]", type: "address[]" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      {
        name: "config",
        internalType: "struct IAlchemistV2AdminActions.UnderlyingTokenConfig",
        type: "tuple",
        components: [
          {
            name: "repayLimitMinimum",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "repayLimitMaximum",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "repayLimitBlocks",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "liquidationLimitMinimum",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "liquidationLimitMaximum",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "liquidationLimitBlocks",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    name: "addUnderlyingToken",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      {
        name: "config",
        internalType: "struct IAlchemistV2AdminActions.YieldTokenConfig",
        type: "tuple",
        components: [
          { name: "adapter", internalType: "address", type: "address" },
          { name: "maximumLoss", internalType: "uint256", type: "uint256" },
          {
            name: "maximumExpectedValue",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "creditUnlockBlocks",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    name: "addYieldToken",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "admin",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approveMint",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
    ],
    name: "approveWithdraw",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "burn",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "blocks", internalType: "uint256", type: "uint256" },
    ],
    name: "configureCreditUnlockRate",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "maximum", internalType: "uint256", type: "uint256" },
      { name: "blocks", internalType: "uint256", type: "uint256" },
    ],
    name: "configureLiquidationLimit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "maximum", internalType: "uint256", type: "uint256" },
      { name: "rate", internalType: "uint256", type: "uint256" },
    ],
    name: "configureMintingLimit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "maximum", internalType: "uint256", type: "uint256" },
      { name: "blocks", internalType: "uint256", type: "uint256" },
    ],
    name: "configureRepayLimit",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
    ],
    name: "convertSharesToUnderlyingTokens",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
    ],
    name: "convertSharesToYieldTokens",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "convertUnderlyingTokensToShares",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "convertUnderlyingTokensToYield",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "convertYieldTokensToShares",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "convertYieldTokensToUnderlying",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "debtToken",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "deposit",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "minimumAmountOut", internalType: "uint256", type: "uint256" },
    ],
    name: "depositUnderlying",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "donate",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
    ],
    name: "getLiquidationLimitInfo",
    outputs: [
      { name: "currentLimit", internalType: "uint256", type: "uint256" },
      { name: "rate", internalType: "uint256", type: "uint256" },
      { name: "maximum", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getMintLimitInfo",
    outputs: [
      { name: "currentLimit", internalType: "uint256", type: "uint256" },
      { name: "rate", internalType: "uint256", type: "uint256" },
      { name: "maximum", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
    ],
    name: "getRepayLimitInfo",
    outputs: [
      { name: "currentLimit", internalType: "uint256", type: "uint256" },
      { name: "rate", internalType: "uint256", type: "uint256" },
      { name: "maximum", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getSupportedUnderlyingTokens",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getSupportedYieldTokens",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
    ],
    name: "getUnderlyingTokenParameters",
    outputs: [
      {
        name: "",
        internalType: "struct IAlchemistV2State.UnderlyingTokenParams",
        type: "tuple",
        components: [
          { name: "decimals", internalType: "uint8", type: "uint8" },
          {
            name: "conversionFactor",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "enabled", internalType: "bool", type: "bool" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "yieldToken", internalType: "address", type: "address" }],
    name: "getUnderlyingTokensPerShare",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "yieldToken", internalType: "address", type: "address" }],
    name: "getYieldTokenParameters",
    outputs: [
      {
        name: "",
        internalType: "struct IAlchemistV2State.YieldTokenParams",
        type: "tuple",
        components: [
          { name: "decimals", internalType: "uint8", type: "uint8" },
          { name: "underlyingToken", internalType: "address", type: "address" },
          { name: "adapter", internalType: "address", type: "address" },
          { name: "maximumLoss", internalType: "uint256", type: "uint256" },
          {
            name: "maximumExpectedValue",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "creditUnlockRate",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "activeBalance", internalType: "uint256", type: "uint256" },
          {
            name: "harvestableBalance",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "totalShares", internalType: "uint256", type: "uint256" },
          { name: "expectedValue", internalType: "uint256", type: "uint256" },
          { name: "pendingCredit", internalType: "uint256", type: "uint256" },
          {
            name: "distributedCredit",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "lastDistributionBlock",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "accruedWeight", internalType: "uint256", type: "uint256" },
          { name: "enabled", internalType: "bool", type: "bool" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "yieldToken", internalType: "address", type: "address" }],
    name: "getYieldTokensPerShare",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "minimumAmountOut", internalType: "uint256", type: "uint256" },
    ],
    name: "harvest",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct IAlchemistV2AdminActions.InitializationParams",
        type: "tuple",
        components: [
          { name: "admin", internalType: "address", type: "address" },
          { name: "debtToken", internalType: "address", type: "address" },
          { name: "transmuter", internalType: "address", type: "address" },
          {
            name: "minimumCollateralization",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "protocolFee", internalType: "uint256", type: "uint256" },
          {
            name: "protocolFeeReceiver",
            internalType: "address",
            type: "address",
          },
          {
            name: "mintingLimitMinimum",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "mintingLimitMaximum",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "mintingLimitBlocks",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "whitelist", internalType: "address", type: "address" },
        ],
      },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
    ],
    name: "isSupportedUnderlyingToken",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "yieldToken", internalType: "address", type: "address" }],
    name: "isSupportedYieldToken",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "keepers",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "minimumAmountOut", internalType: "uint256", type: "uint256" },
    ],
    name: "liquidate",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "minimumCollateralization",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "mintAllowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "mintFrom",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes[]", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ name: "results", internalType: "bytes[]", type: "bytes[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "normalizeDebtTokensToUnderlying",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "normalizeUnderlyingTokensToDebt",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "pendingAdmin",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "poke",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "yieldToken", internalType: "address", type: "address" },
    ],
    name: "positions",
    outputs: [
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "lastAccruedWeight", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "protocolFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "protocolFeeReceiver",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "repay",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "sentinels",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "keeper", internalType: "address", type: "address" },
      { name: "flag", internalType: "bool", type: "bool" },
    ],
    name: "setKeeper",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "setMaximumExpectedValue",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "setMaximumLoss",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    name: "setMinimumCollateralization",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "value", internalType: "address", type: "address" }],
    name: "setPendingAdmin",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    name: "setProtocolFee",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "value", internalType: "address", type: "address" }],
    name: "setProtocolFeeReceiver",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sentinel", internalType: "address", type: "address" },
      { name: "flag", internalType: "bool", type: "bool" },
    ],
    name: "setSentinel",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "adapter", internalType: "address", type: "address" },
    ],
    name: "setTokenAdapter",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "transferAdapterAddress",
        internalType: "address",
        type: "address",
      },
    ],
    name: "setTransferAdapterAddress",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "value", internalType: "address", type: "address" }],
    name: "setTransmuter",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "underlyingToken", internalType: "address", type: "address" },
      { name: "enabled", internalType: "bool", type: "bool" },
    ],
    name: "setUnderlyingTokenEnabled",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "enabled", internalType: "bool", type: "bool" },
    ],
    name: "setYieldTokenEnabled",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "yieldToken", internalType: "address", type: "address" }],
    name: "snap",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "rewardToken", internalType: "address", type: "address" },
      { name: "yieldToken", internalType: "address", type: "address" },
    ],
    name: "sweepRewardTokens",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "totalValue",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "transferAdapter",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "debt", internalType: "int256", type: "int256" },
    ],
    name: "transferDebtV1",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "transmuter",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "version",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "whitelist",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "yieldToken", internalType: "address", type: "address" },
    ],
    name: "withdrawAllowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
    ],
    name: "withdrawFrom",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "minimumAmountOut", internalType: "uint256", type: "uint256" },
    ],
    name: "withdrawUnderlying",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "yieldToken", internalType: "address", type: "address" },
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "minimumAmountOut", internalType: "uint256", type: "uint256" },
    ],
    name: "withdrawUnderlyingFrom",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
] as const

export const alchemistAddress =
  "0x938DBA3B746B3cc6D47C703Aac3a7485287c0ed7" as const

export const alchemistConfig = {
  address: alchemistAddress,
  abi: alchemistABI,
} as const
