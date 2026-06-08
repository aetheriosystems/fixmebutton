#!/usr/bin/env python3
"""Research Google Trends for tech support queries."""

import json
import urllib.request
import urllib.parse
import sys
import re
import time

def google_trends_explore(keywords, geo='US', time_range='now 7-days'):
    """Call Google Trends explore API for a list of keywords."""
    params = {
        'hl': 'en-US',
        'tz': -300,
        'req': json.dumps({
            'comparisonItem': [
                {'keyword': kw, 'geo': geo, 'time': time_range}
                for kw in keywords
            ],
            'category': 0,
            'property': ''
        })
    }
    url = 'https://trends.google.com/trends/api/explore?' + urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                       'AppleWebKit/537.36 (KHTML, like Gecko) '
                       'Chrome/125.0.0.0 Safari/537.36'
    })
    try:
        resp = urllib.request.urlopen(req, timeout=20)
        data = resp.read().decode('utf-8')
        return data
    except Exception as e:
        return f'ERROR: {e}'

def google_trends_related_queries(keyword, geo='US', time_range='now 7-days'):
    """Get related queries from Google Trends for a keyword."""
    params = {
        'hl': 'en-US',
        'tz': -300,
        'req': json.dumps({
            'comparisonItem': [
                {'keyword': keyword, 'geo': geo, 'time': time_range}
            ],
            'category': 0,
            'property': ''
        })
    }
    url = 'https://trends.google.com/trends/api/explore?' + urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                       'AppleWebKit/537.36 (KHTML, like Gecko) '
                       'Chrome/125.0.0.0 Safari/537.36'
    })
    try:
        resp = urllib.request.urlopen(req, timeout=20)
        data = resp.read().decode('utf-8')
        # Parse the JSONP response
        if data.startswith(')]}'):
            data = data[4:]
        data = data.strip()
        parsed = json.loads(data)
        
        # Get widget IDs for related queries
        if 'widgets' in parsed:
            for widget in parsed['widgets']:
                if 'id' in widget and 'related' in str(widget.get('id', '')):
                    # This widget has related queries
                    token = parsed.get('token', '')
                    widget_id = widget['id']
                    params2 = {
                        'hl': 'en-US',
                        'tz': -300,
                        'req': json.dumps({
                            'token': token,
                            'widget': widget_id,
                            'side_panel': False
                        })
                    }
                    url2 = 'https://trends.google.com/trends/api/widgetdata/relatedsearches?' + urllib.parse.urlencode(params2, doseq=True)
                    req2 = urllib.request.Request(url2, headers={
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                                       'AppleWebKit/537.36 (KHTML, like Gecko) '
                                       'Chrome/125.0.0.0 Safari/537.36'
                    })
                    try:
                        resp2 = urllib.request.urlopen(req2, timeout=20)
                        data2 = resp2.read().decode('utf-8')
                        if data2.startswith(')]}'):
                            data2 = data2[4:]
                        data2 = data2.strip()
                        return json.loads(data2)
                    except:
                        pass
        return parsed
    except Exception as e:
        return f'ERROR: {e}'

# Step 1: Get daily trends for the past week
print("=" * 70)
print("GOOGLE TRENDS - DAILY TRENDING SEARCHES (US)")
print("=" * 70)

# Try getting dailytrends via API
params_daily = {
    'hl': 'en-US',
    'tz': -300,
    'geo': 'US',
    'ns': 15
}
url_daily = 'https://trends.google.com/trends/api/dailytrends?' + urllib.parse.urlencode(params_daily, doseq=True)
req_daily = urllib.request.Request(url_daily, headers={
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                   'AppleWebKit/537.36 (KHTML, like Gecko) '
                   'Chrome/125.0.0.0 Safari/537.36'
})
try:
    resp = urllib.request.urlopen(req_daily, timeout=20)
    daily_data = resp.read().decode('utf-8')
    if daily_data.startswith(')]}'):
        daily_data = daily_data[4:]
    daily_data = daily_data.strip()
    daily_json = json.loads(daily_data)
    
    # Extract trending searches
    if 'default' in daily_json and 'trendingSearchesDays' in daily_json['default']:
        for day in daily_json['default']['trendingSearchesDays']:
            date = day.get('date', 'unknown')
            print(f"\n--- {date} ---")
            for ts in day.get('trendingSearches', []):
                title = ts.get('title', {}).get('query', 'N/A')
                traffic = ts.get('formattedTraffic', 'N/A')
                related = [r.get('query', '') for r in ts.get('relatedQueries', [])[:3]]
                print(f"  [{traffic}] {title}")
                if related:
                    print(f"         Related: {', '.join(related)}")
