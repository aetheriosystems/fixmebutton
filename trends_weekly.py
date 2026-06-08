"""
Get the weekly trends data for the week of June 1-8, 2026.
"""
from pytrends.request import TrendReq
import time
import json

pytrends = TrendReq(hl='en-US', tz=-300, timeout=(10,25))

print("=" * 70)
print("GOOGLE TRENDS - WEEK OF JUNE 1-8, 2026")
print("Tech Support Query Analysis")
print("=" * 70)

# Part 1: Get weekly data for the most important terms
print("\n[1] WEEKLY AVERAGE INTEREST (June 1-8)")
print("-" * 50)

# Use a longer timeframe but focus on the latest data
# Let's check if we can use 'today 7-d' with a specific start date
# Actually, the weekly data can be inferred from the 30-day data already collected

# Let me try a minimal set of queries with careful rate limiting
queries = [
    ('wifi not working', 'WiFi Issues'),
    ('how to fix iphone battery', 'iPhone Battery'),
    ('windows update stuck', 'Windows Update'),
    ('printer not working', 'Printer Issues'),
    ('bluetooth not working', 'Bluetooth'),
    ('computer screen black', 'Computer Display'),
    ('how to reset iphone', 'iPhone Reset'),
    ('camera not working', 'Camera'),
    ('keyboard not working', 'Keyboard'),
    ('no internet connection', 'Internet'),
]

for query, label in queries:
    try:
        pytrends.build_payload([query], cat=0, timeframe='today 1-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            # Last 7 days average
            last7 = data.tail(7).mean().iloc[0]
            # Previous 7 days (before June 1)
            prev7 = data.tail(14).head(7).mean().iloc[0] if len(data) >= 14 else 0
            # Monthly average
            month_avg = data.mean().iloc[0]
            
            change = ((last7 - prev7) / prev7 * 100) if prev7 > 0 else 0
            direction = "↑ RISING" if change > 3 else ("↓ FALLING" if change < -3 else "→ STABLE")
            
            bar = '█' * max(1, int(last7 // 4))
            print(f"  {query:35s} {label:20s} Last7: {last7:5.1f}  Change: {direction:10s} ({change:+.1f}%)  {bar}")
        else:
            print(f"  {query:35s} {label:20s} No data")
    except Exception as e:
        err = str(e)[:50]
        print(f"  {query:35s} {label:20s} Error: {err}")
    time.sleep(3)

# Part 2: Get the top rising queries from the related queries data
print("\n\n[2] TOP RISING RELATED QUERIES - 'how to fix'")
print("-" * 50)
try:
    pytrends.build_payload(['how to fix'], cat=0, timeframe='today 1-m', geo='US', gprop='')
    related = pytrends.related_queries()
    if 'how to fix' in related:
        rq = related['how to fix']
        if 'rising' in rq and rq['rising'] is not None:
            rising_df = rq['rising'].head(15)
            print(f"  {'Query':45s} {'Value':10s}")
            print(f"  {'-'*45} {'-'*10}")
            for _, row in rising_df.iterrows():
                q = str(row.get('query', ''))[:45]
                v = str(row.get('value', ''))
                print(f"  {q:45s} {v:10s}")
        if 'top' in rq and rq['top'] is not None:
            top_df = rq['top'].head(10)
            print(f"\n  Top related queries:")
            for _, row in top_df.iterrows():
                q = str(row.get('query', ''))[:45]
                v = str(row.get('value', ''))
                print(f"  {q:45s} Interest: {v:10s}")
except Exception as e:
    print(f"  Error: {e}")

# Part 3: Get interest over time for the most searched tech repair terms
print("\n\n[3] CURRENT SEARCH INTEREST - COMMON TECH PROBLEMS")
print("-" * 50)
common_issues = [
    'phone screen cracked', 'computer virus', 'forgot password',
    'account hacked', 'data recovery', 'backup iphone',
    'transfer photos', 'clear cache', 'update drivers', 'factory reset'
]
for i in range(0, len(common_issues), 5):
    batch = common_issues[i:i+5]
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 1-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.tail(7).mean().sort_values(ascending=False)
            for kw, val in avg.items():
                bar = '█' * max(1, int(val // 4))
                print(f"  {kw:30s} {val:5.1f}/100  {bar}")
        else:
            print(f"  No data for {batch}")
    except Exception as e:
        print(f"  Error for {batch}: {str(e)[:50]}")
    time.sleep(3)

# Part 4: Weekly trend direction for the most popular queries
print("\n\n[4] WEEKLY TREND DIRECTION (Rising vs Falling)")
print("-" * 50)
trend_queries = [
    'how to fix wifi', 'how to fix printer', 'how to fix laptop',
    'how to fix tv', 'how to fix iphone', 'how to fix computer',
    'how to fix chromebook', 'how to fix ipad', 'how to fix router',
    'how to fix keyboard', 'how to fix bluetooth', 'how to fix speakers',
    'how to fix camera', 'how to fix screen', 'how to fix battery',
]
results = []
for q in trend_queries:
    try:
        pytrends.build_payload([q], cat=0, timeframe='today 3-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            # Compare last 30 days vs previous 30 days
            if len(data) >= 60:
                recent = data.tail(30).mean().iloc[0]
                prev = data.tail(60).head(30).mean().iloc[0]
                change = ((recent - prev) / prev * 100) if prev > 0 else 0
            else:
                mid = len(data) // 2
                recent = data.iloc[mid:].mean().iloc[0]
                prev = data.iloc[:mid].mean().iloc[0] if mid > 0 else 0
                change = ((recent - prev) / prev * 100) if prev > 0 else 0
            results.append((q, change, recent))
    except Exception as e:
        pass
    time.sleep(2.5)

# Sort by change (most rising first)
results.sort(key=lambda x: x[1], reverse=True)
print(f"\n  {'Query':35s} {'Change':10s} {'Recent Interest':15s}")
print(f"  {'-'*35} {'-'*10} {'-'*15}")
for q, ch, val in results:
    arrow = "↑" if ch > 2 else ("↓" if ch < -2 else "→")
    print(f"  {q:35s} {arrow} {ch:+.1f}%    {val:.1f}/100")

print("\n\nDone.")
