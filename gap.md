# NCEF Portal — Gap Analysis

> **Scope:** Comparison of the current prototype (`jhamuza/Project-N`) against the definitive engineer reference (`UpdatedSpec.md`, derived from SDD v1.4 + URS v1.7).
>
> **Date:** 2026-04-27
>
> **Legend:** ✅ Now implemented · ⚠️ Partially addressed · ❌ Remaining gap · 🚫 Out of scope / not applicable

---

## 1. What the Design File Added (Previously ❌, Now ✅)

The Claude Design handoff bundle (`screens-d.jsx` through `screens-k.jsx` + updated `index.html`) implemented the following 8 modules that were previously absent:

| Spec § | Module | File | What Was Built |
|---|---|---|---|
| §5.6 | **Modification of Registration** | `screens-f.jsx` | Request list landing; version history drawer; 4-step wizard (find cert → Major/Minor/Admin → docs → review); officer review split-panel with Accept/Not Accept + justification; Major request redirect to new SDoC |
| §5.7 | **Importation Module** | `screens-g.jsx` | Import permit list with CoA status; 6-step wizard (permit type → validate RCN/SA ref → trader & consignor RMCD/JKDM details → consignee & agent → logistics & HS tariff → review); CoA explanation; detail drawer |
| §5.8 | **Post-Market Surveillance (PMS)** | `screens-h.jsx` | AI-proposed audit cards with risk breakdown (5 parameters); product sampling proposals per audit; configurable AI weights modal; notify-supplier modal (Standard/48h-urgent template); Active audit findings checklist with Pass/Fail/N/A + non-conformance records; Completed audit tab |
| §5.9 | **Post Monitoring (IntelliGenCE)** | `screens-i.jsx` | Complaints list (3-column cards, severity triage); complaint detail panel with investigation timeline and Add Update; AI Web Crawl feed (live listings, confidence %, Create Complaint / Dismiss actions); Knowledge Base tab (searchable equipment directory) |
| §5.10 | **Compliance Status Management** | `screens-j.jsx` | Suppliers tab with status-colour coding and bulk select; compliance timeline drawer per entity; Change Status modal with system-effect explanation + mandatory reason + destructive confirmation; Certificates tab with cancelled/expired highlighting; Enforcement Actions tab |
| §5.11 | **Public Search Portal** | `screens-k.jsx` | Bilingual hero + search bar; Advanced Search (Brand/Model/IMEI/SN/Supplier ID); inline certificate detail with QR placeholder and download; How-to-Register tab (6-step guide + Scheme A/B/C comparison); Documents tab (11 docs, category filter); FAQ tab (8 FAQs, searchable); Contact tab; MINA public chatbot FAB |
| §5.17 | **Integrations Health** | `screens-e.jsx` | Real-time health dashboard for 7 external systems (IBM webMethods ESB, SIRIM, RMCD MyOGA, SSM BizConnect, MCMC Pay, SIFS, AAD); latency, uptime %, status badge; integration architecture diagram; MCMC Pay shown as Degraded for realism |
| §5.18 | **Admin Configuration** | `screens-e.jsx` | Fee Structure tab (inline editing, SST flag, Save); Iteration & SLA tab (period sliders + day counters); Workflow Config tab (4-step prohibited equipment approval chain); AI Thresholds tab (Scheme C auto-accept 90%, priority review 70% — live band labels); Announcements tab (publish/retract/create) |

**Additional improvements to existing partial modules:**

| Spec § | Module | Improvement |
|---|---|---|
| §5.3 | Special Approval — SA Letter | Multi-level 4-step approval chain (OIC → Recommender → Verifier → Approver) with live progress stepper, editable MCMC letterhead preview, and Approve & Forward / Not Approve actions (`screens-d.jsx`) |
| §5.1 | User Management — Officer Roles | 3 new roles added: **Recommender (P5/P6)** · **Verifier (P7)** · **Approver (P8)** — each with dedicated nav (`NAV_RECOMMENDER`, `NAV_VERIFIER`, `NAV_APPROVER`), profile cards in Switch Profile modal, and role-specific accent colours |

---

## 2. Remaining Gaps (Still ❌ or ⚠️ after design file)

### 2.1 Out of Scope / Not Applicable

| Spec § | Gap | Reason |
|---|---|---|
| §5.12 | Mobile Application (Android / iOS / Huawei Flutter apps) | Native app development — not part of web prototype scope |
| §5.19 | Data Migration ETL pipeline | Production go-live concern only; mock data represents already-migrated records |

---

### 2.2 Authentication & User Management (§5.1)

