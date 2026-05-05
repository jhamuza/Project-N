// screens-d.jsx — Suppliers Mgmt, Modification, Importation, PMS, Post Monitoring, Compliance Status, Public Portal, SA Letter

const {
  SearchOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  WarningOutlined, InfoCircleOutlined, DownloadOutlined, UploadOutlined, EditOutlined,
  MailOutlined, PhoneOutlined, EyeOutlined, HistoryOutlined, SafetyOutlined, RobotOutlined,
  GlobalOutlined, FilePdfOutlined, FileTextOutlined, PrinterOutlined, BellOutlined,
  ThunderboltOutlined, TeamOutlined, ApartmentOutlined, ContainerOutlined,
  PaperClipOutlined, DeleteOutlined, ReloadOutlined, SendOutlined, ExclamationCircleOutlined,
  UserOutlined, QrcodeOutlined, LockOutlined, SafetyCertificateOutlined, MoreOutlined,
  PlusCircleOutlined, IdcardOutlined, ShopOutlined, BankOutlined, ArrowRightOutlined,
  CheckOutlined, StarOutlined, FileImageOutlined
} = window.icons;

const FormOutlined = window.icons.FormOutlined || window.icons.EditOutlined;
const ImportOutlined = window.icons.ImportOutlined || window.icons.ArrowRightOutlined;
const AlertOutlined = window.icons.AlertOutlined || window.icons.WarningOutlined;
const AimOutlined = window.icons.AimOutlined || window.icons.ThunderboltOutlined;
const BranchesOutlined = window.icons.BranchesOutlined || window.icons.ApartmentOutlined;
const SolutionOutlined = window.icons.SolutionOutlined || window.icons.FileTextOutlined;
const SwapOutlined = window.icons.SwapOutlined || window.icons.ReloadOutlined;
const CrownOutlined = window.icons.CrownOutlined || window.icons.StarOutlined;
const NodeIndexOutlined = window.icons.NodeIndexOutlined || window.icons.ApartmentOutlined;

