#!/usr/bin/env python3
import urllib.request, urllib.parse, re, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context

def ddg_lite_search(query, max_results=20):
    url = 'https://lite.duckduckgo.com/lite/'
    data = urllib.parse.urlencode({'q': query}).encode()
    req = urllib.request.Request(url, data=data, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
    })
    resp = urllib.request.urlopen(req, timeout=30)
    html = resp.read().decode('utf-8', errors='replace')
    
    results = []
    for match in re.finditer(r'<a[^>]*href="(https?://[^"]+)"[^>]*>([^<]*)</a>', html):
        href = match.group(1)
        title = match.group(2).strip()
        if any(domain in href for domain in ['discussions.apple.com', 'learn.microsoft.com', 'community.samsung.com', 'answers.microsoft.com', 'answers.samsung.com']):
            if href not in [r[0] for r in results]:
                results.append((href, title))
    return results

def fetch_page(url, timeout=15):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        resp = urllib.request.urlopen(req, timeout=timeout)
        html = resp.read().decode('utf-8', errors='replace')
        return html
    except Exception as e:
        return f"ERROR: {e}"

def extract_text(html):
    text = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html)
    text = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', text)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'&[a-z]+;', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

print("=" * 70)
print("PART 2: ADDITIONAL SEARCHES")
print("=" * 70)

# Try alternative domains and queries
extra_queries = [
    ('Microsoft Answers (answers.microsoft.com)', 'site:answers.microsoft.com issue problem help'),
    ('Microsoft Answers (learn.microsoft.com)', 'site:learn.microsoft.com/en-us/answers/ question issue'),
    ('Samsung Community (us.community.samsung.com)', 'site:us.community.samsung.com Galaxy issue problem'),
    ('Samsung Community (r2.community.samsung.com)', 'site:r2.community.samsung.com issue problem'),
    ('Apple Community (macOS)', 'site:discussions.apple.com macOS Tahoe problem issue'),
    ('Apple Community (iOS)', 'site:discussions.apple.com iOS 26 problem issue'),
    ('Microsoft Answers (Windows 11)', 'site:answers.microsoft.com Windows 11 update problem'),
    ('Samsung Community (battery)', 'site:us.community.samsung.com battery issue problem'),
]

for name, query in extra_queries:
    print(f"\n--- {name} ---")
    print(f"  Query: {query}")
    results = ddg_lite_search(query)
    if results:
        for href, title in results[:10]:
            print(f"    {title[:120]}")
            print(f"      {href}")
    else:
        print("  No results found")
    time.sleep(1.5)

print("\n\n=========================================")
print("FETCHING MORE APPLE THREAD DETAILS")
print("=========================================")

apple_urls = [
    "https://discussions.apple.com/thread/256006558",
    "https://discussions.apple.com/thread/256180077",
    "https://discussions.apple.com/thread/256148349",
    "https://discussions.apple.com/thread/256145450",
    "https://discussions.apple.com/thread/255854268",
    "https://discussions.apple.com/thread/256137526",
    "https://discussions.apple.com/thread/256187434",
]

for url in apple_urls:
    print(f"\n  URL: {url}")
    html = fetch_page(url)
    if html.startswith("ERROR:"):
        print(f"      STATUS: {html}")
    else:
        if "Security Verification" in html:
            print("      STATUS: Blocked by security verification")
            # Try with a more browser-like request
            try:
                import http.cookiejar
                cj = http.cookiejar.CookieJar()
                opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
                req = urllib.request.Request(url, headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer': 'https://discussions.apple.com/',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                })
                resp = opener.open(req, timeout=15)
                html = resp.read().decode('utf-8', errors='replace')
                if "Security Verification" not in html:
                    print("      STATUS: Retrieved with browser-like headers")
                else:
                    print("      STATUS: Still blocked by security verification")
            except Exception as e2:
                print(f"      STATUS: Still blocked: {e2}")
        
        if "Security Verification" not in html:
            title_m = re.search(r'<h1[^>]*>([^<]+)</h1>', html)
            title = title_m.group(1).strip() if title_m else "No title found"
            print(f"      Title: {title[:120]}")
            text = extract_text(html)
            # Find relevant content
            for keyword in ['issue', 'problem', 'error', 'update', 'crash', 'battery', 'not working', 'help']:
                idx = text.lower().find(keyword)
                if idx > 0:
                    context = text[max(0,idx-50):idx+200]
                    if len(context) > 30:
                        print(f"      [{keyword}]: ...{context}...")
                        break
    time.sleep(1.5)

