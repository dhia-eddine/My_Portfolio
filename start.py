#!/usr/bin/env python3
import subprocess
import os
import sys

# The project is in /vercel/share/v0-project according to the working directory message
project_paths = [
    '/vercel/share/v0-project',
    os.path.expanduser('~/My_Portfolio'),
    os.path.expanduser('~/projects/My_Portfolio'),
    '/workspace',
    '/app',
]

for path in project_paths:
    if os.path.exists(os.path.join(path, 'package.json')):
        print(f"[v0] Found project at: {path}")
        os.chdir(path)
        print(f"[v0] Changed to: {os.getcwd()}")
        print(f"[v0] Running: npm run dev")
        result = subprocess.run(['npm', 'run', 'dev'])
        sys.exit(result.returncode)

print(f"[v0] ERROR: Could not find project directory with package.json")
sys.exit(1)
