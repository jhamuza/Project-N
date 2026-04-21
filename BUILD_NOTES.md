# NCEF Portal — Build Notes

## What's in this iteration

A high-fidelity, interactive prototype of the NCEF portal for both **Suppliers** (external applicants) and **CPPG Officers** (MCMC reviewers), grounded in the attached specification (v2 + Merged) and the existing `InfominaAi/MCMC-NCEF` frontend design tokens.

**Open `NCEF Portal.html`** to explore.

### Screens built
| # | Screen | Notes |
|---|---|---|
| 1 | **Supplier Dashboard** | KPIs, recent applications, quick actions, notifications |
| 2 | **Applications list** | Segmented status filter, AI score column, scheme badges |
| 3 | **Supplier Onboarding** | 6-step flow: Account → Email verify → Category (A/B/C/D) → Details (SSM auto-fill) → AI validation → Confirmation |
| 4 | **SDoC Wizard** | 7 steps with **Scheme picker** (A/B/C), product + tech params, documents, **live AI scoring**, review, payment (FPX / card / DuitNow / invoice), confirmation |
| 5 | **Special Approval Wizard** | Purpose selector with **prohibited-equipment branch** triggering the multi-level approval disclosure (Officer → Head of Certification → Director General MCMC) |
| 6 | **Officer Review (split view)** | Document viewer + extracted fields + audit trail on the left; AI Score card + applicant profile + decision panel (Approve / Iterate / Reject) + SLA timer on the right |
| 7 | **Officer Queue** | KPIs, assigned-to-me vs all-queues, AI score + SLA chips, click-through to review |

### Tweaks (toolbar → Tweaks)
- **Role**: Supplier ↔ Officer (swaps navigation + landing)
- **AI Score visualisation**: Gauge · Bar · Verdict
- **Wizard pattern**: Horizontal Steps · Vertical sidebar · Pill bar
- **Compact density**

State is persisted — `ncef.screen` in localStorage, tweaks in the `EDITMODE` JSON block.

## Design system
- **Primary** `#0B4F91` (MCMC navy), **Accent** `#C62828`, status colours for success/warning/danger/info — all lifted from the `frontend/src/styles/design-tokens.css` in the reference repo.
- **Typography**: Inter (UI) + JetBrains Mono (IDs, codes). 8px radius base, 12/16px for cards.
- **Status pills** match the spec's lifecycle: Draft · Under Review · Iteration · Approved · Rejected · Expired · Priority.
- **Scheme badges** for A (red), B (amber), C (green), SA (purple).
- Status + AI score semantics mirror the spec's 70 (priority) and 90 (auto-accept) thresholds.

## Interactions worth trying
1. Start on **Dashboard** — click a KPI card to drill into applications.
2. **New SDoC** → move through steps; the AI validation step simulates a 2.4s Qwen2.5-VL run then shows reasoning. Switch the AI visualisation via Tweaks.
3. **Special Approval** → pick "Prohibited Equipment (R&D only)" to unfurl the multi-level approval disclosure + MOSTI sponsorship requirement.
4. Tweak **Role → Officer**, then open **Active Review**. Try each decision (Approve / Iterate / Reject) — the right panel swaps contextual forms.
5. Tap the **MINA** floating button for a scripted assistant drawer.

## Intentionally out of scope
- Certificates viewer, Payments history, Reports/Analytics and Audit Log are stubbed (`<Empty>`) — flag which to expand next.
- Real backend/API calls. All data is in `data/mock.js`.
- Full responsive mobile layout — tablet+ only for now.

## File layout
```
NCEF Portal.html         — shell, sidebar, topbar, MINA, tweaks panel
styles/tokens.css        — design tokens + component styles
data/mock.js             — realistic Malaysian sample data
components/shared.jsx    — StatusPill, SchemeBadge, AiScoreCard (3 viz variants)
components/screens-a.jsx — Dashboard, Applications, Onboarding
components/screens-b.jsx — SDoC Wizard, Special Approval, Officer Review
```

## Next suggested steps
1. Expand Certificates screen (QR/search + renewal flow).
2. Build Payments + invoice reconciliation.
3. Add the IMEI/SN registration sub-flow referenced in the spec.
4. Officer-facing reports dashboard (SLA compliance, AI override rate).
5. Mobile viewport pass (sub-768px).