except Exception as e:
    print(f"Daily trends API error: {e}")
    print("Using RSS feed data instead (already collected)")

print("\n\n" + "=" * 70)
print("GOOGLE TRENDS - TECH SUPPORT EXPLORE (Last 7 days)")
print("=" * 70)

# Step 2: Explore tech support keywords  
tech_keywords = [
    'how to fix',
    'not working', 
    'error',
    'won\'t turn on',
    'won\'t connect',
    'fix error',
    'troubleshoot',
    'blue screen',
    'won\'t charge',
    'connection issue',
    'wont start',
    'not loading',
    'keeps crashing',
    'screen frozen',
    'no sound',
    'wont update',
    'wont install',
    'wont boot'
]

# Batch the keywords (max 5 per request)
batch_size = 5
for i in range(0, len(tech_keywords), batch_size):
    batch = tech_keywords[i:i+batch_size]
    print(f"\n--- Batch {i//batch_size + 1}: {', '.join(batch)} ---")
    result = google_trends_explore(batch)
    if result.startswith('ERROR'):
        print(f"  {result}")
    else:
        # Parse the JSONP response
        cleaned = result
        if cleaned.startswith(')]}'):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()
        try:
            parsed = json.loads(cleaned)
            # Extract just the comparison data
            if 'widgets' in parsed:
                for widget in parsed['widgets']:
                    if widget.get('id') == 'TIMESERIES':
                        print(f"  Timeseries data available for {batch}")
                    elif widget.get('id') == 'GEO_MAP':
                        print(f"  Geo map data available for {batch}")
                    else:
                        wid = widget.get('id', 'unknown')
                        title = widget.get('title', '')
                        print(f"  Widget: {wid} - {title}")
        except json.JSONDecodeError as e:
            print(f"  Parse error: {e}")
            print(f"  Raw: {result[:300]}")
    time.sleep(1)  # Rate limit

print("\n\n" + "=" * 70)
print("GOOGLE TRENDS - RELATED QUERIES FOR KEY TECH TERMS")
print("=" * 70)

# Step 3: Get related queries for the most relevant tech support terms
explore_terms = [
    'how to fix iphone',
    'how to fix computer',
    'how to fix wifi',
    'how to fix tv',
    'how to fix printer',
    'how to fix laptop',
    'how to fix bluetooth',
    'how to fix keyboard',
    'how to fix mouse',
    'how to fix audio',
    'how to fix screen',
    'how to fix camera',
    'how to fix battery',
    'how to fix chromebook',
    'how to fix ipad',
    'how to fix app',
    'how to fix game',
    'how to fix controller',
    'how to fix router',
    'how to fix speaker',
    'not working today',
    'not working error',
    'server down',
    'website down',
    'app crashing',
    'update error',
]

for i in range(0, len(explore_terms), 5):
    batch = explore_terms[i:i+5]
    print(f"\n--- Batch {i//5 + 1}: {', '.join(batch)} ---")
    result = google_trends_explore(batch)
    if result.startswith('ERROR'):
        print(f"  {result}")
    else:
        cleaned = result
        if cleaned.startswith(')]}'):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()
        try:
            parsed = json.loads(cleaned)
            if 'widgets' in parsed:
                for widget in parsed['widgets']:
                    wid = widget.get('id', 'unknown')
                    title = widget.get('title', '')
                    token = widget.get('token', '')
                    print(f"  Widget: {wid} - {title}")
        except:
            print(f"  Raw result excerpt: {result[:300]}")
    time.sleep(1.5)

print("\n\nDone.")
