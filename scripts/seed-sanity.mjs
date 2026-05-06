import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

async function loadEnvFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();

      if (!line || line.startsWith('#')) {
        continue;
      }

      const separatorIndex = line.indexOf('=');

      if (separatorIndex === -1) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

await loadEnvFile(path.resolve('.env.local'));
await loadEnvFile(path.resolve('.env'));

const seedPath = process.argv[2] || 'sanity/seed/phase1-seed.json';
const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  '6pelmu7l';
const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production';
const apiVersion =
  process.env.SANITY_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  '2026-01-01';
const token =
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    [
      'Missing Sanity write token.',
      '',
      'Create a project token with write access in Sanity Manage, then run:',
      '  $env:SANITY_AUTH_TOKEN="<token>"; pnpm run seed:sanity',
      '',
      'Do not commit the token.',
    ].join('\n'),
  );
  process.exit(1);
}

const seedContent = await readFile(seedPath, 'utf8');
const documents = JSON.parse(seedContent);

if (!Array.isArray(documents)) {
  throw new Error(`Expected ${seedPath} to contain a JSON array of Sanity documents.`);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

let transaction = client.transaction();

for (const document of documents) {
  transaction = transaction.createOrReplace(document);
}

await transaction.commit({ visibility: 'sync' });

console.log(
  `Seeded ${documents.length} documents into Sanity project ${projectId}/${dataset}.`,
);
