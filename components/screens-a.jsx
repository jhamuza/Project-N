// Screens: Dashboard, Applications list, Onboarding, SDoC Wizard, Special Approval, Officer Review
const SCREENS = {};

// ============ LOGIN ============
// Pre-auth screen. Rendered by App when loggedIn === false.
// Accepts onLogin(role) — parent flips loggedIn=true and navigates to role's default landing.
SCREENS.login = function LoginScreen({ onLogin, lang: _lang }) {
  const lang = _lang || 'en';
  const T = (k) => window.t(lang, k);
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
    officer: '#0F6ABF',
    recommender: '#2E7D32',
    verifier: '#E65100',
    approver: '#B71C1C',
    'content-manager': '#00796B',
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
            <antd.Typography.Title level={3} style={{ margin: 0 }}>{T('login_title')}</antd.Typography.Title>
            <antd.Typography.Text type="secondary">{T('login_subtitle')}</antd.Typography.Text>
          </div>

          <antd.Form layout="vertical" onFinish={submit}>
            <antd.Form.Item label={T('login_email')} required>
              <antd.Input size="large" prefix={<MailOutlined />} value={email} onChange={e => setEmail(e.target.value)} />
            </antd.Form.Item>
            <antd.Form.Item label={T('login_password')} required>
              <antd.Input.Password size="large" prefix={<LockOutlined />} value={password} onChange={e => setPassword(e.target.value)} />
            </antd.Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <antd.Checkbox defaultChecked>{T('login_remember')}</antd.Checkbox>
              <antd.Typography.Link onClick={() => setForgotMode(true)}>{T('login_forgot')}</antd.Typography.Link>
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
            <antd.Button type="primary" size="large" htmlType="submit" block loading={loading} disabled={loginError === 'account_locked'}>{T('login_submit')}</antd.Button>
          </antd.Form>

          <antd.Divider style={{ margin: '24px 0 16px', fontSize: 11, color: 'var(--color-text-muted)' }}>{T('login_demo')}</antd.Divider>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['supplier', 'team-lead', 'officer', 'recommender', 'verifier', 'approver', 'content-manager'].map(key => {
              const prof = profiles[key];
              if (!prof) return null;
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
                    background: isActive ? `${roleAccent[key]}10` : '#fff',
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
            {T('login_demo_hint')}
          </div>
        </antd.Card>
      </div>
    </div>
  );
};


// ============ DASHBOARD ============
SCREENS.dashboard = function Dashboard({ nav, tweaks, lang: _lang }) {
  const lang = _lang || 'en';
  const T = (k) => window.t(lang, k);
  const graceMode = tweaks?.graceMode;
  const suspendedMode = tweaks?.suspendedMode;
  const [suspendedModal, setSuspendedModal] = React.useState(false);
  const GRACE_EXPIRY = new Date('2026-07-05');
  const k = MOCK.kpi.supplier;
  const recent = MOCK.assessments.slice(0, 5);
  const kpis = [
    { label: T('dash_kpi_pending'),  value: k.pending,       delta: lang === 'bm' ? '1 perlukan pindaan' : '1 needs iteration', icon: '⚠', to: 'applications', warn: true },
    { label: T('dash_kpi_approved'), value: k.approved,      delta: lang === 'bm' ? '2 pembaharuan dalam 30h' : '2 renewing in 30d', icon: '✓', to: 'applications' },
    { label: T('dash_kpi_expiring'), value: k.expiringSoon,  delta: lang === 'bm' ? 'Dalam 90 hari' : 'Within 90 days', icon: '⏰', to: 'applications' },
    { label: lang === 'bm' ? 'Jumlah Permohonan' : 'Total Applications', value: k.totalApps, delta: lang === 'bm' ? '+3 bulan ini' : '+3 this month', icon: '📋', to: 'applications' },
  ];
  const TODAY_DASH = new Date('2026-05-05');
  const ACCT_EXPIRY = new Date('2026-06-15');
  const acctDaysLeft = Math.ceil((ACCT_EXPIRY - TODAY_DASH) / 864e5);
  const acctExpiring = acctDaysLeft <= 90;

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      {suspendedMode && (
        <antd.Alert
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
          message={<strong>{lang === 'bm' ? 'Akaun digantung' : 'Account Suspended'}</strong>}
          description={lang === 'bm'
            ? 'Akaun anda telah digantung oleh MCMC. Permohonan baharu, pembaharuan, dan pendaftaran IMEI disekat. Hubungi MCMC untuk maklumat lanjut.'
            : 'Your account has been suspended by MCMC. New applications, renewals, and IMEI registrations are blocked. Contact MCMC to resolve this issue.'}
          action={<antd.Button size="small" danger href="mailto:cppg@mcmc.gov.my">Contact MCMC</antd.Button>}
        />
      )}
      {!suspendedMode && graceMode && (
        <antd.Alert
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
          message={
            <span>
              <strong>{lang === 'bm' ? 'Akaun dalam tempoh tangguh' : 'Account is in grace period'}</strong>
              {' — '}{lang === 'bm' ? 'tamat' : 'expires'} {GRACE_EXPIRY.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}.
              {' '}{lang === 'bm' ? 'Permohonan baharu disekat. Sila baharu akaun anda untuk meneruskan.' : 'New applications are blocked. Renew your account to resume submitting.'}
            </span>
          }
          action={<antd.Button size="small" danger onClick={() => nav('account-renewal')}>{lang === 'bm' ? 'Baharu Akaun' : 'Renew Account'}</antd.Button>}
        />
      )}
      {!graceMode && acctExpiring && (
        <antd.Alert
          type="warning"
          showIcon
          style={{ marginBottom: 20 }}
          message={<span><strong>{lang === 'bm' ? `Pendaftaran akaun tamat dalam ${acctDaysLeft} hari` : `Account registration expiring in ${acctDaysLeft} days`}</strong> — {ACCT_EXPIRY.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}. {lang === 'bm' ? 'Mohon pembaharuan sekarang untuk mengelak gangguan perkhidmatan.' : 'Renew now to avoid service disruption.'}</span>}
          action={<antd.Button size="small" onClick={() => nav('account-renewal')}>{lang === 'bm' ? 'Baharu Akaun' : 'Renew Account'}</antd.Button>}
          closable
        />
      )}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>
          {lang === 'bm' ? 'Papan Pemuka Pembekal' : 'Supplier Dashboard'} · {MOCK.currentUser.supplierId}
        </div>
        <Title level={2} style={{ margin: '4px 0 0', fontWeight: 600 }}>
          {lang === 'bm' ? `${T('dash_welcome')}, ${MOCK.currentUser.name.split(' ')[0]}` : `Welcome back, ${MOCK.currentUser.name.split(' ')[0]}`}
        </Title>
        <Text type="secondary">{lang === 'bm' ? 'Axiata Digital Sdn Bhd · Pembekal aktif sejak Jan 2024' : 'Axiata Digital Sdn Bhd · Active supplier since Jan 2024'}</Text>
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
          <Card title={T('dash_recent')} extra={<Button type="link" onClick={() => nav('applications')}>{T('dash_view_all')} →</Button>} bordered>
            <List
              dataSource={recent}
              renderItem={(a) => (
                <List.Item
                  actions={[<StatusPill status={a.status} lang={lang} />, <Button type="link" size="small" onClick={() => nav('officer-review')}>{T('apps_open')}</Button>]}
                  style={{ padding: '12px 0' }}
                >
                  <List.Item.Meta
                    title={<Space><SchemeBadge scheme={a.scheme} /><Text strong>{a.product}</Text></Space>}
                    description={<Text type="secondary" style={{ fontSize: 12 }}>{a.id} · {a.brand} {a.model} · {lang === 'bm' ? 'Dikemaskini' : 'Updated'} {dayjs(a.updated).fromNow?.() || '2 days ago'}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={T('dash_quick_actions')} bordered style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              <antd.Tooltip title={suspendedMode ? 'Account suspended — contact MCMC' : graceMode ? (lang === 'bm' ? 'Pembaharuan akaun diperlukan' : 'Account renewal required') : ''}>
                <Button block type="primary" size="large" disabled={!!graceMode || !!suspendedMode}
                  onClick={() => suspendedMode ? setSuspendedModal(true) : nav('sdoc-wizard')}>{T('dash_new_sdoc')}</Button>
              </antd.Tooltip>
              <antd.Tooltip title={suspendedMode ? 'Account suspended — contact MCMC' : graceMode ? (lang === 'bm' ? 'Pembaharuan akaun diperlukan' : 'Account renewal required') : ''}>
                <Button block size="large" disabled={!!graceMode || !!suspendedMode}
                  onClick={() => suspendedMode ? setSuspendedModal(true) : nav('special-approval')}>{T('dash_new_sa')}</Button>
              </antd.Tooltip>
              <antd.Tooltip title={suspendedMode ? 'Account suspended — contact MCMC' : ''}>
                <Button block size="large" disabled={!!suspendedMode}
                  onClick={() => suspendedMode ? setSuspendedModal(true) : nav('imei-register')}>{lang === 'bm' ? '+ Daftar IMEI / S/N' : '+ Register IMEI / SN'}</Button>
              </antd.Tooltip>
              <Button block size="large" onClick={() => nav('cert-renewal')}>{T('dash_new_renewal')}</Button>
              <Button block size="large" onClick={() => nav('account-renewal')}>{T('dash_new_account_renewal')}</Button>
            </Space>
          </Card>
          <antd.Modal open={suspendedModal} onCancel={() => setSuspendedModal(false)} footer={[
            <antd.Button key="contact" type="primary" danger href="mailto:cppg@mcmc.gov.my">Contact MCMC (cppg@mcmc.gov.my)</antd.Button>,
            <antd.Button key="ok" onClick={() => setSuspendedModal(false)}>Close</antd.Button>,
          ]} title={<antd.Space><antd.Tag color="red">Account Suspended</antd.Tag></antd.Space>}>
            <antd.Result status="error" style={{ padding: '12px 0' }}
              title="New applications are blocked"
              subTitle={<span>Your account has been <strong>suspended by MCMC</strong> under §5.10.2 of the NCEF framework. You cannot submit new SDoC applications, Special Approvals, or register IMEI / Serial Numbers until the suspension is lifted.<br /><br />Certificate renewals and account information remain accessible.<br /><br />Reference your <strong>Account ID: {MOCK.currentUser?.supplierId || 'SUP-0426-00142'}</strong> when contacting MCMC.</span>}
            />
          </antd.Modal>
          {/* Certificate Health widget */}
          <Card bordered bodyStyle={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 12 }}>{lang === 'bm' ? 'Kesihatan Sijil' : 'Certificate Health'}</div>
            {(() => {
              const certs = MOCK.certificates || [];
              const active   = certs.filter(c => c.status === 'active').length;
              const expiring = certs.filter(c => c.status === 'expiring').length;
              const expired  = certs.filter(c => c.status === 'expired').length;
              const nextExp  = [...certs].filter(c => c.expires).sort((a,b) => new Date(a.expires)-new Date(b.expires))[0];
              const daysToNext = nextExp ? Math.ceil((new Date(nextExp.expires) - new Date('2026-05-06')) / 864e5) : null;
              return (
                <>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    {[{l: lang === 'bm' ? 'Aktif' : 'Active', v: active, c: 'var(--color-success)'}, {l: lang === 'bm' ? 'Akan Tamat' : 'Expiring', v: expiring, c: 'var(--color-warning)'}, {l: lang === 'bm' ? 'Tamat' : 'Expired', v: expired, c: 'var(--color-danger)'}].map(s => (
                      <div key={s.l} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', background: 'var(--color-bg-subtle)', borderRadius: 8 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: s.c }}>{s.v}</div>
                        <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  {daysToNext !== null && daysToNext <= 90 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '6px 8px', background: daysToNext <= 30 ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)', borderRadius: 6 }}>
                      <span style={{ color: daysToNext <= 30 ? 'var(--color-danger)' : 'var(--color-warning)', fontWeight: 600 }}>
                        ⏰ {lang === 'bm' ? 'Tamat dalam' : 'Expires in'} {daysToNext}d
                      </span>
                      <Text style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{nextExp?.product?.slice(0, 20)}</Text>
                    </div>
                  )}
                  <Button block size="small" style={{ marginTop: 10 }} onClick={() => nav('certificates')}>{lang === 'bm' ? 'Urus Sijil →' : 'Manage Certificates →'}</Button>
                </>
              );
            })()}
          </Card>

          {/* Activity feed */}
          <Card title={lang === 'bm' ? 'Aktiviti Terkini' : 'Recent Activity'}
            bordered
            extra={<Button type="link" size="small" onClick={() => nav('notifications')}>{lang === 'bm' ? 'Lihat semua' : 'View all'}</Button>}>
            {(MOCK.notifications || []).slice(0, 5).map((n, i) => {
              const catColor = { iteration: 'var(--color-warning)', payment: 'var(--color-success)', approved: 'var(--color-success)', expiry: 'var(--color-warning)', rejected: 'var(--color-danger)', system: 'var(--color-info)' };
              const catIcon  = { iteration: '⚠️', payment: '✅', approved: '🏅', expiry: '⏰', rejected: '❌', system: 'ℹ️' };
              const daysAgo  = Math.floor((new Date('2026-05-06') - new Date(n.ts)) / 864e5);
              const timeStr  = daysAgo === 0 ? (lang === 'bm' ? 'Hari ini' : 'Today') : daysAgo === 1 ? (lang === 'bm' ? 'Semalam' : 'Yesterday') : `${daysAgo}d ago`;
              return (
                <div key={n.id} onClick={() => nav('notifications')}
                  style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--color-divider)' : 'none', cursor: 'pointer' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${catColor[n.cat]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{catIcon[n.cat]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: n.read ? 400 : 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 1 }}>{timeStr}</div>
                  </div>
                  {!n.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', marginTop: 4, flexShrink: 0 }} />}
                </div>
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// ============ OFFICER ALL-APPLICATIONS VIEW ============
function OfficerAllApplications({ nav, currentUser }) {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [schemeFilter, setSchemeFilter] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [bulkOpen, setBulkOpen] = React.useState(false);

  const isLead = currentUser?.role === 'team-lead' || currentUser?.role === 'approver';

  // Expand mock data to simulate cross-supplier entries
  const allOfficerApps = [
    ...MOCK.assessments.map(a => ({ ...a, applicant: 'Axiata Digital Sdn Bhd', supplierId: 'SUP-0426-00142' })),
    { id: 'APP-0426-00091', product: 'OPPO Find X7 Ultra', brand: 'OPPO', model: 'X7U', scheme: 'A', status: 'under_review', aiScore: 81, submitted: '2026-04-10', updated: '2026-04-11', applicant: 'OPPO Malaysia Sdn Bhd', supplierId: 'SUP-0621-00091' },
    { id: 'APP-0426-00092', product: 'Xiaomi 14 Ultra', brand: 'Xiaomi', model: 'MI-14U', scheme: 'B', status: 'under_review', aiScore: 74, submitted: '2026-04-12', updated: '2026-04-13', applicant: 'Xiaomi Technology MY', supplierId: 'SUP-0823-00210' },
    { id: 'APP-0426-00094', product: 'TP-Link Deco BE85', brand: 'TP-Link', model: 'Deco-BE85', scheme: 'C', status: 'approved', aiScore: 96, submitted: '2026-03-28', updated: '2026-03-28', applicant: 'TP-Link Technology Sdn Bhd', supplierId: 'SUP-0621-00090' },
    { id: 'APP-0426-00095', product: 'Huawei Band 8', brand: 'Huawei', model: 'BAND8', scheme: 'B', status: 'iteration_required', aiScore: 68, submitted: '2026-04-05', updated: '2026-04-08', applicant: 'Huawei Technologies (M) Sdn Bhd', supplierId: 'SUP-0224-00142' },
  ];

  const byStatus = statusFilter === 'all' ? allOfficerApps : allOfficerApps.filter(a => a.status === statusFilter);
  const byScheme = schemeFilter.length ? byStatus.filter(a => schemeFilter.includes(a.scheme)) : byStatus;
  const filtered = search ? byScheme.filter(a => [a.id, a.product, a.brand, a.applicant, a.supplierId].join(' ').toLowerCase().includes(search.toLowerCase())) : byScheme;

  function exportSelected() {
    const rows = (selectedRows.length ? allOfficerApps.filter(a => selectedRows.includes(a.id)) : filtered);
    const header = ['App ID', 'Applicant', 'Product', 'Scheme', 'Status', 'AI Score', 'Submitted'];
    const csv = [header, ...rows.map(a => [a.id, a.applicant, a.product, a.scheme, a.status, a.aiScore ?? '', new Date(a.submitted).toLocaleDateString('en-GB')])].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const el = document.createElement('a'); el.href = URL.createObjectURL(blob); el.download = 'ncef-all-applications.csv'; el.click();
    antd.message.success(`Exported ${rows.length} rows`);
  }

  const statusCounts = { all: allOfficerApps.length };
  ['under_review','approved','iteration_required','rejected','draft'].forEach(s => { statusCounts[s] = allOfficerApps.filter(a => a.status === s).length; });

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Officer View</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>All Applications</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Cross-supplier master list — {allOfficerApps.length} total applications</antd.Typography.Text>
        </div>
        <antd.Space>
          {selectedRows.length > 0 && (
            <antd.Dropdown menu={{ items: [
              { key: 'export', label: `Export selected (${selectedRows.length})`, onClick: exportSelected },
              { key: 'assign', label: 'Bulk assign to officer…', disabled: !isLead, onClick: () => setBulkOpen(true) },
              { key: 'flag',   label: 'Flag for priority review', onClick: () => { antd.message.success(`${selectedRows.length} applications flagged`); setSelectedRows([]); } },
            ]}}>
              <antd.Button type="primary">{selectedRows.length} selected ▾</antd.Button>
            </antd.Dropdown>
          )}
          <antd.Button icon={<DownloadOutlined />} onClick={exportSelected}>Export CSV</antd.Button>
        </antd.Space>
      </div>

      {/* Filters */}
      <antd.Card bordered style={{ marginBottom: 16 }}>
        <antd.Row gutter={[12, 12]} align="middle">
          <antd.Col flex="auto">
            <antd.Input placeholder="Search application ID, product, applicant, supplier ID…" prefix={<SearchOutlined />} value={search} onChange={e => setSearch(e.target.value)} allowClear />
          </antd.Col>
          <antd.Col>
            <antd.Select placeholder="Status" style={{ width: 160 }} value={statusFilter} onChange={setStatusFilter} options={[
              { value: 'all', label: `All (${statusCounts.all})` },
              { value: 'under_review', label: `Under Review (${statusCounts.under_review})` },
              { value: 'approved', label: `Approved (${statusCounts.approved})` },
              { value: 'iteration_required', label: `Iteration Req. (${statusCounts.iteration_required})` },
              { value: 'rejected', label: `Rejected (${statusCounts.rejected})` },
              { value: 'draft', label: `Draft (${statusCounts.draft})` },
            ]} />
          </antd.Col>
          <antd.Col>
            <antd.Select placeholder="Scheme" mode="multiple" style={{ width: 180 }} value={schemeFilter} onChange={setSchemeFilter} options={['A','B','C','SA'].map(s => ({ value: s, label: `Scheme ${s}` }))} maxTagCount={2} />
          </antd.Col>
        </antd.Row>
      </antd.Card>

      <antd.Table
        rowKey="id"
        dataSource={filtered}
        pagination={{ pageSize: 10, showTotal: (t, r) => `${r[0]}–${r[1]} of ${t}` }}
        scroll={{ x: 'max-content' }}
        rowSelection={isLead ? { selectedRowKeys: selectedRows, onChange: setSelectedRows } : undefined}
        columns={[
          { title: 'App ID',    dataIndex: 'id',        width: 160, render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
          { title: 'Applicant', dataIndex: 'applicant', width: 210, ellipsis: true, render: (v, r) => <div><div style={{ fontWeight: 600, fontSize: 12 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.supplierId}</div></div> },
          { title: 'Product',   width: 200, ellipsis: true, render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div></div> },
          { title: 'Scheme',    dataIndex: 'scheme',    width: 90,  render: s => <SchemeBadge scheme={s} /> },
          { title: 'Status',    dataIndex: 'status',    width: 160, render: s => <StatusPill status={s} /> },
          { title: 'AI Score',  dataIndex: 'aiScore',   width: 100, align: 'right', render: v => v != null ? <antd.Tag color={v >= 90 ? 'green' : v >= 70 ? 'orange' : 'red'}>{v}</antd.Tag> : <span style={{ color: 'var(--color-text-muted)' }}>—</span> },
          { title: 'Submitted', dataIndex: 'submitted', width: 120, render: v => <span style={{ whiteSpace: 'nowrap', fontSize: 12 }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span> },
          { title: '', width: 80, render: () => <antd.Button size="small" onClick={() => nav('officer-review')}>Review</antd.Button> },
        ]}
      />

      {/* Bulk assign modal */}
      <antd.Modal open={bulkOpen} onCancel={() => setBulkOpen(false)} title={`Bulk Assign — ${selectedRows.length} applications`} okText="Assign" onOk={() => { antd.message.success(`${selectedRows.length} applications assigned`); setSelectedRows([]); setBulkOpen(false); }} width={440}>
        <antd.Form layout="vertical" style={{ marginTop: 12 }}>
          <antd.Form.Item label="Assign to officer">
            <antd.Select placeholder="Select officer…" options={(MOCK.officerPerformance || []).map(o => ({ value: o.id, label: `${o.name} — ${o.pending} pending` }))} />
          </antd.Form.Item>
          <antd.Form.Item label="Note (optional)">
            <antd.Input.TextArea rows={3} placeholder="Reason for bulk assignment…" />
          </antd.Form.Item>
        </antd.Form>
      </antd.Modal>
    </div>
  );
}

// ============ APPLICATIONS LIST ============
SCREENS.applications = function Applications({ nav, lang: _lang, currentUser }) {
  const lang = _lang || 'en';
  const T = (k) => window.t(lang, k);
  const isOfficer = currentUser && currentUser.role !== 'supplier';
  if (isOfficer) return <OfficerAllApplications nav={nav} currentUser={currentUser} />;

  const FilterOutlined = icons.FilterOutlined || icons.SearchOutlined;
  const [typeTab, setTypeTab] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [schemeFilter, setSchemeFilter] = React.useState([]);
  const [aiFilter, setAiFilter] = React.useState('all');
  const [showAdv, setShowAdv] = React.useState(false);
  const [extModal, setExtModal] = React.useState(null);
  const [extReason, setExtReason] = React.useState('');
  const [extDays, setExtDays] = React.useState(7);
  const [extSent, setExtSent] = React.useState({});
  const all = MOCK.assessments;

  function appType(a) {
    if (a.scheme === 'SA') return 'sa';
    if (a.scheme === 'IMEI') return 'imei';
    if (a.scheme === 'REN') return 'renewal';
    return 'sdoc';
  }

  const byType   = typeTab === 'all' ? all : all.filter(a => appType(a) === typeTab);
  const byStatus = statusFilter === 'all' ? byType : byType.filter(a => a.status === statusFilter);
  const byScheme = schemeFilter.length ? byStatus.filter(a => schemeFilter.includes(a.scheme)) : byStatus;
  const byAi     = aiFilter === 'all'     ? byScheme
                 : aiFilter === 'ok'      ? byScheme.filter(a => a.aiScore >= 90)
                 : aiFilter === 'review'  ? byScheme.filter(a => a.aiScore != null && a.aiScore < 90)
                 : byScheme.filter(a => a.aiScore == null);
  const filtered = search
    ? byAi.filter(a => [a.id, a.product, a.brand, a.model].join(' ').toLowerCase().includes(search.toLowerCase()))
    : byAi;

  const TODAY_APPS = new Date('2026-05-05');
  const DRAFT_LAPSE_DAYS = 60;

  function draftDaysLeft(a) {
    if (a.status !== 'draft') return null;
    const updated = new Date(a.updated);
    const lapseDate = new Date(updated.getTime() + DRAFT_LAPSE_DAYS * 864e5);
    return Math.ceil((lapseDate - TODAY_APPS) / 864e5);
  }

  const sdocCount = all.filter(a => appType(a) === 'sdoc').length;
  const saCount   = all.filter(a => appType(a) === 'sa').length;
  const iterCount = all.filter(a => a.status === 'iteration_required').length;
  const draftCount = all.filter(a => a.status === 'draft').length;
  const expiringDrafts = all.filter(a => { const d = draftDaysLeft(a); return d !== null && d <= 14; });
  const advCount  = schemeFilter.length + (aiFilter !== 'all' ? 1 : 0);

  const statusOptions = [
    { label: T('apps_status_all'),                             value: 'all' },
    { label: `${T('apps_status_draft')} (${draftCount})`,     value: 'draft' },
    { label: T('apps_status_review'),                          value: 'under_review' },
    { label: `${T('apps_status_iteration')} (${iterCount})`,  value: 'iteration_required' },
    { label: T('apps_status_approved'),                        value: 'approved' },
    { label: T('apps_status_rejected'),                        value: 'rejected' },
  ];

  const cols = [
    { title: T('apps_col_id'), dataIndex: 'id', width: 160, render: v => <Text code style={{ fontSize: 12 }}>{v}</Text> },
    { title: T('apps_col_type'), width: 130, render: (_, r) => (
      <antd.Space direction="vertical" size={2}>
        <Tag style={{ fontSize: 11 }}>{r.scheme === 'SA' ? (lang === 'bm' ? 'Kelulusan Khas' : 'Special Approval') : r.scheme === 'REN' ? (lang === 'bm' ? 'Pembaharuan' : 'Renewal') : r.scheme === 'IMEI' ? 'IMEI' : `Skim ${r.scheme}`}</Tag>
        <Text style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
          {appType(r) === 'sa' ? (lang === 'bm' ? 'Kelulusan Khas' : 'Special Approval') : appType(r) === 'renewal' ? (lang === 'bm' ? 'Pembaharuan' : 'Renewal') : 'SDoC'}
        </Text>
      </antd.Space>
    )},
    { title: T('apps_col_product'), width: 220, render: (_, r) => (
      <div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{r.product}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div>
      </div>
    )},
    { title: T('apps_col_validation'), dataIndex: 'aiScore', width: 130, render: s =>
      !s ? <Text type="secondary" style={{ fontSize: 12 }}>{lang === 'bm' ? 'Menunggu' : 'Pending'}</Text>
      : s >= 90 ? <Tag color="green" icon={<CheckCircleOutlined />}>{lang === 'bm' ? 'Tiada isu' : 'No issues'}</Tag>
      : <Tag color="orange" icon={<WarningOutlined />}>{lang === 'bm' ? 'Perlu semak' : 'Items to review'}</Tag>
    },
    { title: T('apps_col_status'), dataIndex: 'status', width: 150, render: (s, r) => {
      const dl = draftDaysLeft(r);
      return (
        <antd.Space direction="vertical" size={2}>
          <StatusPill status={s} lang={lang} />
          {dl !== null && dl <= 30 && (
            <antd.Tag color={dl <= 7 ? 'red' : dl <= 14 ? 'orange' : 'gold'} style={{ fontSize: 10 }}>
              {lang === 'bm' ? `Luput dalam ${dl}h` : `Lapses in ${dl}d`}
            </antd.Tag>
          )}
        </antd.Space>
      );
    }},
    { title: 'Updated', dataIndex: 'updated', width: 100, render: v =>
      <Text style={{ fontSize: 12 }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</Text>
    },
    { title: '', width: 180, render: (_, r) => (
      <antd.Space size={4} wrap>
        {r.status === 'iteration_required' && (
          <Button size="small" type="primary" icon={<ReloadOutlined />} onClick={() => nav('iteration-reply')}
            style={{ background: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
            Respond
          </Button>
        )}
        {r.status === 'iteration_required' && !extSent[r.id] && (
          <Button size="small" onClick={() => { setExtModal(r); setExtReason(''); setExtDays(7); }}>
            {T('apps_ext_request')}
          </Button>
        )}
        {r.status === 'iteration_required' && extSent[r.id] && (
          <Tag color="blue" style={{ fontSize: 10 }}>{lang === 'bm' ? 'Lanjutan Dimohon' : 'Extension Requested'}</Tag>
        )}
        <Button size="small" onClick={() => nav('application-detail')}>{T('apps_open')}</Button>
      </antd.Space>
    )},
  ];

  const typeTabs = [
    { key: 'all',     label: <span>{lang === 'bm' ? 'Semua' : 'All'} <antd.Badge count={all.length} style={{ backgroundColor: 'var(--color-text-muted)', marginLeft: 4 }} /></span> },
    { key: 'sdoc',    label: <span>SDoC <antd.Badge count={sdocCount} style={{ backgroundColor: 'var(--color-primary)', marginLeft: 4 }} /></span> },
    { key: 'sa',      label: <span>{lang === 'bm' ? 'Kelulusan Khas' : 'Special Approval'} <antd.Badge count={saCount} color="purple" style={{ marginLeft: 4 }} /></span> },
    { key: 'renewal', label: <span>{lang === 'bm' ? 'Pembaharuan' : 'Renewals'} <antd.Badge count={all.filter(a => appType(a) === 'renewal').length} color="cyan" style={{ marginLeft: 4 }} /></span> },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>{lang === 'bm' ? 'Permohonan' : 'Applications'}</div>
          <Title level={3} style={{ margin: '4px 0 0' }}>{T('apps_title')}</Title>
        </div>
        <Space wrap>
          <Input.Search placeholder={T('apps_search')} style={{ width: 240 }}
            value={search} onChange={e => setSearch(e.target.value)} allowClear />
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 170 }} options={statusOptions} />
          <antd.Badge count={advCount} size="small">
            <Button icon={<FilterOutlined />} type={advCount > 0 ? 'primary' : 'default'}
              onClick={() => setShowAdv(v => !v)}>
              {lang === 'bm' ? 'Penapis' : 'Filters'}
            </Button>
          </antd.Badge>
          <antd.Dropdown menu={{ items:[
            { key:'csv', label:'Export CSV', icon:<icons.DownloadOutlined />, onClick:() => {
              const header=['ID','Scheme','Product','Brand','Model','Status','Updated'];
              const rows=[header,...filtered.map(r=>[r.id,r.scheme,r.product,r.brand,r.model,r.status,r.updated].map(v=>`"${String(v||'').replace(/"/g,'""')}"`)  )];
              const blob=new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'});
              const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(blob),download:'ncef-applications.csv'});
              a.click(); antd.message.success(lang === 'bm' ? 'Dieksport' : 'Applications exported');
            }},
          ]}} trigger={['click']}>
            <Button icon={<DownloadOutlined />}>{T('apps_export')} <span style={{fontSize:10,marginLeft:2}}>▾</span></Button>
          </antd.Dropdown>
          <Button type="primary" onClick={() => nav('sdoc-wizard')}>{T('apps_new_sdoc')}</Button>
        </Space>
      </div>

      {showAdv && (
        <Card size="small" bordered style={{ marginBottom: 16, background: 'var(--color-bg-elevated)' }}>
          <Space wrap size={[24, 8]} align="center">
            <Space size={8} align="center">
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Scheme</span>
              <antd.Checkbox.Group value={schemeFilter} onChange={setSchemeFilter}
                options={[
                  { label: 'Scheme A', value: 'A' },
                  { label: 'Scheme B', value: 'B' },
                  { label: 'Scheme C', value: 'C' },
                  { label: 'Special Approval', value: 'SA' },
                ]}
              />
            </Space>
            <Space size={8} align="center">
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Validation</span>
              <Select value={aiFilter} onChange={setAiFilter} size="small" style={{ width: 160 }} options={[
                { label: 'All', value: 'all' },
                { label: 'No issues (≥90)', value: 'ok' },
                { label: 'Items to review', value: 'review' },
                { label: 'Pending', value: 'pending' },
              ]} />
            </Space>
            {advCount > 0 && (
              <Button size="small" type="link" style={{ padding: 0 }}
                onClick={() => { setSchemeFilter([]); setAiFilter('all'); }}>
                Clear filters
              </Button>
            )}
          </Space>
        </Card>
      )}

      {expiringDrafts.length > 0 && (
        <antd.Alert type="error" showIcon style={{ marginBottom: 8 }}
          message={`${expiringDrafts.length} draft${expiringDrafts.length > 1 ? 's' : ''} will auto-lapse soon`}
          description={`Unsubmitted drafts are auto-cancelled after ${DRAFT_LAPSE_DAYS} days of inactivity. Submit or update these drafts to avoid losing your progress.`}
          action={<Button size="small" danger onClick={() => { setStatusFilter('draft'); setTypeTab('all'); }}>View Drafts</Button>}
        />
      )}

      {iterCount > 0 && (
        <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }}
          message={`${iterCount} application${iterCount > 1 ? 's' : ''} require${iterCount === 1 ? 's' : ''} your attention`}
          description="MCMC has returned these applications for amendment. Please respond before the iteration deadline to avoid rejection."
          action={<Button size="small" onClick={() => setStatusFilter('iteration_required')}>View</Button>}
        />
      )}

      <Card bordered>
        <antd.Tabs activeKey={typeTab} onChange={k => { setTypeTab(k); setStatusFilter('all'); }} items={typeTabs} style={{ marginBottom: 8 }} />
        <Table
          rowKey="id"
          columns={cols}
          dataSource={filtered}
          size="middle"
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 8, showSizeChanger: false, showTotal: (t, r) => `${r[0]}-${r[1]} of ${t}` }}
          locale={{ emptyText: <antd.Empty description="No applications match the current filters" image={antd.Empty.PRESENTED_IMAGE_SIMPLE} /> }}
          rowClassName={r => r.status === 'iteration_required' ? 'ant-table-row-warning' : ''}
        />
      </Card>

      {/* Iteration Extension Request Modal */}
      <antd.Modal
        open={!!extModal}
        title="Request Iteration Period Extension"
        onCancel={() => setExtModal(null)}
        onOk={() => {
          setExtSent(prev => ({ ...prev, [extModal.id]: true }));
          setExtModal(null);
          antd.message.success('Extension request submitted — your officer will review within 1 working day');
        }}
        okText="Submit Request"
        okButtonProps={{ disabled: extReason.trim().length < 10 }}
      >
        {extModal && (
          <div>
            <antd.Alert type="info" showIcon style={{ marginBottom: 16 }}
              message={<span>Requesting extension for <antd.Typography.Text code>{extModal.id}</antd.Typography.Text> — iteration deadline extended if approved by your assigned officer.</span>}
            />
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Additional days needed</div>
              <antd.Select value={extDays} onChange={setExtDays} style={{ width: '100%' }}
                options={[
                  { value: 7,  label: '7 days' },
                  { value: 14, label: '14 days' },
                  { value: 21, label: '21 days' },
                  { value: 30, label: '30 days (maximum)' },
                ]}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Reason for extension <span style={{ color: 'var(--color-danger)' }}>*</span></div>
              <antd.Input.TextArea
                rows={4}
                placeholder="Explain why additional time is needed (e.g. waiting for updated test report from lab, key signatory on leave)…"
                value={extReason}
                onChange={e => setExtReason(e.target.value)}
              />
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>Minimum 10 characters</div>
            </div>
          </div>
        )}
      </antd.Modal>
    </div>
  );
};

// ============ APPLICATION DETAIL (Supplier view) ============
SCREENS['application-detail'] = function ApplicationDetail({ nav, lang: _lang }) {
  const lang = _lang || 'en';
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
            <StatusPill status={a.status} lang={lang} />
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
            {
              key: 'timeline',
              label: 'Status Timeline',
              children: (() => {
                const statusFlow = [
                  {
                    stage: 'Draft',
                    date: '14 Apr 2026',
                    actor: 'Nurul Aisyah binti Ahmad',
                    role: 'Supplier',
                    roleColor: 'blue',
                    note: 'Application created — documents uploaded and declaration signed.',
                    done: true,
                    color: 'gray',
                  },
                  {
                    stage: 'Submitted',
                    date: '16 Apr 2026',
                    actor: 'Nurul Aisyah binti Ahmad',
                    role: 'Supplier',
                    roleColor: 'blue',
                    note: 'SDoC submitted with payment of RM 350. Reference: PAY-0426-00218.',
                    done: true,
                    color: 'blue',
                  },
                  {
                    stage: 'AI Validation',
                    date: '16 Apr 2026',
                    actor: 'NCEF AI Engine (Qwen2.5-VL)',
                    role: 'System',
                    roleColor: 'cyan',
                    note: `AI compliance score: ${a.aiScore}/100 — routed to CPPG officer queue (score < 90).`,
                    done: true,
                    color: 'cyan',
                  },
                  {
                    stage: 'Auto-assigned',
                    date: '16 Apr 2026',
                    actor: 'System',
                    role: 'System',
                    roleColor: 'cyan',
                    note: 'Auto-assigned to En. Faisal Rahman (Team Lead, CPPG-TL-01) based on workload distribution.',
                    done: true,
                    color: 'cyan',
                  },
                  {
                    stage: 'Under Review',
                    date: '17 Apr 2026',
                    actor: 'En. Faisal Rahman',
                    role: 'Team Lead',
                    roleColor: 'purple',
                    note: 'Review commenced. Documents sent for OCR verification.',
                    done: a.status !== 'draft' && a.status !== 'submitted',
                    color: 'purple',
                  },
                  ...(a.status === 'iteration_required' ? [{
                    stage: 'Iteration Requested',
                    date: '19 Apr 2026',
                    actor: 'En. Faisal Rahman',
                    role: 'Team Lead',
                    roleColor: 'purple',
                    note: 'Officer requested amendment: frequency band missing secondary range; standards clause N/A requires justification.',
                    done: true,
                    color: 'orange',
                  }] : []),
                  ...(a.status === 'approved' ? [{
                    stage: 'Approved',
                    date: '22 Apr 2026',
                    actor: 'En. Faisal Rahman',
                    role: 'Team Lead',
                    roleColor: 'purple',
                    note: `Certificate issued — RCN: ${a.rcn || 'RCN-0426-00001'}. Emailed to applicant.`,
                    done: true,
                    color: 'green',
                  }] : []),
                  ...(['draft', 'submitted', 'under_review', 'iteration_required'].includes(a.status) ? [{
                    stage: 'Decision Pending',
                    date: null,
                    actor: null,
                    role: null,
                    roleColor: 'default',
                    note: 'Awaiting officer decision — Approve / Request Iteration / Reject.',
                    done: false,
                    color: 'gray',
                  }] : []),
                ];
                return (
                  <div style={{ paddingTop: 12 }}>
                    <antd.Timeline
                      items={statusFlow.map(s => ({
                        color: s.color,
                        children: (
                          <div style={{ paddingBottom: 8 }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                              <span style={{ fontWeight: 600, fontSize: 13, opacity: s.done ? 1 : 0.5 }}>{s.stage}</span>
                              {s.role && <antd.Tag color={s.roleColor} style={{ fontSize: 10, margin: 0 }}>{s.role}</antd.Tag>}
                              {!s.done && <antd.Tag color="default" style={{ fontSize: 10, margin: 0 }}>Pending</antd.Tag>}
                            </div>
                            {s.date && <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 3 }}>{s.date}{s.actor ? ` · ${s.actor}` : ''}</div>}
                            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', opacity: s.done ? 1 : 0.6 }}>{s.note}</div>
                          </div>
                        ),
                      }))}
                    />
                  </div>
                );
              })(),
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
              ['Status', <StatusPill status={a.status} lang={lang} />],
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
// CoC expiry data for Scheme A certificates (mock — in production this comes from the CoC document)
const COC_EXPIRY = {
  'RCN-0326-00442': '2027-03-31',
  'RCN-0125-00198': '2026-09-30',
};

SCREENS['cert-renewal'] = function CertRenewal({ nav }) {
  const [step, setStep] = React.useState(0);
  const [selectedCert, setSelectedCert] = React.useState(MOCK.certificates.find(c => c.status === 'expiring') || MOCK.certificates[0]);
  const [aiRunning, setAiRunning] = React.useState(false);
  const [aiDone, setAiDone] = React.useState(false);
  const [payMethod, setPayMethod] = React.useState('fpx');
  const [renewPeriod, setRenewPeriod] = React.useState(1);
  const [signed, setSigned] = React.useState(false);
  const [sigName, setSigName] = React.useState('');
  const [sigIc, setSigIc] = React.useState('');
  const [sigChecked, setSigChecked] = React.useState(false);

  const TODAY = new Date('2026-04-19');
  const steps = ['Select Certificate', 'Review Documents', 'Document Re-check', 'Declaration', 'Payment', 'Confirmation'];
  const expiringCerts = MOCK.certificates.filter(c => c.status === 'expiring' || c.status === 'active');
  const baseRateMap = { A: 350, B: 250, C: 150, SA: 350 };
  const baseRate = baseRateMap[selectedCert?.scheme] || 350;

  // Max years the applicant may renew:
  //   - Hard cap: 5 years total. Years already used = full years between issued date and today.
  //   - Scheme A additional cap: renewal cannot extend past CoC expiry date.
  function yearsUsed(cert) {
    if (!cert) return 0;
    const issued = new Date(cert.issued);
    return Math.floor((TODAY - issued) / (365.25 * 864e5));
  }
  function maxRenewYears(cert) {
    if (!cert) return 1;
    const remaining = Math.max(1, 5 - yearsUsed(cert));
    if (cert.scheme === 'A') {
      const cocExp = COC_EXPIRY[cert.rcn];
      if (cocExp) {
        const cocYearsLeft = Math.floor((new Date(cocExp) - TODAY) / (365.25 * 864e5));
        return Math.max(1, Math.min(remaining, cocYearsLeft));
      }
    }
    return remaining;
  }
  const maxYears = maxRenewYears(selectedCert);
  const safeRenewPeriod = Math.min(renewPeriod, maxYears);
  const baseFee = Math.round(baseRate * safeRenewPeriod);
  const fee = baseFee;
  const daysLeft = selectedCert ? Math.ceil((new Date(selectedCert.expires) - TODAY) / 864e5) : 0;
  const cocExpiryDate = selectedCert?.scheme === 'A' ? COC_EXPIRY[selectedCert.rcn] : null;

  React.useEffect(() => {
    if (step === 2 && !aiDone) {
      setAiRunning(true);
      const t = setTimeout(() => { setAiRunning(false); setAiDone(true); }, 2400);
      return () => clearTimeout(t);
    }
  }, [step]);

  const docList = React.useMemo(() => {
    const base = [
      { label: 'Company Registration (SSM)', age: '2024-01-15', reuse: true, expired: false },
      { label: 'Technical Brochure / Datasheet', age: '2026-03-10', reuse: true, expired: false },
      { label: 'Test Report (accredited lab)', age: '2023-04-02', reuse: false, expired: true, note: 'Older than 3 years — must re-upload' },
      { label: 'Product Photos (front, back, label)', age: '2026-03-10', reuse: true, expired: false },
      { label: 'Standards Declaration Letter', age: '2023-04-02', reuse: false, expired: true, note: 'Must be redated for renewal' },
    ];
    if (selectedCert?.scheme === 'A') {
      base.push({ label: 'Certificate of Conformity (CoC)', age: '', reuse: false, expired: true, note: 'Scheme A renewal requires an updated CoC from your accredited Certifying Agency' });
    }
    return base;
  }, [selectedCert?.scheme]);

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
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              Renewal must be initiated within 6 months of expiry. Maximum cumulative registration period is 5 years from the original issue date.
            </Text>
            <div style={{ display: 'grid', gap: 10 }}>
              {expiringCerts.map(c => {
                const days = Math.ceil((new Date(c.expires) - TODAY) / 864e5);
                const coc = c.scheme === 'A' ? COC_EXPIRY[c.rcn] : null;
                const cocDays = coc ? Math.ceil((new Date(coc) - TODAY) / 864e5) : null;
                const maxYr = maxRenewYears(c);
                return (
                  <div key={c.rcn} onClick={() => { setSelectedCert(c); setRenewPeriod(1); setSigned(false); }}
                    style={{ padding: 16, border: `2px solid ${selectedCert?.rcn === c.rcn ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 12, cursor: 'pointer', background: selectedCert?.rcn === c.rcn ? 'var(--color-primary-soft)' : '#fff' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                          <SchemeBadge scheme={c.scheme} />
                          <span style={{ fontWeight: 600 }}>{c.product}</span>
                          <Text type="secondary" style={{ fontSize: 12 }}>{c.brand} · {c.model}</Text>
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Certificate</div>
                            <Text code style={{ fontSize: 11 }}>{c.rcn}</Text>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Current Expiry</div>
                            <Text style={{ fontSize: 12, color: days < 90 ? 'var(--color-warning)' : 'var(--color-text-secondary)', fontWeight: days < 90 ? 600 : 400 }}>
                              {new Date(c.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              {days < 90 && <span> ({days} days)</span>}
                            </Text>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Max Renewal</div>
                            <Text style={{ fontSize: 12, color: maxYr < 3 ? 'var(--color-warning)' : 'var(--color-text-secondary)', fontWeight: 500 }}>
                              {maxYr} year{maxYr !== 1 ? 's' : ''}
                              {c.scheme === 'A' && coc && <span style={{ color: 'var(--color-text-muted)' }}> (CoC limit)</span>}
                            </Text>
                          </div>
                          {coc && (
                            <div>
                              <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>CoC Expiry</div>
                              <Text style={{ fontSize: 12, color: cocDays < 180 ? 'var(--color-warning)' : 'var(--color-text-secondary)', fontWeight: cocDays < 180 ? 600 : 400 }}>
                                {new Date(coc).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
                        {days < 90 && <Tag color="orange" icon={<ClockCircleOutlined />}>Expiring Soon</Tag>}
                        {c.scheme === 'A' && cocDays !== null && cocDays < 180 && <Tag color="red">CoC expiring soon</Tag>}
                        {selectedCert?.rcn === c.rcn && <CheckCircleOutlined style={{ fontSize: 20, color: 'var(--color-primary)' }} />}
                      </div>
                    </div>
                    {c.scheme === 'A' && selectedCert?.rcn === c.rcn && cocDays !== null && cocDays < 365 && (
                      <Alert type="warning" showIcon style={{ marginTop: 12 }}
                        message="Scheme A: CoC expiry limits renewal period"
                        description={`Your Certificate of Conformity expires ${new Date(coc).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}. The renewal period is capped at ${maxYr} year${maxYr !== 1 ? 's' : ''} to match your CoC validity. Upload a renewed CoC if you require a longer registration period.`}
                      />
                    )}
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

        {step === 3 && (() => {
          const canSign = sigName.trim().length > 3 && sigIc.trim().length >= 6 && sigChecked;
          const newExpiry = new Date('2026-04-19');
          newExpiry.setFullYear(newExpiry.getFullYear() + renewPeriod);
          return (
            <div style={{ maxWidth: 760 }}>
              <Alert type="warning" showIcon
                message="Important: This action is irreversible"
                description="By signing this declaration, you confirm that all renewal information is accurate. Once signed, you will not be able to go back to amend your application. Ensure all details are correct before proceeding."
                style={{ marginBottom: 20 }} />
              <Card title="Renewal Summary" size="small" bordered style={{ marginBottom: 16 }}>
                <Row gutter={[16, 10]}>
                  {[
                    ['Certificate (RCN)', selectedCert?.rcn || '—'],
                    ['Equipment', `${selectedCert?.brand} ${selectedCert?.model}`],
                    ['Scheme', `Scheme ${selectedCert?.scheme}`],
                    ['Renewal Period', `${renewPeriod} year${renewPeriod > 1 ? 's' : ''}`],
                    ['New Expiry', newExpiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })],
                    ['Total Fee', `RM ${fee.toLocaleString('en-MY')}`],
                  ].map(([k, v], i) => (
                    <Col span={12} key={i}>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{v}</div>
                    </Col>
                  ))}
                </Row>
                <Divider style={{ margin: '12px 0 8px' }} />
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 6 }}>Renewal duration (max 5 years cumulative):</div>
                <antd.Segmented value={safeRenewPeriod} onChange={v => { setRenewPeriod(v); setSigned(false); }} disabled={signed}
                  options={[1,2,3,4,5].map(y => ({ label: `${y} yr`, value: y, disabled: y > maxYears }))} />
                {maxYears < 5 && (
                  <div style={{ fontSize: 11, color: 'var(--color-warning)', marginTop: 6 }}>
                    Maximum {maxYears} year{maxYears !== 1 ? 's' : ''} available
                    {cocExpiryDate && ` — limited by CoC expiry (${new Date(cocExpiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })})`}
                  </div>
                )}
              </Card>
              <Card title="Statutory Declaration" size="small" bordered style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
                  I, the authorised signatory, hereby declare that:
                </div>
                <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                  {[
                    'All information provided in this renewal application is true and accurate.',
                    'The equipment described continues to comply with the applicable technical standards.',
                    'All supporting documents submitted are authentic and have not been altered or falsified.',
                    'I understand that providing false or misleading information is an offence under the CMA 1998.',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <Alert type="info" showIcon style={{ marginBottom: 14 }}
                  message="Digital Signature Act 1997"
                  description="This digital signature is legally binding under the Digital Signature Act 1997 (Malaysia)." />
                <Row gutter={16}>
                  <Col span={14}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Full Name (as per NRIC / Passport) <span style={{ color: 'var(--color-danger)' }}>*</span></div>
                      <Input placeholder="e.g. Nurul Aisyah binti Ahmad" value={sigName} onChange={e => setSigName(e.target.value)} disabled={signed} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>NRIC / Passport Number <span style={{ color: 'var(--color-danger)' }}>*</span></div>
                      <Input placeholder="e.g. 900101-14-1234" value={sigIc} onChange={e => setSigIc(e.target.value)} disabled={signed} style={{ fontFamily: 'var(--font-mono)' }} />
                    </div>
                  </Col>
                  <Col span={10}>
                    <div style={{ height: '100%', border: '1px dashed var(--color-border)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, background: signed ? 'var(--color-success-bg)' : 'var(--color-bg-subtle)', minHeight: 100 }}>
                      {signed ? (
                        <>
                          <span style={{ fontSize: 28, marginBottom: 6 }}>✅</span>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-success)', textAlign: 'center' }}>Signed</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 4 }}>{sigName}</div>
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: 22, marginBottom: 6, opacity: .4 }}>✍</span>
                          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textAlign: 'center' }}>Signature preview after signing</div>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
                <Checkbox checked={sigChecked} onChange={e => setSigChecked(e.target.checked)} disabled={signed} style={{ fontSize: 13, marginTop: 14 }}>
                  I have read and understand all declarations above, and confirm the information is accurate and complete.
                </Checkbox>
                {!signed && (
                  <Button type="primary" size="large" disabled={!canSign} style={{ marginTop: 14 }} onClick={() => setSigned(true)}>
                    Sign Declaration
                  </Button>
                )}
                {signed && (
                  <Alert type="success" showIcon style={{ marginTop: 14 }}
                    message="Declaration signed successfully"
                    description={`Signed by ${sigName} on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}. You may now proceed to payment.`} />
                )}
              </Card>
            </div>
          );
        })()}

        {step === 4 && (
          <div style={{ maxWidth: 520 }}>
            <Card bordered>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Renewal Fee</div>
              <div style={{ fontSize: 36, fontWeight: 700 }}>RM {fee.toLocaleString('en-MY')}.00</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 20 }}>Scheme {selectedCert?.scheme} · {renewPeriod} yr · {selectedCert?.rcn}</div>
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

        {step === 5 && (() => {
          const newExpiry = new Date('2026-04-19');
          newExpiry.setFullYear(newExpiry.getFullYear() + renewPeriod);
          return (
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
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{newExpiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  </Col>
                  <Col style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Fee Paid</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>RM {fee.toLocaleString('en-MY')}</div>
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center' }}>
                <Button size="large" icon={<DownloadOutlined />}>Download Certificate PDF</Button>
                <Button size="large" type="primary" onClick={() => nav('certificates')}>View Certificates</Button>
              </div>
            </div>
          );
        })()}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-divider)' }}>
          <Button disabled={step === 0 || signed} onClick={() => setStep(step - 1)}>← Back</Button>
          {step < steps.length - 1 && (
            <Button type="primary" size="large" onClick={() => setStep(step + 1)} disabled={(step === 2 && aiRunning) || (step === 3 && !signed)}>
              {step === 3 ? 'Proceed to Payment →'
                : step === 4 ? `Pay RM ${fee.toLocaleString('en-MY')} →`
                : 'Continue →'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

// ============ ACCOUNT REGISTRATION RENEWAL ============
SCREENS['account-renewal'] = function AccountRenewal({ nav }) {
  const TODAY = new Date('2026-05-05');
  const ACCT_EXPIRY = new Date('2026-06-15');
  const ACCT_ISSUED = new Date('2024-01-10');
  const GRACE_END = new Date(ACCT_EXPIRY.getTime() + 6 * 30 * 864e5);

  const yearsUsed = Math.floor((TODAY - ACCT_ISSUED) / (365.25 * 864e5));
  const maxYears = Math.max(1, 5 - yearsUsed);
  const daysLeft = Math.ceil((ACCT_EXPIRY - TODAY) / 864e5);

  const [step, setStep] = React.useState(0);
  const [period, setPeriod] = React.useState(1);
  const [aiRunning, setAiRunning] = React.useState(false);
  const [aiDone, setAiDone] = React.useState(false);
  const [payMethod, setPayMethod] = React.useState('fpx');
  const [confirmed, setConfirmed] = React.useState(false);

  const steps = ['Review Account', 'AI Revalidation', 'Payment', 'Confirmation'];
  const REG_FEE = 100;
  const ANNUAL_FEE = 50;
  const fee = REG_FEE + ANNUAL_FEE * period;
  const newExpiry = new Date(ACCT_EXPIRY.getTime() + period * 365.25 * 864e5);

  React.useEffect(() => {
    if (step === 1 && !aiDone) {
      setAiRunning(true);
      const t = setTimeout(() => { setAiRunning(false); setAiDone(true); }, 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  const p = MOCK.currentUser;

  const profileFields = [
    ['Company Name', 'Axiata Digital Sdn Bhd', 'verified'],
    ['Registration No.', '201901023456 (ROC)', 'verified'],
    ['Category', 'Category A — Commercial', 'verified'],
    ['Supplier ID', 'SUP-0426-00142', 'verified'],
    ['PIC Name', p.name, 'verified'],
    ['PIC Email', p.email, 'verified'],
    ['Company Address', 'Level 5, Axiata Tower, Kuala Lumpur', 'verified'],
    ['Nature of Business', 'Telecommunications Equipment Distribution', 'verified'],
  ];

  return (
    <div style={{ padding: 32, maxWidth: 860, margin: '0 auto' }}>
      <antd.Breadcrumb style={{ marginBottom: 8 }} items={[
        { title: <a onClick={() => nav('dashboard')}>Dashboard</a> },
        { title: 'Account Registration Renewal' },
      ]} />
      <div style={{ margin: '8px 0 24px' }}>
        <antd.Typography.Title level={3} style={{ margin: 0 }}>Account Registration Renewal</antd.Typography.Title>
        <antd.Typography.Text type="secondary">Renew your supplier account registration to maintain access to NCEF services.</antd.Typography.Text>
      </div>

      <antd.Alert
        type={daysLeft <= 30 ? 'error' : 'warning'}
        showIcon
        style={{ marginBottom: 20 }}
        message={<span>Current registration expires <strong>{ACCT_EXPIRY.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong> ({daysLeft} days). Grace period ends {GRACE_END.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} — after which account access is blocked.</span>}
      />

      <div style={{ marginBottom: 28 }}>
        <antd.Steps current={step} size="small" labelPlacement="vertical" responsive items={steps.map(s => ({ title: s }))} />
      </div>

      <antd.Card bordered>
        {/* STEP 0: Review profile */}
        {step === 0 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Review Account Information</antd.Typography.Title>
            <antd.Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              Verify your company details are current before renewing. Contact MCMC if corrections are needed.
            </antd.Typography.Text>

            <antd.Descriptions bordered size="small" column={1} style={{ marginBottom: 20 }}>
              {profileFields.map(([label, value, status]) => (
                <antd.Descriptions.Item key={label} label={label}>
                  <antd.Space>
                    <span>{value}</span>
                    {status === 'verified' && <antd.Tag color="green" style={{ fontSize: 10, margin: 0 }}>Verified</antd.Tag>}
                  </antd.Space>
                </antd.Descriptions.Item>
              ))}
            </antd.Descriptions>

            <antd.Divider />
            <antd.Typography.Title level={5} style={{ marginTop: 0 }}>Renewal Period</antd.Typography.Title>
            <antd.Typography.Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
              You have used {yearsUsed} year{yearsUsed !== 1 ? 's' : ''} — maximum renewal is <strong>{maxYears} year{maxYears !== 1 ? 's' : ''}</strong> (cumulative cap: 5 years).
            </antd.Typography.Text>
            <antd.Segmented
              value={period}
              onChange={setPeriod}
              options={[1, 2, 3, 4, 5].map(y => ({
                value: y,
                label: `${y} yr${y > 1 ? 's' : ''}`,
                disabled: y > maxYears,
              }))}
              style={{ marginBottom: 16 }}
            />
            <antd.Card size="small" style={{ background: 'var(--color-bg-soft, #F8F9FA)', border: '1px solid var(--color-border)' }}>
              <antd.Space split={<antd.Divider type="vertical" />}>
                <span><antd.Typography.Text type="secondary">Registration fee</antd.Typography.Text> <strong>RM {REG_FEE}</strong></span>
                <span><antd.Typography.Text type="secondary">Annual fee</antd.Typography.Text> <strong>RM {ANNUAL_FEE} × {period} yr</strong></span>
                <span><antd.Typography.Text type="secondary">Total</antd.Typography.Text> <strong style={{ color: 'var(--color-primary)', fontSize: 16 }}>RM {fee}</strong></span>
              </antd.Space>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-muted)' }}>
                New expiry: <strong>{newExpiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
              </div>
            </antd.Card>
          </div>
        )}

        {/* STEP 1: AI revalidation */}
        {step === 1 && (
          <div style={{ padding: '16px 0' }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>AI Document Revalidation</antd.Typography.Title>
            {aiRunning ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <antd.Spin size="large" />
                <div style={{ marginTop: 16, color: 'var(--color-text-muted)' }}>Checking your company documents against the latest MCMC standards…</div>
              </div>
            ) : (
              <div>
                <antd.Alert type="success" showIcon message="Revalidation complete — no issues found" style={{ marginBottom: 16 }} />
                <antd.Typography.Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>AI confidence score: <strong style={{ color: 'var(--color-success)' }}>96%</strong> — account is eligible for auto-renewal.</antd.Typography.Text>
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    ['SSM Registration Document', 'Valid until Dec 2027', 'success'],
                    ['Company Address', 'Matches SSM records', 'success'],
                    ['PIC Contact Details', 'Verified', 'success'],
                    ['Nature of Business', 'Consistent with existing profile', 'success'],
                    ['PDPA Consent', 'On file — no refresh required', 'success'],
                  ].map(([doc, note, status]) => (
                    <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 8 }}>
                      <antd.Tag color={status === 'success' ? 'green' : 'orange'} style={{ margin: 0, minWidth: 70, textAlign: 'center' }}>
                        {status === 'success' ? '✓ OK' : 'Review'}
                      </antd.Tag>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{doc}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Payment */}
        {step === 2 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Payment</antd.Typography.Title>
            <antd.Card size="small" style={{ marginBottom: 20, background: 'var(--color-bg-soft, #F8F9FA)' }}>
              <antd.Descriptions size="small" column={1}>
                <antd.Descriptions.Item label="Account Registration Renewal">RM {fee}</antd.Descriptions.Item>
                <antd.Descriptions.Item label="Renewal Period">{period} year{period > 1 ? 's' : ''}</antd.Descriptions.Item>
                <antd.Descriptions.Item label="New Expiry Date">{newExpiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</antd.Descriptions.Item>
                <antd.Descriptions.Item label={<strong>Total</strong>}><strong style={{ color: 'var(--color-primary)', fontSize: 15 }}>RM {fee}</strong></antd.Descriptions.Item>
              </antd.Descriptions>
            </antd.Card>
            <antd.Typography.Text strong style={{ display: 'block', marginBottom: 12 }}>Payment Method</antd.Typography.Text>
            <antd.Radio.Group value={payMethod} onChange={e => setPayMethod(e.target.value)} style={{ width: '100%', display: 'grid', gap: 8 }}>
              {[
                { v: 'fpx', t: 'FPX Online Banking', d: 'Direct debit from your bank account' },
                { v: 'card', t: 'Credit / Debit Card', d: 'Visa, Mastercard, American Express' },
                { v: 'duitnow', t: 'DuitNow QR', d: 'Scan QR with your banking app' },
                { v: 'invoice', t: 'Corporate Invoice', d: 'Generate invoice for account payable (30-day terms)' },
              ].map(o => (
                <antd.Radio key={o.v} value={o.v} style={{ padding: 12, border: `1px solid ${payMethod === o.v ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: payMethod === o.v ? 'var(--color-primary-soft)' : '#fff' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{o.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{o.d}</div>
                </antd.Radio>
              ))}
            </antd.Radio.Group>
          </div>
        )}

        {/* STEP 3: Confirmation */}
        {step === 3 && (
          <antd.Result
            status="success"
            title="Account Successfully Renewed"
            subTitle={
              <div style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
                <antd.Descriptions column={1} size="small" bordered style={{ marginTop: 16 }}>
                  <antd.Descriptions.Item label="Supplier ID"><antd.Typography.Text code>SUP-0426-00142</antd.Typography.Text></antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Renewed For">{period} year{period > 1 ? 's' : ''}</antd.Descriptions.Item>
                  <antd.Descriptions.Item label="New Expiry Date"><strong>{newExpiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</strong></antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Amount Paid">RM {fee}</antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Reference">TXN-{Date.now().toString().slice(-8)}</antd.Descriptions.Item>
                </antd.Descriptions>
                <antd.Alert type="info" showIcon style={{ marginTop: 16 }} message="A confirmation email with your renewal receipt has been sent to nurul.aisyah@axiatadigital.com.my" />
              </div>
            }
            extra={[
              <antd.Button type="primary" key="dash" onClick={() => nav('dashboard')}>Back to Dashboard</antd.Button>,
              <antd.Button key="apps" onClick={() => nav('applications')}>View Applications</antd.Button>,
            ]}
          />
        )}

        {/* Navigation */}
        {step < 3 && (
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
            <antd.Button onClick={() => step === 0 ? nav('dashboard') : setStep(step - 1)}>
              {step === 0 ? 'Cancel' : '← Back'}
            </antd.Button>
            <antd.Button
              type="primary"
              disabled={step === 1 && aiRunning}
              onClick={() => setStep(step + 1)}
            >
              {step === 2 ? `Pay RM ${fee} →` : 'Continue →'}
            </antd.Button>
          </div>
        )}
      </antd.Card>
    </div>
  );
};

Object.assign(window, { SCREENS });
