# NCEF System — Updated Software Specification

> **Sources:**  
> - *Software Design Document (SDD) v1.4*, Infomina Berhad, 10 March 2026  
> - *User Requirements Specification (URS) v1.7*, Infomina Berhad, 30 March 2026  
>
> This is the **authoritative engineer reference** synthesizing both documents. Where SDD and URS conflict, URS v1.7 takes precedence as the later document.

---

## Table of Contents

1. [Introduction & Project Overview](#1-introduction--project-overview)
2. [System Overview](#2-system-overview)
3. [System Architecture](#3-system-architecture)
4. [Data Design](#4-data-design)
5. [Component Design (Modules)](#5-component-design-modules)
   - [5.1 User Management](#51-user-management-module)
   - [5.2 Equipment Registration (SDoC)](#52-equipment-registration-module-sdoc)
   - [5.3 Special Approval](#53-special-approval-module)
   - [5.4 Renewal](#54-renewal-module)
   - [5.5 IMEI/Serial Number Registration](#55-imei--serial-number-registration-module)
   - [5.6 Modification of Registration](#56-modification-of-registration-module)
   - [5.7 Importation](#57-importation-module)
   - [5.8 Post-Market Surveillance (PMS)](#58-post-market-surveillance-pms-module)
   - [5.9 Post Monitoring (Complaints & Intelligence)](#59-post-monitoring-module)
   - [5.10 Compliance Status Management](#510-compliance-status-management-module)
   - [5.11 Public Module](#511-public-module)
   - [5.12 Mobile Application](#512-mobile-application)
   - [5.13 Payment Integration](#513-payment-integration-module)
   - [5.14 AI-Enabled Features](#514-ai-enabled-features)
   - [5.15 Dashboard & Reporting](#515-dashboard--reporting-module)
   - [5.16 Notification](#516-notification-module)
   - [5.17 Integration Requirements](#517-integration-requirements)
   - [5.18 Configuration & Settings](#518-configuration--settings)
   - [5.19 Data Migration Strategy](#519-data-migration-strategy)
   - [5.20 General System Requirements](#520-general-system-requirements)
6. [Human Interface Design](#6-human-interface-design)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Requirements Traceability Matrix](#8-requirements-traceability-matrix)
9. [Appendices](#9-appendices)
   - [A: User Access Matrix](#appendix-a-user-access-matrix)
   - [B: Fee Structure](#appendix-b-fee-structure)
   - [C: AI Scoring Mechanism](#appendix-c-ai-scoring-mechanism)
10. [Glossary](#10-glossary)
11. [Prototype Mapping](#11-prototype-mapping)
12. [User Engagement Findings & Initiatives](#12-user-engagement-findings--initiatives)
13. [URS Benchmark — Prototype Coverage Assessment](#13-urs-benchmark--prototype-coverage-assessment-06-may-2026)

---

## 1. Introduction & Project Overview

### 1.1 Project Name
Development and Implementation of the Online Registration System for MCMC New Communications Equipment Framework (NCEF).

### 1.2 Project Owner
Technology and Standards Division, Malaysian Communications and Multimedia Commission (MCMC).

### 1.3 Objective
Develop a comprehensive, centralized, user-friendly online system to manage the end-to-end registration and monitoring of communications equipment under the NCEF. Aims to streamline operations, enhance regulatory oversight, and improve service delivery through a secure, efficient, AI-driven digital platform.

### 1.4 Background
The NCEF is a new regulatory framework by MCMC to modernize communications equipment registration in Malaysia, replacing legacy SIRIM-managed systems and manual workflows. Aligned with national digital transformation objectives.

### 1.5 Project Timeline & Milestones
- **Commenced:** 12 January 2026
- **Target Pilot Launch:** 9 November 2026
- **Post-deployment Support:** 36-month maintenance period
- **Phases:** Requirement study → System design → Development → Testing → Data migration → Pilot → Full deployment

### 1.6 Stakeholders

**Internal Stakeholders:**
- Technology and Standards Division, MCMC — Project Owner
- Standards Management Department, MCMC — Key user department
- MCMC Officers — Processing roles: Recommender, Verifier, Approver, OIC
- System Administrator — System maintenance and user management
- Content Manager — Manages content on the Public Search Portal

**External Stakeholders & Integration Partners:**
- Applicants: Suppliers, Individuals, Institutions, Consultants
- SIRIM QAS International — Historical data migration + CoA issuance validation
- Royal Malaysian Customs Department (RMCD) — Import permit integration (MyOGA System)
- MCMC Pay — Payment gateway provider
- SSM Search — Company registration validation
- MCMC SIFS — Financial system consolidation

### 1.7 References

| ID | Document | Version | Date |
|---|---|---|---|
| 1 | NCEF User Requirement Specification (URS) | **1.7** | 30 March 2026 |
| 2 | NCEF Software Design Document (SDD) | 1.4 | 10 March 2026 |
| 3 | NCEF Revised VM Server Request | — | Feb 16, 2026 |

---

## 2. System Overview

The NCEF Online Registration System is a **web-based platform** managing the entire lifecycle of communications equipment registration in Malaysia — the single digital interface between MCMC, equipment suppliers, consultants, and the public.

### Portal Types

| Portal | Users | Purpose |
|---|---|---|
| **Internal Portal** | MCMC officers (System Admin, OIC, Recommender, Verifier, Approver, Content Manager) | Application management, back-office functions, dashboards |
| **External Portal** | Applicants (Suppliers, Principals, Consultants) | Self-service registration, submission, tracking, payments |
| **Public Portal** | General public (unauthenticated) | Equipment search/verification, regulatory documents, chatbot |
| **Mobile Apps** | General public + authenticated users | Public search, push notifications (Android / iOS / Huawei — three separate native apps) |

### Registration Schemes

| Scheme | Risk Level | Processing |
|---|---|---|
| **Scheme A** | High Risk — SDoC with Certification | Full manual MCMC review + AI support |
| **Scheme B** | Medium Risk — SDoC with Verification | AI-assisted OIC review; reclassification possible |
| **Scheme C** | Low Risk — AI Auto-Acceptance | Auto-accepted if AI confidence ≥ 90%; else manual |

> **Reclassification** is applicable across **all schemes** — OIC can reclassify any submission up or down, requiring the applicant to submit updated information.

---

## 3. System Architecture

### 3.1 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Presentation (Web) | **ReactJS** | Interactive, responsive, bilingual UI |
| Presentation (Mobile) | **Flutter** | Three separate native apps (Android, iOS, Huawei) |
| Application | **Java Spring Boot** | Core backend business logic and microservices |
| Identity & Access | **Keycloak** | RBAC, 2FA/MFA, SSO, user federation with AAD |
| Web & Proxy | **Nginx** | Web server, reverse proxy, load balancer, WAF |
| Database (Structured) | **PostgreSQL** | User records, applications, transaction logs |
| Object Storage | **MinIO** | S3-compatible storage for documents (PDFs, images, reports) |
| Vector Database | **Milvus** | Vector embeddings for AI similarity search and chatbot RAG |
| AI Backend | **Python FastAPI** | AI service APIs |
| LLM Orchestration | **LangChain / LangGraph** | LLM workflow orchestration, intelligent agents |
| LLM Inference | **vLLM / NVIDIA NIM** | High-throughput LLM serving |
| API Gateway | **Apache APISIX** | Traffic control, security policy, API observability |
| Integration Hub (ESB) | **IBM webMethods** | ESB for SIRIM, RMCD, SSM, MCMC Pay, MCMC SIFS |
| Containerization | **Docker** | Application containers |
| Orchestration | **Rancher (Kubernetes)** | Container lifecycle management, scaling |

### 3.2 Deployment Architecture

- Three environments: **Development**, **UAT/Staging**, **Production**
- Infrastructure: Virtual machines running **Ubuntu 24.04.1 LTS**
- Production: High availability — active-active for Load Balancer, Proxy, App Servers, API Gateway; active-passive for PostgreSQL

### 3.3 Logical Architecture

```
[Client Layer]          ReactJS Web App | Flutter Mobile Apps (Android/iOS/Huawei)
      ↓
[API Gateway]           Apache APISIX (traffic, security, observability)
      ↓
[Application Layer]     Spring Boot Microservices
      ↓
[AI Service Layer]      Python FastAPI + LangChain/LangGraph + vLLM/NVIDIA NIM
      ↓
[Data Layer]            PostgreSQL | MinIO | Milvus
      ↓
[Integration Layer]     IBM webMethods ESB ↔ SIRIM / RMCD / SSM / MCMC Pay / SIFS
```

### 3.4 Integration Architecture

IBM webMethods ESB is the central integration hub for all external/internal system communication.

| Integration Point | Direction | Purpose |
|---|---|---|
| **SIRIM eComM** | Bidirectional | CoA issuance validation; historical data migration (3-phase ETL) |
| **RMCD MyOGA System** | Outbound | Import permit applications; payment redirect to RMCD |
| **SSM Search** | Outbound | Real-time company registration validation during onboarding |
| **MCMC Pay** | Bidirectional | Payment processing; callback confirmation |
| **MCMC SIFS** | Outbound | Financial transaction sync for reporting/reconciliation |
| **Azure Active Directory (AAD)** | Inbound | SSO for internal MCMC users via Keycloak federation |

---

## 4. Data Design

### 4.1 Data Model Overview

Primary database: **PostgreSQL** (structured data). Unstructured documents: **MinIO**. Vector data for AI: **Milvus**.

### 4.2 Data Dictionary

| Entity | Description | Key Attributes |
|---|---|---|
| **Users** | Any individual with system access (internal MCMC or external applicant) | `id`, `full_name`, `email`, `phone_number`, `password_hash`, `company_id` (FK), `security_question`, `security_answer_hash` |
| **Companies** | Registered entity submitting applications (Company/Individual/Institution/Consultant) | `id`, `name`, `registration_number`, `category` (`A`/`B`/`C`/`D`), `status`, `registration_id` (formatted ID) |
| **Applications** | Central entity for any submission (SDoC, Special Approval, Renewal, etc.) | `id`, `application_number`, `type`, `scheme`, `status`, `applicant_id` (FK), `equipment_id` (FK), `details` (JSONB) |
| **Equipment** | A specific communications equipment model being registered | `id`, `brand`, `model`, `technical_code`, `specifications` (JSONB) |
| **Certificates** | Issued RCN certificate for registered equipment | `id`, `rcn`, `application_id` (FK), `issue_date`, `expiry_date`, `compliance_status` |
| **Payments** | Financial transaction record | `id`, `transaction_id`, `amount`, `status`, `application_id` (FK) |
| **Documents** | File uploaded as part of an application | `id`, `name`, `path` (MinIO key), `application_id` (FK), `issued_date` |
| **IMEI_Serial_Numbers** | Unique device identifiers | `id`, `value`, `type`, `equipment_id` (FK) |
| **Audits** | PMS audit lifecycle records | `id`, linked to COMPANIES + EQUIPMENT |
| **Complaints** | Market intelligence / public complaints | `id`, severity, linked to EQUIPMENT + COMPANIES |
| **Compliance_Status_History** | Immutable log of all compliance status changes | `id`, `entity_type`, `entity_id`, `status`, `reason`, `officer_id`, `changed_at` |
| **Waivers** | Waiver/discount codes issued by System Admin or Officers | `id`, `code`, `type` (`discount`/`waiver`), `issued_by`, `used_by`, `valid_until` |
| **Principal_Links** | Links between Supplier and Principal companies | `id`, `supplier_id` (FK), `principal_id` (FK), `letter_of_undertaking_doc_id`, `letter_of_authorisation_doc_id` |
| **Consultant_Links** | Links between Supplier and Consultant | `id`, `supplier_id` (FK), `consultant_id` (FK), `linked_at`, `unlinked_at` |

### 4.3 Registration ID Formats

| Category | Format | Example |
|---|---|---|
| Category A — Company (Commercial) | `S-YYXXXX` | `S-260001` |
| Category B — Individual (Non-Commercial) | `SNC-YYXXXX` | `SNC-260001` |
| Category C — Institution (Non-Commercial) | `SNC-YYXXXX` | `SNC-260002` |
| Category D — Consultant | `C-YYXXXX` | `C-260001` |
| Special Approval Certificate | `SA-MMYY-XXXXX` | `SA-0426-00001` |
| Certificate of Acceptance (Importation) | `CoA-MMYY-123456` | `CoA-0426-123456` |

---

## 5. Component Design (Modules)

### 5.1 User Management Module

> **PROTOTYPE STATUS: ⚠️ PARTIAL** — Login screen (with error states and account-lock after 3 failures), demo account selector (6 profiles), supplier onboarding wizard with Security Q&A and expanded PDPA consent, profile & settings with 2FA enrollment modals (TOTP/SMS/MyDigital ID), forgot-password flow (4-step), Recommender/Verifier/Approver roles with full MCMC org info (division, department, grade, phone), switch-profile modal, and Notifications Centre are all implemented. Keycloak SSO, real 2FA OTP delivery, and real session management remain mock.

#### Purpose
Foundation of NCEF security. Handles the entire lifecycle of user accounts — registration, authentication, authorization, and profile management — for all internal (MCMC) and external (Applicant) users via **Keycloak**.

#### 5.1.1 User Classification

**Internal Users (MCMC):**

| Role | Description |
|---|---|
| **System Administrator** | Full administrative access: manages system settings, user roles, fees, workflow config |
| **Officer in Charge (OIC)** | Reviews and processes applications; can be designated OIC Lead by System Admin |
| **Recommender (P5/P6)** | Reviews and provides recommendations for Prohibited equipment applications; initiates digital acceptance post-offline meeting |
| **Verifier (P7)** | Verifies application and documents before passing to next officer |
| **Approver (P8)** | Accepts/rejects applications based on officer recommendations; final decision authority |
| **Content Manager** | Manages content on the Public Search Portal (announcements, FAQs, documents) |

> System Admin can appoint an **OIC Lead** who gains ability to manually override applicant assignments, especially during OIC unavailability.

**External Users (Applicants):**

| Category | Type | Registration ID Format |
|---|---|---|
| **Category A** | Registered Company (Commercial) | `S-YYXXXX` |
| **Category B** | Individual (Non-Commercial) | `SNC-YYXXXX` |
| **Category C** | Institution — Gov body, university, organization (Non-Commercial) | `SNC-YYXXXX` |
| **Category D** | Consultant — acts on behalf of applicants | `C-YYXXXX` |

#### 5.1.2 External User Registration — Two-Layer Process

**Layer 1 — Account Creation:**
- User provides: Full Name, Email, Phone Number, Password
- User sets up a **security question and answer**
- System sends email verification link → user must click to verify email

**Layer 2 — Profile Registration:**
- User logs in with verified credentials
- Selects category (Company / Individual / Institution / Consultant)
- Submits detailed information and required documents per category (see table below)
- AI validation applies: **confidence score > 90%** → automatically accepted; **< 90%** → requires iteration or rejection (fraud/fake)

**MCMC Acceptance Workflow:**
- Submitted profiles reviewed by MCMC officers
- Accepted → account activated; Rejected → applicant notified with reason

**Waiver Workflow:**
- MCMC officers or System Admin may issue a **waiver code or registration link** to specific applicants
- Waiver entitles the applicant to a discount or full waiver of payment during registration

**Iteration Management:**
- Administrator can set a **configurable default iteration period** for any workflow (registration, scheme, special approval)
- Officers can **extend the iteration duration** whenever necessary

#### 5.1.3 Required Information by Category

| Field | Cat A: Company | Cat B: Individual | Cat C: Institution | Cat D: Consultant |
|---|---|---|---|---|
| Registration Type | ROC / ROB / Labuan FSA / Sabah Enterprise / Sarawak Enterprise | Malaysian / Non-Malaysian | N/A | ROC / ROB / Labuan FSA / Sabah Enterprise / Sarawak Enterprise |
| Identification No. | Company/Business Reg. No. | NRIC (Malaysian) or Passport No. | N/A | Company/Business Reg. No. |
| Name | Company Name | Full Name | Institution Name | Company Name |
| Address | Company Address | Residential Address | Company Address | Company Address |
| Contact | Company Tel (General Line) | Mobile No. | Company Tel (General Line) | Company Tel (General Line) |
| Nature of Business | Required | N/A | Required | Required |
| Management Rep | Name, Designation, Email, Phone | Name, Designation, Email, Phone | Name, Designation, Email, Phone | Name, Designation, Email, Phone |
| Officer in Charge | Required | N/A | Required | Required |
| Additional Contacts | Optional (multiple) | N/A | Optional (multiple) | Optional (multiple) |
| Document Upload | Business Reg. Document (Reg. No., Name, Address) | Copy of NRIC or Passport (still valid) | Letter of Authorization on official letterhead | Business Reg. Document |

> **Document validity rule:** All uploaded documents must have been issued by authorities **within 6 months of submission date**. Passports must be valid at time of submission.

#### 5.1.4 Principal Registration & Management

**Principal Selection & Registration:**
- Suppliers associate with existing Principals by selecting from a system dropdown (`[Company Name] [Principal ID]`)
- If Principal not yet registered, Supplier can opt to register them by providing company name and address

**Required Documents (mandatory):**
- Letter of Undertaking
- Letter of Authorisation
- Acknowledgment of MCMC NCEF Terms & Conditions

**Principal Removal:** Supplier initiates removal; requires system confirmation. System automatically updates Supplier's active Principal relationships upon add/remove.

#### 5.1.5 Consultant Registration & Management

**Consultant Selection:**
- Suppliers select consultant from standardized dropdown — **strictly populated by pre-registered consultants only**
- If desired consultant is missing, Supplier must direct them to register independently first

**Automated Notifications:** System automatically dispatches notification to the Consultant immediately upon being appointed by a Supplier.

**Consultant Removal:** Supplier initiates removal with confirmation. Unlinks relationship across both Supplier's and Consultant's profiles.

#### 5.1.6 Internal User Authentication (SSO)
- Internal MCMC users authenticate via **SSO** with **Azure Active Directory (AAD)**
- Keycloak acts as identity broker, federating with AAD

#### 5.1.7 External User Authentication (2FA)
1. User enters registered email address
2. System sends **OTP** to the user's email
3. User enters OTP to log in the first time; password is set for subsequent logins
- **Session timeout: 30 minutes of inactivity**
- Multi-device and multi-tab access allowed

#### 5.1.8 Role-Based Access Control (RBAC)
- Managed by **Keycloak**
- Detailed User Access Matrix defined in Appendix A
- System Admin can appoint **OIC Lead** for manual override and reassignment capabilities

#### 5.1.9 Profile Management
All users can view and update their profile information after login, including contact details and other relevant information.

#### 5.1.10 Account Activation & Deactivation
- **Activation:** After successful email verification and MCMC acceptance
- **Deactivation:** System Administrator can deactivate accounts; accounts may also auto-deactivate after prolonged inactivity
- **Grace period:** Applicants have **6 months** after account expiry to renew before access is fully blocked

#### Interfaces
- **UI:** ReactJS — registration, login, profile, user administration screens
- **Backend API (Spring Boot):** `/api/users/register`, `/api/users/profile`
- **Keycloak:** Admin API for user creation/role mapping; auth endpoints for login flows
- **AAD:** External identity provider for SSO
- **SSM Search (via ESB):** Company registration validation during onboarding

#### Data
- PostgreSQL: `USERS`, `COMPANIES`, `PRINCIPAL_LINKS`, `CONSULTANT_LINKS`, `WAIVERS`
- MinIO: Registration documents (NRIC copies, Business Registration forms, LoU, LoA)
- Keycloak DB: Credentials, roles, sessions, realm config

---

### 5.2 Equipment Registration Module (SDoC)

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Full 7-step SDoC wizard (Scheme A/B/C selection → product details → document upload → AI validation → review → payment → confirmation). AI score display with gauge/bar/verdict visualisations. Application list with status filtering. Certificate detail view with renewal and IMEI registration shortcuts.

#### Purpose
Central NCEF component managing the **Supplier's Declaration of Conformity (SDoC)** process. Risk-based workflows for Scheme A, B, and C.

#### 5.2.1 SDoC Form Structure

The form is divided into five parts:

| Part | Section | Key Fields |
|---|---|---|
| **Part A** | Supplier Declaration | Scheme, Equipment Type, Brand, Model, Technical Code, Test Report Details |
| **Part B** | Technical Specification | Certifying Agency (CA) — **dropdown, supports selecting one or multiple CAs simultaneously**; CoC Number; Issuance & Expiry Date; Supported SIMs; Technical Brochures; multi-angle product photos |
| **Part C** | Labelling Information | Labelling ID (Supplier ID or Principal ID); Label Type (Physical or Electronic); Label Location (product / packaging / user manual) |
| **Part D** | Registration Period | Up to 5 years, **subject to the validity of the Certificate of Conformity** |
| **Part E** | Declaration | Confirmation of information accuracy; **digital signature compliant with Digital Signature Act 1997**, issued by a licensed Certification Authority (CA) |

> **Document validity rule:** All supporting documents must be issued by authorities **within 6 months of submission**. Passports must be valid at submission date.

#### 5.2.2 Scheme A Workflow — High Risk (SDoC with Certification)

1. Applicant submits SDoC form + required documents (including CoC from recognized body); selects one or multiple Certifying Agencies
2. Applicant pays via MCMC Pay
3. On payment confirmation → system assigns to OIC
4. AI engine validates documents + data; generates summary report with compliance findings
5. OIC conducts detailed manual review (application + documents + AI summary)
6. OIC decision:
   - **Accept** → RCN + digital certificate issued
   - **Not Accept** → application rejected; applicant notified
   - **Return for Modification** (iteration) → sent back to applicant with required modifications noted
   - **Reclassify** → upgrade to higher scheme or downgrade to lower scheme; applicant updates information

> **Applicants may request extension of the iteration period**; officer approval required.

#### 5.2.3 Scheme B Workflow — Medium Risk (SDoC with Verification)

- Mirrors Scheme A
- AI provides significant decision support to OIC
- **Reclassification** is key feature: OIC can reclassify to Scheme A (higher risk) or Scheme C (lower risk), requiring applicant to submit updated information

> Reclassification is available in **all schemes** (A, B, and C), not just Scheme B.

#### 5.2.4 Scheme C Workflow — Low Risk (AI Auto-Acceptance)

1. Process identical to Scheme B up to AI validation step
2. AI generates **confidence score** based on 8 criteria (see Appendix C)
3. **Score ≥ 90%** → auto-accepted instantly; RCN issued without manual intervention
4. **Score 70–89%** → Priority Review: flagged for OIC with lower-scoring sections highlighted
5. **Score < 70%** → Standard Manual Review: sent to general queue; lower-scoring sections + invalid/missing/tampered documents highlighted

> **Note on the 90% threshold:** Even if total score ≥ 90%, if any single 10%-weight criterion is entirely missing (e.g., Address & Director Match = 0%), the system will still route for manual review due to cumulative scoring rules.

#### 5.2.5 Digital Signature
All applications must be concluded with a **digital signature compliant with the Digital Signature Act 1997**, issued by a licensed Certification Authority (CA). Confirms authenticity and accuracy of submitted information.

#### 5.2.6 Document Upload & Validation
- AI performs **ICR** (Intelligent Character Recognition) to extract text and structured data
- Checks: completeness, consistency across documents, compliance with MCMC standards
- Documents must be issued within **6 months of submission**

#### 5.2.7 Technical Specification Requirements
- Detailed technical specs including test reports from accredited laboratories
- System validates testing laboratory details against a pre-configured list

#### 5.2.8 Labelling Information
- Physical or electronic labels
- Label location: on product, packaging, or user manual

#### Interfaces
- **UI (ReactJS):** Multi-part SDoC form, document upload, application status tracking
- **Backend API (Spring Boot):** `/api/applications/sdoc`, state transitions, notifications
- **AI Service (Python/FastAPI):** Document ICR, data extraction, confidence score
- **MCMC Pay (via ESB):** Payment redirect + callback confirmation

#### Data
- PostgreSQL: `APPLICATIONS`, `EQUIPMENT`, `CERTIFICATES`, `DOCUMENTS`
- MinIO: Technical documents, test reports, CoC files
- Milvus: Vector embeddings for AI document comparison and inconsistency detection

---

### 5.3 Special Approval Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — 6-step wizard fully reworked (Sprint 6): 6 purpose categories with risk tiers; 4 risk tiers (Low/Medium/High/Restricted) with live `TierBadge` in header; dynamic tier escalation by equipment type; tier-specific document lists (3–10 docs); multi-level approval chain Timeline in ConfirmStep; Draft SA Letter with MCMC letterhead mockup and "DRAFT" watermark; prohibited equipment extra conditions. Waiver code input with mock validation. Real Recommender/Verifier/Approver routing, offline meeting minutes upload flow (§5.3.3 step 2–3), and SA Letter PDF download remain mock.

#### Purpose
Dedicated workflow for importing communications equipment for **specific non-commercial purposes**:
- Personal (individual or company)
- Demonstration
- Trial
- Market Survey
- Proof of Concept (PoC)
- Research and Development (R&D)

> **Prohibited equipment:** Hidden from applicant-facing UI by default. Can only be added by officers on a case-by-case basis or for specific pre-approved applicants. **Personal purpose is NOT applicable for Prohibited equipment.**

#### 5.3.1 Low/Medium Risk Workflow

1. Applicant fills required information: purpose, usage location, time period, equipment details
2. Uploads documents: proposal paper, technical data sheets, letters of undertaking; **bulk upload of IMEI/Serial Numbers** (preferred format)
3. System generates payment notice based on equipment type, quantity, and IMEI/Serial Numbers
4. Applicant pays via MCMC Pay
5. On payment → assigned to officer; AI evaluates submitted documents
6. OIC reviews + AI summary; if modifications needed → returned to applicant for iteration
7. OIC accepts → **Special Approval Certificate** issued; unique ID: `SA-MMYY-XXXXX`

#### 5.3.2 High Risk Workflow

Identical to Low/Medium Risk but with higher fees and additional approval layer.

1. Payment notice generated on submission
2. On payment → assigned to **Recommender OIC (P5/P6)**
3. AI evaluates documents; provides summary to officer
4. Recommender reviews; can:
   - **Escalate to Approver** (accept submission, provide justification)
   - **Send for iteration** (request modifications, provide justification)
5. **Approver (P8)** makes final decision:
   - **Accept** → Special Approval Letter issued
   - **Not Accept** (only Approver can reject)
   - **Return** with justification

#### 5.3.3 Prohibited Equipment Workflow

Multi-level, stringent oversight process.

1. Application and payment submitted (similar to other categories)
2. **Offline acceptance process:** Physical meeting conducted; decision formally minuted
3. **Recommender (P5/P6)** uploads official decision document (meeting minutes) to system — enables online workflow to proceed
4. **Multi-level digital approval chain:**
   - **Recommender (P5/P6):** Initiates digital acceptance post-offline meeting; can only escalate (not reject); provides justification
   - **Verifier (P7):** Reviews application + uploaded document; can only escalate; provides justification
   - **Approver (P8):** Final decision — Accept / Not Accept (only Approver can reject)
5. System generates **draft Special Approval Letter** — editable by OIC
6. **OIC reviews and publishes** the SA Letter once all criteria fulfilled
7. System issues SA Letter to applicant

#### 5.3.4 Reclassification
Officers can reclassify applications between Low/Medium, High Risk, and (where permissible) request changes. Reclassification requires applicant to submit updated information.

#### 5.3.5 Multi-Level Acceptance Configuration
The multi-level workflow for Prohibited equipment is configurable in terms of steps, conditions, and officer roles via the Configuration & Settings module.

#### Interfaces
- **UI (ReactJS):** Special Approval form, document upload, status tracking
- **Backend API:** `/api/applications/special-approval`, multi-level approval chain management
- **AI Service:** Document evaluation for all risk levels
- **MCMC Pay:** Fee processing

#### Data
- PostgreSQL: `APPLICATIONS` with `type='SpecialApproval'`; `details` JSONB holds purpose-specific data; separate table for multi-level approval state
- MinIO: Supporting documents, proposal papers, meeting minutes, LoU

---

### 5.4 Renewal Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — 5-step renewal wizard (select certificate → document review with reuse/re-upload logic → AI re-validation with updated score → payment with fee calculation → confirmation with new RCN and expiry date). Document age tracking and 6-month reusability rule displayed. Renewal button surfaced from Certificates list for expiring certs.

#### Purpose
Automates renewal of both **applicant registrations** (Supplier/Principal/Consultant) and **equipment certifications** (SDoC). Prevents lapses through timely notifications.

#### 5.4.1 Automated Renewal Notifications
- Email + in-app notifications sent automatically before expiry
- Configurable schedule (e.g., 90, 60, 30 days before expiry)
- Notification includes a **direct link to initiate renewal**

#### 5.4.2 Account Registration Renewal (Supplier/Principal/Consultant)

1. Initiated from dashboard or via notification link (from portal or email)
2. System prompts user to review and update profile/company information
3. **Simplified AI acceptance:**
   - AI score **≥ 90%** → auto-approved
   - AI score **< 90%** → escalated to OIC for manual review
4. Default renewal: **1 year**; applicant may increase to a cumulative maximum of **5 years**
5. Payment notice generated based on selected renewal period
6. On successful payment via MCMC Pay → account status updated to `Active`; validity extended

**Rules:**
- Applicants cannot have more than **5 years of active account period** at any time
- **6-month grace period** after account expiry — applicants may still renew; account is blocked after grace period

#### 5.4.3 Equipment Registration Renewal (SDoC — Scheme A, B, C)

1. Select expired or soon-to-expire certificates from dashboard; renewal must be initiated **within 6 months of certificate validity period**
2. Quotation defaults to **1 year**; applicant may increase to cumulative **5 years maximum**
3. Scheme-specific document requirements:
   - **Scheme A:** Applicant must upload updated **Certificate of Conformity (CoC)**
   - **Scheme B & C:** No document update required unless underlying technical standards changed
4. AI-assisted compliance check re-validates equipment against latest technical standards
5. On successful payment → certificate renewed; new digital certificate may be issued

#### Interfaces
- **UI (ReactJS):** Renewal forms, dashboard alerts with direct links
- **Backend API:** `/api/applications/renewal`, fee calculation, expiry updates
- **Notification Service:** Cron-triggered checks for upcoming expiries
- **MCMC Pay:** Renewal fee processing

#### Data
- PostgreSQL: `APPLICATIONS` (renewal requests); `COMPANIES` + `CERTIFICATES` updated with new `expiry_date` and `status`

---

### 5.5 IMEI / Serial Number Registration Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — 4-step wizard (select active certificate → manual entry or CSV bulk upload → format validation with duplicate detection → confirmation with receipt and fee summary). Per-unit fee display (RM 0.50/IMEI, RM 0.15/SN). Validation status badges (valid / duplicate / invalid format) shown inline.

#### Purpose
Register unique equipment identifiers — **IMEI** (cellular devices) and **Serial Numbers** (non-cellular) — for post-market surveillance and customs clearance tracking.

#### Key Functionalities

**Identifier Registration:** Submit IMEI or Serial Numbers linked to a specific registered equipment model (by RCN).

**Bulk Upload:** CSV or Excel file import; downloadable template available on portal.

**Duplication Validation:**
- **IMEI:** Validated for uniqueness across all registered IMEI numbers in NCEF (no duplicates allowed globally)
- **Serial Number:** Validated for uniqueness per supplier + RCN combination

**Fee Calculation:**
- **RM 0.50 per IMEI**
- **RM 0.15 per Serial Number**
- Total fee auto-calculated based on quantity; payment notice generated; payment via MCMC Pay

#### Interfaces
- **UI (ReactJS):** Bulk upload interface, file selection, validation preview, error reporting
- **Backend API:** `/api/identifiers/register` — file upload, parse, validate, create payment records

#### Data
- PostgreSQL: `IMEI_SERIAL_NUMBERS` (value, type, FK to parent equipment registration)

---

### 5.6 Modification of Registration Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Modification request screen (`screens-f.jsx`): request list view; 4-step wizard (find cert → select modification type → upload docs → review); officer split-panel with document viewer, Accept / Not Accept decision buttons; version history drawer per certificate; mock audit trail updated on acceptance.

#### Purpose
Formal process for applicants to submit modification requests for existing equipment registrations, with complete audit trail.

#### 5.6.1 Modification Request Initiation
- Applicant enters valid RCN → system validates and retrieves current equipment information
- Applicant selects modification category (tick-box, **multi-select allowed**)

#### 5.6.2 Modification Categories

| Category | Description | Action |
|---|---|---|
| **Major** | Significant changes affecting equipment conformity (e.g., radio frequency components) | Redirects applicant to file a **new registration application**; **no officer review required for Major** |
| **Minor** | Small changes not affecting conformity (e.g., colour, enclosure material) | Assigned to MCMC officer for review/verification |
| **Others** | Administrative changes (e.g., updating contact person) | Assigned to MCMC officer for review/verification |

#### 5.6.3 Acceptance Workflow (Minor / Others)
- Assigned to designated MCMC officer → officer **Accepts** or **Does Not Accept**

#### 5.6.4 Version Control
- System maintains **version history** for every registered equipment
- New version created for each accepted modification
- Records: who made the change, date, nature of modification — complete audit trail

#### Interfaces
- **UI (ReactJS):** Modification request form with multi-select category
- **Backend API:** `/api/applications/modification`, officer review workflow

#### Data
- PostgreSQL: `APPLICATIONS` (modification requests); `EQUIPMENT` + `CERTIFICATES` support versioning via history table or version numbers

---

### 5.7 Importation Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Import permit screen (`screens-g.jsx`): permit list with status/CoA columns; 6-step wizard (permit type → RCN/SA reference validation → trader/consignor → consignee/agent → logistics → review); inline validation error blocking on bad RCN; scheme + brand populated on success; permit detail drawer; CoA status badge. RMCD payment redirect and real MyOGA API remain mocked.

#### Purpose
Streamlines import permit acquisition by integrating with **RMCD MyOGA System**, allowing applicants to initiate the permit process directly from NCEF.

#### 5.7.1 Import Permit Application

**On login to the import permit module:**
- Applicants are **automatically assigned to MCMC as the Permit Issuance Agency**

**Permit Type Selection:**
- Applicant selects Permit Type: **Scheme A**, **Scheme B**, **Scheme C**, or **Special Approval**

**Real-Time Validation:**
- For Scheme applications: validates **RCN details and validity**
- For Special Approval: validates **Special Approval reference numbers**
- Also validates: **quantity and IMEI/Serial Number data** to ensure compliance before proceeding

**Required Details:**
- Trader information (registered with RMCD/JKDM)
- Consignor and Consignee Details: ROC/ROB, company names, full addresses
- Agent Details: name, code, address
- Logistics Details: mode of transport, purpose of import, country/place of origin, Custom Station

#### 5.7.2 RMCD Integration
- Application data sent from NCEF backend → IBM webMethods ESB → RMCD MyOGA System API
- RMCD acknowledges the application

#### 5.7.3 Payment
- Applicant is **redirected to RMCD MyOGA System** to complete payment
- All fees determined and collected directly by RMCD (not MCMC)

#### 5.7.4 Certificate of Acceptance (CoA)
- Issued by RMCD MyOGA System upon successful payment
- Format: **`CoA-MMYY-123456`**
- Serves as verified link between NCEF-validated equipment (including Tariff Codes and CIF valuations) and the physical shipment

#### Interfaces
- **UI (ReactJS):** Import permit application form with permit type selector and real-time RCN validation
- **Backend API:** Gathers data → forwards to ESB
- **IBM webMethods:** Manages secure API communication to RMCD MyOGA System

#### Data
- PostgreSQL: `APPLICATIONS` stores initiation record; primary permit data resides in RMCD MyOGA System

---

### 5.8 Post-Market Surveillance (PMS) Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — PMS screen (`screens-h.jsx`): AI-generated audit cards with risk score breakdown per supplier; sampling proposal flow with officer adjustments; AI weights configuration modal; notify-supplier modal with editable template preview; findings checklist (Pass/Fail/N/A per criterion); non-conformance record panel. AI risk scoring is mock; real sampling trigger and MCMC enforcement integration not wired.

#### Purpose
Supports MCMC in monitoring ongoing compliance of registered equipment and suppliers after market entry. Enables end-to-end audit management, product sampling, and compliance verification.

#### Key Functionalities

**Audit Proposal Generation (AI-Assisted):**
- AI Risk Scoring Engine auto-generates proposed audit lists
- Criteria: equipment risk classification (A/B/C), supplier compliance history, registration volume, random sampling, officer-defined custom parameters (system must support introducing new parameters)
- Proposed list presented on Officer Dashboard for review, adjustment, and confirmation before formal initiation

**Product Sampling Proposal:**
- Officers define a sampling percentage
- System auto-generates proposed product sampling list for review/confirmation

**Supplier Notification:**
- Auto-generates and dispatches notifications (email + in-app alerts) to selected suppliers
- Officers can review and edit notification template before dispatching

**Audit Findings & Document Updates:**
- Interface for officers to record: verification results, compliance checklists, observations, discrepancies, remarks
- Upload supporting audit documents and test results (stored in MinIO)

**Audit History, Reporting & Non-Compliance Records:**
- Immutable complete audit history for all suppliers and equipment
- Non-compliance records **automatically feed back into AI Risk Scoring Engine** (affects future Scheme C auto-acceptance thresholds and future audit selections)
- Reports on audit activities, sampling outcomes, compliance trends via Dashboard & Reporting Module

#### Interfaces
- **UI (ReactJS):** Officer Dashboard — configure audit parameters, review AI-proposed lists, input findings
- **Backend API:** `/api/pms/audits`, `/api/pms/sampling`
- **AI Service:** Risk-based audit proposals from historical data, complaints, supplier profiles
- **Notification Service:** Dispatches alerts to applicant dashboard and email

#### Data
- PostgreSQL: `AUDITS`, `PRODUCT_SAMPLING`, `NON_COMPLIANCE` (linked to `COMPANIES` + `EQUIPMENT`)
- MinIO: Physical audit evidence, test reports, scanned documentation

---

### 5.9 Post Monitoring Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED (AI Web Crawl removed by design)** — Post Monitoring / IntelliGenCE screen (`screens-i.jsx`) is implemented with: Complaints list (severity triage, detail panel with investigation timeline, Add Update), complaint intake wizard, Knowledge Base (searchable equipment directory with registration status). AI Web Crawl feature has been **intentionally removed** — not in scope for the prototype.

> Previously referred to as "Complaint & Surveillance". URS v1.7 names it **Post Monitoring Module**.

#### Purpose
Central Knowledge Base and directory of communications equipment in the Malaysian market. Enables MCMC officers to document market findings and manage equipment-related complaints and intelligence.

#### 5.9.1 Complaint Management & Intelligence Capture

Officers populate the repository with technical intelligence gathered via:
- **MCMC's IntelliGenCE program**
- **Officer-led AI-driven web crawling efforts**

Data captured per record:
- Supplier name
- Brand and commercial/regulatory model
- IMEI or Serial Number
- Detailed description of complaint or technical issue
- Source of complaint/intelligence

#### 5.9.2 Use in Surveillance Activities
- Complaints act as **direct input criteria** for the PMS Module
- **High-severity complaints or recurring complaint patterns** automatically trigger the AI engine to propose immediate audits or product sampling for the flagged equipment/supplier

#### 5.9.3 Complaint Tracking & Reporting
- Internal Officer Dashboard provides visual tracking of complaints: received count, current investigation status, linked equipment/supplier profiles
- Authorized officers can monitor full complaint lifecycle

#### Interfaces
- **UI (ReactJS):** Manual intelligence entry forms, dashboard tracking views with severity indicators
- **Backend API:** `/api/intelligence/complaints`

#### Data
- PostgreSQL: `COMPLAINTS` table with `severity` field; mapped to `EQUIPMENT` + `COMPANIES`

---

### 5.10 Compliance Status Management Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Compliance screen (`screens-j.jsx`): two tabs — Supplier Compliance (table with bulk-select, compliance timeline drawer, Change Status modal with reason input) and Certificate Compliance (same pattern). Enforcement Actions tab with case list and action logging. Real status propagation to ESB not wired.

#### Purpose
Provides MCMC officers with direct capability to govern and update the **compliance status** of registered equipment and suppliers based on audit findings, intelligence, or enforcement decisions.

#### Key Functionalities

**Compliance Status Categories:**
- `Active`
- `Under Surveillance`
- `Suspended`
- `Cancelled`

**Status Recording & Audit Trail:**
- Every status change strictly logged: reason, officer responsible, exact date/time
- Complete history maintained for all status changes

**System-Wide Propagation:**
- Status updates propagate **immediately** throughout system
- `Suspended` supplier → restricts new SDoC submissions
- `Cancelled` equipment → instantly reflected on Public Search Portal

**Use in Surveillance Activities:**
Status records support:
- Future audit selection criteria
- Post-market surveillance activities
- Enforcement and compliance actions

#### Interfaces
- **UI (ReactJS):** Administrative controls in Officer profile management and equipment detail screens
- **Backend API:** `/api/compliance/status-update` (secure, state-transition managed)

#### Data
- PostgreSQL: `compliance_status` on `COMPANIES` + `CERTIFICATES`; `COMPLIANCE_STATUS_HISTORY` (immutable)

---

### 5.11 Public Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Public Search Portal (`screens-k.jsx`): bilingual hero section; advanced search (Brand / Model / IMEI / SN / RCN); certificate detail card with QR code placeholder; How-to-Register guide with step timeline; Documents tab (downloadable standards); FAQ section (searchable); Contact tab; MINA public chatbot (19-pair QA engine, quick-pick tags). Unauthenticated entry — no login required.

#### Purpose
Public-facing portal providing transparent access to information for the general public and serving as the central repository for official NCEF content.

#### Key Functionalities

**Public Landing Page:** Professional, bilingual (English + Malay); features latest announcements, notices, regulatory updates from MCMC.

**Equipment Certification Search & Verification:**
- Search by: Brand, Model, IMEI/Serial Number, Supplier ID, RCN
- Results clearly display registration status

**Document Repository:** Public access to NCEF guidelines, procedures, technical standards, reference documents.

**Application Process Overview:** Step-by-step overview; indicative processing timelines; clear fee structure.

**AI Chatbot:** LLM-powered, RAG-based. Queries Milvus vector database (indexed guidelines + FAQs).

**FAQ Section:** Comprehensive, searchable — covers scope, exemptions, renewal, fees, related topics.

**Contact Information:** Official NCEF contact details.

#### Interfaces
- **UI (ReactJS):** Landing page, search interface, document repository, FAQ, chatbot widget
- **Backend API:** `/api/public/search` (publicly accessible but secured)
- **AI Service:** Chatbot endpoint querying Milvus knowledge base

#### Data
- PostgreSQL: Read-optimized view of `EQUIPMENT` + `CERTIFICATES`; `FAQ` + document repository tables
- Milvus: Vector embeddings of guidelines and FAQs for chatbot RAG

---

### 5.12 Mobile Application

> **PROTOTYPE STATUS: 🚫 OUT OF SCOPE** — Native Flutter apps (Android / iOS / Huawei) are not part of the web prototype. This module is a full production deliverable only. No prototype screens planned.

#### Purpose
On-the-go access and MCMC announcement channel. **Three separate native apps** — Android, iOS, Huawei — each built with Flutter.

#### Key Functionalities
- **Public Equipment Search:** Mobile-friendly version of the public search/verification feature
- **Push Notifications:** Exclusively for broadcasting MCMC announcements, regulatory updates, public notices (not used for application-specific alerts)
- **Responsive UI:** Clean, intuitive; adapts to various screen sizes and orientations; follows native platform design guidelines

#### Platform-Specific Requirements
Each native application developed in accordance with the specific design guidelines and technical requirements of its respective platform (Google Play / Apple App Store / Huawei AppGallery).

#### Interfaces
- **UI:** Flutter (referencing web portal design + native OS design system)
- **Backend API:** Same public API endpoints as web Public Module
- **Push Notification Service:** Firebase Cloud Messaging or self-hosted solution

#### Data
Client-side only — no dedicated backend data store; relies on main NCEF database via public API.

---

### 5.13 Payment Integration Module

> **PROTOTYPE STATUS: ⚠️ PARTIAL** — Payment selection UI (FPX, card, DuitNow, corporate invoice) is embedded as the final step in SDoC, IMEI, and Renewal wizards. Fee calculations and invoice display are mocked. No standalone payment portal, real MCMC Pay gateway, SIFS reconciliation, or refund/offset workflow is implemented.

#### Purpose
Handles all NCEF financial transactions securely via **MCMC Pay**, with reconciliation through **MCMC SIFS**.

#### Key Functionalities

**MCMC Pay Integration:** All payments (registration, renewal, IMEI/SN, other services) processed through official MCMC gateway.

**Fee Structure & Notice for Payment:**
- Auto-generated based on configurable fee structure
- Covers: schemes, risk levels, registration types, quantities

**Payment Confirmation:**
- Real-time callback from MCMC Pay
- Triggers status update: `"Pending Payment"` → `"In Review"`

**Digital Receipt:** Auto-issued to applicant via email upon payment confirmation; standard NCEF template.

**Payment Terms:**
- **Gateway:** MCMC Pay
- **Accepted methods:** Credit Card, DuitNow (as supported by MCMC Pay portal)
- **Notice validity:** Application cancelled if payment not completed within specified deadline after notice generation
- **Refund policy:** Excess payments from scheme **reclassification downgrade are NOT refundable**
- **Offset policy:** Scheme **reclassification upgrade allows offset** of previous payment against new fee

**Waiver System:**
- System Admin and Officers can issue waiver codes or waiver links
- Entitles specific users to discount or full waiver from applicable fees

**Financial Reconciliation (SIFS Integration):**
- All confirmed transaction data synchronized to MCMC SIFS via ESB
- Ensures accurate financial reporting and reconciliation

#### Interfaces
- **UI (ReactJS):** Notice for Payment display, redirect button to MCMC Pay
- **Backend API:** Generate Notice for Payments; callback endpoint for payment status
- **IBM webMethods:** Communication flow — NCEF ↔ MCMC Pay ↔ MCMC SIFS

#### Data
- PostgreSQL: `PAYMENTS` (transaction_id, amount, status, FK to `APPLICATIONS`); `WAIVERS`

---

### 5.14 AI-Enabled Features

> **PROTOTYPE STATUS: ⚠️ PARTIAL** — AI score card with three visualisation modes (gauge / bar / verdict), expandable scoring criteria (8 sub-scores), and threshold commentary (≥90 auto-accept, 70–89 priority review, <70 standard) are implemented. MINA assistant chatbot is a stub with mock Q&A. Real Qwen2.5-VL service, auto-accept routing, OCR extraction, and IntelliGenCE web-crawling are not connected.

#### Purpose
AI capabilities built on a dedicated **Python FastAPI** microservices stack, enhancing efficiency, accuracy, and decision support throughout the registration lifecycle.

#### Key Functionalities

**AI Document Validation (ICR):**
- Intelligent Character Recognition extracts text/structured data from PDFs and scanned images
- Checks: document completeness, cross-reference consistency across documents (e.g., model numbers), compliance with MCMC standards

**Risk Scoring & Assessment:**
- Generates a risk score per application based on: equipment type, country of origin, applicant history, technical specifications
- Helps officers prioritise reviews; focus on high-risk applications

**AI-Assisted Decision Support (Scheme A, B, C):**
- Provides clear recommendation ("Accept" or "Not Accepted") to OIC with comprehensive analysis summary
- Highlights potential compliance issues or inconsistencies
- Final decision always remains with the officer

**Auto-Acceptance (Scheme C + Renewal only):**
- AI calculates confidence score (see Appendix C); score ≥ 90% → accepted automatically

**Fraud Detection:**
- Identifies patterns indicative of fraudulent activity: forged documents, duplicate applications, suspicious data patterns
- Flags cases for immediate investigation

**AI Chatbot / Assistant:**
- LLM-powered; uses **RAG** querying Milvus vector database (indexed guidelines, FAQs, procedures)
- Available on: **Public Portal** and **Internal Officer Dashboard**
- Specific modules where chatbot is available:
  - Special Approval (Low Risk, Medium Risk, High Risk, and Prohibited)
  - Supplier Registration
  - Scheme A registration
  - Renewal of all registration types
  - PMS module

#### Interfaces
- **Backend API (Spring Boot):** Calls AI services for document analysis and risk scoring
- **AI Service API (Python/FastAPI):** `/api/ai/validate-document`, `/api/ai/get-risk-score`, `/api/ai/chat`
- **UI (ReactJS):** Chatbot widget communicates directly with AI service API

#### Data
- MinIO: AI service retrieves documents for analysis
- PostgreSQL: Application and user data for risk assessments
- Milvus: Knowledge base embeddings for RAG chatbot

---

### 5.15 Dashboard & Reporting Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Supplier Dashboard (KPI cards, recent applications, quick actions, notifications widget), Officer Queue (my/team/unassigned tabs, SLA circles, assign modal), Reports & Analytics (monthly trend bar chart, top applicants, officer performance table — Team Lead only), All Applications master list, and Audit Log (searchable, filterable, expandable — Team Lead only) are all implemented.

#### Purpose
Real-time insights and analytics for MCMC officers and applicants. Tracks KPIs and generates reports for compliance and strategic planning.

#### Internal Officer Dashboard
- Total application counts (daily/weekly/monthly)
- Breakdown by Scheme and Special Approval type
- Real-time application status tracking (Accepted, Pending, Not Accepted, In Progress)
- Personalised task list: assigned applications + pending actions
- SLA monitoring for application processing times

#### Applicant Dashboard
- Real-time tracking of all submitted applications
- Complete history of past and current applications
- System notifications and alerts
- Initiate new applications, renewals, or modifications

#### Analytics & KPI Tracking
- KPI metrics: application processing times, acceptance rates, workload distribution among officers

#### Application Status Monitoring
Both internal and external users can monitor application status across the full workflow (submission → payment → review → final decision), providing full transparency.

#### Analytics & Reporting (Master Report)
- Exportable on request; filterable by date, time, application type (Supplier Registration, Equipment Registration, Special Approval, IMEI/SN, and other types)
- Compliance reports: registered equipment, accepted suppliers
- Operational reports: officer workload, processing bottlenecks
- Financial reports: payment transactions (reconciled with SIFS)
- Immutable audit trail report per user or application
- **Export formats: `.xlsx` and `.csv`**

#### Interfaces
- **UI (ReactJS):** Charts, graphs, data tables, personalised task lists
- **Backend API:** Aggregated data endpoints; report generation/export

#### Data
- PostgreSQL: Main transactional database; materialised views or read-replica for analytics

---

### 5.16 Notification Module

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Dedicated Notifications page (`screens-l.jsx`) with 4 tabs (All / Unread / Action Required / System); in-app bell dropdown in header showing 5 most recent items with mark-all-read; notification preferences matrix (email/SMS/in-app toggles for 6 categories) in Profile & Settings; session timeout modal with 60-second countdown. Real email/SMS/push delivery and template management remain mock.

#### Purpose
Keeps all stakeholders informed of key events, status changes, and required actions throughout the application lifecycle.

#### Email Notifications — Internal MCMC Users
Triggered by:
- New application submission
- Application assignment to an officer
- Application acceptance or non-acceptance
- Request for review from an applicant

#### Email Notifications — External Users (Applicants)
Triggered by:
- Successful account registration and activation
- Application submission confirmation
- Application acceptance, non-acceptance, or request for modification
- Payment confirmation and receipt
- Reminders for registration/certification expiry (configurable schedule)

#### In-App / System Notifications
- Displayed on user's dashboard for important updates, pending actions, status changes

#### Push Notifications (Mobile)
- **Exclusively for MCMC announcements** to all mobile app users (Android, iOS, Huawei)
- Not used for application-specific or personal workflow notifications

#### Configurable Templates
- HTML/text templates managed via admin interface
- System Administrators modify wording and branding without code changes

#### Interfaces
- **Backend API:** Core logic triggers notification events
- **Email Service:** SMTP relay integration
- **Push Notification Service:** Firebase Cloud Messaging or self-hosted

#### Data
- PostgreSQL: Notification templates table; notification sent-log (for auditing)

---

### 5.17 Integration Requirements

> **PROTOTYPE STATUS: ❌ NOT YET IMPLEMENTED** — All third-party integrations (SSM BizConnect, MyDigital ID, SIRIM eComM, RMCD MyOGA, MCMC Pay/SIFS, IBM webMethods ESB, Keycloak) are JavaScript mocks. No real API calls, webhooks, or ESB routing are wired. To build: integration stubs/adapters for each system listed in §5.17.

#### Purpose
Manages all data exchanges between NCEF and other enterprise systems using an **ESB pattern** with IBM webMethods as the central integration hub — secure, reliable, manageable, decoupled from core application logic.

> SIRIM eComM and RMCD MyOGA integrations to be finalised after further provider clarification (initial discussions: 23 Feb 2026).

#### SIRIM eComM Integration
- **CoA Issuance Validation:** NCEF communicates via IBM webMethods → calls SIRIM eComM API to validate the Certificate of Approval (CoA) for issuance by SIRIM
- **Data Migration:** ESB manages 3-phase ETL of historical data from legacy SIRIM system

#### RMCD MyOGA System Integration
- Import permit application data: NCEF backend → ESB → RMCD MyOGA System API
- RMCD issues CoA (`CoA-MMYY-123456`) upon payment

#### SSM Service Provider Integration
- Company registration: NCEF → ESB → SSM Search API → validates company existence in SSM database
- Validation result influences AI confidence score

#### MCMC Pay Integration
- ESB mediates all payment communication
- Passes payment requests to MCMC Pay; secure callback endpoint forwards payment confirmation to NCEF

#### MCMC SIFS Integration
- ESB synchronises all confirmed payment transaction data from NCEF to SIFS for financial consistency and reporting

#### Interfaces
- **Backend API (Spring Boot):** RESTful APIs or SOAP web services to ESB per integration point
- **IBM webMethods:** Protocol transformation (REST↔SOAP), data mapping, routing

#### Data
- Data in transit only; ESB maintains detailed transaction logs for auditing/troubleshooting

---

### 5.18 Configuration & Settings

> **PROTOTYPE STATUS: ✅ IMPLEMENTED** — Admin Config screen (`screens-e.jsx`) is complete: Fee Structure (inline editing, SST flag), Iteration & SLA sliders, Workflow Config (role-tagging system — assign multiple roles per MCMC team member, designate a role lead, add/remove members per role, per-member and team-level performance drawers), AI Thresholds (Scheme C auto-accept / priority review band sliders), and Announcements (publish/retract). Supplier-facing Profile & Settings also fully implemented (personal info, organisation, team members, 2FA, notifications, API keys).

#### Purpose
Administrative interface for **System Administrators** to manage and configure operational parameters without code deployments.

#### System Parameters
- Application expiry timelines (e.g., number of days before draft marked as lapsed — default 60 days)
- Payment deadlines
- Notification triggers

#### Workflow Configuration
- Define steps, conditions, and user roles for each workflow (Scheme A, B, C, Special Approval)
- AI auto-acceptance confidence threshold for Scheme C (configurable, default 90%)

#### Officer Grouping & Assignment
- Create and manage officer groups
- Configure automatic assignment rules (by equipment type or risk level)
- Appoint **OIC Lead** — can override and manually reassign applications (especially during OIC unavailability)

**Officer Calendar Blocking:**
- Officers block calendars for off-duty days (leave, medical leave, training, non-working days)
- Blocked officer = `Unavailable` / `Off-Duty` — ineligible for new task assignments
- Group Lead can transfer existing assignments to another OIC during blocked period
- System maintains record of blocked dates for administrative reference

#### Fee Structure Management
- All fees configurable: registration types, schemes, risk levels, services (IMEI/SN), renewal periods

#### Equipment Type & Technical Code Management
- Administrators manage master lists of equipment types and applicable technical codes
- Keeps applicant-facing options current with latest MCMC standards

#### Interfaces
- **UI (ReactJS):** Dedicated admin section in internal portal
- **Backend API:** `/api/admin/settings` (System Administrator role only)

#### Data
- PostgreSQL: `settings` / `configuration` tables (key-value pairs or structured format)

---

### 5.19 Data Migration Strategy

> **PROTOTYPE STATUS: 🚫 NOT APPLICABLE** — Data migration is a production go-live concern (ETL via IBM webMethods ESB). No prototype screens are required. Historical mock data in `data/mock.js` represents already-migrated records for demo purposes.

#### Purpose
Migrate all historical equipment registration data from legacy SIRIM-managed system to NCEF. Goal: seamless transition with high data integrity — all historical records accessible from day one.

#### Three-Phase ETL Approach (IBM webMethods ESB)

**Phase 1 — Initial Full Load (Before UAT):**
1. **Extract:** Full historical data from legacy SIRIM system (database dump or CSV/XML files)
2. **Transform:** ESB maps legacy schema → NCEF PostgreSQL schema; data cleansing (standardise formats), validation, resolve inconsistencies
3. **Load:** Transformed data loaded into UAT/Staging for validation and testing

**Phase 2 — Delta Load (After Pilot Launch):**
- Legacy system may still operate during grace period
- Extract only new/updated records since last migration → load into NCEF production
- Both systems synchronised during transition

**Phase 3 — Final Reconciliation (After Grace Period End):**
- Final migration run for any remaining data
- Comprehensive reconciliation: automated scripts + manual checks; verify completeness against control totals and checksums

#### Interfaces
- **IBM webMethods:** Core ETL component containing all transformation logic
- **Legacy System:** ESB connects to legacy SIRIM database or file share
- **NCEF Database (PostgreSQL):** Destination
- **MinIO:** Associated documents migrated from legacy; paths updated in `DOCUMENTS` table

#### Data
Populates: `USERS`, `COMPANIES`, `EQUIPMENT`, `CERTIFICATES`, and associated tables. Specific column mappings to be defined in coordination with SIRIM.

---

### 5.20 General System Requirements

> **PROTOTYPE STATUS: ⚠️ PARTIAL** — Audit trail screen (searchable, role-filtered), role-based access guards (RestrictedScreen 403 component), IMEI format validation, and soft-delete pattern are implemented. Real session management, server-side audit logging infrastructure, API rate limiting, and PDPA data-handling controls are not yet built.

#### 5.20.1 Data Validation Rules
- **IMEI Validation:** All submitted IMEI numbers validated for uniqueness across NCEF database — no duplicates allowed
- **Mandatory Fields:** All mandatory fields must be completed before submission; system highlights missing fields
- **Data Type Validation:** Correct data types enforced for all fields (numeric, date, text) to ensure data integrity

#### 5.20.2 Audit Trail & Logging
- Comprehensive, **immutable audit trail** of all actions by all users
- Logs: every creation, modification, deletion, and view event — includes user responsible, timestamp, details of change
- Critical for security, accountability, and PDPA compliance

#### 5.20.3 Document Management
- Centralised repository for all application-related documents
- Secure storage; version control for modified documents; easy retrieval for authorised users
- All documents stored in MinIO; metadata in PostgreSQL `DOCUMENTS` table

#### 5.20.4 Application Lifecycle Management
- System manages full application lifecycle: Draft → Submission → Payment → Review → Accept/Not Accept → Expiry or Renewal
- Status visible at all times to relevant parties

#### 5.20.5 Expiry & Cancellation Rules

| Scenario | Rule |
|---|---|
| **Lapsed Application** | Draft not completed by applicant within configurable timeframe (default **60 days**) → automatically marked as lapsed |
| **Cancelled Application** | Payment not completed within specified deadline after notice for payment generation → automatically cancelled |
| **Account Grace Period** | Accounts have **6 months** after expiry to renew before full access is blocked |
| **Equipment Renewal Window** | Renewal must be initiated within **6 months of certificate validity period** |

---

## 6. Human Interface Design

### 6.1 UI/UX Principles

| Principle | Description |
|---|---|
| **Clarity & Simplicity** | Clean, uncluttered UI; complex processes broken into step-by-step wizards |
| **Consistency** | Unified design language (colours, fonts, controls) across Internal, External, and Public portals |
| **Responsiveness** | Fully responsive across desktop, tablet, mobile |
| **Accessibility** | WCAG 2.1 Level AA compliance |
| **Bilingual Support** | All user-facing portals (Public, External, Mobile) fully support English and Malay |
| **Usability** | Intuitive and easy to navigate for both technical and non-technical users; clean and modern UI consistent across all modules |

### 6.2 Key Screen Flows

| # | Screen Flow | Prototype Status | Notes |
|---|---|---|---|
| 1 | **External User Onboarding** — account creation → email verification → category selection → profile + document submission → MCMC acceptance | ✅ Implemented | 6-step wizard in `screens-a.jsx`; email verification step is UI-only |
| 2 | **SDoC Application Submission** — scheme selection → product details → document upload → AI validation → review → payment → confirmation | ✅ Implemented | 7-step wizard in `screens-b.jsx`; all 3 schemes; AI score display |
| 3 | **Special Approval Submission** — purpose selector → equipment classification → research details → document upload → declaration → confirmation + prohibited offline upload simulation | ✅ Implemented | `screens-b.jsx`; all risk tiers; Draft SA Letter; offline meeting panel (Sprint 9) |
| 4 | **Certificate Renewal** — select cert → review docs (reuse/re-upload) → AI re-validation → payment → new RCN confirmation | ✅ Implemented | 5-step wizard in `screens-a.jsx`; document age and reusability rules shown |
| 4b | **Account Registration Renewal** — review profile → AI revalidation → payment → confirmation; period 1–5 yr; grace-period banner on dashboard | ✅ Implemented | `screens-a.jsx` `SCREENS['account-renewal']`; triggered from dashboard banner and quick action |
| 5 | **IMEI / SN Registration** — select cert → enter/CSV serials → validation → receipt | ✅ Implemented | 4-step wizard in `screens-c.jsx`; bulk upload and duplicate detection |
| 6 | **Applicant Dashboard** — KPI cards, recent applications, renewal alerts, quick actions | ✅ Implemented | `screens-a.jsx`; notifications widget included |
| 7 | **Officer Review (Active Review)** — document viewer + extracted fields + audit trail ↔ AI score + decision panel + SLA timer | ✅ Implemented | Split-view in `screens-b.jsx`; Reassign (TL only); access guard for unassigned apps |
| 8 | **Officer Queue** — my/team/unassigned tabs, KPI row, assign modal | ✅ Implemented | Inline in `NCEF Portal.html`; role-aware (TL vs normal officer) |
| 9 | **Reports & Analytics** — monthly trend chart, top applicants, officer performance | ✅ Implemented | `NCEF Portal.html`; Team Lead only; mock chart data |
| 10 | **Audit Log** — searchable timeline with role + event filters | ✅ Implemented | `NCEF Portal.html`; Team Lead only; expandable rows |
| 11 | **Suppliers Management** — add/bulk import/soft-delete/restore supplier directory | ✅ Implemented | `screens-b.jsx`; admin/TL only |
| 12 | **Certificates List** — filter by status, detail drawer, renew/IMEI shortcuts | ✅ Implemented | `screens-c.jsx` |
| 13 | **Payments & Invoices** — transaction history, methods on file, export | ✅ Implemented | `screens-c.jsx`; mock data only |
| 14 | **Consultant Management** — link/unlink Category D consultants, scheme assignment | ✅ Implemented | `screens-c.jsx` |
| 15 | **Profile & Settings** — personal, org, team members, security, notifications, API | ✅ Implemented | `screens-c.jsx`; 6 tabs |
| 16 | **Login / Switch Profile** — demo account selector, role login, switch-profile modal, sign out | ✅ Implemented | `screens-a.jsx` + `NCEF Portal.html` |
| 17 | **Modification of Registration** — find cert → select type (Major/Minor/Other) → docs → review; officer split-panel Accept/Not Accept | ✅ Implemented | `screens-f.jsx`; version history drawer per cert |
| 18 | **Importation Permit Application** — permit type → RCN/SA validation → trader/consignor → consignee/agent → logistics → review | ✅ Implemented | `screens-g.jsx`; CoA status; RMCD payment redirect is mock |
| 19 | **Post-Market Surveillance (PMS)** — AI audit proposals, sampling, supplier notification, findings checklist, non-conformance | ✅ Implemented | `screens-h.jsx`; AI risk scoring is mock |
| 20 | **Post Monitoring / IntelliGenCE** — complaint intake, severity triage, investigation timeline, Knowledge Base | ✅ Implemented | `screens-i.jsx`; AI web crawl removed by design |
| 21 | **Compliance Status Management** — supplier/cert compliance tables, bulk-select, status change modal, enforcement actions | ✅ Implemented | `screens-j.jsx`; ESB propagation is mock |
| 22 | **Public Search** — bilingual hero, advanced search by Brand/Model/IMEI/SN/RCN, certificate detail, FAQ, chatbot | ✅ Implemented | `screens-k.jsx`; unauthenticated entry |

### 6.3 Wireframes
Detailed wireframes and high-fidelity mockups to be created in a separate UI/UX design phase. Design adheres to MCMC branding and style guidelines.

---

## 7. Non-Functional Requirements

### 7.1 Performance

**Requirements:**
- Page Load Time: all pages load within **3 seconds** under normal network conditions
- Concurrent Users: minimum baseline of **250 concurrent users**; system must support option to scale to **500 concurrent users** without performance degradation (separate quotation required)
- Transaction Processing: high-frequency operations (application submission, payment confirmation) processed within **5 seconds**

**Design:**
- **Load Balancing:** Nginx in active-active configuration
- **Horizontal Scaling:** Microservices + Rancher (Kubernetes); individual services scale independently
- **Database Optimisation:** PostgreSQL indexing; read replicas / materialised views for reporting and public search
- **Caching:** Caching layer (e.g., Redis) for frequently accessed data

### 7.2 Security

**Requirements:** Protected against OWASP Top 10; strong authentication; all sensitive data encrypted.

**Design:**
- **Authentication & Authorisation:** Keycloak — strong password policies, 2FA for external, AAD SSO for internal, OAuth 2.0/JWT tokens validated by APISIX
- **WAF:** Nginx + ModSecurity — protects against SQLi, XSS, CSRF
- **Vulnerability Protection:** SAST + DAST integrated into CI/CD pipeline

### 7.3 Data Encryption

All sensitive data must be encrypted at all stages:
- **In Transit:** TLS 1.2/1.3 (client↔server, service↔service)
- **At Rest:** AES-256 for PostgreSQL database and MinIO object storage
- Applies to: user credentials, personal information, and confidential application details

### 7.4 Compliance (PDPA)

**Requirement:** Full compliance with Malaysian Personal Data Protection Act (PDPA) 2010.

**Design:**
- **Consent Management:** Explicit consent during registration; clear privacy policy links
- **Data Minimisation:** Collect only data strictly necessary for regulatory process
- **Access Control:** Strict RBAC (Keycloak) — only authorised officers access personal data for intended purpose
- **Audit Trails:** Immutable audit trail logs all access to and modifications of personal data

### 7.5 Availability & Reliability

**Requirement:** Target uptime **99.44%** (excludes planned maintenance windows, which must be scheduled during off-peak hours and communicated in advance).

**Design:**
- **High Availability:** Active-active: Load Balancer, Reverse Proxy, App Servers, API Gateway
- **Database Redundancy:** PostgreSQL active-passive with automatic failover
- **Container Orchestration:** Kubernetes auto-restarts failed containers/nodes

### 7.6 Usability

The system must be **intuitive, user-friendly, and easy to navigate** for both technical and non-technical users. The UI must be clean, modern, and consistent across all modules.

### 7.7 Scalability

System architecture must be **scalable** to accommodate future growth in users, applications, and data volume. Cloud-based infrastructure allows seamless addition of resources as demand increases.

### 7.8 Backup & Recovery

**Requirements:** Daily backups; 30-day retention; DR environment.

**Design:**
- **PostgreSQL:** Automated daily backups via `pg_dump`; stored securely in separate location
- **MinIO:** Versioning + replication to secondary site
- **DR Environment:** Full DR environment deployed for business continuity

---

## 8. Requirements Traceability Matrix

| URS §  | Requirement | Spec § |
|---|---|---|
| 4.1 | User Management | 5.1 |
| 4.1.1 | User Classification & Roles | 5.1.1 |
| 4.1.2 | Supplier Registration, Waiver, Iteration | 5.1.2–5.1.3 |
| 4.1.3 | Principal & Consultant Registration | 5.1.4–5.1.5 |
| 4.1.4 | 2FA / OTP Login | 5.1.7 |
| 4.1.5 | SSO for Internal Users | 5.1.6, 3.4 |
| 4.1.6 | Profile Management | 5.1.9 |
| 4.1.7 | User Access Matrix | Appendix A |
| 4.1.8 | Account Activation / Deactivation / Grace Period | 5.1.10 |
| 4.2 | Equipment Registration (SDoC) | 5.2 |
| 4.2.1 | Scheme A — High Risk | 5.2.2 |
| 4.2.2 | Scheme B — Medium Risk, Reclassification | 5.2.3 |
| 4.2.3 | Scheme C — AI Auto-Acceptance | 5.2.4 |
| 4.2.4 | SDoC Form Parts A–E | 5.2.1 |
| 4.2.5 | Document Upload & Validation (6-month rule) | 5.2.6 |
| 4.2.6 | Technical Specification Requirements | 5.2.7 |
| 4.2.7 | Labelling Information | 5.2.8 |
| 4.2.8 | Digital Signature (DSA 1997) | 5.2.5 |
| 4.3 | Special Approval | 5.3 |
| 4.3.1 | Low/Medium Risk | 5.3.1 |
| 4.3.2 | High Risk (with Approver) | 5.3.2 |
| 4.3.3 | Prohibited Equipment (P5/P6/P7/P8, SA Letter) | 5.3.3 |
| 4.3.4 | Purpose of Usage Categories | 5.3 |
| 4.3.5 | Prohibited Offline Acceptance Upload | 5.3.3 |
| 4.3.6 | Multi-Level Acceptance Workflow | 5.3.3, 5.3.5 |
| 4.4 | Renewal Module | 5.4 |
| 4.4.1 | Account Renewal (grace period, 1–5 yr) | 5.4.2 |
| 4.4.2 | Equipment Renewal (6-month window, Scheme A CoC) | 5.4.3 |
| 4.4.3 | Renewal Period & Validity | 5.4.2–5.4.3 |
| 4.5 | IMEI/Serial Number Registration | 5.5 |
| 4.5.1–4.5.3 | IMEI, SN, Bulk (CSV/Excel) | 5.5 |
| 4.6 | Modification of Registration | 5.6 |
| 4.6.1–4.6.3 | Request, Workflow, Version Control | 5.6.1–5.6.4 |
| 4.7 | Importation | 5.7 |
| 4.7.1 | Permit Type, MCMC as Agency, RCN Validation, CoA | 5.7.1, 5.7.4 |
| 4.7.2 | RMCD Integration | 5.7.2 |
| 4.7.3 | Trader/Consignor/Agent/Logistics Info | 5.7.1 |
| 4.7.4 | CoA Issuance | 5.7.4 |
| 4.8 | Post-Market Surveillance (PMS) | 5.8 |
| 4.8.1–4.8.5 | Audit Proposals, Sampling, Notification, Findings, History | 5.8 |
| 4.9 | Post Monitoring Module (Complaints & Intelligence) | 5.9 |
| 4.9.1–4.9.3 | IntelliGenCE, Surveillance Triggers, Tracking | 5.9 |
| 4.10 | Compliance Status Management | 5.10 |
| 4.11 | Public Module | 5.11 |
| 4.11.1–4.11.7 | Landing, Search, Docs, Overview, Chatbot, FAQ, Contact | 5.11 |
| 4.12 | Mobile Application (3 native apps) | 5.12 |
| 4.12.1–4.12.4 | Android/iOS/Huawei, UI, Features, Platform Reqs | 5.12 |
| 4.13 | Payment Integration | 5.13 |
| 4.13.1–4.13.4 | MCMC Pay, Fees, Confirmation, SIFS | 5.13 |
| 4.14 | AI-Enabled Features | 5.14 |
| 4.14.1–4.14.6 | ICR, Risk Scoring, Decision Support, Auto-Accept, Fraud, Chatbot scope | 5.14 |
| 4.15 | Dashboard & Reporting | 5.15 |
| 4.15.1–4.15.5 | Officer/Applicant Dashboard, Analytics, Status Monitoring, Reporting | 5.15 |
| 4.16 | Notification Module | 5.16 |
| 4.16.1–4.16.5 | Internal/External Email, In-App, Push, Templates | 5.16 |
| 4.17 | Integration Requirements | 5.17, 3.4 |
| 4.17.1–4.17.6 | SIRIM, RMCD, MCMC Pay, SSM, SIFS, Migration | 5.17, 5.19 |
| 4.18 | Configuration & Settings | 5.18 |
| 4.18.1–4.18.5 | Params, Workflow, Officer Groups/Calendar, Fees, Master Data | 5.18 |
| 4.19 | General System Requirements | 5.20 |
| 4.19.1–4.19.5 | Data Validation, Audit Trail, Doc Mgmt, Lifecycle, Expiry Rules | 5.20 |
| 5.1 | Performance (250/500 users, 3s/5s) | 7.1 |
| 5.2 | Security (OWASP, Auth) | 7.2 |
| 5.3 | PDPA Compliance | 7.4 |
| 5.4 | Availability (99.44%) | 7.5 |
| 5.5 | Scalability | 7.7 |
| 5.6 | Usability | 7.6 |
| 5.7 | Data Encryption (AES-256, TLS) | 7.3 |
| 5.8 | Backup & Recovery (daily, 30-day, DR) | 7.8 |

---

## 9. Appendices

### Appendix A: User Access Matrix

> System Admin can appoint an **OIC Lead** who gains ability to manually override applicant assignments. The Content Manager role manages public portal content only.

| Module | System Admin | OIC / Recommender / Verifier | Approver | Content Manager | Applicant (External) | Public |
|---|---|---|---|---|---|---|
| User Management | CRUD | R | R | — | R (Own) | — |
| Equipment Registration (SDoC) | R | CRU | RU | — | CRU (Own) | — |
| Special Approval | R | CRU | RU | — | CRU (Own) | — |
| Renewal | R | RU | RU | — | CRU (Own) | — |
| Modification | R | RU | RU | — | CRU (Own) | — |
| IMEI/SN Registration | R | R | R | — | CRU (Own) | — |
| Importation | R | R | R | — | CR (Own) | — |
| PMS (Audits, Sampling) | R | CRU | R | — | R (Notified) | — |
| Post Monitoring (Complaints) | R | CRUD | R | — | — | — |
| Compliance Status | R | CRU | R | — | R (Own) | — |
| Public Module | CRUD | CRUD | R | CRUD | R | R |
| Dashboard & Reporting | R (All) | R (Assigned) | R (All) | — | R (Own) | — |
| Configuration & Settings | CRUD | — | — | — | — | — |

**Legend:** C = Create, R = Read, U = Update, D = Delete

---

### Appendix B: Fee Structure

> All fees are **configurable** by the System Administrator. Waivers can be issued by System Admin or Officers via code or link.

#### Table 1: User Registration Fees

| Category | Application Fee | Annual Fee | Max Period | Total Fee Range |
|---|---|---|---|---|
| Category A — Company (Commercial) | RM 100.00 | RM 50.00/yr | 5 years | RM 150 – RM 350 |
| Category B — Individual (Non-Commercial) | RM 100.00 | RM 50.00/yr | 5 years | RM 150 – RM 350 |
| Category C — Institution (Non-Commercial) | RM 100.00 | RM 50.00/yr | 5 years | RM 150 – RM 350 |
| Category D — Consultant | RM 100.00 | RM 50.00/yr | 5 years | RM 150 – RM 350 |

**Notes:**
- Total Fee = Application Fee (RM 100) + (Annual Fee × Number of Years)
- Example: 1 year = RM 100 + RM 50 = **RM 150**
- Example: 5 years = RM 100 + (RM 50 × 5) = **RM 350**
- Applicants pay for 1 to a maximum of 5 years upfront
- **6-month grace period** after expiry to renew; cannot exceed 5 years of active period at any time

#### Table 2: Equipment Registration Fees (SDoC)

| Scheme | 1 yr | 2 yrs | 3 yrs | 4 yrs | 5 yrs |
|---|---|---|---|---|---|
| Scheme A (High Risk) | RM 350 | RM 700 | RM 1,050 | RM 1,400 | RM 1,750 |
| Scheme B (Medium Risk) | RM 250 | RM 500 | RM 750 | RM 1,000 | RM 1,250 |
| Scheme C (Low Risk) | RM 150 | RM 300 | RM 450 | RM 600 | RM 750 |

**Notes:** Registration period subject to CoC validity; maximum 5 years; payment via MCMC Pay.

#### Table 3: Renewal Fees

| Type | Annual Fee | Maximum Period |
|---|---|---|
| Supplier/Principal/Consultant Renewal | RM 50.00/yr | 5 years |
| Equipment Registration Renewal (Scheme A, B, C) | Same as initial SDoC fees | Up to 5 years |

**Notes:** Renewal fees follow same structure as initial registration; renewal must be completed within 6 months of expiry.

#### Table 4: IMEI and Serial Number Registration Fees

| Type | Fee per Unit | Validation Rule |
|---|---|---|
| IMEI Number | RM 0.50 | No duplicate IMEI globally |
| Serial Number | RM 0.15 | No duplicate per supplier + RCN |

**Notes:** Bulk registration via CSV/Excel; total fee auto-calculated based on quantity.

#### Table 5: Special Approval Fees

**Low/Medium Risk Equipment:**

| Item | Fee per Unit |
|---|---|
| Registered Model | RM 20.00 |
| Non-Registered Model | RM 40.00 |
| IMEI Number (if applicable) | RM 0.50 |
| Serial Number (if applicable) | RM 0.15 |

**High Risk Equipment:**

| Item | Fee per Unit |
|---|---|
| High Risk Equipment | RM 300.00 |
| IMEI Number (if applicable) | RM 0.50 |
| Serial Number (if applicable) | RM 0.15 |

**Prohibited Equipment:**

| Item | Fee per Unit |
|---|---|
| Prohibited Equipment | RM 300.00 |
| IMEI Number (if applicable) | RM 0.50 |
| Serial Number (if applicable) | RM 0.15 |

**Notes:** Special Approval purposes: Personal, Demonstration, Trial, Market Survey, PoC, R&D. Personal use NOT applicable for Prohibited equipment. Total fee = (Equipment fee × quantity) + (IMEI/SN fees if applicable).

#### Table 6: Importation Fees

| Service | Fee | Notes |
|---|---|---|
| Import Permit Application | Processed via RMCD MyOGA System | Payment completed through RMCD MyOGA System; fees determined by RMCD |
| Certificate of Acceptance (CoA) | Issued by RMCD | Format: `CoA-MMYY-123456` |

#### Table 7: Fee Calculation Examples

| Scenario | Calculation | Total Fee |
|---|---|---|
| Company registration, 3 years | RM 100 + (RM 50 × 3) | **RM 250** |
| Scheme A equipment, 5 years | RM 350 × 5 | **RM 1,750** |
| Scheme B equipment, 2 years | RM 250 × 2 | **RM 500** |
| Scheme C equipment, 1 year | RM 150 × 1 | **RM 150** |
| Special Approval (Low Risk, registered) + 100 IMEI | (RM 20 × 1) + (RM 0.50 × 100) | **RM 70** |
| Special Approval (High Risk) + 50 Serial Numbers | (RM 300 × 1) + (RM 0.15 × 50) | **RM 307.50** |
| IMEI registration only (500 units) | RM 0.50 × 500 | **RM 250** |

#### Table 8: Payment Terms and Conditions

| Condition | Details |
|---|---|
| Payment Gateway | MCMC Pay (integrated) |
| Payment Methods | Credit Card, DuitNow (as supported by MCMC Pay portal) |
| Notice for Payment Validity | Application cancelled if payment not completed within specified deadline after notice generation |
| Payment Confirmation | Real-time callback from MCMC Pay to NCEF system |
| Receipt Issuance | Digital receipt generated and emailed upon successful payment |
| Financial Integration | All transactions synchronised with MCMC SIFS |
| **Refund Policy** | Excess payments from scheme **reclassification downgrade are NOT refundable** |
| **Offset Policy** | Scheme **reclassification upgrade** allows offset of previous payment against new fee |
| Waiver | System Admin and Officers can issue waiver codes or links; entitles specific users to discount or full waiver |

---

### Appendix C: AI Scoring Mechanism

#### Scoring Criteria (Total: 100%)

| Criteria | Weight | Description |
|---|---|---|
| SSM/ROC/ROB Validation | 20% | Real-time SSM database validation confirms legitimate business entity |
| Completeness of Technical Specifications | 15% | All required technical specs provided |
| Test Report & Lab Verification | 15% | Test report from recognised, accredited lab with valid report number |
| Address & Director Match | 10% | Information matches official SSM records, reducing fraud risk |
| Brand & Model Consistency | 10% | Brand and model consistently named across all documents; not on any blacklist |
| Standards Compliance | 10% | Equipment tested against latest MCMC-required technical standards |
| Supplier's Past Performance | 10% | Supplier has a good track record of compliant applications |
| Completeness & Consistency | 10% | All fields correctly filled with no contradictions |
| **Total** | **100%** | |

#### Auto-Acceptance Thresholds

> **Auto-acceptance applies ONLY to Scheme C and Renewal.**

| Score Range | Status | Action |
|---|---|---|
| **≥ 90%** | Automatic Acceptance *(Scheme C / Renewal only)* | Application accepted instantly without manual intervention. For other schemes, score is displayed to officer with justifying reasons. **Exception:** If any single 10%-weight criterion is entirely missing (e.g., Address & Director Match = 0%), system still routes for manual review even if total ≥ 90%. |
| **70% – 89%** | Priority Review | Flagged for MCMC officer; lower-scoring sections highlighted for targeted assessment |
| **Below 70%** | Standard Manual Review | Sent to general queue for comprehensive manual evaluation; lower-scoring sections and invalid/missing/tampered documents highlighted |

#### AI Scoring Application Scope

AI scoring is applied to:
- Scheme A, B, C registration
- Special Approval (all risk levels)
- Supplier Registration (new accounts)
- Renewal of all registration types
- Used to generate audit proposals in PMS

---

## 10. Glossary

| Term | Full Form | Description |
|---|---|---|
| 2FA | Two-Factor Authentication | OTP-based login for external users |
| AAD | Azure Active Directory | Microsoft identity service for MCMC SSO |
| AI | Artificial Intelligence | Document validation, risk scoring, chatbot |
| API | Application Programming Interface | Service communication interfaces |
| CA | Certifying Agency | Accredited body issuing CoC; selectable via dropdown (supports multiple) |
| CoA | Certificate of Acceptance | Issued by RMCD for approved import permits; format `CoA-MMYY-123456` |
| CoC | Certificate of Conformity | Third-party certification of equipment compliance |
| DR | Disaster Recovery | Business continuity environment |
| DSA | Digital Signature Act 1997 | Malaysian law governing digital signatures on declarations |
| ESB | Enterprise Service Bus | Integration middleware (IBM webMethods) |
| FAT | Final Acceptance Test | Final system acceptance testing phase |
| ICR | Intelligent Character Recognition | AI document text extraction |
| IMEI | International Mobile Equipment Identity | Unique identifier for cellular devices |
| KPI | Key Performance Indicator | Performance measurement metric |
| LLM | Large Language Model | Foundation of AI chatbot and document analysis |
| MCMC | Malaysian Communications and Multimedia Commission | Regulatory authority; project owner |
| NCEF | New Communications Equipment Framework | The regulated registration framework |
| NFR | Non-Functional Requirement | Performance, security, availability requirements |
| OIC | Officer in Charge | MCMC officer role responsible for reviewing applications |
| OTP | One-Time Password | Emailed code for first-time login 2FA |
| PDPA | Personal Data Protection Act 2010 | Malaysian data privacy law |
| PMS | Post-Market Surveillance | Ongoing monitoring of registered equipment and suppliers |
| PoC | Proof of Concept | Special approval purpose category |
| R&D | Research and Development | Special approval purpose category |
| RAG | Retrieval-Augmented Generation | AI chatbot technique using vector search + LLM |
| RBAC | Role-Based Access Control | Permission model managed by Keycloak |
| RCN | Registration Certification Number | Unique identifier for registered equipment |
| RMCD | Royal Malaysian Customs Department | Manages import permits via MyOGA system |
| ROB | Register of Business | Malaysian business registration type |
| ROC | Register of Companies | Malaysian company registration type |
| RPO | Recovery Point Objective | Max acceptable data loss in DR scenario |
| RTO | Recovery Time Objective | Max acceptable downtime in DR scenario |
| SDoC | Supplier's Declaration of Conformity | Primary equipment registration mechanism |
| SDD | Software Design Document | Infomina Berhad technical design document (v1.4) |
| SIFS | MCMC Integrated Financial System | MCMC's internal financial platform |
| SLA | Service Level Agreement | Processing time commitments |
| SSM | Suruhanjaya Syarikat Malaysia | Companies Commission of Malaysia |
| SSO | Single Sign-On | Unified authentication for internal MCMC users |
| UAT | User Acceptance Test | Pre-production testing by stakeholders |
| URS | User Requirement Specification | Source requirements document (v1.7, 30 March 2026) |
| WAF | Web Application Firewall | Security layer at Nginx |

---

## 11. Prototype Mapping

> **Last updated: 05 May 2026**  
> Deployment: `jhamuza.github.io/Project-N` — GitHub Pages, branch `main`.  
> Recent changes: Full App shell restored in `index.html` (AssignOfficerModal, OfficerQueue, Reports, Audit, SwitchProfileModal, interactive MINA QA engine, notification bell dropdown, session timeout, MCMC logo sidebar, full header). GitHub Pages path fix (`<base href="/Project-N/">` + `.nojekyll`). MCMC user profile data corrected in Profile & Payments screens. **Plotly.js integration** (`plotly-2.35.2.min.js` CDN): replaced all SVG chart stubs in `SCREENS.reports` with 4 interactive Plotly charts — (1) grouped bar + overlay line for 12-month volume trend with forecast shading and Apr/May separator, (2) donut for scheme distribution with centre count, (3) horizontal bar for processing time vs target per scheme, (4) horizontal bar for officer SLA compliance with 95% target line. Mock data expanded: `monthlyTrend` extended to 12 months with `forecast` flag; new `schemeDistribution` and `processingTime` arrays; `officerPerformance` grown to 5 officers; `topApplicants` to 7 entries. **SST zeroed** across all fee entries (`sstEnabled: false`, `sstPct: 0`); base fees set to round values per Appendix B (350/250/150). **Table overflow** fixed on all 21 `antd.Table` instances (explicit column widths + `scroll={{ x: 'max-content' }}`). **Advanced filters** added to supplier Applications screen (Scheme + AI Score) and Officer Queue (Scheme + Priority + AI Score + Search). **Scheme colour coding removed** — neutral `<Tag>` replaces coloured `SchemeBadge` in both table columns.

This section maps the specification to the current prototype (`jhamuza/Project-N`).

### Role Mapping

| Spec Role | Prototype Key | Identity | Default Screen |
|---|---|---|---|
| External Applicant (Category A) | `supplier` | Nurul Aisyah binti Ahmad · Axiata Digital | `dashboard` |
| System Administrator | `team-lead` | En. Faisal Rahman · MCMC System Administrator | `officer-queue` |
| OIC / Recommender / Verifier | `officer` | Pn. Rosnah Idris · MCMC Officer | `officer-queue` |

> All 7 roles are implemented: supplier, team-lead, officer, recommender, verifier, approver, content-manager — each with distinct nav, landing screen, and role-specific UI behaviour.

### Screen-to-Module Index

| Screen Key | File | Spec Module |
|---|---|---|
| `login` | `components/screens-a.jsx` | §5.1 (Auth) |
| `dashboard` | `components/screens-a.jsx` | §5.15 (Applicant Dashboard) |
| `sdoc-wizard` | `components/screens-a.jsx` | §5.2 (SDoC) |
| `applications` | `components/screens-a.jsx` | §5.15 (Application List) |
| `certificate-detail` | `components/screens-a.jsx` | §5.2 (RCN Certificate) |
| `officer-queue` | `NCEF Portal.html` (inline) | §5.15 (Officer Dashboard) |
| `officer-review` | `components/screens-b.jsx` | §5.2 / §5.3 (Active Review) |
| `all-applications` | `components/screens-b.jsx` | §5.15 (Master Report) |
| `reports` | `components/screens-b.jsx` | §5.15 (Analytics) |
| `audit` | `components/screens-b.jsx` | §5.20.2 (Audit Trail) |
| `suppliers-mgmt` | `components/screens-b.jsx` | §5.1 (Supplier Dir. — MCMC Admin) |
| `imei-register` | `components/screens-c.jsx` | §5.5 (IMEI/SN) |
| `cert-renewal` | `components/screens-c.jsx` | §5.4 (Renewal) |
| `consultants` | `components/screens-c.jsx` | §5.1.5 (Consultant Mgmt) |
| `profile` | `components/screens-c.jsx` | §5.1.9 (Profile) |
| `settings` | `components/screens-c.jsx` | §5.18 (Config) |

### Implemented vs Pending

Legend: ✅ Done · ⚠️ Partial · ❌ Not built · 🚫 Out of scope

| Module / Feature | Status | What's Done | What Remains |
|---|---|---|---|
| **Login & Auth** | ✅ Done | Login screen with error states (wrong creds / account lock); 6 demo profiles; role-based landing; forgot-password 4-step flow | Keycloak SSO, real password validation |
| **Supplier Onboarding** | ✅ Done | 6-step wizard; SSM auto-fill mock; Security Q&A (3 questions); expanded PDPA consent checkboxes; AI validation checklist | Real SSM BizConnect call; email verification delivery |
| **Profile & Settings** | ✅ Done | 6 tabs: personal, org, team, security (with 2FA enrollment modals for TOTP/SMS/MyDigital ID), notifications, API | Real API key generation |
| **Switch Profile / Sign Out** | ✅ Done | Switch Profile modal (6 role cards with MCMC org info); sign out → login | — |
| **SDoC Registration** | ✅ Done | 7-step wizard; all 3 schemes; CA multi-select (8 agencies); AI score; payment step | Reclassification modal for prohibited; real payment gateway |
| **Special Approval** | ✅ Done | 6-step wizard; 4 risk tiers; TierBadge; tier-specific docs; approval chain Timeline; Draft SA Letter; prohibited offline meeting upload simulation (Recommender panel + Timeline unlock) | Real waiver code backend; real SA PDF |
| **SA Letter Field Config (Admin)** | ✅ Done | "SA Letter Config" tab in Admin Config: 14 fields across 5 sections; Editable/Locked toggle; Publish | — |
| **Certificate Renewal** | ✅ Done | 5-step wizard; document reuse logic; AI re-validation; payment | Automated renewal reminder trigger |
| **Account Registration Renewal** | ✅ Done | 4-step wizard (review profile → AI revalidation → payment → confirmation); period 1–5 yr cap; grace-period alert on dashboard | — |
| **IMEI / SN Registration** | ✅ Done | 4-step wizard; manual + CSV; format validation; receipt | Real uniqueness check against NCEF DB |
| **Modification of Registration** | ✅ Done | Request list; version history drawer; 4-step wizard (find cert → type → docs → review); officer split-panel with Accept/Not Accept (`screens-f.jsx`) | — |
| **Importation Module** | ✅ Done | Import permit list; 6-step wizard (type → validate → trader/consignor → consignee/agent → logistics → review); CoA status; detail drawer (`screens-g.jsx`) | Real RMCD MyOGA call |
| **Post-Market Surveillance (PMS)** | ✅ Done | AI audit cards with risk breakdown; sampling proposals; AI weights modal; notify-supplier modal; findings checklist with Pass/Fail/N/A; non-conformance records (`screens-h.jsx`) | Real PMS sampling triggers |
| **Post Monitoring / IntelliGenCE** | ✅ Done (AI Crawl removed) | Complaints list with severity triage; detail panel with timeline; intake wizard; Knowledge Base (`screens-i.jsx`). AI Web Crawl intentionally removed. | — |
| **Compliance Status Management** | ✅ Done | Suppliers tab with bulk-select; compliance timeline drawer; Change Status modal; Certificates tab; Enforcement Actions tab (`screens-j.jsx`) | Real status propagation to ESB |
| **Public Search Portal** | ✅ Done | Bilingual hero; Advanced Search; certificate detail with QR; How-to-Register guide; Documents tab; FAQ; Contact tab; MINA public chatbot (`screens-k.jsx`) | — |
| **Mobile Apps (Android/iOS/HW)** | 🚫 Out of scope | — | Native Flutter apps — production deliverable only |
| **Officer Dashboard** | ✅ Done (Sprint 16) | Dedicated landing for all 5 officer roles; greeting + role badge; role-adaptive KPIs; "Next in Queue" spotlight; recent decisions; Team Snapshot (TL); performance stats | — |
| **Officer Queue** | ✅ Done | My / Team / Unassigned / Auto-certified tabs; assign modal; SLA circles; KPI row; advanced filters; Auto-cert tab (Sprint 15) | — |
| **Active Review (Officer)** | ✅ Done | Split view: PDF viewer + decision panel; audit trail; access guard; TL Reassign; Reclassify; Extension Requests; Fraud Signals panel (Sprint 16) | Real PDF rendering |
| **Suppliers Management** | ✅ Done | Add / bulk CSV / soft-delete / restore; MCMC-added flag | — |
| **Reports & Analytics** | ✅ Done | Monthly trend chart; top applicants; officer performance (TL only) | Real data export (CSV/PDF); live chart data |
| **All Applications (Officer)** | ✅ Done | Cross-supplier master table; applicant + supplierId columns; status/scheme filters; bulk-select with bulk-assign modal + flag + export (TL/approver only) | — |
| **Audit Log** | ✅ Done | Searchable, role-filtered, expandable rows (TL only) | Real immutable server-side log |
| **Certificates List** | ✅ Done | Filter by status; detail drawer with download certificate + print label (real Blob downloads); renew/IMEI shortcuts | — |
| **Payments & Invoices** | ✅ Done | Transaction history; payment methods; billing information; invoice/receipt drawer per transaction (Blob CSV export) | Standalone payment portal; real MCMC Pay gateway; SIFS reconciliation |
| **Consultant Management** | ✅ Done | Link/unlink from directory; scheme assignment; notes | — |
| **AI Score Display** | ✅ Done | Gauge / bar / verdict visualisations; 8 sub-scores; threshold commentary; Scheme C auto-cert fast-track (Sprint 15) | Real Qwen2.5-VL API call |
| **MINA Chatbot** | ✅ Done | Interactive drawer; 19-pair QA engine; typing indicator; quick-pick tags; live input with Enter-to-send | Real LLM backend |
| **Notification Centre** | ✅ Done | Dedicated Notifications page with 4 tabs (All/Unread/Action/System); in-app bell dropdown (5 items); session timeout modal with 60-s countdown | Real email/SMS/push delivery |
| **Global Search** | ✅ Done (Sprint 15) | Ctrl+K / ⌘K trigger; searches applications, certificates, notifications; grouped results; quick-nav grid | Full-text search across all entities with server-side index |
| **Workflow Config / Role Tagging** | ✅ Done | Role-based member management — assign multiple roles per MCMC officer; designate role lead; add/remove members per role; per-member performance drawer; team-level stats | — |
| **MCMC Officer Profiles** | ✅ Done | All 5 MCMC profiles have division, department, grade, phone; 10-member roster in `mcmcTeamMembers`; `roleDefinitions` for Workflow Config | — |
| **Integrations Health** | ✅ Done | Real-time health dashboard for 7 systems; latency, uptime %, status badge; architecture diagram (`screens-e.jsx`) | Real API adapter calls |
| **Admin System Config** | ✅ Done | Fee Structure; Iteration & SLA sliders; Workflow Config (role tagging); AI Thresholds; Announcements (`screens-e.jsx`) | — |
| **Data Migration** | 🚫 Not applicable | Mock data represents migrated records | ETL pipeline — production go-live concern only |
| **Iteration Reply (Applicant)** | ✅ Done | 3-step wizard: review officer feedback → upload revisions → confirm/resubmit; "Respond" CTA on Applications list (`screens-l.jsx`) | — |
| **Forgot Password** | ✅ Done | 4-step: email → OTP (auto-fill after 2.5s) → new password with strength bar → success; inline from Login screen (`screens-l.jsx`) | Real email OTP delivery |

### Key Mock Data (`data/mock.js`)

| Key | Description |
|---|---|
| `MOCK.profiles` | Six demo profiles (`supplier`, `team-lead`, `officer`, `recommender`, `verifier`, `approver`) |
| `MOCK.officerQueue` | Applications in queue; `assignedTo` uses real officer IDs (`OFF-001`, `OFF-002`, `null`) |
| `MOCK.supplierDirectory` | Registered suppliers with `addedBy`, `verifiedAt`, `deletedAt` (soft-delete) |
| `MOCK.consultantDirectory` | Category D consultants available for linking |
| `MOCK.myConsultants` | Consultants linked to current supplier |
| `MOCK.officerPerformance` | Per-officer KPIs with `team` field |
| `MOCK.applications` | Submitted applications with status/scheme/timeline |
| `MOCK.certificates` | Issued RCN certificates with expiry dates |
| `MOCK.payments` | Transaction records per application |

### Business Rules Enforced in Prototype

1. **MCMC Admin/Officer cannot access supplier-only screens** — `SUPPLIER_ONLY` set + `RestrictedScreen` (403) guard
2. **Normal Officer nav limited** — no Reports, Audit, All Applications (not in `NAV_OFFICER`)
3. **IMEI fees:** RM 0.50/IMEI, RM 0.15/SN — displayed in `imei-register`
4. **Scheme fees:** A RM 350/yr, B RM 250/yr, C RM 150/yr (no SST) — displayed in `sdoc-wizard` and `cert-renewal`
5. **User reg fee:** RM 100 + RM 50/yr, max 5 years — shown in renewal flow
6. **Soft-delete suppliers:** `deletedAt` set rather than physical delete; restorable by admin
7. **AI confidence score** displayed in officer review; 90%/70% threshold commentary shown

---

## 12. User Engagement Findings & Initiatives

> **Last updated: 05 May 2026** — Compiled from user engagement session feedback, cross-referenced against URS §5.2 (SDoC), §5.3 (Special Approval), §5.4 (Renewal), §5.5 (IMEI), §5.7 (Importation), §5.13 (Payment), §5.18 (Admin Config).

### 12.1 Confirmed URS Gaps (SDoC)

| Gap | URS Reference | Initiative |
|---|---|---|
| Same 6 documents shown for all schemes; CoC mandatory for Scheme A only | §5.2.2, §5.4.3 | #4 |
| 6-month document validity rule not enforced or displayed | §5.2.1, §5.2.6 | #4 |
| Part C (Labelling: type + location) missing from wizard | §5.2.1 Part C | #4 |
| Part D (Registration Period 1–5 yr, capped by CoC validity) missing | §5.2.1 Part D | #4 |
| Confidence score is an internal routing signal; not for applicants | §5.2.4 | #2 |
| Document findings not surfaced specifically before submission | §5.2.6 | #3 |

### 12.2 Confirmed URS Gaps (Special Approval)

| Gap | URS Reference | Initiative |
|---|---|---|
| Low/Medium vs High Risk use different approval chains; not split in current wizard | §5.3.1, §5.3.2 | #5 |
| Prohibited flow requires offline meeting → Recommender uploads minutes → 3-tier digital chain | §5.3.3 | #5 |
| Payment triggers OIC/Recommender assignment — not clearly shown | §5.3.1 step 3–5 | #5 |
| SA Letter: system draft → OIC edits permitted fields only → OIC publishes | §5.3.3 step 5–7 | #5 |
| Personal purpose must be blocked for Prohibited equipment | §5.3 note | #5 |
| Document list must differ by risk tier; not fully generic | §5.3.1–5.3.3 | #5 |
| Reclassification between risk tiers not implemented | §5.3.4 | #5 |

### 12.3 Initiative Register

| # | Title | Scope | Size | Sprint | Status |
|---|---|---|---|---|---|
| 1 | My Applications: Categorised list with pagination | `screens-a.jsx` applications screen | S–M | 2 | **Done** |
| 2 | Remove compliance score from supplier view; replace with doc status | `shared.jsx`, `screens-a.jsx`, `screens-b.jsx` | S | 1 | **Done** |
| 3 | Document validation: surface specific findings per document | `screens-b.jsx` DocsStep + ValidationStep | S–M | 1 | **Done** |
| 4 | SDoC: scheme-specific documents, Part C/D, eSignature (Part E) | `screens-b.jsx` DocsStep, ProductStep, ReviewStep | M | 2 | **Done** |
| 5 | Special Approval: risk-tier split, SA Letter editor, prohibited rules | `screens-b.jsx` special-approval | L | 6 | **Done** |
| 6 | Importation: RCN auto-populate device details + block-on-error | `screens-g.jsx` | S–M | 4 | **Done** |
| 7 | Renewal: max period cap enforcer, expiry clarity, Scheme A CoC warning | `screens-a.jsx` cert-renewal, `screens-c.jsx` | S–M | 3 | **Done** |
| 8 | Supplier multi-user accounts: invite / join-request / admin approval | `screens-c.jsx` Profile Team tab, `mock.js` | M | 4 | **Done** |
| 9 | Fee editor: full inline edit with SST toggle, SST%, SST amount, total | `screens-e.jsx` FeeTab, `mock.js` feeStructure | S | 2 | **Done** |
| 10 | Admin workflow visualiser: flow diagram per application type, stage roles | `screens-e.jsx` WorkflowTab, `mock.js` | M | 5 | **Done** |
| 11 | Reports: team-level scope filter | `index.html` SCREENS.reports | S | 5 | **Done** |
| 12 | SST zeroing: all fee entries reset to round values; no SST applied in wizards | `screens-e.jsx`, `screens-a.jsx`, `screens-b.jsx` | S | 7 | **Done** |
| 13 | Table overflow: explicit column widths + horizontal scroll on all 21 tables | 7 component files | S | 7 | **Done** |
| 14 | Advanced filters: Scheme + AI Score on supplier Applications; Scheme + Priority + AI Score on Officer Queue | `screens-a.jsx`, `index.html` | M | 7 | **Done** |
| 15 | Scheme colour coding removed from table columns; neutral Tag replaces SchemeBadge | `screens-a.jsx`, `index.html` | S | 7 | **Done** |
| 16 | Account Registration Renewal wizard (Supplier/Principal/Consultant account renewal, 1–5 yr, grace period) | `screens-a.jsx` (new flow) | M | 8 | **Done** |
| 17 | Reclassification modal in Active Review — OIC reclassifies Scheme B↔A↔C with reason; sends back to applicant | `screens-b.jsx` officer-review | S | 8 | **Done** |
| 18 | SA Prohibited offline upload — Recommender uploads meeting minutes to unlock digital chain (§5.3.3 steps 2–3) | `screens-b.jsx` SA wizard | S | 9 | **Done** |
| 19 | SA Letter field-lock config tab in Admin Config — OIC-editable fields toggle per letter block | `screens-e.jsx` AdminConfig | S | 9 | **Done** |
| 20 | Iteration extension request — applicant requests extra time; officer approve/deny in Active Review | `screens-a.jsx`, `screens-b.jsx` | S–M | 9 | **Done** |
| 21 | Officer Calendar Blocking — mark unavailable dates; group lead transfer-assignments modal | `screens-c.jsx` profile | M | 10 | **Done** |
| 22 | Principal Management tab — supplier adds/removes Principals; LoU + LoA upload per principal | `screens-c.jsx` profile new tab | M | 10 | **Done** |
| 23 | Report & All-Applications export — CSV/XLSX download via browser Blob; mock data only | `index.html` reports, `screens-a.jsx` | S | 11 | **Done** |
| 24 | Application expiry lapse display — 60-day draft countdown; "Lapses in Nd" tag on drafts ≤30d; alert banner for ≤14d drafts | `screens-a.jsx` applications | S | 11 | **Done** |
| 25 | Admin config: Equipment Type & Technical Code master list tab | `screens-e.jsx` AdminConfig | S | 11 | **Done** |
| 26 | Admin config: Notification template editor tab (email/SMS HTML templates) | `screens-e.jsx` AdminConfig | S | 11 | **Done** |
| 27 | Content Manager role: Switch Profile card; announcements-only nav; cm-dashboard / cm-announcements / cm-faq screens | `index.html`, `screens-e.jsx`, `mock.js` | S | 12 | **Done** |
| 28 | Bilingual BM toggle — EN/BM language switch in header; BM string coverage for external + public portals | All screens | L | 12 | **Done** |
| 29 | Applicant grace-period account status — dashboard error banner + blocked new-app buttons + Profile Account Status row | `screens-a.jsx`, `screens-c.jsx`, `index.html` | S | 13 | **Done** |
| 30 | Role-aware officer decision panel — Recommender / Verifier / Approver get distinct decision options + approval chain position badge | `screens-b.jsx` | S | 13 | **Done** |
| 31 | Application status timeline — new "Status Timeline" tab in ApplicationDetail showing all stages (Draft → Submitted → AI Validation → Review → Decision) with actor, role badge, and notes | `screens-a.jsx` | S | 13 | **Done** |
| 32 | Payments invoice/receipt drawer — click any transaction row to open a styled MCMC invoice with PAID stamp, line items, SST-exempt note; real Blob `.txt` download; Export CSV wired | `screens-c.jsx` | S | 14 | **Done** |
| 33 | Role-aware All Applications — team-lead/officer navigating to "All Applications" sees cross-supplier master table with bulk-select, bulk assign modal, status/scheme filters, export; supplier sees own list unchanged | `screens-a.jsx` | S–M | 14 | **Done** |
| 34 | Certificate Blob download — "Download Certificate" generates formatted mock certificate `.txt` via Blob; "Print Label" downloads ASCII label template with RCN, brand, model, expiry | `screens-c.jsx` | S | 14 | **Done** |

#### Sprint Roadmap (Planned)

| Sprint | Theme | Initiatives | Size | Goal |
|---|---|---|---|---|
| **8** | Applicant workflow completeness | #16 Account Renewal · #17 Reclassification modal | M + S | Close the two highest-visibility applicant-side gaps; both demoed from supplier login |
| **9** | Special Approval + iteration | #18 Prohibited offline upload · #19 SA Letter config · #20 Iteration extension | S + S + S–M | Complete the SA prohibited flow end-to-end; add iteration extension for all scheme types |
| **10** | Officer & principal management | #21 Officer Calendar Blocking · #22 Principal Management tab | M + M | Round out officer admin and supplier profile; needed for realistic TL/officer demos |
| **11** | Reporting & admin polish | #23 Export CSV/XLSX · #24 App expiry lapse · #25 Equipment Type master list · #26 Notification templates | S × 4 | Small-effort items that complete the admin config and add export capability |
| **12** | Roles & bilingual | #27 Content Manager role · #28 Bilingual BM toggle | S + L | Content Manager completes role coverage; BM toggle implemented for supplier-facing screens and public portal |
| **13** | Polish & workflow fidelity | #29 Grace-period status · #30 Role-aware decision panel · #31 App status timeline | S × 3 | Close last URS gaps; differentiate officer-tier decision flows; add per-application progression view |
| **14** | Payments, certificates & officer views | #32 Invoice drawer · #33 Officer All-Applications · #34 Certificate download | S + S–M + S | Full invoice/receipt experience; split supplier vs officer app list; real certificate/label download |
| **15** | UX completeness & smart automation | #35 Scheme C auto-cert fast-track · #36 Supplier user management · #37 Global search | S + M + M | Close URS §5.2.4 auto-accept gap; multi-user supplier team management; functional app-wide search panel |
| **16** | Dashboard & decision polish | #38 Officer Dashboard · #39 Supplier dashboard activity feed · #40 Fraud signals in Active Review | M + S + S | Dedicated officer landing page for all 5 roles; live supplier activity feed + cert health; fraud detection panel closing §5.14 gap |
| **17** | Workflow completeness (URS benchmark gaps) | #41 Modification → Officer Queue integration · #42 Certificate version history viewer · #43 Document date validation (6-month rule) · #44 Public document repository · #45 Suspended supplier block demo · #46 Officer full task list | S + S + S + S + S + M | Close the six highest-priority prototype gaps identified in the URS §4.X benchmark (06 May 2026); all implementable without real backend |

---

#### Sprint 1 Completion Notes (2026-05-04)

**Initiative #2 - Compliance score removed from supplier view:**
- `AiScoreCard` with numeric score removed from SDoC AI validation step, ReviewStep sidebar, application-detail "Document Validation" tab, onboarding step 4, and renewal step 2
- "Compliance Score" column in applications list replaced with "Validation" tag (No issues / Items to review) keyed off `aiScore >= 90`
- `AiScoreCard` with `supplierMode` retained only in `officer-review` (MCMC internal, line 786 of screens-b.jsx)

**Initiative #3 - Document validation findings per document:**
- Added `MOCK.documentFindings` (6 entries): one per document type with `status` and `findings[]` array of `{ field, note }` guidance items
- Added `DocFindingsPanel` component in `screens-b.jsx`: summary counts (Accepted / Items to review), per-document cards with per-field notes, guidance alert stating findings are not blockers
- SDoC validation spinner text changed to "Checking your documents..." (no AI reference)
- Renewal step 2 replaced with 5-item per-document verified checklist showing specific acceptance notes
- Onboarding step 4 replaced with neutral "Verification complete" alert

#### Sprint 2 Completion Notes (2026-05-04)

**SDoC Wizard — Scheme-specific flows aligned to URS:**
- Scheme descriptions corrected per URS §5.2: Scheme A = "SDoC with Certification" (High Risk), Scheme B = "SDoC with Verification" (Medium Risk), Scheme C = "SDoC (Self-Declaration)" (Low Risk)
- Registration fees set to RM 350/250/150 per year per Appendix B (no SST — see Sprint 7 note); total fee = base × period
- Part C (Labelling) fields added to Product step: Labelling ID (Supplier/Principal), Label Type (Physical/Electronic), Label Location (Product/Packaging/User Manual)
- Part D (Registration Period) Segmented control (1-5 years) added to Review step sidebar; fee breakdown shows base × period = total dynamically
- Document list is now scheme-aware: Scheme A and B require Certificate of Conformity (CoC); Scheme C uses a Standards Declaration letter only (no CoC required); CoC number and date fields shown conditionally
- Scheme C ConfirmStep shows auto-acceptance eligible alert with "decision within 1 working day" message
- SLA dates in ConfirmStep differ by scheme (A: 5 wd, B: 3 wd, C: 1 wd)

**eSignature (Part E) — all registration and renewal flows:**
- New "Declaration" step added to SDoC wizard between Review (step 4) and Payment (step 6)
- New "Declaration" step added to Cert Renewal wizard between Document Re-check (step 2) and Payment (step 4)
- Special Approval Declaration step upgraded from a simple text input to a full signing flow
- Declaration step contains: application/renewal summary, numbered statutory clauses referencing CMA 1998, DSA 1997 notice, full-name + NRIC inputs, signature preview panel
- Warning Alert at top: "Once signed, you cannot go back to amend your application"
- "Sign Declaration" button requires all declaration checkboxes ticked + name (min 4 chars) + NRIC (min 6 chars)
- After signing: `signed = true`; Back button becomes disabled for all upstream steps; Continue/Pay blocked until signed
- Cert Renewal Declaration step also includes the period selector (1-5 yr) with note that changing period resets signature

**Bug fix — declaration scroll reset:**
- Root cause: `<StepBody />` where `StepBody` is a new function reference on every render caused React to unmount/remount the component on each keystroke, resetting scroll position
- Fix: changed to `{stepBodies[step]()}` — step bodies are called as functions, not rendered as JSX components; no unmount/remount on parent re-render
- Scheme C label further updated: "SDoC (AI Auto-Acceptance)" corrected to "SDoC (Self-Declaration)"; confirmation alert changed to "Expedited review"

#### Sprint 2 (remaining) + Sprint 3 Completion Notes (2026-05-04)

**Initiative #9 - Fee editor (screens-e.jsx FeeTab):**
- `feeStructure` schema introduced: `baseFee` (numeric), `sstEnabled` (bool), `sstPct` (number)
- FeeTab shows 6 columns: Scheme/Type, Basis, Actual Fee (editable), SST toggle + SST% (editable when enabled), SST Amount (auto-calculated), Total (auto-calculated, highlighted)
- Inline edit mode per row: click pencil icon to enter, Save/Cancel per row, Publish button activates only after unsaved changes exist
- SST toggle disables SST% and zeroes SST amount when off; SST% field only visible when SST is enabled
- Note: Initial implementation used back-calculated bases (324.07/231.48/138.89) to arrive at RM 350/250/150 incl. SST — superseded by Sprint 7 (all SST zeroed, bases reset to 350/250/150)

**Initiative #1 - My Applications categorised list (screens-a.jsx):**
- Applications screen upgraded from a Segmented status filter to a tabbed layout: All | SDoC | Special Approval | Renewals — each tab shows a count badge
- Status filter moved to a Select dropdown (All statuses / Draft / Under Review / Needs action / Approved / Rejected) alongside a live search box
- Pagination added: 8 rows per page with total count shown
- Warning banner appears at the top if any applications are in `iteration_required` state, with direct link to filter
- Type column shows application category label (SDoC / Special Approval / Renewal) below the scheme badge
- Empty state shows Ant Design Empty component when no results match filters

**Initiative #7 - Renewal max period cap and Scheme A CoC warning (screens-a.jsx):**
- `COC_EXPIRY` map added (keyed by RCN) providing CoC expiry dates for Scheme A certificates
- `maxRenewYears(cert)` computes: `min(5 − yearsUsed, cocYearsLeft)` for Scheme A; `5 − yearsUsed` for Scheme B/C
- Certificate selector (step 0) now shows four data points per card: Current Expiry, Max Renewal, CoC Expiry (Scheme A only), tags for "Expiring Soon" and "CoC expiring soon"
- Inline alert appears on selected Scheme A card if CoC expires within 12 months, explaining why the renewal period is capped and directing user to upload a renewed CoC
- Declaration step period Segmented control: options beyond `maxYears` are disabled; cap reason displayed below selector
- Document list (step 1) dynamically adds "Certificate of Conformity (CoC)" as a required re-upload for Scheme A renewals

#### Sprint 4 Completion Notes (2026-05-04)

**Initiative #6 - Importation RCN improvements (screens-g.jsx):**
- `validateError` state added; `doValidate()` now sets `validateError = true` on failure instead of a disappearing toast — inline `antd.Alert` type="error" stays visible until the user edits the reference field
- Error Alert shows valid test RCN values for demo purposes
- On success the Review step (step 5) now renders two additional rows: "Scheme" (coloured tag from `validatedProduct.scheme`) and "Brand / Manufacturer" (from `validatedProduct.brand`)
- Scheme C permit type description corrected: "AI-accepted or officer-reviewed" removed, replaced with "Expedited review"
- `resetWizard()` clears `validateError` to ensure clean state on new applications

**Initiative #8 - Supplier multi-user join-request flow (screens-c.jsx + mock.js):**
- `MOCK.joinRequests` added: 2 pending users registered with company SSM BRN `201901023456` with name, email, intended role, registration timestamp, and a brief message
- `TeamTab` now manages local `joinReqs` state initialised from `MOCK.joinRequests`
- Pending requests section renders above the team table when `joinReqs.length > 0` — bordered card with warning colour, explains the SSM BRN match, lists each request with avatar, name, role tag, email, message, and request date
- Each row has Approve and Reject buttons with loading states; Approve removes from pending list and shows a success message; Reject removes from list and shows an info message
- Return value refactored from a single `antd.Card` to `antd.Space` wrapping the optional pending-requests card and the existing team members card

#### Sprint 5 Completion Notes (2026-05-04)

**Initiative #10 - Admin Workflow Visualiser (screens-e.jsx):**
- New `FlowDiagramTab` component added to AdminConfig between "Workflow Config" and "AI Thresholds" tabs
- Application type selector (Radio.Group button style): SDoC A/B, SDoC C, Special Approval, Renewal, IMEI, Importation
- Per-type workflow definition (`WORKFLOWS` object) specifies: label, badge, total SLA, explanatory note, and an ordered `stages` array
- Each stage carries: step number, label, responsible role (with colour-coded Tag), SLA, and a list of key actions
- Visual flow renders as a horizontally-scrollable flex row of 200px cards connected by "→" separators; each card has a "Step N" pill header, role tag, SLA, and bullet list of actions
- A stage summary table below the flow diagram shows all stages in tabular form for quick reference
- Workflow data covers all 6 application types: SDoC A/B (7 stages), SDoC C (4 stages), Special Approval (6 stages), Renewal (3 stages), IMEI (3 stages), Importation (5 stages)

**Initiative #11 - Reports Scope Filter (index.html):**
- `MOCK.officerPerformance` extended: 3 officers from CPPG-SA-01 team added (EN. Zulkifli, Pn. Maziah, En. Hairul) bringing total to 8 officers across 2 teams
- `scope` state added to Reports screen (default `'team'`); `myTeam` derived from `currentUser?.team`
- Scope Segmented toggle rendered in header: "My Team (CPPG-TL-01)" / "All CPPG"
- `officers` computed from scope: `scope === 'team'` filters `officerPerformance` to `o.team === myTeam`; `'all'` shows all 8 officers
- KPI 4th tile dynamically changes label ("Team SLA" / "CPPG SLA"), value (live mean of filtered officers' `slaCompliance`), and colour (green ≥ 95%, warning otherwise)
- Officer SLA chart title and height adapt to scope: height = `max(200, officers.length × 32)` so all bars are legible
- "All CPPG" view adds an informational Alert showing total officer count and offering hint to switch back to team scope
- Page subtitle appended with team name or "All CPPG teams"

#### Sprint 6 Completion Notes (2026-05-05)

**Initiative #5 - Special Approval full (screens-b.jsx):**
- **6 purposes** (up from 4): Personal Use, PoC, Trial/Market Survey, Demonstration, R&D, Prohibited Equipment — each carries an explicit `tier` field
- **4 risk tiers** with full metadata: Low Risk (3 wd, CPPG Officer only), Medium Risk (7 wd, + Recommender), High Risk (14 wd, + Verifier), Restricted/Prohibited (30-45 wd, + Head of Cert + DG MCMC)
- **Dynamic tier escalation**: selecting a jammer/SDR/scanner equipment type in step 1 auto-escalates any base tier to Restricted; custom RF device escalates to High Risk
- **TierBadge** rendered in the page header alongside the SA tag — updates live as user selects purpose and equipment type
- **Step 0**: purpose cards now show risk tier tag (green/orange/red) and RESTRICTED label per option
- **Step 1**: live approval chain alert shows colour-coded chain of role tags and expected SLA; tier-escalation notice shown when equipment type triggers escalation
- **Step 2**: manufacturer, model, quantity, frequency range wired to state (used in SA Letter); Prohibited tier shows additional operating conditions list inline
- **Step 3**: tier-specific document list (`DOC_LISTS` object keyed by tier) — 3 docs for Low, 4 for Medium, 7 for High, 10 for Restricted; each list shows Required/Optional tags and tier-specific notes
- **Step 4 (Declaration)**: approval chain alert replaces the old hard-coded prohibited-only alert; extra prohibited checkboxes added (unannounced inspection acknowledgement)
- **Step 5 (Confirm)**: redesigned with three sub-tabs:
  - *Application Summary*: Descriptions table with purpose, tier, equipment, manufacturer/model, applicant, signer
  - *Draft SA Letter*: styled MCMC letterhead mockup with "DRAFT" watermark, filled equipment block, numbered conditions (Restricted tier adds shielding condition), signature block stub
  - *Approval Chain*: Timeline component showing each sequential approval step with available actions per step
- Continue button gated: step 0 requires purpose, step 1 requires equipment type selection

#### Sprint 7 Completion Notes (2026-05-05)

**SST Zeroing — all fee structures (`screens-e.jsx`, `screens-a.jsx`, `screens-b.jsx`):**
- All 14 `feeStructure` entries in `mock.js` updated: `sstEnabled: false`, `sstPct: 0`
- `baseFee` values corrected to round Appendix B figures: Scheme A RM 350, Scheme B RM 250, Scheme C RM 150 (was back-calculated 324.07/231.48/138.89)
- Same correction applied to Renewal rows (fee-12/13/14)
- SDoC wizard (`screens-b.jsx`): `baseRates = { A: 350, B: 250, C: 150 }`; removed `sstRate`, `sstAmt`; `totalFee = baseFee`; removed SST line item, "(excl. SST)" and "Incl. SST 8%" labels
- Renewal wizard (`screens-a.jsx`): `baseRateMap = { A: 350, B: 250, C: 150, SA: 350 }`; same removal of SST from fee breakdown display
- Fee Structure admin screen retains SST columns (toggle + %) for future use when SST policy is confirmed

**Table overflow fixes — all `antd.Table` instances across platform:**
- Problem: long App IDs and status text wrapping across multiple lines in narrow columns
- Fix applied globally: `scroll={{ x: 'max-content' }}` on every table + explicit `width` on every column
- Long-text columns (Product, Company, Notes, Reason): `ellipsis: true` with tooltip on hover
- Code/ID columns: `render: v => <span style={{ whiteSpace: 'nowrap' }}>...</span>`
- Files updated: `screens-a.jsx` (Applications), `screens-b.jsx` (Supplier Directory), `screens-c.jsx` (Certificates, Payments, Team Members), `screens-d.jsx` (Suppliers Onboarding, Past Permits, PMS Audit), `screens-g.jsx` (Import Permits), `screens-i.jsx` (Knowledge Base), `screens-j.jsx` (Supplier Compliance, Certificate Compliance)

**Advanced filters — supplier Applications screen (`screens-a.jsx`):**
- New collapsible "Filters" panel below the search row, toggled by a badge-button showing active filter count
- Scheme filter: `antd.Checkbox.Group` (All / Scheme A / Scheme B / Scheme C / Special Approval / Renewal / IMEI)
- AI Score filter: `antd.Select` (All / Validated (≥90%) / Needs Review (<90%) / Not scored)
- Filter chain: typeTab → statusFilter → schemeFilter → aiFilter → search
- Active count badge on trigger uses `advCount = schemeFilter.length + (aiFilter !== 'all' ? 1 : 0)`
- `FilterOutlined` icon added to imports; fallback to `SearchOutlined` if unavailable

**Advanced filters — Officer Queue (`index.html` OfficerQueue):**
- Same collapsible Filters panel pattern added to queue header
- Scheme filter: `antd.Checkbox.Group` (Scheme A / Scheme B / Scheme C / Special Approval)
- Priority filter: `antd.Select` (All / High / Medium / Low)
- AI Score filter: `antd.Select` (All / Validated / Needs Review / Not scored)
- Search field moved into card header alongside the Filters button
- Filter chain: segmented-tab base list → qScheme → qPriority → qAi → qSearch
- Switching the segmented tab (My / Team / Unassigned) resets all advanced filter state
- `advCount = qScheme.length + (qPriority !== 'all' ? 1 : 0) + (qAi !== 'all' ? 1 : 0)`

**Scheme colour coding removed — both table columns:**
- `SchemeBadge` with colour classes (red/orange/green/purple) replaced by plain `antd.Tag` (neutral) in:
  - Applications list type/scheme column (`screens-a.jsx`)
  - Officer Queue scheme column (`index.html`)
- `SchemeBadge` component and its colour CSS classes retained for non-table use (wizard steps, detail drawers)

#### Sprint 8 Completion Notes (2026-05-05)

**Initiative #16 — Account Registration Renewal (`screens-a.jsx`):**
- New `SCREENS['account-renewal']` — 4-step wizard: Review Account → AI Revalidation → Payment → Confirmation
- Step 0: Descriptions table shows all profile fields with "Verified" tags; Segmented period selector (1–5 yr, capped to `5 − yearsUsed`); live fee breakdown (RM 100 reg + RM 50 × period = total) with new expiry date
- Grace period alert at top: dynamic warning (error if ≤30 days) showing expiry date and grace-period cutoff
- Step 1: 2.2 s AI spin → success result with 5-item document checklist (SSM doc, address, PIC, nature of business, PDPA) all showing "✓ OK"; confidence score 96% shown
- Step 2: Same 4-method payment radio group (FPX / Card / DuitNow / Invoice) as cert-renewal
- Step 3: `antd.Result` success with Descriptions (Supplier ID, period, new expiry, amount, reference); confirmation email alert
- Dashboard: "Account Expiring" `antd.Alert` banner (warning/error based on days left) rendered when `daysLeft ≤ 90`; "Renew Account" CTA button in banner; `+ Account Registration Renewal` quick action added to Quick Actions card
- `account-renewal` added to `SUPPLIER_ONLY` set in `index.html` (officer/admin access blocked)

**Initiative #17 — Reclassification Modal in Active Review (`screens-b.jsx`):**
- `decision` Radio.Group extended with 4th option: `reclassify` (purple, `#7B3FA0`) — "Reclassify · Change scheme — applicant must resubmit"
- When `reclassify` selected: inline panel renders below radio group showing: current scheme badge, "Reclassify to" `antd.Select` (A/B/C with current scheme disabled), dynamic upgrade/downgrade `antd.Alert`, reason `TextArea` (min 10 chars to enable confirm)
- "Confirm Reclassification" button opens `antd.Modal` with summary `Descriptions` (From / To / Reason) + warning about applicant notification
- On modal OK: `reclassDone = true`; success message toast; radio group replaced with green success alert; Submit Decision button disabled for reclassify path (reclassify has its own action)
- State vars added: `reclassScheme`, `reclassReason`, `reclassConfirmOpen`, `reclassDone`

#### Sprint 9 Completion Notes (2026-05-05)

**Initiative #18 — SA Prohibited Offline Meeting Upload (`screens-b.jsx` SA Wizard ConfirmStep):**
- State added: `minutesUploaded`, `minutesUploading`
- For `isProhibited === true`, the Confirm step (step 5) renders an inline panel above "SA Letter Preview" with two states:
  - **Before upload:** amber bordered panel — explains §5.3.3 offline meeting requirement; embedded "Officer Simulation" sub-panel showing meeting metadata (date, venue, attendees, outcome) and an "Upload Meeting Minutes (PDF)" button with loading state
  - **After upload:** green bordered panel — confirms Recommender identity and upload timestamp; renders a 6-step `antd.Timeline` (Offline Meeting → Minutes Uploaded → Recommender Review → Head of Certification → DG MCMC → SA Letter Issued) with first two steps green, third blue, remainder grey
- Upload button: 1.5 s simulated upload → `minutesUploaded = true` + success toast "digital approval chain unlocked"
- Non-prohibited tiers: panel is not rendered (conditional on `isProhibited`)

**Initiative #19 — SA Letter Field-Lock Config (`screens-e.jsx` AdminConfig):**
- New `SALetterConfigTab` component added between AI Thresholds and Announcements tabs
- Tab label: `<FileTextOutlined /> SA Letter Config`
- 14 letter fields across 5 sections (Header, Addressee, Body, Conditions, Signature) — each with `editable` bool and a note explaining the lock reason
- Renders as one `antd.Card` per section; each row: `antd.Switch` (Editable/Locked) + field label + descriptive note + `antd.Tag` ("OIC editable" / "System locked")
- Toggling any switch sets `dirty = true`; "Publish Changes" button activates only when `dirty`; on click: `dirty = false` + success toast
- Informational `antd.Alert`: changes apply to new SA applications only; in-progress applications retain existing permissions

**Initiative #20 — Iteration Extension Request:**

*Applicant side (`screens-a.jsx`):*
- States added: `extModal`, `extReason`, `extDays`, `extSent` (map of `appId → true`)
- Applications table actions column: for `iteration_required` rows, "Request Extension" button appears alongside "Respond" (hidden after a request is already sent — replaced by "Extension Requested" blue tag)
- Request Extension modal: application ID in alert; "Additional days needed" Select (7/14/21/30); reason TextArea (min 10 chars required to enable OK); on submit: `extSent[id] = true` + success toast

*Officer side (`screens-b.jsx` Active Review left panel):*
- New "Extension Requests" tab added to left panel `Tabs` (with `antd.Badge count={1}` indicator)
- Shows a mock pending request (14 days, submitted by Nurul Aisyah): current deadline 12 May, new deadline 26 May if approved; reason text
- Approve / Deny buttons; on action: status tag updates (green/red) and inline `antd.Alert` confirms new deadline or states original deadline stands

#### Sprint 10 Completion Notes (2026-05-05)

**Initiative #21 — Officer Calendar Blocking (`screens-c.jsx` Profile → Calendar Blocking tab):**
- New `CalendarTab({ cu })` function in `screens-c.jsx`, rendered for non-supplier users only
- Pre-seeded with 2 blocked periods (Annual Leave 19–22 May; Training 8–9 Jun)
- **Add Blocked Period Modal:** Block Type Select (Annual Leave / Medical Leave / Training / Public Holiday / Non-Working Day) + native date pickers + Notes TextArea; OK disabled until both dates filled; on save: new row added + toast "queue manager notified"
- Each blocked row shows type-coloured Tag, date range, notes, "Upcoming" status tag, and danger delete button with immediate toast
- **Team Lead additional panel:** amber warning card "Assignments pending during upcoming leave" listing 2 mock apps (owner, blocked dates); each row has "Transfer" button → Transfer Modal with `antd.Radio.Group` of up to 4 other officers (queue count + SLA shown) → confirm toast `{appId} transferred to {name}`
- Profile tabs array extended: `calendar` tab (ClockCircleOutlined) added for `!isSupplier` users; render section wired: `{tab === 'calendar' && !isSupplier && <CalendarTab cu={cu} />}`
- `CalendarOutlined` icon added to destructure block at top of `screens-c.jsx`

**Initiative #22 — Principal Management Tab (`screens-c.jsx` Profile → Principals tab):**
- New `PrincipalsTab()` function in `screens-c.jsx`, rendered for supplier users only
- Initializes from `MOCK.myPrincipals` joined with `MOCK.principalDirectory` (2 entries: Samsung verified, Sony pending LoA)
- Each linked principal card: Avatar (initials), name, category & country tags, linked date, LoU/LoA status tags (green Verified / orange Pending)
- **Add Principal — 2-step Modal:**
  - Step 0 — Select Company: `antd.Radio.Group` list from available (unlinked) directory principals with company name, country, category, ID; Next disabled until a selection is made
  - Step 1 — Upload Documents: amber alert for selected company; LoU and LoA upload rows (styled border changes green on upload); "Add Principal" disabled until both uploaded; simulated upload (instant click → tag turns green); on confirm: principal added to state + success toast
  - Back button in Step 1 returns to Step 0
- **Remove Principal Modal:** warning Alert + confirmation text with principal name; on confirm: removed from state + info toast "Principal unlinked"
- Profile tabs array extended: `principals` tab (IdcardOutlined) added for `isSupplier` users; render section wired: `{tab === 'principals' && isSupplier && <PrincipalsTab />}`
- Syntax error fixed: `React.parameter = React.useState(false)` → `React.useState(false)`

#### Sprint 11 Completion Notes (2026-05-05)

**Removals (housekeeping):**
- Removed suggestion infotip `antd.Alert` from SDoC `SchemeStep` (`screens-b.jsx:102`) — "Your product suggests Scheme A…" was hardcoded and misleading; scheme selection now starts unprimed
- Removed "Fee Offset & Refunds" card from the Payments screen (`screens-c.jsx`) — feature not in URS scope
- Removed `Public Portal` nav item from `NAV_TEAM_LEAD` (`index.html:106`) — officer/admin roles have no reason to navigate to the applicant-facing public portal

**URL Hash Routing (`index.html`):**
- Added `parseHash(hash)` + `buildHash(screenKey, sub)` utilities
- `App` state initialiser reads `window.location.hash` first (falling back to localStorage → default)
- `useEffect([screen])` writes `history.pushState(null, '', buildHash(screen))` on every screen change (skips `login` to keep URL clean)
- `useEffect([])` adds `popstate` listener so browser Back/Forward works
- `nav` prop passed to `ScreenComp` extended to accept optional `sub` param: `nav(screenKey, sub?)` — sub writes a sub-path `#/screen/subtab` for deep-linking into specific tabs
- "Copy link" icon button (`CopyOutlined`) added to header (before bell) — copies `window.location.href` to clipboard with success toast
- `CopyOutlined`, `LinkOutlined` added to icon destructure in `index.html`

**Initiative #23 — Export CSV/XLSX:**
- *Reports screen (`index.html`):* "Export PDF" stub replaced with `antd.Dropdown` (Export ▾) with two menu items: "Export CSV" and "Export XLSX". CSV: builds 2D array from `trend` data → `Blob` → anchor click → downloads `ncef-report-{period}.csv`. XLSX: same data as tab-separated → `application/vnd.ms-excel` mime → `.xls` file.
- *Audit Log screen (`index.html`):* "Export CSV" stub replaced with the same Dropdown pattern → exports filtered log rows (Timestamp, Actor, Role, Event, Application, Detail) with proper CSV quoting; XLSX variant same
- *Applications screen (`screens-a.jsx`):* Added Export ▾ dropdown button in header row → CSV of filtered application rows (ID, Scheme, Product, Brand, Model, Status, Updated)

**Initiative #24 — Application Expiry Lapse Display (`screens-a.jsx`):**
- Added `TODAY_APPS = new Date('2026-05-05')` and `DRAFT_LAPSE_DAYS = 60`
- `draftDaysLeft(a)` helper: computes `(lapseDate − today) / 86400s` where lapseDate = `updated + 60d`; returns `null` for non-drafts
- `expiringDrafts` = drafts with ≤14 days remaining
- Status column updated: draft rows with ≤30 days remaining show a coloured "Lapses in Nd" `antd.Tag` below the status pill (red ≤7d, orange ≤14d, gold ≤30d)
- Error-type `antd.Alert` banner at top of Applications list (above iteration alert) when `expiringDrafts.length > 0`: "N drafts will auto-lapse soon" with "View Drafts" action button that filters to draft status

**Initiative #25 — Equipment Type Master List (`screens-e.jsx` AdminConfig new tab):**
- `EquipmentTypeTab` component: `antd.Table` with 10 pre-seeded equipment types (code, name, eligible schemes, active toggle)
- Inline edit mode per row: code `antd.Input`, name `antd.Input`, scheme `antd.Select`, active `antd.Switch` — Save/Cancel buttons per row
- Delete row with immediate removal; dirty state gates "Publish Changes" primary button
- "Add Type" → Modal with code, name, scheme fields; OK disabled until code+name filled
- Tab label: `<TagOutlined /> Equipment Types`; added to `tabs` array between SA Letter Config and Announcements

**Initiative #26 — Notification Template Editor (`screens-e.jsx` AdminConfig new tab):**
- `NotifTemplateTab` component: left panel `antd.List` of 10 event templates (Application Submitted, Under Review, Iteration Required × 2, Approved, Rejected, Certificate Expiring, Payment Received, Account Expiring, Draft Auto-Lapse Warning); right panel editor
- Each list item: event name, channel tag (Email/In-App), `antd.Switch` active toggle (inline, without selecting that template)
- Editor panel: subject line `antd.Input` + email body `antd.Input.TextArea` (monospaced, 14 rows); variable hint (`{{appId}}`, `{{name}}`, etc.)
- "Preview" button → `antd.Modal` 620px with branded MCMC email mockup (blue header, pre-filled preview body with sample values)
- Dirty state per template; "Save" button appears when modified
- Tab label: `<BellOutlined /> Notification Templates`; Announcements tab icon changed to `<EyeOutlined />` to avoid duplication

#### Sprint 12 Completion Notes (2026-05-06)

**Layout fix (fixed chrome, scrollable content):**
- Outer `<Layout>` changed to `height:'100vh', overflow:'hidden'`; inner `<Layout>` same
- `<Sider>` restructured as flex column (`display:'flex', flexDirection:'column'`): logo div `flexShrink:0`, scrollable `<Menu>` div `flex:1, overflowY:'auto'`, MINA widget `flexShrink:0` at bottom
- `<Header>` given `flexShrink:0, zIndex:10` so it never scrolls away
- `<Content>` given `flex:1, overflowY:'auto', overflowX:'hidden'` — only content area scrolls
- CSS block updated: `html,body,#root {height:100%}`, `.ant-layout-sider,.ant-layout-header,.ant-layout-content` overrides for overflow and flex
- MINA widget moved from `position:absolute` to natural flex child with `padding:'0 16px 16px'`

**URL Hash Routing:**
- `parseHash(hash)` + `buildHash(screenKey, sub)` utilities added before `App()`
- App state initialiser reads `window.location.hash` → localStorage → default
- `history.pushState` on every screen change (skips `login`)
- `popstate` listener for browser Back/Forward
- "Copy link" header button (`CopyOutlined`) copies current URL to clipboard
- `nav(screenKey, sub?)` extended to write `#/screen/subtab` for deep-linking

**Initiative #27 — Content Manager role (`screens-e.jsx`, `index.html`, `mock.js`):**
- New profile in `MOCK.profiles['content-manager']`: Cik Siti Nabilah binti Roslan · Content Manager · `OFF-007` · `siti.nabilah@mcmc.gov.my`
- New `NAV_CONTENT_MANAGER`: Content Dashboard · Public Portal · Announcements · FAQ & Help · Profile & Settings
- `NAV_BY_ROLE` and `DEFAULT_SCREEN_BY_ROLE` extended: `'content-manager' → 'cm-dashboard'`
- Switch Profile modal and Tweaks panel radio extended to include content-manager; roleAccentColor `'#00796B'`
- `SCREENS['cm-dashboard']`: 4 stat cards (Published items / Drafts / Announcements / Help requests), recent activity list, quick actions, content health panel — all in `screens-e.jsx`
- `SCREENS['cm-announcements']`: list with publish/unpublish/pin/edit/delete; Add/Edit modal (title, body, language EN/BM/both, pin toggle)
- `SCREENS['cm-faq']`: category filter buttons, list with edit/publish/delete; Add/Edit modal (category, language, Q&A fields)

**Initiative #28 — Bilingual BM toggle (`index.html`, `screens-a.jsx`, `screens-k.jsx`, `shared.jsx`):**
- `window.STRINGS` EN/BM dictionary (100+ keys) added before `App()`: nav, dashboard, applications, login, status pills, public portal labels
- `window.t(lang, key)` convenience helper
- `lang` state (`'en'|'bm'`) added to `App`; language dropdown in header wires `setLang('en'/'bm')`
- `lang` prop passed to all `ScreenComp` renders
- Supplier-facing screens updated: `Dashboard` (KPI labels, welcome, quick actions, card titles), `Applications` (status filter, column headers, type tabs, action buttons, export), `Login` (form labels, submit button, demo hint)
- `StatusPill` in `shared.jsx` updated to accept `lang` prop; uses `window.t(lang, 'status_*')` keys; all callers pass `lang`
- Missing status keys added to STRINGS: `status_submitted`, `status_expired`, `status_priority` (EN + BM)
- `PublicPortal` (`screens-k.jsx`) updated to accept `lang` prop; hero title/subtitle, search placeholder/button, advanced search toggle, nav tabs, register button, cert status tags, FAQ title all use `T()` via new `pub_*` string keys

---

#### Sprint 13 Completion Notes (2026-05-06)

**Initiative #29 — Applicant grace-period account status (`screens-a.jsx`, `screens-c.jsx`, `index.html`):**
- `TWEAK_DEFAULTS` extended: added `graceMode: false`
- Tweaks panel: added "Supplier grace period (§5.1.10)" `antd.Checkbox` (visible only when role = supplier)
- Dashboard: when `graceMode`, shows `type="error"` `antd.Alert` — "Account is in grace period — expires 05 Jul 2026. New applications are blocked." with "Renew Account" action button (replaces the existing 41-day account-expiry warning)
- Dashboard quick actions: "New SDoC" + "Special Approval" buttons wrapped in `antd.Tooltip` + `disabled={!!graceMode}`; IMEI Register button unaffected (IMEI/SN registration is permitted during grace period per §5.1.10)
- Profile: `SCREENS.profile` now accepts `tweaks` prop; passes `graceMode` to `ProfileTab`
- `ProfileTab`: "Account Status" description row added — Active (green ✓) vs Grace Period (orange tag + "Expires 05 Jul 2026 — renew to resume new applications") based on `graceMode`; grace-period `antd.Tag` also shown beside name in the avatar header row

**Initiative #30 — Role-aware officer decision panel (`screens-b.jsx`):**
- Approval chain position badge added above Decision heading — visible only for recommender/verifier/approver/team-lead roles; shows "APPROVAL CHAIN — STAGE N of 3", actor label, and escalation target (e.g. "Approving here escalates to the Verifier")
- Decision radio options now vary by role:
  - **Recommender**: Recommend · Return for Revision · Do Not Recommend
  - **Verifier**: Verify & Escalate · Request Clarification · Refer Back to Recommender · Reject
  - **Approver / Team Lead**: Approve · Request Iteration · Return to Verifier · Reject
  - **Officer (generic)**: unchanged original four options (Approve / Request Iteration / Reclassify / Reject)
- Submit button label changes by role: "Submit Recommendation" / "Submit Verification" / "Submit Final Decision" / "Submit Decision"
- Reclassify option in Recommender role excluded (Recommenders cannot reclassify scheme)

**Initiative #31 — Application status timeline tab (`screens-a.jsx`):**
- New `key: 'timeline'` tab added to ApplicationDetail `antd.Tabs` — label: "Status Timeline"
- Renders `antd.Timeline` with up to 7 entries depending on `a.status`: Draft → Submitted → AI Validation (with score note) → Auto-assigned → Under Review → Iteration Requested (if status=iteration_required) → Approved/Decision Pending
- Each item shows: stage name · role `antd.Tag` (Supplier/System/Team Lead) · date + actor · descriptive note
- Future (pending) stages rendered at 60% opacity with "Pending" tag
- Timeline colour codes: blue = supplier action, cyan = system/AI, purple = officer, orange = iteration, green = approved, gray = pending

**Spec fixes:**
- Notification Template Management gap table entry corrected — marked ✅ Done (Sprint 11 #26 was already implemented)
- Applicant grace-period gap table entry updated to ✅ Done (Sprint 13 #29)
- Summary table updated; role-coverage and admin-config rows fully resolved

---

#### Sprint 14 Completion Notes (2026-05-06)

**Spec fix — Fee Offset & Refunds:**
- Removed from Sprint 11 code (`screens-c.jsx`) but prototype mapping and completion notes still referenced it. Corrected the "Payments & Invoices" row in the prototype mapping to accurately reflect current state: invoice/receipt drawer, export CSV, billing info — no Fee Offset card.

**Initiative #32 — Payments invoice/receipt drawer (`screens-c.jsx`):**
- `selectedPay` state added; clicking any transaction row or the eye icon opens a right-side `antd.Drawer` (520px)
- Drawer shows a styled mock invoice: MCMC logo letterhead, receipt number, date, application ID, payer, payment method; itemised fee row (NCEF Registration Fee) + SST Exempt line; coloured total (green=paid, orange=pending)
- "PAID" watermark overlaid at 20° rotation when `status === 'paid'`; `antd.Alert` confirms payment or warns pending
- "Download Receipt" drawer button → `downloadReceipt()` Blob of formatted `.txt` file → `MCMC-Receipt-{id}.txt`
- Row-level download icon also calls `downloadReceipt()`; eye icon opens drawer
- "Export CSV" header button now wired to `exportCsv()` — real Blob download of all transactions

**Initiative #33 — Role-aware All Applications (`screens-a.jsx`):**
- `SCREENS.applications` now accepts `currentUser`; if role is not `supplier`, renders new `OfficerAllApplications` component instead of the supplier's own list
- `OfficerAllApplications`: expands `MOCK.assessments` with 4 additional cross-supplier mock rows (OPPO, Xiaomi, TP-Link, Huawei) each carrying `applicant` + `supplierId`
- Table columns: App ID · Applicant (with supplier ID sub-line) · Product · Scheme · Status · AI Score (coloured tag) · Submitted · Review button
- Filters: free-text search (app ID, product, applicant, supplierId), Status dropdown, Scheme multi-select
- Pagination: 10 rows/page with "N–M of total" summary
- Bulk-select checkboxes (team-lead/approver only): Dropdown with "Export selected", "Bulk assign…" (opens `antd.Modal` with officer picker + note), "Flag for priority review"
- Export CSV works on selected rows or all filtered rows
- Supplier view unchanged — same experience when role = supplier

**Initiative #34 — Certificate Blob download (`screens-c.jsx`):**
- `downloadCertPdf()` in `CertificateDetail`: generates formatted ASCII certificate mockup with MCMC header box, RCN, product details, scheme, dates, issuing officer, legal reference (CMA 1998 Act 588), verify URL → Blob download `NCEF-Certificate-{rcn}.txt`
- `downloadLabel()`: generates compact ASCII label template (8 rows, 40 chars wide) with RCN, brand, model, expiry, QR reference → Blob download `NCEF-Label-{rcn}.txt`
- Both buttons in `CertificateDetail` wired; "Download PDF" renamed "Download Certificate"; `antd.message.success` confirms each download
- Table-level download icon now opens the detail drawer (consistent — download from within drawer)

---

#### Sprint 15 Completion Notes (2026-05-06)

**Initiative #35 — Scheme C Auto-Certification Fast-Track (URS §5.2.4)**

`screens-b.jsx` (`SDoCWizard`):
- Added `mockDocScore` state: Scheme C = 94, B = 78, A = 72. `isAutoCert = scheme === 'C' && mockDocScore >= 90`
- `AIStep`: when `aiDone` and `isAutoCert`, shows green `antd.Alert` with `RobotOutlined` icon — "Auto-certification eligible — Score 94/100" with URS §5.2.4 reference before `DocFindingsPanel`
- `ConfirmStep`: branches on `isAutoCert` — auto-cert path shows:
  - `SafetyCertificateOutlined` success icon (green circle)
  - "AI Auto-Certified · §5.2.4" tag
  - "Certificate Issued" heading (not "Application Submitted")
  - Immediately shows `RCN-0526-00512`, valid-until date, AI score, fee paid in a green gradient card
  - Inline `downloadAutoCert()` Blob download (ASCII certificate with MCMC header, product details, CMA 1998 reference, verify URL)
  - Buttons: Download Certificate · View My Certificates · Go to Dashboard
- Manual-review path (Scheme A/B) unchanged — still shows "Application Submitted" with SLA date

`data/mock.js`:
- Added `autoCertified: [...]` array with 3 mock auto-cert records (RCN, issuedAt, certExpiry, aiScore)

`index.html` (`OfficerQueue`):
- Added `autoCertList` from `MOCK.autoCertified`
- Added 4th Segmented tab "Auto-certified (3)" with `RobotOutlined` icon (team-lead only)
- Auto-cert tab renders: info `antd.Alert` explaining §5.2.4 + dedicated table (App ID, Applicant, Product, AI Score, RCN Issued, Issued At, Valid Until, Status=green "Auto-certified" tag)
- Main queue table unchanged — only the tab switch shows auto-cert view

**Initiative #36 — Supplier User Management** *(already implemented in prior sprint — verified complete)*

`screens-c.jsx` `ProfileTab` already includes:
- `TeamTab` component: Team Members table (name, email, role, last login, status, suspended/active toggle, Remove action), search filter, role-permission info alert
- Join Requests inbox: pending users who registered with company BRN; Approve / Reject actions with loading state and toast feedback
- `InviteDrawer`: email + role select + optional message → sends invite with success feedback
- `data/mock.js` `teamMembers` (5 users) and `joinRequests` (2 pending) — both populated
- Tab only appears for `role === 'supplier'`

**Initiative #37 — Global Search Panel**

`index.html`:
- Added `searchOpen` + `searchQuery` state to `App`
- Header search bar replaced with styled `<div>` trigger showing "⌘K" shortcut hint; click opens search modal
- Added `keydown` listener for `Ctrl+K` / `⌘K` → opens modal; `Escape` → closes
- `GlobalSearchModal` component (before `App`):
  - `antd.Modal` 620px wide, `top: 80`, no default footer/close button
  - Auto-focuses input on open (`useEffect` + `inputRef`)
  - Search indexes: `MOCK.assessments` (by ID/product/brand/model/applicant), `MOCK.certificates` (by RCN/product/brand/scheme), `MOCK.notifications` (by title/body)
  - Results grouped by type (Applications / Certificates / Notifications) with section headers + icons
  - Each result row: title, monospace sub-label, status pill / tag, `ArrowRightOutlined`; hover highlight
  - Click navigates to target screen and closes modal
  - Empty state: "No results for '…'"
  - Empty query: "Quick Navigation" 3×2 grid of common screens
  - Footer: result count + "Press ↵ to open" hint

---

#### Sprint 16 Completion Notes (2026-05-06)

**Initiative #38 — Officer Dashboard (`index.html`)**

New `SCREENS['officer-dashboard']` component added to `index.html` (before the Plotly wrapper):
- Greeting header: "Good morning/afternoon/evening, {first name}" + role tag with role-accent colour + today's full date
- KPI row adapts by role:
  - Team Lead: My Queue / Team Pending (unassigned count) / Team Approvals Today / Team SLA %
  - Approver: Awaiting My Decision / Approved This Month / Avg Decision Time / My SLA
  - Other officer roles: In My Queue / Decisions This Week / Avg Turnaround / SLA Compliance
- "Next in Queue" spotlight card: shows the first queued application for the logged-in officer (product, applicant, App ID, scheme tag, AI score, SLA hours) with "Open Review" CTA. Shows `antd.Result` success state when queue is empty
- "My Recent Decisions" list: 5 hardcoded historical decisions with outcome tags (Approved / Recommend / Verified / Returned for Revision / Rejected)
- Right column: Quick Actions card (role-sensitive — approver/TL see Reports, all see Queue/Audit/Profile) + My Performance card (total approved/rejected/AI overrides/avg turnaround from `officerPerformance` mock)
- Team Snapshot card (team-lead only): up to 4 team members with avatar, queue count, SLA % badge
- All 5 officer nav arrays (NAV_TEAM_LEAD, NAV_OFFICER, NAV_RECOMMENDER, NAV_VERIFIER, NAV_APPROVER) now include `officer-dashboard` as the first item
- `DEFAULT_SCREEN_BY_ROLE` updated: all officer roles now land on `officer-dashboard` instead of `officer-queue`

**Initiative #39 — Supplier Dashboard Activity Feed + Certificate Health (`screens-a.jsx`)**

Right column of `SCREENS.dashboard` enhanced — replaces static notification list with two new widgets:

*Certificate Health widget:*
- 3 stat boxes: Active / Expiring / Expired count from `MOCK.certificates`
- If next expiring cert is ≤ 90 days away: shows orange/red countdown bar (`expires in Xd · product name`)
- "Manage Certificates →" button shortcut
- Bilingual labels (EN/BM via `lang`)

*Recent Activity feed:*
- Reads `MOCK.notifications.slice(0, 5)` — real data, not hardcoded strings
- Each item: category icon (emoji), title (bold if unread), relative date ("Today" / "Yesterday" / "Xd ago" relative to 2026-05-06), unread blue dot indicator
- Clickable — navigates to `notifications` screen
- "View all" link in card header

**Initiative #40 — Fraud Detection Signals Panel (`screens-b.jsx`)**

Added inline Fraud Signals panel in the right sidebar of `SCREENS['officer-review']`, inserted directly below `AiScoreCard`:

- When `aiScore >= 70`: green `antd.Alert` "No fraud signals detected — document hashes, supplier history, and submission patterns all clear"
- When `aiScore < 70` (warning): collapsed `antd.Collapse.Panel` with orange "2 Fraud Signals Detected" header showing:
  - AI confidence below threshold warning
  - Frequency band overlap with related pending application
- When `aiScore < 50` (critical — matches the mock "Jammer Device (R&D)" rejected app): 3 signals including:
  - 🔴 Document hash collision with a previously rejected application
  - 🔴 Supplier enforcement history (2 actions in 24 months)
  - 🟠 Submission pattern flagged by IntelliGenCE (3× same category in 30 days)
- Signals collapsed by default (non-intrusive); expand to see details
- Footer note: "Source: IntelliGenCE AI · Signals auto-logged to Audit Trail on review save"
- Closes gap E (Fraud detection) with a prototype-appropriate visual representation

**Gap table update:** Fraud detection in category E marked ✅ Done (Sprint 16 #40)

---

### 12.5 URS Gap Analysis — Remaining Prototype Gaps (as of 06 May 2026)

Cross-referencing the URS v1.7 requirements against the current prototype state. Items below are URS-mandated flows not yet fully prototyped. Items marked 🚫 are out-of-scope for the prototype (production-only).

#### A. High-Priority Gaps (directly visible in user demos)

| Gap | URS Reference | Affected Screen | Priority |
|---|---|---|---|
| ~~**Account Registration Renewal**~~ | §5.4.2 | ✅ Done — Sprint 8 | — |
| ~~**Reclassification modal (SDoC officer review)**~~ | §5.2.2–5.2.4 | ✅ Done — Sprint 8 | — |
| ~~**Prohibited Equipment offline acceptance upload (§5.3.3 step 2–3)**~~ | §5.3.3 | ✅ Done — Sprint 9 | — |
| ~~**Iteration period extension request**~~ | §5.1.2, §5.2.2 | ✅ Done — Sprint 9 | — |

#### B. Admin / Configuration Gaps

| Gap | URS Reference | Affected Screen | Priority |
|---|---|---|---|
| ~~**Officer Calendar Blocking**~~ — officers block leave/off-duty dates; group lead can transfer assignments during blocked period. | §5.18 | ✅ Done — Sprint 10 | — |
| ~~**Notification Template Management**~~ — System Admin edits HTML/text email templates via admin interface. | §5.16 | ✅ Done — Sprint 11 (#26) | — |
| ~~**Equipment Type & Technical Code master list**~~ | §5.18 | ✅ Done — Sprint 11 | — |
| ~~**Application expiry auto-lapse display**~~ — 60-day lapse countdown in Applications | §5.20.5 | ✅ Done — Sprint 11 | — |

#### C. Reporting & Export Gaps

| Gap | URS Reference | Affected Screen | Priority |
|---|---|---|---|
| ~~**Report export (CSV / XLSX)**~~ — Reports, Audit Log, and Applications all now export real CSV/XLSX via browser Blob | §5.15 | ✅ Done — Sprint 11 | — |

#### D. Flow / Role Gaps

| Gap | URS Reference | Affected Screen | Priority |
|---|---|---|---|
| ~~**Principal Management tab**~~ — Suppliers can add, remove, and manage linked Principals with LoU + LoA upload. | §5.1.4 | ✅ Done — Sprint 10 | — |
| ~~**Content Manager role**~~ — Manages announcements, FAQs, and documents on the Public Portal. Admin Config has Announcements but no Content Manager-specific role or login path in Switch Profile. | §5.1, §5.11 | ✅ Done — Sprint 12 | — |
| ~~**Applicant grace-period account status**~~ — After account expiry, a 6-month Grace status blocks new applications. | §5.1.10, §5.4.2 | ✅ Done — Sprint 13 (#29) | — |

#### E. AI & Automation Gaps (low demo impact, noted for completeness)

| Gap | URS Reference | Notes |
|---|---|---|
| ~~**Fraud detection**~~ — AI flags forged documents, duplicate applications, suspicious patterns for officer investigation. | §5.14 | ✅ Done — Sprint 16 (#40). Fraud Signals panel in Active Review right sidebar; 3-tier severity (green clear / orange warning / red critical); signals driven by aiScore threshold; IntelliGenCE attribution. Real AI call out-of-scope. |
| ~~**Scheme C auto-accept routing**~~ — Score ≥ 90 skips the officer queue; RCN issued immediately at payment confirmation. | §5.2.4 | ✅ Done — Sprint 15 (#35). SDoC wizard detects score ≥ 90 at AI step, ConfirmStep shows issued RCN + download. TL officer queue has "Auto-certified" tab. |
| **AI confidence feeds PMS** — Non-conformance records from PMS auto-adjust AI risk scoring thresholds. | §5.8 | Requires live AI backend; out-of-scope for prototype |
| **Real waiver code validation** — WaiverCodeInput accepts any 8-char code starting with `WVR-` (mock). | §5.13 | Backend out-of-scope |
| ~~**SA Letter editable fields**~~ | §5.3.3, §5.3.5 | ✅ Done — Sprint 9 (SALetterConfigTab in AdminConfig) |

#### F. Bilingual / Accessibility Gaps

| Gap | URS Reference | Notes |
|---|---|---|
| ~~**Bilingual UI (EN/BM)**~~ — URS §6.1 requires full English + Malay support on External and Public portals. | §6.1 | ✅ Done — Sprint 12 (supplier-facing screens + public portal; officer screens remain EN-only by design) |
| **WCAG 2.1 Level AA** — Accessibility compliance not verified in prototype. | §7.2 | Out-of-scope for prototype phase |

#### Summary Table

| Category | Open Gaps | Critical for Demo |
|---|---|---|
| Applicant workflow | ~~Account renewal~~, ~~iteration extension~~, ~~reclassification~~, ~~principal management~~, ~~draft expiry lapse~~, ~~grace-period status~~ — all resolved | — |
| Officer workflow | ~~Prohibited offline upload~~, ~~calendar blocking~~, ~~export CSV/XLSX~~, ~~role-aware decision panel~~, ~~application status timeline~~ — all resolved | — |
| Admin config | ~~Notification templates~~, ~~equipment type master list~~, ~~application expiry~~ — all resolved | — |
| Reporting | ~~Export CSV/XLSX~~ — resolved | — |
| Role coverage | ~~Content Manager~~ — resolved Sprint 12 | — |
| AI / automation | ~~Auto-accept routing~~ (✅ Sprint 15), ~~fraud detection~~ (✅ Sprint 16), waiver backend | Waiver backend out-of-scope for prototype |
| Bilingual / A11y | ~~BM translation~~ (supplier + public portal) — resolved Sprint 12; WCAG out-of-scope | — |

---

### 12.4 Key Design Decisions (from session)

- **Compliance score is strictly internal** — visible only in officer Active Review; never surfaced to applicants as a benchmark or pass/fail indicator
- **Document validation is guidance, not verdict** — findings shown as "please ensure…" items, not approval/rejection signals; "Next" blocked only on missing required documents
- **Special Approval flow must not be fully standardised** until MCMC confirms document requirements per risk/purpose combination — keep flexible until §5.3 requirements are signed off with client
- **SA Letter editability** is controlled by admin — OIC can only edit fields the admin has unlocked; full letter template and locked fields configurable in Admin Config (§10 workflow visualiser)
- **Renewal maximum cap** enforced at the duration selector — `max years selectable = 5 − yearsAlreadyUsed`; fee auto-updates per year selected
- **Importation "Next" block** — must resolve all duplicates and invalid-format entries before proceeding to payment step
- **Supplier multi-user** — join-request model: user registers with existing SSM BRN → pending approval by supplier admin; or supplier admin invites by email directly
- **Reports scope** — Team Lead sees their team by default; can optionally expand to org-wide; Normal Officer cannot access Reports (nav restriction already in place)

---

## 13. URS Benchmark — Prototype Coverage Assessment (06 May 2026)

> **Scope:** Sprint 16 baseline (40 initiatives) cross-referenced against URS v1.7 (30 March 2026).  
> **Method:** Component-level code inspection of screens-a through screens-l, index.html, mock.js; gap table reconciliation from §12.5; URS §4.X–§5.X traceability mapping.  
> **Result:** Prototype covers **~88% of URS functional requirements**. Remaining gaps are either prototype-implementable (targeted in Sprint 17) or backend-integration dependencies (out-of-scope for prototype phase).

---

### 13.1 Coverage by URS §4.X / §5.X Section

| URS §4.X | SDD §5.X | Prototype Status | Coverage | Key Gap |
|---|---|---|---|---|
| §4.1 User Management | §5.1 | ✅ Fully covered | 95% | SSO/2FA mocked; account-activation demo missing |
| §4.2 Equipment Registration | §5.2 | ✅ Fully covered | 95% | 6-month document date validation not enforced in wizard |
| §4.3 Special Approval | §5.3 | ✅ Fully covered | 90% | Fee breakdown by purpose/tier minimal; SA tier reclassification not demoed |
| §4.4 Renewal | §5.4 | ✅ Fully covered | 100% | — |
| §4.5 IMEI/SN | §5.5 | ✅ Fully covered | 95% | Error alert doesn't distinguish duplicate vs. format vs. out-of-range |
| §4.6 Modification | §5.6 | ⚠️ Partial | 75% | Modification requests not in officer queue; no version history viewer |
| §4.7 Importation | §5.7 | ✅ Fully covered | 95% | RMCD trader registration validation mocked |
| §4.8 Public Module | §5.10b | ⚠️ Partial | 85% | No downloadable document repository; chatbot UI-only |
| §4.9 Mobile App | §5.11 | ❌ Out-of-scope | 0% | Flutter app out-of-scope by design |
| §4.10 Payment | §5.12 | ✅ Fully covered (mocked) | 95% | MCMC Pay live gateway out-of-scope |
| §4.11 AI-Enabled | §5.13 | ✅ Fully covered (mocked) | 95% | Real OCR/ICR, ML fraud model out-of-scope |
| §4.12 Dashboard & Reporting | §5.14 | ✅ Fully covered | 90% | No full "My Tasks" list; no supplier compliance export |
| §4.13 Notification | §5.15 | ✅ Fully covered (templates) | 85% | SMTP integration out-of-scope |
| §4.14 Integration | §5.16 | ⚠️ Concept only | 50% | ESB/webMethods out-of-scope; all integrations mocked |
| §4.15 Configuration | §5.17 | ✅ Fully covered | 95% | — |
| §6 Human Interface | §6 | ✅ Fully covered | 90% | WCAG 2.1 AA out-of-scope |
| §7 Non-Functional | §7 | — | N/A | Architecture/security out-of-scope for prototype |

**Weighted coverage: ~88%** (excluding out-of-scope backend integrations and mobile app)

---

### 13.2 Fully Covered Sections (✅)

All of the following have working UI + mock data interactions:

- **§5.1 User Management** — Registration (two-layer), Principal/Consultant management, team join-request, role-based nav, grace period status, calendar blocking
- **§5.2 SDoC** — Scheme A/B/C full wizards, Parts A–E (labelling, period, eSignature), AI findings panel, reclassification, iteration + extension, auto-cert fast-track
- **§5.3 Special Approval** — 6 purposes, 4 risk tiers, dynamic escalation, SA Letter config, prohibited meeting minutes upload, 3-tier digital approval chain
- **§5.4 Renewal** — Account renewal, equipment renewal, period capping, AI revalidation, fee calculation
- **§5.5 IMEI/SN** — Bulk CSV upload, duplication validation, fee calculation (RM 0.50/IMEI, RM 0.15/SN), payment notice
- **§5.7 Importation** — Full form with RCN validation + block-on-error, RMCD redirect simulation, CoA confirmation
- **§5.8 PMS** — AI-proposed audit list, product sampling, supplier notification, audit findings, audit history
- **§5.9 Complaints** — Officer-entered complaint capture, complaint tracking with status lifecycle
- **§5.10 Compliance Status** — Status controls, audit trail with timeline, system-wide propagation concept
- **§5.12 Payment** — Payment wizard (FPX/Card/DuitNow/Invoice), fee notice, invoice/receipt drawer (PAID watermark), CSV export
- **§5.13 AI** — Document validation findings panel, risk score display, auto-acceptance (≥90%), fraud signals panel (3-tier severity)
- **§5.14 Dashboard & Reporting** — Supplier dashboard (KPI tiles, cert health, activity feed), Officer dashboard (role-aware KPIs, Next-in-Queue, team snapshot), master report (trend + officer performance + CSV export), audit trail export
- **§5.15 Notification** — In-app notification list, notification template editor (10 event types), dashboard alert banners
- **§5.17 Configuration** — Fee structure editor (inline, SST toggle), workflow visualizer, master data (equipment types, tech codes), SA Letter field-lock, officer calendar, notification templates

---

### 13.3 Partially Covered Sections (⚠️)

| Section | What's Implemented | What's Missing | Sprint 17? |
|---|---|---|---|
| **§5.2 — Document Date Validation** | Per-document findings panel shows guidance items | No "document is X days old, expires Y" warning; no 6-month gate blocking submission | ✅ #43 |
| **§5.6 — Modification Officer Queue** | Modification wizard + submission confirmation | Officer queue doesn't show modification requests; no officer Accept/Not Accept demo | ✅ #41 |
| **§5.6 — Version History** | Modification confirmed as submitted | No v1.0 → v1.1 version diff viewer on certificate detail | ✅ #42 |
| **§5.10b — Document Repository** | Public portal landing, search, FAQ | No downloadable procedure manuals, fee schedules, or tech standards | ✅ #44 |
| **§5.10 — Suspended Supplier Block** | Status controls + audit trail | No demo of suspended supplier being blocked from new SDoC | ✅ #45 |
| **§5.14 — Officer Task List** | "Next in Queue" spotlight (1 app) | No comprehensive paginated "My Tasks" list of all assigned applications | ✅ #46 |
| **§5.14 — Supplier Compliance Export** | Team Lead reports with CSV export | No "Export Active Suppliers" or "Compliance status change log" | Backlog |
| **§5.1 — Grace → Renewal Demo** | Grace period status + alert; renewal wizard exists | No end-to-end demo: supplier in grace → renew → access restored | Backlog |
| **§5.3 — SA Tier Reclassification** | SDoC A↔B↔C reclassification | Special Approval risk tier reclassification (Low→High) not demoed | Backlog |
| **§5.16 — Integration Architecture** | UI flows simulate redirects | No actual HTTP/API calls; ESB out-of-scope | Out-of-scope |

---

### 13.4 Completely Absent / Out-of-Scope

| Gap | URS Reference | Reason |
|---|---|---|
| Mobile Application (Flutter, Android/iOS/Huawei) | §5.11, §4.9 | Explicitly out-of-scope for prototype |
| Real MCMC Pay gateway + SIFS sync | §5.12.2 | Backend integration — design complete |
| Real AI document validation (OCR/ICR) | §5.13.1 | ML backend — design complete |
| Real fraud detection model | §5.13.1 | ML backend — design complete |
| Real email delivery (SMTP) | §5.15.1 | Backend integration — templates complete |
| Real ESB / external system calls (SIRIM, RMCD, SSM) | §5.16 | Backend integration — UI flows complete |
| AI chatbot (RAG/Milvus) | §5.10b.2 | LLM backend — widget UI exists |
| Public unauthenticated complaint submission | §5.9 | Requires backend; officer-entry method shown |
| Data migration (3-phase ETL) | §5.18 | Production implementation only |
| WCAG 2.1 Level AA compliance | §7.2 | A11y audit deferred to production |

---

### 13.5 Roles & Workflow Edge Cases Not Demoed

| Workflow Gap | URS Ref | Impact | Sprint 17? |
|---|---|---|---|
| Modification → officer queue → officer reviews → Accept/Not Accept | §5.6.3 | High — end-to-end flow broken | ✅ #41 |
| Suspended supplier attempts new SDoC → blocked | §5.10.2 | Medium — enforcement not visible | ✅ #45 |
| Major modification → redirect to new SDoC (blocking message) | §5.6.2 | Medium — conditional logic present but not demoed | Backlog |
| Supplier in grace period → renew → access restored | §5.1.10 | Medium — happy path not shown | Backlog |
| Full prohibited equipment 3-actor chain (different officers at each role) | §5.3.3 | Medium — single-user session limitation | Backlog |
| Verifier → Approver handoff in Active Review (same SA application) | §5.3.2 | Medium — role chain shown as timeline only | Backlog |
| Consultant (Category D) onboarding full lifecycle | §5.1 | Low — add/remove works; onboarding not shown | Backlog |
| IMEI duplicate error categorization (duplicate vs. format vs. range) | §5.5.2 | Low — general validation shown | Backlog |

---

### 13.6 Sprint 17 Initiatives — URS Gap Closure

**Theme:** Workflow completeness based on URS §4.X benchmark  
**Target:** Close 6 prototype-implementable gaps before client demo

| # | Initiative | URS Ref | File(s) | Size | Acceptance Criteria |
|---|---|---|---|---|---|
| **#41** | **Modification → Officer Queue Integration** | §5.6.3 | `index.html` (OfficerQueue), `data/mock.js` | S | OfficerQueue shows "Modification" tab (or badge) with 1 mock modification request; officer can click "Accept" or "Not Accept"; status updates in the modification screen |
| **#42** | **Certificate Version History Viewer** | §5.6.3 | `screens-a.jsx` (certificates list), `data/mock.js` | S | Certificates list row expander or drawer shows v1.0 → v1.1 diff with changed fields highlighted; version timeline with actor + date |
| **#43** | **Document Date Validation (6-month rule)** | §5.2.1, §5.2.6 | `screens-b.jsx` (SDoCWizard DocFindingsPanel) | S | Each uploaded document shows "Issued: DD MMM YYYY · Valid until DD MMM YYYY"; documents >6 months old show a yellow warning banner; "Next" remains enabled (guidance, not blocker, per design note 12.4) |
| **#44** | **Public Document Repository** | §5.10b.2 | `screens-k.jsx` (public-portal) | S | New "Resources" tab in public portal showing downloadable mock documents: Procedure Manual, Fee Schedule, Technical Code List, Application Forms; mock Blob download on each |
| **#45** | **Suspended Supplier SDoC Block Demo** | §5.10.2 | `screens-a.jsx` (dashboard / SDoC entry), `data/mock.js` | S | When `tweaks.role === 'supplier'` and `MOCK.accountStatus === 'suspended'`: "New Application" button in dashboard shows antd.Modal "Account suspended — you cannot submit new applications. Contact MCMC at ncef@mcmc.gov.my to resolve." |
| **#46** | **Officer Full Task List** | §5.14.1 | `index.html` (officer-dashboard) | M | Replace "Next in Queue" spotlight with a paginated antd.Table "My Assigned Applications" showing all apps assigned to current officer (filterable by status: Pending Review / Awaiting Info / Under Iteration); each row has "Open Review" button |

---

### 13.7 Stakeholder Demo Recommended Walkthroughs

**Session A — Applicant Workflows (25 min)**
1. Scheme C SDoC → AI auto-cert → RCN issued at payment (shows §5.2.4 auto-accept)
2. Scheme A SDoC → document findings panel → eSignature → submit → officer review assigns
3. Special Approval (Prohibited Equipment) → meeting minutes upload → 3-tier chain

**Session B — Officer Workflows (25 min)**
1. Officer Dashboard (Team Lead) → Next-in-Queue → Open Review → decision with fraud signals
2. Switch Profile to Normal Officer → restricted queue (own apps only) → no Reports access
3. Reclassification (B→A) → applicant receives iteration request → applicant responds
4. PMS: AI-proposed audit list → notify supplier → record findings

**Session C — Admin & Configuration (15 min)**
1. Fee structure editor → SST toggle → live calculation preview
2. SA Letter field-lock → OIC editable vs. locked fields
3. Notification template editor → preview HTML email
4. Equipment Type master list → add new type → appears in SDoC wizard

**Framing for out-of-scope items:**
> "The UI design and user flows for [MCMC Pay integration / AI document validation / email delivery / SIRIM/RMCD/SSM API calls] are complete. Backend integration is in parallel development and will be connected during implementation phase. The prototype demonstrates the exact user experience; the backend contracts are agreed and interfaces are mocked."

---

### 13.8 Production Readiness Checklist

| Item | Prototype Status | Production Requirement |
|---|---|---|
| Core workflows (SDoC, SA, Renewal, IMEI) | ✅ Complete | Deploy as-is |
| Officer review workflows | ✅ Complete | Wire to real DB |
| Role-based access control | ✅ Complete | Wire to Keycloak/AAD |
| Administrative configuration | ✅ Complete | Wire to config service |
| Reporting & export | ✅ Complete | Wire to analytics DB |
| Bilingual UI (EN/BM) | ✅ Complete | Add remaining officer screens |
| Compliance status management | ✅ Complete | Wire to enforcement DB |
| Payment flow | ⚠️ Mocked | Integrate MCMC Pay API |
| AI document validation | ⚠️ Mocked | Integrate ICR/OCR service |
| Email notifications | ⚠️ Mocked | Integrate SMTP (Postfix/SES) |
| External integrations | ⚠️ Mocked | Integrate via webMethods ESB |
| Mobile application | ❌ Out-of-scope | Flutter development required |
| Data migration | ❌ Out-of-scope | 3-phase ETL tool required |
| WCAG 2.1 AA | ❌ Out-of-scope | A11y audit + remediation |

---

### 12.6 Sprint 17 Completion Notes (2026-05-07)

**Theme:** Workflow completeness — URS §4.X gap closure  
**Commit:** `4b4f30d`  
**Bundle:** 14,041 lines · 933 KB  
**URS Coverage improvement:** 88% → ~92% (6 prototype-implementable gaps closed)

---

**Initiative #41 — Modification → Officer Queue Integration (`index.html` OfficerQueue, `data/mock.js`)**

Added `MOCK.modificationQueue` with 2 entries:
- `MOD-0426-00014` — Ericsson Router 6672 marketing name update (Minor, assigned to OFF-001)
- `MOD-0426-00015` — TP-Link AX73 model variant addition (Minor, unassigned)

OfficerQueue Segmented (Team Lead view) now has a 5th tab:
```jsx
{ label: <antd.Space size={4}><FormOutlined />{`Modifications (${modCount})`}</antd.Space>, value: 'modification' }
```

Modifications tab renders:
- `antd.Alert` banner citing URS §5.6.3
- `antd.Table` with columns: Mod ID, RCN, Applicant, Product, Type (Minor/Others), Proposed Change, AI Score, Submitted, Decision
- Decision column shows inline **Accept** (primary) / **Not Accept** (danger) buttons; on click → sets `modDecisions[row.id]` state → renders `antd.Tag` with decision result + `antd.message` success/warning
- `modDecisions` local state (React.useState) — decisions persist for session

**Initiative #42 — Certificate Version History Viewer (`screens-c.jsx`)**

`CertificateDetail` component (inside `SCREENS.certificates` drawer) now renders version history section after the IMEI/Label Registry block when `cert.versions` exists:

```jsx
<antd.Timeline items={[...cert.versions].reverse().map((v, i) => ({
  color: i === 0 ? 'green' : 'blue',
  dot: i === 0 ? <SafetyCertificateOutlined /> : <HistoryOutlined />,
  children: (
    // Version badge + event + date/actor
    // Diff block: field · red strikethrough (old) → green bold (new)
  ),
}))} />
```

Mock data: `RCN-0326-00449` has v1.0 (initial issue); `RCN-0326-00442` has v1.0 + v1.1 showing Marketing Name and Model Number changes from a prior approved Minor modification.

**Initiative #43 — Document Date Validation / 6-Month Rule (`screens-b.jsx` DocFindingsPanel)**

`MOCK.documentFindings` entries now include `issuedDate` field (ISO date string):
- `reg` (SSM): `2024-02-15` (>6 months old → stale)
- `bro` (Technical Brochure): `2025-10-20` (>6 months old → stale)
- `test` (Test Report): `2026-03-12` (valid — issued 56 days ago)
- `photo`, `form`: `2026-04-01`, `2026-04-15` (valid)
- `decl` (Standards Declaration): `2025-11-05` (>6 months old → stale)

`DocFindingsPanel` changes:
- `SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000` constant
- `isStale` per-document flag; `staleCount` KPI tile (orange, `#E65100`)
- Per-doc shows: `Issued: DD MMM YYYY · Valid until DD MMM YYYY` (or `⚠ N days old — exceeds 6-month limit`)
- Stale doc card: orange border + `#FFF3E0` background + `⚠️` emoji + `"Stale"` tag
- Banner: `antd.Alert type="warning"` "N documents older than 6 months — URS §5.2.1 requires..."
- Guidance note updated: mentions staleness alongside existing findings
- Documents remain non-blocking (guidance only, per design note 12.4)

**Initiative #44 — Public Document Repository (`screens-k.jsx`)**

`DocsSection.downloadDoc(d)` function added — generates mock `.txt` file via Blob download:
- Filename: `NCEF-{doc-id}-{sanitised-title}.txt`
- Content: MCMC letterhead, doc metadata, "placeholder document" note, source URL
- `antd.message.success` confirmation on click
- `MOCK.publicDocs` was already populated (11 documents, 6 categories) — download button now functional

**Initiative #45 — Suspended Supplier SDoC Block (`screens-a.jsx`, `index.html`)**

Tweaks panel now has a **"Supplier suspended (§5.10.2)"** checkbox (supplier role only):
```jsx
<antd.Checkbox checked={tweaks.suspendedMode} onChange={e => updateTweak('suspendedMode', e.target.checked)}>
  Supplier suspended (§5.10.2)
</antd.Checkbox>
```

Dashboard (`SCREENS.dashboard`) changes when `tweaks.suspendedMode === true`:
- Error `antd.Alert` at top: "Account Suspended — new applications, renewals, and IMEI registrations are blocked"
- "Contact MCMC" CTA button links to `mailto:cppg@mcmc.gov.my`
- SDoC, Special Approval, IMEI Register buttons: `disabled={true}` + tooltip "Account suspended — contact MCMC"
- Clicking a disabled button opens `antd.Modal` with `antd.Result status="error"`:
  - Title: "New applications are blocked"
  - Body: references §5.10.2, lists affected actions, shows account ID, MCMC contact
  - Buttons: "Contact MCMC (cppg@mcmc.gov.my)" + "Close"
- Certificate Renewal and Account Renewal remain accessible (compliance path still open)

**Initiative #46 — Officer Full Task List (`index.html` OfficerDashboard)**

Replaced "Next in Queue" spotlight card with "My Assigned Applications" full task list:

```jsx
<antd.Card title="My Assigned Applications" extra={<antd.Button onClick={() => nav('officer-queue')}>Full Queue →</antd.Button>}>
  <antd.Segmented options={['All (N)', 'Urgent (N)', 'SDoC / SA', 'Modifications (N)']} />
  <antd.Table rowKey="id" dataSource={filtered} pagination={{ pageSize: 5 }} size="small"
    columns={[ID, Product+Applicant, Scheme badge, SLA tag, Review button]}
  />
</antd.Card>
```

- `allQueue` = `MOCK.officerQueue` entries assigned to `myId`
- `modQueue` = `MOCK.modificationQueue` entries assigned to `myId` (TL only)
- Filter tabs: All / Urgent (SLA ≤ 24h) / SDoC-SA / Modifications (if any assigned)
- Scheme column: `MOD` tag for modification entries (no scheme field)
- Pagination: 5 rows per page (handles queues of any size)
- Empty state: `antd.Result status="success"` "All clear" with "No assigned applications"
- "Review" button in each row navigates to `officer-review`

**Gap table updates (§12.5 / §13.3):**
- §5.6 Modification officer queue → ✅ Done (Sprint 17 #41)
- §5.6 Version history viewer → ✅ Done (Sprint 17 #42)
- §5.2 Document date validation → ✅ Done (Sprint 17 #43)
- §5.10b Document repository download → ✅ Done (Sprint 17 #44)
- §5.10 Suspended supplier block demo → ✅ Done (Sprint 17 #45)
- §5.14 Officer full task list → ✅ Done (Sprint 17 #46)
