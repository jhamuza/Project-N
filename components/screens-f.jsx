// screens-f.jsx — Modification of Registration §5.6 (full rebuild)
// Overrides SCREENS['modification'] from screens-d.jsx

// ─── Extended mock data ───────────────────────────────────────────────────────
Object.assign(window.MOCK, {
  modRequestsFull: [
    {
      id: 'MOD-0426-001', rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro', brand: 'Xiaomi', model: 'M2320B1', scheme: 'C',
      categories: ['Minor'], status: 'pending_officer', submitted: '2026-04-17T10:22:00',
      description: 'Change enclosure colour from Space Black to Midnight Blue. No hardware, firmware, or RF changes.',
      docs: [{ name: 'Revised_Colour_Spec.pdf', size: '1.2 MB' }, { name: 'Updated_Product_Photo.jpg', size: '0.4 MB' }],
      assignedTo: 'OFF-002', officerNote: null, version: 2,
    },
    {
      id: 'MOD-0426-002', rcn: 'RCN-0326-00442', product: 'OPPO Find X7 Ultra', brand: 'OPPO', model: 'CPH2583', scheme: 'A',
      categories: ['Others'], status: 'approved', submitted: '2026-03-30T09:00:00',
      description: 'Update designated PIC from Nurul Aisyah to Lee Wei Ming. Administrative contact change only.',
      docs: [{ name: 'PIC_Change_Letter.pdf', size: '0.6 MB' }],
      assignedTo: 'OFF-001', officerNote: 'Administrative change verified. PIC updated in registry.', version: 3,
    },
    {
      id: 'MOD-0426-003', rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro', brand: 'Xiaomi', model: 'M2320B1', scheme: 'C',
      categories: ['Minor', 'Others'], status: 'not_accepted', submitted: '2026-03-10T14:30:00',
      description: 'Add new variant — Mi Band 9 Pro (Gold edition). Also update distributor contact.',
      docs: [{ name: 'Gold_Variant_Spec.pdf', size: '2.1 MB' }],
      assignedTo: 'OFF-001', officerNote: 'New variant constitutes a separate equipment model. Please file a new SDoC registration for the Gold edition.', version: null,
    },
  ],
  certVersionHistory: {
    'RCN-0326-00449': [
      { version: 1, date: '2026-04-10', action: 'Initial Registration', by: 'Nurul Aisyah binti Ahmad',    note: 'Scheme C — AI auto-accepted (score 94)' },
      { version: 2, date: '2026-04-17', action: 'Modification Request', by: 'Nurul Aisyah binti Ahmad',    note: 'Minor: colour change to Midnight Blue — pending officer' },
    ],
    'RCN-0326-00442': [
      { version: 1, date: '2026-04-05', action: 'Initial Registration', by: 'Kamarul Ariffin bin Osman',  note: 'Scheme A — approved by En. Faisal Rahman' },
      { version: 2, date: '2026-03-02', action: 'Modification — Minor', by: 'Nurul Aisyah binti Ahmad',   note: 'Label correction — approved' },
      { version: 3, date: '2026-03-30', action: 'Modification — Others', by: 'Nurul Aisyah binti Ahmad',  note: 'PIC update — approved' },
    ],
  },
});

const {
  SearchOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  WarningOutlined, InfoCircleOutlined, DownloadOutlined, UploadOutlined, EditOutlined,
  EyeOutlined, HistoryOutlined, FileTextOutlined, FilePdfOutlined, ArrowRightOutlined,
  SafetyCertificateOutlined, ExclamationCircleOutlined
} = window.icons;
const FormOutlined_f = window.icons.FormOutlined || window.icons.EditOutlined;

