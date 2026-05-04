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

> **PROTOTYPE STATUS: ⚠️ PARTIAL** — 6-step wizard implemented (purpose selection → equipment classification → research details → document upload → declaration → confirmation), including prohibited equipment extra-doc flow. Multi-level approval chain routing (OIC → Recommender → Verifier → Approver), SA Letter draft/download, and waiver/reclassification flows are not yet built.

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

> **PROTOTYPE STATUS: ❌ NOT YET IMPLEMENTED** — No screen, wizard, or mock data exists for modification requests. To build: modification request form, document re-upload, officer review routing, and approval/rejection flow. Reference spec §5.6 for full requirements.

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

> **PROTOTYPE STATUS: ❌ NOT YET IMPLEMENTED** — No screen exists. To build: import permit application form (Permit Type selector, goods details, HS code, port of entry), RMCD MyOGA mock integration, permit status tracking, and officer review. Reference spec §5.7 for full requirements.

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

> **PROTOTYPE STATUS: ❌ NOT YET IMPLEMENTED** — No screen exists. To build: audit case management (sampling plans, on-site audit scheduling, non-conformance reports), supplier compliance tracking dashboard, enforcement action logging, and regulatory authority integration. Reference spec §5.8 for full requirements.

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

> **PROTOTYPE STATUS: ❌ NOT YET IMPLEMENTED** — No screen exists. To build: compliance status dashboard, status override controls (Compliant / Non-Compliant / Suspended / Revoked), enforcement action logging, supplier/equipment status timeline, and bulk status updates. Reference spec §5.10 for full requirements.

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

> **PROTOTYPE STATUS: ❌ NOT YET IMPLEMENTED** — No public-facing screen exists. To build: unauthenticated product registry search (by brand/model/RCN), certificate validity lookup, public announcements page, and downloadable standards/fee schedule. Reference spec §5.11 for full requirements.

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

> **PROTOTYPE STATUS: ⚠️ PARTIAL** — Notification preferences matrix (email / SMS / in-app toggles for 6 event categories) is in Profile & Settings. A notifications widget appears on the supplier Dashboard. No dedicated Notifications centre screen, no real email/SMS/push delivery, and no in-app notification bell/dropdown are implemented.

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
| 3 | **Special Approval Submission** — purpose selector → equipment classification → research details → document upload → declaration → confirmation | ⚠️ Partial | 6-step wizard done; multi-level approval chain and SA Letter not built |
| 4 | **Certificate Renewal** — select cert → review docs (reuse/re-upload) → AI re-validation → payment → new RCN confirmation | ✅ Implemented | 5-step wizard in `screens-a.jsx`; document age and reusability rules shown |
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
| 17 | **Modification of Registration** | ❌ Not built | See §5.6 |
| 18 | **Importation Permit Application** | ❌ Not built | See §5.7 |
| 19 | **Post-Market Surveillance (PMS)** | ❌ Not built | See §5.8 |
| 20 | **Post Monitoring / IntelliGenCE** | ❌ Not built | See §5.9 |
| 21 | **Compliance Status Management** | ❌ Not built | See §5.10 |
| 22 | **Public Search** — real-time lookup by Brand/Model/IMEI/SN/RCN (unauthenticated) | ❌ Not built | See §5.11 |

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

> **Last updated: 28 Apr 2026**  
> Deployment: `jhamuza.github.io/Project-N` — GitHub Pages, branch `main`.  
> Recent changes: Full App shell restored in `index.html` (AssignOfficerModal, OfficerQueue, Reports, Audit, SwitchProfileModal, interactive MINA QA engine, notification bell dropdown, session timeout, MCMC logo sidebar, full header). GitHub Pages path fix (`<base href="/Project-N/">` + `.nojekyll`). MCMC user profile data corrected in Profile & Payments screens. **Plotly.js integration** (`plotly-2.35.2.min.js` CDN): replaced all SVG chart stubs in `SCREENS.reports` with 4 interactive Plotly charts — (1) grouped bar + overlay line for 12-month volume trend with forecast shading and Apr/May separator, (2) donut for scheme distribution with centre count, (3) horizontal bar for processing time vs target per scheme, (4) horizontal bar for officer SLA compliance with 95% target line. Mock data expanded: `monthlyTrend` extended to 12 months with `forecast` flag; new `schemeDistribution` and `processingTime` arrays; `officerPerformance` grown to 5 officers; `topApplicants` to 7 entries.

