/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const esbuild = require('esbuild');
const { dependencies, devDependencies, peerDependencies } = require('./package.json');

// Combine all dependencies to exclude from the bundle
const externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(devDependencies || {}),
  ...Object.keys(peerDependencies || {}),
];

esbuild.build({
  entryPoints: ['./src/server.js'],
  bundle: true,
  //outfile: './dist/bundle.main.js',
  outfile: 'bundle.main.js',
  external: externals,
  platform: 'node', // Use 'browser' if targeting browser
  sourcemap: false, // Generate source maps
  minify: true,
  format: 'cjs', // CommonJS format; change to 'esm' for ES module output
}).catch(() => process.exit(1));