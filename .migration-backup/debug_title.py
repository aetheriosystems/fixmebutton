import re

with open('/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton/iPhone.html') as f:
    html = f.read()

# Find a "No title" post to debug
# Let's find thing divs and show their title sections
parts = html.split('id="thing_t3_')
for part in parts[1:3]:
    post_id = re.match(r'([a-z0-9]+)', part).group(1)
    print(f"=== Post {post_id} ===")
    
    # Find the title anchor
    m = re.search(r'<a[^>]*title[^>]*>', part)
    if m:
        print(f"Title anchor HTML: {m.group()}")
    else:
        # Try to find any anchor with title-like classes
        all_as = re.findall(r'<a\s+[^>]*class="[^"]*"[^>]*>', part)
        for a in all_as[:5]:
            if 'title' not in a and 'thumbnail' not in a and 'comments' not in a:
                print(f"  Other anchor: {a[:200]}")
    
    # Also try to find selftext
    selftext_match = re.search(r'<div\s+class="usertext-body[^"]*"[^>]*>', part)
    if selftext_match:
        print(f"  Has usertext-body")
    
    print()
