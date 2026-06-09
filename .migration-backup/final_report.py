#!/usr/bin/env python3
"""Generate final report of top 5 trending tech support issues on Reddit this week."""
import json

# Categories based on analysis
issues = [
    {
        "rank": 1,
        "issue": "iOS Update Problems — iPhones becoming unstable after iOS updates",
        "symptoms": [
            "iPhone 15 Pro (and other models) restarting every 3 minutes after update",
            "iPhone 16 Pro Max losing WiFi/cellular connectivity repeatedly after updating",
            "iPhone 13 Mini running extremely slow on iOS 26.5 — users report the phone feels 'like a dog' after the update",
            "General pattern: iOS updates causing performance degradation, random reboots, and connectivity drops across multiple iPhone generations"
        ],
        "source_urls": [
            "https://redd.it/1twme48 (score: 424, 85 comments)",
            "https://redd.it/1tvdn50 (score: 417, 66 comments)",
            "https://redd.it/1tzlvzz (score: 157, 102 comments)"
        ],
        "subreddits": ["r/iPhone"],
        "severity": "Critical — devices becoming unusable"
    },
    {
        "rank": 2,
        "issue": "iPhone Display Anomalies — Pink vertical lines and color accuracy problems",
        "symptoms": [
            "Mysterious bright pink vertical line suddenly appearing on iPhone screen while watching YouTube — no physical damage reported",
            "iPhone 17 display color calibration issues: yellows, reds, oranges, and pinks look incorrect compared to older iPhone 14 with same display settings",
            "Users worried about hardware failure vs. software bug"
        ],
        "source_urls": [
            "https://redd.it/1txjuph (score: 250, 121 comments)",
            "https://redd.it/1tuc9bx (score: 188, 49 comments)"
        ],
        "subreddits": ["r/iPhone"],
        "severity": "Medium-High — display issues affecting usability"
    },
    {
        "rank": 3,
        "issue": "Roku Update Bricking Devices — Streaming sticks and TVs become non-functional after firmware update",
        "symptoms": [
            "Roku Streaming Stick completely bricked after latest update — device won't boot past pairing screen",
            "Roku TV randomly restarting itself, forgetting WiFi credentials, crashing when opening apps like YouTube",
            "TV turning on then immediately shutting off when using Roku remote — worked fine before update a few days ago",
            "Certain apps become unopenable after TV auto-restarted and factory reset itself"
        ],
        "source_urls": [
            "https://redd.it/1txsc1c (score: 6, 5 comments)",
            "https://redd.it/1twgd9u (score: 2, 3 comments)",
            "https://redd.it/1txmg6i (score: 3, 2 comments)",
            "https://redd.it/1twopkb (score: 5, 15 comments)"
        ],
        "subreddits": ["r/Roku"],
        "severity": "High — devices being rendered unusable by firmware"
    },
    {
        "rank": 4,
        "issue": "Windows 11 Audio Crackling, Stuttering, and Dropouts",
        "symptoms": [
            "Sound crackles, stutters, and briefly cuts out during normal use on new laptops",
            "Problem comes and goes randomly during usage — not constant but very disruptive",
            "Affects multiple audio output devices (speakers, headphones)",
            "Users reporting on Windows 11 systems with various hardware configs"
        ],
        "source_urls": [
            "https://redd.it/1twwf3g (score: 7, 24 comments)",
            "https://redd.it/1tye1pp (score: 5, 20 comments — internet drops when gaming, possibly related audio/network driver issue)"
        ],
        "subreddits": ["r/techsupport"],
        "severity": "Medium — disruptive for daily use"
    },
    {
        "rank": 5,
        "issue": "NVIDIA GeForce Driver 610.47 — Performance stutter and instability on RTX 4090 and other GPUs",
        "symptoms": [
            "Users with RTX 4090 + AMD 9800X3D reporting micro-stuttering after updating to NVIDIA driver 610.47",
            "Performance regression in games — users rolling back to previous driver version to fix",
            "4K 240Hz QD-OLED monitors showing stutter that wasn't present before driver update",
            "Multiple users confirming the issue and sharing workarounds"
        ],
        "source_urls": [
            "https://redd.it/1tuqeto (score: 11, 13 comments)",
            "Related: AMD Adrenalin software crashing constantly reported by users (https://redd.it/1tyw6sw, score: 5, 9 comments)"
        ],
        "subreddits": ["r/techsupport"],
        "severity": "Medium — gaming performance affected, workaround available (rollback)"
    }
]

# Also note additional significant issues that appeared
additional = [
    "Swollen/pregnant batteries: Users unsure how to safely dispose of bulging laptop/phone batteries (r/techsupport, https://redd.it/1tz7qnz, score: 16)",
    "SSD cloning corruption: Files corrupted during drive cloning process (r/techsupport, https://redd.it/1tznzxp, score: 5)",
    "Deleted PC partitions during attempted Windows reinstall — system unbootable (r/techsupport, https://redd.it/1ty34pf, score: 10)",
    "Google shuts down Pixel Studio app on Android (r/Android, https://redd.it/1tz12xm, score: 410)",
    "macOS 27 compatibility drop — Apple confirms certain Macs won't be supported (r/mac, https://redd.it/1tvu2pq, score: 375)"
]

print("=" * 80)
print("TRENDING TECH SUPPORT ISSUES ON REDDIT — Week of June 1-8, 2026")
print("=" * 80)
print()
print(f"Method: Scraped top weekly posts from old.reddit.com/r/[subreddit]/top/?t=week")
print(f"Subreddits analyzed: r/techsupport, r/iPhone, r/Android, r/Roku, r/Windows10, r/mac")
print(f"Total posts analyzed: 127")
print()

for issue in issues:
    print(f"\n{'#'*70}")
    print(f"#{issue['rank']} — {issue['issue']}")
    print(f"{'#'*70}")
    print(f"Severity: {issue['severity']}")
    print(f"Subreddits: {', '.join(issue['subreddits'])}")
    print()
    print("Symptoms described by users:")
    for s in issue['symptoms']:
        print(f"  • {s}")
    print()
    print("Source URLs:")
    for url in issue['source_urls']:
        print(f"  • {url}")
    print()

print("=" * 70)
print("ADDITIONAL NOTABLE ISSUES")
print("=" * 70)
for item in additional:
    print(f"  • {item}")
print()

# Save to file
with open('/Users/Alex_AI_Wizard/hermes-workspace/fixmebutton/trending_issues.txt', 'w') as f:
    f.write("TRENDING TECH SUPPORT ISSUES ON REDDIT — Week of June 1-8, 2026\n")
    f.write("=" * 70 + "\n\n")
    for issue in issues:
        f.write(f"#{issue['rank']} — {issue['issue']}\n")
        f.write(f"Severity: {issue['severity']}\n")
        f.write(f"Subreddits: {', '.join(issue['subreddits'])}\n\n")
        f.write("Symptoms:\n")
        for s in issue['symptoms']:
            f.write(f"  • {s}\n")
        f.write("\nSources:\n")
        for url in issue['source_urls']:
            f.write(f"  • {url}\n")
        f.write("\n\n")
    f.write("ADDITIONAL NOTABLE ISSUES\n")
    for item in additional:
        f.write(f"  • {item}\n")

print("Report saved to trending_issues.txt")
