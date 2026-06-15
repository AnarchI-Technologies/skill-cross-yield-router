import 'dotenv/config';

export function envNumber(name, fallback = null) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function routeRows(observed = {}) {
  const nativeObserved = observed.nativeStakeApr ?? null;
  return [
    {
      route: 'liquid',
      apr: envNumber('LIQUID_APR', 0),
      source: process.env.LIQUID_APR ? 'override' : 'default',
      riskPenalty: 0,
      driver: 'wallet',
    },
    {
      route: 'native-stake',
      apr: envNumber('NATIVE_STAKE_APR', nativeObserved),
      source: process.env.NATIVE_STAKE_APR ? 'override' : nativeObserved == null ? 'missing' : 'observed',
      riskPenalty: 5,
      driver: 'cross-stake',
    },
    {
      route: 'rewards-pool',
      apr: envNumber('REWARDS_POOL_APR', null),
      source: process.env.REWARDS_POOL_APR ? 'override' : 'missing',
      riskPenalty: 15,
      driver: 'cross-rewards',
    },
    {
      route: 'lp-or-agent-token',
      apr: envNumber('LP_APR', null),
      source: process.env.LP_APR ? 'override' : 'missing',
      riskPenalty: 30,
      driver: 'cross-dex-trade/cross-forge',
    },
  ].map((r) => ({
    ...r,
    score: r.apr == null ? null : r.apr - r.riskPenalty,
  }));
}

export function allocationFor(amount, risk, routes) {
  const liquidPct = risk === 'conservative' ? 25 : risk === 'aggressive' ? 10 : 15;
  const maxSingle = risk === 'aggressive' ? 80 : risk === 'conservative' ? 55 : 70;
  const candidates = routes.filter((r) => r.route !== 'liquid' && r.score != null).sort((a, b) => b.score - a.score);
  const top = candidates[0] ?? null;
  const second = candidates[1] ?? null;
  const liquid = amount * liquidPct / 100;
  const deployable = amount - liquid;
  if (!top) {
    return [{ route: 'liquid', amountCROSS: amount, pct: 100, reason: 'no comparable yield routes' }];
  }
  const topPctOfDeployable = Math.min(maxSingle, second ? 65 : 100);
  const topAmount = deployable * topPctOfDeployable / 100;
  const rest = deployable - topAmount;
  const rows = [
    { route: 'liquid', amountCROSS: liquid, pct: liquidPct, reason: 'reserve' },
    { route: top.route, amountCROSS: topAmount, pct: topAmount / amount * 100, reason: 'highest risk-adjusted score' },
  ];
  if (second && rest > 0) rows.push({ route: second.route, amountCROSS: rest, pct: rest / amount * 100, reason: 'diversification' });
  else if (rest > 0) rows[0].amountCROSS += rest;
  return rows;
}
