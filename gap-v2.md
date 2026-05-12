# NCEF Portal — Gap Analysis v2.0

**Date:** 2026-05-12  
**Scope:** Prototype at `NCEF-Portal-Bundle.html` vs URS v1.7 (30 March 2026)  
**Reference:** Prior gap analysis (`gap.md`, 2026-04-27) used as baseline; this document supersedes it.  
**Legend:** ✅ Implemented · ⚠️ Partial · ❌ Not built · 🚫 Out of scope for prototype

---

## 1. Executive Summary

Overall prototype coverage is approximately **72–75% of URS functional scope** (excluding mobile apps and data migration, which are explicitly out of prototype scope). All 19 web-deliverable modules have at least a skeleton screen; eleven are fully implemented. The most significant remaining gaps fall into three clusters:

**Cluster 1 — Authentication infrastructure:** Real Keycloak SSO, OTP delivery, and 2FA enrollment are all mock. Every login in the prototype is a client-side `sessionStorage` flag. This is not a prototype deficiency per se, but must be called out clearly because the URS treats 2FA as mandatory for external users (§4.1.4) and SSO as mandatory for internal users (§4.1.5).

**Cluster 2 — Payment and integrations:** All five external integration points (MCMC Pay, SSM BizConnect, SIRIM eComM, RMCD MyOGA, MCMC SIFS) are mocked UI-only. No real webhook, callback, or ESB adapter exists. The full payment flow (notice → redirect → callback → status update) is represented visually but never executes.

**Cluster 3 — Applicant-side iteration for Special Approval:** The `iteration-reply` screen is implemented for SDoC (§4.2), but the equivalent supplier-side resubmission path for Special Approval (§4.3) is absent. When a Special Approval application is returned for modification, the applicant has no route back.

---

## 2. Per-Module Gap Table

### §4.1 — User Management Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.1.1 | User classification — 5 internal roles (SysAdmin, OIC, Recommender P5/P6, Verifier P7, Approver P8) + Content Manager; 4 external categories (A/B/C/D) | ✅ | All 7 roles in `NAV_BY_ROLE`; all 4 applicant categories in `onboarding` wizard |
| §4.1.2 | Supplier registration — two-layer process; AI confidence score >90% auto-accept; waiver code/link at registration; configurable iteration period | ⚠️ | Wizard fully modelled in `onboarding`. **Missing:** (a) real email verification delivery; (b) security Q&A capture omitted from Layer 1 (URS explicitly requires it); (c) MCMC officer manual acceptance step for registrations scoring <90% has no officer-side UI |
| §4.1.3 | Principal registration — link/remove principals; Letter of Undertaking + Letter of Authorisation uploads; consultant selection from pre-registered list; auto-notification on appointment | ✅ | `consultants` screen and `profile` org tab cover this |
| §4.1.4 | External user 2FA/OTP login — email → OTP → login; password set for subsequent logins | ⚠️ | Login screen renders; wrong-credential lock after 3 attempts implemented. **Missing:** actual OTP email delivery; no real token issuance |
| §4.1.5 | Internal SSO via Azure Active Directory (Keycloak federation) | ❌ | No Keycloak config, no AAD federation, no real token exchange. Internal users use same mock login as external |
| §4.1.6 | User profile management — view/update contact details | ✅ | `profile` screen has 6 tabs (Personal, Organisation, Team, Security, Notifications, API Keys) |
| §4.1.7 | User Access Matrix | ✅ | Defined in UpdatedSpec Appendix A; RBAC guards implemented (RestrictedScreen 403 component) |
| §4.1.8 | Account activation (post-email verify + MCMC accept); deactivation by SysAdmin; auto-deactivation on inactivity | ⚠️ | Grace period banner on dashboard; `account-renewal` screen implemented. **Missing:** SysAdmin deactivation UI; auto-deactivation trigger logic |

---

