# FixMeButton — Hermes Agent Context

**Shared project facts live in `replit.md`** — read that first for stack, architecture, gotchas, and run commands. This file is Hermes-specific additions.

## Hermes Pipeline

5-agent content pipeline for automated guide production:

| Agent | Skill | Model | Role |
|-------|-------|-------|------|
| Scout | `fixmebutton-scout` | deepseek-v4-flash | Research trending issues |
| Author | `fixmebutton-author` | deepseek-v4-pro | Write SEO MDX guides |
| Illustrator | `fixmebutton-illustrator` | deepseek-v4-flash | Generate step images |
| Inspector | `fixmebutton-inspector` | claude-sonnet-4 | QA verify accuracy |
| Publisher | `fixmebutton-publisher` | deepseek-v4-flash | Git commit, PR, deploy |

**Pipeline design skill:** `content-factory-pipeline`

## Obsidian Vault

Vault: `~/hermes-workspace/Umbrella Corp/`
- Research briefs: `02 - Knowledge/Tech Topics/`
- Troubleshooting: `02 - Knowledge/Troubleshooting.md` (FixMeButton section)
- Agent profiles: `03 - Agents/`

## Guides Published: 77

## Cron Notes

- Replit remote = Browserbase cloud (separate from local Brave)
- Replit CLI at `/opt/homebrew/bin/replit` (needs token)
