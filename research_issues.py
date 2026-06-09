#!/usr/bin/env python3
import urllib.request, urllib.parse, re, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context

def ddg_lite_search(query, max_results=30):
    url = 'https://lite.duckduckgo.com/lite/'
    data = urllib.parse.urlencode({'q': query}).encode()
    req = urllib.request.Request(url, data=data, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
    })
    resp = urllib.request.urlopen(req, timeout=30)
    html = resp.read().decode('utf-8', errors='replace')
    
    results = []
    for match in re.finditer(r'<a[^>]*href="(https?://[^"]+)"[^>]*>([^<]*)</a>', html):
        href = match.group(1)
        title = match.group(2).strip()
        if any(domain in href for domain in ['discussions.apple.com', 'learn.microsoft.com', 'community.samsung.com', 'answers.microsoft.com']):
            if href not in [r[0] for r in results]:
                results.append((href, title))
    return results[:max_results]

def fetch_page(url, timeout=15):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        })
        resp = urllib.request.urlopen(req, timeout=timeout)
        html = resp.read().decode('utf-8', errors='replace')
        return html
    except Exception as e:
        return f"ERROR: {e}"

print("=" * 70)
print("TRENDING TECH SUPPORT ISSUES - WEEK OF JUNE 2026")
print("=" * 70)

sources = [
    {
        'name': 'Apple Support Community',
        'queries': [
            'site:discussions.apple.com recent issue problem',
            'site:discussions.apple.com iOS iPhone help',
            'site:discussions.apple.com Mac problem',
        ]
    },
    {
        'name': 'Microsoft Answers',
        'queries': [
            'site:learn.microsoft.com/en-us/answers/ issue problem',
            'site:learn.microsoft.com/en-us/answers/ Windows problem',
            'site:learn.microsoft.com/en-us/answers/ recent question',
        ]
    },
    {
        'name': 'Samsung Community',
        'queries': [
            'site:us.community.samsung.com issue problem',
            'site:us.community.samsung.com Galaxy problem',
            'site:us.community.samsung.com help support',
        ]
    }
]

all_results = {}
for source in sources:
    print(f"\n\n--- {source['name']} ---")
    source_urls = set()
    for q in source['queries']:
        print(f"  Query: {q}")
        results = ddg_lite_search(q)
        for href, title in results:
            if href not in source_urls:
                source_urls.add(href)
                print(f"    {title[:100]}")
                print(f"      {href}")
        time.sleep(1.5)
    all_results[source['name']] = list(source_urls)[:15]

print("\n\n=========================================")
print("PAGE DETAILS")
print("=========================================")

for source_name, urls in all_results.items():
    print(f"\n--- {source_name} ({len(urls)} URLs) ---")
    for i, url in enumerate(urls[:5]):
        print(f"\n  [{i+1}] {url}")
        html = fetch_page(url)
        if html.startswith("ERROR:"):
            print(f"      STATUS: {html}")
        else:
            text = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html)
            text = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', text)
            text = re.sub(r'<[^>]+>', ' ', text)
            text = re.sub(r'\s+', ' ', text).strip()
            # Try to find meaningful content around "issue", "problem", "help"
            sentences = re.split(r'(?<=[.!?])\s+', text)
            relevant = [s for s in sentences if any(w in s.lower() for w in ['issue', 'problem', 'help', 'error', 'crash', 'battery', 'update', 'not working', 'bug'])]
            if relevant:
                for s in relevant[:5]:
                    if len(s) > 30:
                        print(f"      {s[:200]}")
            else:
                print(f"      First 300 chars: {text[:300]}")
        time.sleep(1)

print("\n\n=========================================")
print("SUMMARY")
print("=========================================")
print("\nTop URLs found per source:")
for source_name, urls in all_results.items():
    print(f"\n{source_name}:")
    for u in urls[:5]:
        print(f"  - {u}")
