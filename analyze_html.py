import re

with open('/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton/techsupport.html') as f:
    html = f.read()

print(f"Total HTML size: {len(html)} bytes")
print(f"Contains 'thing': {'thing' in html}")

# Count thing divs
things = re.findall(r'<div[^>]*class="[^"]*thing[^"]*"', html)
print(f"thing divs: {len(things)}")

# Count data-score
scores = re.findall(r'data-score="(\d+)"', html)
print(f"data-score values: {scores[:10]}")

# Count data-comments-count
comments = re.findall(r'data-comments-count="(\d+)"', html)
print(f"data-comments-count values: {comments[:10]}")

# Count titles with class="title may-blank"
titles = re.findall(r'class="title may-blank"', html)
print(f"title may-blank anchors: {len(titles)}")

# Find first occurrence of "thing" in the context
idx = html.find('<div class="thing')
if idx >= 0:
    print(f"\nFirst thing div starts at index {idx}")
    print(f"Context: ...{html[idx:idx+500]}...")
else:
    print("\nNo '<div class=\"thing' found!")
    # Try alternative patterns
    idx2 = html.find('thing')
    if idx2 >= 0:
        print(f"First 'thing' found at index {idx2}")
        print(f"Context: ...{html[idx2:idx2+500]}...")
