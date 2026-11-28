#!/usr/bin/env node
/**
 * Regional dictionaries.
 *
 * A regional locale (pt-pt, es-es, fr-ca) is NOT a second full translation. It
 * is its family's dictionary (pt, es, fr) with the entries that genuinely
 * differ in that region replaced - data/i18n/overrides/<locale>.json, a flat
 * { "section.key": "regional wording" } object. This writes the merged
 * data/i18n/<locale>.json the site loads, so the runtime needs no knowledge of
 * overrides at all.
 *
 * Edit the family file or the override file, never the generated one: it is
 * rebuilt from them on every `npm run build:all`.
 *
 * FAILS when an override names a key its family does not have - that is a typo
 * or a key that was renamed, and it would otherwise vanish silently.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(await readFile(path.join(ROOT, 'build', 'config.json'), 'utf8'));
const read = async (p) => JSON.parse(await readFile(path.join(ROOT, p), 'utf8'));

let failed = false;

for (const [locale, family] of Object.entries(CFG.localeFamilies || {})) {
  const dict = await read(`data/i18n/${family}.json`);
  const overrides = await read(`data/i18n/overrides/${locale}.json`);
  let applied = 0;

  for (const [dotted, value] of Object.entries(overrides)) {
    const parts = dotted.split('.');
    const leaf = parts.pop();
    let node = dict;
    for (const part of parts) node = node && typeof node === 'object' ? node[part] : undefined;

    if (!node || typeof node !== 'object' || typeof node[leaf] !== 'string') {
      console.error(`  FAIL ${locale}: override "${dotted}" has no matching entry in ${family}.json`);
      failed = true;
      continue;
    }
    if (typeof value !== 'string' || !value.trim()) {
      console.error(`  FAIL ${locale}: override "${dotted}" is empty`);
      failed = true;
      continue;
    }
    node[leaf] = value;
    applied++;
  }

  await writeFile(path.join(ROOT, 'data', 'i18n', `${locale}.json`), JSON.stringify(dict, null, 2) + '\n', 'utf8');
  console.log(`  ${locale}: ${family}.json + ${applied} regional overrides`);
}

if (failed) process.exit(1);
