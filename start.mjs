import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting dev server from:', __dirname);

const dev = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

dev.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});

dev.on('exit', (code) => {
  process.exit(code);
});
