// Webpack 4 (used by react-scripts 2.x) relies on MD4 hashing, which OpenSSL 3
// (Node 17+) disables by default. Enable the legacy provider only when needed,
// since older Node versions reject the flag.
const { spawnSync } = require('child_process');

const major = parseInt(process.versions.node.split('.')[0], 10);
const env = { ...process.env };
const nodeOptions = env.NODE_OPTIONS || '';
if (major >= 17 && !nodeOptions.includes('--openssl-legacy-provider')) {
  env.NODE_OPTIONS = `${nodeOptions} --openssl-legacy-provider`.trim();
}

const result = spawnSync(
  process.execPath,
  [require.resolve('react-scripts/bin/react-scripts.js'), ...process.argv.slice(2)],
  { stdio: 'inherit', env }
);
process.exit(result.status === null ? 1 : result.status);