### §4.2 — Equipment Registration Module (SDoC)

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.2.1 | Scheme A — high-risk; OIC review; RCN issuance; iteration path; reclassification | ✅ | `sdoc-wizard` (7 steps); `officer-review` split-panel; `officer-review-list` |
| §4.2.2 | Scheme B — medium-risk; AI-assisted; reclassification to A or C | ✅ | Same wizard; scheme selected at Step 1; AI score displayed |
| §4.2.3 | Scheme C — low-risk; AI auto-accept ≥90%; 70–89% priority queue; <70% manual | ⚠️ | Score display fully implemented. **Missing:** actual routing bypass — score ≥90 shows "eligible for auto-accept" label but officer review step is never skipped |
| §4.2.4 | SDoC form Parts A–E: scheme, equipment type, brand, model, CA (multi-select), CoC, declaration + digital signature | ⚠️ | Parts A, C, D, E implemented. **Missing:** CA field is single-select; URS §4.2.1 explicitly requires "one CA or multiple CAs at the same time". Digital signature is a UI alert/disclaimer, not a real DSA-1997 signing integration |
| §4.2.5 | Document upload; AI ICR; 6-month document freshness rule | ⚠️ | Upload UI and freshness rule present. **Missing:** real ICR/OCR — "Extracted Fields" tab shows hardcoded mock values |
| §4.2.6 | Technical spec — test reports from accredited labs; validate lab against pre-configured whitelist | ⚠️ | Lab name field present; no backend validation against lab whitelist |
| §4.2.7 | Labelling — physical/electronic; location (product/packaging/user manual) | ✅ | Part C of `sdoc-wizard` |
| §4.2.8 | Declaration + digital signature (Digital Signature Act 1997) | ⚠️ | UI confirmation with legal text. No actual CA-issued digital signature integration |
| §4.2 (iteration) | Supplier iteration reply — receive officer feedback, upload revised docs, resubmit | ✅ | `iteration-reply` screen (3-step); accessible via "Respond to Iteration" CTA in `notifications` |

---

### §4.3 — Special Approval Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.3.1 | Low/Medium risk — purpose, usage location/period, IMEI/SN bulk upload; payment; OIC review + AI; SA Certificate | ✅ | `special-approval` wizard (6 steps); tier-specific document lists |
| §4.3.2 | High risk — Approver (P8) for final decision; Special Approval Letter | ✅ | Recommender → Approver chain modelled; `sa-letter` screen |
| §4.3.3 | Prohibited — offline meeting minutes upload by Recommender; multi-level chain (Recommender → Verifier → Approver); OIC publishes SA Letter | ⚠️ | Multi-level stepper and `sa-letter` with draft/watermark implemented. **Missing:** (a) offline meeting minutes upload is placeholder-only; (b) no actual workflow state machine enforcing role order |
| §4.3.4 | 6 purpose categories; Personal not applicable for Prohibited | ✅ | All 6 purposes in wizard; Prohibited path suppresses Personal option |
| §4.3.5 | Waiver code input in SA wizard | ✅ | Waiver code field with mock validation present in SA payment step |
| §4.3.6 | Multi-level acceptance — configurable via admin | ✅ | Admin Config → Workflow Config tab; `rec-review`, `ver-review`, `app-review` screens all present |
| §4.3 (gap) | **Supplier iteration reply for Special Approval** | ❌ | When SA is returned for modification, applicant has no resubmission screen. `iteration-reply` only handles SDoC context. Most significant remaining applicant-facing gap |
| §4.3 (gap) | SA Letter downloadable PDF | ⚠️ | "Download SA Letter" button rendered; no PDF generation |

---

### §4.4 — Renewal Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.4.1 | Account renewal — reminders; simplified AI acceptance; 1–5 yr period; payment → Active | ✅ | `account-renewal` screen (4-step); grace period banner on dashboard |
| §4.4.2 | Equipment renewal — select expiring cert; Scheme A requires updated CoC; B/C no doc update; AI compliance re-check; payment → new expiry | ✅ | `cert-renewal` screen (5-step); document reuse/re-upload logic with age tracking |
| §4.4.3 | Validity — renewal window within 6 months of expiry; max 5 years cumulative | ✅ | Rules displayed and enforced in wizard UI |

**Module status: ✅ Fully covered.**

---

### §4.5 — IMEI / Serial Number Registration Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.5.1 | IMEI registration; no-duplicate validation globally; RM 0.50/IMEI | ✅ | `imei-register` wizard; duplicate detection shown inline |
| §4.5.2 | Serial number registration; no-duplicate per supplier + RCN; RM 0.15/SN | ✅ | Same wizard; SN path |
| §4.5.3 | Bulk upload via CSV | ✅ | CSV upload with validation status badges |

**Module status: ✅ Fully covered.**

---

### §4.6 — Modification of Registration Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.6.1 | Valid RCN entry; multi-select modification type (Major/Minor/Others) | ✅ | `modification` screen (4-step wizard); multi-select implemented |
| §4.6.2 | Major → redirect to new registration; Minor/Others → officer review | ✅ | Major path redirects to `sdoc-wizard`; Minor/Others route to officer split-panel |
| §4.6.3 | Version history — who, date, nature; audit trail | ✅ | Version history drawer per certificate |

