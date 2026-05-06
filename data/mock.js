// Realistic Malaysian mock data for NCEF prototype
window.MOCK = {
  currentUser: {
    name: 'Nurul Aisyah binti Ahmad',
    role: 'supplier',
    company: 'Axiata Digital Sdn Bhd',
    supplierId: 'SUP-0426-00142',
    email: 'nurul.aisyah@axiatadigital.com.my',
  },
  // Demo profile map — used by Login, Switch Profile, and header identity.
  // All officers belong to MCMC's CPPG (Communications & Products Permit Group).
  profiles: {
    supplier: {
      id: 'SUP-0426-00142',
      role: 'supplier',
      name: 'Nurul Aisyah binti Ahmad',
      title: 'Supplier Administrator',
      initials: 'NA',
      email: 'nurul.aisyah@axiatadigital.com.my',
      company: 'Axiata Digital Sdn Bhd',
      supplierId: 'SUP-0426-00142',
      org: 'Axiata Digital Sdn Bhd',
    },
    'team-lead': {
      id: 'OFF-001',
      role: 'team-lead',
      name: 'En. Faisal Rahman bin Zainudin',
      title: 'MCMC System Administrator',
      initials: 'FR',
      email: 'faisal.rahman@mcmc.gov.my',
      team: 'CPPG-TL-01',
      org: 'Malaysian Communications and Multimedia Commission (MCMC)',
      division: 'Consumer & Product Permit Group (CPPG)',
      department: 'Certification & Product Quality (CPQ)',
      grade: 'N54',
      phone: '+603-8688 8200',
    },
    officer: {
      id: 'OFF-002',
      role: 'officer',
      name: 'Pn. Rosnah binti Idris',
      title: 'Certification Officer',
      initials: 'RI',
      email: 'rosnah.idris@mcmc.gov.my',
      team: 'CPPG-TL-01',
      reportsTo: 'OFF-001',
      org: 'Malaysian Communications and Multimedia Commission (MCMC)',
      division: 'Consumer & Product Permit Group (CPPG)',
      department: 'Certification & Product Quality (CPQ)',
      grade: 'N44',
      phone: '+603-8688 8205',
    },
    recommender: {
      id: 'OFF-004',
      role: 'recommender',
      name: 'En. Ahmad Rashid bin Kamarudin',
      title: 'Recommender (P5/P6)',
      initials: 'AR',
      email: 'ahmad.rashid@mcmc.gov.my',
      team: 'CPPG-SA-01',
      org: 'Malaysian Communications and Multimedia Commission (MCMC)',
      division: 'Consumer & Product Permit Group (CPPG)',
      department: 'Special Approvals Unit (SAU)',
      grade: 'N48',
      phone: '+603-8688 8210',
    },
    verifier: {
      id: 'OFF-005',
      role: 'verifier',
      name: 'Pn. Halimah binti Yusof',
      title: 'Verifier (P7)',
      initials: 'HY',
      email: 'halimah.yusof@mcmc.gov.my',
      team: 'CPPG-SA-01',
      org: 'Malaysian Communications and Multimedia Commission (MCMC)',
      division: 'Consumer & Product Permit Group (CPPG)',
      department: 'Special Approvals Unit (SAU)',
      grade: 'N52',
      phone: '+603-8688 8212',
    },
    approver: {
      id: 'OFF-006',
      role: 'approver',
      name: "Dato' Dr. Razif bin Ahmad Zaki",
      title: 'Director, CPPG',
      initials: 'RZ',
      email: 'razif.zaki@mcmc.gov.my',
      team: 'CPPG-SA-01',
      org: 'Malaysian Communications and Multimedia Commission (MCMC)',
      division: 'Consumer & Product Permit Group (CPPG)',
      department: 'Directorate',
      grade: 'JUSA C',
      phone: '+603-8688 8001',
    },
    'content-manager': {
      id: 'OFF-007',
      role: 'content-manager',
      name: 'Cik Siti Nabilah binti Roslan',
      title: 'Content Manager',
      initials: 'SN',
      email: 'siti.nabilah@mcmc.gov.my',
      org: 'Malaysian Communications and Multimedia Commission (MCMC)',
      division: 'Corporate Communications',
      department: 'Digital Content & Public Affairs',
      grade: 'N41',
      phone: '+603-8688 8310',
    },
  },

  // Full MCMC team roster — used by Workflow Config role-tagging and performance views.
  mcmcTeamMembers: [
    { id: 'OFF-001', name: 'En. Faisal Rahman bin Zainudin',   initials: 'FR', grade: 'N54', email: 'faisal.rahman@mcmc.gov.my',     division: 'CPPG', department: 'CPQ', roles: ['team-lead'],                         reportsTo: null,     phone: '+603-8688 8200' },
    { id: 'OFF-002', name: 'Pn. Rosnah binti Idris',           initials: 'RI', grade: 'N44', email: 'rosnah.idris@mcmc.gov.my',       division: 'CPPG', department: 'CPQ', roles: ['officer'],                           reportsTo: 'OFF-001', phone: '+603-8688 8205' },
    { id: 'OFF-003', name: 'En. Syahrul Azlan bin Hamid',       initials: 'SA', grade: 'N44', email: 'syahrul.azlan@mcmc.gov.my',      division: 'CPPG', department: 'CPQ', roles: ['officer'],                           reportsTo: 'OFF-001', phone: '+603-8688 8206' },
    { id: 'OFF-004', name: 'En. Ahmad Rashid bin Kamarudin',   initials: 'AR', grade: 'N48', email: 'ahmad.rashid@mcmc.gov.my',       division: 'CPPG', department: 'SAU', roles: ['officer', 'recommender'],            reportsTo: 'OFF-001', phone: '+603-8688 8210' },
    { id: 'OFF-005', name: 'Pn. Halimah binti Yusof',          initials: 'HY', grade: 'N52', email: 'halimah.yusof@mcmc.gov.my',      division: 'CPPG', department: 'SAU', roles: ['verifier'],                          reportsTo: 'OFF-006', phone: '+603-8688 8212' },
    { id: 'OFF-006', name: "Dato' Dr. Razif bin Ahmad Zaki",   initials: 'RZ', grade: 'JUSA C', email: 'razif.zaki@mcmc.gov.my',     division: 'CPPG', department: 'Directorate', roles: ['approver'],                   reportsTo: null,     phone: '+603-8688 8001' },
    { id: 'OFF-007', name: 'Pn. Siti Nurhaliza binti Aziz',    initials: 'SN', grade: 'N44', email: 'siti.nurhaliza@mcmc.gov.my',     division: 'CPPG', department: 'CPQ', roles: ['officer'],                           reportsTo: 'OFF-001', phone: '+603-8688 8207' },
    { id: 'OFF-008', name: 'En. Khairul Anwar bin Ismail',     initials: 'KA', grade: 'N48', email: 'khairul.anwar@mcmc.gov.my',      division: 'CPPG', department: 'CPQ', roles: ['officer', 'recommender'],            reportsTo: 'OFF-001', phone: '+603-8688 8208' },
    { id: 'OFF-009', name: 'Pn. Nor Azlina binti Mohd Noor',   initials: 'NA', grade: 'N48', email: 'nor.azlina@mcmc.gov.my',         division: 'CPPG', department: 'SAU', roles: ['recommender'],                       reportsTo: 'OFF-006', phone: '+603-8688 8213' },
    { id: 'OFF-010', name: 'Dr. Zulkifli bin Ibrahim',          initials: 'ZI', grade: 'N52', email: 'zulkifli.ibrahim@mcmc.gov.my',  division: 'CPPG', department: 'CPQ', roles: ['verifier', 'team-lead'],             reportsTo: 'OFF-006', phone: '+603-8688 8202' },
  ],

  // Role definitions used by Workflow Config tab
  roleDefinitions: [
    { key: 'officer',     label: 'OIC / Certification Officer', color: 'blue',   description: 'Reviews and processes SDoC applications; can approve, reject, or issue iteration requests.' },
    { key: 'recommender', label: 'Recommender (P5/P6)',         color: 'green',  description: 'Reviews Special Approval applications and recommends Accept or Not Accept to the Verifier.' },
    { key: 'verifier',    label: 'Verifier (P7)',               color: 'orange', description: 'Verifies the Recommender\'s finding and endorses or returns the SA application.' },
    { key: 'approver',    label: 'Approver (P8)',               color: 'red',    description: 'Final authority for Special Approval decisions. Can approve, reject, or escalate to DG.' },
    { key: 'team-lead',   label: 'Team Lead / Administrator',   color: 'purple', description: 'Manages team queues, assigns applications, configures system settings, and reviews audit logs.' },
  ],
  assessments: [
    { id: 'APP-0426-00087', rcn: 'RCN-0326-00451', scheme: 'A', status: 'under_review', product: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', model: 'SM-S928B', updated: '2026-04-18T10:30:00', submitted: '2026-04-15T14:20:00', aiScore: 87, officer: 'En. Faisal Rahman', priority: 'normal' },
    { id: 'APP-0426-00088', rcn: null, scheme: 'B', status: 'draft', product: 'Huawei Mate 60 Pro', brand: 'Huawei', model: 'BRA-LX9', updated: '2026-04-17T09:15:00', aiScore: null, priority: 'normal' },
    { id: 'APP-0426-00085', rcn: 'RCN-0326-00449', scheme: 'C', status: 'approved', product: 'Mi Band 9 Pro', brand: 'Xiaomi', model: 'M2320B1', updated: '2026-04-10T16:45:00', submitted: '2026-04-08T11:00:00', aiScore: 94, priority: 'normal' },
    { id: 'APP-0426-00083', rcn: null, scheme: 'A', status: 'iteration_required', product: 'Apple Watch Ultra 3', brand: 'Apple', model: 'A3145', updated: '2026-04-09T13:20:00', submitted: '2026-04-05T10:15:00', aiScore: 62, priority: 'high', iterationDue: '2026-06-04' },
    { id: 'APP-0426-00082', rcn: null, scheme: 'SA', status: 'rejected', product: 'Jammer Device (R&D)', brand: 'Unknown', model: 'JM-2024', updated: '2026-04-08T09:00:00', submitted: '2026-04-02T14:00:00', aiScore: 41, priority: 'critical' },
    { id: 'APP-0426-00079', rcn: 'RCN-0326-00442', scheme: 'A', status: 'approved', product: 'OPPO Find X7 Ultra', brand: 'OPPO', model: 'CPH2583', updated: '2026-04-05T12:00:00', submitted: '2026-04-01T09:30:00', aiScore: 91, priority: 'normal' },
  ],
  officerQueue: [
    { id: 'APP-0426-00087', scheme: 'A', applicant: 'Axiata Digital Sdn Bhd', product: 'Samsung Galaxy S24 Ultra', submitted: '2026-04-15T14:20:00', aiScore: 87, priority: 'normal', slaHours: 18, assignedTo: 'OFF-001' },
    { id: 'APP-0426-00091', scheme: 'B', applicant: 'Celcom Axiata Berhad', product: 'HP LaserJet Pro MFP', submitted: '2026-04-16T11:05:00', aiScore: 78, priority: 'normal', slaHours: 36, assignedTo: 'OFF-002' },
    { id: 'APP-0426-00092', scheme: 'C', applicant: 'TM Technology Services', product: 'Unifi Router AX3000', submitted: '2026-04-17T08:30:00', aiScore: 96, priority: 'low', slaHours: 60, assignedTo: 'OFF-002' },
    { id: 'APP-0426-00094', scheme: 'SA', applicant: 'Maxis Broadband Sdn Bhd', product: '5G mmWave Test Unit', submitted: '2026-04-18T10:15:00', aiScore: 65, priority: 'high', slaHours: 8, assignedTo: null },
    { id: 'APP-0426-00095', scheme: 'A', applicant: 'Digi Telecommunications', product: 'Ericsson AIR 6419', submitted: '2026-04-18T15:42:00', aiScore: 83, priority: 'normal', slaHours: 48, assignedTo: 'OFF-003' },
  ],
  autoCertified: [
    { id: 'APP-0426-00096', scheme: 'C', applicant: 'Axiata Digital Sdn Bhd', product: 'Samsung Galaxy S24 Ultra', submitted: '2026-05-05T09:12:00', aiScore: 94, rcn: 'RCN-0526-00512', issuedAt: '2026-05-05T09:14:38', certExpiry: '2027-05-05' },
    { id: 'APP-0426-00097', scheme: 'C', applicant: 'U Mobile Sdn Bhd', product: 'Xiaomi Redmi Note 14', submitted: '2026-05-04T14:33:00', aiScore: 91, rcn: 'RCN-0526-00510', issuedAt: '2026-05-04T14:35:02', certExpiry: '2027-05-04' },
    { id: 'APP-0426-00098', scheme: 'C', applicant: 'YTL Communications Sdn Bhd', product: 'TP-Link Archer BE9300', submitted: '2026-05-03T11:00:00', aiScore: 93, rcn: 'RCN-0526-00507', issuedAt: '2026-05-03T11:02:15', certExpiry: '2028-05-03' },
  ],
  // Supplier-facing audit trail (no AI/system internals)
  supplierAuditTrail: {
    'APP-0426-00087': [
      { t: 'Application submitted',              d: '15 Apr 2026, 14:20', icon: '\ud83d\udce4', note: '' },
      { t: 'Documents received and logged',      d: '15 Apr 2026, 14:21', icon: '\ud83d\udccb', note: '6 documents accepted' },
      { t: 'Compliance check complete',          d: '15 Apr 2026, 14:23', icon: '\u2705', note: 'Compliance score: 87/100 \u2014 2 items require attention' },
      { t: 'Assigned for officer review',        d: '15 Apr 2026, 14:24', icon: '\u27a1\ufe0f', note: 'Expected response within 3 working days' },
      { t: 'Under review',                       d: '18 Apr 2026, 10:30', icon: '\ud83d\udc41', note: 'An officer has opened your application' },
    ],
    'APP-0426-00085': [
      { t: 'Application submitted',              d: '8 Apr 2026, 11:00', icon: '\ud83d\udce4', note: '' },
      { t: 'Documents received and logged',      d: '8 Apr 2026, 11:01', icon: '\ud83d\udccb', note: '5 documents accepted' },
      { t: 'Compliance check complete',          d: '8 Apr 2026, 11:02', icon: '\u2705', note: 'Compliance score: 94/100 \u2014 all criteria met' },
      { t: 'Approved \u2014 certificate issued',      d: '10 Apr 2026, 16:45', icon: '\ud83c\udf89', note: 'RCN-0326-00449 issued. Download available.' },
    ],
    'APP-0426-00083': [
      { t: 'Application submitted',              d: '5 Apr 2026, 10:15', icon: '\ud83d\udce4', note: '' },
      { t: 'Compliance check complete',          d: '5 Apr 2026, 10:17', icon: '\u26a0\ufe0f', note: 'Compliance score: 62/100 \u2014 multiple items flagged' },
      { t: 'Assigned for officer review',        d: '5 Apr 2026, 10:18', icon: '\u27a1\ufe0f', note: '' },
      { t: 'Iteration requested',                d: '9 Apr 2026, 13:20', icon: '\u21a9\ufe0f', note: 'Please review the officer comments and resubmit by 4 Jun 2026' },
    ],
  },
  // Officer / MCMC-internal view \u2014 uses technical AI model language
  aiReasoning: [
    { category: 'SSM/ROC/ROB Validation',        score: 18, max: 20, note: 'BRN 201901023456 verified via SSM API; entity active since 2019. Director identity cross-checked against NRIC.',                          pass: true  },
    { category: 'Address & Director Match',        score: 10, max: 10, note: 'Qwen2.5-VL extracted registered address from SSM cert; exact match to declared address field.',                                           pass: true  },
    { category: 'Completeness of Technical Specs', score: 13, max: 15, note: 'Output power (26 dBm) extracted. Secondary frequency band (2400\u20132483.5 MHz sub-band) absent from technical brochure.',                  pass: false },
    { category: 'Brand & Model Consistency',       score: 10, max: 10, note: 'Model string "SM-S928B" consistent across brochure, test report header, and label photo OCR.',                                           pass: true  },
    { category: 'Test Report & Lab Verification',  score: 14, max: 15, note: 'SIRIM QAS International (Accreditation #LM-15-004) report dated 2026-03-12. Lab scope matches device category.',                        pass: true  },
    { category: 'Standards Compliance',            score:  8, max: 10, note: 'MCMC MTSFB TC G015:2022 \u2014 clause 5.3.2 marked "N/A" without documented justification. Flagged for officer review.',                    pass: false },
    { category: 'Supplier Track Record',           score:  9, max: 10, note: '47 prior approvals; 0 rejections; 0 open enforcement actions in the last 24 months. Verified against NCEF history table.',              pass: true  },
    { category: 'Completeness & Consistency',      score:  5, max: 10, note: '"Marketing Name" field blank. Frequency band missing from product photo label. Minor \u2014 will not block approval but flags for label check.', pass: false },
  ],
  // Supplier-facing compliance breakdown \u2014 same criteria, no AI/model references
  complianceChecks: [
    { category: 'Business Registration',           score: 18, max: 20, note: 'Your SSM business registration is valid and active. Company details match the submission.',                                                pass: true  },
    { category: 'Applicant Identity',              score: 10, max: 10, note: 'Authorised representative and registered address are consistent with your account profile.',                                              pass: true  },
    { category: 'Technical Specifications',        score: 13, max: 15, note: 'Output power declared correctly. Please ensure the secondary frequency sub-band is included in your technical brochure.',                pass: false },
    { category: 'Brand & Model Consistency',       score: 10, max: 10, note: 'Model number matches across your brochure, test report, and product label photo \u2014 no discrepancies found.',                              pass: true  },
    { category: 'Test Report',                     score: 14, max: 15, note: 'Accredited lab report accepted (SIRIM QAS International, dated 2026-03-12). Report scope covers the declared product category.',         pass: true  },
    { category: 'Standards Declaration',           score:  8, max: 10, note: 'One clause in your MCMC MTSFB TC G015:2022 declaration is marked "N/A" without a reason. Please provide a brief justification.',       pass: false },
    { category: 'Account Standing',               score:  9, max: 10, note: 'Your account has a strong approval history with no rejections or enforcement actions in the past 24 months.',                            pass: true  },
    { category: 'Form Completeness',               score:  5, max: 10, note: 'The "Marketing Name" field is blank and the frequency band is missing from the product label photo. Completing these will improve your score.', pass: false },
  ],
  // Document-level findings shown to suppliers during validation step.
  // Each entry maps to one uploaded document. Findings give specific guidance, not pass/fail verdicts.
  documentFindings: [
    {
      docKey: 'reg',
      docLabel: 'Company Registration (SSM)',
      status: 'accepted',
      findings: [],
    },
    {
      docKey: 'bro',
      docLabel: 'Technical Brochure / Datasheet',
      status: 'review',
      findings: [
        { field: 'Frequency Band', note: 'Secondary sub-band range not specified. Please include the full operating range in the technical brochure (e.g. 2400-2483.5 MHz including all sub-bands).' },
      ],
    },
    {
      docKey: 'test',
      docLabel: 'Test Report (accredited lab)',
      status: 'accepted',
      findings: [],
    },
    {
      docKey: 'photo',
      docLabel: 'Product Photos (front, back, label)',
      status: 'review',
      findings: [
        { field: 'Label Photo', note: 'Frequency band is not visible on the label photo. Please ensure the label shows the operating frequency or resubmit a clearer image.' },
      ],
    },
    {
      docKey: 'decl',
      docLabel: 'Standards Declaration (MCMC MTSFB TC G015:2022)',
      status: 'review',
      findings: [
        { field: 'Clause 5.3.2', note: 'This clause is marked as N/A without a written justification. Please add a brief explanation for why this clause does not apply to your product.' },
      ],
    },
    {
      docKey: 'form',
      docLabel: 'Application Form',
      status: 'review',
      findings: [
        { field: 'Marketing Name', note: 'Field is blank. This is not mandatory but leaving it blank may delay the product being added to the label registry after approval.' },
      ],
    },
  ],
  documents: [
    { name: 'Company_Registration_SSM.pdf', type: 'Company Registration', size: '2.1 MB', ocrStatus: 'verified', uploaded: '2026-04-15T14:05:00' },
    { name: 'Technical_Brochure_S24Ultra.pdf', type: 'Technical Brochure', size: '4.8 MB', ocrStatus: 'verified', uploaded: '2026-04-15T14:08:00' },
    { name: 'Test_Report_SIRIM_2026.pdf', type: 'Test Report', size: '1.9 MB', ocrStatus: 'verified', uploaded: '2026-04-15T14:12:00' },
    { name: 'Product_Photo_Front.jpg', type: 'Product Photo', size: '0.8 MB', ocrStatus: 'pending', uploaded: '2026-04-15T14:15:00' },
    { name: 'Product_Photo_Back.jpg', type: 'Product Photo', size: '0.9 MB', ocrStatus: 'pending', uploaded: '2026-04-15T14:15:00' },
    { name: 'Product_Photo_Label.jpg', type: 'Product Photo (Label)', size: '0.6 MB', ocrStatus: 'verified', uploaded: '2026-04-15T14:16:00' },
  ],
  kpi: {
    supplier: { totalApps: 23, approved: 17, pending: 3, expiringSoon: 2 },
    officer: { pending: 5, approvedToday: 8, rejectedToday: 1, avgTurnaround: 4.2 },
  },
  // Master supplier directory — used by:
  //   • Onboarding picker (existing supplier flow)
  //   • Officer/Admin Suppliers Management screen (view all, add, soft-delete)
  // `addedBy`: 'self-registration' | 'mcmc-admin' | 'mcmc-officer'
  // `deletedAt` is null when active; populated with ISO timestamp on soft-delete.
  supplierDirectory: [
    { id: 'SUP-0126-00087', name: 'Axiata Digital Sdn Bhd',         brn: '201901023456', category: 'A', since: '2019-03-14', approvals: 47, active: true, address: 'Level 21, Axiata Tower, KL Sentral',     pic: 'Nurul Aisyah binti Ahmad', picEmail: 'nurul.aisyah@axiatadigital.com.my', addedBy: 'self-registration', addedAt: '2019-03-14', verifiedAt: '2019-03-20', deletedAt: null },
    { id: 'SUP-0322-00045', name: 'Celcom Axiata Berhad',           brn: '199201015249', category: 'A', since: '2022-08-21', approvals: 32, active: true, address: 'Menara Celcom, Jalan Semangat, PJ',       pic: 'Mohd Faizal Ismail',       picEmail: 'mohd.faizal@celcom.com.my',          addedBy: 'self-registration', addedAt: '2022-08-21', verifiedAt: '2022-08-26', deletedAt: null },
    { id: 'SUP-0420-00012', name: 'Maxis Broadband Sdn Bhd',        brn: '234582400900', category: 'A', since: '2020-01-07', approvals: 58, active: true, address: 'Menara Maxis, KLCC',                     pic: 'Tan Wei Loong',            picEmail: 'tan.weiloong@maxis.com.my',          addedBy: 'self-registration', addedAt: '2020-01-07', verifiedAt: '2020-01-14', deletedAt: null },
    { id: 'SUP-0621-00091', name: 'TM Technology Services',         brn: '198401023456', category: 'A', since: '2021-06-15', approvals: 21, active: true, address: 'TM Tower, Jalan Pantai Baharu',          pic: 'Siti Aminah Ismail',       picEmail: 'siti.aminah@tm.com.my',              addedBy: 'self-registration', addedAt: '2021-06-15', verifiedAt: '2021-06-22', deletedAt: null },
    { id: 'SUP-0823-00210', name: 'Digi Telecommunications',        brn: '199701009694', category: 'A', since: '2023-09-04', approvals: 9,  active: true, address: 'D\'House, Shah Alam',                    pic: 'Ravi Kumar Pillai',        picEmail: 'ravi.k@digi.com.my',                 addedBy: 'self-registration', addedAt: '2023-09-04', verifiedAt: '2023-09-11', deletedAt: null },
    { id: 'SUP-0224-00142', name: 'Huawei Technologies (M) Sdn Bhd',brn: '200101020034', category: 'A', since: '2024-02-19', approvals: 14, active: true, address: 'Level 9, Quill 7 Tower, KL Sentral',     pic: 'Wong Chee Wai',            picEmail: 'wong.cw@huawei.com',                 addedBy: 'self-registration', addedAt: '2024-02-19', verifiedAt: '2024-02-26', deletedAt: null },
    { id: 'SUP-0125-00355', name: 'YTL Communications Sdn Bhd',     brn: '200401012345', category: 'A', since: '2025-01-12', approvals: 5,  active: true, address: 'YTL Plaza, Jalan Bukit Bintang, KL',     pic: 'Lee Ai Ling',              picEmail: 'lee.aling@ytlcomms.my',              addedBy: 'mcmc-admin',        addedAt: '2025-01-12', verifiedAt: null,        deletedAt: null },
    { id: 'SUP-0326-00478', name: 'Sapura Industrial Berhad',       brn: '199001003456', category: 'B', since: '2026-03-02', approvals: 1,  active: true, address: 'Wisma Sapura, Jalan Tun Razak, KL',      pic: 'Ahmad Bin Hassan',         picEmail: 'ahmad.h@sapura.com.my',              addedBy: 'mcmc-officer',      addedAt: '2026-03-02', verifiedAt: null,        deletedAt: null },
    { id: 'SUP-0922-00067', name: 'Iris Corporation Berhad',        brn: '199801007890', category: 'C', since: '2022-09-15', approvals: 0,  active: false,address: 'IRIS Smart Complex, Cyberjaya',          pic: 'Rajesh Singh',             picEmail: 'rajesh.s@iris.com.my',               addedBy: 'self-registration', addedAt: '2022-09-15', verifiedAt: '2022-09-25', deletedAt: '2025-11-30' },
  ],
  // System-wide consultant directory (Category D users in URS classification).
  // Suppliers can pick from these via dropdown (per SDD §5.1.2 Principal & Consultant Mgmt).
  consultantDirectory: [
    { id: 'CON-0119-00012', name: 'En. Zaki Aziz',          firm: 'TelecomCert Consulting Sdn Bhd', expertise: ['Telecom', 'EMC'],        email: 'zaki.aziz@telecomcert.my',     phone: '+60-3-7831-2200', since: '2019-08-12', engagements: 38, active: true },
    { id: 'CON-0220-00045', name: 'Ms. Priya Devi',         firm: 'EMCert Solutions Sdn Bhd',       expertise: ['EMC', 'Safety'],          email: 'priya.d@emcert.my',            phone: '+60-3-2161-4488', since: '2020-02-04', engagements: 27, active: true },
    { id: 'CON-0721-00033', name: 'Dr. Lim Boon Chin',      firm: 'SpectrumLab Advisory',           expertise: ['Spectrum', 'Telecom'],    email: 'limbc@spectrumlab.my',         phone: '+60-3-9056-1180', since: '2021-07-19', engagements: 19, active: true },
    { id: 'CON-0322-00071', name: 'En. Mohd Hafiz Suleiman',firm: 'Hafiz Tech Consultancy',         expertise: ['Telecom', 'Wi-Fi'],       email: 'hafiz@hafiztech.my',           phone: '+60-3-2173-6655', since: '2022-03-08', engagements: 14, active: true },
    { id: 'CON-1023-00088', name: 'Pn. Norliza Mansor',     firm: 'Independent (freelance)',        expertise: ['Documentation', 'SDoC'],  email: 'norliza.mansor@gmail.com',     phone: '+60-12-345-6789', since: '2023-10-22', engagements: 8,  active: true },
    { id: 'CON-0124-00112', name: 'Ir. Tan Kok Wai',        firm: 'KW Engineering Services',        expertise: ['Safety', 'EMC'],          email: 'tankw@kweng.my',               phone: '+60-3-7956-2241', since: '2024-01-18', engagements: 5,  active: true },
  ],
  // Consultants linked to the current supplier (Axiata Digital). Editable by Supplier Admin.
  myConsultants: [
    { id: 'CON-0119-00012', linkedAt: '2024-08-12', primaryFor: ['Scheme A', 'Scheme B'], notes: 'Lead consultant for telecom equipment registrations.' },
    { id: 'CON-0220-00045', linkedAt: '2025-02-19', primaryFor: ['Scheme A'],             notes: 'EMC compliance review.' },
    { id: 'CON-1023-00088', linkedAt: '2026-01-07', primaryFor: ['Scheme C'],             notes: 'Documentation support for low-risk products.' },
  ],
  // Principal directory (companies that can be linked as Principals by suppliers).
  principalDirectory: [
    { id: 'PRI-0124-00031', name: 'Samsung Electronics Co., Ltd.', country: 'South Korea', category: 'Manufacturer', regNo: 'KR-124-31-00825', contact: 'global.ncef@samsung.com' },
    { id: 'PRI-0220-00018', name: 'Sony Corporation',               country: 'Japan',       category: 'Manufacturer', regNo: 'JP-0000-00-7212418', contact: 'ncef@sony.com' },
    { id: 'PRI-0322-00055', name: 'Huawei Technologies Co., Ltd.',  country: 'China',       category: 'Manufacturer', regNo: 'CN-91440300MA5JH7Y72H', contact: 'cert@huawei.com' },
    { id: 'PRI-0119-00009', name: 'Nokia Solutions and Networks Oy',country: 'Finland',     category: 'OEM',          regNo: 'FI-0112038-9', contact: 'regulatory@nokia.com' },
    { id: 'PRI-0523-00077', name: 'Ericsson AB',                    country: 'Sweden',      category: 'Manufacturer', regNo: 'SE-556016-0680', contact: 'certification@ericsson.com' },
  ],
  // Principals linked to the current supplier (Axiata Digital). Editable by Supplier Admin.
  myPrincipals: [
    { id: 'PRI-0124-00031', linkedAt: '2024-04-10', louStatus: 'verified', loaStatus: 'verified' },
    { id: 'PRI-0220-00018', linkedAt: '2025-09-03', louStatus: 'verified', loaStatus: 'pending' },
  ],
  // Team members for current supplier account
  teamMembers: [
    { id: 1, name: 'Nurul Aisyah binti Ahmad', email: 'nurul.aisyah@axiatadigital.com.my', role: 'Administrator', status: 'active', lastActive: '2026-04-19T08:15:00', joined: '2024-01-15' },
    { id: 2, name: 'Kamarul Ariffin bin Osman', email: 'kamarul.a@axiatadigital.com.my', role: 'PIC (Technical)', status: 'active', lastActive: '2026-04-18T16:40:00', joined: '2024-03-22' },
    { id: 3, name: 'Lee Wei Ming', email: 'lee.wm@axiatadigital.com.my', role: 'Submitter', status: 'active', lastActive: '2026-04-17T11:20:00', joined: '2024-07-01' },
    { id: 4, name: 'Siti Hajar Binti Mohd Nor', email: 'siti.h@axiatadigital.com.my', role: 'Finance', status: 'active', lastActive: '2026-04-15T09:00:00', joined: '2025-02-14' },
    { id: 5, name: 'Rajesh Kumar a/l Muthu', email: 'rajesh.k@axiatadigital.com.my', role: 'Submitter', status: 'invited', lastActive: null, joined: '2026-04-14' },
  ],
  joinRequests: [
    { id: 'JR-001', name: 'Ahmad Faizal bin Hamdan', email: 'ahmad.faizal@axiatadigital.com.my', role: 'Submitter', registeredAt: '2026-04-28T10:23:00', ssm: '201901023456', message: 'Requesting to join as a Submitter for the NCEF compliance team.' },
    { id: 'JR-002', name: 'Tan Mei Ling', email: 'meilingt@axiatadigital.com.my', role: 'PIC (Technical)', registeredAt: '2026-05-02T14:45:00', ssm: '201901023456', message: 'New PIC (Technical) for our radio equipment division.' },
  ],
  // Certificates
  certificates: [
    { rcn: 'RCN-0326-00449', app: 'APP-0426-00085', scheme: 'C', product: 'Mi Band 9 Pro', brand: 'Xiaomi', model: 'M2320B1', issued: '2026-04-10', expires: '2029-04-09', status: 'active', labelType: 'e-label' },
    { rcn: 'RCN-0326-00442', app: 'APP-0426-00079', scheme: 'A', product: 'OPPO Find X7 Ultra', brand: 'OPPO', model: 'CPH2583', issued: '2026-04-05', expires: '2029-04-04', status: 'active', labelType: 'physical' },
    { rcn: 'RCN-0125-00198', app: 'APP-0125-00198', scheme: 'A', product: 'Samsung Galaxy S23', brand: 'Samsung', model: 'SM-S911B', issued: '2025-01-18', expires: '2026-06-12', status: 'expiring', labelType: 'physical' },
    { rcn: 'RCN-1124-00612', app: 'APP-1124-00612', scheme: 'B', product: 'Ericsson Router 6672', brand: 'Ericsson', model: 'KRY-901-6672', issued: '2024-11-02', expires: '2026-05-28', status: 'expiring', labelType: 'physical' },
    { rcn: 'RCN-0823-00084', app: 'APP-0823-00084', scheme: 'C', product: 'TP-Link Archer AX73', brand: 'TP-Link', model: 'AX5400', issued: '2023-08-14', expires: '2026-08-13', status: 'active', labelType: 'e-label' },
    { rcn: 'RCN-0722-00021', app: 'APP-0722-00021', scheme: 'A', product: 'Huawei P50 Pocket', brand: 'Huawei', model: 'BAL-L49', issued: '2022-07-05', expires: '2025-07-04', status: 'expired', labelType: 'physical' },
  ],
  // Payments
  payments: [
    { id: 'PAY-0426-00088', date: '2026-04-18', app: 'APP-0426-00087', method: 'FPX', amount: 1200, status: 'paid', invoice: 'INV-2026-0418-88' },
    { id: 'PAY-0426-00079', date: '2026-04-01', app: 'APP-0426-00079', method: 'Corporate Invoice', amount: 1200, status: 'paid', invoice: 'INV-2026-0401-79' },
    { id: 'PAY-0326-00055', date: '2026-03-14', app: 'APP-0326-00055', method: 'Card (Visa •• 4521)', amount: 600, status: 'paid', invoice: 'INV-2026-0314-55' },
    { id: 'PAY-0226-00032', date: '2026-02-20', app: 'APP-0226-00032', method: 'FPX', amount: 2500, status: 'paid', invoice: 'INV-2026-0220-32' },
    { id: 'PAY-0126-00018', date: '2026-01-09', app: 'APP-0126-00018', method: 'DuitNow QR', amount: 1200, status: 'paid', invoice: 'INV-2026-0109-18' },
    { id: 'PAY-0426-00091', date: '2026-04-19', app: 'APP-0426-00091', method: 'Corporate Invoice', amount: 1800, status: 'pending', invoice: 'INV-2026-0419-91' },
  ],
  // Monthly application trend (Jan–Dec 2026; May–Dec are projected/forecast)
  monthlyTrend: [
    { month: 'Jan', submitted: 38, approved: 31, rejected: 3,  aiAutoAccepted: 12, forecast: false },
    { month: 'Feb', submitted: 44, approved: 36, rejected: 4,  aiAutoAccepted: 15, forecast: false },
    { month: 'Mar', submitted: 52, approved: 43, rejected: 5,  aiAutoAccepted: 19, forecast: false },
    { month: 'Apr', submitted: 29, approved: 22, rejected: 1,  aiAutoAccepted: 11, forecast: false },
    { month: 'May', submitted: 51, approved: 42, rejected: 4,  aiAutoAccepted: 18, forecast: true  },
    { month: 'Jun', submitted: 48, approved: 39, rejected: 5,  aiAutoAccepted: 17, forecast: true  },
    { month: 'Jul', submitted: 55, approved: 46, rejected: 6,  aiAutoAccepted: 21, forecast: true  },
    { month: 'Aug', submitted: 42, approved: 35, rejected: 3,  aiAutoAccepted: 15, forecast: true  },
    { month: 'Sep', submitted: 58, approved: 49, rejected: 7,  aiAutoAccepted: 23, forecast: true  },
    { month: 'Oct', submitted: 61, approved: 52, rejected: 8,  aiAutoAccepted: 25, forecast: true  },
    { month: 'Nov', submitted: 47, approved: 39, rejected: 4,  aiAutoAccepted: 17, forecast: true  },
    { month: 'Dec', submitted: 35, approved: 28, rejected: 2,  aiAutoAccepted: 12, forecast: true  },
  ],
  // Scheme distribution (for donut chart)
  schemeDistribution: [
    { scheme: 'Scheme A — RF Equipment',         count: 234, color: '#0B4F91' },
    { scheme: 'Scheme B — Wired / Low-risk',      count: 156, color: '#1B7F48' },
    { scheme: 'Scheme C — Recognised Standard',   count:  89, color: '#0F6ABF' },
    { scheme: 'Scheme D — Temporary Import',      count:  29, color: '#B87200' },
  ],
  // Processing time by scheme (for bar chart)
  processingTime: [
    { scheme: 'Scheme A', avgDays: 14.2, targetDays: 15, minDays: 7,  maxDays: 22 },
    { scheme: 'Scheme B', avgDays:  9.6, targetDays: 10, minDays: 5,  maxDays: 15 },
    { scheme: 'Scheme C', avgDays:  2.8, targetDays:  3, minDays: 1,  maxDays:  5 },
    { scheme: 'Scheme D', avgDays: 38.4, targetDays: 45, minDays: 22, maxDays: 58 },
  ],
  // Officer performance
  officerPerformance: [
    { name: 'En. Faisal Rahman',  id: 'OFF-001', role: 'team-lead', team: 'CPPG-TL-01', approved: 48, rejected: 6,  avgTurnaround: 4.2, slaCompliance: 96, aiOverrides: 3 },
    { name: 'Pn. Rosnah Idris',   id: 'OFF-002', role: 'officer',   team: 'CPPG-TL-01', approved: 41, rejected: 4,  avgTurnaround: 5.8, slaCompliance: 92, aiOverrides: 7 },
    { name: 'En. Syahrul Azlan',  id: 'OFF-003', role: 'officer',   team: 'CPPG-TL-01', approved: 35, rejected: 8,  avgTurnaround: 3.9, slaCompliance: 98, aiOverrides: 1 },
    { name: 'En. Ahmad Rashid',   id: 'OFF-004', role: 'officer',   team: 'CPPG-TL-01', approved: 29, rejected: 5,  avgTurnaround: 6.1, slaCompliance: 89, aiOverrides: 9 },
    { name: 'Pn. Halimah Yusof',  id: 'OFF-005', role: 'officer',   team: 'CPPG-TL-01', approved: 37, rejected: 3,  avgTurnaround: 4.7, slaCompliance: 94, aiOverrides: 2 },
    { name: 'En. Zulkifli Hassan',id: 'OFF-006', role: 'team-lead', team: 'CPPG-SA-01', approved: 52, rejected: 7,  avgTurnaround: 5.1, slaCompliance: 93, aiOverrides: 4 },
    { name: 'Pn. Maziah Abdullah', id: 'OFF-007',role: 'officer',   team: 'CPPG-SA-01', approved: 44, rejected: 5,  avgTurnaround: 4.8, slaCompliance: 97, aiOverrides: 2 },
    { name: 'En. Hairul Nizam',   id: 'OFF-008', role: 'officer',   team: 'CPPG-SA-01', approved: 38, rejected: 6,  avgTurnaround: 6.3, slaCompliance: 91, aiOverrides: 8 },
  ],
  // Top applicants by volume (for Reports screen)
  topApplicants: [
    { name: 'Axiata Digital Sdn Bhd',      id: 'SUP-0126-00087', submissions: 23, approved: 19, aiAvg: 88 },
    { name: 'Maxis Broadband Sdn Bhd',     id: 'SUP-0420-00012', submissions: 18, approved: 15, aiAvg: 91 },
    { name: 'Celcom Axiata Berhad',        id: 'SUP-0322-00045', submissions: 14, approved: 12, aiAvg: 85 },
    { name: 'TM Technology Services',      id: 'SUP-0621-00091', submissions: 11, approved:  9, aiAvg: 79 },
    { name: 'Digi Telecommunications',     id: 'SUP-0823-00210', submissions:  8, approved:  7, aiAvg: 83 },
    { name: 'U Mobile Sdn Bhd',            id: 'SUP-0919-00318', submissions:  7, approved:  6, aiAvg: 77 },
    { name: 'Telekom Malaysia Berhad',     id: 'SUP-0217-00056', submissions:  6, approved:  5, aiAvg: 90 },
  ],
  // Audit log entries
  auditLog: [
    { id: 'AUD-20260419-001', ts: '2026-04-19T09:14:22', event: 'Certificate Issued', actor: 'En. Faisal Rahman', actorRole: 'Officer', appId: 'APP-0426-00079', detail: 'RCN-0326-00442 issued for OPPO Find X7 Ultra. Scheme A.', ip: '10.10.1.42' },
    { id: 'AUD-20260419-002', ts: '2026-04-19T08:55:10', event: 'Application Approved', actor: 'En. Faisal Rahman', actorRole: 'Officer', appId: 'APP-0426-00079', detail: 'Decision: Approve. AI score 91/100. Certificate generation triggered.', ip: '10.10.1.42' },
    { id: 'AUD-20260418-001', ts: '2026-04-18T16:20:05', event: 'User Login', actor: 'Nurul Aisyah binti Ahmad', actorRole: 'Supplier', appId: null, detail: 'Successful login from Chrome / macOS. MFA verified via Authenticator App.', ip: '115.164.32.88' },
    { id: 'AUD-20260418-002', ts: '2026-04-18T14:32:00', event: 'Payment Received', actor: 'System', actorRole: 'System', appId: 'APP-0426-00087', detail: 'FPX payment RM 1,200.00 confirmed. Invoice INV-2026-0418-88 marked paid.', ip: '10.10.0.1' },
    { id: 'AUD-20260418-003', ts: '2026-04-18T10:31:15', event: 'Application Opened for Review', actor: 'En. Faisal Rahman', actorRole: 'Officer', appId: 'APP-0426-00087', detail: 'Application assigned and opened in review console. SLA: 48 hours.', ip: '10.10.1.42' },
    { id: 'AUD-20260415-001', ts: '2026-04-15T14:21:08', event: 'AI Validation Complete', actor: 'Qwen2.5-VL', actorRole: 'System', appId: 'APP-0426-00087', detail: 'AI confidence score: 87/100. 2 criteria flagged (frequency band, standards clause). Routed to priority queue.', ip: '10.10.0.5' },
    { id: 'AUD-20260415-002', ts: '2026-04-15T14:20:44', event: 'Application Submitted', actor: 'Nurul Aisyah binti Ahmad', actorRole: 'Supplier', appId: 'APP-0426-00087', detail: 'SDoC application submitted. Scheme A. 6 documents attached. Payment RM 1,200 pending.', ip: '115.164.32.88' },
    { id: 'AUD-20260409-001', ts: '2026-04-09T13:25:00', event: 'Iteration Requested', actor: 'En. Faisal Rahman', actorRole: 'Officer', appId: 'APP-0426-00083', detail: 'Issues: missing Wi-Fi 6E secondary band, MTSFB G015:2022 clause N/A without justification. Resubmit by 04 Jun 2026.', ip: '10.10.1.42' },
    { id: 'AUD-20260408-001', ts: '2026-04-08T09:05:33', event: 'Application Rejected', actor: 'Pn. Rosnah Idris', actorRole: 'Officer', appId: 'APP-0426-00082', detail: 'Scheme SA prohibited equipment — jammer classification confirmed. Import not permitted for stated purpose.', ip: '10.10.1.55' },
    { id: 'AUD-20260405-001', ts: '2026-04-05T12:01:00', event: 'Certificate Issued', actor: 'En. Syahrul Azlan', actorRole: 'Officer', appId: 'APP-0426-00079', detail: 'AI auto-accept eligible (score 91). Certificate RCN-0326-00442 issued without officer review (Scheme C threshold met).', ip: '10.10.1.61' },
    { id: 'AUD-20260401-001', ts: '2026-04-01T09:32:15', event: 'Application Submitted', actor: 'Kamarul Ariffin bin Osman', actorRole: 'Supplier', appId: 'APP-0426-00079', detail: 'SDoC application submitted. Scheme A. OPPO Find X7 Ultra. 5 documents attached.', ip: '115.164.99.12' },
    { id: 'AUD-20260320-001', ts: '2026-03-20T11:14:02', event: 'Data Export', actor: 'Nurul Aisyah binti Ahmad', actorRole: 'Supplier', appId: null, detail: 'Exported 12 certificate records as CSV. Filter: All active. IP logged per PDPA audit requirement.', ip: '115.164.32.88' },
  ],
};
