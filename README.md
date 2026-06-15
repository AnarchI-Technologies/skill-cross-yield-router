# cross-yield-router

AnarchI Technologies (TM) CROSS Mainnet yield comparison and allocation router.

Hardcoding freedom into the systems of tomorrow.

## Purpose

Compares liquid reserve, native staking, rewards pools, LP exposure, and Forge agent-token exposure, then emits deterministic allocation suggestions by risk profile. It is read-only and never executes transactions.

## Use Cases

- Compare native staking, rewards pools, LP exposure, and agent-token exposure.
- Produce conservative, balanced, or aggressive allocation suggestions.
- Keep observed yields separate from explicit assumptions.
- Feed dashboards or treasury logic with compact route plans.
- Avoid hidden APR assumptions when live services lack comparable values.

## Setup

~~~bash
git clone https://github.com/AnarchI-Technologies/skill-cross-yield-router.git
cd skill-cross-yield-router
./install.sh
~~~

The installer symlinks skills/cross-yield-router into ~/.claude/skills/cross-yield-router and installs the package dependencies.

## Common Commands

~~~bash
cd skills/cross-yield-router
node scripts/snapshot.mjs
node scripts/compare.mjs
node scripts/plan.mjs 100 --risk=balanced
NATIVE_STAKE_APR=120 REWARDS_POOL_APR=80 LP_APR=35 node scripts/plan.mjs 100 --risk=balanced
~~~

## Configuration

- CROSS_SKILLS_ROOT: shared parent folder for sibling skills.
- NATIVE_STAKE_APR, REWARDS_POOL_APR, LP_APR: optional APR overrides.
- LIQUID_APR: default liquid route APR, normally 0.
- MIN_LIQUID_RESERVE_PCT: reserve floor.
- MAX_SINGLE_ROUTE_PCT: concentration cap.

## Alternative Configurations

- No assumptions: omit APR overrides; missing APR routes remain visible but cannot win.
- Conservative profile: use --risk=conservative and higher reserves.
- Aggressive profile: use --risk=aggressive only with verified APR assumptions.
- Dashboard mode: cache compare or snapshot output externally.

## Validation

~~~bash
npm run check
npm run smoke:read
~~~

Run the skill validator after documentation or frontmatter changes:

~~~bash
python C:\Users\Administrator\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\Administrator\Desktop\cross-skills\skill-cross-yield-router\skills\cross-yield-router
~~~

## Trademark Notice

AnarchI Technologies (TM) and the phrase "Hardcoding freedom into the systems of tomorrow" are used as source-identifying marks of AnarchI Technologies. This project is not an official to-nexus package unless and until the upstream team adopts it.

## License

Apache License 2.0. See LICENSE and NOTICE.md.
