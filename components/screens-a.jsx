// Screens: Dashboard, Applications list, Onboarding, SDoC Wizard, Special Approval, Officer Review
const SCREENS = {};

// ============ LOGIN ============
// Pre-auth screen. Rendered by App when loggedIn === false.
// Accepts onLogin(role) — parent flips loggedIn=true and navigates to role's default landing.
SCREENS.login = function LoginScreen({ onLogin }) {
  const profiles = MOCK.profiles;
  const [selected, setSelected] = React.useState('supplier');
  const p = profiles[selected];
  const [email, setEmail] = React.useState(p.email);
  const [password, setPassword] = React.useState('••••••••');
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(null);
  const [forgotMode, setForgotMode] = React.useState(false);
  const [wrongAttempts, setWrongAttempts] = React.useState(0);

  React.useEffect(() => {
    setEmail(profiles[selected].email);
    setPassword('••••••••');
    setLoginError(null);
  }, [selected]);

  const submit = () => {
    // Mock: treat empty / short password as wrong credentials
    if (password.length < 6 || (password !== '••••••••' && !password.startsWith('•'))) {
      const attempts = wrongAttempts + 1;
      setWrongAttempts(attempts);
      if (attempts >= 3) {
        setLoginError('account_locked');
      } else {
        setLoginError('wrong_credentials');
      }
      return;
    }
    setLoginError(null);
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(selected); }, 700);
  };

  const roleAccent = {
    supplier: 'var(--color-primary)',
    'team-lead': '#7B3FA0',
    officer: 'var(--color-accent, #0F6ABF)',
  };

  // ── Inline Forgot Password flow ──────────────────────────────────────────
  if (forgotMode) {
    const ForgotPw = window.SCREENS?.['forgot-password'];
    if (ForgotPw) return <ForgotPw onBack={() => setForgotMode(false)} nav={() => {}} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F5F8FB 0%, #E7EEF6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 960, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 24 }}>
        {/* Left: Branding panel */}
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--color-primary)', color: '#fff', borderRadius: 16, minHeight: 540 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <img src="assets/mcmc-logo.png" alt="MCMC" style={{ width: 48, height: 48, background: '#fff', borderRadius: 8, padding: 4 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.1 }}>NCEF</div>
                <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 0.4 }}>MCMC · CERTIFICATION PORTAL</div>
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.3, marginBottom: 16 }}>
              Selamat datang ke Portal NCEF
            </div>
            <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.6 }}>
              Malaysia's unified certification platform for communications and multimedia equipment.
              Submit declarations, track approvals, and manage certificates — all in one place.
            </div>
          </div>
          <div style={{ fontSize: 11, opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16 }}>
            © 2026 Malaysian Communications and Multimedia Commission · Suruhanjaya Komunikasi dan Multimedia Malaysia
          </div>
        </div>

        {/* Right: Form */}
        <antd.Card bordered={false} style={{ boxShadow: 'var(--elevation-2, 0 8px 24px rgba(11,79,145,0.08))', borderRadius: 16, minHeight: 540 }} bodyStyle={{ padding: 40 }}>
          <div style={{ marginBottom: 24 }}>
            <antd.Typography.Title level={3} style={{ margin: 0 }}>Sign in</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Use your MCMC credentials or supplier account</antd.Typography.Text>
          </div>

          <antd.Form layout="vertical" onFinish={submit}>
            <antd.Form.Item label="Email" required>
              <antd.Input size="large" prefix={<MailOutlined />} value={email} onChange={e => setEmail(e.target.value)} />
            </antd.Form.Item>
            <antd.Form.Item label="Password" required>
              <antd.Input.Password size="large" prefix={<LockOutlined />} value={password} onChange={e => setPassword(e.target.value)} />
            </antd.Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <antd.Checkbox defaultChecked>Remember me</antd.Checkbox>
              <antd.Typography.Link onClick={() => setForgotMode(true)}>Forgot password?</antd.Typography.Link>
            </div>
            {loginError === 'wrong_credentials' && (
              <antd.Alert
                type="error"
                showIcon
                message="Invalid credentials"
                description={`Incorrect email or password. ${3 - wrongAttempts} attempt(s) remaining before account lock.`}
                style={{ marginBottom: 16 }}
                closable
                onClose={() => setLoginError(null)}
              />
            )}
            {loginError === 'account_locked' && (
              <antd.Alert
                type="error"
                showIcon
                icon={<LockOutlined />}
                message="Account temporarily locked"
                description="Too many failed attempts. Please reset your password or contact MCMC IT Support at itsupport@mcmc.gov.my."
                style={{ marginBottom: 16 }}
              />
            )}
            <antd.Button type="primary" size="large" htmlType="submit" block loading={loading} disabled={loginError === 'account_locked'}>Sign in</antd.Button>
          </antd.Form>

          <antd.Divider style={{ margin: '24px 0 16px', fontSize: 11, color: 'var(--color-text-muted)' }}>DEMO ACCOUNTS</antd.Divider>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['supplier', 'team-lead', 'officer'].map(key => {
              const prof = profiles[key];
              const isActive = selected === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelected(key)}
                  style={{
                    padding: 10,
                    border: `1.5px solid ${isActive ? roleAccent[key] : 'var(--color-border, #E5E7EB)'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                    background: isActive ? 'rgba(11,79,145,0.04)' : '#fff',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <antd.Avatar size={32} style={{ background: roleAccent[key], marginBottom: 6, fontSize: 12, fontWeight: 600 }}>{prof.initials}</antd.Avatar>
                  <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{prof.name.split(' ').slice(-1)[0] || prof.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 2 }}>{prof.title}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 12, textAlign: 'center' }}>
            Click a card to prefill demo credentials
          </div>
        </antd.Card>
      </div>
    </div>
  );
};


// ============ DASHBOARD ============
SCREENS.dashboard = function Dashboard({ nav, tweaks }) {
  const k = MOCK.kpi.supplier;
  const recent = MOCK.assessments.slice(0, 5);
  const kpis = [
    { label: 'Total Applications', value: k.totalApps, delta: '+3 this month', icon: '📋', to: 'applications' },
    { label: 'Approved Certificates', value: k.approved, delta: '2 renewing in 30d', icon: '✓', to: 'applications' },
    { label: 'Pending Action', value: k.pending, delta: '1 needs iteration', icon: '⚠', to: 'applications', warn: true },
    { label: 'Expiring Soon', value: k.expiringSoon, delta: 'Within 90 days', icon: '⏰', to: 'applications' },
  ];
  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Supplier Dashboard · {MOCK.currentUser.supplierId}</div>
        <Title level={2} style={{ margin: '4px 0 0', fontWeight: 600 }}>Selamat datang, {MOCK.currentUser.name.split(' ')[0]}</Title>
        <Text type="secondary">Axiata Digital Sdn Bhd · Active supplier since Jan 2024</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {kpis.map((kpi, i) => (
          <Col xs={12} md={6} key={i}>
            <div className="kpi-card" onClick={() => nav(kpi.to)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="kpi-label">{kpi.label}</div>
                  <div className="kpi-value" style={kpi.warn ? { color: 'var(--color-warning)' } : {}}>{kpi.value}</div>
                  <div className="kpi-delta">{kpi.delta}</div>
                </div>
                <div style={{ fontSize: 20, opacity: .5 }}>{kpi.icon}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Applications" extra={<Button type="link" onClick={() => nav('applications')}>View all →</Button>} bordered>
            <List
              dataSource={recent}
              renderItem={(a) => (
                <List.Item
                  actions={[<StatusPill status={a.status} />, <Button type="link" size="small" onClick={() => nav('officer-review')}>Open</Button>]}
                  style={{ padding: '12px 0' }}
                >
                  <List.Item.Meta
                    title={<Space><SchemeBadge scheme={a.scheme} /><Text strong>{a.product}</Text></Space>}
                    description={<Text type="secondary" style={{ fontSize: 12 }}>{a.id} · {a.brand} {a.model} · Updated {dayjs(a.updated).fromNow?.() || '2 days ago'}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions" bordered style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              <Button block type="primary" size="large" onClick={() => nav('sdoc-wizard')}>+ New SDoC Application</Button>
              <Button block size="large" onClick={() => nav('special-approval')}>+ Special Approval</Button>
              <Button block size="large" onClick={() => nav('imei-register')}>+ Register IMEI / SN</Button>
              <Button block size="large" onClick={() => nav('cert-renewal')}>+ Certificate Renewal</Button>
            </Space>
          </Card>
          <Card title="Notifications" bordered>
            <List
              size="small"
              dataSource={[
                { t: 'Application APP-0426-00083 requires iteration', d: '2 days ago', kind: 'warning' },
                { t: 'Certificate RCN-0326-00430 expires in 45 days', d: '3 days ago', kind: 'info' },
                { t: 'Payment received for APP-0426-00085', d: '1 week ago', kind: 'success' },
              ]}
              renderItem={(n) => (
                <List.Item style={{ padding: '8px 0' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', marginTop: 8, background: n.kind === 'warning' ? 'var(--color-warning)' : n.kind === 'success' ? 'var(--color-success)' : 'var(--color-info)' }} />
                    <div>
                      <div style={{ fontSize: 13 }}>{n.t}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{n.d}</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// ============ APPLICATIONS LIST ============
SCREENS.applications = function Applications({ nav }) {
  const [filter, setFilter] = React.useState('all');
  const all = MOCK.assessments;
  const filtered = filter === 'all' ? all : all.filter(a => a.status === filter);
  const cols = [
    { title: 'App ID', dataIndex: 'id', render: (v) => <Text code style={{ fontSize: 12 }}>{v}</Text> },
    { title: 'Scheme', dataIndex: 'scheme', render: (s) => <SchemeBadge scheme={s} /> },
    { title: 'Product', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div></div> },
    { title: 'Validation', dataIndex: 'aiScore', render: (s) => !s ? <Text type="secondary">Pending</Text> : s >= 90 ? <Tag color="green" icon={<CheckCircleOutlined />}>No issues</Tag> : <Tag color="orange" icon={<WarningOutlined />}>Items to review</Tag> },
    { title: 'Status', dataIndex: 'status', render: (s) => <StatusPill status={s} /> },
    { title: 'Updated', dataIndex: 'updated', render: (v) => <Text style={{ fontSize: 12 }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</Text> },
    { title: '', render: (_, r) => (
      <antd.Space size={4}>
        {r.status === 'iteration_required' && (
          <Button size="small" type="primary" icon={<ReloadOutlined />} onClick={() => nav('iteration-reply')} style={{ background: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
            Respond
          </Button>
        )}
        <Button size="small" onClick={() => nav('application-detail')}>Open</Button>
      </antd.Space>
    ) },
  ];
  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Applications</div>
          <Title level={3} style={{ margin: '4px 0 0' }}>My Applications</Title>
        </div>
        <Space>
          <Input.Search placeholder="Search by ID, product, model…" style={{ width: 280 }} />
          <Button type="primary" onClick={() => nav('sdoc-wizard')}>+ New Application</Button>
        </Space>
      </div>
      <Card bordered>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { label: `All (${all.length})`, value: 'all' },
            { label: `Draft (${all.filter(a => a.status === 'draft').length})`, value: 'draft' },
            { label: `Under Review (${all.filter(a => a.status === 'under_review').length})`, value: 'under_review' },
            { label: `Iteration (${all.filter(a => a.status === 'iteration_required').length})`, value: 'iteration_required' },
            { label: `Approved (${all.filter(a => a.status === 'approved').length})`, value: 'approved' },
            { label: `Rejected (${all.filter(a => a.status === 'rejected').length})`, value: 'rejected' },
          ]}
          style={{ marginBottom: 16 }}
        />
        <Table rowKey="id" columns={cols} dataSource={filtered} pagination={false} size="middle" />
      </Card>
    </div>
  );
};

// ============ APPLICATION DETAIL (Supplier view) ============
SCREENS['application-detail'] = function ApplicationDetail({ nav }) {
  const a = MOCK.assessments.find(x => x.id === 'APP-0426-00087') || MOCK.assessments[0];
  const auditTrail = (MOCK.supplierAuditTrail || {})[a.id] || [
    { t: 'Application submitted',     d: '15 Apr 2026, 14:20', icon: '📤', note: '' },
    { t: 'Compliance check complete', d: '15 Apr 2026, 14:23', icon: '✅', note: '' },
    { t: 'Assigned for officer review', d: '15 Apr 2026, 14:24', icon: '➡️', note: '' },
  ];
  const docs = MOCK.documents || [];

  const iterationNotes = a.status === 'iteration_required' ? [
    { label: 'Frequency band', note: 'Please include the full secondary frequency range (2400–2483.5 MHz sub-band) in the technical brochure.' },
    { label: 'Standards clause', note: 'Clause 5.3.2 in MCMC MTSFB TC G015:2022 is marked "N/A" — please provide a brief written justification.' },
  ] : [];

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <Breadcrumb items={[
        { title: <a onClick={() => nav('applications')}>My Applications</a> },
        { title: <span style={{ fontFamily: 'var(--font-mono)' }}>{a.id}</span> },
      ]} style={{ marginBottom: 16 }} />

      {/* Header */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <SchemeBadge scheme={a.scheme} />
            <Title level={3} style={{ margin: 0 }}>{a.product}</Title>
            <Text type="secondary">{a.brand} · {a.model}</Text>
            <StatusPill status={a.status} />
          </div>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
            Submitted {new Date(a.submitted).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            {a.rcn && <> · <Text code style={{ fontSize: 12 }}>{a.rcn}</Text></>}
          </Text>
        </div>
        {a.status === 'iteration_required' && (
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => nav('iteration-reply')}
            style={{ background: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
            Respond to Iteration
          </Button>
        )}
      </div>

      {/* Iteration banner */}
      {a.status === 'iteration_required' && (
        <antd.Alert type="warning" showIcon style={{ marginBottom: 20 }}
          message="Action required — officer has requested amendments"
          description={
            <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
              {iterationNotes.map((n, i) => <li key={i}><b>{n.label}:</b> {n.note}</li>)}
            </ul>
          }
        />
      )}

      <Row gutter={20}>
        {/* LEFT: tabs */}
        <Col span={16}>
          <antd.Tabs items={[
            {
              key: 'findings',
              label: 'Document Validation',
              children: (() => {
                const docFindings = MOCK.documentFindings || [];
                const reviewCount = docFindings.filter(d => d.findings.length > 0).length;
                const acceptedCount = docFindings.filter(d => d.findings.length === 0).length;
                return (
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <div style={{ padding: '8px 16px', background: 'var(--color-success-bg)', borderRadius: 8, textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-success)' }}>{acceptedCount}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Accepted</div>
                      </div>
                      {reviewCount > 0 && (
                        <div style={{ padding: '8px 16px', background: 'var(--color-warning-bg)', borderRadius: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-warning)' }}>{reviewCount}</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Items to review</div>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {docFindings.map((doc, i) => (
                        <div key={i} style={{ padding: '12px 14px', border: `1px solid ${doc.findings.length > 0 ? 'var(--color-warning)' : 'var(--color-border)'}`, borderRadius: 10, background: doc.findings.length > 0 ? 'var(--color-warning-bg)' : 'var(--color-bg-subtle)' }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <span style={{ fontSize: 15 }}>{doc.findings.length === 0 ? '✅' : '📋'}</span>
                            <span style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{doc.docLabel}</span>
                            <Tag color={doc.findings.length === 0 ? 'green' : 'orange'} style={{ margin: 0 }}>
                              {doc.findings.length === 0 ? 'Accepted' : 'Please review'}
                            </Tag>
                          </div>
                          {doc.findings.length > 0 && (
                            <div style={{ marginTop: 8, paddingLeft: 25, display: 'grid', gap: 5 }}>
                              {doc.findings.map((f, j) => (
                                <div key={j} style={{ fontSize: 12 }}>
                                  <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>{f.field}:</span>{' '}
                                  <span style={{ color: 'var(--color-text-secondary)' }}>{f.note}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {reviewCount > 0 && a.status !== 'approved' && (
                      <antd.Alert type="info" showIcon style={{ marginTop: 14 }}
                        message="These are guidance items, not blockers"
                        description="Addressing the items above before resubmission will reduce the chance of an officer requesting further changes." />
                    )}
                  </div>
                );
              })(),
            },
            {
              key: 'docs',
              label: 'Documents',
              children: (
                <div style={{ display: 'grid', gap: 8, paddingTop: 8 }}>
                  {docs.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: 'var(--color-bg-subtle)', borderRadius: 8 }}>
                      <span>📄</span>
                      <span style={{ flex: 1, fontSize: 13 }}>{d.name}</span>
                      <Text type="secondary" style={{ fontSize: 11 }}>{d.size}</Text>
                      <Tag color={d.ocrStatus === 'verified' ? 'green' : 'orange'} style={{ fontSize: 10, margin: 0 }}>
                        {d.ocrStatus === 'verified' ? 'Accepted' : 'Pending'}
                      </Tag>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: 'trail',
              label: 'Activity',
              children: (
                <antd.List
                  size="small"
                  style={{ paddingTop: 8 }}
                  dataSource={auditTrail}
                  renderItem={e => (
                    <antd.List.Item style={{ padding: '10px 0' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ fontSize: 18 }}>{e.icon}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{e.t}</div>
                          {e.note && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{e.note}</div>}
                          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{e.d}</div>
                        </div>
                      </div>
                    </antd.List.Item>
                  )}
                />
              ),
            },
          ]} />
        </Col>

        {/* RIGHT: summary card */}
        <Col span={8}>
          <Card size="small" bordered style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600, marginBottom: 10 }}>Application Details</div>
            {[
              ['Application ID', a.id],
              ['Scheme', <SchemeBadge scheme={a.scheme} />],
              ['Status', <StatusPill status={a.status} />],
              ['Submitted', new Date(a.submitted).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })],
              ...(a.rcn ? [['Certificate (RCN)', <Text code style={{ fontSize: 12 }}>{a.rcn}</Text>]] : []),
              ...(a.iterationDue ? [['Amendment Due', <Text style={{ color: 'var(--color-warning)', fontWeight: 600 }}>{new Date(a.iterationDue).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>]] : []),
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--color-divider)' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>{k}</Text>
                <div style={{ fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </Card>
          {a.status === 'approved' && a.rcn && (
            <Button block icon={<DownloadOutlined />}>Download Certificate PDF</Button>
          )}
          <Button block style={{ marginTop: 8 }} onClick={() => nav('applications')}>← Back to Applications</Button>
        </Col>
      </Row>
    </div>
  );
};

// ============ ONBOARDING ============
SCREENS.onboarding = function Onboarding({ nav }) {
  const [step, setStep] = React.useState(0);
  const [category, setCategory] = React.useState('A');
  const [supplierMode, setSupplierMode] = React.useState('new'); // 'new' | 'existing'
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  const [supplierSearch, setSupplierSearch] = React.useState('');
  const steps = ['Account', 'Verify Email', 'Category', 'Details', 'Verification', 'Confirmation'];
  const cats = [
    { k: 'A', t: 'Company (Commercial)', d: 'Registered Sdn Bhd or Bhd with active SSM BRN', icon: '🏢' },
    { k: 'B', t: 'Individual (Non-Commercial)', d: 'Malaysian citizen or permanent resident with NRIC', icon: '👤' },
    { k: 'C', t: 'Institution (Non-Commercial)', d: 'University, government agency, or registered NGO', icon: '🏛' },
    { k: 'D', t: 'Consultant', d: 'Professional credentials + company affiliation', icon: '💼' },
  ];
  return (
    <div style={{ padding: 32, maxWidth: 960, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Supplier Onboarding</div>
        <Title level={3} style={{ margin: '4px 0 0' }}>Register as an NCEF Supplier</Title>
      </div>
      <div style={{ marginBottom: 32 }}>
        <Steps current={step} size="small" labelPlacement="vertical" responsive items={steps.map(s => ({ title: s }))} />
      </div>
      <Card bordered>
        {step === 0 && (
          <Form layout="vertical" style={{ maxWidth: 520 }}>
            <Title level={4}>Account Creation</Title>
            <Text type="secondary">Your account is the portal for all MCMC submissions.</Text>
            <Divider />
            <Form.Item label="Full Name" required><Input placeholder="Nurul Aisyah binti Ahmad" /></Form.Item>
            <Form.Item label="Email Address" required><Input placeholder="nurul@axiatadigital.com.my" /></Form.Item>
            <Form.Item label="Phone Number" required><Input placeholder="+60 12-345 6789" /></Form.Item>
            <Form.Item label="Password" required extra="Min 12 chars with upper, lower, digit, symbol"><Input.Password placeholder="••••••••••••" /></Form.Item>
            <Divider orientation="left" orientationMargin={0} style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>SECURITY QUESTIONS</Divider>
            <Alert message="Security questions are used to verify your identity during password recovery." type="info" showIcon style={{ marginBottom: 16, fontSize: 12 }} />
            {[
              { label: 'Security Question 1', options: ["What is the name of your first pet?", "What city were you born in?", "What is your mother's maiden name?", "What was the name of your primary school?"] },
              { label: 'Security Question 2', options: ["What was the make of your first car?", "What is your oldest sibling's middle name?", "What street did you grow up on?", "What was the name of your childhood best friend?"] },
              { label: 'Security Question 3', options: ["What is the name of the town where your nearest sibling lives?", "What was your childhood nickname?", "In what city did your parents meet?", "What was the name of your first employer?"] },
            ].map((q, qi) => (
              <Row gutter={10} key={qi}>
                <Col span={14}>
                  <Form.Item label={q.label} required>
                    <Select placeholder="Select a question…" options={q.options.map(o => ({ value: o, label: o }))} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Your Answer" required>
                    <Input placeholder="Answer…" />
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Divider orientation="left" orientationMargin={0} style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>CONSENT & PDPA</Divider>
            <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 8, padding: 12, fontSize: 12, color: 'var(--color-text-secondary)', maxHeight: 80, overflowY: 'auto', marginBottom: 12, border: '1px solid var(--color-border)' }}>
              <b>Personal Data Protection Act 2010 (PDPA 2010) Notice</b> — MCMC collects your personal data (name, IC/Passport, company details, contact information) solely for NCEF certification administration. Data is retained for 7 years after the last active certificate expires. You may request access, correction, or erasure of your data via <a>pdpa@mcmc.gov.my</a>. Data is not shared with third parties except as required by Malaysian law.
            </div>
            <Form.Item style={{ marginBottom: 8 }}><Checkbox required>I have read and accept the <a>Terms &amp; Conditions</a></Checkbox></Form.Item>
            <Form.Item style={{ marginBottom: 8 }}><Checkbox required>I consent to MCMC processing my personal data under PDPA 2010 for NCEF certification purposes</Checkbox></Form.Item>
            <Form.Item><Checkbox>I consent to receive updates and announcements via email / SMS (optional)</Checkbox></Form.Item>
          </Form>
        )}
        {step === 1 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48 }}>📧</div>
            <Title level={4}>Check your email</Title>
            <Text type="secondary">We sent a verification link to <b>nurul@axiatadigital.com.my</b>. Valid for 24 hours.</Text>
            <div style={{ marginTop: 24 }}>
              <Button type="link">Resend verification email</Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <Title level={4}>Select Application Category</Title>
            <Text type="secondary">This determines required documents and workflow. You cannot change it later.</Text>
            <Row gutter={[12, 12]} style={{ marginTop: 20 }}>
              {cats.map(c => (
                <Col xs={24} md={12} key={c.k}>
                  <div onClick={() => setCategory(c.k)} style={{ padding: 18, border: `2px solid ${category === c.k ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 12, cursor: 'pointer', background: category === c.k ? 'var(--color-primary-soft)' : '#fff', transition: 'all .15s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 28 }}>{c.icon}</div>
                      <Tag color={category === c.k ? 'blue' : 'default'}>Category {c.k}</Tag>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginTop: 12 }}>{c.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>{c.d}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
        {step === 3 && category === 'A' && (
          <Form layout="vertical">
            <Title level={4}>Company Information</Title>

            {/* Supplier mode selector */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--color-text-secondary)' }}>Is this company already registered in NCEF?</div>
              <Radio.Group value={supplierMode} onChange={e => { setSupplierMode(e.target.value); setSelectedSupplier(null); setSupplierSearch(''); }} style={{ display: 'flex', gap: 10, width: '100%' }}>
                <Radio value="new" style={{ flex: 1, padding: 14, border: `2px solid ${supplierMode === 'new' ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 10, margin: 0, background: supplierMode === 'new' ? 'var(--color-primary-soft)' : '#fff' }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Register new supplier</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>First time registering this company with NCEF</div>
                </Radio>
                <Radio value="existing" style={{ flex: 1, padding: 14, border: `2px solid ${supplierMode === 'existing' ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 10, margin: 0, background: supplierMode === 'existing' ? 'var(--color-primary-soft)' : '#fff' }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Join existing supplier</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Company is already registered — add me as PIC / team member</div>
                </Radio>
              </Radio.Group>
            </div>

            {supplierMode === 'existing' && (
              <div style={{ marginBottom: 20 }}>
                <Form.Item label="Search registered suppliers" required extra="Search by company name or SSM BRN">
                  <Select
                    showSearch
                    placeholder="e.g. Axiata Digital or 201901023456"
                    filterOption={false}
                    value={selectedSupplier?.id}
                    onSearch={setSupplierSearch}
                    onChange={(val) => setSelectedSupplier(MOCK.supplierDirectory.find(s => s.id === val))}
                    style={{ width: '100%' }}
                    options={MOCK.supplierDirectory
                      .filter(s => !supplierSearch || (s.name + s.brn).toLowerCase().includes(supplierSearch.toLowerCase()))
                      .map(s => ({
                        value: s.id,
                        label: (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>BRN {s.brn} · {s.id} · Category {s.category}</div>
                            </div>
                            <Tag color="green" style={{ fontSize: 10, margin: 0 }}>{s.approvals} approvals</Tag>
                          </div>
                        ),
                      }))}
                  />
                </Form.Item>
                {selectedSupplier && (
                  <div style={{ padding: 16, background: 'var(--color-primary-soft)', borderRadius: 10, border: '1px solid var(--color-primary)', marginBottom: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-primary)' }}>{selectedSupplier.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{selectedSupplier.address}</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                          <Tag color="blue">Category {selectedSupplier.category}</Tag>
                          <Tag>BRN {selectedSupplier.brn}</Tag>
                          <Tag color="green">{selectedSupplier.approvals} prior approvals</Tag>
                        </div>
                      </div>
                      <Tag color="green" style={{ fontWeight: 600 }}>SSM Verified</Tag>
                    </div>
                  </div>
                )}
                {selectedSupplier && (
                  <>
                    <Divider orientation="left" orientationMargin={0} style={{ fontSize: 13, marginTop: 20 }}>Your Details (PIC)</Divider>
                    <Alert message="Company details are pre-filled from the existing registration. Please provide your personal contact details below." type="info" showIcon style={{ marginBottom: 16 }} />
                    <Row gutter={16}>
                      <Col span={12}><Form.Item label="Your Full Name" required><Input placeholder="Ahmad Razif bin Johari" /></Form.Item></Col>
                      <Col span={12}><Form.Item label="Your NRIC" required><Input placeholder="890315-14-5678" /></Form.Item></Col>
                      <Col span={12}><Form.Item label="Work Email" required><Input placeholder="razif@company.com.my" /></Form.Item></Col>
                      <Col span={12}><Form.Item label="Work Phone" required><Input placeholder="+60 12-345 6789" /></Form.Item></Col>
                      <Col span={24}><Form.Item label="Your Role in this Company" required><Select placeholder="Select…" options={[{value:'admin',label:'Administrator'},{value:'pic',label:'PIC (Technical)'},{value:'submitter',label:'Submitter'},{value:'finance',label:'Finance'}]} /></Form.Item></Col>
                    </Row>
                  </>
                )}
              </div>
            )}

            {supplierMode === 'new' && (
              <>
                <Alert message="SSM Auto-Fill" description="Enter your BRN and we'll verify and auto-populate via SSM API." type="info" showIcon style={{ marginBottom: 20 }} />
                <Row gutter={16}>
                  <Col span={12}><Form.Item label="Company Name" required><Input placeholder="Axiata Digital Sdn Bhd" /></Form.Item></Col>
                  <Col span={12}><Form.Item label="SSM BRN" required extra="Format: 201901023456"><Input.Search placeholder="201901023456" enterButton="Verify" /></Form.Item></Col>
                  <Col span={24}><Form.Item label="Business Address" required><Input.TextArea rows={2} placeholder="Level 21, Axiata Tower, No. 9 Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur" /></Form.Item></Col>
                  <Col span={12}><Form.Item label="Director Name" required><Input placeholder="Tan Sri Dato' Sri Jamaludin Ibrahim" /></Form.Item></Col>
                  <Col span={12}><Form.Item label="Director NRIC" required><Input placeholder="590815-07-5237" /></Form.Item></Col>
                  <Col span={12}><Form.Item label="Business Type" required><Select placeholder="Select…" options={[{value:'telecom',label:'Telecommunications'},{value:'electronics',label:'Consumer Electronics'},{value:'iot',label:'IoT / Connected Devices'}]} /></Form.Item></Col>
                  <Col span={12}><Form.Item label="Contact Email" required><Input placeholder="compliance@axiatadigital.com.my" /></Form.Item></Col>
                </Row>
                <Divider>Required Documents</Divider>
                <Upload.Dragger multiple>
                  <p style={{ fontSize: 32, margin: 0 }}>📄</p>
                  <p>Upload SSM certificate and Director NRIC copy (PDF/JPG/PNG, max 10MB each)</p>
                </Upload.Dragger>
              </>
            )}
          </Form>
        )}
        {step === 4 && (
          <div>
            <Title level={4}>Verification in Progress</Title>
            <Text type="secondary">We're cross-checking your submission against SSM records, document content, and regulatory requirements.</Text>
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {['SSM BRN lookup', 'Document extraction', 'Director identity match', 'Address verification', 'Compliance scoring'].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--color-bg-subtle)', borderRadius: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>✓</div>
                  <div style={{ flex: 1, fontSize: 13 }}>{l}</div>
                  <Text type="secondary" style={{ fontSize: 11 }}>Complete</Text>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Alert type="success" showIcon
                message="Verification complete"
                description="All checks passed. Your account details have been verified and your profile is ready for activation." />
            </div>
          </div>
        )}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ display: 'inline-flex', width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-bg)', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: 'var(--color-success)' }}>✓</div>
            <Title level={3} style={{ marginTop: 16 }}>Welcome to NCEF</Title>
            <Text type="secondary">Your Supplier ID has been issued.</Text>
            <div style={{ marginTop: 20, padding: 16, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block' }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .5, fontWeight: 600 }}>Supplier ID</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>SUP-0426-00142</div>
            </div>
            <div style={{ marginTop: 28 }}>
              <Button type="primary" size="large" onClick={() => nav('dashboard')}>Go to Dashboard →</Button>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-divider)' }}>
          <Button disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</Button>
          {step < steps.length - 1 && <Button type="primary" onClick={() => setStep(step + 1)}>Continue →</Button>}
        </div>
      </Card>
    </div>
  );
};

// ============ IMEI / SERIAL REGISTRATION ============
SCREENS['imei-register'] = function ImeiRegister({ nav }) {
  const [step, setStep] = React.useState(0);
  const [selectedCert, setSelectedCert] = React.useState(null);
  const [inputMode, setInputMode] = React.useState('manual');
  const [serialText, setSerialText] = React.useState('');
  const [validating, setValidating] = React.useState(false);
  const [validationDone, setValidationDone] = React.useState(false);

  const activeCerts = MOCK.certificates.filter(c => c.status === 'active');
  const serials = serialText.split('\n').map(s => s.trim()).filter(Boolean);

  const fakeValidation = [
    { serial: 'IMEI-356789012345678', status: 'valid' },
    { serial: 'IMEI-356789012345679', status: 'valid' },
    { serial: 'IMEI-356789012345680', status: 'duplicate' },
    { serial: 'SN-AXD2026-0001', status: 'valid' },
    { serial: 'SN-AXD2026-0002', status: 'valid' },
  ];

  React.useEffect(() => {
    if (step === 2 && !validationDone) {
      setValidating(true);
      const t = setTimeout(() => { setValidating(false); setValidationDone(true); }, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const steps = ['Select Certificate', 'Enter Serials', 'Validate', 'Confirm'];

  return (
    <div style={{ padding: 32, maxWidth: 860, margin: '0 auto' }}>
      <Breadcrumb items={[{ title: <a onClick={() => nav('dashboard')}>Dashboard</a> }, { title: <a onClick={() => nav('certificates')}>Certificates</a> }, { title: 'Register IMEI / SN' }]} />
      <div style={{ margin: '8px 0 24px' }}>
        <Title level={3} style={{ margin: 0 }}>IMEI / Serial Number Registration</Title>
        <Text type="secondary">Register device serials against an active certificate before distribution.</Text>
      </div>
      <div style={{ marginBottom: 28 }}>
        <Steps current={step} size="small" labelPlacement="vertical" responsive items={steps.map(s => ({ title: s }))} />
      </div>

      <Card bordered>
        {step === 0 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Select Certificate</Title>
            <Text type="secondary">Choose which active RCN to register serials against.</Text>
            <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
              {activeCerts.map(c => (
                <div
                  key={c.rcn}
                  onClick={() => setSelectedCert(c)}
                  style={{ padding: 16, border: `2px solid ${selectedCert?.rcn === c.rcn ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 12, cursor: 'pointer', background: selectedCert?.rcn === c.rcn ? 'var(--color-primary-soft)' : '#fff', display: 'flex', gap: 16, alignItems: 'center' }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <SchemeBadge scheme={c.scheme} />
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{c.product}</span>
                      <Text type="secondary" style={{ fontSize: 12 }}>{c.brand} · {c.model}</Text>
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 12 }}>
                      <Text code style={{ fontSize: 11 }}>{c.rcn}</Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>Expires {new Date(c.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                    </div>
                  </div>
                  {selectedCert?.rcn === c.rcn && <CheckCircleOutlined style={{ fontSize: 20, color: 'var(--color-primary)' }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Enter Serial Numbers / IMEIs</Title>
            {selectedCert && (
              <Alert message={<span>Registering against <b>{selectedCert.rcn}</b> — {selectedCert.product}</span>} type="info" showIcon style={{ marginBottom: 20 }} />
            )}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <Button type={inputMode === 'manual' ? 'primary' : 'default'} onClick={() => setInputMode('manual')}>Manual entry</Button>
              <Button type={inputMode === 'csv' ? 'primary' : 'default'} onClick={() => setInputMode('csv')}>CSV upload</Button>
            </div>
            {inputMode === 'manual' && (
              <div>
                <Form.Item label="Serial Numbers / IMEIs" extra="One per line. IMEI (15 digits) or Serial Number (alphanumeric)." required>
                  <Input.TextArea
                    rows={10}
                    placeholder={'IMEI-356789012345678\nIMEI-356789012345679\nSN-AXD2026-0001\nSN-AXD2026-0002'}
                    value={serialText}
                    onChange={e => setSerialText(e.target.value)}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
                  />
                </Form.Item>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  <b>{serials.length}</b> serial(s) entered
                </div>
              </div>
            )}
            {inputMode === 'csv' && (
              <Upload.Dragger accept=".csv,.txt" style={{ padding: 20 }}>
                <p style={{ fontSize: 32, margin: 0 }}><UploadOutlined /></p>
                <p style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Drop CSV file here or click to upload</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>One column of IMEIs or serial numbers, no header row. Max 10,000 rows.</p>
              </Upload.Dragger>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Validation Results</Title>
            {validating && (
              <Card bordered style={{ borderColor: 'var(--color-primary)', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ReloadOutlined style={{ fontSize: 20, color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Checking for duplicates and format errors…</div>
                    <Progress percent={65} status="active" showInfo={false} strokeColor="var(--color-primary)" style={{ marginTop: 8, width: 400 }} />
                  </div>
                </div>
              </Card>
            )}
            {validationDone && (
              <>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ padding: '10px 20px', background: 'var(--color-success-bg)', borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-success)' }}>4</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Valid</div>
                  </div>
                  <div style={{ padding: '10px 20px', background: 'var(--color-warning-bg)', borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-warning)' }}>1</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Duplicate</div>
                  </div>
                  <div style={{ padding: '10px 20px', background: 'var(--color-bg-subtle)', borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>0</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Invalid format</div>
                  </div>
                </div>
                <Table
                  rowKey="serial"
                  dataSource={fakeValidation}
                  pagination={false}
                  size="small"
                  columns={[
                    { title: 'Serial / IMEI', dataIndex: 'serial', render: v => <Text code style={{ fontSize: 12 }}>{v}</Text> },
                    { title: 'Status', dataIndex: 'status', render: s => s === 'valid'
                      ? <Tag color="green" icon={<CheckCircleOutlined />}>Valid</Tag>
                      : <Tag color="orange" icon={<WarningOutlined />}>Duplicate — already registered</Tag>
                    },
                  ]}
                />
                <Alert type="warning" showIcon style={{ marginTop: 16 }} message="1 duplicate will be skipped" description="4 valid serials will be registered. Duplicates are excluded automatically." />
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ display: 'inline-flex', width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-bg)', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: 'var(--color-success)' }}>✓</div>
            <Title level={3} style={{ marginTop: 16 }}>Registration Complete</Title>
            <Text type="secondary">4 serial numbers registered against <b>{selectedCert?.rcn || 'RCN-0326-00449'}</b></Text>
            <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block' }}>
              <Row gutter={24}>
                <Col>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Certificate</div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{selectedCert?.rcn || 'RCN-0326-00449'}</div>
                </Col>
                <Col>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Registered</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-success)' }}>4 serials</div>
                </Col>
                <Col>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Date</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>19 Apr 2026</div>
                </Col>
              </Row>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center' }}>
              <Button size="large" icon={<DownloadOutlined />}>Download Receipt</Button>
              <Button size="large" type="primary" onClick={() => nav('certificates')}>View Certificates</Button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-divider)' }}>
          <Button disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</Button>
          {step < steps.length - 1 && (
            <Button type="primary" onClick={() => setStep(step + 1)} disabled={step === 0 && !selectedCert || step === 2 && validating}>
              {step === 2 ? 'Register 4 Serials →' : 'Continue →'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

// ============ CERTIFICATE RENEWAL WIZARD ============
SCREENS['cert-renewal'] = function CertRenewal({ nav }) {
  const [step, setStep] = React.useState(0);
  const [selectedCert, setSelectedCert] = React.useState(MOCK.certificates.find(c => c.status === 'expiring') || MOCK.certificates[0]);
  const [aiRunning, setAiRunning] = React.useState(false);
  const [aiDone, setAiDone] = React.useState(false);
  const [payMethod, setPayMethod] = React.useState('fpx');

  const steps = ['Select Certificate', 'Review Documents', 'Document Re-check', 'Payment', 'Confirmation'];
  const expiringCerts = MOCK.certificates.filter(c => c.status === 'expiring' || c.status === 'active');
  const feeMap = { A: 1200, B: 2500, C: 600, SA: 1200 };
  const fee = feeMap[selectedCert?.scheme] || 1200;
  const daysLeft = selectedCert ? Math.ceil((new Date(selectedCert.expires) - new Date('2026-04-19')) / 864e5) : 0;

  React.useEffect(() => {
    if (step === 2 && !aiDone) {
      setAiRunning(true);
      const t = setTimeout(() => { setAiRunning(false); setAiDone(true); }, 2400);
      return () => clearTimeout(t);
    }
  }, [step]);

  const docList = [
    { label: 'Company Registration (SSM)', age: '2024-01-15', reuse: true, expired: false },
    { label: 'Technical Brochure / Datasheet', age: '2026-03-10', reuse: true, expired: false },
    { label: 'Test Report (accredited lab)', age: '2023-04-02', reuse: false, expired: true, note: 'Older than 3 years — must re-upload' },
    { label: 'Product Photos (front, back, label)', age: '2026-03-10', reuse: true, expired: false },
    { label: 'Declaration Letter', age: '2023-04-02', reuse: false, expired: true, note: 'Must be redated for renewal' },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <Breadcrumb items={[{ title: <a onClick={() => nav('dashboard')}>Dashboard</a> }, { title: <a onClick={() => nav('certificates')}>Certificates</a> }, { title: 'Renew Certificate' }]} />
      <div style={{ margin: '8px 0 24px' }}>
        <Title level={3} style={{ margin: 0 }}>Certificate Renewal</Title>
        <Text type="secondary">Renew before expiry to avoid supply disruption. Eligible documents from your original submission will be reused.</Text>
      </div>
      <div style={{ marginBottom: 28 }}>
        <Steps current={step} size="small" labelPlacement="vertical" responsive items={steps.map(s => ({ title: s }))} />
      </div>

      <Card bordered>
        {step === 0 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Select Certificate to Renew</Title>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {expiringCerts.map(c => {
                const days = Math.ceil((new Date(c.expires) - new Date('2026-04-19')) / 864e5);
                return (
                  <div
                    key={c.rcn}
                    onClick={() => setSelectedCert(c)}
                    style={{ padding: 16, border: `2px solid ${selectedCert?.rcn === c.rcn ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 12, cursor: 'pointer', background: selectedCert?.rcn === c.rcn ? 'var(--color-primary-soft)' : '#fff', display: 'flex', gap: 16, alignItems: 'center' }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <SchemeBadge scheme={c.scheme} />
                        <span style={{ fontWeight: 600 }}>{c.product}</span>
                        <Text type="secondary" style={{ fontSize: 12 }}>{c.brand} · {c.model}</Text>
                      </div>
                      <div style={{ marginTop: 6, display: 'flex', gap: 12 }}>
                        <Text code style={{ fontSize: 11 }}>{c.rcn}</Text>
                        <Text style={{ fontSize: 11, color: days < 90 ? 'var(--color-warning)' : 'var(--color-text-muted)', fontWeight: days < 90 ? 600 : 400 }}>
                          Expires {new Date(c.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} {days < 90 && `(${days} days left)`}
                        </Text>
                      </div>
                    </div>
                    {days < 90 && <Tag color="orange" icon={<ClockCircleOutlined />}>Expiring Soon</Tag>}
                    {selectedCert?.rcn === c.rcn && <CheckCircleOutlined style={{ fontSize: 20, color: 'var(--color-primary)' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Review Documents</Title>
            {selectedCert && daysLeft < 90 && (
              <Alert type="warning" showIcon message={`Certificate expires in ${daysLeft} days`} description="Documents older than 3 years or undated declarations must be re-uploaded. All others can be reused." style={{ marginBottom: 20 }} />
            )}
            <div style={{ display: 'grid', gap: 10 }}>
              {docList.map((d, i) => (
                <div key={i} className="doc-tile" style={{ padding: 14, background: d.expired ? 'var(--color-warning-bg)' : '#fff', borderColor: d.expired ? 'var(--color-warning)' : 'var(--color-border)' }}>
                  <div className="icon" style={{ background: d.expired ? 'var(--color-warning-bg)' : 'var(--color-primary-subtle)', color: d.expired ? 'var(--color-warning)' : 'var(--color-primary)' }}>
                    <FilePdfOutlined />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{d.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Last uploaded {d.age} {d.note && <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>· {d.note}</span>}</div>
                  </div>
                  {d.reuse && !d.expired && <Tag color="green" icon={<CheckCircleOutlined />}>Reusing</Tag>}
                  {d.expired && (
                    <Upload>
                      <Button size="small" type="primary">Re-upload</Button>
                    </Upload>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 12, background: 'var(--color-primary-soft)', borderRadius: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
              <b>3 of 5</b> documents reused from original submission · <b>2</b> require re-upload
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: 780 }}>
            {aiRunning && (
              <Card bordered style={{ borderColor: 'var(--color-primary)', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileSearchOutlined style={{ fontSize: 24, color: 'var(--color-primary)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Checking updated documents…</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>Cross-referencing new test report, updated declarations, prior approval history</div>
                    <Progress percent={55} status="active" showInfo={false} strokeColor="var(--color-primary)" style={{ marginTop: 10 }} />
                  </div>
                </div>
              </Card>
            )}
            {aiDone && (
              <>
                <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
                  {[
                    { label: 'Company Registration', note: 'Valid and active.', ok: true },
                    { label: 'Technical Brochure', note: 'Accepted. No changes required.', ok: true },
                    { label: 'Test Report', note: 'Updated report accepted. Previous frequency band flag resolved.', ok: true },
                    { label: 'Product Photos', note: 'Accepted.', ok: true },
                    { label: 'Declaration Letter', note: 'Redated and accepted.', ok: true },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--color-success-bg)', border: '1px solid var(--color-border)', borderRadius: 8 }}>
                      <span style={{ fontSize: 15, marginTop: 1 }}>✅</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Alert type="success" showIcon message="All documents verified" description="No issues found. Your renewal can proceed to payment." />
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth: 520 }}>
            <Card bordered>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Renewal Fee</div>
              <div style={{ fontSize: 36, fontWeight: 700 }}>RM {fee.toLocaleString('en-MY')}.00</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 20 }}>Scheme {selectedCert?.scheme} renewal · {selectedCert?.rcn} · Includes 8% SST</div>
              <Divider />
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Payment Method</div>
              <Radio.Group value={payMethod} onChange={e => setPayMethod(e.target.value)} style={{ display: 'grid', gap: 8, width: '100%' }}>
                {[
                  { v: 'fpx', t: 'FPX Online Banking', d: 'Malaysia Electronic Payment System' },
                  { v: 'card', t: 'Credit / Debit Card', d: 'Visa, Mastercard, American Express' },
                  { v: 'duitnow', t: 'DuitNow QR', d: 'Scan with any participating bank app' },
                  { v: 'invoice', t: 'Corporate Invoice', d: '30-day terms · Pre-approved accounts only' },
                ].map(m => (
                  <Radio key={m.v} value={m.v} style={{ padding: 14, border: `1px solid ${payMethod === m.v ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: payMethod === m.v ? 'var(--color-primary-soft)' : '#fff', width: '100%' }}>
                    <div style={{ display: 'inline-block' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{m.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{m.d}</div>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ display: 'inline-flex', width: 80, height: 80, borderRadius: '50%', background: 'var(--color-success-bg)', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: 'var(--color-success)' }}>✓</div>
            <Title level={3} style={{ marginTop: 16 }}>Certificate Renewed</Title>
            <Text type="secondary">Payment received. Your renewal has been processed and a new certificate has been issued.</Text>
            <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block' }}>
              <Row gutter={24}>
                <Col>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>New RCN</div>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{selectedCert?.rcn?.replace(/\d{4}-\d{5}$/, '0426-00501') || 'RCN-0426-00501'}</div>
                </Col>
                <Col>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>New Expiry</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>19 Apr 2029</div>
                </Col>
              </Row>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center' }}>
              <Button size="large" icon={<DownloadOutlined />}>Download Certificate PDF</Button>
              <Button size="large" type="primary" onClick={() => nav('certificates')}>View Certificates</Button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-divider)' }}>
          <Button disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</Button>
          {step < steps.length - 1 && (
            <Button type="primary" size="large" onClick={() => setStep(step + 1)} disabled={step === 2 && aiRunning}>
              {step === 3 ? `Pay RM ${fee.toLocaleString('en-MY')} →` : 'Continue →'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

Object.assign(window, { SCREENS });