**Module status: ✅ Fully covered.**

---

### §4.7 — Importation Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.7.1 | Permit Type (A/B/C/SA); real-time RCN/SA-ref validation; IMEI/SN qty validation | ✅ | `importation` screen (6-step wizard); inline RCN validation |
| §4.7.2 | RMCD MyOGA integration | ⚠️ | RMCD redirect button present. **Missing:** real MyOGA API call via ESB |
| §4.7.3 | Trader, Consignor, Consignee, Agent, Logistics details | ✅ | All fields implemented across wizard steps 3–5 |
| §4.7.4 | CoA issued by RMCD (`CoA-MMYY-123456`) | ⚠️ | CoA status badge shown. **Missing:** real CoA PDF download; CoA data from RMCD response |

---

### §4.8 — Post-Market Surveillance (PMS) Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.8.1 | AI-proposed audit lists; risk class, compliance history, volume, random sampling, custom parameters | ✅ | `pms` screen: AI audit cards with 5-parameter risk breakdown; configurable AI weights modal |
| §4.8.2 | Sampling percentage → auto-generated product list; officer modifies/confirms | ✅ | Sampling proposals per audit; adjustment UI |
| §4.8.3 | Supplier notification — officer reviews/edits template; email + in-app delivery | ⚠️ | Notify-supplier modal with Standard/48h-urgent template implemented. **Missing:** real email dispatch |
| §4.8.4 | Audit findings — compliance checklist (Pass/Fail/N/A), observations, discrepancies | ✅ | Active audit findings checklist; non-conformance records panel |
| §4.8.5 | Immutable audit history; non-compliance feeds back to AI Risk Scoring Engine | ⚠️ | Completed audit tab present. **Missing:** real feedback loop into AI engine |

---

### §4.9 — Post Monitoring Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.9.1 | Complaint capture: supplier, brand, model, IMEI/SN, description, source | ✅ | `post-monitoring` screen: complaint intake wizard; severity triage; detail panel |
| §4.9.2 | High-severity/recurring complaints → AI auto-trigger audit or sampling | ⚠️ | Complaints link to PMS conceptually. **Missing:** automatic AI trigger on severity threshold |
| §4.9.3 | Dashboard tracking — received count, status, linked equipment/supplier | ✅ | Complaints list with investigation timeline; Knowledge Base tab |

---

### §4.10 — Compliance Status Management Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.10 | Assign/update compliance status (Active/Under Surveillance/Suspended/Cancelled); reason; complete history | ✅ | `compliance-status` screen: Suppliers + Certificates tabs; bulk select; Change Status modal; compliance timeline drawer; Enforcement Actions tab |
| §4.10 (gap) | Real propagation — Suspended supplier blocked from new SDoC; Cancelled equipment on Public Search | ⚠️ | Status change recorded in mock state. **Missing:** actual enforcement of restrictions |

---

### §4.11 — Public Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.11.1 | Public landing page — announcements, notices, regulatory updates | ✅ | `public-portal` screen: bilingual hero; announcement area |
| §4.11.2 | Equipment search — Brand, Model, IMEI/SN, Supplier ID, RCN | ✅ | Advanced Search with all 5 parameters; inline certificate detail with QR placeholder |
| §4.11.3 | Guidelines and standards repository | ✅ | Documents tab (11 documents, category filter) |
| §4.11.4 | Application process overview — step-by-step, timelines, fee structure | ✅ | How-to-Register tab (6-step guide + Scheme A/B/C comparison) |
| §4.11.5 | AI-powered chatbot on public portal | ⚠️ | MINA chatbot FAB present; 19-pair Q&A engine. **Missing:** real LLM/RAG backend |
| §4.11.6 | Searchable FAQ | ✅ | FAQ tab (8 FAQs, searchable) |
| §4.11.7 | Contact information | ✅ | Contact tab |

---

### §4.12 — Mobile Application

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.12.1–4 | Native apps (Android, iOS, Huawei Flutter); push notifications; public search | 🚫 | Explicitly out of prototype scope |

---

