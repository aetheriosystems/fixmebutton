#!/usr/bin/env python3
import urllib.request, urllib.parse, re, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context

def ddg_lite_search(query, max_results=20):
    url = 'https://lite.duckduckgo.com/lite/'
    data = urllib.parse.urlencode({'q': query}).encode()
    req = urllib.request.Request(url, data=data, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
    return results

def fetch_page(url, timeout=15):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
    text = re.sub(r'&#[0-9]+;', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Try more Samsung searches with different domains
print("=== ADDITIONAL SAMSUNG SEARCHES ===")
samsung_queries = [
    ('samsung community galaxy', 'site:us.community.samsung.com galaxy s25 issue'),
    ('samsung members', 'site:members.samsung.com issue problem'),
    ('samsung forum', 'site:forum.samsung.com issue problem'),
    ('samsung galaxy s25 problems', 'site:us.community.samsung.com "galaxy s25" problem'),
    ('samsung community recent', 'site:us.community.samsung.com recent post'),
]

for name, query in samsung_queries:
    print(f"\n--- {name} ---")
    print(f"  Query: {query}")
    results = ddg_lite_search(query)
    if results:
        for href, title in results[:8]:
            print(f"    {title[:120]}")
            print(f"      {href}")
    else:
        print("  No results found")
    time.sleep(1.5)

# Now let's fetch some Microsoft Answers pages for details
print("\n\n=== MICROSOFT ANSWERS PAGE DETAILS ===")
ms_urls = [
    "https://answers.microsoft.com/en-us/outlook_com/forum/all/after-latest-outlook-1511-update-pop-email-account/62f4f9d2-6f3e-4ea4-b0b6-757e523eaac4",
    "https://answers.microsoft.com/en-us/windows/forum/all/cannot-search-for-settings-or-apps-on-windows-11/84d024c2-4a83-4ef0-88a2-a72517ffbb5d",
    "https://answers.microsoft.com/en-us/windows/forum/all/after-the-recent-windows-10-update-i-cant-download/cc282cb2-67e7-4767-bc3e-51d4ea49cc98",
    "https://answers.microsoft.com/en-us/windows/forum/all/reboot-and-select-prober-boot-device-issue/75975ed0-977c-44d2-bf0f-a081b0d319e0",
    "https://learn.microsoft.com/en-us/answers/questions/5827931/march-10-2026-update-kb5079473-issues",
    "https://learn.microsoft.com/en-us/answers/questions/5553387/issues-with-screen-saver-and-sleep-mode-after-wind",
    "https://learn.microsoft.com/en-us/answers/questions/5889341/we-are-experiencing-internet-performance-issues-ac",
    "https://learn.microsoft.com/en-us/answers/questions/5903332/issues-with-updating-kb5089573",
    "https://learn.microsoft.com/en-us/answers/questions/3897970/dism-restorehealth-stuck-at-62-3-(info-resolved)",
]

for url in ms_urls:
    print(f"\n  URL: {url}")
    html = fetch_page(url)
    if html.startswith("ERROR:"):
        print(f"      STATUS: {html}")
    else:
        text = extract_text(html)
        print(f"      Length: {len(text)} chars")
        # Extract title
        title_m = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
        if title_m:
            print(f"      Title: {title_m.group(1)[:120]}")
        # Find first meaningful paragraph
        lines = [l.strip() for l in text.split('.') if len(l.strip()) > 40]
        for line in lines[:3]:
            print(f"      >> {line[:200]}.")
    time.sleep(1.5)

print("\n\n=== APPLE THREADS WITH DETAILS FROM DDG TITLES ===")
# The DDG search already gave us useful titles and thread IDs
print("We have the following threads from Apple Community:")
apple_threads = [
    ("https://discussions.apple.com/thread/256137526", "iOS 26 recovery loop - iPhone 14 Pro: phone suddenly shuts down, restarts to recovery screen saying 'no issues found', 497+ me-too responses"),
    ("https://discussions.apple.com/thread/256187434", "iPhone 17 Pro Max persistent issues: Genius Bar diagnostics show 'no issues' but device has serious ongoing problems"),
    ("https://discussions.apple.com/thread/256145450", "iPhone 17 Pro Cellular Connection Issue: problems with cellular connectivity on iPhone 17 Pro"),
    ("https://discussions.apple.com/thread/256148349", "Issues with latest iOS 26 on iPhone 16 Pro: problems after updating to iOS 26"),
    ("https://discussions.apple.com/thread/256006558", "Multiple Critical Bugs After macOS Update: critical bugs found after updating macOS"),
    ("https://discussions.apple.com/thread/256180077", "Problems with macOS Tahoe 26.0.1: various problems after updating to macOS Tahoe 26.0.1"),
    ("https://discussions.apple.com/thread/255854268", "What is happening with the latest update?: general discussion about issues with the latest Apple software update"),
    ("https://discussions.apple.com/thread/256271685", "Software Update Causing Problems: software update causing various problems on devices"),
    ("https://discussions.apple.com/thread/255554896", "How to Fix my iPhone Issues After iOS 17: issues persisting after iOS 17 update"),
]
for url, desc in apple_threads:
    print(f"  - {desc}")
    print(f"    {url}")

