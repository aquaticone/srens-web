import { defineConfig, loadEnv } from "@wagmi/cli"
import { fetch, react } from "@wagmi/cli/plugins"
import { erc20ABI } from "wagmi"
import { z } from "zod"

const etherscanResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  result: z.string(),
})

export default defineConfig(() => {
  loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })

  return {
    out: "src/lib/generated.ts",
    contracts: [
      {
        name: "alETH",
        abi: erc20ABI,
      },
    ],
    plugins: [
      fetch({
        contracts: [
          {
            name: "SelfRepayingENS",
            address: "0xef6274Eb92b55dA6D4BCE0b7D686f37064348aBB",
          },
        ],
        cacheDuration: 1,
        async parse({ response }) {
          const json = etherscanResponseSchema.parse(await response.json())
          if (json.status === "0") throw new Error(json.message)
          return JSON.parse(json.result)
        },
        request(contract) {
          if (!contract.address) throw new Error("address is required")
          const address =
            typeof contract.address === "string"
              ? contract.address
              : Object.values(contract.address)[0]
          return {
            url: `https://api.etherscan.io/api?module=contract&action=getabi&apiKey=${process.env.ETHERSCAN_API_KEY}&address=${address}`,
          }
        },
      }),
      react({
        useContract: false,
        useContractEvent: false,
        useContractItemEvent: false,
        useContractRead: false,
        useContractFunctionRead: true,
        usePrepareContractWrite: false,
        usePrepareContractFunctionWrite: true,
      }),
    ],
  }
})
