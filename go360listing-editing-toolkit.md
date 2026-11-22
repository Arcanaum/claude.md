# Go360Listing editing toolkit: research and plan

Date: 2026-11-22
Status: research complete; nothing installed or tested yet.
Source site: https://www.go360listing.com/

## 1. Goal

Use Claude Code and OpenAI Codex together to cut photo and video editing time for Go360Listing. One agent builds the editing scripts, the other reviews them, and the business owner runs the finished scripts on each shoot.

## 2. What the business sells

Go360Listing (360Listing) is a Los Angeles real estate media company. The site lists no pricing, turnaround times or tools.

| Service | Details from the site |
|---|---|
| Photography | Real estate, FAA-licensed aerial, architectural and interior design, twilight |
| Retouching styles | Traditional Light (natural light, subtle retouching), Modern Light (bright, clean, polished), Hybrid (natural and artificial light blended) |
| Virtual tours | Self-navigated VR, custom guided walk-throughs, social media exports |
| Videography | Marketing videos, featurettes, cuts for Reels, TikTok, YouTube Shorts, Facebook |
| 2D floor plans | Several visual styles |

## 3. Editing repos

Stars, licences and activity were read from GitHub on 2026-11-22. None of these were installed or run, so time savings are expected, not measured.

### Photo editing

| Repo | Stars | Licence | Editing job it covers |
|---|---|---|---|
| https://github.com/darktable-org/darktable | 13.5k | GPL-3.0 | Raw developer with saved styles and a command-line mode. One preset per look, applied to a whole shoot in a batch. |
| https://github.com/jcelaya/hdrmerge | 437 | check repo | Merges exposure brackets into one raw file for interiors with bright windows. |
| https://github.com/opencv/opencv | 91.7k | Apache-2.0 | Exposure fusion and bracket alignment for the natural-plus-flash blend behind the Hybrid style. |
| https://github.com/lensfun/lensfun | 894 | LGPL-3.0 | Automatic lens distortion and vignetting correction for wide-angle interiors. |
| https://github.com/facebookresearch/sam2 | 20.2k | Apache-2.0 | Click-to-mask segmentation for windows, skies and furniture. |
| https://github.com/advimman/lama | 10.4k | Apache-2.0 | Object removal by inpainting. Last updated February 2025. |
| https://github.com/lllyasviel/IC-Light | 8.6k | Apache-2.0 | AI relighting, a starting point for day-to-dusk virtual twilight. Last updated February 2025. |
| https://github.com/chaofengc/IQA-PyTorch | 3.5k | check repo | Image quality scoring to pre-sort sharp, well-exposed frames for culling. |
| https://github.com/exiftool/exiftool | 5.3k | GPL-3.0 | Batch renaming, bracket grouping by timestamp, copyright and listing metadata. |

### Virtual tours

| Repo | Stars | Licence | Editing job it covers |
|---|---|---|---|
| https://github.com/OpenStitching/stitching | 2.6k | Apache-2.0 | Scriptable panorama stitching for 360 captures. |
| https://github.com/mpetroff/pannellum | 4.9k | MIT | Self-hosted 360 tour viewer with hotspots. |

### Video

| Repo | Stars | Licence | Editing job it covers |
|---|---|---|---|
| https://github.com/FFmpeg/FFmpeg | 68.0k | check repo | Scripts one master edit into every platform format (9:16, 1:1, 16:9). |
| https://github.com/gyroflow/gyroflow | 9.8k | GPL-3.0 | Gyro-based stabilisation for drone and gimbal footage. |
| https://github.com/Breakthrough/PySceneDetect | 5.6k | BSD-3-Clause | Splits long walk-through footage into clips for rough cuts. |

### Floor plans

No mature open-source tool turns a scan into a finished 2D floor plan. The closest is https://github.com/CubiCasa/CubiCasa5k (635 stars), a research model for recognising rooms in floor plan images. Check its licence before commercial use.

### Dropped

