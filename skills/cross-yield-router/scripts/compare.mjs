#!/usr/bin/env node
import { handleMain, out } from './_json.mjs';
import { siblings } from './_sibling.mjs';
import { routeRows } from './_yield.mjs';

async function main() {
  const routes = routeRows();
  out({
    ok: true,
    skill: 'cross-yield-router',
    command: 'compare',
    routes: routes.sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity)),
    siblingSkills: siblings(),
    notes: [
      'APR values are comparable only when sources use the same time basis.',
      'Missing APR routes require explicit overrides before they can win.',
    ],
  });
}

handleMain(main());
