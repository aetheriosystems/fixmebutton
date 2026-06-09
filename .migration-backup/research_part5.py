#!/usr/bin/env python3
import urllib.request, urllib.parse, re, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context

def ddg_lite_search(query, max_results=20):
    url = 'https://lite.duckduckgo.com/lite/'
    data = urllib.parse.urlencode({'q': query}).encode()
    req = urllib.request.Request(url, data=data, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    })
    resp = urllib.request.urlopen(req, timeout=30)
    html = resp.read().decode('utf-8', errors='replace')
    
    results = []
    for match in re.finditer(r'<a[^>]*href="(https?://[^"]+)"[^>]*>([^<]*)</a>', html):
        href = match.group(1)
        title = match.group(2).strip()
        if href not in [r[0] for r in results]:
            results.append((href, title))
    return results

# Try Samsung with different search term variations
print("=== FINAL SAMSUNG SEARCH ATTEMPTS ===")
for q in [
    'samsung community "screen" OR "battery" OR "update" OR "camera" site:us.community.samsung.com',
    'samsung "galaxy" community help',
    'samsung forum issue problem galaxy s25 ultra',
    '"samsung community" support thread',
    'inurl:community.samsung.com "issue" OR "problem" OR "battery"',
]:
    print(f"\nQuery: {q}")
    results = ddg_lite_search(q)
    if results:
        for h, t in results[:8]:
            if 'samsung' in h.lower() or ('samsung' in t.lower() and len(t) > 5):
                print(f"  {t[:120]}")
                print(f"  {h}")
    else:
        print("  No results")
    time.sleep(1.5)

# Also try getting more info from Microsoft Q&A about the KB5089573 issue
print("\n\n=== MICROSOFT Q&A - KB5089573 ===")
def fetch_text(url):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        })
        resp = urllib.request.urlopen(req, timeout=15)
        html = resp.read().decode('utf-8', errors='replace')
        return html
    except Exception as e:
        return f'ERROR: {e}'

html = fetch_text('https://learn.microsoft.com/en-us/answers/questions/5903332/issues-with-updating-kb5089573')
if not html.startswith('ERROR:'):
    text = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html)
    text = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', text)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'&[a-z]+;', ' ', text)
    text = re.sub(r'&#[0-9]+;', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    for line in text.split('.'):
        if any(w in line.lower() for w in ['issue', 'problem', 'error', 'fail', 'update', 'kb']):
            if len(line) > 60:
                print(f"  {line[:300].strip()}.")

