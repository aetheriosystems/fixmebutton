import re

with open('/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton/iPhone.html') as f:
    html = f.read()

# Find a "No title" post - let's look at the first post with outbound link
# Look for the pattern: <a class="title may-blank outbound" ... > TITLE </a>
parts = html.split('id="thing_t3_')
for part in parts[1:3]:
    post_id = re.match(r'([a-z0-9]+)', part).group(1)
    print(f"=== Post {post_id} ===")
    
    # Find title anchor and get its full content including the text
    m = re.search(r'<a\s+class="title\s+may-blank[^"]*"[^>]*>(.*?)</a>', part, re.DOTALL)
    if m:
        title_content = m.group(1).strip()
        print(f"Title text: {title_content[:200]}")
    else:
        # Try broader pattern
        m2 = re.search(r'class="title\s+may-blank[^"]*"[^>]*>', part)
        if m2:
            print(f"Found title anchor at: {part[m2.start():m2.start()+300]}")
        
        # Find all <a> tags with 'title' in class
        all_title_as = re.findall(r'<a\s+[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)</a>', part, re.DOTALL)
        for t in all_title_as[:3]:
            print(f"  Found title content: {t.strip()[:100]}")
    
    print()
