// adapted from https://github.com/rollup/rollup-starter-lib
import pkg from './package.json';
import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals'; // required by some 'rollup-plugin-node-builtins'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'builtin-modules';

const src = 'src';
const dist = 'dist';
const publicJsDist = path.join('public', 'dist', 'js');

const ignoreFolders = ['shared'];
const rollupConfig = [];

function getClientTarget(name) {
  try {
    const data = fs.readFileSync(path.join(src, 'client', 'client-config.json'));
    const targetEnvs = JSON.parse(data);

    if (targetEnvs[name] && targetEnvs[name].target) {
      return targetEnvs[name].target;
    } else {
      return 'browser';
    };
  } catch(err) {
    return 'browser';
  }
}

function getClients() {
  const clientSrc = path.join('src', 'client');
  const filenames = fs.readdirSync(clientSrc);
  const clients = filenames.filter(filename => {
    const relPath = path.join(clientSrc, filename);
    const isDir = fs.lstatSync(relPath).isDirectory();
    return isDir && ignoreFolders.indexOf(filename) === -1;
  });

  return clients;
}

// --------------------------------------------------------------
// CLIENTS
// --------------------------------------------------------------
const clients = getClients();

clients.forEach(client => {
  const target = getClientTarget(client);
  let config;

  if (target === 'browser') {
    // --------------------------------------------------------------
    // BROWSERS
    // --------------------------------------------------------------
    config = {
      input: path.join(src, 'client', client, 'index.js'),
      plugins: [
        commonjs(),
        babel({
          // exclude: 'node_modules/**'
        }),
        resolve(),
        json(),
        nodeBuiltins(),
        globals({
          buffer: false,
          dirname: false,
          filename: false,
        }),
      ],
      output: [
        {
          file: path.join(publicJsDist, `${client}.js`),
          format: 'iife',
          sourcemap: 'inline',
        },
      ]
    };
  } else {
    // --------------------------------------------------------------
    // NODE
    // --------------------------------------------------------------
    config = {
      input: path.join(src, 'client', client, 'index.js'),
      external: Object.keys(pkg.dependencies).concat([
        ...builtins,
        'source-map-support/register',
        'soundworks/thing',
      ]),
      plugins: [
        json(),
        babel({
          // exclude: 'node_modules/**'
        })
      ],
      output: [
        { file: path.join(dist, client, 'index.js'), format: 'cjs', sourcemap: 'inline' },
      ]
    }
  }

  rollupConfig.push(config);
});

// --------------------------------------------------------------
// CONFIG FILES
// --------------------------------------------------------------
const configFolder = path.join(src, 'shared', 'config');
const configFilenames = fs.readdirSync(configFolder);

configFilenames.forEach(configFilename => {
  const config = {
    input: path.join(configFolder, configFilename),
    external: Object.keys(pkg.dependencies).concat(builtins),
    plugins: [
      json(),
      babel({
        // exclude: 'node_modules/**'
      })
    ],
    output: [
      {
        file: path.join(dist, 'shared', 'config', configFilename),
        format: 'cjs',
        sourcemap: 'inline'
      },
    ]
  };

  rollupConfig.push(config);
});

// --------------------------------------------------------------
// SERVER
// --------------------------------------------------------------
const SERVER_CONFIG = {
  input: path.join(src, 'server', 'index.js'),
  external: Object.keys(pkg.dependencies).concat([
    ...builtins,
    'source-map-support/register',
    'soundworks/server',
  ]),
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: [
    { file: path.join(dist, 'server', 'index.js'), format: 'cjs', sourcemap: 'inline' },
  ]
};

rollupConfig.push(SERVER_CONFIG);

export default rollupConfig;