// ─── Extend MOCK ────────────────────────────────────────────────────────────
Object.assign(window.MOCK, {
  pmsAudits: [
    { id: 'PMS-0426-001', supplier: 'Axiata Digital Sdn Bhd',         supplierId: 'SUP-0126-00087', riskScore: 72, lastAudit: '2025-11-15', products: 23, nonConformances: 0, status: 'proposed',  reason: 'High volume · 12 months since last audit' },
    { id: 'PMS-0426-002', supplier: 'Maxis Broadband Sdn Bhd',        supplierId: 'SUP-0420-00012', riskScore: 85, lastAudit: '2025-06-20', products: 58, nonConformances: 1, status: 'active',    reason: 'Non-conformance flagged in previous cycle' },
    { id: 'PMS-0426-003', supplier: 'YTL Communications Sdn Bhd',     supplierId: 'SUP-0125-00355', riskScore: 91, lastAudit: null,          products: 5,  nonConformances: 0, status: 'proposed',  reason: 'New supplier — mandatory first-cycle audit' },
    { id: 'PMS-0426-004', supplier: 'Digi Telecommunications',        supplierId: 'SUP-0823-00210', riskScore: 63, lastAudit: '2025-09-10', products: 9,  nonConformances: 0, status: 'completed', reason: 'Routine annual audit — passed' },
    { id: 'PMS-0426-005', supplier: 'Huawei Technologies (M) Sdn Bhd',supplierId: 'SUP-0224-00142', riskScore: 78, lastAudit: '2025-08-05', products: 14, nonConformances: 2, status: 'active',    reason: 'Complaint-triggered · high-risk portfolio' },
  ],
  complaints: [
    { id: 'COMP-0426-001', equipment: 'Generic LTE Router (unregistered)', brand: 'Unknown',  model: 'LTE-R100', supplierId: null,             source: 'IntelliGenCE',       severity: 'high',     status: 'open',          date: '2026-04-15', description: 'Device found listed on Lazada and Shopee without MCMC RCN sticker. Multiple SKUs from different sellers.' },
    { id: 'COMP-0426-002', equipment: 'Bluetooth Speaker BS-Pro 5',        brand: 'SoundMax', model: 'BS-500',   supplierId: 'SUP-0126-00087', source: 'Public complaint',    severity: 'medium',   status: 'investigating', date: '2026-04-10', description: 'User reports interference with Wi-Fi 6E router. Output power suspected to exceed declared 20 dBm spec.' },
    { id: 'COMP-0426-003', equipment: 'Illegal Signal Booster',            brand: 'Unknown',  model: 'SB-2000',  supplierId: null,             source: 'AI web crawl',       severity: 'critical', status: 'open',          date: '2026-04-18', description: 'Signal booster operating on licensed 700 MHz band without registration. Found on 3 e-commerce platforms.' },
    { id: 'COMP-0426-004', equipment: 'TP-Link Archer AX73',               brand: 'TP-Link',  model: 'AX5400',   supplierId: 'SUP-0621-00091', source: 'Officer field visit', severity: 'low',      status: 'closed',        date: '2026-03-20', description: 'Label location inconsistency — RCN on packaging only. Corrective action issued and confirmed.' },
  ],
  modRequests: [
    { id: 'MOD-0426-001', rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro',       category: ['Minor'],   status: 'submitted', submitted: '2026-04-17', description: 'Change enclosure colour from Space Black to Midnight Blue. No hardware or RF changes.' },
    { id: 'MOD-0426-002', rcn: 'RCN-0326-00442', product: 'OPPO Find X7 Ultra',  category: ['Others'],  status: 'approved',  submitted: '2026-03-30', description: 'Update PIC contact from Nurul Aisyah to Lee Wei Ming. Administrative only.' },
  ],
  importPermits: [
    { id: 'IMP-0426-001', type: 'Scheme A', rcn: 'RCN-0326-00442', product: 'OPPO Find X7 Ultra', quantity: 500,  status: 'pending_rmcd', submitted: '2026-04-10', coaRef: null },
    { id: 'IMP-0426-002', type: 'Scheme C', rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro',      quantity: 2000, status: 'coa_issued',   submitted: '2026-03-28', coaRef: 'CoA-0426-123456' },
  ],
  complianceHistory: [
    { id: 'CSH-001', entity: 'Axiata Digital Sdn Bhd',  type: 'Supplier', from: 'Active', to: 'Under Surveillance', reason: 'PMS audit initiated — high volume supplier',           officer: 'En. Faisal Rahman', ts: '2026-04-15T09:00:00' },
    { id: 'CSH-002', entity: 'RCN-0722-00021',          type: 'Cert',     from: 'Active', to: 'Cancelled',          reason: 'Certificate expired and not renewed within grace period',officer: 'System',            ts: '2025-07-05T00:00:00' },
    { id: 'CSH-003', entity: 'Iris Corporation Berhad', type: 'Supplier', from: 'Active', to: 'Suspended',          reason: 'Multiple non-conformances; pending enforcement review',  officer: 'Pn. Rosnah Idris',  ts: '2025-11-30T14:30:00' },
  ],
});

Object.assign(window.MOCK.profiles, {
  recommender: { id: 'OFF-004', role: 'recommender', name: 'En. Ahmad Rashid Kamarudin', title: 'Recommender (P5/P6)', initials: 'AR', email: 'ahmad.rashid@mcmc.gov.my', team: 'CPPG' },
  verifier:    { id: 'OFF-005', role: 'verifier',    name: 'Pn. Halimah Yusof',          title: 'Verifier (P7)',       initials: 'HY', email: 'halimah.y@mcmc.gov.my',    team: 'CPPG' },
  approver:    { id: 'OFF-006', role: 'approver',    name: "Dato' Dr. Razif Ahmad Zaki", title: 'Approver (P8)',       initials: 'DZ', email: 'razif.zaki@mcmc.gov.my',   team: 'CPPG-HEAD' },
});

// ─── Helper shared within this file ─────────────────────────────────────────
function WizardBar({ steps, current, onGoTo }) {
  return (
    <div className="wizard-pill-bar">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`pill ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
          onClick={() => i < current && onGoTo && onGoTo(i)}
          style={{ cursor: i < current ? 'pointer' : 'default' }}
        >
          {i < current ? `✓ ${s}` : `${i + 1}. ${s}`}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SUPPLIERS MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['suppliers-mgmt'] = function SuppliersMgmt({ nav, currentUser }) {
  const [filter, setFilter] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  const isLead = currentUser?.role === 'team-lead';

  const sup = MOCK.supplierDirectory;
  const filtered = sup
    .filter(s => filter === 'all' || (filter === 'active' && s.active && s.verifiedAt) || (filter === 'pending' && s.active && !s.verifiedAt) || (filter === 'inactive' && !s.active))
    .filter(s => !q || (s.name + s.brn + s.id + s.pic).toLowerCase().includes(q.toLowerCase()));

  const catColor = { A: 'var(--color-primary)', B: 'var(--color-warning)', C: 'var(--color-success)', D: '#7B3FA0' };
  const kpis = [
    { l: 'Total Suppliers', v: sup.length, color: 'var(--color-primary)' },
    { l: 'Active & Verified', v: sup.filter(s => s.active && s.verifiedAt).length, color: 'var(--color-success)' },
    { l: 'Pending Verification', v: sup.filter(s => s.active && !s.verifiedAt).length, color: 'var(--color-warning)', warn: true },
    { l: 'Deactivated', v: sup.filter(s => !s.active).length, color: 'var(--color-text-muted)' },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>{isLead ? 'System Administrator' : 'MCMC Officer'} · CPPG</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Supplier Directory</antd.Typography.Title>
          <antd.Typography.Text type="secondary">All registered NCEF suppliers · Category A / B / C / D</antd.Typography.Text>
        </div>
        {isLead && <antd.Button type="primary" icon={<PlusOutlined />}>Add supplier</antd.Button>}
      </div>
      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn ? 'var(--color-warning)' : k.color }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>
      <antd.Card bordered>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <antd.Segmented value={filter} onChange={setFilter} options={[
            { label: `All (${sup.length})`, value: 'all' },
            { label: `Active (${sup.filter(s => s.active && s.verifiedAt).length})`, value: 'active' },
            { label: `Pending (${sup.filter(s => s.active && !s.verifiedAt).length})`, value: 'pending' },
            { label: `Inactive (${sup.filter(s => !s.active).length})`, value: 'inactive' },
          ]} />
          <antd.Input placeholder="Search company, BRN, Supplier ID, PIC…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} style={{ width: 320 }} value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <antd.Table rowKey="id" dataSource={filtered} pagination={false} scroll={{ x: 'max-content' }} onRow={r => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })} columns={[
          { title: 'Supplier ID', dataIndex: 'id',       width: 110, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
          { title: 'Company',     width: 220, ellipsis: true, render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>BRN {r.brn}</div></div> },
          { title: 'Cat',         dataIndex: 'category', width: 70,  render: c => <antd.Tag style={{ background: `${catColor[c]}18`, color: catColor[c], border: 'none', fontWeight: 700 }}>Cat {c}</antd.Tag> },
          { title: 'Since',       dataIndex: 'since',    width: 120, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span> },
          { title: 'Approvals',   dataIndex: 'approvals', width: 90, align: 'center', render: v => <antd.Tag color={v >= 20 ? 'green' : v >= 5 ? 'blue' : 'default'}>{v}</antd.Tag> },
          { title: 'PIC',         width: 200, render: (_, r) => <div><div style={{ fontSize: 12 }}>{r.pic}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.picEmail}</div></div> },
          { title: 'Status',      width: 100, render: (_, r) => r.verifiedAt ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Verified</antd.Tag> : r.active ? <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Pending</antd.Tag> : <antd.Tag icon={<CloseCircleOutlined />}>Inactive</antd.Tag> },
          { title: '', width: 120, render: (_, r) => (
            <antd.Space size="small" onClick={e => e.stopPropagation()}>
              {isLead && !r.verifiedAt && r.active && <antd.Button size="small" type="primary" icon={<CheckCircleOutlined />}>Verify</antd.Button>}
              {isLead && r.active && <antd.Tooltip title="Deactivate"><antd.Button size="small" danger type="text" icon={<CloseCircleOutlined />} /></antd.Tooltip>}
            </antd.Space>
          ) },
        ]} />
      </antd.Card>
      <antd.Drawer open={!!selected} onClose={() => setSelected(null)} width={520} title={selected?.name}>
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--color-divider)', marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 700, fontSize: 20 }}>{selected.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
              <div><div style={{ fontSize: 15, fontWeight: 600 }}>{selected.name}</div><antd.Space size={6} style={{ marginTop: 4 }}><antd.Tag>Cat {selected.category}</antd.Tag>{selected.verifiedAt ? <antd.Tag color="green">Verified</antd.Tag> : <antd.Tag color="orange">Pending</antd.Tag>}</antd.Space></div>
            </div>
            <antd.Descriptions column={1} size="small" bordered items={[
              { key: 'id',      label: 'Supplier ID',   children: <antd.Typography.Text code>{selected.id}</antd.Typography.Text> },
              { key: 'brn',     label: 'SSM BRN',       children: selected.brn },
              { key: 'addr',    label: 'Address',        children: selected.address },
              { key: 'pic',     label: 'PIC',            children: `${selected.pic} · ${selected.picEmail}` },
              { key: 'since',   label: 'Registered',     children: new Date(selected.since).toLocaleDateString('en-GB') },
              { key: 'ver',     label: 'Verified',       children: selected.verifiedAt ? new Date(selected.verifiedAt).toLocaleDateString('en-GB') : '—' },
              { key: 'addedBy', label: 'Added by',       children: selected.addedBy?.replace(/-/g, ' ') },
              { key: 'apps',    label: 'Total Approvals',children: <antd.Tag color="green">{selected.approvals}</antd.Tag> },
            ]} />
            <antd.Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Actions</antd.Divider>
            <antd.Space wrap>
              {isLead && !selected.verifiedAt && selected.active && <antd.Button type="primary" icon={<CheckCircleOutlined />}>Verify Account</antd.Button>}
              <antd.Button icon={<MailOutlined />}>Email PIC</antd.Button>
              <antd.Button icon={<HistoryOutlined />}>Application History</antd.Button>
              {isLead && selected.active && <antd.Button danger icon={<CloseCircleOutlined />}>Deactivate</antd.Button>}
            </antd.Space>
          </div>
        )}
      </antd.Drawer>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. MODIFICATION OF REGISTRATION
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['modification'] = function Modification({ nav }) {
  const [step, setStep] = React.useState(0);
  const [rcn, setRcn] = React.useState('');
  const [resolvedCert, setResolvedCert] = React.useState(null);
  const [cats, setCats] = React.useState([]);
  const [justification, setJustification] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const STEPS = ['Find Certificate', 'Modification Type', 'Upload & Describe', 'Confirm'];
  const isMajor = cats.includes('Major');

  function resolveCert() {
    const found = MOCK.certificates.find(c => c.rcn.toLowerCase() === rcn.toLowerCase());
    if (found) { setResolvedCert(found); setStep(1); }
    else antd.message.error('RCN not found or not associated with your account.');
  }

  if (submitted) return (
    <div style={{ padding: 60, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px' }}>✓</div>
      <antd.Typography.Title level={3}>Modification Submitted</antd.Typography.Title>
      <antd.Typography.Text type="secondary">Assigned to a CPPG officer for review. You'll be notified within 3–5 working days.</antd.Typography.Text>
      <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block' }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Reference</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>MOD-0426-003</div>
      </div>
      <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center' }}>
        <antd.Button onClick={() => { setSubmitted(false); setStep(0); setRcn(''); setResolvedCert(null); setCats([]); }}>New Request</antd.Button>
        <antd.Button type="primary" onClick={() => nav('applications')}>My Applications</antd.Button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <antd.Breadcrumb items={[{ title: <a onClick={() => nav('dashboard')}>Dashboard</a> }, { title: 'Modification of Registration' }]} style={{ marginBottom: 8 }} />
      <antd.Typography.Title level={3} style={{ margin: '0 0 20px' }}>Modification of Registration</antd.Typography.Title>
      <antd.Card bordered style={{ marginBottom: 20 }}>
        <WizardBar steps={STEPS} current={step} onGoTo={setStep} />
      </antd.Card>
      <antd.Card bordered>
        {step === 0 && (
          <div style={{ maxWidth: 520 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Find Certificate</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Enter the Registered Compliance Number (RCN) of the equipment you wish to modify.</antd.Typography.Text>
            <antd.Form layout="vertical" style={{ marginTop: 20 }}>
              <antd.Form.Item label="Registered Compliance Number (RCN)" required>
                <antd.Input size="large" placeholder="e.g. RCN-0326-00449" value={rcn} onChange={e => setRcn(e.target.value)} onPressEnter={resolveCert} prefix={<SafetyCertificateOutlined style={{ color: 'var(--color-text-muted)' }} />} />
              </antd.Form.Item>
            </antd.Form>
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 16 }}>
              Or select from your active certificates:
            </div>
            <antd.Select style={{ width: '100%' }} placeholder="Select a certificate…" onChange={v => { setRcn(v); const c = MOCK.certificates.find(x => x.rcn === v); setResolvedCert(c); setStep(1); }} options={MOCK.certificates.filter(c => c.status === 'active').map(c => ({ value: c.rcn, label: `${c.rcn} — ${c.product}` }))} />
            <div style={{ marginTop: 24 }}>
              <antd.Button type="primary" onClick={resolveCert} disabled={!rcn}>Continue →</antd.Button>
            </div>
          </div>
        )}
        {step === 1 && resolvedCert && (
          <div>
            <antd.Alert type="success" showIcon style={{ marginBottom: 20 }} message={`Certificate found: ${resolvedCert.product}`} description={<span><antd.Typography.Text code>{resolvedCert.rcn}</antd.Typography.Text> · Scheme {resolvedCert.scheme} · Issued {new Date(resolvedCert.issued).toLocaleDateString('en-GB')}</span>} />
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Select Modification Type</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Select all that apply. Major changes require a new registration.</antd.Typography.Text>
            <antd.Checkbox.Group value={cats} onChange={setCats} style={{ display: 'grid', gap: 12, marginTop: 20 }}>
              {[
                { v: 'Major',  t: 'Major Modification', d: 'Significant change affecting equipment conformity (e.g. radio frequency, hardware components). Requires new registration.', color: 'var(--color-danger)' },
                { v: 'Minor',  t: 'Minor Modification',  d: 'Small changes not affecting conformity (e.g. colour, enclosure material, packaging design).', color: 'var(--color-warning)' },
                { v: 'Others', t: 'Administrative Change', d: 'Contact person, billing address, label correction, or other non-technical updates.', color: 'var(--color-info)' },
              ].map(opt => (
                <antd.Checkbox key={opt.v} value={opt.v} style={{ border: `1px solid ${cats.includes(opt.v) ? opt.color : 'var(--color-border)'}`, borderRadius: 8, padding: 14, margin: 0, background: cats.includes(opt.v) ? `${opt.color}08` : '#fff' }}>
                  <div style={{ display: 'inline-block', marginLeft: 4 }}>
                    <div style={{ fontWeight: 600, color: opt.color }}>{opt.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{opt.d}</div>
                  </div>
                </antd.Checkbox>
              ))}
            </antd.Checkbox.Group>
            {isMajor && <antd.Alert type="warning" showIcon style={{ marginTop: 16 }} message="Major modification requires a new SDoC registration" description="Your existing certificate will remain valid during the review period. You will be redirected to the SDoC wizard." />}
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <antd.Button onClick={() => setStep(0)}>← Back</antd.Button>
              {isMajor
                ? <antd.Button type="primary" onClick={() => nav('sdoc-wizard')} icon={<ArrowRightOutlined />}>Start New SDoC Registration</antd.Button>
                : <antd.Button type="primary" onClick={() => setStep(2)} disabled={cats.length === 0}>Continue →</antd.Button>}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Describe & Upload</antd.Typography.Title>
            <antd.Form layout="vertical">
              <antd.Form.Item label="Description of Changes" required>
                <antd.Input.TextArea rows={4} placeholder="Describe exactly what is changing, why, and how it does not affect the equipment's conformity…" value={justification} onChange={e => setJustification(e.target.value)} />
              </antd.Form.Item>
              <antd.Form.Item label="Supporting Documents">
                <antd.Upload.Dragger multiple style={{ borderRadius: 8 }}>
                  <p style={{ fontSize: 28, margin: 0 }}>📎</p>
                  <p style={{ fontWeight: 600 }}>Upload supporting evidence</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Test reports, photos, revised label artwork, updated datasheets — PDF, PNG, JPEG accepted</p>
                </antd.Upload.Dragger>
              </antd.Form.Item>
              {cats.includes('Others') && (
                <antd.Form.Item label="New Contact Person / PIC Details">
                  <antd.Row gutter={12}>
                    <antd.Col span={12}><antd.Input placeholder="Full Name" /></antd.Col>
                    <antd.Col span={12}><antd.Input placeholder="Email address" prefix={<MailOutlined />} /></antd.Col>
                  </antd.Row>
                </antd.Form.Item>
              )}
            </antd.Form>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <antd.Button onClick={() => setStep(1)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setStep(3)} disabled={!justification}>Review →</antd.Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Review & Submit</antd.Typography.Title>
            <antd.Descriptions bordered column={1} size="small">
              <antd.Descriptions.Item label="Certificate">{resolvedCert?.rcn} — {resolvedCert?.product}</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Modification Types">{cats.map(c => <antd.Tag key={c}>{c}</antd.Tag>)}</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Description">{justification}</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Routing">Assigned to CPPG officer for {cats.includes('Minor') ? 'Minor/Admin' : 'Administrative'} review</antd.Descriptions.Item>
            </antd.Descriptions>
            <antd.Alert type="info" showIcon style={{ marginTop: 16 }} message="By submitting, you confirm that all information is accurate and the modification does not affect the equipment's fundamental conformity with MCMC standards." />
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <antd.Button onClick={() => setStep(2)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setSubmitted(true)}>Submit Modification Request</antd.Button>
            </div>
          </div>
        )}
      </antd.Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. IMPORTATION
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['importation'] = function Importation({ nav }) {
  const [step, setStep] = React.useState(0);
  const [permitType, setPermitType] = React.useState('');
  const [rcnRef, setRcnRef] = React.useState('');
  const [validating, setValidating] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [redirecting, setRedirecting] = React.useState(false);
  const STEPS = ['Permit Type', 'Validate Reference', 'Consignor & Logistics', 'Submit to RMCD'];

  const pastPermits = MOCK.importPermits;

  function validateRcn() {
    setValidating(true);
    setTimeout(() => { setValidating(false); setValidated(true); }, 1200);
  }

  function submitToRmcd() {
    setRedirecting(true);
    setTimeout(() => setStep(3), 1500);
  }

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: '0 auto' }}>
      <antd.Breadcrumb items={[{ title: <a onClick={() => nav('dashboard')}>Dashboard</a> }, { title: 'Importation' }]} style={{ marginBottom: 8 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <antd.Typography.Title level={3} style={{ margin: 0 }}>Import Permit Application</antd.Typography.Title>
        <antd.Tag color="blue" icon={<BankOutlined />}>Processed via RMCD MyOGA System</antd.Tag>
      </div>

      {/* Past permits */}
      {pastPermits.length > 0 && (
        <antd.Card title="My Import Permits" bordered style={{ marginBottom: 20 }} size="small">
          <antd.Table rowKey="id" dataSource={pastPermits} pagination={false} size="small" scroll={{ x: 'max-content' }} columns={[
            { title: 'Permit ID', dataIndex: 'id',       width: 130, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
            { title: 'Type',      dataIndex: 'type',     width: 100, render: v => <antd.Tag>{v}</antd.Tag> },
            { title: 'RCN',       dataIndex: 'rcn',      width: 150, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
            { title: 'Product',   dataIndex: 'product',  width: 200, ellipsis: true },
            { title: 'Qty',       dataIndex: 'quantity', width: 70,  align: 'right', render: v => v.toLocaleString() },
            { title: 'Status',    dataIndex: 'status',   width: 140, render: s => s === 'coa_issued' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>CoA Issued</antd.Tag> : <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Pending RMCD</antd.Tag> },
            { title: 'CoA Ref',   dataIndex: 'coaRef',   width: 130, render: v => v ? <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
          ]} />
        </antd.Card>
      )}

      <antd.Card bordered style={{ marginBottom: 16 }}><WizardBar steps={STEPS} current={step} onGoTo={setStep} /></antd.Card>
      <antd.Card bordered>
        {step === 0 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Select Permit Type</antd.Typography.Title>
            <antd.Typography.Text type="secondary">You are automatically assigned MCMC as the Permit Issuance Agency.</antd.Typography.Text>
            <antd.Radio.Group value={permitType} onChange={e => setPermitType(e.target.value)} style={{ display: 'grid', gap: 12, marginTop: 20, width: '100%' }}>
              {[
                { v: 'Scheme A', t: 'Scheme A — Standard Certification', d: 'Equipment with full SDoC and CoC from accredited body' },
                { v: 'Scheme B', t: 'Scheme B — Specific Certification', d: 'Equipment requiring detailed technical verification' },
                { v: 'Scheme C', t: 'Scheme C — Self-Declaration', d: 'Low-risk equipment under manufacturer SDoC' },
                { v: 'SA',       t: 'Special Approval',                  d: 'R&D, demonstration, trial, PoC, or personal import' },
              ].map(opt => (
                <antd.Radio key={opt.v} value={opt.v} style={{ padding: 14, border: `1px solid ${permitType === opt.v ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: permitType === opt.v ? 'var(--color-primary-soft)' : '#fff' }}>
                  <div style={{ display: 'inline-block', marginLeft: 4 }}>
                    <div style={{ fontWeight: 600 }}>{opt.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{opt.d}</div>
                  </div>
                </antd.Radio>
              ))}
            </antd.Radio.Group>
            <div style={{ marginTop: 20 }}><antd.Button type="primary" disabled={!permitType} onClick={() => setStep(1)}>Continue →</antd.Button></div>
          </div>
        )}
        {step === 1 && (
          <div style={{ maxWidth: 560 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Validate {permitType === 'SA' ? 'Special Approval Reference' : 'RCN'}</antd.Typography.Title>
            <antd.Alert type="info" showIcon style={{ marginBottom: 20 }} message="Real-time validation" description={`The system will verify that your ${permitType === 'SA' ? 'SA reference number' : 'RCN'} is valid and active before proceeding.`} />
            <antd.Form layout="vertical">
              <antd.Form.Item label={permitType === 'SA' ? 'Special Approval Reference' : 'Registered Compliance Number (RCN)'} required>
                <antd.Input size="large" placeholder={permitType === 'SA' ? 'SA-0426-00012' : 'RCN-0326-00449'} value={rcnRef} onChange={e => { setRcnRef(e.target.value); setValidated(false); }} prefix={<SafetyCertificateOutlined style={{ color: 'var(--color-text-muted)' }} />}
                  suffix={validated ? <CheckCircleOutlined style={{ color: 'var(--color-success)' }} /> : null}
                />
              </antd.Form.Item>
              <antd.Form.Item label="Quantity to Import" required><antd.Input type="number" size="large" placeholder="500" /></antd.Form.Item>
              {validated && (
                <antd.Alert type="success" showIcon message="Reference validated" description="Equipment RCN-0326-00449 (Mi Band 9 Pro — Scheme C, active) verified. IMEI count and serial range confirmed." />
              )}
            </antd.Form>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <antd.Button onClick={() => setStep(0)}>← Back</antd.Button>
              {!validated && <antd.Button type="primary" loading={validating} onClick={validateRcn} disabled={!rcnRef}>Validate →</antd.Button>}
              {validated && <antd.Button type="primary" onClick={() => setStep(2)}>Continue →</antd.Button>}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Consignor, Consignee & Logistics</antd.Typography.Title>
            <antd.Form layout="vertical">
              <antd.Divider orientation="left" orientationMargin={0}>Consignor (Overseas Supplier)</antd.Divider>
              <antd.Row gutter={16}>
                <antd.Col span={12}><antd.Form.Item label="Company Name" required><antd.Input placeholder="Guangdong OPPO Mobile Telecommunications Corp., Ltd." /></antd.Form.Item></antd.Col>
                <antd.Col span={12}><antd.Form.Item label="Country of Origin" required><antd.Select showSearch placeholder="Select country…" options={[{ value: 'CN', label: 'China' }, { value: 'KR', label: 'South Korea' }, { value: 'US', label: 'United States' }, { value: 'DE', label: 'Germany' }]} /></antd.Form.Item></antd.Col>
                <antd.Col span={24}><antd.Form.Item label="Full Address" required><antd.Input.TextArea rows={2} placeholder="No. 18 Haibin Road, Wuchang, Dongguan, Guangdong, China" /></antd.Form.Item></antd.Col>
              </antd.Row>
              <antd.Divider orientation="left" orientationMargin={0}>Consignee (Malaysian Importer)</antd.Divider>
              <antd.Row gutter={16}>
                <antd.Col span={12}><antd.Form.Item label="Company Name"><antd.Input defaultValue="Axiata Digital Sdn Bhd" /></antd.Form.Item></antd.Col>
                <antd.Col span={12}><antd.Form.Item label="ROC / ROB Number"><antd.Input defaultValue="201901023456" /></antd.Form.Item></antd.Col>
              </antd.Row>
              <antd.Divider orientation="left" orientationMargin={0}>Logistics</antd.Divider>
              <antd.Row gutter={16}>
                <antd.Col span={8}><antd.Form.Item label="Mode of Transport" required><antd.Select defaultValue="air" options={[{ value: 'air', label: 'Air Freight' }, { value: 'sea', label: 'Sea Freight' }, { value: 'land', label: 'Land' }]} /></antd.Form.Item></antd.Col>
                <antd.Col span={8}><antd.Form.Item label="Port / Custom Station" required><antd.Select defaultValue="klia" options={[{ value: 'klia', label: 'KLIA Cargo Terminal' }, { value: 'penang', label: 'Penang Port' }, { value: 'ptp', label: 'Port of Tanjung Pelepas' }]} /></antd.Form.Item></antd.Col>
                <antd.Col span={8}><antd.Form.Item label="Estimated Arrival"><antd.DatePicker style={{ width: '100%' }} /></antd.Form.Item></antd.Col>
              </antd.Row>
            </antd.Form>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <antd.Button onClick={() => setStep(1)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={submitToRmcd} loading={redirecting}>{redirecting ? 'Submitting…' : 'Submit to RMCD MyOGA →'}</antd.Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px' }}>✓</div>
            <antd.Typography.Title level={3} style={{ marginTop: 0 }}>Submitted to RMCD MyOGA</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Your import permit application has been transmitted to RMCD. Payment is collected directly by RMCD.</antd.Typography.Text>
            <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block', textAlign: 'left' }}>
              <antd.Row gutter={24}>
                <antd.Col><div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>NCEF Reference</div><div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary)', fontSize: 16 }}>IMP-0426-003</div></antd.Col>
                <antd.Col><div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>RMCD Status</div><div style={{ fontWeight: 600, color: 'var(--color-warning)' }}>Awaiting payment at RMCD</div></antd.Col>
              </antd.Row>
            </div>
            <antd.Alert type="info" showIcon style={{ marginTop: 20, textAlign: 'left' }} message="Next step: Complete payment at RMCD MyOGA" description="RMCD will issue a Certificate of Acceptance (CoA) upon successful payment. The CoA reference will appear in your import permits list above." />
            <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
              <antd.Button icon={<ArrowRightOutlined />} type="primary" onClick={() => { setStep(0); setValidated(false); setRcnRef(''); setPermitType(''); }}>New Permit</antd.Button>
              <antd.Button onClick={() => nav('dashboard')}>Back to Dashboard</antd.Button>
            </div>
          </div>
        )}
      </antd.Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. POST-MARKET SURVEILLANCE (PMS)
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['pms'] = function PMS({ nav, currentUser }) {
  const [tab, setTab] = React.useState('proposed');
  const [sampling, setSampling] = React.useState(15);
  const [notifyOpen, setNotifyOpen] = React.useState(null);
  const audits = MOCK.pmsAudits;
  const proposed   = audits.filter(a => a.status === 'proposed');
  const active     = audits.filter(a => a.status === 'active');
  const completed  = audits.filter(a => a.status === 'completed');

  const riskColor = s => s >= 85 ? 'var(--color-danger)' : s >= 70 ? 'var(--color-warning)' : 'var(--color-success)';

  const AuditTable = ({ data, showFindings }) => (
    <antd.Table rowKey="id" dataSource={data} pagination={false} scroll={{ x: 'max-content' }} columns={[
      { title: 'Audit ID',   dataIndex: 'id',               width: 120, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
      { title: 'Supplier',   dataIndex: 'supplier',         width: 200, render: (v, r) => <div><div style={{ fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.supplierId}</div></div> },
      { title: 'Risk Score', dataIndex: 'riskScore',        width: 130, render: s => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 60, height: 6, background: 'var(--color-bg-subtle)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${s}%`, background: riskColor(s), borderRadius: 999 }} />
          </div>
          <antd.Tag color={s >= 85 ? 'red' : s >= 70 ? 'orange' : 'green'} style={{ fontWeight: 600 }}>{s}</antd.Tag>
        </div>
      ) },
      { title: 'Products',   dataIndex: 'products',         width: 90,  align: 'center' },
      { title: 'Non-Conf.',  dataIndex: 'nonConformances',  width: 90,  align: 'center', render: v => v > 0 ? <antd.Tag color="red">{v}</antd.Tag> : <antd.Tag color="green">0</antd.Tag> },
      { title: 'Last Audit', dataIndex: 'lastAudit',        width: 110, render: v => v ? <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB')}</span> : <antd.Typography.Text type="secondary">Never</antd.Typography.Text> },
      { title: 'Reason',     dataIndex: 'reason',           width: 200, ellipsis: true, render: v => <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
      { title: '', width: 160, render: (_, r) => (
        <antd.Space size="small">
          {showFindings
            ? <antd.Button size="small" type="primary" icon={<EditOutlined />}>Record Findings</antd.Button>
            : <antd.Button size="small" icon={<SendOutlined />} onClick={() => setNotifyOpen(r)}>Notify Supplier</antd.Button>}
        </antd.Space>
      ) },
    ]} />
  );

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC · CPPG</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Post-Market Surveillance</antd.Typography.Title>
          <antd.Typography.Text type="secondary">AI-assisted audit proposals · Product sampling · Non-conformance recording</antd.Typography.Text>
        </div>
        <antd.Button type="primary" icon={<RobotOutlined />}>Refresh AI Proposals</antd.Button>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Proposed Audits', v: proposed.length, color: 'var(--color-primary)' },
          { l: 'Active Audits', v: active.length, color: 'var(--color-warning)', warn: active.length > 0 },
          { l: 'Completed (YTD)', v: completed.length, color: 'var(--color-success)' },
          { l: 'Open Non-Conformances', v: audits.reduce((a, b) => a + b.nonConformances, 0), color: 'var(--color-danger)', warn: true },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? k.color : 'inherit' }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered style={{ marginBottom: 16 }}>
        <antd.Row gutter={24} align="middle">
          <antd.Col xs={24} md={12}>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600, marginBottom: 6 }}>Product Sampling Rate</div>
            <antd.Slider min={5} max={50} step={5} value={sampling} onChange={setSampling} marks={{ 5: '5%', 15: '15%', 30: '30%', 50: '50%' }} />
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>AI will propose sampling {sampling}% of registered product models per selected supplier.</div>
          </antd.Col>
          <antd.Col xs={24} md={12}>
            <antd.Alert type="info" showIcon message="AI Risk Scoring Engine" description="Audit proposals are ranked by: equipment risk class (A/B/C), supplier compliance history, registration volume, complaint signals, and time since last audit. Adjustable via Parameters." />
          </antd.Col>
        </antd.Row>
      </antd.Card>

      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <antd.Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 16px' }} items={[
          { key: 'proposed', label: `AI Proposed (${proposed.length})`, children: <div style={{ padding: '0 0 16px' }}><AuditTable data={proposed} showFindings={false} /></div> },
          { key: 'active',   label: `Active (${active.length})`,       children: <div style={{ padding: '0 0 16px' }}><AuditTable data={active}   showFindings={true}  /></div> },
          { key: 'completed',label: `Completed (${completed.length})`, children: <div style={{ padding: '0 0 16px' }}><AuditTable data={completed} showFindings={false} /></div> },
        ]} />
      </antd.Card>

      <antd.Modal open={!!notifyOpen} onCancel={() => setNotifyOpen(null)} title="Notify Supplier of Audit" okText="Send Notification" onOk={() => { antd.message.success(`Audit notification sent to ${notifyOpen?.supplier}`); setNotifyOpen(null); }} width={520}>
        {notifyOpen && (
          <antd.Form layout="vertical">
            <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }} message={`Audit PMS-0426-00X will be initiated for ${notifyOpen.supplier}`} />
            <antd.Form.Item label="Notification Template">
              <antd.Select defaultValue="standard" options={[{ value: 'standard', label: 'Standard PMS Audit Notice' }, { value: 'urgent', label: 'Priority Audit Notice (48h)' }]} />
            </antd.Form.Item>
            <antd.Form.Item label="Scheduled Audit Date"><antd.DatePicker style={{ width: '100%' }} /></antd.Form.Item>
            <antd.Form.Item label="Additional Instructions (optional)"><antd.Input.TextArea rows={3} placeholder="Please prepare all certificate documentation, test reports, and make relevant personnel available…" /></antd.Form.Item>
          </antd.Form>
        )}
      </antd.Modal>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. POST MONITORING (Complaints & Intelligence)
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['post-monitoring'] = function PostMonitoring({ nav, currentUser }) {
  const [selected, setSelected] = React.useState(null);
  const [intakeOpen, setIntakeOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const comps = MOCK.complaints.filter(c => !q || (c.equipment + c.brand + c.id + c.source + c.description).toLowerCase().includes(q.toLowerCase()));

  const sevColor = { critical: 'var(--color-danger)', high: 'var(--color-warning)', medium: 'var(--color-info)', low: 'var(--color-text-muted)' };
  const sevBg    = { critical: 'var(--color-danger-bg)', high: 'var(--color-warning-bg)', medium: 'var(--color-info-bg)', low: 'var(--color-bg-subtle)' };
  const statColor = { open: 'red', investigating: 'orange', closed: 'green' };

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC · IntelliGenCE</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Post Monitoring</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Equipment complaints · Market intelligence · AI web-crawl findings</antd.Typography.Text>
        </div>
        <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => setIntakeOpen(true)}>New Complaint / Intelligence</antd.Button>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Total Complaints', v: MOCK.complaints.length },
          { l: 'Open', v: MOCK.complaints.filter(c => c.status === 'open').length, color: 'var(--color-danger)', warn: true },
          { l: 'Investigating', v: MOCK.complaints.filter(c => c.status === 'investigating').length, color: 'var(--color-warning)' },
          { l: 'Critical Severity', v: MOCK.complaints.filter(c => c.severity === 'critical').length, color: 'var(--color-danger)', warn: true },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}><div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? k.color : 'inherit' }}>{k.v}</div></div></antd.Col>
        ))}
      </antd.Row>

      <antd.Row gutter={16}>
        <antd.Col xs={24} lg={selected ? 12 : 24}>
          <antd.Card bordered>
            <antd.Input placeholder="Search complaints…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 16 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {comps.map(c => (
                <div key={c.id} onClick={() => setSelected(c)} style={{ padding: 16, border: `1.5px solid ${selected?.id === c.id ? 'var(--color-primary)' : sevBg[c.severity] === 'var(--color-bg-subtle)' ? 'var(--color-border)' : sevColor[c.severity] + '40'}`, borderRadius: 10, cursor: 'pointer', background: selected?.id === c.id ? 'var(--color-primary-soft)' : sevBg[c.severity] }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, padding: '2px 8px', borderRadius: 4, background: sevColor[c.severity], color: '#fff' }}>{c.severity}</span>
                        <antd.Tag color={statColor[c.status]} style={{ margin: 0 }}>{c.status}</antd.Tag>
                        <antd.Tag style={{ margin: 0, fontSize: 11 }}>{c.source}</antd.Tag>
                      </div>
                      <div style={{ fontWeight: 600 }}>{c.equipment}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{c.id} · {new Date(c.date).toLocaleDateString('en-GB')}</div>
                    </div>
                    {selected?.id === c.id && <CheckCircleOutlined style={{ color: 'var(--color-primary)', fontSize: 18 }} />}
                  </div>
                </div>
              ))}
            </div>
          </antd.Card>
        </antd.Col>
        {selected && (
          <antd.Col xs={24} lg={12}>
            <antd.Card bordered title={<antd.Space><AlertOutlined style={{ color: sevColor[selected.severity] }} />{selected.id}</antd.Space>} extra={<antd.Button type="text" size="small" onClick={() => setSelected(null)}>✕</antd.Button>}>
              <antd.Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }} items={[
                { key: 'equip',  label: 'Equipment',  children: <div><div style={{ fontWeight: 600 }}>{selected.equipment}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{selected.brand} · {selected.model}</div></div> },
                { key: 'source', label: 'Source',     children: selected.source },
                { key: 'sev',    label: 'Severity',   children: <span style={{ fontWeight: 700, color: sevColor[selected.severity], textTransform: 'uppercase' }}>{selected.severity}</span> },
                { key: 'status', label: 'Status',     children: <antd.Tag color={statColor[selected.status]}>{selected.status}</antd.Tag> },
                { key: 'date',   label: 'Date',       children: new Date(selected.date).toLocaleDateString('en-GB') },
                { key: 'supp',   label: 'Linked Supplier', children: selected.supplierId ? <antd.Typography.Text code>{selected.supplierId}</antd.Typography.Text> : <antd.Typography.Text type="secondary">Unknown / unlicensed</antd.Typography.Text> },
              ]} />
              <div style={{ fontSize: 13, lineHeight: 1.6, padding: 12, background: 'var(--color-bg-subtle)', borderRadius: 8, marginBottom: 16 }}>{selected.description}</div>
              <antd.Space wrap>
                <antd.Button type="primary" icon={<AimOutlined />}>Trigger PMS Audit</antd.Button>
                <antd.Button icon={<EditOutlined />}>Update Status</antd.Button>
                <antd.Button icon={<DownloadOutlined />}>Export Report</antd.Button>
              </antd.Space>
            </antd.Card>
          </antd.Col>
        )}
      </antd.Row>

      <antd.Modal open={intakeOpen} onCancel={() => setIntakeOpen(false)} title="New Complaint / Market Intelligence" okText="Submit" onOk={() => { antd.message.success('Intelligence record created.'); setIntakeOpen(false); }} width={560}>
        <antd.Form layout="vertical">
          <antd.Form.Item label="Equipment Name / Description" required><antd.Input placeholder="Generic LTE Router, Signal Booster model X…" /></antd.Form.Item>
          <antd.Row gutter={12}>
            <antd.Col span={12}><antd.Form.Item label="Brand"><antd.Input placeholder="Unknown / brand name" /></antd.Form.Item></antd.Col>
            <antd.Col span={12}><antd.Form.Item label="Model"><antd.Input placeholder="LTE-R100" /></antd.Form.Item></antd.Col>
          </antd.Row>
          <antd.Row gutter={12}>
            <antd.Col span={12}><antd.Form.Item label="Source" required><antd.Select options={[{ value: 'IntelliGenCE', label: 'IntelliGenCE Program' }, { value: 'Public complaint', label: 'Public Complaint' }, { value: 'AI web crawl', label: 'AI Web Crawl' }, { value: 'Officer field visit', label: 'Officer Field Visit' }]} /></antd.Form.Item></antd.Col>
            <antd.Col span={12}><antd.Form.Item label="Severity" required><antd.Select options={['critical', 'high', 'medium', 'low'].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))} /></antd.Form.Item></antd.Col>
          </antd.Row>
          <antd.Form.Item label="Description" required><antd.Input.TextArea rows={4} placeholder="Describe the complaint or intelligence finding in detail…" /></antd.Form.Item>
        </antd.Form>
      </antd.Modal>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. COMPLIANCE STATUS MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['compliance-status'] = function ComplianceStatus({ nav, currentUser }) {
  const [entityTab, setEntityTab] = React.useState('suppliers');
  const [changeOpen, setChangeOpen] = React.useState(null);
  const [reason, setReason] = React.useState('');
  const [newStatus, setNewStatus] = React.useState('');
  const isLead = currentUser?.role === 'team-lead';

  const statusStyle = { Active: 'green', 'Under Surveillance': 'orange', Suspended: 'red', Cancelled: 'default' };

  const SupplierStatusTable = () => (
    <antd.Table rowKey="id" dataSource={MOCK.supplierDirectory.filter(s => s.active)} pagination={false} columns={[
      { title: 'Supplier', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.name}</div><antd.Typography.Text code style={{ fontSize: 11 }}>{r.id}</antd.Typography.Text></div> },
      { title: 'Category', dataIndex: 'category', render: c => <antd.Tag>Cat {c}</antd.Tag> },
      { title: 'Approvals', dataIndex: 'approvals', align: 'center' },
      { title: 'Compliance Status', render: (_, r) => {
        const stat = r.name.includes('YTL') ? 'Under Surveillance' : r.active ? 'Active' : 'Suspended';
        return <antd.Tag color={statusStyle[stat]}>{stat}</antd.Tag>;
      } },
      { title: '', render: (_, r) => isLead && (
        <antd.Button size="small" onClick={() => { setChangeOpen({ entity: r.name, type: 'Supplier' }); setNewStatus(''); setReason(''); }}>Change Status</antd.Button>
      ) },
    ]} />
  );

  const CertStatusTable = () => (
    <antd.Table rowKey="rcn" dataSource={MOCK.certificates} pagination={false} columns={[
      { title: 'RCN', dataIndex: 'rcn', render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
      { title: 'Product', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div></div> },
      { title: 'Scheme', dataIndex: 'scheme', render: s => <SchemeBadge scheme={s} /> },
      { title: 'Cert Status', dataIndex: 'status', render: s => s === 'active' ? <antd.Tag color="green">Active</antd.Tag> : s === 'expiring' ? <antd.Tag color="orange">Expiring</antd.Tag> : <antd.Tag>Expired</antd.Tag> },
      { title: 'Compliance', render: (_, r) => {
        const stat = r.status === 'expired' ? 'Cancelled' : r.rcn.includes('0823') ? 'Under Surveillance' : 'Active';
        return <antd.Tag color={statusStyle[stat]}>{stat}</antd.Tag>;
      } },
      { title: '', render: (_, r) => isLead && (
        <antd.Button size="small" onClick={() => { setChangeOpen({ entity: r.rcn, type: 'Certificate' }); setNewStatus(''); setReason(''); }}>Change Status</antd.Button>
      ) },
    ]} />
  );

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC · CPPG Compliance</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Compliance Status Management</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Govern supplier and certificate compliance status · Immutable audit trail</antd.Typography.Text>
        </div>
      </div>

      <antd.Alert type="info" showIcon style={{ marginBottom: 20 }} icon={<LockOutlined />} message="Compliance status changes are immediately propagated system-wide and logged immutably." description="Suspending a supplier restricts new SDoC submissions. Cancelling a certificate removes it from the Public Search Portal instantly." />

      <antd.Card bordered style={{ marginBottom: 16 }}>
        <antd.Typography.Title level={5} style={{ marginTop: 0 }}>Status Change History</antd.Typography.Title>
        {MOCK.complianceHistory.map((h, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < MOCK.complianceHistory.length - 1 ? '1px solid var(--color-divider)' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', marginTop: 6, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}><b>{h.entity}</b> — <antd.Tag>{h.from}</antd.Tag> → <antd.Tag color={statusStyle[h.to] || 'default'}>{h.to}</antd.Tag></div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{h.reason}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{new Date(h.ts).toLocaleString('en-GB')} · {h.officer}</div>
            </div>
          </div>
        ))}
      </antd.Card>

      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <antd.Tabs activeKey={entityTab} onChange={setEntityTab} style={{ padding: '0 16px' }} items={[
          { key: 'suppliers',    label: 'Suppliers',    children: <div style={{ padding: '0 0 16px' }}><SupplierStatusTable /></div> },
          { key: 'certificates', label: 'Certificates', children: <div style={{ padding: '0 0 16px' }}><CertStatusTable /></div> },
        ]} />
      </antd.Card>

      <antd.Modal open={!!changeOpen} onCancel={() => setChangeOpen(null)} title={<antd.Space><SafetyOutlined />Change Compliance Status</antd.Space>} okText="Apply Change" okButtonProps={{ disabled: !newStatus || !reason, danger: ['Suspended', 'Cancelled'].includes(newStatus) }} onOk={() => { antd.message.success(`Status updated to ${newStatus} for ${changeOpen?.entity}`); setChangeOpen(null); }} width={480}>
        {changeOpen && (
          <antd.Form layout="vertical">
            <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }} message={`Changing compliance status for: ${changeOpen.entity} (${changeOpen.type})`} />
            <antd.Form.Item label="New Status" required>
              <antd.Radio.Group value={newStatus} onChange={e => setNewStatus(e.target.value)} style={{ display: 'grid', gap: 8 }}>
                {['Active', 'Under Surveillance', 'Suspended', 'Cancelled'].map(s => (
                  <antd.Radio key={s} value={s} style={{ padding: 10, border: `1px solid ${newStatus === s ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0 }}>
                    <antd.Tag color={statusStyle[s]} style={{ marginLeft: 4 }}>{s}</antd.Tag>
                    {s === 'Suspended' && <span style={{ fontSize: 11, color: 'var(--color-danger)', marginLeft: 4 }}>Blocks new submissions</span>}
                    {s === 'Cancelled' && <span style={{ fontSize: 11, color: 'var(--color-danger)', marginLeft: 4 }}>Removes from public registry</span>}
                  </antd.Radio>
                ))}
              </antd.Radio.Group>
            </antd.Form.Item>
            <antd.Form.Item label="Reason (required for audit trail)" required>
              <antd.Input.TextArea rows={3} placeholder="Provide a detailed justification for this status change…" value={reason} onChange={e => setReason(e.target.value)} />
            </antd.Form.Item>
          </antd.Form>
        )}
      </antd.Modal>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. PUBLIC PORTAL
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['public-portal'] = function PublicPortal({ nav }) {
  const [q, setQ] = React.useState('');
  const [searched, setSearched] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [faqOpen, setFaqOpen] = React.useState(null);

  function doSearch() {
    if (!q) return;
    const r = MOCK.certificates.filter(c => (c.product + c.rcn + c.brand + c.model).toLowerCase().includes(q.toLowerCase()));
    setResults(r);
    setSearched(true);
  }

  const faqs = [
    { q: 'What is the NCEF?', a: 'The New Communications Equipment Framework (NCEF) is MCMC\'s regulatory framework for communications equipment registration in Malaysia, replacing legacy SIRIM-managed systems.' },
    { q: 'Which equipment requires registration?', a: 'All communications equipment operating on licensed or unlicensed radio frequency bands in Malaysia — including smartphones, routers, IoT devices, and broadcasting equipment.' },
    { q: 'What are the registration schemes?', a: 'Scheme A (High Risk — SDoC with full Certification), Scheme B (Medium Risk — SDoC with Verification), Scheme C (Low Risk — expedited approval for qualifying submissions).' },
    { q: 'How long does registration take?', a: 'Scheme C qualifying submissions: same day. Scheme A/B with officer review: 3–5 working days. Special Approval (non-prohibited): 3–5 working days.' },
    { q: 'How do I renew my certificate?', a: 'Log in to the NCEF Portal and navigate to Certificates. Renewal must be initiated within 6 months of certificate expiry. Documents may be reused if less than 3 years old.' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', padding: '48px 40px', color: '#fff', borderRadius: '0 0 16px 16px', marginBottom: 32, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          <img src="assets/mcmc-logo.png" alt="MCMC" style={{ width: 48, height: 48, background: '#fff', borderRadius: 10, padding: 4 }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.1 }}>NCEF Public Registry</div>
            <div style={{ fontSize: 12, opacity: .85, letterSpacing: .4 }}>MCMC · Equipment Certification Search</div>
          </div>
        </div>
        <div style={{ fontSize: 16, opacity: .9, marginBottom: 28 }}>Verify equipment certification status, search registered devices, and access regulatory documents.</div>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 10 }}>
          <antd.Input size="large" placeholder="Search by brand, model, RCN, IMEI or serial number…" value={q} onChange={e => { setQ(e.target.value); setSearched(false); }} onPressEnter={doSearch} style={{ flex: 1, borderRadius: 8 }} prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} />
          <antd.Button type="primary" size="large" onClick={doSearch} style={{ background: '#fff', color: 'var(--color-primary)', border: 'none', fontWeight: 600 }}>Search</antd.Button>
        </div>
        {searched && <div style={{ marginTop: 12, fontSize: 13, opacity: .85 }}>{results.length} result{results.length !== 1 ? 's' : ''} found for "{q}"</div>}
      </div>

      <div style={{ padding: '0 32px 32px' }}>
        {/* Results */}
        {searched && (
          <antd.Card title={`Search Results (${results.length})`} bordered style={{ marginBottom: 24 }}>
            {results.length === 0
              ? <antd.Empty description="No registered equipment found matching your search. Equipment may not be registered with MCMC." />
              : <antd.Table rowKey="rcn" dataSource={results} pagination={false} columns={[
                  { title: 'RCN', dataIndex: 'rcn', render: v => <antd.Typography.Text code>{v}</antd.Typography.Text> },
                  { title: 'Product', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div></div> },
                  { title: 'Scheme', dataIndex: 'scheme', render: s => <SchemeBadge scheme={s} /> },
                  { title: 'Label', dataIndex: 'labelType', render: v => <antd.Tag>{v === 'e-label' ? 'e-Label' : 'Physical'}</antd.Tag> },
                  { title: 'Issued', dataIndex: 'issued', render: v => new Date(v).toLocaleDateString('en-GB') },
                  { title: 'Expires', dataIndex: 'expires', render: v => new Date(v).toLocaleDateString('en-GB') },
                  { title: 'Status', dataIndex: 'status', render: s => s === 'active' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Active</antd.Tag> : s === 'expiring' ? <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Expiring Soon</antd.Tag> : <antd.Tag icon={<CloseCircleOutlined />}>Expired</antd.Tag> },
                ]}
              />}
          </antd.Card>
        )}

        <antd.Row gutter={[24, 24]}>
          {/* Regulatory Docs */}
          <antd.Col xs={24} lg={12}>
            <antd.Card title={<antd.Space><FilePdfOutlined style={{ color: 'var(--color-danger)' }} />Regulatory Documents</antd.Space>} bordered>
              {[
                { t: 'NCEF Registration Guidelines v2.1',      d: 'Published 01 Mar 2026 · PDF · 4.2 MB' },
                { t: 'Fee Schedule & Payment Procedures',       d: 'Published 01 Jan 2026 · PDF · 0.8 MB' },
                { t: 'MCMC MTSFB TC G015:2022',                d: 'Technical standard · PDF · 12.4 MB' },
                { t: 'List of Recognised Test Laboratories',    d: 'Updated 15 Apr 2026 · PDF · 1.1 MB' },
                { t: 'Approved Certifying Agencies (CA) List', d: 'Updated 01 Apr 2026 · PDF · 0.5 MB' },
              ].map((doc, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--color-divider)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{doc.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{doc.d}</div>
                  </div>
                  <antd.Button size="small" icon={<DownloadOutlined />}>Download</antd.Button>
                </div>
              ))}
            </antd.Card>
          </antd.Col>

          {/* FAQ */}
          <antd.Col xs={24} lg={12}>
            <antd.Card title={<antd.Space><QuestionCircleOutlined />Frequently Asked Questions</antd.Space>} bordered>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--color-divider)' : 'none' }}>
                  <div onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ padding: '12px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 500, fontSize: 13 }}>
                    <span>{f.q}</span>
                    <span style={{ color: 'var(--color-text-muted)', transition: 'transform .2s', transform: faqOpen === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </div>
                  {faqOpen === i && <div style={{ padding: '0 0 12px', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{f.a}</div>}
                </div>
              ))}
            </antd.Card>
          </antd.Col>
        </antd.Row>

        {/* Contact */}
        <antd.Card bordered style={{ marginTop: 24, background: 'var(--color-primary-soft)', borderColor: 'var(--color-border)' }}>
          <antd.Row gutter={24} align="middle">
            <antd.Col xs={24} md={16}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Need help with registration?</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Contact the CPPG Helpdesk: <b>cppg@mcmc.gov.my</b> · +603-8688 8000 · Mon–Fri, 8:30am–5:30pm</div>
            </antd.Col>
            <antd.Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <antd.Button type="primary" onClick={() => nav('onboarding')} icon={<UserOutlined />}>Register as Supplier</antd.Button>
            </antd.Col>
          </antd.Row>
        </antd.Card>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. SA LETTER (Officer — Special Approval Letter Generation)
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['sa-letter'] = function SALetter({ nav, currentUser }) {
  const isApprover = currentUser?.role === 'approver';
  const isRecommender = currentUser?.role === 'recommender';
  const isVerifier = currentUser?.role === 'verifier';
  const [chain, setChain] = React.useState([
    { role: 'OIC (CPPG)', name: 'Pn. Rosnah Idris',            status: 'approved', ts: '2026-04-19T10:00:00', note: 'Documents complete. Recommend approval.' },
    { role: 'Recommender (P5/P6)', name: 'En. Ahmad Rashid Kamarudin', status: 'approved', ts: '2026-04-20T09:15:00', note: 'Justification adequate. Equipment for valid R&D purpose.' },
    { role: 'Verifier (P7)', name: 'Pn. Halimah Yusof',         status: 'pending',  ts: null, note: '' },
    { role: 'Approver (P8)', name: "Dato' Dr. Razif Ahmad Zaki", status: 'pending',  ts: null, note: '' },
  ]);
  const [published, setPublished] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [draftContent, setDraftContent] = React.useState('The Malaysian Communications and Multimedia Commission (MCMC) hereby grants Special Approval for the importation of ONE (1) unit Keysight N5182B MXG Signal Generator for Research & Development purposes at Axiata R&D Centre, Cyberjaya.\n\nThis approval is valid for a period of twelve (12) months from the date of issuance and is subject to the conditions stated herein. The equipment must not be used outside the declared location, purpose, or by any unauthorised third party.\n\nAny violation of the conditions specified herein may result in the revocation of this approval and legal proceedings under the Communications and Multimedia Act 1998 (CMA 1998).');

  const currentIdx = chain.findIndex(c => c.status === 'pending');
  const allApproved = chain.every(c => c.status === 'approved');

  function handleChainAction(action) {
    if (currentIdx < 0) return;
    setChain(prev => prev.map((c, i) => i === currentIdx ? { ...c, status: action, ts: new Date().toISOString() } : c));
    antd.message.success(action === 'approved' ? 'Step approved — forwarded to next approver.' : 'Application returned for revision.');
  }

  const chainColor = { approved: 'var(--color-success)', pending: 'var(--color-warning)', rejected: 'var(--color-danger)' };

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <antd.Breadcrumb items={[{ title: <a onClick={() => nav('officer-queue')}>Queue</a> }, { title: 'APP-SA-0426-00012' }, { title: 'SA Letter' }]} style={{ marginBottom: 8 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Special Approval · Prohibited Equipment (R&amp;D)</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>SA Letter — APP-SA-0426-00012</antd.Typography.Title>
        </div>
        <antd.Space>
          {allApproved && !published && <antd.Button type="primary" onClick={() => setPublished(true)} icon={<SendOutlined />}>Publish & Issue to Applicant</antd.Button>}
          {published && <antd.Tag color="green" icon={<CheckCircleOutlined />} style={{ fontSize: 13, padding: '4px 12px' }}>Published · Sent to applicant</antd.Tag>}
          <antd.Button icon={<DownloadOutlined />}>Download PDF</antd.Button>
        </antd.Space>
      </div>

      <antd.Row gutter={[20, 20]}>
        {/* Multi-level approval chain */}
        <antd.Col xs={24} lg={10}>
          <antd.Card title={<antd.Space><BranchesOutlined />Multi-Level Approval Chain</antd.Space>} bordered>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {chain.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < chain.length - 1 ? 0 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.status === 'approved' ? 'var(--color-success)' : c.status === 'rejected' ? 'var(--color-danger)' : i === currentIdx ? 'var(--color-warning)' : 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.status !== 'pending' || i === currentIdx ? '#fff' : 'var(--color-text-muted)', fontWeight: 700, fontSize: 13 }}>
                      {c.status === 'approved' ? '✓' : c.status === 'rejected' ? '✕' : i + 1}
                    </div>
                    {i < chain.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: c.status === 'approved' ? 'var(--color-success)' : 'var(--color-border)', margin: '4px 0' }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 20 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>{c.role}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{c.name}</div>
                    {c.status === 'approved' && <div style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 2 }}>✓ Approved · {new Date(c.ts).toLocaleDateString('en-GB')}</div>}
                    {c.note && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, fontStyle: 'italic' }}>"{c.note}"</div>}
                    {i === currentIdx && (
                      <div style={{ marginTop: 8 }}>
                        <antd.Input.TextArea rows={2} placeholder="Add your justification…" style={{ marginBottom: 8, fontSize: 12 }} />
                        <antd.Space size="small">
                          <antd.Button type="primary" size="small" onClick={() => handleChainAction('approved')}>Approve & Forward</antd.Button>
                          <antd.Button danger size="small" onClick={() => handleChainAction('rejected')}>Return</antd.Button>
                        </antd.Space>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </antd.Card>
        </antd.Col>

        {/* Letter preview */}
        <antd.Col xs={24} lg={14}>
          <antd.Card title="SA Letter Draft" bordered extra={<antd.Button size="small" icon={<EditOutlined />} onClick={() => setEditMode(!editMode)}>{editMode ? 'Done Editing' : 'Edit'}</antd.Button>}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 24, background: '#fafbfc', fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <img src="assets/mcmc-logo.png" alt="MCMC" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: .5, marginTop: 4 }}>SURUHANJAYA KOMUNIKASI DAN MULTIMEDIA MALAYSIA</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Malaysian Communications and Multimedia Commission</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 12 }}>
                  <div style={{ fontWeight: 600 }}>Ref: MCMC/NCEF/SA-0426-00012</div>
                  <div style={{ color: 'var(--color-text-muted)' }}>Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>SPECIAL APPROVAL LETTER</div>
                <div><b>Applicant:</b> Axiata Digital Sdn Bhd (201901023456)</div>
                <div><b>Ref Application:</b> APP-SA-0426-00012</div>
                <div><b>Certificate No.:</b> SA-0426-00012</div>
              </div>
              <antd.Divider style={{ margin: '16px 0' }} />
              {editMode
                ? <antd.Input.TextArea value={draftContent} onChange={e => setDraftContent(e.target.value)} rows={10} style={{ fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.8 }} />
                : <div style={{ whiteSpace: 'pre-wrap' }}>{draftContent}</div>}
              <antd.Divider style={{ margin: '16px 0' }} />
              <div style={{ fontSize: 12, marginTop: 16 }}>
                <div style={{ fontWeight: 700 }}>For and on behalf of</div>
                <div>MALAYSIAN COMMUNICATIONS AND MULTIMEDIA COMMISSION</div>
                <div style={{ marginTop: 12, color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: 8, width: 200 }}>Authorised Signature</div>
              </div>
            </div>
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

Object.assign(window, { SCREENS });
