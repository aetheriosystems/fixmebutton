#!/usr/bin/env python3
"""Regenerate search-index.json for FixMeButton."""
import os, json, re

GUIDES_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "guides")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "..", "public", "search-index.json")

guides = []

for category in sorted(os.listdir(GUIDES_DIR)):
    cat_path = os.path.join(GUIDES_DIR, category)
    if not os.path.isdir(cat_path) or category.startswith('.'):
        continue
    for fname in sorted(os.listdir(cat_path)):
        if not fname.endswith('.mdx'):
            continue
        fpath = os.path.join(cat_path, fname)
        with open(fpath) as f:
            content = f.read()
        
        m = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
        if not m:
            continue
        fm = m.group(1)
        
        title = re.search(r'title:\s*"([^"]*)"', fm)
        devices = re.search(r'devices:\s*\[(.*?)\]', fm, re.DOTALL)
        difficulty = re.search(r'difficulty:\s*(\S+)', fm)
        time_est = re.search(r'time_estimate:\s*"([^"]*)"', fm)
        
        slug = f"{category}/{fname.replace('.mdx', '')}"
        
        dev_list = []
        if devices:
            for d in re.findall(r'"([^"]*)"', devices.group(1)):
                dev_list.append(d)
        
        guides.append({
            "slug": slug,
            "title": title.group(1) if title else fname.replace('.mdx', '').replace('-', ' '),
            "category": category,
            "devices": dev_list,
            "difficulty": difficulty.group(1) if difficulty else "beginner",
            "time_estimate": time_est.group(1) if time_est else ""
        })

os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
with open(OUTPUT_FILE, 'w') as f:
    json.dump(guides, f)

print(f"Search index generated: {len(guides)} guides")
for g in guides:
    print(f"  [{g['category']}] {g['title']}")
