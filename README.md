# Ink Pirates Crew Assistant

A modular React + TypeScript + Vite starter for a cinematic Ink Pirates collection and crew-planning tool. It uses the supplied NFT metadata snapshot and the Ink Mainnet configuration documented by Ink.

## Features in this first implementation

- Cinematic pirate-inspired responsive UI.
- Bundled metadata snapshot for 3,000 Ink Pirates with actual metadata image URLs and traits.
- Collection browse, search, role/Legendary filters, and selection.
- Public address lookup and browser wallet connection flow (read-only; no transactions).
- Ink Mainnet chain ID check (57073).
- Modular crew plans, manual planned-role overrides, metadata-based auto-suggestion, compare view, gap review, local browser storage, JSON/CSV/text export.
- Ship and voyage areas prepared as future modules; real voyage tracking intentionally disabled.

## Start locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Build and type-check:

```bash
npm run typecheck
npm run build
npm run preview
```

## Important data and verification notes

- `public/data/pirates.json` is a compact transformation of the user-supplied metadata file. It is a snapshot, not a guarantee that current on-chain metadata has not changed.
- Contract configured: `0x77ffb009c5d5914e870f6c4a4523dbb96b2f9def`.
- Ink Mainnet chain ID: `57073`; RPC: `https://rpc-gel.inkonchain.com`; explorer: `https://explorer.inkonchain.com`.
- The contract is configured from the user-provided explorer link, but the app does not yet prove contract identity or fully reconcile live holdings. The Blockscout address NFT lookup is an initial integration and currently reads the first API response only; confirm holdings on the explorer if a wallet result appears incomplete. For production, implement pagination and verify API response behavior with representative addresses.
- This app does not assume official ship classes, capacities, voyage rules, loot odds, or gameplay bonuses. Auto-suggestion is a planning convenience, not a gameplay-strength predictor.
- Voyage live tracking is disabled in `src/features/voyage/voyage.ts` until an official and reliable live-game state source is verified.
- Crew plans are stored in the current browser's local storage. Export backups before clearing browser data. No server sync is included.
- Wallet support uses the injected EIP-1193 provider; no private keys or seed phrases are requested, and the app does not initiate transactions.

## Structure

```text
src/
  app/                         # Reserved for routing/layout growth
  components/                  # Sidebar, NFT cards and reusable UI
  features/
    collection/                # Metadata loading and collection constants
    wallet/                    # EIP-1193 wallet + explorer lookup
    crew/                      # Reserved for extracted crew domain logic
    storage/                   # Local plan persistence and exports
    voyage/                    # Feature flag and voyage gating
  styles/                      # Cinematic responsive theme
  App.tsx                      # Screen composition
  types.ts                     # Shared domain types
public/data/pirates.json       # Bundled 3,000-token metadata snapshot
```

## Suggested next hardening tasks

1. Verify contract bytecode, ERC-721 interface and collection identity on the explorer/RPC.
2. Add tested pagination for Blockscout API v2 and validate returned token IDs for real wallet addresses.
3. Move crew planner logic into `src/features/crew/` with unit tests.
4. Add automated tests for imports, duplicate assignments, local-storage failure, and wallet/network error states.
5. Replace custom ship configuration with verified ship NFT metadata/rules after the airdrop.
6. Add a voyage adapter only when a trustworthy official API/indexer or verified on-chain state is available.
