#!/usr/bin/env python3
import urllib.request, urllib.parse, re, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context

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

def extract_text(html):
    text = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html)
    text = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', text)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'&[a-z]+;', ' ', text)
    text = re.sub(r'&#[0-9]+;', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Try to access Samsung Community directly
print("=== SAMSUNG COMMUNITY DIRECT ACCESS ===")
html = fetch_text('https://us.community.samsung.com/')
if html.startswith('ERROR:'):
    print(f"Direct access: {html}")
else:
    text = extract_text(html)
    print(f"Page length: {len(text)} chars")
    # Look for recent topics / discussions
    for line in text.split('.'):
        if any(w in line.lower() for w in ['galaxy', 'samsung', 'issue', 'problem', 'battery', 'update', 'error']):
            if len(line) > 40:
                print(f"  {line[:250]}.")

time.sleep(1)

# Try the main community page (redirect target)
print("\n=== SAMSUNG COMMUNITY MAIN ===")
html2 = fetch_text('https://us.community.samsung.com/t5/Samsung-Community/ct-p/us')
if html2.startswith('ERROR:'):
    print(f"Access: {html2}")
else:
    text2 = extract_text(html2)
    print(f"Page length: {len(text2)} chars")
    # Find topics
    for match in re.finditer(r'href="([^"]*)"[^>]*>([^<]{10,100})<', html2):
        href = match.group(1)
        title = match.group(2).strip()
        if any(w in title.lower() for w in ['galaxy', 'issue', 'problem', 'battery', 'update', 'error', 'help', 'samsung', 'camera', 'screen', 'charging', 'wifi']):
            if 'http' not in href:
                href = 'https://us.community.samsung.com' + href
            print(f"  {title[:100]}")
            print(f"    {href}")

time.sleep(1)

# Also try the Microsoft Answers Windows 11 search page
print("\n=== MICROSOFT ANSWERS - Windows 11 Search Issue ===")
html3 = fetch_text('https://answers.microsoft.com/en-us/windows/forum/all/cannot-search-for-settings-or-apps-on-windows-11/84d024c2-4a83-4ef0-88a2-a72517ffbb5d')
text3 = extract_text(html3)
for line in text3.split('.'):
    if any(w in line.lower() for w in ['cannot search', 'setting', 'app', 'search', 'problem', 'issue', 'update', 'window']):
        if len(line) > 50:
            print(f"  {line[:300].strip()}.")

# Microsoft Q&A - Screen Saver/Sleep issues
print("\n=== MICROSOFT Q&A - Screen Saver/Sleep Mode ===")
html4 = fetch_text('https://learn.microsoft.com/en-us/answers/questions/5553387/issues-with-screen-saver-and-sleep-mode-after-wind')
text4 = extract_text(html4)
for line in text4.split('.'):
    if any(w in line.lower() for w in ['screen saver', 'sleep', 'monitor', 'display', 'wake', 'issue', 'problem', 'update']):
        if len(line) > 50:
            print(f"  {line[:300].strip()}.")

# Microsoft Q&A - KB5079473 issues
print("\n=== MICROSOFT Q&A - March Update KB5079473 ===")
html5 = fetch_text('https://learn.microsoft.com/en-us/answers/questions/5827931/march-10-2026-update-kb5079473-issues')
text5 = extract_text(html5)
for line in text5.split('.'):
    if any(w in line.lower() for w in ['update', 'kb', 'issue', 'problem', 'error', 'install', 'fail']):
        if len(line) > 60:
            print(f"  {line[:300].strip()}.")

# Microsoft Q&A - Internet performance after KB5089549
print("\n=== MICROSOFT Q&A - Internet Performance Issues ===")
html6 = fetch_text('https://learn.microsoft.com/en-us/answers/questions/5889341/we-are-experiencing-internet-performance-issues-ac')
text6 = extract_text(html6)
for line in text6.split('.'):
    if any(w in line.lower() for w in ['internet', 'performance', 'network', 'speed', 'connect', 'kb', 'update', 'issue']):
        if len(line) > 60:
            print(f"  {line[:300].strip()}.")

