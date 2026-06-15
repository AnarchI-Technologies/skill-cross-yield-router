# cross-yield-router

Read-only CROSS Mainnet yield comparison and allocation router.

It compares liquid reserve, native staking, rewards pools, and LP or agent-token exposure, then emits a deterministic route plan. It does not execute transactions.

## Commands

```bash
node skills/cross-yield-router/scripts/snapshot.mjs
node skills/cross-yield-router/scripts/compare.mjs
node skills/cross-yield-router/scripts/plan.mjs 100 --risk=balanced
```

Set APR overrides when a route lacks a trusted live APR:

```bash
NATIVE_STAKE_APR=120 REWARDS_POOL_APR=80 LP_APR=35 node scripts/compare.mjs
```
