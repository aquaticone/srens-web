# self-repaying-ens/web

## Getting started

1. Install dependencies: `pnpm i`
2. Configure environment varibles: `cp .env.example .env`
3. Start dev server: `pnpm dev`

### Environment variables

- `ETHERSCAN_API_KEY` - used to fetch ABIs for codegen
- `NEXT_PUBLIC_ALCHEMY_KEY` - required for mainnet RPC
- `NEXT_PUBLIC_ENABLE_FOUNDRY` - set to `true` to enable localhost network

### Codegen

[@wagmi/cli](https://wagmi.sh/cli/getting-started) is used to manage ABIs and generate hooks for interacting with contracts. Configuration can be found in `wagmi.config.ts`.

#### Running codegen

1. Make sure you've configured your `ETHERSCAN_API_KEY` in `.env`
2. Run codegen: `pnpm codgen`

#### Notes

- configuration can be found in `wagmi.config.ts`
- generated code can be found in `src/lib/generated.ts`
