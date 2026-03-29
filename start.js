const { spawn } = require('child_process');
const path = require('path');

// Find the actual project directory
const projectDir = '/vercel/share/v0-project';

console.log('Starting development server in:', projectDir);

const proc = spawn('npm', ['run', 'dev'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true
});

proc.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});

proc.on('exit', (code) => {
  console.log('Dev server exited with code:', code);
  process.exit(code);
});
