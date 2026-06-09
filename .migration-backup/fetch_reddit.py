#!/usr/bin/env python3
"""Fetch top posts from Reddit subreddits using old.reddit.com JSON API."""
import json
import sys
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
SUBREDDITS = ['techsupport', 'iPhone', 'Android', 'Roku', 'Windows10', 'mac']

def fetch_top(subreddit, limit=10):
    url = f"https://old.reddit.com/r/{subreddit}/top.json?limit={limit}&t=week"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"[ERROR] r/{subreddit}: {e}", file=sys.stderr)
        return []

    posts = []
    for child in data.get('data', {}).get('children', []):
        d = child.get('data', {})
        posts.append({
            'title': d.get('title', 'No title'),
            'url': f"https://redd.it/{d.get('id', '')}",
            'score': d.get('score', 0),
            'comments': d.get('num_comments', 0),
            'subreddit': subreddit,
            'selftext': (d.get('selftext', '') or '')[:300]
        })
    return posts

def main():
    all_posts = []
    for sub in SUBREDDITS:
        print(f"\n=== r/{sub} ===", file=sys.stderr)
        posts = fetch_top(sub)
        for p in posts:
            print(f"  [{p['score']:>4}] {p['title']} ({p['comments']} comments)", file=sys.stderr)
        all_posts.extend(posts)
    print(json.dumps(all_posts, indent=2))

if __name__ == '__main__':
    main()
