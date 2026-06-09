import os
import urllib.request
import ssl

# Test Neon connection via HTTP API
url = "https://ep-sparkling-firefly-apcdzy19.c-7.us-east-1.aws.neon.tech/sql"
password = "npg_vXIMpCO0oYb1"

data = '{"query":"SELECT 1"}'
req = urllib.request.Request(
    url,
    data=data.encode(),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {password}",
        "Neon-Database": "neondb",
    },
)

ctx = ssl.create_default_context()
try:
    with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
        print("Connected!", resp.read().decode()[:200])
except Exception as e:
    print(f"Error: {e}")
