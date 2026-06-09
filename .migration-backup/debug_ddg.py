import urllib.request, urllib.parse, ssl

ctx = ssl.create_default_context()
q = 'reddit r/techsupport'
data = urllib.parse.urlencode({'q': q}).encode()
req = urllib.request.Request(
    'https://lite.duckduckgo.com/lite/',
    data=data,
    headers={
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
)
try:
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='replace')
        print(html[:3000])
except Exception as e:
    print(f"ERROR: {e}")
