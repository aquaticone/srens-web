// Generated by @wagmi/cli@0.1.11 on 3/10/2023 at 9:30:30 PM
import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from "wagmi"
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from "wagmi/actions"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// alETH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const alEthABI = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SelfRepayingENS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const selfRepayingEnsABI = [
  {
    stateMutability: "payable",
    type: "constructor",
    inputs: [
      {
        name: "_controller",
        internalType: "contract ETHRegistrarController",
        type: "address",
      },
      {
        name: "_registrar",
        internalType: "contract BaseRegistrarImplementation",
        type: "address",
      },
      { name: "_gelatoOps", internalType: "contract Ops", type: "address" },
      {
        name: "_alchemist",
        internalType: "contract IAlchemistV2",
        type: "address",
      },
      {
        name: "_alETHPool",
        internalType: "contract ICurvePool",
        type: "address",
      },
      {
        name: "_curveCalc",
        internalType: "contract ICurveCalc",
        type: "address",
      },
    ],
  },
  { type: "error", inputs: [], name: "FailedTransfer" },
  { type: "error", inputs: [], name: "IllegalArgument" },
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
        name: "alETHAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "ethAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Borrow",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "subscriber",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "indexedName",
        internalType: "string",
        type: "string",
        indexed: true,
      },
      { name: "name", internalType: "string", type: "string", indexed: false },
    ],
    name: "Subscribe",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "subscriber",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "indexedName",
        internalType: "string",
        type: "string",
        indexed: true,
      },
      { name: "name", internalType: "string", type: "string", indexed: false },
    ],
    name: "Unsubscribe",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "subscriber", internalType: "address", type: "address" }],
    name: "checker",
    outputs: [
      { name: "canExec", internalType: "bool", type: "bool" },
      { name: "execPayload", internalType: "bytes", type: "bytes" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "subscriber", internalType: "address", type: "address" }],
    name: "getTaskId",
    outputs: [{ name: "taskId", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "name", internalType: "string", type: "string" }],
    name: "getVariableMaxGasPrice",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes[]", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ name: "results", internalType: "bytes[]", type: "bytes[]" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "subscriber", internalType: "address", type: "address" },
    ],
    name: "renew",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "name", internalType: "string", type: "string" }],
    name: "subscribe",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "subscriber", internalType: "address", type: "address" }],
    name: "subscribedNames",
    outputs: [{ name: "names", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "name", internalType: "string", type: "string" }],
    name: "unsubscribe",
    outputs: [],
  },
  { stateMutability: "payable", type: "receive" },
] as const

export const selfRepayingEnsAddress =
  "0xef6274Eb92b55dA6D4BCE0b7D686f37064348aBB" as const

export const selfRepayingEnsConfig = {
  address: selfRepayingEnsAddress,
  abi: selfRepayingEnsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"allowance"`.
 */
export function useAlEthAllowance<
  TSelectData = ReadContractResult<typeof alEthABI, "allowance">,
>(
  config: Omit<
    UseContractReadConfig<typeof alEthABI, "allowance", TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: alEthABI,
    functionName: "allowance",
    ...config,
  } as UseContractReadConfig<typeof alEthABI, "allowance", TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useAlEthBalanceOf<
  TSelectData = ReadContractResult<typeof alEthABI, "balanceOf">,
>(
  config: Omit<
    UseContractReadConfig<typeof alEthABI, "balanceOf", TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: alEthABI,
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof alEthABI, "balanceOf", TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"decimals"`.
 */
export function useAlEthDecimals<
  TSelectData = ReadContractResult<typeof alEthABI, "decimals">,
>(
  config: Omit<
    UseContractReadConfig<typeof alEthABI, "decimals", TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: alEthABI,
    functionName: "decimals",
    ...config,
  } as UseContractReadConfig<typeof alEthABI, "decimals", TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"name"`.
 */
export function useAlEthName<
  TSelectData = ReadContractResult<typeof alEthABI, "name">,
>(
  config: Omit<
    UseContractReadConfig<typeof alEthABI, "name", TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: alEthABI,
    functionName: "name",
    ...config,
  } as UseContractReadConfig<typeof alEthABI, "name", TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"symbol"`.
 */
export function useAlEthSymbol<
  TSelectData = ReadContractResult<typeof alEthABI, "symbol">,
>(
  config: Omit<
    UseContractReadConfig<typeof alEthABI, "symbol", TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: alEthABI,
    functionName: "symbol",
    ...config,
  } as UseContractReadConfig<typeof alEthABI, "symbol", TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useAlEthTotalSupply<
  TSelectData = ReadContractResult<typeof alEthABI, "totalSupply">,
>(
  config: Omit<
    UseContractReadConfig<typeof alEthABI, "totalSupply", TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: alEthABI,
    functionName: "totalSupply",
    ...config,
  } as UseContractReadConfig<typeof alEthABI, "totalSupply", TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link alEthABI}__.
 */
