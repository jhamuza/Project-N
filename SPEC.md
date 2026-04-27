# NCEF System — Software Design Specification

> Source: *Software Design Document (SDD) v1.4*, Infomina Berhad for MCMC, dated 10 March 2026.  
> This file is the authoritative reference for prototype and production development.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [System Architecture](#3-system-architecture)
4. [Data Design](#4-data-design)
5. [Component Design (Modules)](#5-component-design-modules)
   - 5.1 User Management
   - 5.2 Equipment Registration (SDoC)
   - 5.3 Special Approval
   - 5.4 Renewal
   - 5.5 IMEI/Serial Number Registration
   - 5.6 Modification of Registration
   - 5.7 Importation
   - 5.8 Post-Market Surveillance (PMS)
   - 5.9 Complaint & Surveillance
   - 5.10 Compliance Status Management
   - 5.10b Public Module
   - 5.11 Mobile Application
   - 5.12 Payment Integration
   - 5.13 AI-Enabled Features
   - 5.14 Dashboard & Reporting
   - 5.15 Notification
   - 5.16 Integration Requirements
   - 5.17 Configuration & Settings
   - 5.18 Data Migration Strategy
6. [Human Interface Design](#6-human-interface-design)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Requirements Traceability Matrix](#8-requirements-traceability-matrix)
9. [Appendices](#9-appendices)
   - A: User Access Matrix
   - B: Fee Structure
   - C: AI Scoring Mechanism
10. [Glossary](#10-glossary)
11. [Prototype Mapping](#11-prototype-mapping)

---

## 1. Introduction

### 1.1 Purpose

This specification provides a comprehensive technical design for the **New Communications Equipment Framework (NCEF)** online registration system. It translates business and functional requirements from the URS v1.2 into a blueprint for development, covering system architecture, data design, component-level design, and integration strategies.

### 1.2 Scope

All modules defined as "In-Scope" in the NCEF URS (v1.2) §4, including:
- End-to-end equipment registration lifecycle
- Internal portal for MCMC officers
- External portal for applicants (Suppliers, Principals, Consultants)
- Public portal (unauthenticated)
- Native mobile applications (Android, iOS, Huawei)
- All back-end integrations with internal and external systems

### 1.3 Intended Audience

| Audience | Usage |
|---|---|
| Development Team | Technical specifications, architecture, component design |
| Project Managers | Timeline and deliverable alignment |
| QA & Testing Team | Test plans and test cases |
| System Administrators / DevOps | Deployment architecture, infrastructure setup |
| MCMC Stakeholders | Review and approval of technical design |

### 1.4 Project Background

The NCEF is a new regulatory framework by MCMC to modernize communications equipment registration in Malaysia, replacing legacy SIRIM-managed systems and manual workflows. Aligned with MCMC's and Malaysia's digital transformation goals.

### 1.5 System Objectives

| Objective | Description |
|---|---|
| Streamline Operations | Efficient, automated, user-centric registration platform |
| Enhance Regulatory Oversight | Robust data management, audit trails, reporting |
| Improve Service Delivery | Transparent, accessible, responsive for all stakeholders |
| Integrate Seamlessly | MCMC SIFS, SIRIM, RMCD, SSM, MCMC Pay |
| Leverage AI | Document validation, risk assessment, auto-acceptance |
| Ensure Security & Compliance | PDPA 2010, best-in-class security standards |

### 1.6 References

| ID | Document | Version | Date |
|---|---|---|---|
| 1 | NCEF User Requirement Specification (URS) | 1.2 | Feb 27, 2026 |
| 2 | NCEF Revised VM Server Request | — | Feb 16, 2026 |
| 3 | Software Development Design (IEEE 1016) | — | — |

---

## 2. System Overview

The NCEF Online Registration System is a **web-based platform** managing the entire lifecycle of communications equipment registration in Malaysia — the single digital interface between MCMC, equipment suppliers, consultants, and the public.

### Portal Types

| Portal | Users | Purpose |
|---|---|---|
| **Internal Portal** | MCMC officers (System Admin, OIC, Recommender, Verifier, Approver) | Application management, back-office functions, dashboards |
| **External Portal** | Applicants (Suppliers, Principals, Consultants) | Self-service registration, submission, tracking, payments |
| **Public Portal** | General public (unauthenticated) | Equipment search/verification, regulatory documents, chatbot |
| **Mobile Apps** | General public + authenticated users | Public search, push notifications (Android/iOS/Huawei) |

### Registration Schemes

| Scheme | Risk Level | Processing |
|---|---|---|
| **Scheme A** | High Risk — SDoC with Certification | Full manual MCMC review + AI support |
| **Scheme B** | Medium Risk — SDoC with Verification | AI-assisted OIC review; reclassification possible |
| **Scheme C** | Low Risk — AI Auto-Acceptance | Auto-accepted if AI confidence ≥ 90%; else manual |

A key innovation is the **AI engine** that automates document validation, performs risk scoring, and enables auto-acceptance for low-risk applications — allowing MCMC officers to focus on high-value tasks.

---

## 3. System Architecture

### 3.1 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Presentation (Web) | **ReactJS** | Interactive, responsive, bilingual UI |
| Presentation (Mobile) | **Flutter** | Single codebase for Android, iOS, Huawei |
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

- Three distinct environments: **Development**, **UAT/Staging**, **Production**
- Infrastructure: Virtual machines running **Ubuntu 24.04.1 LTS**
- Application components containerized and managed by **Rancher (Kubernetes)**
- Production: **High availability** — active-active for Load Balancer, Proxy, App Servers, API Gateway; active-passive for PostgreSQL

### 3.3 Logical Architecture

Layered architecture with clear separation of concerns:

```
[Client Layer]          ReactJS Web App | Flutter Mobile App
      ↓
[API Gateway]           Apache APISIX (traffic, security, observability)
      ↓
[Application Layer]     Spring Boot Microservices
      ↓
[AI Service Layer]      Python FastAPI + LangChain/LangGraph + vLLM
      ↓
[Data Layer]            PostgreSQL | MinIO | Milvus
      ↓
[Integration Layer]     IBM webMethods ESB ↔ SIRIM / RMCD / SSM / MCMC Pay / SIFS
```

### 3.4 Integration Architecture

IBM webMethods ESB acts as the central integration hub for all external/internal system communication.

| Integration Point | Direction | Purpose |
|---|---|---|
| **SIRIM eComM** | Bidirectional | CoC validation; historical data migration (3-phase ETL) |
| **RMCD MyOGA System** | Outbound | Import permit applications; payment redirect to RMCD |
| **SSM Search** | Outbound | Real-time company registration validation during onboarding |
| **MCMC Pay** | Bidirectional | Payment processing; callback confirmation |
| **MCMC SIFS** | Outbound | Financial transaction sync for reporting/reconciliation |
| **Azure Active Directory (AAD)** | Inbound | SSO for internal MCMC users via Keycloak federation |

---

## 4. Data Design

### 4.1 Data Model Overview

Primary database: **PostgreSQL** (structured data). Unstructured documents: **MinIO**.

### 4.2 Data Dictionary

| Entity | Description | Key Attributes |
|---|---|---|
| **Users** | Any individual with system access (internal MCMC or external applicant) | `id`, `full_name`, `email`, `phone_number`, `password_hash`, `company_id` (FK) |
| **Companies** | Registered entity submitting applications (Company/Individual/Institution/Consultant) | `id`, `name`, `registration_number`, `category`, `status` |
| **Applications** | Central entity for any submission (SDoC, Special Approval, Renewal, etc.) | `id`, `application_number`, `type`, `scheme`, `status`, `applicant_id` (FK), `equipment_id` (FK) |
| **Equipment** | A specific communications equipment model being registered | `id`, `brand`, `model`, `technical_code`, `specifications` (JSONB) |
| **Certificates** | Issued RCN certificate for a registered equipment | `id`, `rcn` (Registration Certification Number), `application_id` (FK), `issue_date`, `expiry_date` |
| **Payments** | Financial transaction record for an application | `id`, `transaction_id`, `amount`, `status`, `application_id` (FK) |
| **Documents** | File uploaded as part of an application (stored in MinIO) | `id`, `name`, `path` (MinIO object key), `application_id` (FK) |
| **IMEI_Serial_Numbers** | Unique device identifiers (IMEI for cellular; Serial Number for non-cellular) | `id`, `value`, `type`, `equipment_id` (FK) |
| **Audits** | PMS audit lifecycle records | `id`, linked to COMPANIES + EQUIPMENT |
| **Complaints** | Market intelligence / public complaints | `id`, linked to EQUIPMENT + COMPANIES |
| **Compliance_Status_History** | Immutable log of all compliance status changes | `id`, `entity_type`, `entity_id`, `status`, `reason`, `officer_id`, `changed_at` |

> The `Applications.details` column is a **JSONB** field holding purpose-specific data per application type (e.g., Special Approval purpose, modification category, import logistics).

---

## 5. Component Design (Modules)

### 5.1 User Management Module

#### Purpose
Foundation of NCEF security. Handles the entire lifecycle of user accounts — registration, authentication, authorization, and profile management — for all internal (MCMC) and external (Applicant) users via **Keycloak**.

#### User Classification

**Internal Users (MCMC):**
- System Administrator
- Officer in Charge (OIC)
- Recommender
- Verifier
- Approver

**External Users (Applicants):**
- Category A — Company
- Category B — Individual
- Category C — Institution
- Category D — Consultant

#### External User Registration (Two-Layer)

| Layer | Step |
|---|---|
| **Layer 1 — Account Creation** | Provide Name, Email, Phone; create password → email verification link sent |
| **Layer 2 — Profile Registration** | After email verification, log in → select category → submit detailed info + documents (e.g., Business Registration) |
| **MCMC Acceptance** | Profile undergoes MCMC officer review/acceptance workflow before account fully activated |

#### Internal User Authentication (SSO)
- Internal MCMC users authenticate via **SSO** integrated with **Azure Active Directory (AAD)**
- Keycloak acts as the identity broker, federating with AAD

#### External User Authentication (2FA)
- Email + password login with **Two-Factor Authentication (2FA)**
- First login after registration: OTP sent to email (enforced verification)
- **Session timeout: 30 minutes of inactivity**
- Multi-device and multi-tab access allowed

#### Role-Based Access Control (RBAC)
- Managed by **Keycloak**
- Detailed User Access Matrix (Appendix A) configured in Keycloak
- System Admin can appoint an **OIC Lead** who gains ability to manually override applicant assignments

#### Profile Management
All users can view and update their profile after login.

#### Principal & Consultant Management
- Primary supplier (Company) can register and link subsidiary **Principals** or third-party **Consultants**
- Add/remove associations; Principals and Consultants remain active as long as their account is renewed
- Existing Principals and Consultants selectable via dropdown

#### Interfaces
- **UI:** ReactJS — registration, login, profile, user administration
- **Backend API (Spring Boot):** `/api/users/register`, `/api/users/profile`
- **Keycloak:** Admin API for user creation/role mapping; auth endpoints for login flows
- **AAD:** External identity provider for SSO
- **SSM Search (via ESB):** Company registration validation during onboarding

#### Data
- PostgreSQL: `USERS`, `COMPANIES`
- MinIO: Uploaded registration documents (NRIC copies, Business Registration forms)
- Keycloak DB: Credentials, roles, sessions, realm config

---

### 5.2 Equipment Registration Module (SDoC)

#### Purpose
Central NCEF component managing the **Supplier's Declaration of Conformity (SDoC)** process with risk-based workflows for Scheme A, B, and C.

#### SDoC Form
Multi-part form capturing: equipment details, technical specifications, test reports, labelling information.

#### Scheme A Workflow — High Risk (SDoC with Certification)

1. Applicant submits SDoC form + required documents (e.g., Certificate of Conformity from recognized body)
2. Applicant pays via MCMC Pay
3. On payment confirmation → system assigns to OIC
4. AI engine validates documents + data, generates summary report for OIC
5. OIC conducts detailed manual review (application + documents + AI summary)
6. OIC decision: **Accept**, **Not Accept**, or **Return for Modification** (iteration)
7. On approval → **RCN** (Registration Certification Number) + digital certificate issued

#### Scheme B Workflow — Medium Risk (SDoC with Verification)

- Mirrors Scheme A
- AI provides significant decision support to OIC
- **Reclassification feature:** OIC can upgrade to Scheme A (higher risk) or downgrade to Scheme C (lower risk), potentially requiring applicant to provide different/additional information

#### Scheme C Workflow — Low Risk (AI Auto-Acceptance)

1. Identical to Scheme B up to AI validation
2. AI generates **confidence score** based on defined criteria (see Appendix C)
3. **Score ≥ 90%** → auto-accepted, RCN issued without manual intervention
4. **Score < 90%** → routed to OIC for manual review (same as Scheme B)

#### Digital Signature
All applications conclude with a formal digital declaration by the applicant's authorized officer.

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

#### Purpose
Specialized workflow for importing equipment for **non-commercial purposes** — R&D, market surveys, demonstrations, or personal use. Three distinct processes based on risk classification.

#### Application Submission
Applicant selects purpose of usage + provides equipment details, usage location, time period + uploads supporting documents (proposal papers, letters of undertaking).

#### Low/Medium Risk Workflow

1. Applicant fills required information (purpose, usage details, equipment info)
2. Uploads documents (proposal paper, technical data sheets, letters of undertaking); bulk upload of IMEI/Serial Numbers supported
3. System generates payment notice based on equipment type, quantity, and corresponding registered serial/IMEI numbers
4. Applicant pays via MCMC Pay
5. Application assigned to officer; AI evaluates documents
6. OIC reviews + AI summary; if modifications needed, application returned for iteration
7. On successful verification → OIC accepts → **Special Approval Certificate** issued with unique ID format: `SA-MMYY-XXXXX`

#### High Risk Workflow

Identical to Low/Medium risk but with higher fees.

1. Payment notice generated on submission
2. On payment confirmation → assigned to **Recommender OIC**
3. AI evaluates documents, provides summary to officer
4. Recommender reviews; can **escalate to Approver** (accept submission) or **send for iteration** (both require justifications)
5. Approver can **Accept**, **Not Accept**, or **Return** with justification
6. On approval → Special Approval Certificate issued

#### Prohibited Equipment Workflow

For normally-prohibited equipment requiring stringent oversight.

1. An offline acceptance process (physical meeting) takes place; decision is formally minuted
2. Designated MCMC officer (Recommender) uploads official decision document (meeting minutes) to system
3. Application routed through **mandatory multi-level digital approval**: Recommender → Verifier → Approver
4. **Only Approver can Reject**; Recommender and Verifier can only escalate by approving and providing justification (highlighting potential approval/rejection)
5. All three levels of digital approval complete → Special Approval Certificate issued

#### Interfaces
- **UI (ReactJS):** Special Approval form, document upload, status tracking
- **Backend API:** `/api/applications/special-approval`, multi-level approval chain
- **AI Service:** Document evaluation for Low/Medium and High Risk workflows
- **MCMC Pay:** Fee processing

#### Data
- PostgreSQL: `APPLICATIONS` table with `type='SpecialApproval'`; separate table for multi-level approval state (prohibited)
- MinIO: Supporting documents, proposal papers, meeting minutes

---

### 5.4 Renewal Module

#### Purpose
Automates renewal of both **applicant registrations** (Supplier/Principal/Consultant) and **equipment certifications** (SDoC). Prevents lapses through timely notifications and streamlined workflows.

#### Automated Renewal Notifications
- Email + in-app notifications sent automatically before expiry
- Configurable schedule: e.g., **90, 60, 30 days** before expiry

#### Supplier / Principal / Consultant Renewal

1. Initiate from dashboard or via notification email link
2. System prompts user to review and update profile/company information
3. AI reviews for discrepancies:
   - **≥ 90% score** → auto-approved
   - **< 90%** → escalated to OIC for manual review
4. Payment notice generated based on selected renewal period (1–5 years)
5. On successful payment → account status updated, validity period extended

#### Equipment Registration Renewal (SDoC)

1. Select expired/soon-to-expire certificates from dashboard
2. Streamlined version of original application:
   - **Scheme A:** Applicant must upload updated Certificate of Conformity (CoC)
   - **Scheme B & C:** No document updates unless underlying technical standards changed
3. AI-assisted compliance check re-validates equipment against latest technical standards
4. On successful validation + payment → certificate validity extended; new digital certificate may be issued

#### Interfaces
- **UI (ReactJS):** Renewal forms, dashboard alerts
- **Backend API:** `/api/applications/renewal`, fee calculation, expiry updates
- **Notification Service:** Cron-triggered; checks upcoming expiries; sends notifications
- **MCMC Pay:** Renewal fee processing

#### Data
- PostgreSQL: `APPLICATIONS` (renewal requests); `COMPANIES` + `CERTIFICATES` tables updated with new `expiry_date` and `status`

---

### 5.5 IMEI/Serial Number Registration Module

#### Purpose
Register unique equipment identifiers — **IMEI** (cellular devices) and **Serial Numbers** (non-cellular) — for post-market surveillance and customs clearance.

#### Key Functionalities

**Identifier Registration:** Submit IMEI or Serial Numbers linked to a specific registered equipment model (identified by RCN).

**Bulk Upload:** Bulk submission via **CSV file** (template downloadable from portal).

**Duplication Validation:**
- **IMEI:** Validated for uniqueness across all registered IMEI numbers in NCEF
- **Serial Number:** Validated for uniqueness per supplier + RCN combination

**Fee Calculation:**
- Automatically calculated on quantity submitted
- **RM 0.50 per IMEI**
- **RM 0.15 per Serial Number**
- Payment notice generated; payment via MCMC Pay

#### Interfaces
- **UI (ReactJS):** Bulk upload interface, file selection, validation preview, error reporting
- **Backend API:** `/api/identifiers/register` — file upload, parse, validate, create payment records

#### Data
- PostgreSQL: `IMEI_SERIAL_NUMBERS` (value, type, FK to parent equipment registration)

---

### 5.6 Modification of Registration Module

#### Purpose
Formal process for applicants to submit modification requests for existing equipment registrations, with a complete audit trail of all changes.

#### Modification Request Initiation
Applicant enters a valid RCN → system validates and retrieves current equipment information.

#### Modification Categories

| Category | Description | Action |
|---|---|---|
| **Major** | Significant changes affecting equipment conformity (e.g., radio frequency components) | Redirects applicant to file a **new registration application** |
| **Minor** | Small changes not affecting conformity (e.g., colour, enclosure material) | Assigned to MCMC officer for review |
| **Others** | Administrative changes (e.g., updating contact person) | Assigned to MCMC officer for review |

#### Acceptance Workflow (Minor / Others)
1. Request assigned to designated MCMC officer
2. Officer reviews → **Accept** or **Not Accept**

#### Version Control
- System maintains **version history** for every registered equipment
- New version created for each accepted modification
- Complete, traceable audit trail of all changes over certificate lifecycle

#### Interfaces
- **UI (ReactJS):** Modification request form
- **Backend API:** `/api/applications/modification`, officer review workflow

#### Data
- PostgreSQL: `APPLICATIONS` (modification requests); `EQUIPMENT` + `CERTIFICATES` support versioning via history table or version numbers/status flags

---

### 5.7 Importation Module

#### Purpose
Streamlines the import permit process for communications equipment by integrating with the **Royal Malaysian Customs Department (RMCD) MyOGA System**.

#### Key Functionalities

**Import Permit Application:** Initiated from applicant dashboard. Details required:
- Trader information (registered with RMCD)
- Consignor / Consignee details
- Agent details
- Logistics information (mode of transport, country of origin, etc.)

**RMCD Integration:** NCEF backend sends application data via IBM webMethods ESB → RMCD MyOGA System API.

**Payment Redirect:** Applicant redirected from NCEF portal to **RMCD MyOGA System** to complete payment. All fees determined and collected by RMCD.

**Certificate of Acceptance (CoA):** Generated by RMCD system upon successful payment confirmation; specifies total allowed import quantities.

#### Interfaces
- **UI (ReactJS):** Import permit application form
- **Backend API:** Gathers data → forwards to ESB
- **IBM webMethods:** Manages secure API-based communication to RMCD MyOGA System

#### Data
- PostgreSQL: `APPLICATIONS` may store initiation record; primary data resides in RMCD MyOGA System

---

### 5.8 Post-Market Surveillance (PMS) Module

#### Purpose
Supports MCMC in monitoring **ongoing compliance** of registered equipment and suppliers after market entry. Enables audit management, product sampling, and compliance verification.

#### Key Functionalities

**Audit Proposal Generation (AI-Assisted):**
- AI Risk Scoring Engine auto-generates proposed audit lists
- Selection based on: equipment risk classification (Scheme A/B/C), supplier compliance history, registration volume, random sampling, customized officer-defined parameters

**Product Sampling Proposal:**
- Officers define a sampling percentage
- System auto-generates proposed product sampling list for review/confirmation

**Supplier Notification:**
- Auto-generates and dispatches notifications (email + system alerts) to selected suppliers
- Officers can review and edit notification templates before sending

**Audit Findings & Document Updates:**
- Dedicated interface for officers to record verification results, observations, upload audit documents

**Audit History & Non-Compliance Records:**
- Immutable history of all audit activities and outcomes
- Non-compliant suppliers and equipment flagged and recorded → data fed back into AI Risk Scoring Engine (influences future audit selections and auto-acceptance thresholds)

#### Interfaces
- **UI (ReactJS):** Officer Dashboard — configure audit parameters, review AI-proposed lists, input audit findings
- **Backend API:** `/api/pms/audits`, `/api/pms/sampling`
- **AI Service:** Analyzes historical data, complaints, supplier profiles → risk-based audit proposals
- **Notification Service:** Dispatches alerts to applicant dashboard and email

#### Data
- PostgreSQL: `AUDITS`, `PRODUCT_SAMPLING`, `NON_COMPLIANCE` tables (linked to `COMPANIES` + `EQUIPMENT`)
- MinIO: Physical audit evidence, test reports, scanned documentation

---

### 5.9 Complaint & Surveillance Module

#### Purpose
Centralizes, records, and manages **public complaints and market intelligence** about communications equipment active in the market.

#### Key Functionalities

**Complaint Submission:** Officers capture data from public complaints:
- Supplier name, Brand/Model, IMEI/Serial Number, issue description, source

**Complaint Tracking:** Dashboard for authorized officers to monitor complaint lifecycle, current status, and related equipment/supplier links.

#### Interfaces
- **UI (ReactJS):** Manual intelligence entry forms, dashboard tracking views
- **Backend API:** `/api/intelligence/complaints`

#### Data
- PostgreSQL: `COMPLAINTS` table — maps to `EQUIPMENT` + `COMPANIES`

---

### 5.10 Compliance Status Management Module

#### Purpose
Provides MCMC officers with direct capability to govern and update the **overarching compliance status** of registered equipment and suppliers based on audit findings, intelligence, or enforcement decisions.

#### Key Functionalities

**Compliance Status Controls:** Officers can update status to:
- `Active`
- `Under Surveillance`
- `Suspended`
- `Cancelled`

**Status Recording & Audit Trail:**
- Strict logging for every status change
- Captures: reason, officer responsible, exact date/time

**System-Wide Propagation:**
- Status updates propagate **immediately** throughout the system
- `Suspended` supplier → restricts new SDoC submissions
- `Cancelled` equipment → instantly reflected on Public Search Portal

#### Interfaces
- **UI (ReactJS):** Administrative controls in Officer profile management and equipment detail screens
- **Backend API:** `/api/compliance/status-update` (secure, state-transition managed)

#### Data
- PostgreSQL: `compliance_status` columns added to `COMPANIES` + `CERTIFICATES`; new `COMPLIANCE_STATUS_HISTORY` table (immutable audit trail)

---

### 5.10b Public Module

#### Purpose
Public-facing gateway to NCEF — provides **transparent access** to information for the general public, enhances consumer confidence, and hosts all official NCEF guidelines and announcements.

#### Key Functionalities

**Public Landing Page:** Professional, bilingual (English + Malay), featuring latest announcements, regulatory updates, news from MCMC.

**Equipment Certification Search & Verification:**
- Public search engine for verifying registration status of any communication device
- Search parameters: Brand, Model, IMEI/Serial Number, Supplier ID, RCN

**Document Repository:**
- Public access to all relevant NCEF guidelines, procedures, applicable technical standards, reference documents

**Application Process Overview:**
- Step-by-step registration process overview
- Indicative processing timelines
- Clear, easy-to-understand fee structure

**AI Chatbot:**
- LLM-powered chatbot providing instant answers to NCEF-related inquiries
- Uses **RAG** (Retrieval-Augmented Generation) querying Milvus vector database

**FAQ Section:** Comprehensive, searchable FAQ.

**Contact Information:** Official NCEF contact details.

#### Interfaces
- **UI (ReactJS):** Landing page, search interface, document repository, FAQ, chatbot widget
- **Backend API:** `/api/public/search` (publicly accessible but secured)
- **AI Service:** Chatbot endpoint querying Milvus knowledge base

#### Data
- PostgreSQL: Read-optimized view of `EQUIPMENT` + `CERTIFICATES`; `FAQ` + document repository tables
- Milvus: Vector embeddings of guidelines and FAQs for chatbot RAG

---

### 5.11 Mobile Application

#### Purpose
On-the-go access to key NCEF functionalities and MCMC announcements. Built with **Flutter** for Android, iOS, and Huawei from a single codebase.

#### Key Functionalities

- **Public Equipment Search:** Mobile-friendly version of public search/verification
- **Push Notifications:** Exclusively for broadcasting MCMC announcements, regulatory updates, public notices
- **Responsive UI:** Clean, intuitive interface adapting to various screen sizes

#### Interfaces
- **UI:** Flutter (design references web portal + native OS design system)
- **Backend API:** Consumes same public API endpoints as web Public Module
- **Push Notification Service:** Firebase Cloud Messaging or self-hosted solution

#### Data
Client-side application only — no dedicated backend data store; relies on main NCEF database via public API.

---

### 5.12 Payment Integration Module

#### Purpose
Handles all NCEF financial transactions securely and reliably via **MCMC Pay**, with reconciliation through **MCMC SIFS**.

#### Key Functionalities

**MCMC Pay Integration:** All payments processed through the official MCMC payment gateway.

**Fee Structure & Notice for Payment:**
- System auto-generates payment notices based on configurable fee structure
- Covers: different schemes, risk levels, registration types, quantities (IMEI/Serial Number)

**Payment Confirmation:**
- Real-time callback from MCMC Pay upon successful payment
- Triggers application status update: `"Pending Payment"` → `"In Review"`

**Digital Receipt Issuance:**
- Auto-issued to applicant via email upon payment confirmation
- Standard NCEF platform template

**Financial Reconciliation (SIFS Integration):**
- All confirmed transaction data synchronized to MCMC SIFS via ESB
- Ensures accurate financial reporting and reconciliation

#### Interfaces
- **UI (ReactJS):** Notice for Payment display, redirect button to MCMC Pay
- **Backend API:** Generate Notice for Payments; dedicated callback endpoint for payment status updates
- **IBM webMethods:** Communication flow — NCEF ↔ MCMC Pay ↔ MCMC SIFS

#### Data
- PostgreSQL: `PAYMENTS` table (transaction_id from MCMC Pay, amount, status, FK to `APPLICATIONS`)

---

### 5.13 AI-Enabled Features

#### Purpose
AI capabilities enhancing operational efficiency, accuracy in application processing, and intelligent decision support for MCMC officers. Built on dedicated **Python FastAPI** microservices stack.

#### Key Functionalities

**AI Document Validation (ICR):**
- Intelligent Character Recognition extracts text/structured data from PDFs and scanned images
- Checks document completeness
- Cross-references information (e.g., model numbers) across multiple documents for consistency

**Risk Scoring & Assessment:**
- Generates risk score per application based on: equipment type, applicant history, document validation results
- Helps officers prioritize reviews

**AI-Assisted Decision Support (Scheme A, B, C):**
- Provides clear recommendation ("Accept" or "Flag for Review") to OIC
- Includes summary of findings and highlights potential compliance issues/inconsistencies

**Auto-Acceptance (Scheme C + Renewal):**
- Calculates confidence score (see Appendix C for criteria)
- Score ≥ 90% → automatic acceptance without manual intervention

**Fraud Detection:**
- Trained to identify patterns indicative of fraudulent activity (forged documents, suspicious application data)
- Flags cases for immediate investigation

**AI Chatbot (Public Portal):**
- LLM-powered; uses **RAG** approach
- Queries Milvus vector database (indexed guidelines + FAQs) for accurate, context-aware responses

#### Interfaces
- **Backend API (Spring Boot):** Calls AI services for document analysis and risk scoring
- **AI Service API (Python/FastAPI):** `/api/ai/validate-document`, `/api/ai/get-risk-score`, `/api/ai/chat`
- **UI (ReactJS):** Chatbot widget communicates directly with AI service API

#### Data
- MinIO: AI service retrieves documents for analysis
- PostgreSQL: Application and user data for risk assessments
- Milvus: Primary data source for RAG chatbot (embeddings of all knowledge base documents)

---

### 5.14 Dashboard & Reporting Module

#### Purpose
Real-time insights and analytics for both MCMC officers and applicants. Tracks KPIs, generates reports for compliance and strategic planning.

#### Key Functionalities

**Internal Officer Dashboard:**
- Total application counts (daily/weekly/monthly)
- Breakdown by Scheme, Special Approval type, status
- Real-time SLA monitoring for application processing times
- Personalized task list: assigned applications + pending actions

**Applicant Dashboard:**
- Real-time tracking of all submitted applications
- Complete history (past + current applications)
- System notifications and alerts
- Initiate new applications, renewals, modifications

**Analytics & Reporting:**
- **Master Report** export on request — filterable by date, time, application type (Supplier Registration, Equipment Registration, Special Approval, IMEI/Serial Number, etc.)
- Compliance reports (registered equipment, accepted suppliers)
- Operational reports (officer workload, processing bottlenecks)
- Financial reports (payment transactions, reconciled with SIFS)
- Complete, immutable audit trail report (per user or application)
- **Export formats: `.xlsx` and `.csv`**

#### Interfaces
- **UI (ReactJS):** Charts, graphs, data tables, personalized task lists
- **Backend API:** Aggregated data endpoints; report generation/export (CSV or PDF)

#### Data
- PostgreSQL: Main transactional database; materialized views or read-replica for performance-intensive analytics (avoids impacting transactional performance)

---

### 5.15 Notification Module

#### Purpose
Keeps all stakeholders informed of key events, status changes, and required actions throughout the application lifecycle via multiple channels.

#### Notification Channels

| Channel | Usage |
|---|---|
| **Email** | Formal communications — submission confirmations, payment receipts, renewal reminders |
| **In-App / System Notifications** | Dashboard alerts for important updates and pending actions |
| **Push Notifications** | MCMC announcements to mobile application users |

#### Event-Driven Triggers
Notifications triggered by: application submission, status changes (Accepted, Request for Modification, etc.), payment confirmation, upcoming expiry dates.

#### Configurable Templates
- HTML/text templates managed through admin interface
- System Administrators can modify wording and branding without code changes

#### Interfaces
- **Backend API (Spring Boot):** Core logic triggers notification events
- **Email Service:** SMTP relay integration
- **Push Notification Service:** Mobile client announcements

#### Data
- PostgreSQL: Notification templates; log of all sent notifications (for auditing)

---

### 5.16 Integration Requirements

#### Purpose
Manages all data exchanges between NCEF and other enterprise systems. Uses **ESB pattern** with IBM webMethods as the central integration hub — secure, reliable, manageable, and decoupled from core application logic.

> Note: SIRIM eComM and RMCD MyOGA System integrations to be finalized after further clarification with each provider (initial discussions: 23 Feb 2026).

#### SIRIM eComM Integration
- **CoC Validation:** NCEF → IBM webMethods → SIRIM eComM API → validates certificate authenticity
- **Data Migration:** ESB manages 3-phase ETL of historical data from legacy SIRIM system (data transformation, cleansing, loading)

#### RMCD MyOGA System Integration
- Import permit application data: NCEF backend → ESB → RMCD MyOGA System API

#### SSM Service Provider Integration
- Company registration flow: NCEF → ESB → SSM Search API → validates company existence in SSM database
- Result influences AI confidence score

#### MCMC Pay Integration
- ESB mediates all payment-related communication
- Passes payment requests to MCMC Pay; provides secure callback endpoint → forwards confirmation to NCEF

#### MCMC SIFS Integration
- ESB synchronizes confirmed payment transaction data from NCEF to SIFS for financial consistency

#### Interfaces
- **Backend API (Spring Boot):** RESTful APIs or SOAP web services to ESB for each integration
- **IBM webMethods:** Protocol transformation (REST↔SOAP), data mapping, routing

#### Data
- Module handles data in transit; ESB maintains detailed transaction logs for auditing/troubleshooting

---

### 5.17 Configuration & Settings

#### Purpose
Administrative interface for MCMC **System Administrators** to manage and configure operational parameters without code deployments.

#### Key Functionalities

**System Parameter Configuration:**
- Application expiry timelines (days before draft marked as lapsed)
- Payment deadlines

**Workflow Configuration:**
- AI auto-acceptance confidence score threshold for Scheme C (e.g., 90%)
- Rules for officer assignment

**Officer Grouping & Assignment:**
- Create and manage officer groups
- Configure automatic assignment rules (by equipment type or risk level)
- Appoint **group leads** who can override and apply manual re-assignment (especially during OIC unavailability)

**Fee Structure Management:**
- All fees are configurable
- Covers: registration types, schemes, services (IMEI/SN), renewal periods

**Master Data Management:**
- Manage master lists used in application forms (equipment types, applicable technical codes)

**Officer Calendar Blocking:**
- Officers block calendars for off-duty days (leave, training)
- Blocked officer = `unavailable` → not eligible for new task assignments
- Group lead can transfer existing assignments to another OIC during blocked period

#### Interfaces
- **UI (ReactJS):** Dedicated admin section in internal MCMC portal
- **Backend API:** `/api/admin/settings` (System Administrator role only)

#### Data
- PostgreSQL: Dedicated `settings`/`configuration` table(s) — key-value pairs or structured format

---

### 5.18 Data Migration Strategy

#### Purpose
Migrate all **historical equipment registration data** from legacy SIRIM-managed system to NCEF. Goal: seamless transition with high data integrity, completeness, and accuracy — all historical records accessible from day one.

#### Three-Phase Approach (via IBM webMethods ESB — ETL)

**Phase 1 — Initial Full Load (Before UAT):**
1. **Extract:** Full historical data extract from legacy SIRIM system (database dump or structured files: CSV/XML)
2. **Transform:** ESB applies transformation logic — maps legacy schema to NCEF PostgreSQL schema; data cleansing (standardize formats), validation, resolve inconsistencies
3. **Load:** Transformed data loaded into UAT/Staging for validation and testing

**Phase 2 — Delta Load (After Pilot Launch):**
- While legacy system may still be operational during grace period
- Extract only new/updated records since last migration → load into NCEF production
- Both systems remain synchronized during transition

**Phase 3 — Final Reconciliation (After Grace Period End):**
- Final migration run — transfer any remaining data
- Comprehensive reconciliation: automated scripts + manual checks
- Verify completeness and integrity against control totals and checksums

#### Interfaces
- **IBM webMethods:** Core ETL component
- **Legacy System:** ESB connects to legacy database or file share
- **NCEF Database (PostgreSQL):** Destination for transformed data
- **MinIO:** Associated documents migrated from legacy system; paths updated in `DOCUMENTS` table

#### Data
Populates: `USERS`, `COMPANIES`, `EQUIPMENT`, `CERTIFICATES` + other columns defined in coordination with SIRIM.

---

## 6. Human Interface Design

### 6.1 UI/UX Principles

| Principle | Description |
|---|---|
| **Clarity & Simplicity** | Clean, uncluttered UI; complex processes broken into step-by-step wizards |
| **Consistency** | Unified design language (colors, fonts, controls) across Internal, External, and Public portals |
| **Responsiveness** | Fully responsive across desktop, tablet, mobile |
| **Accessibility** | WCAG 2.1 Level AA compliance |
| **Bilingual Support** | All user-facing portals (Public, External, Mobile) fully support English and Malay |

### 6.2 Key Screen Flows

1. **External User Onboarding:** Multi-step wizard — account creation → email verification → detailed profile submission → MCMC acceptance
2. **SDoC Application Submission:** Tabbed form interface separating Supplier Declaration, Technical Specifications, and Labelling Information sections
3. **Applicant Dashboard:** Summary view with clear calls-to-action, sortable/filterable application status table
4. **Officer Dashboard:** Role-based; prioritized work queue, SLA timers, key operational metrics

### 6.3 Wireframes
Detailed wireframes and high-fidelity mockups to be created in a separate UI/UX design phase, appended in a dedicated design repository. Design adheres to MCMC branding and style guidelines.

---

## 7. Non-Functional Requirements

### 7.1 Performance

**Requirement:** Support 500 concurrent users; page loads < 3 seconds; transaction processing < 5 seconds.

**Design:**
- **Load Balancing:** Nginx in active-active configuration distributes traffic across multiple application server instances
- **Horizontal Scaling:** Microservices + Rancher (Kubernetes) — individual services scale independently
- **Database Optimization:** PostgreSQL with appropriate indexing; read replicas / materialized views for reporting/public search
- **Caching:** Caching layer (e.g., Redis) for frequently accessed data

### 7.2 Security

**Requirement:** Protected against OWASP Top 10; strong authentication; all sensitive data encrypted.

**Design:**
- **Authentication & Authorization:** Keycloak — strong password policies, 2FA (external), AAD SSO (internal), OAuth 2.0/JWT tokens validated by APISIX
- **WAF:** Nginx + ModSecurity — protects against SQLi, XSS, CSRF
- **Encryption:**
  - In transit: TLS 1.2/1.3 (client↔server, service↔service)
  - At rest: AES-256 for PostgreSQL + MinIO
- **Vulnerability Scanning:** SAST + DAST integrated into CI/CD pipeline

### 7.3 Compliance (PDPA)

**Requirement:** Full compliance with Malaysian Personal Data Protection Act (PDPA) 2010.

**Design:**
- **Consent Management:** Explicit consent during registration; clear privacy policy links
- **Data Minimization:** Only collect data strictly necessary for regulatory process
- **Access Control:** Strict RBAC (Keycloak) — only authorized officers access personal data for intended purpose
- **Audit Trails:** Immutable audit trail logs all access to and modifications of personal data

### 7.4 Availability & Reliability

**Requirement:** Target uptime **99.5%**.

**Design:**
- **High Availability:** Active-active: Load Balancer, Reverse Proxy, App Servers, API Gateway
- **Database Redundancy:** PostgreSQL active-passive with automatic failover
- **Container Orchestration:** Kubernetes auto-restarts failed containers/nodes

### 7.5 Backup & Recovery

**Requirement:** Daily backups with 30-day retention; DR environment for continuity.

**Design:**
- **PostgreSQL:** Automated daily backups via `pg_dump`; stored securely in separate location
- **MinIO:** Configured for versioning + replication to secondary site
- **DR Environment:** Full DR environment deployed for business continuity

---

## 8. Requirements Traceability Matrix

| URS Section | Requirement | SDD Section |
|---|---|---|
| 4.1 | User Management Module | 5.1 |
| 4.1.1 | User Classification & Roles | 5.1.2 |
| 4.1.2 | Supplier Registration (External Users) | 5.1.2 |
| 4.1.3 | Principal & Consultant Registration | 5.1.2 |
| 4.1.4 | User Authentication & Login (2FA/SSO) | 5.1.2, 7.2 |
| 4.1.5 | Single Sign-On (SSO) for Internal Users | 5.1.2, 3.4 |
| 4.1.6 | User Profile Management | 5.1.2 |
| 4.1.7 | User Access Matrix | Appendix A |
| 4.1.8 | Account Activation & Deactivation | 5.1.2 |
| 4.2 | Equipment Registration Module (SDoC) | 5.2 |
| 4.2.1 | Scheme A: SDoC with Certification (High Risk) | 5.2.2 |
| 4.2.2 | Scheme B: SDoC with Verification (Medium Risk) | 5.2.2 |
| 4.2.3 | Scheme C: SDoC (Low Risk) — AI Auto-Acceptance | 5.2.2, 5.13.2 |
| 4.2.4 | Equipment Information Requirements | 4.2, 5.2.2 |
| 4.2.5 | Document Upload & Validation | 5.2.2, 5.13.2 |
| 4.2.8 | Declaration & Digital Signature | 5.2.2 |
| 4.3 | Special Approval Module | 5.3 |
| 4.3.1 | Special Approval — Low/Medium Risk | 5.3.2 |
| 4.3.2 | Special Approval — High Risk | 5.3.2 |
| 4.3.3 | Special Approval — Prohibited Equipment | 5.3.2 |
| 4.3.4 | Purpose of Usage Categories | 5.3.2 |
| 4.3.5 | Prohibited Equipment Manual Approval | 5.3.2 |
| 4.4 | Renewal Module | 5.4 |
| 4.4.1 | Supplier/Principal/Consultant Renewal | 5.4.2 |
| 4.4.2 | Equipment Registration Renewal | 5.4.2 |
| 4.4.3 | Renewal Period & Validity | 5.4.2 |
| 4.5 | IMEI/Serial Number Registration Module | 5.5 |
| 4.5.1–4.5.3 | IMEI/SN Registration, Validation, Bulk | 5.5.2 |
| 4.6 | Modification of Registration Module | 5.6 |
| 4.6.1–4.6.3 | Modification Process, Workflow, Versioning | 5.6.2 |
| 4.7 | Importation Module | 5.7 |
| 4.7.2–4.7.3 | RMCD Integration, Trader Information | 5.7.2, 3.4 |
| 4.8 | Public Module | 5.10b |
| 4.8.1–4.8.5 | Landing Page, Search, Docs, Chatbot | 5.10b.2 |
| 4.9 | Mobile Application | 5.11 |
| 4.9.1, 4.9.3 | Flutter, Search, Push Notifications | 5.11.1, 5.11.2 |
| 4.10 | Payment Integration Module | 5.12 |
| 4.10.1–4.10.4 | MCMC Pay, Fees, Confirmation, SIFS | 5.12.2, 3.4 |
| 4.11 | AI-Enabled Features | 5.13 |
| 4.11.1–4.11.6 | ICR, Risk Scoring, Decision Support, Auto-Accept, Fraud, Chatbot | 5.13.2 |
| 4.12 | Dashboard & Reporting Module | 5.14 |
| 4.12.1–4.12.5 | Officer/Applicant Dashboard, Analytics, Reporting | 5.14.2 |
| 4.13 | Notification Module | 5.15 |
| 4.13.1–4.13.5 | Email, System, Push, Templates | 5.15.2 |
| 4.14 | Integration Requirements | 3.4, 5.16 |
| 4.14.1, 4.14.6 | SIRIM Integration, Data Migration | 5.16.2, 5.18 |
| 4.15 | Configuration & Settings | 5.17 |
| 4.15.1–4.15.4 | Params, Officer Groups, Calendar, Fees | 5.17.2 |
| 5.1–5.5 | Performance, Security, PDPA, Availability, Scalability | 7.1–7.4 |
| 5.8 | Backup & Recovery | 7.5 |

---

## 9. Appendices

### Appendix A: User Access Matrix

> Note: System Admin can appoint an OIC Lead who gains ability to manually override applicant assignments.

| Module | System Admin | OIC / Verifier / Recommender | Approver | Applicant (External) | Public |
|---|---|---|---|---|---|
| User Management | CRUD | R | R | R (Own) | — |
| Equipment Registration (SDoC) | R | CRU | RU | CRU (Own) | — |
| Special Approval | R | CRU | RU | CRU (Own) | — |
| Renewal | R | RU | RU | CRU (Own) | — |
| Modification | R | RU | RU | CRU (Own) | — |
| IMEI/Serial Number Registration | R | R | R | CRU (Own) | — |
| Importation | R | R | R | CR (Own) | — |
| Public Module | CRUD | CRUD | R | R | R |
| Dashboard & Reporting | R (All) | R (Assigned) | R (All) | R (Own) | — |
| Configuration & Settings | CRUD | — | — | — | — |

**Legend:** C = Create, R = Read, U = Update, D = Delete

---

### Appendix B: Fee Structure

> All fees are configurable by the System Administrator.

#### Table 1: User Registration Fees

| Category | Application Fee | Annual Fee | Max Period |
|---|---|---|---|
| All (Company, Individual, Institution, Consultant) | RM 100.00 | RM 50.00/year | 5 years |

#### Table 2: Equipment Registration Fees (SDoC)

| Scheme | Fee per Year |
|---|---|
| Scheme A (High Risk) | RM 350.00 |
| Scheme B (Medium Risk) | RM 250.00 |
| Scheme C (Low Risk) | RM 150.00 |

#### Table 3: Special Approval Fees

| Category | Fee per Unit |
|---|---|
| Low/Medium Risk (Registered Model) | RM 20.00 |
| Low/Medium Risk (Non-Registered Model) | RM 40.00 |
| High Risk Equipment | RM 300.00 |
| Prohibited Equipment | RM 300.00 |

#### Table 4: IMEI and Serial Number Registration Fees

| Type | Fee per Unit |
|---|---|
| IMEI Number | RM 0.50 |
| Serial Number | RM 0.15 |

#### Table 5: Renewal Fees

| Type | Fee |
|---|---|
| User Registration Renewal | Same as initial registration (Annual Fee only) |
| Equipment Registration Renewal | Same as initial SDoC registration fees |

---

### Appendix C: AI Scoring Mechanism

#### Scoring Criteria (Total: 100%)

| Criteria | Weight | Description |
|---|---|---|
| SSM/ROC/ROB Validation | 20% | Real-time validation with SSM database confirms legitimate business entity |
| Completeness of Technical Specifications | 15% | All required technical specifications provided |
| Test Report & Lab Verification | 15% | Test report from recognized, accredited lab with valid report number |
| Address & Director Match | 10% | Information matches official SSM records, reducing fraud risk |
| Brand & Model Consistency | 10% | Brand and model consistently named across all documents; not on any blacklist |
| Standards Compliance | 10% | Equipment tested against latest MCMC-required technical standards |
| Supplier's Past Performance | 10% | Supplier has good track record of compliant applications |
| Completeness & Consistency | 10% | All fields correctly filled with no contradictions |

#### Auto-Acceptance Thresholds

> Auto-acceptance applies **only** to Scheme C and Renewal.

| Score Range | Status | Action |
|---|---|---|
| **≥ 90%** | Automatic Acceptance *(Scheme C / Renewal only)* | Application instantly accepted without manual intervention. For other schemes, score displayed to officer with justifying reasons. **Note:** If any single 10%-weight criterion is entirely missing (e.g., Address & Director Match = 0), the system will still request manual review even if total ≥ 90% due to cumulative scoring rules. |
| **70% – 89%** | Priority Review | Flagged for MCMC officer; lower-scoring sections highlighted for targeted assessment |
| **Below 70%** | Standard Manual Review | Sent to general queue for comprehensive manual evaluation; lower-scoring sections + invalid/missing/tampered documents highlighted |

---

## 10. Glossary

| Term | Full Form | Description |
|---|---|---|
| AAD | Azure Active Directory | Microsoft identity service used for MCMC internal user SSO |
| AI | Artificial Intelligence | Automated document validation, risk scoring, chatbot |
| API | Application Programming Interface | Service communication interfaces |
| CoA | Certificate of Acceptance | Issued by RMCD for approved import permits |
| CoC | Certificate of Conformity | Third-party certification of equipment compliance |
| DR | Disaster Recovery | Business continuity environment |
| ESB | Enterprise Service Bus | Integration middleware (IBM webMethods) |
| FAT | Final Acceptance Test | Final system acceptance testing phase |
| ICR | Intelligent Character Recognition | AI document text extraction |
| IMEI | International Mobile Equipment Identity | Unique identifier for cellular devices |
| KPI | Key Performance Indicator | Performance measurement metric |
| LLM | Large Language Model | Foundation of AI chatbot and document analysis |
| MCMC | Malaysian Communications and Multimedia Commission | Regulatory authority |
| NCEF | New Communications Equipment Framework | The regulated registration framework |
| NFR | Non-Functional Requirement | Performance, security, availability requirements |
| OIC | Officer in Charge | MCMC officer role responsible for reviewing applications |
| PDPA | Personal Data Protection Act 2010 | Malaysian data privacy law |
| PMS | Post-Market Surveillance | Ongoing monitoring of registered equipment/suppliers |
| RAG | Retrieval-Augmented Generation | AI chatbot technique using vector search + LLM |
| RBAC | Role-Based Access Control | Permission model managed by Keycloak |
| RCN | Registration Certification Number | Unique identifier for registered equipment |
| RMCD | Royal Malaysian Customs Department | Manages import permits via MyOGA system |
| RPO | Recovery Point Objective | Max acceptable data loss in DR scenario |
| RTO | Recovery Time Objective | Max acceptable downtime in DR scenario |
| SDoC | Supplier's Declaration of Conformity | Primary equipment registration mechanism |
| SDD | Software Design Document | This document (v1.4, Infomina Berhad) |
| SIFS | MCMC Integrated Financial System | MCMC's internal financial platform |
| SLA | Service Level Agreement | Processing time commitments |
| SSM | Suruhanjaya Syarikat Malaysia | Companies Commission of Malaysia |
| SSO | Single Sign-On | Unified authentication for internal MCMC users |
| UAT | User Acceptance Test | Pre-production testing by stakeholders |
| URS | User Requirement Specification | Source requirements document (v1.2) |
| WAF | Web Application Firewall | Security layer at Nginx |

---

## 11. Prototype Mapping

This section maps the SDD specification to the current prototype implementation (`jhamuza/Project-N`).

### Role Mapping

| SDD Role | Prototype Role Key | Identity (Prototype) | Default Screen |
|---|---|---|---|
| External User (Applicant) | `supplier` | Nurul Aisyah binti Ahmad · Axiata Digital | `dashboard` |
| System Administrator | `team-lead` | En. Faisal Rahman · MCMC System Administrator | `officer-queue` |
| OIC / Recommender / Verifier / Approver | `officer` | Pn. Rosnah Idris · MCMC Officer | `officer-queue` |

### Module Implementation Status

| SDD Module | Prototype Screen | Status |
|---|---|---|
| User Management | Login screen, Switch Profile modal, Profile & Settings | Partially implemented (no real auth; demo profiles) |
| Equipment Registration (SDoC) | `sdoc-wizard` (multi-step), `applications` list, `certificate-detail` | Implemented (Scheme A flow) |
| Special Approval | `special-approval` | Stub/partial |
| Renewal | `cert-renewal` | Implemented (mock flow) |
| IMEI/Serial Number Registration | `imei-register` | Implemented (mock bulk upload) |
| Modification | Not yet implemented | — |
| Importation | Not yet implemented | — |
| PMS | Not yet implemented | — |
| Complaint & Surveillance | Not yet implemented | — |
| Compliance Status Management | Not yet implemented | — |
| Public Module | Not yet implemented (public search stub) | — |
| Mobile Application | Not in scope for prototype | — |
| Payment Integration | Mocked via `MOCK.payments` | — |
| AI Features | Mocked AI score display in review flow | — |
| Dashboard & Reporting | `dashboard` (supplier), `officer-queue` (internal), `reports`, `audit` | Partial |
| Notification | Not implemented | — |
| Configuration & Settings | `settings` screen (partial) | Partial |
| Supplier Management | `suppliers-mgmt` (MCMC Admin/Officer) | Implemented |
| Consultant Management | `consultants` (Supplier Admin) | Implemented |

### Screen-to-File Index

| Screen Key | File | Component |
|---|---|---|
| `login` | `components/screens-a.jsx` | `SCREENS.login` |
| `dashboard` | `components/screens-a.jsx` | `SCREENS.dashboard` |
| `sdoc-wizard` | `components/screens-a.jsx` | `SCREENS['sdoc-wizard']` |
| `applications` | `components/screens-a.jsx` | `SCREENS.applications` |
| `certificate-detail` | `components/screens-a.jsx` | `SCREENS['certificate-detail']` |
| `officer-queue` | `NCEF Portal.html` (inline) | `OfficerQueue` component |
| `officer-review` | `components/screens-b.jsx` | `SCREENS['officer-review']` |
| `all-applications` | `components/screens-b.jsx` | `SCREENS['all-applications']` |
| `reports` | `components/screens-b.jsx` | `SCREENS.reports` |
| `audit` | `components/screens-b.jsx` | `SCREENS.audit` |
| `suppliers-mgmt` | `components/screens-b.jsx` | `SCREENS['suppliers-mgmt']` |
| `imei-register` | `components/screens-c.jsx` | `SCREENS['imei-register']` |
| `cert-renewal` | `components/screens-c.jsx` | `SCREENS['cert-renewal']` |
| `consultants` | `components/screens-c.jsx` | `SCREENS.consultants` |
| `profile` | `components/screens-c.jsx` | `SCREENS.profile` |
| `settings` | `components/screens-c.jsx` | `SCREENS.settings` |

### Key Mock Data (`project/data/mock.js`)

| Key | Description |
|---|---|
| `MOCK.profiles` | Three demo profiles (`supplier`, `team-lead`, `officer`) with id/name/role/title/email/avatar |
| `MOCK.officerQueue` | Applications in review queue — `assignedTo` uses real officer IDs (`OFF-001`, `OFF-002`, `null`) |
| `MOCK.supplierDirectory` | Registered suppliers with `addedBy`, `verifiedAt`, `deletedAt` (soft-delete pattern) |
| `MOCK.consultantDirectory` | Category D consultants available for linking |
| `MOCK.myConsultants` | Consultants linked to current supplier account |
| `MOCK.officerPerformance` | Per-officer KPIs; `team` field identifies CPPG team |
| `MOCK.applications` | Supplier's submitted applications with status/scheme/timeline |
| `MOCK.certificates` | Issued RCN certificates with expiry dates |
| `MOCK.payments` | Transaction records per application |

### Navigation by Role

| Role | Nav Items |
|---|---|
| `supplier` | Dashboard, My Applications, Certificates, IMEI Register, Renewal, Consultants, Profile & Settings |
| `team-lead` | Review Queue, Active Review, All Applications, Reports, Audit, Supplier Management, Profile |
| `officer` | Review Queue, Active Review, Supplier Management, Profile |

### Important Business Rules (Prototype Enforcement)

1. **MCMC Admin/Officer cannot create SDoC registrations for vendors** — `SUPPLIER_ONLY` screen guard renders `RestrictedScreen` (403) for `officer`/`team-lead` roles on supplier-only screens
2. **Normal Officer cannot see Reports, Audit, or All Applications** — not in `NAV_OFFICER`; direct access returns restricted screen
3. **IMEI/SN fees:** RM 0.50/IMEI, RM 0.15/SN — shown in `imei-register` screen
4. **Scheme fees:** Scheme A RM350/yr, B RM250/yr, C RM150/yr — shown in `sdoc-wizard`
5. **User registration:** RM100 application + RM50/yr, max 5 years — shown in renewal flow
6. **Soft-delete for suppliers:** `deletedAt` timestamp set, not removed from DB; restorable by admin
7. **AI confidence score displayed** in officer review screen; threshold commentary shown at 90%/70% breakpoints
