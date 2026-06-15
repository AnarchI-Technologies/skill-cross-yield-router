---
name: cross-yield-router
description: Read-only CROSS Mainnet yield comparison and allocation router. Use when the user or an agent asks to compare native staking, WCROSS rewards pools, LP exposure, Forge agent-token exposure, liquid reserves, APR, APY, yield routing, allocation plans, or best destination for CROSS capital on chain 612055.
---

# cross-yield-router

Use this skill to compare yield routes and produce deterministic allocation plans. It does not execute transactions.

## Rules

- Keep observed live data separate from APR assumptions.
- Use explicit APR overrides when live APR is unavailable.
- Never guarantee yield.
- Route execution to `cross-treasury`, `cross-stake`, `cross-rewards`, or `cross-dex-trade`.
- Never use or request private keys.

## Commands

```bash
node scripts/snapshot.mjs
node scripts/compare.mjs
node scripts/plan.mjs <amountCROSS> --risk=conservative|balanced|aggressive
```

## Route Types

- `liquid`: no yield, highest flexibility.
- `native-stake`: native CROSS staking through `cross-stake`.
- `rewards-pool`: WCROSS/GameToken rewards pools through `cross-rewards`.
- `lp-or-agent-token`: LP or Forge agent-token exposure through `cross-dex-trade` or `cross-forge`.
