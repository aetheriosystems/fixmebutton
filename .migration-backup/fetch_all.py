#!/usr/bin/env python3
"""Fetch and parse top weekly posts from all target subreddits via old.reddit.com HTML."""
import subprocess, sys, re, json, os

SUBREDDITS = ['techsupport', 'iPhone', 'Android', 'Roku', 'Windows10', 'mac']
BASE = '/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton'

def fetch_html(subreddit):
    url = f"https://old.reddit.com/r/{subreddit}/top/?t=week"
    outfile = os.path.join(BASE, f"{subreddit}.html")
    cmd = [
        'curl', '-s', '-L', '-o', outfile, '-w', '%{http_code}',
        '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        '-H', 'Accept-Language: en-US,en;q=0.5',
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    status = result.stdout.strip()
    return outfile if status == '200' else None

def parse_posts(html_file, subreddit):
    with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    
    posts = []
    # Find all thing divs
    # Pattern: <div class="thing ..." id="thing_t3_XXXXX" ... data-attributes...>
    # We'll split on 'thing id="thing_t3_' to isolate each post
    parts = html.split('thing id="thing_t3_')
    
    for part in parts[1:]:
        # Extract the post ID (characters until the first quote)
        post_id_match = re.match(r'([a-z0-9]+)', part)
        if not post_id_match:
            continue
        post_id = post_id_match.group(1)
        
        # Extract data attributes from the opening div
        # Get data-score
        score_match = re.search(r'data-score="(\d+)"', part)
        score = int(score_match.group(1)) if score_match else 0
        
        # Get comments count
        comments_match = re.search(r'data-comments-count="(\d+)"', part)
        comments = int(comments_match.group(1)) if comments_match else 0
        
        # Get title
        title_match = re.search(r'<a\s+class="title\s+may-blank\s*"[^>]*>([^<]+)</a>', part)
        title = title_match.group(1).strip() if title_match else 'No title'
        
        # Build URL
        url = f"https://redd.it/{post_id}"
        
        # Try to get selftext preview (from expando if available)
        selftext = ''
        selftext_match = re.search(r'<div\s+class="usertext-body[^"]*"[^>]*>\s*<div\s+class="md">\s*<p>(.*?)</p>', part, re.DOTALL)
        if selftext_match:
            selftext = re.sub(r'<[^>]+>', ' ', selftext_match.group(1)).strip()[:300]
        
        posts.append({
            'id': post_id,
            'title': title,
            'url': url,
            'score': score,
            'comments': comments,
            'subreddit': subreddit,
            'selftext': selftext
        })
    
    return posts

def main():
    all_posts = []
    for sub in SUBREDDITS:
        print(f"  Fetching r/{sub}...", file=sys.stderr)
        html_file = fetch_html(sub)
        if html_file:
            posts = parse_posts(html_file, sub)
            print(f"    -> {len(posts)} posts found", file=sys.stderr)
            all_posts.extend(posts)
        else:
            print(f"    -> FAILED to fetch", file=sys.stderr)
        print(file=sys.stderr)
    
    all_posts.sort(key=lambda p: p['score'], reverse=True)
    
    # Print summary
    print("\n=== ALL POSTS (sorted by score) ===\n")
    for p in all_posts:
        print(f"[{p['score']:>3}] r/{p['subreddit']}: {p['title'][:80]}")
        print(f"     URL: {p['url']} | Comments: {p['comments']}")
        if p['selftext']:
            print(f"     Preview: {p['selftext'][:150]}")
        print()
    
    # Save full JSON
    with open(os.path.join(BASE, 'all_posts.json'), 'w') as f:
        json.dump(all_posts, f, indent=2)
    print(f"\nSaved to {BASE}/all_posts.json", file=sys.stderr)

if __name__ == '__main__':
    main()
