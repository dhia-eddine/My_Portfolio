#!/usr/bin/env python3
import subprocess
import os
import sys

# Change to the project directory
os.chdir('/vercel/share/v0-project')

print("[v0] Installing dependencies...")
result = subprocess.run(['npm', 'install'])
if result.returncode != 0:
    print("[v0] ERROR: npm install failed")
    sys.exit(1)

print("[v0] Starting dev server...")
result = subprocess.run(['npm', 'run', 'dev'])
sys.exit(result.returncode)
