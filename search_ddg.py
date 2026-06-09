#!/usr/bin/env python3
"""Search DuckDuckGo Lite for Reddit tech support issues."""
import urllib.request, urllib.parse, json, sys, ssl

ctx = ssl.create_default_context()

def ddg_search(query):
    """Search DuckDuckGo Lite."""
    data = urllib.parse.urlencode({'q': query}).encode()
    req = urllib.request.Request(
        'https://lite.duckduckgo.com/lite/',
        data=data,
        headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            return resp.read().decode('utf-8', errors='replace')
    except Exception as e:
        return f"ERROR: {e}"

# Search queries targeting Reddit tech support topics
queries = [
    'site:reddit.com r/techsupport top week',
    'site:reddit.com r/iPhone help problem',
    'site:reddit.com r/Android help issue',
    'site:reddit.com r/Roku problem',
    'site:reddit.com r/Windows10 help',
    'site:reddit.com r/mac help issue'
]

for q in queries:
    print(f"\n=== Query: {q} ===", file=sys.stderr)
    result = ddg_search(q)
    # Extract URLs from HTML
    import re
    urls = re.findall(r'https?://[^\s"<>]+', result)
    for u in urls[:15]:
        if 'reddit.com' in u:
            print(u)
    print(file=sys.stderr)
