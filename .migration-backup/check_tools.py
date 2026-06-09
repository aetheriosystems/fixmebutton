import sys
for mod in ['requests', 'httpx', 'aiohttp', 'urllib', 'json']:
    try:
        __import__(mod)
        print(f"{mod} available")
    except ImportError:
        print(f"{mod} NOT available")
