#!/usr/bin/env python3
"""Fetch and parse top weekly posts from Reddit subreddits via old.reddit.com HTML."""
import subprocess, sys, re, json, os

SUBREDDITS = ['techsupport', 'iPhone', 'Android', 'Roku', 'Windows10', 'mac']
OUTPUT_DIR = '/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton'

def fetch_html(subreddit):
    """Fetch the top weekly page HTML for a subreddit using curl."""
    url = f"https://old.reddit.com/r/{subreddit}/top/?t=week"
    outfile = os.path.join(OUTPUT_DIR, f"{subreddit}.html")
    cmd = [
        'curl', '-s', '-L', '-o', outfile, '-w', '%{http_code}',
        '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        '-H', 'Accept-Language: en-US,en;q=0.5',
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    status = result.stdout.strip()
    if status == '200':
        return outfile
    else:
        print(f"[ERROR] r/{subreddit}: HTTP {status}", file=sys.stderr)
        return None

def parse_posts(html_file, subreddit):
    """Parse Reddit post entries from the HTML content."""
    with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    
    posts = []
    
    # Find all post entries (thing elements)
    # Pattern: <div id="thing_t3_..." class="thing ...">
    thing_pattern = re.compile(
        r'<div\s+id="thing_t3_([a-z0-9]+)"[^>]*class="[^"]*thing[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>',
        re.DOTALL
    )
    
    # Simpler: extract post IDs and data from the listing
    # Each post has: thing_t3_<id> and contains <a class="title" ...>
    
    # Find all post containers
    # Looking for pattern: id="thing_t3_XXXXX" 
    ids = re.findall(r'id="thing_t3_([a-z0-9]+)"', html)
    
    if not ids:
        # Try alternative parsing approach
        # Extract from the HTML the post data
        pass
    
    # Let's extract using a more robust method - find all post entries
    # Split by 'thing id="thing_t3_' and process each
    parts = html.split('thing id="thing_t3_')
    
    for part in parts[1:]:  # Skip first part (before any things)
        post_id = part[:7]  # Usually 6-7 char hex
        post_id = re.match(r'([a-z0-9]+)', part)
        if not post_id:
            continue
        post_id = post_id.group(1)
        
        # Extract title
        title_match = re.search(r'<a[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)</a>', part)
        title = title_match.group(1).strip() if title_match else 'No title'
        
        # Extract score - typically in <div class="score unvoted">123</div> or <div class="score">123</div>
        score_match = re.search(r'<div\s+class="score(?:\s+unvoted)?">\s*(\d+)\s*</div>', part)
        score = int(score_match.group(1)) if score_match else 0
        
        # Extract comment count
        comment_match = re.search(r'<a[^>]*>(\d+)\s*comment', part)
        comments = int(comment_match.group(1)) if comment_match else 0
        
        # Extract permalink
        link_match = re.search(r'<a\s+class="[^"]*title[^"]*"[^>]*href="(/r/[^"]+)"', part)
        permalink = f"https://redd.it/{post_id}" if not link_match else f"https://old.reddit.com{link_match.group(1)}"
        
        # Extract selftext preview if any (from <div class="expando"> etc)
        selftext = ''
        expando = re.search(r'<div\s+class="expando[^"]*"[^>]*>(.*?)</div>\s*<div\s+class="clearleft">', part, re.DOTALL)
        if expando:
            selftext = re.sub(r'<[^>]+>', ' ', expando.group(1)).strip()[:300]
        
        posts.append({
            'id': post_id,
            'title': title,
            'url': f"https://redd.it/{post_id}",
            'score': score,
            'comments': comments,
            'subreddit': subreddit,
            'selftext': selftext[:300]
        })
    
    return posts

def main():
    all_posts = []
    for sub in SUBREDDITS:
        print(f"Fetching r/{sub}...", file=sys.stderr)
        html_file = fetch_html(sub)
        if html_file:
            posts = parse_posts(html_file, sub)
            print(f"  -> {len(posts)} posts found", file=sys.stderr)
            all_posts.extend(posts)
        print(file=sys.stderr)
    
    # Sort by score descending
    all_posts.sort(key=lambda p: p['score'], reverse=True)
    
    print(json.dumps(all_posts, indent=2))

if __name__ == '__main__':
    main()
