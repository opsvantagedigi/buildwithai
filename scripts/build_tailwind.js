const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
let autoprefixer;
try { autoprefixer = require('autoprefixer'); } catch (e) { autoprefixer = null; }

async function build() {
  const inPath = path.join(__dirname, '..', 'src', 'app', 'globals.css');
  const outDir = path.join(__dirname, '..', 'tmp');
  const outPath = path.join(outDir, 'tailwind.output.css');

  if (!fs.existsSync(inPath)) {
    console.error('Input CSS not found:', inPath);
    process.exit(2);
  }
  const css = fs.readFileSync(inPath, 'utf8');
  const plugins = [tailwindcss(path.join(__dirname, '..', 'tailwind.config.js'))];
  if (autoprefixer) plugins.push(autoprefixer);

  try {
    const result = await postcss(plugins).process(css, { from: inPath, to: outPath });
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    fs.writeFileSync(outPath, result.css, 'utf8');
    console.log('Tailwind build succeeded — output:', outPath);
    process.exit(0);
  } catch (err) {
    console.error('Tailwind build failed:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

build();