// ─────────────────────────────────────────────────────────────────────────────
// STATUS HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const MOD_STATUS = {
  draft:           { label: 'Draft',            color: 'default' },
  pending_officer: { label: 'Pending Review',   color: 'orange'  },
  approved:        { label: 'Approved',         color: 'green'   },
  not_accepted:    { label: 'Not Accepted',     color: 'red'     },
  iteration:       { label: 'Iteration Req.',   color: 'gold'    },
};
const CAT_META = {
  Major:  { color: 'var(--color-danger)',  bg: 'var(--color-danger-bg)',  label: 'Major',  desc: 'Affects conformity (RF, hardware, firmware) — requires new registration' },
  Minor:  { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', label: 'Minor',  desc: 'Cosmetic / non-conformity changes (colour, enclosure material, packaging)' },
  Others: { color: 'var(--color-info)',    bg: 'var(--color-info-bg)',    label: 'Admin',  desc: 'Administrative changes (PIC, address, billing contact, label text correction)' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUPPLIER VIEW — list + wizard
// ─────────────────────────────────────────────────────────────────────────────
function ModSupplierView({ nav }) {
  const [view, setView]         = React.useState('list');   // 'list' | 'wizard'
  const [selected, setSelected] = React.useState(null);
  const [step, setStep]         = React.useState(0);
  const [rcn, setRcn]           = React.useState('');
  const [resolvedCert, setResolvedCert] = React.useState(null);
  const [cats, setCats]         = React.useState([]);
  const [description, setDesc]  = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [q, setQ]               = React.useState('');

  const reqs = MOCK.modRequestsFull;
  const filtered = reqs.filter(r => !q || (r.id + r.rcn + r.product + r.categories.join('')).toLowerCase().includes(q.toLowerCase()));

  const STEPS = ['Find Certificate', 'Modification Type', 'Details & Documents', 'Review & Submit'];

  function resolveCert(val) {
    const v = val || rcn;
    const found = MOCK.certificates.find(c => c.rcn.toLowerCase() === v.toLowerCase());
    if (found) { setResolvedCert(found); setStep(1); }
    else antd.message.error('RCN not found or not linked to your account.');
  }

  function reset() { setView('list'); setStep(0); setRcn(''); setResolvedCert(null); setCats([]); setDesc(''); setSubmitted(false); }

  if (submitted) return (
    <div style={{ padding: 60, textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px' }}>✓</div>
      <antd.Typography.Title level={3}>Modification Request Submitted</antd.Typography.Title>
      <antd.Typography.Text type="secondary">
        {cats.includes('Major') ? 'You have been redirected to start a new SDoC registration.' : 'Assigned to a CPPG officer. You will be notified of the decision within 3–5 working days.'}
      </antd.Typography.Text>
      <div style={{ margin: '24px 0', padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block' }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Reference</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>MOD-0426-004</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Version {(MOCK.certVersionHistory[resolvedCert?.rcn]?.length || 1) + 1} will be created upon approval</div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <antd.Button onClick={reset}>New Request</antd.Button>
        <antd.Button type="primary" onClick={() => nav('applications')}>My Applications</antd.Button>
      </div>
    </div>
  );

  if (view === 'wizard') return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <antd.Breadcrumb items={[{ title: <a onClick={reset}>Modification Requests</a> }, { title: 'New Request' }]} style={{ marginBottom: 12 }} />
      <antd.Typography.Title level={3} style={{ margin: '0 0 20px' }}>New Modification Request</antd.Typography.Title>

      {/* Pill progress */}
      <antd.Card bordered style={{ marginBottom: 16 }}>
        <div className="wizard-pill-bar">
          {STEPS.map((s, i) => (
            <div key={s} className={`pill ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
              onClick={() => i < step && setStep(i)} style={{ cursor: i < step ? 'pointer' : 'default' }}>
              {i < step ? `✓ ${s}` : `${i + 1}. ${s}`}
            </div>
          ))}
        </div>
      </antd.Card>

      <antd.Card bordered>
        {/* STEP 0 — Find Certificate */}
        {step === 0 && (
          <div style={{ maxWidth: 560 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Find Certificate</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Enter the RCN of the equipment you want to modify, or pick from your active certificates.</antd.Typography.Text>
            <antd.Form layout="vertical" style={{ marginTop: 20 }}>
              <antd.Form.Item label="Registered Compliance Number (RCN)" required>
                <antd.Input size="large" placeholder="e.g. RCN-0326-00449" value={rcn} onChange={e => setRcn(e.target.value)} onPressEnter={() => resolveCert()} prefix={<SafetyCertificateOutlined style={{ color: 'var(--color-text-muted)' }} />} />
              </antd.Form.Item>
            </antd.Form>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Or pick from your active certificates:</div>
            <antd.Select style={{ width: '100%', marginBottom: 20 }} placeholder="Select certificate…"
              onChange={v => { setRcn(v); resolveCert(v); }}
              options={MOCK.certificates.filter(c => c.status !== 'expired').map(c => ({ value: c.rcn, label: `${c.rcn} — ${c.product} (${c.status})` }))}
            />
            <antd.Button type="primary" onClick={() => resolveCert()} disabled={!rcn}>Continue →</antd.Button>
          </div>
        )}

        {/* STEP 1 — Category */}
        {step === 1 && resolvedCert && (
          <div>
            <antd.Alert showIcon type="success" style={{ marginBottom: 20 }}
              message={`Certificate found: ${resolvedCert.product}`}
              description={
                <antd.Space wrap>
                  <antd.Typography.Text code>{resolvedCert.rcn}</antd.Typography.Text>
                  <span>Scheme {resolvedCert.scheme}</span>
                  <span>· Issued {new Date(resolvedCert.issued).toLocaleDateString('en-GB')}</span>
                </antd.Space>
              }
            />

            {/* Version history */}
            {MOCK.certVersionHistory[resolvedCert.rcn] && (
              <antd.Card size="small" bordered style={{ marginBottom: 20, background: 'var(--color-bg-subtle)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>Version History</div>
                <antd.Timeline items={MOCK.certVersionHistory[resolvedCert.rcn].map(v => ({
                  dot: <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.version}</div>,
                  children: <div style={{ fontSize: 12 }}>
                    <div style={{ fontWeight: 600 }}>v{v.version} — {v.action}</div>
                    <div style={{ color: 'var(--color-text-muted)' }}>{v.date} · {v.by}</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: 2 }}>{v.note}</div>
                  </div>,
                }))} />
              </antd.Card>
            )}

            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Select Modification Type</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Multi-select allowed. Major changes require a new SDoC registration.</antd.Typography.Text>
            <antd.Checkbox.Group value={cats} onChange={setCats} style={{ display: 'grid', gap: 12, marginTop: 16, width: '100%' }}>
              {Object.entries(CAT_META).map(([key, meta]) => (
                <antd.Checkbox key={key} value={key} style={{ padding: 14, border: `1.5px solid ${cats.includes(key) ? meta.color : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: cats.includes(key) ? meta.bg : '#fff' }}>
                  <div style={{ marginLeft: 8 }}>
                    <div style={{ fontWeight: 600, color: meta.color }}>{meta.label} Modification</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{meta.desc}</div>
                  </div>
                </antd.Checkbox>
              ))}
            </antd.Checkbox.Group>

            {cats.includes('Major') && (
              <antd.Alert type="error" showIcon icon={<ExclamationCircleOutlined />} style={{ marginTop: 16 }}
                message="Major modification detected — new registration required"
                description="Changes affecting radio frequency, hardware components, firmware, or equipment conformity must be filed as a new SDoC registration. Your existing certificate remains valid during review."
              />
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <antd.Button onClick={() => setStep(0)}>← Back</antd.Button>
              {cats.includes('Major')
                ? <antd.Button type="primary" danger onClick={() => nav('sdoc-wizard')} icon={<ArrowRightOutlined />}>Start New SDoC Registration</antd.Button>
                : <antd.Button type="primary" onClick={() => setStep(2)} disabled={cats.length === 0 || (cats.length === 1 && cats[0] === 'Major')}>Continue →</antd.Button>}
            </div>
          </div>
        )}

        {/* STEP 2 — Details */}
        {step === 2 && (
          <div style={{ maxWidth: 700 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Describe Changes & Upload Evidence</antd.Typography.Title>
            <antd.Form layout="vertical">
              <antd.Form.Item label="Description of Modification" required extra="Be specific. Explain exactly what is changing and confirm it does not affect RF performance or equipment conformity.">
                <antd.Input.TextArea rows={4} value={description} onChange={e => setDesc(e.target.value)} placeholder="e.g. The enclosure material is changing from ABS plastic (black) to polycarbonate (navy blue). No changes to PCB, antenna, firmware, or RF output…" />
              </antd.Form.Item>

              {cats.includes('Others') && (
                <antd.Card size="small" bordered style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 12 }}>Updated Contact / PIC Details</div>
                  <antd.Row gutter={12}>
                    <antd.Col span={12}><antd.Form.Item label="New PIC Name"><antd.Input placeholder="Lee Wei Ming" /></antd.Form.Item></antd.Col>
                    <antd.Col span={12}><antd.Form.Item label="New PIC Email"><antd.Input placeholder="lee.wm@company.com.my" /></antd.Form.Item></antd.Col>
                    <antd.Col span={12}><antd.Form.Item label="New PIC Phone"><antd.Input placeholder="+60 12-345 6789" /></antd.Form.Item></antd.Col>
                    <antd.Col span={12}><antd.Form.Item label="Designation"><antd.Input placeholder="Head of Compliance" /></antd.Form.Item></antd.Col>
                  </antd.Row>
                </antd.Card>
              )}

              <antd.Form.Item label="Supporting Documents">
                <antd.Upload.Dragger multiple style={{ borderRadius: 8 }}>
                  <p style={{ fontSize: 28, margin: 0 }}>📎</p>
                  <p style={{ fontWeight: 600 }}>Upload supporting evidence</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Revised spec sheets, product photos, label artwork, authorisation letters · PDF / PNG / JPEG</p>
                </antd.Upload.Dragger>
              </antd.Form.Item>
            </antd.Form>
            <div style={{ display: 'flex', gap: 10 }}>
              <antd.Button onClick={() => setStep(1)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setStep(3)} disabled={!description}>Review →</antd.Button>
            </div>
          </div>
        )}

        {/* STEP 3 — Review */}
        {step === 3 && resolvedCert && (
          <div style={{ maxWidth: 660 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Review & Submit</antd.Typography.Title>
            <antd.Descriptions bordered column={1} size="small" style={{ marginBottom: 16 }}>
              <antd.Descriptions.Item label="Certificate">
                <antd.Typography.Text code>{resolvedCert.rcn}</antd.Typography.Text> — {resolvedCert.product}
              </antd.Descriptions.Item>
              <antd.Descriptions.Item label="Current Version">
                v{MOCK.certVersionHistory[resolvedCert.rcn]?.length || 1}
              </antd.Descriptions.Item>
              <antd.Descriptions.Item label="Modification Types">
                {cats.map(c => <antd.Tag key={c} color={c === 'Major' ? 'red' : c === 'Minor' ? 'orange' : 'blue'} style={{ marginRight: 4 }}>{c}</antd.Tag>)}
              </antd.Descriptions.Item>
              <antd.Descriptions.Item label="Description">{description}</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Routing">
                CPPG Officer review → Accept or Not Accept · Version {(MOCK.certVersionHistory[resolvedCert.rcn]?.length || 1) + 1} created upon acceptance
              </antd.Descriptions.Item>
            </antd.Descriptions>
            <antd.Alert type="info" showIcon style={{ marginBottom: 16 }}
              message="Declaration"
              description="By submitting, you confirm the modification does not affect the equipment's fundamental conformity with MCMC technical standards, and all information provided is accurate."
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <antd.Button onClick={() => setStep(2)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setSubmitted(true)}>Submit Modification Request</antd.Button>
            </div>
          </div>
        )}
      </antd.Card>
    </div>
  );

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Supplier · Certificates</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Modification Requests</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Manage changes to your registered equipment · Minor, Admin and Major categories</antd.Typography.Text>
        </div>
        <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => { reset(); setView('wizard'); }}>New Modification Request</antd.Button>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Total Requests',   v: reqs.length },
          { l: 'Pending Review',   v: reqs.filter(r => r.status === 'pending_officer').length, warn: true },
          { l: 'Approved',         v: reqs.filter(r => r.status === 'approved').length,        color: 'var(--color-success)' },
          { l: 'Not Accepted',     v: reqs.filter(r => r.status === 'not_accepted').length,    color: 'var(--color-danger)' },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? 'var(--color-warning)' : k.color || 'inherit' }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered>
        <antd.Input placeholder="Search by ID, RCN, product…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} value={q} onChange={e => setQ(e.target.value)} style={{ maxWidth: 320, marginBottom: 16 }} />
        <antd.Table rowKey="id" dataSource={filtered} pagination={false} onRow={r => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })}
          columns={[
            { title: 'Ref', dataIndex: 'id', render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
            { title: 'Certificate', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><antd.Typography.Text code style={{ fontSize: 11 }}>{r.rcn}</antd.Typography.Text></div> },
            { title: 'Type', dataIndex: 'categories', render: cats => cats.map(c => <antd.Tag key={c} color={c === 'Major' ? 'red' : c === 'Minor' ? 'orange' : 'blue'} style={{ marginRight: 4 }}>{c}</antd.Tag>) },
            { title: 'Submitted', dataIndex: 'submitted', render: v => new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
            { title: 'Status', dataIndex: 'status', render: s => { const m = MOD_STATUS[s] || { label: s, color: 'default' }; return <antd.Tag color={m.color}>{m.label}</antd.Tag>; } },
            { title: 'Version', dataIndex: 'version', align: 'center', render: v => v ? <antd.Tag color="blue">v{v}</antd.Tag> : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
            { title: '', render: () => <EyeOutlined style={{ color: 'var(--color-primary)' }} /> },
          ]}
        />
      </antd.Card>

      <antd.Drawer open={!!selected} onClose={() => setSelected(null)} width={540} title={selected ? `${selected.id} — ${selected.product}` : ''}>
        {selected && (
          <div>
            <antd.Descriptions column={1} size="small" bordered items={[
              { key: 'rcn',   label: 'Certificate',     children: <span><antd.Typography.Text code>{selected.rcn}</antd.Typography.Text> — {selected.product}</span> },
              { key: 'cats',  label: 'Type',            children: selected.categories.map(c => <antd.Tag key={c} color={c === 'Major' ? 'red' : c === 'Minor' ? 'orange' : 'blue'} style={{ marginRight: 4 }}>{c}</antd.Tag>) },
              { key: 'sub',   label: 'Submitted',       children: new Date(selected.submitted).toLocaleString('en-GB') },
              { key: 'stat',  label: 'Status',          children: <antd.Tag color={MOD_STATUS[selected.status]?.color}>{MOD_STATUS[selected.status]?.label}</antd.Tag> },
              { key: 'ver',   label: 'Result Version',  children: selected.version ? `v${selected.version} created` : 'Not yet applied' },
              { key: 'off',   label: 'Assigned Officer', children: selected.assignedTo || '—' },
            ]} />
            <antd.Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Description</antd.Divider>
            <div style={{ fontSize: 13, lineHeight: 1.6, background: 'var(--color-bg-subtle)', padding: 12, borderRadius: 8 }}>{selected.description}</div>
            {selected.officerNote && (
              <>
                <antd.Divider orientation="left" orientationMargin={0}>Officer Note</antd.Divider>
                <antd.Alert type={selected.status === 'approved' ? 'success' : 'error'} showIcon message={selected.officerNote} />
              </>
            )}
            {selected.docs?.length > 0 && (
              <>
                <antd.Divider orientation="left" orientationMargin={0}>Documents Submitted</antd.Divider>
                {selected.docs.map((d, i) => (
                  <div key={i} className="doc-tile" style={{ marginBottom: 8 }}>
                    <div className="icon"><FilePdfOutlined /></div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{d.size}</div></div>
                    <antd.Button size="small" icon={<DownloadOutlined />} />
                  </div>
                ))}
              </>
            )}
            {/* Version history */}
            {MOCK.certVersionHistory[selected.rcn] && (
              <>
                <antd.Divider orientation="left" orientationMargin={0}>Certificate Version History</antd.Divider>
                <antd.Timeline items={MOCK.certVersionHistory[selected.rcn].map(v => ({
                  dot: <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.version}</div>,
                  children: <div style={{ fontSize: 12 }}>
                    <div style={{ fontWeight: 600 }}>v{v.version} — {v.action}</div>
                    <div style={{ color: 'var(--color-text-muted)' }}>{v.date} · {v.by}</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>{v.note}</div>
                  </div>,
                }))} />
              </>
            )}
          </div>
        )}
      </antd.Drawer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OFFICER VIEW — modification review queue
// ─────────────────────────────────────────────────────────────────────────────
function ModOfficerView({ nav, currentUser }) {
  const [selected, setSelected] = React.useState(null);
  const [decision, setDecision] = React.useState(null);
  const [note, setNote]         = React.useState('');
  const [decided, setDecided]   = React.useState({});

  const pending = MOCK.modRequestsFull.filter(r => r.status === 'pending_officer');

  function decide(req, action) {
    setDecided(prev => ({ ...prev, [req.id]: action }));
    antd.message.success(action === 'accept'
      ? `Modification ${req.id} accepted — v${(MOCK.certVersionHistory[req.rcn]?.length || 1) + 1} created for ${req.rcn}`
      : `Modification ${req.id} not accepted. Applicant notified.`);
    setSelected(null);
    setDecision(null);
    setNote('');
  }

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC Officer · CPPG</div>
        <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Modification Review Queue</antd.Typography.Title>
        <antd.Typography.Text type="secondary">Review Minor and Administrative modification requests · Accept or Not Accept</antd.Typography.Text>
      </div>
      <antd.Alert type="info" showIcon style={{ marginBottom: 20 }}
        message="Scope of officer review"
        description="Only Minor and Administrative (Others) modifications require officer review. Major modifications are automatically redirected to a new SDoC registration — no officer action needed."
      />
      <antd.Row gutter={16}>
        <antd.Col xs={24} lg={selected ? 12 : 24}>
          <antd.Card bordered title={`Pending Review (${pending.length})`}>
            {pending.length === 0
              ? <antd.Empty description="No modification requests pending review." />
              : pending.map(r => {
                  const isDecided = decided[r.id];
                  return (
                    <div key={r.id} onClick={() => !isDecided && setSelected(r)}
                      style={{ padding: 14, border: `1.5px solid ${selected?.id === r.id ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 10, cursor: isDecided ? 'default' : 'pointer', marginBottom: 10, background: isDecided ? 'var(--color-bg-subtle)' : selected?.id === r.id ? 'var(--color-primary-soft)' : '#fff', opacity: isDecided ? 0.6 : 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                            <antd.Typography.Text code style={{ fontSize: 11 }}>{r.id}</antd.Typography.Text>
                            {r.categories.map(c => <antd.Tag key={c} color={c === 'Minor' ? 'orange' : 'blue'} style={{ margin: 0 }}>{c}</antd.Tag>)}
                            {isDecided && <antd.Tag color={isDecided === 'accept' ? 'green' : 'red'}>{isDecided === 'accept' ? 'Accepted this session' : 'Not accepted this session'}</antd.Tag>}
                          </div>
                          <div style={{ fontWeight: 600 }}>{r.product}</div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                            <antd.Typography.Text code style={{ fontSize: 11 }}>{r.rcn}</antd.Typography.Text> · Submitted {new Date(r.submitted).toLocaleDateString('en-GB')}
                          </div>
                        </div>
                        {!isDecided && <antd.Tag color="orange">Pending</antd.Tag>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 8, lineHeight: 1.5 }}>{r.description}</div>
                    </div>
                  );
                })
            }
          </antd.Card>
        </antd.Col>

        {selected && (
          <antd.Col xs={24} lg={12}>
            <antd.Card bordered title={`Review — ${selected.id}`} extra={<antd.Button type="text" size="small" onClick={() => { setSelected(null); setDecision(null); setNote(''); }}>✕</antd.Button>}>
              <antd.Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }} items={[
                { key: 'cert',  label: 'Certificate',  children: <span><antd.Typography.Text code>{selected.rcn}</antd.Typography.Text> — {selected.product}</span> },
                { key: 'cat',   label: 'Type',         children: selected.categories.map(c => <antd.Tag key={c} color={c === 'Minor' ? 'orange' : 'blue'}>{c}</antd.Tag>) },
                { key: 'sub',   label: 'Submitted',    children: new Date(selected.submitted).toLocaleString('en-GB') },
                { key: 'ver',   label: 'Creates',      children: `v${(MOCK.certVersionHistory[selected.rcn]?.length || 1) + 1} upon acceptance` },
              ]} />
              <div style={{ fontSize: 13, lineHeight: 1.6, background: 'var(--color-bg-subtle)', padding: 12, borderRadius: 8, marginBottom: 16 }}>{selected.description}</div>
              {selected.docs?.map((d, i) => (
                <div key={i} className="doc-tile" style={{ marginBottom: 8 }}>
                  <div className="icon"><FilePdfOutlined /></div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12 }}>{d.name}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{d.size}</div></div>
                  <antd.Button size="small" icon={<DownloadOutlined />} />
                </div>
              ))}
              <antd.Divider orientation="left" orientationMargin={0}>Officer Decision</antd.Divider>
              <antd.Radio.Group value={decision} onChange={e => setDecision(e.target.value)} style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                <antd.Radio value="accept" style={{ padding: 10, border: `1px solid ${decision === 'accept' ? 'var(--color-success)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: decision === 'accept' ? 'var(--color-success-bg)' : '#fff' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Accept</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginLeft: 8 }}>Creates new version of certificate with modifications applied</span>
                </antd.Radio>
                <antd.Radio value="not_accept" style={{ padding: 10, border: `1px solid ${decision === 'not_accept' ? 'var(--color-danger)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: decision === 'not_accept' ? 'var(--color-danger-bg)' : '#fff' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>Not Accept</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginLeft: 8 }}>Rejects modification; applicant notified with reason</span>
                </antd.Radio>
              </antd.Radio.Group>
              <antd.Form.Item label="Officer Note (required)" required>
                <antd.Input.TextArea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Provide justification for your decision…" />
              </antd.Form.Item>
              <antd.Button type="primary" disabled={!decision || !note} danger={decision === 'not_accept'}
                onClick={() => decide(selected, decision)}>
                {decision === 'accept' ? 'Accept Modification' : decision === 'not_accept' ? 'Not Accept' : 'Confirm Decision'}
              </antd.Button>
            </antd.Card>
          </antd.Col>
        )}
      </antd.Row>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT — role-aware
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['modification'] = function Modification({ nav, currentUser }) {
  const isOfficer = ['team-lead', 'officer', 'recommender', 'verifier', 'approver'].includes(currentUser?.role);
  return isOfficer ? <ModOfficerView nav={nav} currentUser={currentUser} /> : <ModSupplierView nav={nav} />;
};

Object.assign(window, { SCREENS });