This section maps the specification to the current prototype (`jhamuza/Project-N`).

### Role Mapping

| Spec Role | Prototype Key | Identity | Default Screen |
|---|---|---|---|
| External Applicant (Category A) | `supplier` | Nurul Aisyah binti Ahmad · Axiata Digital | `dashboard` |
| System Administrator | `team-lead` | En. Faisal Rahman · MCMC System Administrator | `officer-queue` |
| OIC / Recommender / Verifier | `officer` | Pn. Rosnah Idris · MCMC Officer | `officer-queue` |

> Approver and Content Manager roles are not yet split in the prototype — both fall under `team-lead` for demo purposes.

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
| **Special Approval** | ✅ Done | 6-step wizard; prohibited equipment extra docs; waiver code input (WaiverCodeInput with mock validation); SA Letter multi-level approval chain | Real waiver code backend; real SA PDF |
| **Certificate Renewal** | ✅ Done | 5-step wizard; document reuse logic; AI re-validation; payment | Automated renewal reminder trigger |
| **IMEI / SN Registration** | ✅ Done | 4-step wizard; manual + CSV; format validation; receipt | Real uniqueness check against NCEF DB |
| **Modification of Registration** | ✅ Done | Request list; version history drawer; 4-step wizard (find cert → type → docs → review); officer split-panel with Accept/Not Accept (`screens-f.jsx`) | — |
| **Importation Module** | ✅ Done | Import permit list; 6-step wizard (type → validate → trader/consignor → consignee/agent → logistics → review); CoA status; detail drawer (`screens-g.jsx`) | Real RMCD MyOGA call |
| **Post-Market Surveillance (PMS)** | ✅ Done | AI audit cards with risk breakdown; sampling proposals; AI weights modal; notify-supplier modal; findings checklist with Pass/Fail/N/A; non-conformance records (`screens-h.jsx`) | Real PMS sampling triggers |
| **Post Monitoring / IntelliGenCE** | ✅ Done (AI Crawl removed) | Complaints list with severity triage; detail panel with timeline; intake wizard; Knowledge Base (`screens-i.jsx`). AI Web Crawl intentionally removed. | — |
| **Compliance Status Management** | ✅ Done | Suppliers tab with bulk-select; compliance timeline drawer; Change Status modal; Certificates tab; Enforcement Actions tab (`screens-j.jsx`) | Real status propagation to ESB |
| **Public Search Portal** | ✅ Done | Bilingual hero; Advanced Search; certificate detail with QR; How-to-Register guide; Documents tab; FAQ; Contact tab; MINA public chatbot (`screens-k.jsx`) | — |
| **Mobile Apps (Android/iOS/HW)** | 🚫 Out of scope | — | Native Flutter apps — production deliverable only |
| **Officer Queue** | ✅ Done | My / Team / Unassigned tabs; assign modal; SLA circles; KPI row | — |
| **Active Review (Officer)** | ✅ Done | Split view: styled PDF viewer mockup (dark toolbar + page frame) + decision panel; audit trail; access guard; TL Reassign | Real PDF rendering |
| **Suppliers Management** | ✅ Done | Add / bulk CSV / soft-delete / restore; MCMC-added flag | — |
| **Reports & Analytics** | ✅ Done | Monthly trend chart; top applicants; officer performance (TL only) | Real data export (CSV/PDF); live chart data |
| **Audit Log** | ✅ Done | Searchable, role-filtered, expandable rows (TL only) | Real immutable server-side log |
| **Certificates List** | ✅ Done | Filter by status; detail drawer; renew/IMEI shortcuts | — |
| **Payments & Invoices** | ✅ Done | Transaction history; payment methods; Fee Offset & Refunds card (credit balance, pending refund, offset policy) | Standalone payment portal; real MCMC Pay gateway; SIFS reconciliation |
| **Consultant Management** | ✅ Done | Link/unlink from directory; scheme assignment; notes | — |
| **AI Score Display** | ✅ Done | Gauge / bar / verdict visualisations; 8 sub-scores; threshold commentary | Real Qwen2.5-VL API call; auto-accept routing |
| **MINA Chatbot** | ✅ Done | Interactive drawer; 19-pair QA engine; typing indicator; quick-pick tags; live input with Enter-to-send | Real LLM backend |
| **Notification Centre** | ✅ Done | Dedicated Notifications page with 4 tabs (All/Unread/Action/System); in-app bell dropdown (5 items); session timeout modal with 60-s countdown | Real email/SMS/push delivery |
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
4. **Scheme fees:** A RM 350/yr, B RM 250/yr, C RM 150/yr — displayed in `sdoc-wizard`
5. **User reg fee:** RM 100 + RM 50/yr, max 5 years — shown in renewal flow
6. **Soft-delete suppliers:** `deletedAt` set rather than physical delete; restorable by admin
7. **AI confidence score** displayed in officer review; 90%/70% threshold commentary shown