### §4.13 — Payment Integration Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.13.1 | MCMC Pay integration — all payments through gateway | ⚠️ | Payment step embedded in SDoC, IMEI, Renewal, SA, Modification wizards. **Missing:** real gateway redirect and callback |
| §4.13.2 | Auto-generated notice; configurable fee structure by scheme/risk/type | ⚠️ | Fee calculations displayed; `admin-config` Fee Structure tab allows inline editing. **Missing:** dynamic calculation linked to real backend values |
| §4.13.3 | Real-time payment confirmation from MCMC Pay; digital receipt | ❌ | No real callback endpoint; status updates are simulated by UI step completion |
| §4.13.4 | SIFS integration — all transactions synced | ❌ | No SIFS adapter; no reconciliation view |
| §4.13 (gap) | Refund/offset workflow — fee offset on upgrade; refund on rejection | ❌ | Policy documented informationally in UI; no workflow for applicant or officer |
| §4.13 (gap) | Standalone payments portal (not only embedded in wizards) | ⚠️ | `payments` screen shows transaction history. **Missing:** full standalone payment page |

---

### §4.14 — AI-Enabled Features

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.14.1 | AI Document Validation — ICR; completeness; consistency; compliance | ⚠️ | AI score card with 8 sub-criteria in officer review. **Missing:** real ICR pipeline; Extracted Fields tab shows hardcoded mock values |
| §4.14.2 | Risk scoring per application — equipment type, origin, history, technical specs | ⚠️ | Score displayed as gauge + bar + verdict. **Missing:** real AI microservice (Qwen2.5-VL) |
| §4.14.3 | AI decision support for Scheme A/B — recommendation to OIC | ⚠️ | Recommendation shown in officer review panel. **Missing:** live inference |
| §4.14.4 | Auto-acceptance Scheme C ≥90% threshold | ⚠️ | Threshold label shown. **Missing:** actual routing bypass of officer step |
| §4.14.5 | Fraud detection — forged documents, duplicates, suspicious patterns | ❌ | No fraud detection UI or flag mechanism |
| §4.14.6 | AI chatbot on **both** public portal **and** internal officer dashboard; embedded within SA, Supplier Registration, Scheme A, Renewal, PMS screens | ⚠️ | MINA on public portal implemented. **Missing:** (a) internal officer dashboard chatbot; (b) chatbot not embedded within individual module screens |

---

### §4.15 — Dashboard & Reporting Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.15.1 | Officer dashboard — application counts, scheme breakdown, SLA monitoring | ✅ | `officer-dashboard`, `tl-dashboard`, `rec-dashboard`, `ver-dashboard`, `app-dashboard` all implemented |
| §4.15.2 | Applicant dashboard — real-time application tracking, history, notifications | ✅ | `dashboard` screen; KPI cards; quick actions; notifications widget |
| §4.15.3 | Analytics and KPI — processing times, acceptance rates, workload distribution | ✅ | `reports` screen (Team Lead + Approver only): monthly trend chart, officer performance table |
| §4.15.4 | Application status monitoring — submission to final decision | ✅ | `application-detail` screen; status timeline visible to both roles |
| §4.15.5 | Exportable reports — xlsx/csv | ⚠️ | `reports` screen present. **Missing:** actual export; reports are display-only |

---

### §4.16 — Notification Module

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.16.1 | Email to internal — new submission, assignment, acceptance/rejection | ⚠️ | Events modelled in mock data. **Missing:** real email delivery |
| §4.16.2 | Email to external — activation, confirmation, acceptance/rejection, payment receipt, expiry reminders | ⚠️ | Same mock limitation |
| §4.16.3 | In-app notifications on dashboard | ✅ | `notifications` screen (4 tabs: All/Unread/Action Required/System); header bell dropdown; "Respond to Iteration" CTA |
| §4.16.4 | Push notifications (mobile) | 🚫 | Mobile out of scope |
| §4.16.5 | Configurable notification templates by SysAdmin | ⚠️ | `admin-config` Announcements tab allows publish/retract. **Missing:** dedicated email template management UI |

---

### §4.17 — Integration Requirements

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.17.1 | SIRIM eComM — CoA issuance validation; legacy data migration ETL | ❌ / 🚫 | Health dashboard shows SIRIM status (mock). Migration is production-only |
| §4.17.2 | RMCD MyOGA — import permit submission; real-time status | ❌ | Import permit UI complete; redirect button present but no real API call |
| §4.17.3 | MCMC Pay — all payment processing | ❌ | All payments are mock UI |
| §4.17.4 | SSM BizConnect — real-time company registration validation during onboarding | ❌ | SSM validation shown in AI score (20% weight) but no real API call during onboarding |
| §4.17.5 | MCMC SIFS — financial transaction sync | ❌ | No adapter |
| §4.17.6 | Data migration (3-phase ETL from legacy SIRIM) | 🚫 | Production go-live concern only |
| (bonus) | Integration Health Dashboard — 7 systems, latency/uptime/status | ✅ | `integrations` screen fully built; good demonstration aid |