| Gap | Priority | Notes |
|---|---|---|
| Real Keycloak SSO | High | Demo login only; no token/session issuance. All auth is `sessionStorage` flag. |
| 2FA enrollment flow | High | Profile > Security tab lists methods (Authenticator / SMS / MyDigital ID) but no actual enrollment, QR code scan, or backup-code generation UI |
| Forgot-password / Reset-password | Medium | No reset flow exists; relevant for URS §5.1.4 |
| Security Q&A during onboarding | Medium | URS §5.1.3 requires security questions at registration (Step 1 of onboarding wizard); currently absent |
| Email verification delivery | Low | Onboarding Step 2 shows "Check your email" UI; no actual email is sent |
| Profile for new officer roles in `mock.js` | Low | `MOCK.profiles` has only `supplier`, `team-lead`, `officer`; need to add `recommender`, `verifier`, `approver` entries so Switch Profile shows all 6 cards |

> **Action (profiles fix):** Add to `data/mock.js` — see §4 of this document for the exact data.

---

### 2.3 Equipment Registration / SDoC (§5.2)

| Gap | Priority | Notes |
|---|---|---|
| **Iteration reply flow (supplier side)** | High | Officer can issue an iteration request; supplier currently has no screen to receive the request, view officer feedback, upload revised documents, and resubmit. Applications in `iteration_required` status lack a "Respond to Iteration" CTA. |
| CA multi-select dropdown | Medium | URS §5.2 requires selecting multiple Certifying Agencies (CA) during SDoC submission; wizard Step 2 (product details) has a single CA field |
| Reclassification request from Prohibited | Medium | URS §5.3.7 allows supplier to apply for reclassification out of Prohibited category; no modal or flow exists |

---

### 2.4 Special Approval (§5.3)

| Gap | Priority | Notes |
|---|---|---|
| Waiver code redemption | Medium | URS §5.3.5 — system must accept a waiver code to bypass the standard SA fee; no input field in the SA wizard |
| SA Letter downloadable PDF | Low | Letter preview exists; Download button present but no actual PDF generation |

---

### 2.5 Payment Integration (§5.13)

| Gap | Priority | Notes |
|---|---|---|
| Real MCMC Pay / SIFS gateway | High | All payments are mock UI only; no actual payment processing, redirect, or webhook |
| Standalone payment portal | Medium | URS §5.13 describes a dedicated payment page; currently payment is embedded only as a wizard step |
| Refund / offset workflow | Medium | URS §5.13.4 — fee offset against next renewal and refund-on-rejection policy have no UI |
| SIFS reconciliation view | Low | Admin-facing payment reconciliation is not represented |

---

### 2.6 AI-Enabled Features (§5.14)

| Gap | Priority | Notes |
|---|---|---|
| Real Qwen2.5-VL API call | High | Score display is fully mocked; no actual AI microservice call |
| Auto-accept routing | High | Score ≥90 shows "eligible for auto-accept" in UI but the officer review step is not actually skipped for any application |
| OCR extraction display | Medium | Active Review shows "Extracted Fields" tab but values are hardcoded mock, not OCR results |
| MINA real LLM backend | Low | Chatbot responses are keyword-matched mock strings; no actual LLM API |

---

### 2.7 Notification Module (§5.16)

| Gap | Priority | Notes |
|---|---|---|
| Dedicated Notifications Centre screen | Medium | URS §5.16 requires a standalone notification inbox; currently only a preferences matrix (Profile > Notifications tab) and a dashboard widget exist |
| In-app notification bell / dropdown | Medium | Header bell icon is a static badge (count = 3); no dropdown showing notification items |
| Real email / SMS / push delivery | High | All notification delivery is mock; no backend triggered by application state changes |

---

### 2.8 Real Infrastructure & Integrations (§5.17, §5.20)

| Gap | Priority | Notes |
|---|---|---|
| Real ESB adapters (SSM BizConnect, SIRIM, RMCD, MCMC Pay, AAD) | High | Integration Health screen shows mock status; no real API adapter calls |
| Server-side audit logging | High | Audit Log screen shows hardcoded mock entries; no real immutable server-side log |
| PDPA consent & data-minimisation controls | High | Consent modal during onboarding, data retention settings, and right-to-erasure workflow are absent |
| Session management | Medium | No real session timeout, concurrent session limit, or forced re-auth after inactivity |
| API rate limiting / WAF | Low | Prototype has no middleware layer; relevant for production deployment only |

---

### 2.9 Minor UX Gaps

