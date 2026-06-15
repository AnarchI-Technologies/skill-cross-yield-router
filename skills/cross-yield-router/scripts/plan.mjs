#!/usr/bin/env node
import { fail, handleMain, out } from './_json.mjs';
import { allocationFor, routeRows } from './_yield.mjs';

function parseArgs(argv) {
  const opts = {};
  const rest = [];
  for (const arg of argv) {
    if (!arg.startsWith('--')) rest.push(arg);
    else {
      const [k, v = 'true'] = arg.slice(2).split('=');
      opts[k] = v;
    }
  }
  return { opts, rest };
}

async function main() {
  const { opts, rest } = parseArgs(process.argv.slice(2));
  const amount = Number(rest[0]);
  const risk = opts.risk || 'balanced';
  if (!Number.isFinite(amount) || amount <= 0) fail('amountCROSS must be positive');
  if (!['conservative', 'balanced', 'aggressive'].includes(risk)) fail('risk must be conservative, balanced, or aggressive');
  const routes = routeRows().sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity));
  const allocation = allocationFor(amount, risk, routes).map((row) => ({
    ...row,
    amountCROSS: Number(row.amountCROSS.toFixed(8)),
    pct: Number(row.pct.toFixed(4)),
  }));
  out({
    ok: true,
    skill: 'cross-yield-router',
    command: 'plan',
    amountCROSS: amount,
    risk,
    routes,
    allocation,
    execution: 'Use cross-treasury or the route-specific skills after separate risk preflight.',
  });
}

handleMain(main());
