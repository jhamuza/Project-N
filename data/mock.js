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
    },
    'team-lead': {
      id: 'OFF-001',
      role: 'team-lead',
      name: 'En. Faisal Rahman',
      title: 'CPPG Team Lead',
      initials: 'FR',
      email: 'faisal.rahman@mcmc.gov.my',
      team: 'CPPG-TL-01',
    },
    officer: {
      id: 'OFF-002',
      role: 'officer',
      name: 'Pn. Rosnah Idris',
      title: 'CPPG Officer',
      initials: 'RI',
      email: 'rosnah.idris@mcmc.gov.my',
      team: 'CPPG-TL-01',
      reportsTo: 'OFF-001',
    },
  },
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
  aiReasoning: [
    { category: 'SSM/ROC/ROB Validation', score: 18, max: 20, note: 'BRN 201901023456 verified; entity active since 2019.', pass: true },
    { category: 'Address & Director Match', score: 10, max: 10, note: 'Director (Tan Sri Dato\u2019 Sri Jamaludin Ibrahim) and address match SSM records.', pass: true },
    { category: 'Completeness of Technical Specs', score: 13, max: 15, note: 'Output power (26 dBm) present but frequency band missing secondary range.', pass: false },
    { category: 'Brand & Model Consistency', score: 10, max: 10, note: 'SM-S928B consistent across brochure, test report, and photos.', pass: true },
    { category: 'Test Report & Lab Verification', score: 14, max: 15, note: 'SIRIM QAS (Accreditation #LM-15-004) report dated 2026-03-12.', pass: true },
    { category: 'Standards Compliance', score: 8, max: 10, note: 'MCMC MTSFB TC G015:2022 \u2014 one clause marked "N/A" without justification.', pass: false },
    { category: 'Supplier Past Performance', score: 9, max: 10, note: '47 prior approvals; 0 rejections in the last 24 months.', pass: true },
    { category: 'Completeness & Consistency', score: 5, max: 10, note: '"Marketing Name" field left blank; permitted but may delay label registry.', pass: false },
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
  // Existing supplier directory (onboarding picker)
  supplierDirectory: [
    { id: 'SUP-0126-00087', name: 'Axiata Digital Sdn Bhd', brn: '201901023456', category: 'A', since: '2019-03-14', approvals: 47, active: true, address: 'Level 21, Axiata Tower, KL Sentral' },
    { id: 'SUP-0322-00045', name: 'Celcom Axiata Berhad', brn: '199201015249', category: 'A', since: '2022-08-21', approvals: 32, active: true, address: 'Menara Celcom, Jalan Semangat, PJ' },
    { id: 'SUP-0420-00012', name: 'Maxis Broadband Sdn Bhd', brn: '234582400900', category: 'A', since: '2020-01-07', approvals: 58, active: true, address: 'Menara Maxis, KLCC' },
    { id: 'SUP-0621-00091', name: 'TM Technology Services', brn: '198401023456', category: 'A', since: '2021-06-15', approvals: 21, active: true, address: 'TM Tower, Jalan Pantai Baharu' },
    { id: 'SUP-0823-00210', name: 'Digi Telecommunications', brn: '199701009694', category: 'A', since: '2023-09-04', approvals: 9, active: true, address: 'D\'House, Shah Alam' },
    { id: 'SUP-0224-00142', name: 'Huawei Technologies (M) Sdn Bhd', brn: '200101020034', category: 'A', since: '2024-02-19', approvals: 14, active: true, address: 'Level 9, Quill 7 Tower, KL Sentral' },
  ],
  // Team members for current supplier account
  teamMembers: [
    { id: 1, name: 'Nurul Aisyah binti Ahmad', email: 'nurul.aisyah@axiatadigital.com.my', role: 'Administrator', status: 'active', lastActive: '2026-04-19T08:15:00', joined: '2024-01-15' },
    { id: 2, name: 'Kamarul Ariffin bin Osman', email: 'kamarul.a@axiatadigital.com.my', role: 'PIC (Technical)', status: 'active', lastActive: '2026-04-18T16:40:00', joined: '2024-03-22' },
    { id: 3, name: 'Lee Wei Ming', email: 'lee.wm@axiatadigital.com.my', role: 'Submitter', status: 'active', lastActive: '2026-04-17T11:20:00', joined: '2024-07-01' },
    { id: 4, name: 'Siti Hajar Binti Mohd Nor', email: 'siti.h@axiatadigital.com.my', role: 'Finance', status: 'active', lastActive: '2026-04-15T09:00:00', joined: '2025-02-14' },
    { id: 5, name: 'Rajesh Kumar a/l Muthu', email: 'rajesh.k@axiatadigital.com.my', role: 'Submitter', status: 'invited', lastActive: null, joined: '2026-04-14' },
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
  // Monthly application trend data (Jan–Apr 2026)
  monthlyTrend: [
    { month: 'Jan', submitted: 38, approved: 31, rejected: 3, aiAutoAccepted: 12 },
    { month: 'Feb', submitted: 44, approved: 36, rejected: 4, aiAutoAccepted: 15 },
    { month: 'Mar', submitted: 52, approved: 43, rejected: 5, aiAutoAccepted: 19 },
    { month: 'Apr', submitted: 29, approved: 22, rejected: 1, aiAutoAccepted: 11 },
  ],
  // Officer performance
  officerPerformance: [
    { name: 'En. Faisal Rahman', id: 'OFF-001', role: 'team-lead', team: 'CPPG-TL-01', approved: 48, rejected: 6, avgTurnaround: 4.2, slaCompliance: 96, aiOverrides: 3 },
    { name: 'Pn. Rosnah Idris', id: 'OFF-002', role: 'officer', team: 'CPPG-TL-01', approved: 41, rejected: 4, avgTurnaround: 5.8, slaCompliance: 92, aiOverrides: 7 },
    { name: 'En. Syahrul Azlan', id: 'OFF-003', role: 'officer', team: 'CPPG-TL-01', approved: 35, rejected: 8, avgTurnaround: 3.9, slaCompliance: 98, aiOverrides: 1 },
  ],
  // Top applicants by volume (for Reports screen)
  topApplicants: [
    { name: 'Axiata Digital Sdn Bhd', id: 'SUP-0126-00087', submissions: 23, approved: 19, aiAvg: 88 },
    { name: 'Maxis Broadband Sdn Bhd', id: 'SUP-0420-00012', submissions: 18, approved: 15, aiAvg: 91 },
    { name: 'Celcom Axiata Berhad', id: 'SUP-0322-00045', submissions: 14, approved: 12, aiAvg: 85 },
    { name: 'TM Technology Services', id: 'SUP-0621-00091', submissions: 11, approved: 9, aiAvg: 79 },
    { name: 'Digi Telecommunications', id: 'SUP-0823-00210', submissions: 8, approved: 7, aiAvg: 83 },
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