---

### §4.18 — Configuration & Settings

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.18.1 | System parameters — app expiry (60 days), payment deadlines, notification triggers | ✅ | `admin-config` Iteration & SLA tab with period sliders |
| §4.18.2 | Workflow configuration — steps, conditions, roles per workflow | ✅ | Workflow Config tab with 4-step prohibited equipment approval chain |
| §4.18.3 | Officer grouping & assignment rules; OIC Lead designation; calendar blocking | ✅ | Admin Config manages officer groups; `profile` → Calendar tab for date blocking |
| §4.18.4 | Fee structure configuration — all fees editable by SysAdmin | ✅ | Fee Structure tab with inline editing, SST flag, Save |
| §4.18.5 | Equipment type and technical code master list management | ⚠️ | Not surfaced as a dedicated tab in `admin-config`. **Missing:** equipment master list management panel |

---

### §4.19 — General System Requirements

| URS Sub-section | Requirement Summary | Status | Gap Detail |
|---|---|---|---|
| §4.19.1 | Data validation — IMEI dedup; mandatory fields; data type validation | ✅ | IMEI deduplication in `imei-register`; form guards in all wizards |
| §4.19.2 | Immutable audit trail — all actions; user + timestamp + details | ⚠️ | `audit` screen (searchable, filterable, expandable rows). **Missing:** server-side immutable logging; current log is hardcoded mock |
| §4.19.3 | Document management — centralised repo; version control; secure retrieval | ⚠️ | Documents viewable per application. **Missing:** centralised document repository screen; version control for modified documents |
| §4.19.4 | Application lifecycle — Draft → Submission → Payment → Review → Accept/Reject → Expiry/Renewal | ✅ | Status visible throughout; `application-detail` timeline |
| §4.19.5 | Expiry and cancellation rules — 60-day lapse; payment deadline cancellation | ✅ | Lapse warning banner on dashboard |

---

### §5 — Non-Functional Requirements

| URS Section | Requirement | Status | Gap Detail |
|---|---|---|---|
| §5.1 | Performance: 3s page load; 250/500 concurrent users | 🚫 | Production architecture concern (Nginx, Kubernetes) |
| §5.2 | Security: OWASP Top 10; WAF; strong auth | ❌ | No WAF; no real JWT validation. Client-side only prototype |
| §5.3 | PDPA compliance — consent, data minimisation, right to erasure | ⚠️ | PDPA consent checkbox in onboarding. **Missing:** right-to-erasure workflow; data retention enforcement |
| §5.4–5.5 | Availability 99.44%; scalability | 🚫 | Production infrastructure concern |
| §5.6 | Usability | ✅ | Clean, consistent Ant Design 5 UI; bilingual support in public portal |
| §5.7–5.8 | AES-256 encryption; backup & recovery; DR | 🚫 | Production deployment concern |

---

## 3. High Priority Gaps (Ranked by Business Impact)

| Rank | Gap | URS Ref | Affected Screens | Business Impact |
|---|---|---|---|---|
| 1 | Real Keycloak SSO for internal users | §4.1.5 | All internal screens | Blocks all officer-side workflows in production |
| 2 | Real 2FA/OTP delivery for external users | §4.1.4 | `login` | All applicant workflows blocked in production |
| 3 | Real MCMC Pay gateway + callback | §4.13.1–3 | All 5 wizard payment steps | No payment can be collected; pipeline cannot advance past payment |
| 4 | **Supplier iteration reply for Special Approval** | §4.3 | Missing screen | SA applications returned for modification become stuck — no applicant path back |
| 5 | SSM BizConnect real-time validation during onboarding | §4.17.4 | `onboarding` | AI confidence score unreliable; auto-accept/manual routing broken without it |
| 6 | **Security Q&A capture in Supplier Onboarding (Layer 1)** | §4.1.2 | `onboarding` Step 1 | Required for forgot-password identity verification; explicitly named in URS |
| 7 | **SysAdmin account deactivation UI** | §4.1.8 | `suppliers-mgmt` | No mechanism to deactivate accounts; security and compliance risk |
| 8 | **CA multi-select in SDoC wizard** | §4.2.1, §4.2.4 | `sdoc-wizard` Step 2 | URS explicitly requires multi-CA; blocks real Scheme A submissions |
| 9 | **Scheme C auto-accept routing logic** | §4.2.3, §4.14.4 | `sdoc-wizard` → officer | Core Scheme C efficiency value not demonstrated; score ≥90 still routes to officer |
| 10 | Fraud detection flag in officer review | §4.14.5 | `officer-review` | No AI-generated fraud alert; officers reviewing suspicious applications have no system signal |

