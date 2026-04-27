// screens-k.jsx — Public Search Portal §5.11 (full rebuild)
// Overrides SCREENS['public-portal'] from screens-d.jsx

const {
  SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  DownloadOutlined, InfoCircleOutlined, RobotOutlined, GlobalOutlined,
  FileTextOutlined, FilePdfOutlined, QuestionCircleOutlined, PhoneOutlined,
  MailOutlined, ArrowRightOutlined, SafetyCertificateOutlined, UserOutlined
} = window.icons;
const AimOut_k   = window.icons.AimOutlined   || window.icons.ThunderboltOutlined;
const AlertOut_k = window.icons.AlertOutlined  || window.icons.WarningOutlined;

// ─── Public-facing mock data ──────────────────────────────────────────────────
Object.assign(window.MOCK, {
  publicDocs: [
    { id: 'doc-01', cat: 'Guidelines',  title: 'NCEF Registration Guidelines v2.1',                 lang: 'EN/BM', date: '01 Mar 2026', size: '4.2 MB', type: 'pdf' },
    { id: 'doc-02', cat: 'Guidelines',  title: 'Panduan Pendaftaran NCEF v2.1 (Bahasa Malaysia)',   lang: 'BM',    date: '01 Mar 2026', size: '4.0 MB', type: 'pdf' },
    { id: 'doc-03', cat: 'Standards',   title: 'MCMC MTSFB TC G015:2022 — Radio Communications',   lang: 'EN',    date: '15 Jan 2022', size: '12.4 MB', type: 'pdf' },
    { id: 'doc-04', cat: 'Standards',   title: 'MCMC MTSFB TC G024:2023 — EMC Requirements',       lang: 'EN',    date: '10 Jun 2023', size: '8.7 MB',  type: 'pdf' },
    { id: 'doc-05', cat: 'Fee Schedule',title: 'NCEF Fee Schedule 2026',                            lang: 'EN/BM', date: '01 Jan 2026', size: '0.8 MB',  type: 'pdf' },
    { id: 'doc-06', cat: 'Fee Schedule',title: 'Jadual Yuran NCEF 2026',                            lang: 'BM',    date: '01 Jan 2026', size: '0.7 MB',  type: 'pdf' },
    { id: 'doc-07', cat: 'Forms',       title: 'SDoC Application Form (Scheme A/B)',                lang: 'EN',    date: '01 Mar 2026', size: '0.3 MB',  type: 'docx' },
    { id: 'doc-08', cat: 'Forms',       title: 'Special Approval Application Form',                 lang: 'EN',    date: '01 Mar 2026', size: '0.4 MB',  type: 'docx' },
    { id: 'doc-09', cat: 'Circulars',   title: 'MCMC Administrative Circular AC/NCEF/2026/01',     lang: 'EN/BM', date: '15 Feb 2026', size: '1.1 MB',  type: 'pdf' },
    { id: 'doc-10', cat: 'References',  title: 'List of Recognised Test Laboratories (Apr 2026)',   lang: 'EN',    date: '15 Apr 2026', size: '1.0 MB',  type: 'pdf' },
    { id: 'doc-11', cat: 'References',  title: 'List of Approved Certifying Agencies (Apr 2026)',   lang: 'EN',    date: '01 Apr 2026', size: '0.5 MB',  type: 'pdf' },
  ],
  publicFaqs: [
    { cat: 'General', q: 'What is the NCEF?', a: 'The New Communications Equipment Framework (NCEF) is the Malaysian Communications and Multimedia Commission\'s (MCMC) regulatory framework for registering communications equipment in Malaysia. It replaces the legacy SIRIM-managed system and streamlines the end-to-end registration process through a unified digital platform.' },
    { cat: 'General', q: 'Which equipment must be registered under NCEF?', a: 'All communications equipment that operates on radio frequency spectrum in Malaysia — including smartphones, routers, IoT devices, repeaters, broadcasting equipment, and wireless accessories. Some categories are exempted; refer to the NCEF Registration Guidelines for the full exemption list.' },
    { cat: 'Registration', q: 'What are the registration schemes and who qualifies?', a: 'Scheme A (High Risk): Equipment with full SDoC and Certificate of Conformity (CoC) from an accredited body. Scheme B (Medium Risk): Equipment requiring detailed technical verification by MCMC. Scheme C (Low Risk): Equipment under a manufacturer\'s self-declaration — AI auto-accepts submissions scoring ≥90%.' },
    { cat: 'Registration', q: 'How long does registration take?', a: 'Scheme C with AI auto-accept: same business day. Scheme A/B with officer review: 3–5 working days. Special Approval (non-prohibited): 3–5 working days. Prohibited equipment (multi-level approval): 10–15 working days.' },
    { cat: 'Registration', q: 'What documents do I need to submit?', a: 'At minimum: company registration document (SSM), technical brochure, test report from an accredited laboratory (SIRIM QAS, TÜV, etc.), product photos (front, back, label), and completed SDoC declaration with digital signature. Scheme A additionally requires a Certificate of Conformity (CoC).' },
    { cat: 'Fees', q: 'What are the registration fees?', a: 'Scheme A: RM 1,200/model/year. Scheme B: RM 2,500/model/year. Scheme C: RM 600/model/year. Special Approval: RM 500–2,000 depending on risk level. IMEI Registration: RM 0.50/IMEI. Serial Number Registration: RM 0.15/SN. An 8% SST applies to most fees.' },
    { cat: 'Renewal', q: 'When and how do I renew my certificate?', a: 'Certificates may be renewed for up to 5 cumulative years. Renewal must be initiated within 6 months of the certificate expiry date. Log in to the NCEF Portal and navigate to Certificates. The system will notify you 90, 60, and 30 days before expiry. Most renewal documents can be reused if less than 3 years old.' },
    { cat: 'Verification', q: 'How do I verify if a device is legitimately registered?', a: 'Use the Public Equipment Search on this page. Enter the brand name, model number, IMEI, serial number, or Registered Compliance Number (RCN). The search will show the equipment\'s current registration status, scheme, issue date, and expiry date.' },
    { cat: 'Importation', q: 'How do I obtain an import permit for communications equipment?', a: 'Log in to the NCEF Portal and navigate to Importation. Select your permit type (matching your SDoC scheme or Special Approval reference), validate your RCN, fill in consignor/consignee and logistics details. MCMC will be assigned as Permit Issuance Agency. You will then be directed to RMCD MyOGA to complete payment and receive your Certificate of Acceptance (CoA).' },
  ],
  publicChatHistory: [
    { role: 'bot', t: 'Hello! I am MINA, the NCEF AI Assistant. I can help you with equipment registration, certificate verification, fees, and regulatory requirements. How can I help you today?' },
  ],
});

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PUBLIC PORTAL SCREEN
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['public-portal'] = function PublicPortal({ nav }) {
  const [section, setSection] = React.useState('search');
  const [q, setQ]             = React.useState('');
  const [qBrand, setQBrand]   = React.useState('');
  const [qModel, setQModel]   = React.useState('');
  const [qImei, setQImei]     = React.useState('');
  const [qSupp, setQSupp]     = React.useState('');
  const [searched, setSearched]   = React.useState(false);
  const [results, setResults]     = React.useState([]);
  const [certDetail, setCertDetail] = React.useState(null);
  const [docCat, setDocCat]       = React.useState('All');
  const [faqQ, setFaqQ]           = React.useState('');
  const [faqCat, setFaqCat]       = React.useState('All');
  const [openFaq, setOpenFaq]     = React.useState(null);
  const [chatOpen, setChatOpen]   = React.useState(false);
  const [chatInput, setChatInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState(MOCK.publicChatHistory);
  const [chatLoading, setChatLoading] = React.useState(false);
  const [advancedSearch, setAdvancedSearch] = React.useState(false);

  function doSearch() {
    const combined = [q, qBrand, qModel, qImei, qSupp].join(' ').toLowerCase().trim();
    if (!combined) return;
    const r = MOCK.certificates.filter(c =>
      (c.product + c.rcn + c.brand + c.model + (c.scheme || '')).toLowerCase().includes(combined) ||
      (qBrand && c.brand.toLowerCase().includes(qBrand.toLowerCase())) ||
      (qModel && c.model.toLowerCase().includes(qModel.toLowerCase())) ||
      (qImei && c.rcn.toLowerCase().includes(qImei.toLowerCase()))
    );
    setResults(r);
    setSearched(true);
    setCertDetail(null);
  }

  function sendChat(text) {
    const msg = text || chatInput;
    if (!msg.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', t: msg }]);
    setChatInput('');
    setChatLoading(true);
    const responses = {
      'scheme': 'NCEF has three schemes: Scheme A (high risk, full CoC required), Scheme B (medium risk, technical verification), and Scheme C (low risk, AI auto-accept at ≥90% confidence).',
      'fee': 'Fees range from RM 600 (Scheme C) to RM 2,500 (Scheme B) per model per year. IMEI registration costs RM 0.50 each. 8% SST applies to most fees.',
      'renew': 'Certificates may be renewed up to 5 cumulative years. Log in to the NCEF Portal → Certificates → Renew. Notifications are sent 90, 60, and 30 days before expiry.',
      'import': 'For import permits, log in to the NCEF Portal → Importation. Validate your RCN, fill in consignor and logistics details, and you will be directed to RMCD MyOGA for payment.',
      'verify': 'You can verify equipment registration using the Public Equipment Search above. Enter the brand, model, RCN, or IMEI to check registration status.',
      'register': 'To register equipment, create a supplier account at the NCEF Portal, complete the company onboarding, then submit an SDoC application under the appropriate scheme.',
    };
    const key = Object.keys(responses).find(k => msg.toLowerCase().includes(k));
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'bot', t: key ? responses[key] : 'Thank you for your question. For detailed guidance, please refer to the NCEF Registration Guidelines or contact the CPPG Helpdesk at cppg@mcmc.gov.my · +603-8688 8000.' }]);
      setChatLoading(false);
    }, 900);
  }

  // ── NAV TABS ────────────────────────────────────────────────────────────────
  const navItems = [
    { k: 'search',   l: 'Equipment Search' },
    { k: 'process',  l: 'How to Register' },
    { k: 'docs',     l: 'Documents' },
    { k: 'faq',      l: 'FAQ' },
    { k: 'contact',  l: 'Contact' },
  ];

  // ── HERO ────────────────────────────────────────────────────────────────────
  const Hero = () => (
    <div style={{ background: 'linear-gradient(135deg, #0B4F91 0%, #073863 100%)', padding: '40px 40px 32px', color: '#fff' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Announcement banner */}
        {MOCK.announcements?.filter(a => a.status === 'active').length > 0 && (
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 14px', marginBottom: 20, fontSize: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ background: '#fff', color: 'var(--color-primary)', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>ANNOUNCEMENT</span>
            <span>{MOCK.announcements?.find(a => a.status === 'active')?.title}</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <img src="assets/mcmc-logo.png" alt="MCMC" style={{ width: 56, height: 56, background: '#fff', borderRadius: 10, padding: 6, flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.1 }}>NCEF Public Registry</div>
            <div style={{ fontSize: 12, opacity: .85, letterSpacing: .4, marginTop: 2 }}>New Communications Equipment Framework · Malaysian Communications and Multimedia Commission</div>
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6, lineHeight: 1.2 }}>Verify Equipment Certification</div>
        <div style={{ fontSize: 14, opacity: .9, marginBottom: 8 }}>Semak status pendaftaran peralatan komunikasi di Malaysia</div>
        <div style={{ fontSize: 13, opacity: .8, marginBottom: 28 }}>Check if communications equipment is registered with MCMC before import, sale, or use in Malaysia.</div>

        {/* Main search */}
        <div style={{ display: 'flex', gap: 10, maxWidth: 700 }}>
          <antd.Input size="large" placeholder="Search by brand, model, RCN, IMEI, or serial number…" value={q} onChange={e => { setQ(e.target.value); setSearched(false); }} onPressEnter={doSearch}
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />} style={{ flex: 1, borderRadius: 8 }} />
          <antd.Button type="primary" size="large" onClick={doSearch} style={{ background: '#fff', color: 'var(--color-primary)', border: 'none', fontWeight: 700, borderRadius: 8, minWidth: 100 }}>Search</antd.Button>
        </div>
        <div style={{ marginTop: 10, opacity: .75, fontSize: 12 }}>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setAdvancedSearch(!advancedSearch)}>
            {advancedSearch ? '▾ Hide advanced search' : '▸ Advanced search (filter by brand, model, IMEI, Supplier ID)'}
          </span>
        </div>

        {/* Advanced search */}
        {advancedSearch && (
          <antd.Row gutter={[10, 10]} style={{ marginTop: 14, maxWidth: 700 }}>
            {[
              { val: qBrand, set: setQBrand, ph: 'Brand (e.g. Samsung)' },
              { val: qModel, set: setQModel, ph: 'Model (e.g. SM-S928B)' },
              { val: qImei,  set: setQImei,  ph: 'IMEI or Serial Number' },
              { val: qSupp,  set: setQSupp,  ph: 'Supplier ID (e.g. SUP-0126-00087)' },
            ].map((f, i) => (
              <antd.Col span={12} key={i}>
                <antd.Input size="small" placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 6 }} />
              </antd.Col>
            ))}
          </antd.Row>
        )}
      </div>
    </div>
  );

  // ── SECTION NAV ─────────────────────────────────────────────────────────────
  const SectionNav = () => (
    <div style={{ background: '#fff', borderBottom: '1px solid var(--color-divider)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {navItems.map(n => (
          <div key={n.k} onClick={() => setSection(n.k)} style={{ padding: '12px 20px', cursor: 'pointer', fontWeight: section === n.k ? 600 : 400, color: section === n.k ? 'var(--color-primary)' : 'var(--color-text-secondary)', borderBottom: section === n.k ? '2px solid var(--color-primary)' : '2px solid transparent', fontSize: 13, whiteSpace: 'nowrap', transition: 'all .15s' }}>
            {n.l}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}>
          <antd.Button type="primary" size="small" onClick={() => nav('onboarding')}>Register as Supplier</antd.Button>
        </div>
      </div>
    </div>
  );

  // ── SEARCH RESULTS ──────────────────────────────────────────────────────────
  const SearchSection = () => (
    <div>
      {searched && (
        <antd.Card bordered style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} found {q && `for "${q}"`}
          </div>
          {results.length === 0
            ? <antd.Empty description={<span>No registered equipment found. Equipment may not be registered with MCMC, or may use a different brand/model name. <antd.Typography.Link>Report unregistered equipment</antd.Typography.Link></span>} />
            : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {results.map(r => (
                  <div key={r.rcn}>
                    <div onClick={() => setCertDetail(certDetail?.rcn === r.rcn ? null : r)}
                      style={{ padding: 16, border: `1.5px solid ${certDetail?.rcn === r.rcn ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 10, cursor: 'pointer', background: certDetail?.rcn === r.rcn ? 'var(--color-primary-soft)' : '#fff', transition: 'all .15s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                            <span className={`scheme-badge ${r.scheme?.toLowerCase()}`}>Scheme {r.scheme}</span>
                            {r.status === 'active' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Registered & Active</antd.Tag> : r.status === 'expiring' ? <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Expiring Soon</antd.Tag> : <antd.Tag icon={<CloseCircleOutlined />}>Expired</antd.Tag>}
                          </div>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{r.product}</div>
                          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{r.brand} · Model: {r.model}</div>
                          <div style={{ marginTop: 6 }}>
                            <antd.Typography.Text code style={{ fontSize: 12 }}>{r.rcn}</antd.Typography.Text>
                            <antd.Typography.Text type="secondary" style={{ fontSize: 12, marginLeft: 10 }}>Issued {new Date(r.issued).toLocaleDateString('en-GB')} · Expires {new Date(r.expires).toLocaleDateString('en-GB')}</antd.Typography.Text>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{certDetail?.rcn === r.rcn ? '▲ Hide details' : '▼ View details'}</div>
                        </div>
                      </div>
                    </div>
                    {certDetail?.rcn === r.rcn && (
                      <div style={{ padding: 16, border: '1.5px solid var(--color-primary)', borderTop: 'none', borderRadius: '0 0 10px 10px', background: 'var(--color-primary-soft)' }}>
                        <antd.Row gutter={[20, 12]}>
                          <antd.Col xs={24} sm={14}>
                            <antd.Descriptions column={1} size="small" bordered>
                              {[
                                { label: 'RCN', val: <antd.Typography.Text code>{r.rcn}</antd.Typography.Text> },
                                { label: 'Scheme', val: <span>Scheme {r.scheme} — {r.scheme === 'A' ? 'Standard Certification' : r.scheme === 'B' ? 'Specific Certification' : 'Self-Declaration (SDoC)'}</span> },
                                { label: 'Product Category', val: 'Mobile Phone / Smart Wearable' },
                                { label: 'Label Type', val: r.labelType === 'e-label' ? 'Electronic (e-Label)' : 'Physical sticker' },
                                { label: 'Issue Date', val: new Date(r.issued).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
                                { label: 'Expiry Date', val: new Date(r.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
                                { label: 'Compliance Status', val: <antd.Tag color="green">Active — Compliant</antd.Tag> },
                              ].map(d => (
                                <antd.Descriptions.Item key={d.label} label={d.label}>{d.val}</antd.Descriptions.Item>
                              ))}
                            </antd.Descriptions>
                          </antd.Col>
                          <antd.Col xs={24} sm={10} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 10 }}>Verification QR Code</div>
                            <div style={{ display: 'inline-block', padding: 10, background: '#fff', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                              <div style={{ width: 90, height: 90, background: `conic-gradient(#000 0 25%, transparent 25% 50%, #000 50% 75%, transparent 75%), repeating-linear-gradient(90deg, #000 0 3px, #fff 3px 6px)`, backgroundBlendMode: 'multiply' }} />
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6 }}>Scan to verify on NCEF portal</div>
                            <antd.Button size="small" style={{ marginTop: 8 }} icon={<DownloadOutlined />}>Download Certificate</antd.Button>
                          </antd.Col>
                        </antd.Row>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          }
        </antd.Card>
      )}

      {/* How to search guide */}
      {!searched && (
        <antd.Row gutter={[16, 16]}>
          {[
            { icon: '🔍', t: 'Search by RCN', d: 'Enter the Registered Compliance Number (e.g. RCN-0326-00449) for an exact match.' },
            { icon: '📱', t: 'Search by IMEI', d: 'Enter a 15-digit IMEI number to verify a specific device unit\'s registration.' },
            { icon: '🏷️', t: 'Search by Brand & Model', d: 'Use the advanced search to filter by brand (e.g. Samsung) and model (e.g. SM-S928B).' },
            { icon: '⚠️', t: 'Not Found?', d: 'If equipment is not listed, it may be unregistered. Do not purchase or import unregistered communications equipment.' },
          ].map((c, i) => (
            <antd.Col xs={24} sm={12} key={i}>
              <antd.Card bordered size="small" style={{ height: '100%' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{c.d}</div>
              </antd.Card>
            </antd.Col>
          ))}
        </antd.Row>
      )}
    </div>
  );

  // ── HOW TO REGISTER ─────────────────────────────────────────────────────────
  const ProcessSection = () => {
    const schemes = [
      { k: 'A', name: 'Scheme A — Standard', risk: 'High Risk', fee: 'RM 1,200/model/year', sla: '3 working days', docs: 'SDoC + Certificate of Conformity (CoC) from accredited body + test report', color: 'var(--color-danger)' },
      { k: 'B', name: 'Scheme B — Specific', risk: 'Medium Risk', fee: 'RM 2,500/model/year', sla: '5 working days', docs: 'SDoC + technical verification + test report from accredited lab', color: 'var(--color-warning)' },
      { k: 'C', name: 'Scheme C — SDoC',    risk: 'Low Risk',    fee: 'RM 600/model/year',   sla: 'Same day (AI ≥90%)', docs: 'Self-Declaration of Conformity (SDoC) + test report', color: 'var(--color-success)' },
    ];
    const steps = [
      { n: 1, t: 'Register Account',    d: 'Create a supplier account. Complete company profile with SSM registration details and required documents. MCMC reviews and approves within 3 working days.' },
      { n: 2, t: 'Determine Scheme',    d: 'Based on your equipment\'s risk classification, select Scheme A, B, or C. The portal\'s AI engine can suggest the appropriate scheme from your product datasheet.' },
      { n: 3, t: 'Submit SDoC',         d: 'Complete the multi-part SDoC form with product details, technical specs, labelling information, and upload supporting documents including test reports.' },
      { n: 4, t: 'AI Validation',       d: 'The AI engine validates your submission against 8 criteria. Scheme C submissions scoring ≥90% are auto-accepted. Others are routed to CPPG officers.' },
      { n: 5, t: 'Payment',             d: 'Pay the applicable scheme fee via MCMC Pay (FPX, credit card, DuitNow, or corporate invoice).' },
      { n: 6, t: 'Receive Certificate', d: 'Upon approval, your Registered Compliance Number (RCN) and digital certificate are issued. Affix the NCEF label to your product before distribution.' },
    ];
    return (
      <div>
        <antd.Typography.Title level={4} style={{ marginTop: 0 }}>How to Register Communications Equipment</antd.Typography.Title>
        <antd.Typography.Text type="secondary" style={{ fontSize: 13 }}>Cara mendaftar peralatan komunikasi di bawah NCEF</antd.Typography.Text>
        <antd.Divider />

        {/* Steps */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Registration Process</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {steps.map(s => (
              <div key={s.n} style={{ padding: 16, border: '1px solid var(--color-border)', borderRadius: 10, display: 'flex', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{s.n}</div>
                <div><div style={{ fontWeight: 600, marginBottom: 4 }}>{s.t}</div><div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{s.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheme comparison */}
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Scheme Comparison</div>
        <antd.Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {schemes.map(s => (
            <antd.Col xs={24} md={8} key={s.k}>
              <antd.Card bordered style={{ borderTop: `4px solid ${s.color}`, height: '100%' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <span className={`scheme-badge ${s.k.toLowerCase()}`}>Scheme {s.k}</span>
                  <antd.Tag>{s.risk}</antd.Tag>
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>{s.name}</div>
                {[
                  { l: 'Processing time', v: s.sla },
                  { l: 'Fee',            v: s.fee },
                  { l: 'Key documents',  v: s.docs },
                ].map(d => (
                  <div key={d.l} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3 }}>{d.l}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{d.v}</div>
                  </div>
                ))}
              </antd.Card>
            </antd.Col>
          ))}
        </antd.Row>

        <antd.Alert type="info" showIcon message="Need help choosing a scheme?" description={<span>Contact the CPPG Helpdesk at <b>cppg@mcmc.gov.my</b> or use the MINA AI Assistant (chat button) for guidance on scheme selection based on your equipment type.</span>} />
      </div>
    );
  };

  // ── DOCUMENTS ───────────────────────────────────────────────────────────────
  const DocsSection = () => {
    const cats = ['All', ...new Set(MOCK.publicDocs.map(d => d.cat))];
    const docs = MOCK.publicDocs.filter(d => docCat === 'All' || d.cat === docCat);
    const iconColor = { pdf: 'var(--color-danger)', docx: 'var(--color-info)' };
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <antd.Typography.Title level={4} style={{ margin: 0 }}>Document Repository</antd.Typography.Title>
          <antd.Segmented value={docCat} onChange={setDocCat} options={cats} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {docs.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 8, background: '#fff', transition: 'all .15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: `${iconColor[d.type]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor[d.type], fontSize: 18, flexShrink: 0 }}>
                  <FilePdfOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{d.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                    <antd.Tag style={{ margin: 0, fontSize: 10 }}>{d.cat}</antd.Tag>
                    {' '}{d.lang} · Updated {d.date} · {d.size}
                  </div>
                </div>
              </div>
              <antd.Button size="small" icon={<DownloadOutlined />}>Download</antd.Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── FAQ ─────────────────────────────────────────────────────────────────────
  const FaqSection = () => {
    const cats = ['All', ...new Set(MOCK.publicFaqs.map(f => f.cat))];
    const faqs = MOCK.publicFaqs.filter(f => (faqCat === 'All' || f.cat === faqCat) && (!faqQ || (f.q + f.a).toLowerCase().includes(faqQ.toLowerCase())));
    return (
      <div>
        <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Frequently Asked Questions</antd.Typography.Title>
        <antd.Row gutter={12} style={{ marginBottom: 16 }}>
          <antd.Col flex="auto">
            <antd.Input placeholder="Search FAQs…" prefix={<SearchOutlined />} value={faqQ} onChange={e => setFaqQ(e.target.value)} />
          </antd.Col>
          <antd.Col>
            <antd.Segmented value={faqCat} onChange={setFaqCat} options={cats} />
          </antd.Col>
        </antd.Row>
        {faqs.length === 0
          ? <antd.Empty description="No FAQs match your search." />
          : faqs.map((f, i) => (
            <div key={i} style={{ border: `1px solid ${openFaq === i ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, marginBottom: 8, overflow: 'hidden' }}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: openFaq === i ? 'var(--color-primary-soft)' : '#fff' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}>
                  <antd.Tag color="default" style={{ flexShrink: 0, fontSize: 10 }}>{f.cat}</antd.Tag>
                  <span style={{ fontWeight: 500, fontSize: 13 }}>{f.q}</span>
                </div>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-primary)', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, background: '#fff' }}>{f.a}</div>
              )}
            </div>
          ))
        }
      </div>
    );
  };

  // ── CONTACT ─────────────────────────────────────────────────────────────────
  const ContactSection = () => (
    <div>
      <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Contact MCMC</antd.Typography.Title>
      <antd.Row gutter={[20, 20]}>
        <antd.Col xs={24} md={12}>
          <antd.Card bordered>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>CPPG Helpdesk</div>
            <div style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: 16, fontSize: 13 }}>Communications Products & Publications Group</div>
            {[
              { icon: <MailOutlined />, l: 'Email', v: 'cppg@mcmc.gov.my' },
              { icon: <PhoneOutlined />, l: 'Phone', v: '+603-8688 8000' },
              { icon: <ClockCircleOutlined />, l: 'Office Hours', v: 'Monday – Friday, 8:30am – 5:30pm' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--color-divider)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-primary-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{c.icon}</div>
                <div><div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{c.l}</div><div style={{ fontSize: 13, fontWeight: 500 }}>{c.v}</div></div>
              </div>
            ))}
          </antd.Card>
        </antd.Col>
        <antd.Col xs={24} md={12}>
          <antd.Card bordered>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Headquarters</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>Malaysian Communications and Multimedia Commission</div>
              <div>Suruhanjaya Komunikasi dan Multimedia Malaysia</div>
              <div style={{ marginTop: 8 }}>MCMC Tower 1, Jalan Impact,</div>
              <div>Cyber 6, 63000 Cyberjaya,</div>
              <div>Selangor Darul Ehsan, Malaysia</div>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: 'var(--color-bg-subtle)', borderRadius: 8, fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              [Map placeholder — Cyberjaya HQ]
            </div>
          </antd.Card>
        </antd.Col>
        <antd.Col xs={24}>
          <antd.Card bordered style={{ background: 'var(--color-primary-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>Ready to register your equipment?</div><div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Create a supplier account to begin the SDoC submission process.</div></div>
              <antd.Button type="primary" icon={<ArrowRightOutlined />} onClick={() => nav('onboarding')}>Start Supplier Registration</antd.Button>
            </div>
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );

  return (
    <div style={{ minHeight: '100%', background: 'var(--color-bg-base)' }}>
      <Hero />
      <SectionNav />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 32px 60px' }}>
        {section === 'search'  && <SearchSection />}
        {section === 'process' && <ProcessSection />}
        {section === 'docs'    && <DocsSection />}
        {section === 'faq'     && <FaqSection />}
        {section === 'contact' && <ContactSection />}
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--color-primary-dark)', color: 'rgba(255,255,255,0.7)', padding: '20px 32px', fontSize: 12, textAlign: 'center' }}>
        © 2026 Malaysian Communications and Multimedia Commission · Suruhanjaya Komunikasi dan Multimedia Malaysia<br />
        NCEF Portal · <antd.Typography.Link style={{ color: 'rgba(255,255,255,0.6)' }}>Privacy Policy</antd.Typography.Link> · <antd.Typography.Link style={{ color: 'rgba(255,255,255,0.6)' }}>Disclaimer</antd.Typography.Link>
      </div>

      {/* MINA public chatbot */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
        {chatOpen && (
          <div style={{ position: 'absolute', bottom: 68, right: 0, width: 360, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 16, boxShadow: 'var(--elevation-3)', overflow: 'hidden' }}>
            <div style={{ background: 'var(--color-primary)', padding: '12px 16px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><RobotOutlined /><div><div style={{ fontWeight: 700, fontSize: 14 }}>MINA · NCEF Assistant</div><div style={{ fontSize: 11, opacity: .8 }}>AI-powered · RAG knowledge base</div></div></div>
              <antd.Button type="text" size="small" style={{ color: '#fff' }} onClick={() => setChatOpen(false)}>✕</antd.Button>
            </div>
            <div style={{ height: 280, overflow: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatHistory.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', padding: '8px 12px', borderRadius: 10, background: m.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-subtle)', color: m.role === 'user' ? '#fff' : 'inherit', fontSize: 12, lineHeight: 1.5 }}>{m.t}</div>
              ))}
              {chatLoading && <div style={{ alignSelf: 'flex-start', padding: '8px 12px', borderRadius: 10, background: 'var(--color-bg-subtle)', fontSize: 12, color: 'var(--color-text-muted)' }}>MINA is typing…</div>}
            </div>
            <div style={{ padding: '8px 12px', borderTop: '1px solid var(--color-divider)' }}>
              <antd.Input.Search value={chatInput} onChange={e => setChatInput(e.target.value)} onSearch={sendChat} onPressEnter={() => sendChat()} placeholder="Ask about registration, fees, schemes…" enterButton="Send" size="small" />
              <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                {['What are the fees?', 'How to renew?', 'Which scheme do I need?'].map((s, i) => (
                  <antd.Tag key={i} style={{ cursor: 'pointer', fontSize: 10 }} onClick={() => sendChat(s)}>{s}</antd.Tag>
                ))}
              </div>
            </div>
          </div>
        )}
        <div onClick={() => setChatOpen(!chatOpen)} style={{ width: 52, height: 52, borderRadius: 26, background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--elevation-3)', fontSize: 22, border: '3px solid #fff', transition: 'transform .2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <RobotOutlined />
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { SCREENS });
