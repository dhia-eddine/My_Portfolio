#!/usr/bin/env python3
import subprocess
import os
import sys

# Try multiple potential paths
possible_paths = [
    '/vercel/share/v0-project',
    '/home/user/My_Portfolio',
    os.path.expanduser('~/My_Portfolio'),
    os.getcwd(),
]

project_dir = None
for path in possible_paths:
    if os.path.exists(os.path.join(path, 'package.json')):
        project_dir = path
        print(f"[v0] Found project at: {project_dir}")
        break

if not project_dir:
    print("[v0] ERROR: Could not find project directory with package.json")
    sys.exit(1)

os.chdir(project_dir)
print(f"[v0] Changed to: {os.getcwd()}")
print("[v0] Installing dependencies...")
result = subprocess.run(['npm', 'install'])
if result.returncode == 0:
    print("[v0] Dependencies installed successfully")
    print("[v0] Starting dev server...")
    subprocess.run(['npm', 'run', 'dev'])
else:
    print(f"[v0] npm install failed with code {result.returncode}")
