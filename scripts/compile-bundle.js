const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const NM   = path.join(ROOT, 'node_modules');
const SRC  = path.join(ROOT, 'NCEF-Portal-Bundle.html');
const DIST = path.join(ROOT, 'dist');
const OUT  = path.join(DIST, 'index.html');

// LOCAL=1 vendors all CDN scripts locally so the build works fully offline
const LOCAL = process.env.LOCAL === '1';

const BABEL_OPTS = {
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  // converts const/let → var: allows duplicate declarations across script blocks
  // and keeps top-level vars like SCREENS accessible globally
  plugins: ['@babel/plugin-transform-block-scoping'],
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function compileJSX(code, label) {
  try {
    return babel.transformSync(code, { ...BABEL_OPTS, filename: label }).code;
  } catch (err) {
    console.error(`Babel error in ${label}:\n${err.message}`);
    process.exit(1);
  }
}

let html = fs.readFileSync(SRC, 'utf8');

html = html.replace(/<base href="[^"]*">\n?/, '');
console.log('✓ Removed <base href>');

const css = fs.readFileSync(path.join(ROOT, 'styles', 'tokens.css'), 'utf8');
html = html.replace('<link rel="stylesheet" href="styles/tokens.css">', `<style>\n${css}\n</style>`);
console.log('✓ Inlined styles/tokens.css');

const mock = fs.readFileSync(path.join(ROOT, 'data', 'mock.js'), 'utf8');
html = html.replace('<script src="data/mock.js"></script>', `<script>\n${mock}\n</script>`);
console.log('✓ Inlined data/mock.js');

const sharedCompiled = compileJSX(fs.readFileSync(path.join(ROOT, 'components', 'shared.jsx'), 'utf8'), 'shared.jsx');
html = html.replace(
  '<script type="text/babel" src="components/shared.jsx"></script>',
  `<script>\n${sharedCompiled}\n</script>`
);
console.log('✓ Inlined + compiled components/shared.jsx');

let blockCount = 0;
html = html.replace(/<script type="text\/babel">([\s\S]*?)<\/script>/g, (_, code) => {
  blockCount++;
  return `<script>\n${compileJSX(code, `inline-block-${blockCount}`)}\n</script>`;
});
console.log(`✓ Compiled ${blockCount} inline JSX blocks`);

html = html.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[^>]*><\/script>\n?/, '');
console.log('✓ Removed Babel Standalone CDN script');

if (LOCAL) {
  const vendorDir = path.join(DIST, 'vendor');
  fs.mkdirSync(vendorDir, { recursive: true });

  const VENDOR_ASSETS = [
    { cdn: 'https://unpkg.com/react@18.3.1/umd/react.development.js',          src: path.join(NM, 'react/umd/react.development.js'),                  dest: 'react.js',       tag: 'script' },
    { cdn: 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',  src: path.join(NM, 'react-dom/umd/react-dom.development.js'),           dest: 'react-dom.js',   tag: 'script' },
    { cdn: 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js',                     src: path.join(NM, 'dayjs/dayjs.min.js'),                               dest: 'dayjs.js',       tag: 'script' },
    { cdn: 'https://unpkg.com/antd@5.12.8/dist/antd.min.js',                   src: path.join(NM, 'antd/dist/antd.min.js'),                            dest: 'antd.js',        tag: 'script' },
    { cdn: 'https://unpkg.com/@ant-design/icons@5.3.7/dist/index.umd.min.js',  src: path.join(NM, '@ant-design/icons/dist/index.umd.min.js'),          dest: 'antd-icons.js',  tag: 'script' },
    { cdn: 'https://cdn.plot.ly/plotly-2.35.2.min.js',                         src: path.join(NM, 'plotly.js-dist-min/plotly.min.js'),                 dest: 'plotly.js',      tag: 'script' },
    { cdn: 'https://unpkg.com/antd@5.12.8/dist/reset.css',                     src: path.join(NM, 'antd/dist/reset.css'),                              dest: 'antd-reset.css', tag: 'link'   },
  ];

  for (const { cdn, src, dest, tag } of VENDOR_ASSETS) {
    fs.copyFileSync(src, path.join(vendorDir, dest));
    const pattern = tag === 'script'
      ? new RegExp(`<script src="${escapeRegex(cdn)}"[^>]*></script>`)
      : new RegExp(`<link rel="stylesheet" href="${escapeRegex(cdn)}"[^>]*>`);
    const replacement = tag === 'script'
      ? `<script src="vendor/${dest}"></script>`
      : `<link rel="stylesheet" href="vendor/${dest}">`;
    html = html.replace(pattern, replacement);
  }

  // Google Fonts are cosmetic — fall back to system fonts offline
  html = html.replace(/<link [^>]*(fonts\.googleapis|fonts\.gstatic)\.com[^>]*>\n?/g, '');

  console.log('✓ Vendored all CDN assets for offline use');
}

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(OUT, html, 'utf8');
const kb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
console.log(`\nBuild complete → dist/index.html (${kb} KB)${LOCAL ? ' [offline/local]' : ''}`);