- Sanster/IOPaint, google/marzipano, idealo/image-quality-assessment: archived.
- jiupinjia/SkyAR (sky replacement): no licence listed.

## 4. Claude Code and Codex repos

| Repo | Stars | What it does | Note |
|---|---|---|---|
| https://github.com/openai/codex-plugin-cc | 35.4k | OpenAI's official plugin. Claude Code hands work to Codex for review or delegates tasks to it. | One direction only: Claude Code calls Codex. Apache-2.0. |
| https://github.com/chaseai-yt/claudex-loop | 3.6k | Claude Code skill. Codex adversarially reviews the plan, then the two swap roles so the builder never grades its own work. | Most literal "evaluate each other" setup. |
| https://github.com/the-open-engine/zeroshot | 2.2k | Harness that runs Claude Code, Codex and other agents, with separate agents reviewing and testing. | Runs locally on existing subscriptions. |
| https://github.com/sno-ai/sno-station | 1.0k | Puts Codex, Claude Code and others on one team with shared memory; they review each other's code. | |
| https://github.com/BeehiveInnovations/pal-mcp-server | 11.8k | Lets Claude Code or Codex CLI consult other models for a second opinion. | Not updated since December 2025. |
| https://github.com/anthropics/claude-code | 156.7k | Claude Code itself. | |
| https://github.com/openai/codex | 136.1k | Codex CLI itself. Apache-2.0. | |

Recommended start: codex-plugin-cc only. Add claudex-loop later if role-swapping is wanted.

## 5. Plan

The agents do not edit photos or video themselves. They write and review scripts that drive the tools in section 3; the owner runs those scripts.

| Role | Who | Job |
|---|---|---|
| Builder | Claude Code | Writes the editing scripts and presets |
| Reviewer | Codex, called through codex-plugin-cc | Reviews each script before it is used on client work |
| Operator | Business owner | Drops a shoot into a folder, runs one command, checks the output |

### Phase 1: photo batch pipeline

1. Group brackets by timestamp and rename files (exiftool).
2. Merge brackets (hdrmerge).
3. Apply lens correction and one of three style presets: Traditional, Modern, Hybrid (darktable with lensfun).
4. Export web and print sizes into a delivery folder.

Done when: one real shoot runs end to end with one command and the owner accepts the output for at least one style.

### Phase 2: social video exports

1. Take one finished master video.
2. Export 9:16, 1:1 and 16:9 versions at each platform's settings (FFmpeg).
3. Optional: stabilise drone and gimbal clips first (gyroflow) and auto-split raw footage (PySceneDetect).

Done when: one master file produces all platform versions with one command.

### Phase 3: per-image AI assists

Masking (sam2), object removal (lama), culling scores (IQA-PyTorch), virtual twilight (IC-Light). These need a GPU and a human check on every image, so they come after the batch steps.

### Phase 4: tours and floor plans

Stitching and self-hosted tours (stitching, pannellum). Floor plans stay manual unless the CubiCasa5k licence allows commercial use.

## 6. Open questions for the owner

- Which camera bodies, lenses and drone are in use? Lens correction and stabilisation depend on this.
- Which editing software is used today (Lightroom, Photoshop, Premiere, DaVinci)? The scripts should fit around it, not replace it all at once.
- Is there a computer with a GPU for Phase 3?
- Which of the three styles is ordered most? Build that preset first.
- Which tour platform is used now, and is self-hosting wanted?

## 7. Limits of this research

- No tool was installed or run. Fit and time savings are unverified.
- Licences marked "check repo" were not standard ones GitHub could identify; read them before commercial use.
- AI edits to listing photos (object removal, twilight, sky changes) may need disclosure under MLS or local advertising rules. Confirm before delivering them to clients.
- Paid plans for Claude Code and Codex are needed to run both; no other paid service is assumed.

## 8. Next steps

1. Owner answers the questions in section 6.
2. Install Claude Code, Codex CLI and codex-plugin-cc, following each repo's README.
3. Build Phase 1 on one past shoot and compare the output and time against the current manual edit.
