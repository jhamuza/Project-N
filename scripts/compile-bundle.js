const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT   = path.resolve(__dirname, '..');
const NM     = path.join(ROOT, 'node_modules');
const SRC    = path.join(ROOT, 'NCEF-Portal-Bundle.html');
const DIST   = path.join(ROOT, 'dist');
const OUT    = path.join(DIST, 'index.html');

// When LOCAL=1 (screenshot mode), vendor scripts are copied to dist/vendor/
// and CDN URLs are replaced with local paths so the build works offline.
const LOCAL = process.env.LOCAL === '1';

const BABEL_OPTS = {
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  plugins: ['@babel/plugin-transform-block-scoping'],
};

function compileJSX(code, label) {
  try {
    const result = babel.transformSync(code, { ...BABEL_OPTS, filename: label });
    return result.code;
  } catch (err) {
    console.error(`Babel error in ${label}:\n${err.message}`);
    process.exit(1);
  }
}

let html = fs.readFileSync(SRC, 'utf8');

// 1. Remove base href (wrong path prefix for Vercel)
html = html.replace(/<base href="[^"]*">\n?/, '');
console.log('✓ Removed <base href>');

// 2. Inline tokens.css
const cssPath = path.join(ROOT, 'styles', 'tokens.css');
const css = fs.readFileSync(cssPath, 'utf8');
html = html.replace(
  '<link rel="stylesheet" href="styles/tokens.css">',
  `<style>\n${css}\n</style>`
);
console.log('✓ Inlined styles/tokens.css');

// 3. Inline mock.js
const mockPath = path.join(ROOT, 'data', 'mock.js');
const mock = fs.readFileSync(mockPath, 'utf8');
html = html.replace(
  '<script src="data/mock.js"></script>',
  `<script>\n${mock}\n</script>`
);
console.log('✓ Inlined data/mock.js');

// 4. Inline + compile components/shared.jsx (src-based text/babel tag)
const sharedPath = path.join(ROOT, 'components', 'shared.jsx');
const sharedSrc = fs.readFileSync(sharedPath, 'utf8');
const sharedCompiled = compileJSX(sharedSrc, 'shared.jsx');
html = html.replace(
  '<script type="text/babel" src="components/shared.jsx"></script>',
  `<script>\n${sharedCompiled}\n</script>`
);
console.log('✓ Inlined + compiled components/shared.jsx');

// 5. Compile all remaining inline <script type="text/babel"> blocks
// block-scoping plugin converts const/let → var so duplicate declarations
// across blocks are harmless, and top-level vars like SCREENS stay global
let blockCount = 0;
html = html.replace(/<script type="text\/babel">([\s\S]*?)<\/script>/g, (_, code) => {
  blockCount++;
  const compiled = compileJSX(code, `inline-block-${blockCount}`);
  return `<script>\n${compiled}\n</script>`;
});
console.log(`✓ Compiled ${blockCount} inline JSX blocks`);

// 6. Remove Babel Standalone CDN script (no longer needed)
html = html.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[^>]*><\/script>\n?/, '');
console.log('✓ Removed Babel Standalone CDN script');

// 7. LOCAL mode: vendor all CDN scripts so the build works fully offline
if (LOCAL) {
  const vendorDir = path.join(DIST, 'vendor');
  fs.mkdirSync(vendorDir, { recursive: true });

  const CDN_MAP = [
    {
      cdn: 'https://unpkg.com/react@18.3.1/umd/react.development.js',
      src: path.join(NM, 'react/umd/react.development.js'),
      dest: 'react.js',
    },
    {
      cdn: 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
      src: path.join(NM, 'react-dom/umd/react-dom.development.js'),
      dest: 'react-dom.js',
    },
    {
      cdn: 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js',
      src: path.join(NM, 'dayjs/dayjs.min.js'),
      dest: 'dayjs.js',
    },
    {
      cdn: 'https://unpkg.com/antd@5.12.8/dist/antd.min.js',
      src: path.join(NM, 'antd/dist/antd.min.js'),
      dest: 'antd.js',
    },
    {
      cdn: 'https://unpkg.com/@ant-design/icons@5.3.7/dist/index.umd.min.js',
      src: path.join(NM, '@ant-design/icons/dist/index.umd.min.js'),
      dest: 'antd-icons.js',
    },
    {
      cdn: 'https://cdn.plot.ly/plotly-2.35.2.min.js',
      src: path.join(NM, 'plotly.js-dist-min/plotly.min.js'),
      dest: 'plotly.js',
    },
  ];

  const CSS_MAP = [
    {
      cdn: 'https://unpkg.com/antd@5.12.8/dist/reset.css',
      src: path.join(NM, 'antd/dist/reset.css'),
      dest: 'antd-reset.css',
    },
  ];

  for (const { cdn, src, dest } of CDN_MAP) {
    fs.copyFileSync(src, path.join(vendorDir, dest));
    // Use regex to replace the CDN <script src> including any integrity/crossorigin attrs
    const escapedCdn = cdn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(
      new RegExp(`<script src="${escapedCdn}"[^>]*></script>`),
      `<script src="vendor/${dest}"></script>`
    );
  }

  for (const { cdn, src, dest } of CSS_MAP) {
    fs.copyFileSync(src, path.join(vendorDir, dest));
    const escapedCdn = cdn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(
      new RegExp(`<link rel="stylesheet" href="${escapedCdn}"[^>]*>`),
      `<link rel="stylesheet" href="vendor/${dest}">`
    );
  }

  // Remove Google Fonts (cosmetic only — falls back to system fonts offline)
  html = html.replace(/<link [^>]*fonts\.googleapis\.com[^>]*>\n?/g, '');
  html = html.replace(/<link [^>]*fonts\.gstatic\.com[^>]*>\n?/g, '');

  console.log('✓ Vendored all CDN assets for offline use');
}

// Write output
fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(OUT, html, 'utf8');
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`\nBuild complete → dist/index.html (${kb} KB)${LOCAL ? ' [offline/local]' : ''}`);

