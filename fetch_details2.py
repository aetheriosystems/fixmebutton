#!/usr/bin/env python3
"""Fetch post details (selftext/symptoms) from old.reddit.com HTML."""
import subprocess, sys, re, json, os

BASE = '/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton'

# Support-related posts 
target_posts = [
    # iPhone issues
    ("1twme48", "iPhone 15 pro restarts every 3 minutes", "r/iPhone", 424),
    ("1tvdn50", "Please help why does my iphone keep doing this after the update", "r/iPhone", 417),
    ("1txjuph", "What is this pink vertical line?", "r/iPhone", 250),
    ("1tuc9bx", "Colors looks off on my new iPhone 17", "r/iPhone", 188),
    ("1tzlvzz", "iPhone 13 running like absolute dog after recent update", "r/iPhone", 157),
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
    ("1twgd9u", "roku tv keeps restarting", "r/Roku", 2),
    ("1txmg6i", "roku tv wont open certain apps", "r/Roku", 3),
    ("1twopkb", "TV turns on and off with Roku remote", "r/Roku", 5),
]

def fetch_post_html(post_id, subreddit_name):
    """Fetch the old.reddit.com HTML version of a single post."""
    # The URL format is old.reddit.com/r/{subreddit}/comments/{post_id}/
    url = f"https://old.reddit.com/r/{subreddit_name}/comments/{post_id}/"
    outfile = os.path.join(BASE, f"post_{post_id}.html")
    cmd = [
        'curl', '-s', '-L', '-o', outfile, '-w', '%{http_code}',
        '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    status = result.stdout.strip()
    if status == '200':
        return outfile
    else:
        return None

def parse_selftext(html_file):
    """Extract selftext from old.reddit.com HTML."""
    with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    
    # Try to find usertext-body with md content
    # Pattern 1: <div class="md"><p>TEXT</p></div>
    m = re.search(r'<div\s+class="md[^"]*">\s*<p>(.*?)</p>', html, re.DOTALL)
    if m:
        text = re.sub(r'<[^>]+>', ' ', m.group(1))
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:500]
    
    # Pattern 2: usertext-body
    m2 = re.search(r'<div\s+class="usertext-body[^"]*"[^>]*>.*?<div\s+class="md">(.*?)</div>', html, re.DOTALL)
    if m2:
        text = re.sub(r'<[^>]+>', ' ', m2.group(1))
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:500]
    
    return "(No selftext found)"

def main():
    results = []
    for pid, title, sr, score in target_posts:
        # Determine subreddit name for URL (strip "r/" prefix)
        sr_name = sr.replace("r/", "")
        print(f"  Fetching {sr} {pid}...", file=sys.stderr)
        html_file = fetch_post_html(pid, sr_name)
        if html_file:
            selftext = parse_selftext(html_file)
            results.append({
                'id': pid,
                'title': title,
                'subreddit': sr,
                'score': score,
                'url': f"https://redd.it/{pid}",
                'selftext': selftext
            })
            print(f"    Selftext: {selftext[:150]}", file=sys.stderr)
        else:
            print(f"    Failed to fetch", file=sys.stderr)
    
    # Save results
    with open(os.path.join(BASE, 'support_details.json'), 'w') as f:
        json.dump(results, f, indent=2)
    
    # Print summary
    print("\n\n=== SUPPORT POSTS WITH DETAILS ===\n")
    for r in results:
        print(f"[{r['score']:>4}] {r['subreddit']}: {r['title']}")
        print(f"     URL: {r['url']}")
        print(f"     Symptoms: {r['selftext'][:200]}")
        print()

if __name__ == '__main__':
    main()
