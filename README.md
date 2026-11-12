# claude.md

Claude Code setup. Skills in `.claude/skills/` load automatically when Claude
Code runs in this repo (locally or in a cloud session).

## Installed skills

[tstack](https://github.com/t3dotgg/tstack) by Theo Browne (MIT, see
`.claude/skills/LICENSE.tstack`), copied unmodified from commit `11e37a7`
(2026-11-11).

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
GitHub GraphQL is blocked. So `gh pr view/checks/list` and `pr-wait` fail
there; `file-pr` falls back to REST, and babysitting uses the session's
built-in PR activity watching instead. Locally everything works.

## Use them in every project on your own computer

```bash
git clone https://github.com/arcanaum/claude.md
mkdir -p ~/.claude/skills
cp -R claude.md/.claude/skills/* ~/.claude/skills/
```

## Update from upstream

```bash
git clone https://github.com/t3dotgg/tstack /tmp/tstack
cp -R /tmp/tstack/skills/* .claude/skills/
```
