"""
Use pytrends to research Google Trends for tech support queries.
"""
from pytrends.request import TrendReq
import json
import time

pytrends = TrendReq(hl='en-US', tz=-300)

print("=" * 70)
print("GOOGLE TRENDS RESEARCH FOR TECH SUPPORT QUERIES")
print("Week of June 1-8, 2026")
print("=" * 70)

# Step 1: Get today's trending searches from the daily trends
print("\n[1] DAILY TRENDING SEARCHES (US) - Latest available")
print("-" * 50)
try:
    daily_trends = pytrends.trending_searches(pn='united_states')
    print(daily_trends.to_string())
except Exception as e:
    print(f"  Error: {e}")

# Step 2: Real-time trending searches
print("\n[2] REAL-TIME TRENDING SEARCHES (US)")
print("-" * 50)
try:
    realtime = pytrends.realtime_trending_searches(pn='US')
    # Filter for tech-related items
    print(f"  Total realtime trending: {len(realtime)}")
    if len(realtime) > 0:
        for i, row in realtime.iterrows():
            title = row.get('title', row.get('query', 'N/A'))
            traffic = row.get('formattedTraffic', '')
            print(f"  [{traffic}] {title}")
except Exception as e:
    print(f"  Error: {e}")

# Step 3: Interest over time for tech support keywords
print("\n[3] SEARCH INTEREST - TECH SUPPORT KEYWORDS (Last 7 days, US)")
print("-" * 50)
tech_keywords = [
    'how to fix', 'not working', 'troubleshoot', 'fix error',
    'won\'t turn on', 'won\'t connect', 'blue screen', 'keeps crashing',
    'screen frozen', 'no sound', 'won\'t charge', 'connection issue',
    'won\'t boot', 'won\'t update', 'won\'t install', 'error code'
]
# pytrends allows max 5 keywords per request
for i in range(0, len(tech_keywords), 5):
    batch = tech_keywords[i:i+5]
    print(f"\n  Batch {i//5+1}: {batch}")
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 7-d', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if not data.empty:
            # Remove the 'isPartial' column if it exists
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            print(f"  Data shape: {data.shape}")
            # Show latest values
            latest = data.iloc[-1] if len(data) > 0 else None
            if latest is not None:
                for kw in batch:
                    val = latest.get(kw, 'N/A')
                    print(f"    {kw}: {val} (out of 100)")
            # Show average
            avg = data.mean()
            print(f"  7-day averages:")
            for kw in batch:
                val = avg.get(kw, 0)
                bar = '#' * int(val // 5) if val > 0 else '-'
                print(f"    {kw:30s} {val:5.1f}  {bar}")
        else:
            print(f"  No data returned")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(2)

# Step 4: Search for rising tech support topics - related queries
print("\n[4] RELATED QUERIES FOR KEY TECH SUPPORT TERMS")
print("-" * 50)
key_terms = ['how to fix iphone', 'how to fix wifi', 'how to fix laptop', 
             'how to fix computer', 'not working', 'error code']

for term in key_terms:
    print(f"\n  --- Related queries for: '{term}' ---")
    try:
        pytrends.build_payload([term], cat=0, timeframe='today 7-d', geo='US', gprop='')
        related = pytrends.related_queries()
        if term in related:
            data = related[term]
            if 'top' in data and data['top'] is not None:
                top_df = data['top'].head(8)
                print(f"  Top related queries:")
                for _, row in top_df.iterrows():
                    q = row.get('query', 'N/A')
                    val = row.get('value', '')
                    print(f"    {q:40s} ({val})")
            if 'rising' in data and data['rising'] is not None:
                rising_df = data['rising'].head(8)
                print(f"  Rising related queries:")
                for _, row in rising_df.iterrows():
                    q = row.get('query', 'N/A')
                    val = row.get('value', '')
                    print(f"    {q:40s} ({val})")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(1.5)

# Step 5: Hot searches / category-based trends
print("\n[5] POPULAR TECH TOPICS - CATEGORY BASED")
print("-" * 50)
# Try to get interest by region for popular tech issues
issue_keywords = ['how to fix wifi', 'computer won\'t start', 'phone battery drain', 
                  'app crashing', 'internet not working', 'bluetooth not connecting',
                  'printer not working', 'wont connect to wifi', 'keyboard not working',
                  'screen flickering', 'laptop overheating', 'virus removal']

for i in range(0, len(issue_keywords), 5):
    batch = issue_keywords[i:i+5]
    print(f"\n  Batch {i//5+1}: {batch}")
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 7-d', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.mean()
            print(f"  7-day averages:")
            sorted_avg = avg.sort_values(ascending=False)
            for kw, val in sorted_avg.items():
                bar = '█' * int(val // 5) if val > 0 else '-'
                print(f"    {kw:40s} {val:5.1f}  {bar}")
        else:
            print(f"  No data returned")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(1.5)

# Step 6: Interest over time for specific device fixes
print("\n[6] TOP RISING TECH SUPPORT QUERIES BY DEVICE CATEGORY")
print("-" * 50)
categories = [
    ('iPhone/iPad', ['how to fix iphone', 'iphone not charging', 'iphone won\'t turn on', 'iphone frozen screen', 'iphone won\'t connect to wifi']),
    ('Windows PC', ['how to fix windows', 'windows blue screen', 'windows update stuck', 'computer won\'t boot', 'windows slow']),
    ('WiFi/Internet', ['wifi not working', 'router not connecting', 'internet keeps dropping', 'wifi keeps disconnecting', 'no internet connection']),
    ('Printer', ['printer not working', 'printer offline', 'printer won\'t print', 'how to fix printer', 'printer error']),
    ('Audio/Video', ['no sound on computer', 'speakers not working', 'microphone not working', 'webcam not working', 'screen flickering']),
]

for device_name, kws in categories:
    print(f"\n  --- {device_name} ---")
    try:
        pytrends.build_payload(kws, cat=0, timeframe='today 7-d', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.mean()
            sorted_avg = avg.sort_values(ascending=False)
            for kw, val in sorted_avg.items():
                bar = '█' * int(val // 5) if val > 0 else '-'
                print(f"    {kw:45s} {val:5.1f}/100  {bar}")
        else:
            print(f"  No data returned")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(2)

print("\n\nDone.")
