# claude.md

Claude Code setup. Skills in `.claude/skills/` load automatically when Claude
Code runs in this repo (locally or in a cloud session).

## tstack

[tstack](https://github.com/t3dotgg/tstack) by Theo Browne (MIT, see
`.claude/skills/LICENSE.tstack`), copied from commit `11e37a7` (2026-11-11).
One local change: `babysit-pr`'s `pr-wait` script reads PRs over the REST API
instead of GraphQL, so it works in Claude Code cloud sessions (see below).

| Skill | Say | What it does |
|---|---|---|
| `full-send` | "full send" | Proves, reviews, files, babysits and **merges** a PR unattended. |
| `full-stop` | "full stop" | Same as `full-send`, but stops when the PR is ready to merge. |
| `council` | "council" | Reviews with three models from different providers until they agree. |
| `sol-loop` | "sol loop" | Reviews a change with GPT Sol in a loop. |
| `file-pr` | "file a PR" | Files a short PR that leads with the problem. |
| `takeover` | "take over" | Finishes someone else's PR, branch or agent thread, keeping their credit. |
| `babysit-pr` | "babysit" | Watches a PR through CI and review bots and fixes real findings. |
| `modernize` | "modernize" | Rebases an old PR and decides if it should still exist. |
| `leaving-pr-comments` | (automatic) | Adds a "🤖 responding on behalf of" note to agent-posted GitHub comments. |

Requirements: an authenticated `gh` CLI, and `python3` for `babysit-pr`'s
`pr-wait` script. `council` and `sol-loop` need subagents running non-Claude
models (T3 Code's `delegate_task` or similar); plain Claude Code cannot run
them and the skills say to report that instead of substituting a model.

In Claude Code cloud sessions (claude.ai/code), `gh` is already authenticated
(`gh auth status` wrongly reports an invalid token; `gh api user` works), but
GitHub GraphQL is blocked, and `gh api --paginate` fails on page 2. So
`gh pr view/checks/list` fail there; `file-pr` falls back to REST. `pr-wait`
works: it uses REST with numbered pages, and reads review thread resolution
from GraphQL, or from the cloud-only `pulls/<n>/ccr/review_threads` route when
GraphQL is blocked. That route's response format is undocumented and not yet
checked against a real PR; if `pr-wait` cannot read it, `--until ready` stops
with "cannot read review thread resolution" rather than guessing.

## taste-skill (`design-taste-frontend`)

[taste-skill](https://github.com/Leonxlnx/taste-skill) by Leon Lin (MIT, see
`.claude/skills/LICENSE.taste-skill`), v2.5.1 (commit `f6b7657`), copied
unmodified into `.claude/skills/design-taste-frontend/` (40 MB, mostly bundled
photographs). It steers website and landing-page work away from generic
"AI-made" design, then checks the page in headless Chrome.

- Triggers when you build, redesign, restyle or review a landing page or
  company site, or say a page looks generic.
- Needs Node 22+ and Chrome, Edge or Chromium (`CHROME_PATH` for a
  non-standard location; `effects.mjs` reads `CHROME`). ffmpeg is optional.
- Once the skill is used in a session, its Stop hook runs `scripts/gate.mjs`
  whenever Claude stops. It does nothing unless the folder has an armed build
  (`.taste-skill/build.json`). With one, it runs the Chrome checks (up to about
  10 minutes) and can send Claude back to fix failures, 7 times per build by
  default.
- Network: photo search on commons.wikimedia.org, downloads from
  upload.wikimedia.org and picsum.photos, icons from cdn.jsdelivr.net, Google
  Fonts links in generated pages. No API keys, no telemetry.
- Cloud sessions run as root, and the scripts start Chrome without
  `--no-sandbox`, which Chrome normally refuses as root. Not tested yet.

Reviewed before install (2026-11-13): every script read for network, process,
file and credential use. No exfiltration, obfuscation or download-and-run
found. Re-review before updating: the Stop hook runs code automatically.

## Use them in every project on your own computer

```bash
git clone https://github.com/arcanaum/claude.md
mkdir -p ~/.claude/skills
cp -R claude.md/.claude/skills/* ~/.claude/skills/
```

taste-skill is also a Claude Code plugin. To install it that way instead,
pinned to the reviewed tag, run inside Claude Code:

```
/plugin marketplace add Leonxlnx/taste-skill#v2.5.1
/plugin install taste-skill@taste-skill
```

## Update from upstream

```bash
git clone https://github.com/t3dotgg/tstack /tmp/tstack
cp -R /tmp/tstack/skills/* .claude/skills/
```

This overwrites the REST `pr-wait` and the cloud note in `babysit-pr/SKILL.md`.
Check `git diff .claude/skills/babysit-pr` and merge the two by hand.

taste-skill (replace the tag with the release you reviewed):

```bash
git clone --branch v2.5.1 https://github.com/Leonxlnx/taste-skill /tmp/taste-skill
rm -rf .claude/skills/design-taste-frontend
cp -R /tmp/taste-skill/skills/taste-skill .claude/skills/design-taste-frontend
```
