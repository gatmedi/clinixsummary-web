/**
 * robots.txt generator (SEO/GEO spec CRAWLER-001/002/005).
 *
 * The deployed robots.txt is a build artifact of build/crawler-policy.json -
 * policy lives in reviewable config, the text file is never hand-edited.
 *
 * With every managed bot on "allow" (the 2026-08-31 owner decision), a single
 * `User-agent: *` group IS the policy: identical treatment for search,
 * retrieval and training crawlers, with the application-surface Disallow
 * hygiene applied uniformly. If any bot is ever flipped to "block", this
 * generator emits it an explicit group - robots groups do not inherit, so a
 * per-bot group must restate the disallow list.
 *
 * Usage:  node build/robots.mjs        (writes ./robots.txt)
 *         node build/robots.mjs --check (verifies robots.txt matches policy)
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const policy = JSON.parse(await readFile(path.join(ROOT, 'build', 'crawler-policy.json'), 'utf8'));

const lines = [];
lines.push('# GENERATED from build/crawler-policy.json - do not hand-edit.');
lines.push('# Policy: all managed search/retrieval/training crawlers allowed on public');
lines.push('# routes (owner decision 2026-08-31). Application surfaces disallowed as');
lines.push('# crawl hygiene; their real controls are X-Robots-Tag + authentication.');
lines.push('');

const blocked = Object.entries(policy.managed_bots).filter(([, v]) => v.policy === 'block');
const allowedNames = Object.entries(policy.managed_bots)
    .filter(([, v]) => v.policy === 'allow').map(([k]) => k);

lines.push('# Allowed (identical treatment via the * group): ' + allowedNames.join(', '));
lines.push('User-agent: *');
for (const d of policy.disallow_for_all) lines.push('Disallow: ' + d);
lines.push('');

for (const [bot, cfg] of blocked) {
    lines.push(`# ${cfg.purpose}`);
    lines.push(`User-agent: ${bot}`);
    lines.push('Disallow: /');
    lines.push('');
}

lines.push('Sitemap: ' + policy.sitemap);
lines.push('');

const output = lines.join('\n');
const target = path.join(ROOT, 'robots.txt');

if (process.argv.includes('--check')) {
    const current = await readFile(target, 'utf8');
    if (current !== output) {
        console.error('robots.txt DOES NOT match crawler-policy.json - run: node build/robots.mjs');
        process.exit(1);
    }
    console.log('robots.txt matches crawler-policy.json');
} else {
    await writeFile(target, output);
    console.log('robots.txt written (' + output.length + ' bytes, ' + blocked.length + ' blocked bots)');
}