> **Items 4, 6, 7, 8, 9** are prototype-completable (no real backend needed). Items 1–3 and 5 require real infrastructure.

---

## 4. What's Built Beyond the URS

| Feature | Prototype Screen | Notes |
|---|---|---|
| Demo Account Selector on Login | `login` | 7 role cards enabling instant role-switching; prototype aid not in URS |
| Integration Health Dashboard | `integrations` | Latency, uptime %, status badges for 7 systems; monitoring UI beyond URS integration requirements |
| Officer Calendar Blocking | `profile` → Calendar tab | URS §4.18.3 mentions it under Configuration; prototype surfaces it more intuitively in each officer's Profile |
| Session Timeout Modal with 60-second countdown | Header / App level | URS §5.2 requires session timeout; countdown modal with "Stay Logged In" CTA is a UX enhancement |
| API Key Management | `profile` → API & Integrations tab | Not in URS; anticipates future M2M integration needs |
| Switch Profile Modal | Header | Allows instant in-session role switch for demo purposes |
| MyDigital ID as 2FA option | `profile` → Security tab | URS §4.1.4 only specifies OTP email; MyDigital ID is an added Malaysian national e-ID option |
| Officer Performance Table in Reports | `reports` | URS §4.15.3 mentions KPI tracking; individual officer performance tables are an extra |
| Content Manager screens | `cm-dashboard`, `cm-announcements`, `cm-faq` | URS §3.1 mentions the role briefly; full 3-screen portal is prototype-generated beyond URS scope |
| Bilingual toggle (EN/BM) | `public-portal` | URS §5.6 implies usability; full bilingual toggle is beyond explicit URS scope |

---

## 5. Recommendations — Next Sprint Priorities

### Sprint N — Prototype completions (no real backend needed)

| # | Item | URS Ref | Effort |
|---|---|---|---|
| 1 | **CA multi-select in `sdoc-wizard` Step 2** | §4.2.1 | Small — single-select → `Checkbox.Group` |
| 2 | **Security Q&A field in `onboarding` Step 1** | §4.1.2 | Small — dropdown + text field at Layer 1 |
| 3 | **Special Approval iteration reply screen** | §4.3 | Medium — extend/fork `iteration-reply` for SA context |
| 4 | **SysAdmin user deactivation in `suppliers-mgmt`** | §4.1.8 | Small — add "Deactivate" action to user management table |
| 5 | **Scheme C auto-accept routing bypass** | §4.2.3 | Medium — when AI score ≥90 on Scheme C, skip officer review, go to RCN issuance |

### Sprint N+1 — Demo-value enhancements

| # | Item | URS Ref | Effort |
|---|---|---|---|
| 6 | Internal officer dashboard MINA chatbot | §4.14.6 | Medium — embed MINA widget in officer dashboards |
| 7 | Module-level MINA embed (SA, Onboarding, Scheme A, Renewal, PMS) | §4.14.6 | Medium — FAB per screen |
| 8 | Equipment master list tab in `admin-config` | §4.18.5 | Small — add 5th tab |
| 9 | Report export (`.xlsx`/`.csv`) in `reports` | §4.15.5 | Medium — client-side SheetJS |
| 10 | Notification template management in `admin-config` | §4.16.5 | Medium — new tab for email template editing |

### Deferred to production (not prototype concerns)

- Real Keycloak SSO / AAD federation (§4.1.5)
- Real OTP email delivery (§4.1.4)
- Real MCMC Pay gateway + SIFS reconciliation (§4.13)
- Real SSM BizConnect, SIRIM eComM, RMCD MyOGA API adapters (§4.17)
- Real AI microservice (Qwen2.5-VL) for ICR and risk scoring (§4.14)
- Server-side immutable audit logging (§4.19.2)
- PDPA right-to-erasure workflow (§5.3)
- Mobile apps — Android, iOS, Huawei Flutter (§4.12)
- Data migration ETL pipeline (§4.17.6)
- Performance, backup, DR, WAF infrastructure (§5.1–5.8)

---

*Analysis based on URS v1.7 (30 March 2026) vs prototype as of 2026-05-12. Supersedes `gap.md` (2026-04-27).*
