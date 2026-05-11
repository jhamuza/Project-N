const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'NCEF-Portal-Bundle.html');
const DIST = path.join(ROOT, 'dist');
const OUT  = path.join(DIST, 'index.html');

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

// Write output
fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(OUT, html, 'utf8');
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`\nBuild complete → dist/index.html (${kb} KB)`);
