import subprocess
import os

# List what's in the current directory
print("Current dir:", os.getcwd())
print("Contents:", os.listdir())

# Try to find package.json
for root, dirs, files in os.walk('.'):
    if 'package.json' in files:
        print(f"Found package.json in: {root}")
        os.chdir(root)
        break

print("Working dir now:", os.getcwd())
result = subprocess.run(['npm', 'run', 'dev'])
