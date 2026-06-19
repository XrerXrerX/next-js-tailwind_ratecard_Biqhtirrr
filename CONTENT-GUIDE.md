# Content Editing Guide

This site has **no admin panel**. The old back-office (`/adm-ads`, `/api/content`,
`/api/upload`, `data/content.json`) was removed. All content is **hardcoded** in one
shared file used by both pages:

> **File:** `lib/site-content.ts`
> **Block:** the `SITE_CONTENT` constant (starts at **line 54**)
> **Theme colors:** the `T` constant (starts at **line 162**)

Both the biolink home (`/`) and the rate card (`/ratecard`) import from this file, so
editing a value here updates it everywhere. Save and redeploy — nothing else to touch.

> ⚠️ **Line numbers below are accurate as of the current file** and shift if you add or
> remove lines. The **field name** (e.g. `followers:`) is the stable anchor — if a line
> number is off, search for the field name inside `SITE_CONTENT`.

---

## 1. Profile — `profile` (lines 55–71)

Shown on the **biolink home** (name, handle, tagline, followers, photo) and the
**rate card hero**.

| What you see | Field | Line |
|---|---|---|
| Handle `@biqhtirrr` | `handle` | **56** |
| Display name "Andien" | `name` | **57** |
| Tagline under the name | `tagline` | **58** |
| Followers count (`222.1K`) | `followers` | **59** |
| TikTok link (biolink "TikTok" button + ratecard) | `tiktokUrl` | **60** |
| "update … (recap …)" text (ratecard) | `updateDate` | **61** |
| About paragraph 1 (ratecard) | `aboutText1` | **62–63** |
| About paragraph 2 (ratecard) | `aboutText2` | **64–65** |
| 3 bullet highlights (ratecard) | `highlights[]` | **67, 68, 69** |

**Profile photo** (biolink avatar + ratecard hero): `profileImage` → **line 157**
(`/image.jpg` = `public/image.jpg`).

---

## 2. Audience demographics — `demographics` (lines 72–76)  ·  *ratecard only*

| What you see | Field | Line |
|---|---|---|
| Gender split (female/male/others) | `gender` | **73** |
| Age buckets | `age` | **74** |
| Location | `location` | **75** |

---

## 3. Pricing packages — `packages[]` (lines 77–137)  ·  *ratecard only*

Four cards in order. Each: `name`, `subtitle`, `price`, `priceNote`, `save` (`""`
hides the badge), `color` (`rose`/`amber`/`purple`/`sky`), `popular` (`true` = ribbon),
`features[]`.

| Card | `price` line |
|---|---|
| Single Video | **82** (`Rp 2.250.000`) |
| Triple Video Package | **98** (`Rp 6.950.000`, `popular: true`) |
| Fifth Video Package | **114** (`Rp 9.500.000`) |
| Custom Video Package | **130** (`Chat Us Now !`) |

---

## 4. Analytics / stats — `analytics` (lines 138–150)  ·  *ratecard only*

| What you see | Field | Line |
|---|---|---|
| Overview image | `overviewImage` | **139** |
| Audience image | `audienceImage` | **140** |
| Monthly views | `monthlyViews` | **141** |
| Monthly likes | `monthlyLikes` | **142** |
| Female audience % | `femaleAudience` | **143** |
| Primary age | `primaryAge` | **144** |
| Top 3 videos | `topVideos[]` | **146, 147, 148** |

---

## 5. Contact — `contact` (lines 151–156)

Drives the **biolink WhatsApp / Instagram buttons** and the ratecard contact section.

| What you see | Field | Line |
|---|---|---|
| Email (ratecard copy button) | `email` | **152** |
| WhatsApp number (biolink "WhatsApp" button → `wa.me/…`) | `whatsapp` | **153** |
| Instagram link (biolink "Instagram" button) | `instagramUrl` | **154** |
| TikTok embed username (ratecard) | `tiktokEmbedId` | **155** |

> The biolink "TikTok" button uses `profile.tiktokUrl` (line **60**), not
> `tiktokEmbedId`.

---

## 6. Theme colors — `T` (lines 162–175)

Pink palette shared by both pages (background gradients, buttons, chips, text).
Change `primary` / `accent` / `text` etc. here to re-skin the whole site.

---

## Images

Static files under `public/`. A value like `/uploads/ov_2jan.png` →
`public/uploads/ov_2jan.png`. To change an image, drop the file into `public/` and
point the field at it with a leading `/`.

> `/api/upload` no longer exists — add images by committing them to `public/`.

---

## After editing

```bash
npm run dev      # preview: http://localhost:3000 (biolink) and /ratecard
npm run build    # production build — run before deploy; catches type errors
```

The `SiteContent` type (top of `lib/site-content.ts`, lines 7–52) enforces the shape:
a mistyped field name or wrong type fails the build before it ships.
