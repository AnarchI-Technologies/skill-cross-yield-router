import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const skillDir = resolve(here, '..');
const repoDir = resolve(skillDir, '..', '..');

export function crossSkillsRoot() {
  return process.env.CROSS_SKILLS_ROOT ? resolve(process.env.CROSS_SKILLS_ROOT) : resolve(repoDir, '..');
}

export function siblingSkill(name) {
  const path = join(crossSkillsRoot(), `skill-${name}`, 'skills', name);
  return { name, path, exists: existsSync(path) };
}

export function siblings() {
  return ['cross-stake', 'cross-rewards', 'cross-dex-trade', 'cross-forge'].map(siblingSkill);
}

export function runNode(script, args = []) {
  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: dirname(script), env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code) => resolvePromise({ code, stdout, stderr }));
    child.on('error', (err) => resolvePromise({ code: 1, stdout: '', stderr: err.message }));
  });
}
