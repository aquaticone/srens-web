# self-repaying-ens/web

## Setup

1. Install dependencies: `pnpm i`

2. Start dev server: `pnpm dev`

## Codegen

[@wagmi/cli] is used to manage ABIs and generate hooks for interacting with contracts.

Configuration can be found in `wagmi.config.ts`.

### Setup

1. `cp .env.example .env`

2. Fill in your Etherscan API key

3. Run codegen: `pnpm codegen`