export function useAlEthWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof alEthABI, string>["abi"],
        TFunctionName
      >
    : UseContractWriteConfig<TMode, typeof alEthABI, TFunctionName> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<TMode, typeof alEthABI, TFunctionName>({
    abi: alEthABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"approve"`.
 */
export function useAlEthApprove<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof alEthABI, "approve">["abi"],
        "approve"
      > & { functionName?: "approve" }
    : UseContractWriteConfig<TMode, typeof alEthABI, "approve"> & {
        abi?: never
        functionName?: "approve"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof alEthABI, "approve">({
    abi: alEthABI,
    functionName: "approve",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"transfer"`.
 */
export function useAlEthTransfer<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof alEthABI, "transfer">["abi"],
        "transfer"
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<TMode, typeof alEthABI, "transfer"> & {
        abi?: never
        functionName?: "transfer"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof alEthABI, "transfer">({
    abi: alEthABI,
    functionName: "transfer",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useAlEthTransferFrom<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof alEthABI, "transferFrom">["abi"],
        "transferFrom"
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<TMode, typeof alEthABI, "transferFrom"> & {
        abi?: never
        functionName?: "transferFrom"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof alEthABI, "transferFrom">({
    abi: alEthABI,
    functionName: "transferFrom",
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareAlEthApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof alEthABI, "approve">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: alEthABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof alEthABI, "approve">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareAlEthTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof alEthABI, "transfer">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: alEthABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof alEthABI, "transfer">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link alEthABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareAlEthTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof alEthABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: alEthABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof alEthABI, "transferFrom">)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"checker"`.
 */
export function useSelfRepayingEnsChecker<
  TSelectData = ReadContractResult<typeof selfRepayingEnsABI, "checker">,
>(
  config: Omit<
    UseContractReadConfig<typeof selfRepayingEnsABI, "checker", TSelectData>,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "checker",
    ...config,
  } as UseContractReadConfig<typeof selfRepayingEnsABI, "checker", TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"getTaskId"`.
 */
export function useSelfRepayingEnsGetTaskId<
  TSelectData = ReadContractResult<typeof selfRepayingEnsABI, "getTaskId">,
>(
  config: Omit<
    UseContractReadConfig<typeof selfRepayingEnsABI, "getTaskId", TSelectData>,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "getTaskId",
    ...config,
  } as UseContractReadConfig<
    typeof selfRepayingEnsABI,
    "getTaskId",
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"getVariableMaxGasPrice"`.
 */
export function useSelfRepayingEnsGetVariableMaxGasPrice<
  TSelectData = ReadContractResult<
    typeof selfRepayingEnsABI,
    "getVariableMaxGasPrice"
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof selfRepayingEnsABI,
      "getVariableMaxGasPrice",
      TSelectData
    >,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "getVariableMaxGasPrice",
    ...config,
  } as UseContractReadConfig<
    typeof selfRepayingEnsABI,
    "getVariableMaxGasPrice",
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"subscribedNames"`.
 */
export function useSelfRepayingEnsSubscribedNames<
  TSelectData = ReadContractResult<
    typeof selfRepayingEnsABI,
    "subscribedNames"
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof selfRepayingEnsABI,
      "subscribedNames",
      TSelectData
    >,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "subscribedNames",
    ...config,
  } as UseContractReadConfig<
    typeof selfRepayingEnsABI,
    "subscribedNames",
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__.
 */
export function useSelfRepayingEnsWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof selfRepayingEnsABI, string>["abi"],
        TFunctionName
      >
    : UseContractWriteConfig<
        TMode,
        typeof selfRepayingEnsABI,
        TFunctionName
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<TMode, typeof selfRepayingEnsABI, TFunctionName>({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"multicall"`.
 */
export function useSelfRepayingEnsMulticall<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof selfRepayingEnsABI,
          "multicall"
        >["abi"],
        "multicall"
      > & { functionName?: "multicall" }
    : UseContractWriteConfig<TMode, typeof selfRepayingEnsABI, "multicall"> & {
        abi?: never
        functionName?: "multicall"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof selfRepayingEnsABI, "multicall">({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "multicall",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"renew"`.
 */
export function useSelfRepayingEnsRenew<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof selfRepayingEnsABI, "renew">["abi"],
        "renew"
      > & { functionName?: "renew" }
    : UseContractWriteConfig<TMode, typeof selfRepayingEnsABI, "renew"> & {
        abi?: never
        functionName?: "renew"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof selfRepayingEnsABI, "renew">({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "renew",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"subscribe"`.
 */
export function useSelfRepayingEnsSubscribe<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof selfRepayingEnsABI,
          "subscribe"
        >["abi"],
        "subscribe"
      > & { functionName?: "subscribe" }
    : UseContractWriteConfig<TMode, typeof selfRepayingEnsABI, "subscribe"> & {
        abi?: never
        functionName?: "subscribe"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof selfRepayingEnsABI, "subscribe">({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "subscribe",
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"unsubscribe"`.
 */
export function useSelfRepayingEnsUnsubscribe<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof selfRepayingEnsABI,
          "unsubscribe"
        >["abi"],
        "unsubscribe"
      > & { functionName?: "unsubscribe" }
    : UseContractWriteConfig<
        TMode,
        typeof selfRepayingEnsABI,
        "unsubscribe"
      > & {
        abi?: never
        functionName?: "unsubscribe"
      } = {} as any,
) {
  return useContractWrite<TMode, typeof selfRepayingEnsABI, "unsubscribe">({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "unsubscribe",
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"multicall"`.
 */
export function usePrepareSelfRepayingEnsMulticall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "multicall">,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "multicall",
    ...config,
  } as UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "multicall">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"renew"`.
 */
export function usePrepareSelfRepayingEnsRenew(
  config: Omit<
    UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "renew">,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "renew",
    ...config,
  } as UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "renew">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"subscribe"`.
 */
export function usePrepareSelfRepayingEnsSubscribe(
  config: Omit<
    UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "subscribe">,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "subscribe",
    ...config,
  } as UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "subscribe">)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link selfRepayingEnsABI}__ and `functionName` set to `"unsubscribe"`.
 */
export function usePrepareSelfRepayingEnsUnsubscribe(
  config: Omit<
    UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "unsubscribe">,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: selfRepayingEnsABI,
    address: selfRepayingEnsAddress,
    functionName: "unsubscribe",
    ...config,
  } as UsePrepareContractWriteConfig<typeof selfRepayingEnsABI, "unsubscribe">)
}