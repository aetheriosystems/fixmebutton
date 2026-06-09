#!/usr/bin/env python3
"""Fetch post details (selftext/symptoms) for top support-related posts."""
import subprocess, sys, re, json, os

BASE = '/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton'

# Support-related posts (not news, not memes - actual problems people need help with)
target_posts = [
    # iPhone issues
    ("1twme48", "iPhone 15 pro restarts every 3 minutes", "r/iPhone", 424),
    ("1tvdn50", "Please help why does my iphone keep doing this after the update", "r/iPhone", 417),
    ("1txjuph", "What is this pink vertical line?", "r/iPhone", 250),
    ("1tuc9bx", "Colors looks off on my new iPhone 17", "r/iPhone", 188),
    ("1tzlvzz", "Anybody else's iPhone 13 running like absolute dog shift after the recent update?", "r/iPhone", 157),
    ("1u09uhj", "Back of friends iphone 14 fell off. Any reason why?", "r/iPhone", 157),
    ("1tz7wnt", "Is there any possible way to get into this old 4S?", "r/iPhone", 142),
    # Techsupport issues
    ("1u04b51", "How to oldproof a tablet?", "r/techsupport", 22),
    ("1txs1sm", "old corrupted file cant delete", "r/techsupport", 18),
    ("1tz7qnz", "What do I do with a pregnant battery?", "r/techsupport", 16),
    ("1tyh92v", "holding down F R and O writes an L instead", "r/techsupport", 13),
    ("1ty0w2l", "Monitor extreme screen tearing", "r/techsupport", 12),
    ("1tuqeto", "Nvidia 610.47 driver stutter issues", "r/techsupport", 11),
    ("1ty34pf", "Completely destroyed pc", "r/techsupport", 10),
    ("1twwf3g", "Audio crackling and stuttering Windows 11", "r/techsupport", 7),
    ("1tye1pp", "internet shuts off after i open games", "r/techsupport", 5),
    ("1tznzxp", "Cloning SSD corrupted files", "r/techsupport", 5),
    # Roku issues
    ("1txsc1c", "Roku update bricked streaming stick", "r/Roku", 6),
    ("1tyqnjc", "Install Help - Stuck at Remote Pair", "r/Roku", 2),
    ("1twgd9u", "roku tv keeps restarting", "r/Roku", 2),
    ("1txmg6i", "roku tv wont open certain apps", "r/Roku", 3),
    ("1twopkb", "TV turns on and off with Roku remote", "r/Roku", 5),
]

def fetch_post(post_id):
    """Fetch the JSON version of a single post."""
    url = f"https://www.reddit.com/r/techsupport/comments/{post_id}/.json"
    outfile = os.path.join(BASE, f"post_{post_id}.json")
    cmd = [
        'curl', '-s', '-L', '-o', outfile, '-w', '%{http_code}',
        '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    return outfile if result.stdout.strip() == '200' else None

def parse_post_json(json_file):
    """Extract selftext from JSON response."""
    try:
        with open(json_file, 'r', encoding='utf-8', errors='replace') as f:
            data = json.load(f)
        if isinstance(data, list) and len(data) > 0:
            post_data = data[0].get('data', {}).get('children', [])
            if post_data:
                post = post_data[0].get('data', {})
                selftext = post.get('selftext', '') or ''
                # Also get the subreddit from the data
                subreddit = post.get('subreddit', '')
                return selftext[:500], subreddit
    except Exception as e:
        return f"ERROR: {e}", ""
    return "", ""

def main():
    for pid, title, sr, score in target_posts:
        print(f"\n--- {sr}: {title[:70]} (score: {score}) ---", file=sys.stderr)
        print(f"Post ID: {pid}")
        
        # Try fetching via JSON API
        json_file = fetch_post(pid)
        if json_file:
            selftext, subreddit = parse_post_json(json_file)
            print(f"  Selftext: {selftext[:300]}")
        else:
            # Fallback: fetch HTML version
            url = f"https://old.reddit.com/r/techsupport/comments/{pid}/"
            outfile = os.path.join(BASE, f"post_html_{pid}.html")
            cmd = [
                'curl', '-s', '-L', '-o', outfile, '-w', '%{http_code}',
                '-H', 'User-Agent: Mozilla/5.0',
                url
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
            if result.stdout.strip() == '200':
                with open(outfile, 'r', encoding='utf-8', errors='replace') as f:
                    html = f.read()
                # Extract selftext from HTML
                m = re.search(r'<div class="md[^"]*"><p>(.*?)</p>', html, re.DOTALL)
                if m:
                    selftext = re.sub(r'<[^>]+>', ' ', m.group(1)).strip()[:300]
                    print(f"  Selftext (HTML): {selftext}")
                else:
                    print(f"  No selftext found in HTML")
            else:
                print(f"  Failed to fetch: HTTP {result.stdout.strip()}")

if __name__ == '__main__':
    main()
