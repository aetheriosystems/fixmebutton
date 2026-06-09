"""
Alternative approach: Use Google Trends autocomplete and explore API
with proper session handling.
"""
from pytrends.request import TrendReq
import json
import time

print("=" * 70)
print("GOOGLE TRENDS - TECH SUPPORT RESEARCH")
print("Week of June 1-8, 2026")
print("=" * 70)

# Initialize with a proper session
pytrends = TrendReq(hl='en-US', tz=-300, timeout=(10,25))

# Step 1: Use autocomplete to find tech support queries
print("\n[1] AUTOCOMPLETE SUGGESTIONS - Tech support phrases")
print("-" * 50)
tech_prefixes = [
    "how to fix", "why won't my", "my phone won't", "my computer won't",
    "error code", "troubleshoot", "blue screen", "not charging",
    "won't connect", "keeps crashing", "frozen screen", "no sound",
    "won't turn on", "won't start", "won't boot", "won't charge",
    "connection problem", "not working", "how to reset"
]
for prefix in tech_prefixes:
    try:
        suggestions = pytrends.suggestions(prefix)
        if suggestions:
            for s in suggestions[:3]:
                title = s.get('title', 'N/A')
                mid_type = s.get('type', '')
                print(f"  '{prefix}' -> {title} ({mid_type})")
        else:
            print(f"  '{prefix}' -> no suggestions")
    except Exception as e:
        print(f"  '{prefix}' -> Error: {e}")
    time.sleep(0.5)

# Step 2: Use related topics/queries for key tech terms  
print("\n\n[2] TOP TECH SUPPORT QUERIES BY POPULARITY")
print("-" * 50)
# These are the most commonly searched tech support queries
# We can only get interest data with 5 keywords at a time
# Let's batch them

batches = [
    ['iphone not charging', 'iphone won\'t turn on', 'iphone frozen', 'iphone black screen', 'iphone won\'t connect to wifi'],
    ['computer won\'t boot', 'windows blue screen', 'laptop won\'t turn on', 'computer screen black', 'computer won\'t connect to wifi'],
    ['wifi not working', 'no internet connection', 'router not working', 'internet keeps dropping', 'wifi keeps disconnecting'],
    ['printer not working', 'printer offline', 'printer won\'t print', 'how to fix printer', 'printer error'],
    ['bluetooth not working', 'bluetooth not connecting', 'keyboard not working', 'mouse not working', 'speakers not working'],
    ['how to reset iphone', 'how to reset windows', 'how to reset wifi', 'how to reset router', 'how to reset laptop'],
    ['battery draining fast', 'phone overheating', 'screen flickering', 'no sound windows', 'camera not working'],
]

for i, batch in enumerate(batches):
    print(f"\n  Batch {i+1}: {batch}")
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 1-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.mean().sort_values(ascending=False)
            print(f"  Monthly average search interest (out of 100):")
            for kw, val in avg.items():
                bar = '█' * max(1, int(val // 3))
                print(f"    {kw:45s} {val:5.1f}  {bar}")
        else:
            print(f"  No data returned")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(2)

# Step 3: Get interest by region for top issues
print("\n\n[3] RISING TECH SUPPORT TOPICS")
print("-" * 50)
# Try with longer timeframes that are more likely to work
top_issues = ['how to fix iphone battery', 'windows update stuck', 'wifi not connecting', 
              'computer running slow', 'phone storage full']

print(f"\n  Long-term trends for common issues:")
for issue in top_issues:
    try:
        pytrends.build_payload([issue], cat=0, timeframe='today 12-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.mean().iloc[0] if len(data.columns) > 0 else 0
            # Get the last 30 days vs previous 30 days to check trend direction
            recent = data.tail(30).mean().iloc[0] if len(data) >= 30 else 0
            prev = data.tail(60).head(30).mean().iloc[0] if len(data) >= 60 else 0
            direction = "RISING ↑" if recent > prev else ("FLAT →" if abs(recent - prev) < 2 else "FALLING ↓")
            print(f"    {issue:40s} Avg: {avg:.1f}/100  Recent: {recent:.1f}  {direction}")
        else:
            print(f"    {issue:40s} No data")
    except Exception as e:
        print(f"    {issue:40s} Error: {e}")
    time.sleep(1.5)

print("\n\nDone.")