| Gap | Priority | Notes |
|---|---|---|
| Real PDF / image viewer in Active Review | Medium | Document viewer tab shows "Preview placeholder — PDF/image viewer would render here" |
| CoA PDF generation and download | Low | CoA issued status shows a "Download CoA" button; no actual PDF is generated |
| API key generation (Profile > API & Integrations) | Low | Copy/revoke UI exists; no real key generation or HMAC signing |
| `special-approval` iteration route for supplier | Medium | When SA application is returned for more info, supplier has no resubmission screen |

---

## 3. Updated Module Status (Post Design-File Implementation)

| Spec § | Module | Status | Change |
|---|---|---|---|
| §5.1 | User Management | ⚠️ Partial | Roles added; Keycloak / 2FA / reset still mock |
| §5.2 | Equipment Registration (SDoC) | ⚠️ Partial | Core flow done; iteration reply + CA multi-select missing |
| §5.3 | Special Approval | ⚠️ Partial | SA Letter chain added; waiver code + reclassification missing |
| §5.4 | Renewal | ✅ Done | No remaining gaps |
| §5.5 | IMEI / SN Registration | ✅ Done | No remaining gaps |
| §5.6 | Modification of Registration | ✅ Done | Full rebuild in screens-f.jsx |
| §5.7 | Importation Module | ✅ Done | Full rebuild in screens-g.jsx |
| §5.8 | Post-Market Surveillance | ✅ Done | Full rebuild in screens-h.jsx |
| §5.9 | Post Monitoring / IntelliGenCE | ✅ Done | Full rebuild in screens-i.jsx |
| §5.10 | Compliance Status Management | ✅ Done | Full rebuild in screens-j.jsx |
| §5.11 | Public Search Portal | ✅ Done | Full rebuild in screens-k.jsx |
| §5.12 | Mobile Application | 🚫 Out of scope | — |
| §5.13 | Payment Integration | ⚠️ Partial | UI only; real gateway missing |
| §5.14 | AI-Enabled Features | ⚠️ Partial | Display done; real AI service missing |
| §5.15 | Dashboard & Reporting | ✅ Done | No remaining gaps |
| §5.16 | Notification Module | ⚠️ Partial | Preferences UI done; notification centre + delivery missing |
| §5.17 | Integration Requirements | ⚠️ Partial | Health dashboard added; real adapters still mock |
| §5.18 | Configuration & Settings | ✅ Done | Admin Config screen fully built in screens-e.jsx |
| §5.19 | Data Migration Strategy | 🚫 Not applicable | — |
| §5.20 | General System Requirements | ⚠️ Partial | Audit log + guards done; real logging / PDPA / session mgmt missing |

---

## 4. Data Fix — Add Missing Profiles to `mock.js`

The `MOCK.profiles` object needs three additional entries so `SwitchProfileModal` renders all 6 role cards. Add inside the `profiles: { ... }` block:

```javascript
recommender: {
  id: 'OFF-004',
  role: 'recommender',
  name: 'En. Ahmad Rashid Kamarudin',
  title: 'Recommender (P5/P6)',
  initials: 'AR',
  email: 'ahmad.rashid@mcmc.gov.my',
  team: 'CPPG-SA-01',
},
verifier: {
  id: 'OFF-005',
  role: 'verifier',
  name: 'Pn. Halimah Yusof',
  title: 'Verifier (P7)',
  initials: 'HY',
  email: 'halimah.yusof@mcmc.gov.my',
  team: 'CPPG-SA-01',
},
approver: {
  id: 'OFF-006',
  role: 'approver',
  name: "Dato' Dr. Razif Ahmad Zaki",
  title: 'Approver (P8)',
  initials: 'RZ',
  email: 'razif.zaki@mcmc.gov.my',
  team: 'CPPG-SA-01',
},
```

---

## 5. Recommended Next Build Priorities

| # | Item | Spec § | Effort |
|---|---|---|---|
| 1 | Iteration reply screen for supplier (receive iteration → revise docs → resubmit) | §5.2 | Medium |
| 2 | Dedicated Notifications Centre screen (inbox with read/unread) | §5.16 | Small |
| 3 | In-app notification bell dropdown in header | §5.16 | Small |
| 4 | 2FA enrollment flow (Profile > Security) | §5.1 | Medium |
| 5 | Waiver code input in SA wizard | §5.3 | Small |
| 6 | CA multi-select in SDoC wizard | §5.2 | Small |
| 7 | Forgot-password screen | §5.1 | Small |
| 8 | Security Q&A step in Supplier Onboarding | §5.1 | Small |
| 9 | Standalone Payments portal (not embedded in wizard) | §5.13 | Medium |
| 10 | Refund / fee-offset UI in Payments | §5.13 | Small |
