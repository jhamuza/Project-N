# NCEF Design System

> Extracted from the live codebase (`styles/tokens.css`, `NCEF Portal.html`, `components/`).  
> This is the single source of truth for visual design decisions. All new screens must use these tokens and patterns.

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Colour Palette](#2-colour-palette)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Elevation & Borders](#5-elevation--borders)
6. [Components](#6-components)
7. [Ant Design Usage & Overrides](#7-ant-design-usage--overrides)
8. [Role Colours](#8-role-colours)
9. [Brand Voice & Writing Style](#9-brand-voice--writing-style)
10. [Interaction Patterns](#10-interaction-patterns)

---

## 1. Brand Identity

### Logo & Wordmark

| Element | Spec |
|---|---|
| Logo asset | `assets/mcmc-logo.png` — 40×40px in sidebar; 48×48px on login panel |
| Wordmark | **NCEF** — Inter 700, 16px in sidebar; 20px on login panel |
| Sub-label | `MCMC · Certification` (sidebar) / `MCMC · CERTIFICATION PORTAL` (login) — 10–11px, `--color-text-muted`, `letter-spacing: 0.3–0.4px` |
| Logo background | White `#FFFFFF` with `border-radius: 8px; padding: 4px` when on coloured backgrounds |

### Brand Colours (Primary Identity)

| Name | Hex | Usage |
|---|---|---|
| MCMC Blue | `#0B4F91` | Primary brand colour — buttons, links, active states, brand panel backgrounds |
| MCMC Blue Dark | `#073863` | Gradient end, deep accents |
| MCMC Red | `#C62828` | Accent / danger — mirrors MCMC's secondary brand colour |

### Brand Panel (Login Screen)
The login screen left panel uses a solid `--color-primary` (`#0B4F91`) background with white text:
- Tagline EN: *"Malaysia's unified certification platform for communications and multimedia equipment."*
- Tagline MS: *"Selamat datang ke Portal NCEF"*
- Footer: `© 2026 Malaysian Communications and Multimedia Commission · Suruhanjaya Komunikasi dan Multimedia Malaysia`

### Header Gradient
```css
--header-gradient: linear-gradient(90deg, #0B4F91 0%, #073863 100%);
```
Used for any full-width header band. The top application bar uses flat white (`#FFFFFF`) with a 1px bottom border instead.

---

## 2. Colour Palette

All colours are defined as CSS custom properties in `styles/tokens.css` and mirrored as `colorPrimary`/`colorSuccess`/etc. in the Ant Design `ConfigProvider` theme token.

### Primary Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0B4F91` | Buttons, links, active nav items, focus rings |
| `--color-primary-hover` | `#0A4783` | Button hover state |
| `--color-primary-dark` | `#073863` | Gradient end, deep headings |
| `--color-primary-subtle` | `#E3F0FA` | Selected nav item background, active card tint |
| `--color-primary-soft` | `#F1F7FD` | Hover backgrounds, expanded row bg, doc tile hover |

### Semantic Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#1B7F48` | Approved status, passed checks, positive KPIs |
| `--color-success-bg` | `#E5F6EE` | Success pill/badge background, AI pass rows |
| `--color-warning` | `#B87200` | Iteration status, priority review, SLA near-miss |
| `--color-warning-bg` | `#FFF5E5` | Warning pill background, AI flag rows |
| `--color-danger` | `#C62828` | Rejected status, errors, overdue SLA |
| `--color-danger-bg` | `#FDEBEC` | Danger pill background |
| `--color-info` | `#0F6ABF` | In-review status, informational tags |
| `--color-info-bg` | `#E6F2FC` | Info pill background |
| `--color-accent` | `#C62828` | Same as danger — used as secondary brand accent |

### Neutral / Surface

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-base` | `#F5F8FB` | Page background (`body`, `colorBgLayout`) |
| `--color-bg-subtle` | `#EDF2F7` | Table headers, segmented control bg, secondary surfaces |
| `--color-bg-elevated` | `#FFFFFF` | Cards, modals, sidebar, dropdowns |
| `--color-border` | `#D3DEE8` | Default card/input borders |
| `--color-border-strong` | `#B4C2CF` | Scroll thumb, score gauge tick marks |
| `--color-divider` | `#E2E8F0` | `<Divider>`, table row separators, header bottom border |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#1B2833` | Body copy, headings, table cell text |
| `--color-text-secondary` | `#4A5B6B` | Supporting text, descriptions, sub-labels |
| `--color-text-muted` | `#6B7A89` | Captions, timestamps, icon labels, uppercase labels |
| `--color-text-inverse` | `#FFFFFF` | Text on dark/primary backgrounds |
| `--color-link` | `#0B5FCC` | Inline hyperlinks |

### Role Accent Colours

| Role | Hex | Used for avatar backgrounds, tag colours |
|---|---|---|
| Supplier | `#0B4F91` (`--color-primary`) | Blue — default brand |
| Team Lead / System Admin | `#7B3FA0` | Purple |
| Officer / OIC | `#0F6ABF` (`--color-info`) | Steel blue |

---

## 3. Typography

### Fonts

```css
--font-body: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
```

Loaded via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- `Inter` is the **only** typeface used for all UI text.
- `JetBrains Mono` is used exclusively for: timestamps, IP addresses, application IDs (`Typography.Text code`), audit log IDs, and any fixed-width data.
- `font-smoothing: antialiased` applied globally.

### Type Scale

| Use | Size | Weight | Notes |
|---|---|---|---|
| Display / Hero score | 56px | 800 | AI score full-page display; `font-feature-settings: "tnum"` for numerals |
| KPI value | 28px | 700 | `.kpi-value` |
| Section title | 24px | 600 | Login panel tagline |
| Card / page title (h2) | 22px | 600 | `.page-header h1` |
| Form / card heading | 20px | 600–700 | antd `Title level={3}` |
| Product / item name | 15–16px | 600–700 | Primary row content |
| Body / form labels | 13–14px | 400–500 | Default readable text |
| Secondary / descriptions | 12–13px | 400–500 | Sub-rows, hints, timestamps |
| Table headers / labels | 12px | 600 | ALL CAPS, `letter-spacing: 0.3–0.4px` |
| Captions / tags / pills | 11–12px | 600–700 | Status pills, scheme badges |
| Micro / overlines | 10–11px | 600–700 | Brand sub-label, audit column headers |

### Uppercase Labels Pattern
All section labels, column headers, KPI labels, and breadcrumb-style crumbs use:
```css
font-size: 11–12px;
font-weight: 600;
color: var(--color-text-muted);
text-transform: uppercase;
letter-spacing: 0.3–0.4px;
```

---

## 4. Spacing & Layout

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Scheme badges, small tags, bar chart rects |
| `--radius-md` | `8px` | Buttons (`borderRadius: 8` in ConfigProvider), inputs, small cards |
| `--radius-lg` | `12px` | KPI cards, outline cards, sidebar logo area |
| `--radius-xl` | `16px` | Login card, login branding panel, modal corners |
| `999px` | pill | Status pills, wizard pill bar, progress bars, FAB |

### Application Shell Dimensions

| Element | Dimension |
|---|---|
| Sidebar (expanded) | `240px` wide |
| Sidebar (collapsed) | `72px` wide |
| Top header bar | `56px` tall |
| Header padding | `0 24px` |
| Page header padding | `20px 32px` |
| Card body padding (default) | `24px` (antd default) |
| Card body padding (compact) | `16px` (`.ncef-compact` override) |
| Content area padding | `24–32px` |

### Grid & Gaps

| Context | Gap |
|---|---|
| antd `Row` gutter (standard) | `[16, 16]` |
| antd `Row` gutter (compact) | `[12, 12]` |
| Officer split layout | `grid-template-columns: 1fr 380px` |
| Login page grid | `grid-template-columns: 1fr 1fr`, `gap: 24px` |
| KPI card row | `gap: 16px` |
| Inline label + control | `gap: 8–12px` |
| Button group / Space | `size={8}` or `size="small"` |

### Compact Mode
Class `.ncef-compact` is toggled via the Tweaks panel (dev only). It reduces button height to `32px` and card body padding to `16px`.

### Responsive Breakpoints
| Breakpoint | Behaviour |
|---|---|
| `≤ 1280px` | Officer split collapses to single column; sidebar may auto-collapse |

---

## 5. Elevation & Borders

### Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--elevation-1` | `0 1px 2px rgba(10,40,80,0.06)` | Wizard pill active state, subtle lifts |
| `--elevation-2` | `0 2px 8px rgba(10,40,80,0.08)` | KPI card hover, login form card, modals |
| `--elevation-3` | `0 6px 20px rgba(10,40,80,0.12)` | MINA FAB, floating elements |

### Border Usage

| Context | Style |
|---|---|
| Default card border | `1px solid var(--color-border)` — `#D3DEE8` |
| Card hover (KPI) | `border-color: var(--color-primary)` |
| Sidebar | `border-right: 1px solid var(--color-divider)` |
| Top header | `border-bottom: 1px solid var(--color-divider)` |
| Page header | `border-bottom: 1px solid var(--color-divider)` |
| Table row separator | `border-bottom: 1px solid var(--color-divider)` |
| Scrollbar thumb | `background: var(--color-border-strong); border-radius: 4px` |
| Scrollbar track | `background: transparent` |
| Scrollbar dimensions | `8px × 8px` |

---

## 6. Components

All custom components are defined in `styles/tokens.css`. Use these classes; do not recreate them inline.

### `.status-pill`
Inline status indicator used in tables and detail views. Always includes a 6px dot.

```html
<span class="status-pill draft">Draft</span>
<span class="status-pill review">In Review</span>
<span class="status-pill iteration">Iteration</span>
<span class="status-pill approved">Approved</span>
<span class="status-pill rejected">Rejected</span>
<span class="status-pill expired">Expired</span>
<span class="status-pill priority">Priority</span>
```

| Modifier | Background | Text colour | Border |
|---|---|---|---|
| `.draft` | `#EEF2F6` | `#5A6B7B` | `#D3DEE8` |
| `.review` | `--color-info-bg` | `--color-info` | `#BCDAF2` |
| `.iteration` | `--color-warning-bg` | `--color-warning` | `#F6D9A8` |
| `.approved` | `--color-success-bg` | `--color-success` | `#BEE5CF` |
| `.rejected` | `--color-danger-bg` | `--color-danger` | `#F2C4C5` |
| `.expired` | `#EEF2F6` | `#4A5B6B` | `#C9D3DE` |
| `.priority` | `#FFF0E5` | `#B35A00` | `#F6CFA8` |

Full CSS spec: `display: inline-flex; align-items: center; gap: 6px; padding: 2px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; letter-spacing: 0.2px; border: 1px solid transparent`

---

### `.scheme-badge`
Compact tag for registration scheme labels. Always uppercase.

```html
<span class="scheme-badge a">Scheme A</span>
<span class="scheme-badge b">Scheme B</span>
<span class="scheme-badge c">Scheme C</span>
<span class="scheme-badge sa">Special Approval</span>
```

| Modifier | Background | Text colour |
|---|---|---|
| `.a` | `#FDEBEC` | `#B02020` |
| `.b` | `#FFF5E5` | `#B87200` |
| `.c` | `--color-success-bg` | `--color-success` |
| `.sa` | `#EDE7F6` | `#5E35B1` |

Full CSS spec: `display: inline-flex; align-items: center; gap: 6px; padding: 2px 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; border-radius: 4px; text-transform: uppercase`

---

### `.kpi-card`
Metric tile used in dashboards and queue headers. Hover lifts border to primary and adds elevation-2.

```
.kpi-card
  .kpi-label   → 12px, uppercase, muted, 0.4px tracking
  .kpi-value   → 28px, weight 700, primary text
  .kpi-delta   → 12px, secondary text, top margin 4px
```

Spec:
```css
background: var(--color-bg-elevated);
border: 1px solid var(--color-border);
border-radius: 12px;
padding: 18px 20px;
transition: all 0.2s;
cursor: pointer;
/* hover: */ border-color: var(--color-primary); box-shadow: var(--elevation-2);
```

---

### `.outline-card`
Plain container card with no padding override — use for wrapping grouped content without the KPI semantics.

```css
background: var(--color-bg-elevated);
border: 1px solid var(--color-border);
border-radius: 12px;
```

---

### `.page-header`
Sticky page title bar rendered at the top of every screen.

```css
background: var(--color-bg-elevated);
padding: 20px 32px;
border-bottom: 1px solid var(--color-divider);
display: flex; align-items: center; justify-content: space-between;
/* .page-header h1: */ font-size: 22px; font-weight: 600; margin: 0; color: var(--color-text-primary);
/* .page-header .crumb: */ font-size: 12px; color: var(--color-text-muted); margin-bottom: 4px; letter-spacing: 0.3px; text-transform: uppercase;
```

---

### `.wizard-pill-bar`
Horizontal step selector used inside multi-step forms (SDoC wizard, etc.).

```
Active pill: white bg, primary text, elevation-1
Done pill: success colour text
Inactive: muted text
```

```css
display: flex; gap: 4px; padding: 4px;
background: var(--color-bg-subtle); border-radius: 999px; width: fit-content;
/* .pill: */ padding: 6px 14px; font-size: 12px; font-weight: 600; border-radius: 999px;
/* .pill.active: */ background: var(--color-bg-elevated); color: var(--color-primary); box-shadow: var(--elevation-1);
/* .pill.done: */ color: var(--color-success);
```

---

### `.mina-fab` — MINA AI Chatbot Button
Fixed floating action button, bottom-right of the viewport. Supplier role only.

```css
position: fixed; bottom: 24px; right: 24px; z-index: 100;
width: 56px; height: 56px; border-radius: 28px;
background: var(--color-primary); color: #fff;
box-shadow: var(--elevation-3);
border: 3px solid #fff;
font-size: 22px;
transition: all 0.2s;
/* hover: */ transform: scale(1.05); background: var(--color-primary-hover);
/* .pulse: */ animation: pulse 2s infinite; border: 2px solid var(--color-primary);
```

---

### `.doc-tile`
Compact document attachment row with icon + filename. Used in application detail views.

```css
display: flex; align-items: center; gap: 12px;
padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 8px;
background: var(--color-bg-elevated); transition: all 0.15s;
/* hover: */ border-color: var(--color-primary); background: var(--color-primary-soft);
/* .icon: */ width: 36px; height: 36px; border-radius: 6px;
            background: var(--color-primary-subtle); color: var(--color-primary);
```

---

### `.score-gauge` — SVG AI Score Gauge
120×120px SVG arc gauge. Colour variant applied via modifier class.

```css
/* .bg */ fill: none; stroke: var(--color-bg-subtle); stroke-width: 10;
/* .fg */ fill: none; stroke: var(--color-primary); stroke-width: 10;
          stroke-linecap: round; transition: stroke-dashoffset 1s ease;
/* .score-gauge.success .fg */ stroke: var(--color-success);
/* .score-gauge.warning .fg */ stroke: var(--color-warning);
/* .score-gauge.danger  .fg */ stroke: var(--color-danger);
```

---

### `.officer-split`
Two-column layout for the Active Review screen: main content left, detail panel right.

```css
display: grid;
grid-template-columns: 1fr 380px;
gap: 0;
height: calc(100vh - 140px);
/* ≤ 1280px: */ grid-template-columns: 1fr; height: auto;
```

---

## 7. Ant Design Usage & Overrides

### ConfigProvider Theme Tokens

Applied globally at the `<App>` root and also on the pre-auth `<LoginScreen>`. These map antd's internal token system to the NCEF palette:

```js
token: {
  colorPrimary:   '#0B4F91',
  colorSuccess:   '#1B7F48',
  colorWarning:   '#B87200',
  colorError:     '#C62828',
  colorInfo:      '#0F6ABF',
  fontFamily:     'Inter, -apple-system, Segoe UI, sans-serif',
  borderRadius:   8,
  colorBgLayout:  '#F5F8FB',
}
```

Additional component-level override:
```js
components: { Menu: { itemHeight: 40 } }
```

### Global CSS Overrides (`styles/tokens.css`)

These patch antd's generated classes. **Do not remove them.**

| Selector | Override |
|---|---|
| `.ant-btn-primary` | `background: var(--color-primary)` |
| `.ant-btn-primary:hover` | `background: var(--color-primary-hover)` |
| `.ant-menu-inline .ant-menu-item` | `border-radius: 8px; margin: 4px 8px; width: calc(100% - 16px)` |
| `.ant-menu-inline .ant-menu-item-selected` | `background: var(--color-primary-subtle); color: var(--color-primary); font-weight: 600` |
| `.ant-table-thead > tr > th` | `background: var(--color-bg-subtle); font-weight: 600; color: var(--color-text-secondary); font-size: 12px; letter-spacing: 0.3px; text-transform: uppercase` |
| `.ant-card` | `border-color: var(--color-border)` |
| `.ant-steps-item-process .ant-steps-item-icon` | `background + border-color: var(--color-primary)` |
| `.ant-steps-item-finish .ant-steps-item-icon` | `border-color + icon color: var(--color-primary)` |
| `.ant-steps-item-title` | `font-size: 12px; white-space: nowrap` |
| `.ant-steps-horizontal` | `flex-wrap: wrap; row-gap: 12px` (prevents overflow on narrow viewports) |

### Components in Use

| Component | Notes |
|---|---|
| `Layout`, `Sider`, `Header`, `Content` | Shell structure; Sider is white with light theme |
| `Menu` | `mode="inline"`; `theme="light"`; `selectedKeys` driven by `screen` state |
| `Card` | Default `bordered`; use `bodyStyle` to adjust padding; `size="small"` for dense contexts |
| `Button` | `type="primary"` for primary actions; `type="default"` for secondary; `danger` for destructive; always use `icon` prop for icon-only buttons |
| `Table` | Standard for list views; `size="small"` for dense tables; `rowKey` always set explicitly |
| `Tag` | `green` = approved/pass, `orange` = warning/medium, `red` = danger/high, `blue` = officer, `cyan` = supplier, `purple` = system/admin, `geekblue` = info |
| `Avatar` | Background colour follows role accent; initials from profile `initials` field |
| `Segmented` | Filter selectors (e.g. queue tabs); replaces `Radio.Group` for visual tab switches |
| `Steps` | `size="small"` in wizards; `current` driven by form step index |
| `Progress` | `size="small"`; `strokeColor` driven by threshold (success/warning/danger) |
| `Result` | `status="403"` for restricted screens; `status="success"` for completion states |
| `Modal` | `width={480}` for confirmations and profile modals; `width={560}` for forms |
| `Drawer` | `placement="right"`; `width={400}` for MINA chatbot; `width={480}` for detail panels |
| `Form` | `layout="vertical"` throughout; `size="large"` for primary forms |
| `Input` | `size="large"` for primary form fields; `prefix` always an antd icon component |
| `Select` | `mode="multiple"` with `maxTagCount={2}` for multi-selects in filter bars |
| `Upload` | `Upload.Dragger` for bulk import (CSV/Excel) and document upload areas |
| `Divider` | `orientation="left"` with `orientationMargin={0}` for labelled section breaks |
| `Typography.Text code` | For application IDs, audit IDs, RCNs — renders monospace in an inline code block |
| `Space` | `size={8}` default; `size="small"` for tight groups |
| `Tooltip` | For truncated text and icon-only buttons |
| `Empty` | Standard empty state for zero-result lists and tables |

---

## 8. Role Colours

Colour assignments appear consistently across avatars, tags, profile cards, and the Switch Profile modal.

| Role key | Display name | Avatar / accent colour | antd Tag colour |
|---|---|---|---|
| `supplier` | Supplier | `#0B4F91` (primary) | `geekblue` |
| `team-lead` | MCMC System Administrator | `#7B3FA0` (purple) | `purple` |
| `officer` | MCMC Officer | `#0F6ABF` (info / steel blue) | `blue` |

### Audit Log Role Tags
```js
const roleColor = { Officer: 'blue', Supplier: 'cyan', System: 'purple' };
```

### Avatar Pattern
All `Avatar` components use the user's initials (e.g. `FR` for Faisal Rahman) from `profile.initials`. Size is `32px` in compact lists, `44px` in profile/switch-profile cards.

---

## 9. Brand Voice & Writing Style

### Tone
The NCEF portal is a **Malaysian government regulatory system**. The voice is:
- **Official but approachable** — formal enough for a compliance context; not bureaucratic to the point of being cold
- **Bilingual aware** — the primary tagline and welcome messages use Malay; all labels and UI strings use English
- **Precise** — use exact regulatory terminology (SDoC, RCN, OIC, Scheme A/B/C) consistently; never paraphrase

### Key Bilingual Strings
| Context | English | Malay |
|---|---|---|
| Login welcome | — | *Selamat datang ke Portal NCEF* |
| Dashboard greeting | *Welcome, [First Name]* | *Selamat datang, [First Name]* |
| Portal name | NCEF Portal | Portal NCEF |
| Authority | Malaysian Communications and Multimedia Commission | Suruhanjaya Komunikasi dan Multimedia Malaysia |
| Copyright footer | © 2026 Malaysian Communications and Multimedia Commission · Suruhanjaya Komunikasi dan Multimedia Malaysia | — |

### UI Copy Conventions

| Element | Convention | Example |
|---|---|---|
| **Page titles** | Title case | `Review Queue`, `All Applications`, `Supplier Management` |
| **Breadcrumb / section labels** | ALL CAPS, muted, 12px | `OFFICER · CPPG`, `Supplier Dashboard · S-260001` |
| **Button labels** | Sentence case, verb-first | `Add supplier`, `Bulk import`, `Sign in`, `Switch profile` |
| **Table column headers** | ALL CAPS, short | `APP ID`, `AI SCORE`, `SLA`, `STATUS` |
| **Empty states** | Full sentence, period | `No audit events match the current filters.` |
| **Error / restricted messages** | Direct, no blame, offer next action | `This action is reserved for supplier-tier users. Use Switch Profile to demo the supplier flow.` |
| **Confirmation modals** | Lead with consequence, not action | `Remove this consultant?` not `Do you want to remove?` |
| **Success states** | Past tense | `Application submitted`, `Payment confirmed` |
| **Placeholder text** | Lowercase, descriptive | `Search actor, event, application ID, detail…` |
| **Tooltips** | Fragment, no period | `Download template` |

### Terminology

Always use these exact terms. Never substitute synonyms.

| Correct term | Do not use |
|---|---|
| **SDoC** | Declaration, registration form |
| **RCN** | Certificate number, reg number |
| **Scheme A / B / C** | High / Medium / Low risk (in labels; OK in body copy) |
| **Special Approval** | Special permit |
| **OIC** | Reviewing officer, handler |
| **Iteration** | Resubmission, correction, revision |
| **Not Accepted** | Rejected (in formal decision labels) |
| **Accept** | Approve (in officer action labels) |
| **Notice for Payment** | Invoice, payment request |
| **MCMC Pay** | Payment gateway (in user-facing copy) |
| **Certificate of Acceptance (CoA)** | Import permit |
| **Registration Certification Number** | Certificate ID |

---

## 10. Interaction Patterns

### Navigation
- Active screen driven by a single `screen` state string (e.g. `'officer-queue'`, `'sdoc-wizard'`)
- All nav items in `Menu` use the screen key as their `key`; click sets `screen`
- No URL routing — all navigation is in-memory state
- Role-aware navs: `NAV_SUPPLIER`, `NAV_TEAM_LEAD`, `NAV_OFFICER` arrays control visible items per role
- Restricted screens render a `Result status="403"` with a "Back" button — they do **not** redirect silently

### Forms
- All forms use `Form layout="vertical"` with `size="large"` inputs
- Multi-step flows use the `.wizard-pill-bar` (or antd `Steps`) at the top; step state is local to the screen component
- Validation is inline; `Form.Item` error messages appear below the field
- Submit triggers a loading state on the primary button; mock delay is ~700ms via `setTimeout`
- On success, navigate away or show an antd `Result` / `message.success()`

### Modals & Drawers
- Confirmation modals (`width={480}`): title states the consequence, body provides context, footer has a destructive primary + cancel
- Form modals (`width={560}`): contain a full `Form`; primary button text is the action verb (`Add`, `Save`, `Assign`)
- MINA chatbot drawer: `width={400}`, right placement, closable; messages alternate user (primary bg, white text) and assistant (subtle bg)

### Tables
- Filter bar above the card using `Input` + `Segmented` + `Select`; all in an `antd.Card bordered` wrapper with `marginBottom: 16`
- Table inside a second `antd.Card bordered` with `bodyStyle={{ padding: 0 }}`
- Actions column uses `Space size="small"` with icon-only `Button` components and `Tooltip` wrappers
- Row click for detail expansion uses inline `background: var(--color-primary-soft)` on the expanded row

### Loading States
- Async actions: primary `Button` gets `loading={true}` prop
- Page-level loads: antd `Spin` centred in the content area
- AI score calculation: animated `ReloadOutlined` with CSS `spin` keyframe

### AI Score Display
Three visual variants used depending on context:
1. **Compact** (table cell): `Tag` with `green` / `orange` / `red` colour; bold weight
2. **Inline card** (`AiScoreCard` in `shared.jsx`): SVG gauge + verdict text + expandable criteria list
3. **Full-page** (officer review): 56px display number, coloured gradient progress bar with 70% and 90% tick marks

Colour mapping (consistent everywhere):
- Score ≥ 90 → `--color-success` / `green`
- Score 70–89 → `--color-warning` / `orange`
- Score < 70 → `--color-danger` / `red`

### Status Transitions (visual)
When an application status changes, the `.status-pill` class changes — no animation needed; the new colour communicates the change. Audit trail always appended at bottom of activity log.

### Accessibility Notes
- Colour is never the **only** differentiator — status pills always include a dot indicator and text label
- All interactive elements are keyboard-accessible via antd's built-in focus management
- `alt` text provided on the MCMC logo (`alt="MCMC"`)
- Scrollbars are styled but remain functional with standard 8px width
- Font smoothing (`-webkit-font-smoothing: antialiased`) applied globally for sharper rendering on retina displays

---

## Quick Reference Card

```
Primary blue:    #0B4F91   --color-primary
Success green:   #1B7F48   --color-success
Warning amber:   #B87200   --color-warning
Danger red:      #C62828   --color-danger
Info blue:       #0F6ABF   --color-info
Purple (TL):     #7B3FA0

Page bg:         #F5F8FB   --color-bg-base
Card bg:         #FFFFFF   --color-bg-elevated
Subtle bg:       #EDF2F7   --color-bg-subtle
Border:          #D3DEE8   --color-border
Divider:         #E2E8F0   --color-divider

Text primary:    #1B2833   --color-text-primary
Text secondary:  #4A5B6B   --color-text-secondary
Text muted:      #6B7A89   --color-text-muted

Font body:       Inter (400/500/600/700)
Font mono:       JetBrains Mono (400/500)

Radius:          4 / 8 / 12 / 16px  (sm/md/lg/xl)
Elevation:       0 1px 2px / 0 2px 8px / 0 6px 20px  (1/2/3)
Sidebar:         240px expanded · 72px collapsed
Header:          56px tall
```
