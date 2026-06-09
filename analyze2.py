import re

with open('/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton/techsupport.html') as f:
    html = f.read()

# Find all thing divs and show the first one
things = re.finditer(r'<div[^>]*class="[^"]*thing[^"]*"', html)
for i, m in enumerate(things):
    if i == 3:  # First interesting one (skip header stuff)
        start = m.start()
        snippet = html[start:start+1500]
        print(f"--- Thing #{i} at position {start} ---")
        print(snippet)
        print()
        break

# Also check for title anchors  
print("=== Title anchor patterns ===")
title_patterns = [
    r'class="title may-blank"',
    r'class="title may-blank ',
    r'class=.title may-blank.',
    r'<a[^>]*class="[^"]*title[^"]*"[^>]*>',
]
for pat in title_patterns:
    matches = re.findall(pat, html)
    print(f"  Pattern {pat!r}: {len(matches)} matches")
    if matches:
        print(f"    Example: {matches[0][:200]}")