---

## 12. User Engagement Findings & Initiatives

> **Last updated: 29 Apr 2026** — Compiled from user engagement session feedback, cross-referenced against URS §5.2 (SDoC), §5.3 (Special Approval), §5.4 (Renewal), §5.5 (IMEI), §5.7 (Importation), §5.13 (Payment), §5.18 (Admin Config).

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
| 1 | My Applications: Categorised list with pagination | `screens-a.jsx` applications screen | S–M | 2 | Pending |
| 2 | Remove compliance score from supplier view; replace with doc status | `shared.jsx`, `screens-a.jsx`, `screens-b.jsx` | S | 1 | **Done** |
| 3 | Document validation: surface specific findings per document | `screens-b.jsx` DocsStep + ValidationStep | S–M | 1 | **Done** |
| 4 | SDoC: scheme-specific documents, Part C/D, 6-month validity rule | `screens-b.jsx` DocsStep, `mock.js` | M | 3 | Pending |
| 5 | Special Approval: risk-tier split, SA Letter editor, prohibited rules | `screens-b.jsx` special-approval | L | 6 | Pending |
| 6 | Importation: RCN auto-populate device details + block-on-error | `screens-g.jsx` | S–M | 4 | Pending |
| 7 | Renewal: max period cap enforcer, expiry clarity, Scheme A CoC warning | `screens-a.jsx` cert-renewal, `screens-c.jsx` | S–M | 3 | Pending |
| 8 | Supplier multi-user accounts: invite / join-request / admin approval | `screens-c.jsx` Profile Team tab, `mock.js` | M | 4 | Pending |
| 9 | Fee editor: full inline edit with SST toggle, SST%, SST amount, total | `screens-e.jsx` FeeTab, `mock.js` feeStructure | S | 2 | Pending |
| 10 | Admin workflow visualiser: flow diagram per application type, stage roles | `screens-e.jsx` WorkflowTab, `mock.js` | M | 5 | Pending |
| 11 | Reports: team-level scope filter | `index.html` SCREENS.reports | S | 5 | Pending |

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

### 12.4 Key Design Decisions (from session)

- **Compliance score is strictly internal** — visible only in officer Active Review; never surfaced to applicants as a benchmark or pass/fail indicator
- **Document validation is guidance, not verdict** — findings shown as "please ensure…" items, not approval/rejection signals; "Next" blocked only on missing required documents
- **Special Approval flow must not be fully standardised** until MCMC confirms document requirements per risk/purpose combination — keep flexible until §5.3 requirements are signed off with client
- **SA Letter editability** is controlled by admin — OIC can only edit fields the admin has unlocked; full letter template and locked fields configurable in Admin Config (§10 workflow visualiser)
- **Renewal maximum cap** enforced at the duration selector — `max years selectable = 5 − yearsAlreadyUsed`; fee auto-updates per year selected
- **Importation "Next" block** — must resolve all duplicates and invalid-format entries before proceeding to payment step
- **Supplier multi-user** — join-request model: user registers with existing SSM BRN → pending approval by supplier admin; or supplier admin invites by email directly
- **Reports scope** — Team Lead sees their team by default; can optionally expand to org-wide; Normal Officer cannot access Reports (nav restriction already in place)
