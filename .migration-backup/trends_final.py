"""
Final analysis: Get weekly trends and top rising tech support queries
for the week of June 1-8, 2026.
"""
from pytrends.request import TrendReq
import json
import time
import pandas as pd

pytrends = TrendReq(hl='en-US', tz=-300, timeout=(10,25))

print("=" * 70)
print("GOOGLE TRENDS - RISING TECH SUPPORT QUERIES")
print("Week of June 1-8, 2026")
print("=" * 70)

# Part 1: Specific weekly interest for tech support terms  
print("\n[1] WEEKLY INTEREST (June 1-8) - Top Tech Support Terms")
print("-" * 50)
# Use today 7-d but with proper token handling
# Instead, let's use today 1-m and filter to show recent trend
tech_terms = [
    'how to fix', 'not working', 'error code', 'troubleshoot', 
    'won\'t turn on', 'won\'t connect', 'blue screen', 'keeps crashing',
    'screen frozen', 'no sound', 'won\'t charge', 'won\'t boot'
]

# Batch of 5
for i in range(0, len(tech_terms), 5):
    batch = tech_terms[i:i+5]
    print(f"\n  Batch {i//5+1}: {', '.join(batch)}")
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 1-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            # Show last 7 days average vs full month average
            last_week = data.tail(7).mean() if len(data) >= 7 else data.mean()
            full_avg = data.mean()
            for kw in batch:
                if kw in last_week:
                    lw = last_week[kw]
                    fa = full_avg[kw]
                    change = ((lw - fa) / fa * 100) if fa > 0 else 0
                    direction = "↑" if change > 5 else ("↓" if change < -5 else "→")
                    print(f"    {kw:30s} Last week: {lw:5.1f}  Monthly avg: {fa:5.1f}  {direction} ({change:+.1f}%)")
        else:
            print(f"  No data")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(2)

# Part 2: Rising device-specific queries
print("\n[2] TOP RISING TECH SUPPORT QUERIES BY DEVICE")
print("-" * 50)
device_issues = {
    'iPhone': ['iphone not charging', 'iphone won\'t turn on', 'iphone frozen', 
               'iphone keeps restarting', 'iphone battery draining'],
    'Android': ['android not charging', 'android won\'t turn on', 'android frozen',
                'android keeps restarting', 'android battery drain'],
    'Windows': ['windows update stuck', 'windows blue screen', 'windows slow',
                'windows won\'t boot', 'windows no sound'],
    'Mac': ['mac not turning on', 'mac frozen', 'mac slow', 'mac won\'t boot', 
            'mac internet not working'],
    'Smart TV': ['tv not working', 'tv won\'t turn on', 'tv no sound',
                 'tv remote not working', 'tv screen black'],
}

for device, issues in device_issues.items():
    print(f"\n  --- {device} ---")
    try:
        pytrends.build_payload(issues, cat=0, timeframe='today 1-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.tail(14).mean().sort_values(ascending=False)  # Last 2 weeks
            for kw, val in avg.items():
                bar = '█' * max(1, int(val // 4))
                print(f"    {kw:40s} {val:5.1f}/100  {bar}")
        else:
            print(f"  No data")
    except Exception as e:
        print(f"  Error: {e}")
    time.sleep(2)

# Part 3: Rising searches - compare last 2 weeks vs previous 2 weeks  
print("\n[3] RISING vs FALLING TECH SUPPORT TRENDS")
print("-" * 50)
rising_terms = [
    'how to fix iphone', 'how to fix wifi', 'how to fix computer',
    'how to fix laptop', 'how to fix printer', 'how to fix tv',
    'how to fix bluetooth', 'how to fix keyboard', 'how to fix mouse',
    'how to fix router', 'how to fix speakers', 'how to fix camera',
    'how to fix screen', 'how to fix battery', 'how to fix chromebook',
    'how to fix ipad', 'how to fix app', 'how to fix controller',
]

print(f"  Analyzing 18 'how to fix X' terms...")
for i in range(0, len(rising_terms), 5):
    batch = rising_terms[i:i+5]
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 3-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            # Compare first half vs second half of the period
            mid = len(data) // 2
            first_half = data.iloc[:mid].mean()
            second_half = data.iloc[mid:].mean()
            for kw in batch:
                if kw in first_half and kw in second_half:
                    fh = first_half[kw]
                    sh = second_half[kw]
                    change_pct = ((sh - fh) / fh * 100) if fh > 0 else 0
                    if abs(change_pct) > 1:  # Only show meaningful changes
                        arrow = "↑ RISING" if change_pct > 0 else "↓ FALLING"
                        print(f"    {kw:35s} {arrow:10s} ({change_pct:+.1f}%)  Recent: {sh:.1f}")
                    else:
                        print(f"    {kw:35s} → STABLE     ({change_pct:+.1f}%)  Recent: {sh:.1f}")
        else:
            print(f"  No data for {batch}")
    except Exception as e:
        print(f"  Error for {batch}: {e}")
    time.sleep(2)

# Part 4: Top trending tech support issues by search volume
print("\n[4] HIGH-VOLUME TECH SUPPORT QUERIES (Ranked)")
print("-" * 50)
all_tech_terms = [
    'how to fix', 'not working', 'troubleshoot', 'error code',
    'blue screen', 'won\'t turn on', 'won\'t connect', 'won\'t charge',
    'no sound', 'screen frozen', 'keeps crashing', 'won\'t boot',
    'connection problem', 'no internet', 'printer not working',
    'wifi not working', 'virus removal', 'slow computer',
    'battery draining', 'overheating phone'
]

print(f"  Analyzing {len(all_tech_terms)} terms (batching by 5)...")
all_avgs = {}
for i in range(0, len(all_tech_terms), 5):
    batch = all_tech_terms[i:i+5]
    try:
        pytrends.build_payload(batch, cat=0, timeframe='today 1-m', geo='US', gprop='')
        data = pytrends.interest_over_time()
        if data is not None and not data.empty:
            if 'isPartial' in data.columns:
                data = data.drop(columns=['isPartial'])
            avg = data.tail(7).mean()
            for kw in batch:
                if kw in avg:
                    all_avgs[kw] = avg[kw]
    except:
        pass
    time.sleep(2)

# Sort and display
ranked = sorted(all_avgs.items(), key=lambda x: x[1], reverse=True)
print(f"\n  Rank | Query                                      | Interest (last week)")
print(f"  ------+--------------------------------------------+-------------------")
for rank, (kw, val) in enumerate(ranked, 1):
    bar = '█' * max(1, int(val // 3))
    print(f"  {rank:4d} | {kw:42s} | {val:5.1f}  {bar}")

print("\n\nDone.")
