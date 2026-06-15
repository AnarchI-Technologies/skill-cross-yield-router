#!/usr/bin/env node
import { handleMain, out, parseChildJson } from './_json.mjs';
import { runNode, siblingSkill, siblings } from './_sibling.mjs';

async function main() {
  const stake = siblingSkill('cross-stake');
  const rewards = siblingSkill('cross-rewards');
  const observed = {};
  if (stake.exists) {
    const res = await runNode(`${stake.path}/scripts/network.mjs`);
    observed.nativeStake = res.code === 0 ? parseChildJson(res.stdout) : { error: res.stderr || 'cross-stake network failed' };
    const apr = observed.nativeStake?.apiStats?.data?.apr ?? observed.nativeStake?.apiStats?.data?.APR;
    observed.nativeStakeApr = apr == null ? null : Number(apr);
  }
  if (rewards.exists) {
    const res = await runNode(`${rewards.path}/scripts/pools.mjs`);
    observed.rewardsPools = res.code === 0 ? parseChildJson(res.stdout) : { error: res.stderr || 'cross-rewards pools failed' };
  }
  out({
    ok: true,
    skill: 'cross-yield-router',
    command: 'snapshot',
    siblingSkills: siblings(),
    observed,
  });
}

handleMain(main());
