// screens-l.jsx — Notifications Centre, Iteration Reply, Forgot Password

const {
  BellOutlined, CheckCircleOutlined, ClockCircleOutlined, WarningOutlined,
  CloseCircleOutlined, MailOutlined, LockOutlined, SafetyCertificateOutlined,
  ReloadOutlined, UploadOutlined, FileTextOutlined, InfoCircleOutlined,
  ArrowLeftOutlined, CheckOutlined, RobotOutlined, ExclamationCircleOutlined,
  UserOutlined, KeyOutlined, EyeOutlined, EyeInvisibleOutlined,
} = window.icons;

// ─── Mock data ───────────────────────────────────────────────────────────────
Object.assign(window.MOCK, {
  notifications: [
    { id: 'N001', cat: 'iteration',    read: false, ts: '2026-04-09T13:25:00', appId: 'APP-0426-00083', title: 'Iteration Required — Apple Watch Ultra 3', body: 'Officer En. Faisal has requested changes: missing Wi-Fi 6E secondary band declaration and MTSFB G015:2022 clause justification. Deadline: 4 Jun 2026.' },
    { id: 'N002', cat: 'payment',      read: false, ts: '2026-04-18T14:32:00', appId: 'APP-0426-00087', title: 'Payment Confirmed — RM 1,200.00', body: 'FPX payment for Samsung Galaxy S24 Ultra application has been received. Invoice INV-2026-0418-88 issued.' },
    { id: 'N003', cat: 'approved',     read: true,  ts: '2026-04-10T16:45:00', appId: 'APP-0426-00085', title: 'Certificate Issued — Mi Band 9 Pro', body: 'RCN-0326-00449 issued. Scheme C AI auto-accept (score 94/100). Certificate valid until 9 Apr 2029.' },
    { id: 'N004', cat: 'expiry',       read: false, ts: '2026-04-15T09:00:00', appId: null,             title: 'Certificate Expiring in 60 Days — Samsung Galaxy S23', body: 'RCN-0125-00198 expires on 12 Jun 2026. Initiate renewal now to avoid disruption to your import permits.' },
    { id: 'N005', cat: 'approved',     read: true,  ts: '2026-04-05T12:00:00', appId: 'APP-0426-00079', title: 'Certificate Issued — OPPO Find X7 Ultra', body: 'RCN-0326-00442 issued. Scheme A. Certificate valid until 4 Apr 2029.' },
    { id: 'N006', cat: 'system',       read: true,  ts: '2026-04-01T08:00:00', appId: null,             title: 'Scheduled Maintenance — 5 Apr 2026 02:00–04:00 MYT', body: 'NCEF portal will be unavailable for 2 hours on 5 Apr 2026 for scheduled infrastructure maintenance. Draft applications are auto-saved.' },
    { id: 'N007', cat: 'rejected',     read: true,  ts: '2026-04-08T09:05:00', appId: 'APP-0426-00082', title: 'Application Rejected — Jammer Device (R&D)', body: 'Pn. Rosnah Idris: Prohibited equipment — jammer classification confirmed. Import not permitted for the stated purpose under CMA 1998.' },
    { id: 'N008', cat: 'system',       read: true,  ts: '2026-03-20T09:00:00', appId: null,             title: 'New Fee Schedule Effective 1 Jan 2026', body: 'Updated NCEF Fee Schedule 2026 is now in effect. Scheme A: RM 1,200/yr. Scheme B: RM 2,500/yr. Scheme C: RM 600/yr. Download from Documents.' },
  ],

  iterationApp: {
    id: 'APP-0426-00083', product: 'Apple Watch Ultra 3', brand: 'Apple', model: 'A3145', scheme: 'A',
    submitted: '2026-04-05T10:15:00', aiScore: 62, iterationDue: '2026-06-04',
    iterationRequest: {
      by: 'En. Faisal Rahman', date: '2026-04-09T13:25:00',
      issues: [
        { id: 1, severity: 'error',   text: 'Wi-Fi 6E secondary frequency band (6425–7125 MHz) missing from declared frequency range. Current declaration only covers 2.4 GHz and 5 GHz.' },
        { id: 2, severity: 'error',   text: 'MCMC MTSFB TC G015:2022 — Clause 4.3.1 and 4.3.2 marked "N/A" without supporting justification. Provide written explanation or rectify compliance.' },
        { id: 3, severity: 'warning', text: '"Marketing Name" field left blank. While optional, completing this helps the label registry and avoids delays in customs clearance.' },
      ],
      template: 'standard',
      message: 'Please address the above issues and resubmit within the deadline. Contact CPPG at cppg@mcmc.gov.my if you need clarification on the technical requirements.',
    },
    documents: [
      { name: 'Company_Registration_SSM.pdf',    type: 'Company Registration', size: '2.1 MB', ocrStatus: 'verified' },
      { name: 'Technical_Brochure_A3145.pdf',    type: 'Technical Brochure',   size: '3.4 MB', ocrStatus: 'verified' },
      { name: 'Test_Report_SIRIM_AppleWatch.pdf',type: 'Test Report',          size: '2.2 MB', ocrStatus: 'flagged'  },
      { name: 'Product_Photo_Front.jpg',         type: 'Product Photo',        size: '0.8 MB', ocrStatus: 'verified' },
    ],
  },
});

// ─── Notifications Centre ─────────────────────────────────────────────────────
SCREENS['notifications'] = function NotificationsCentre({ nav }) {
  const [notifs, setNotifs] = React.useState(window.MOCK.notifications);
  const [tab, setTab] = React.useState('all');

  const catIcon  = { iteration: <WarningOutlined />, payment: <CheckCircleOutlined />, approved: <SafetyCertificateOutlined />, expiry: <ClockCircleOutlined />, rejected: <CloseCircleOutlined />, system: <InfoCircleOutlined /> };
  const catColor = { iteration: 'var(--color-warning)', payment: 'var(--color-success)', approved: 'var(--color-success)', expiry: 'var(--color-warning)', rejected: 'var(--color-danger)', system: 'var(--color-info)' };
  const catLabel = { iteration: 'Action Required', payment: 'Payment', approved: 'Certificate', expiry: 'Expiry Alert', rejected: 'Rejected', system: 'System' };

  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  const tabs = [
    { key: 'all',         label: `All (${notifs.length})` },
    { key: 'unread',      label: `Unread (${notifs.filter(n => !n.read).length})` },
    { key: 'iteration',   label: 'Action Required' },
    { key: 'system',      label: 'System' },
  ];

  const visible = notifs.filter(n => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !n.read;
    return n.cat === tab;
  });

  return (
    <div style={{ padding: 32, maxWidth: 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Notifications</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Notification Centre</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Stay informed on your applications, certificates, and system events</antd.Typography.Text>
        </div>
        <antd.Button onClick={markAllRead} icon={<CheckOutlined />}>Mark all read</antd.Button>
      </div>

      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <div style={{ padding: '0 16px', borderBottom: '1px solid var(--color-divider)' }}>
          <antd.Tabs activeKey={tab} onChange={setTab} items={tabs.map(t => ({ key: t.key, label: t.label }))} />
        </div>

        {visible.length === 0 && (
          <antd.Empty description="No notifications" style={{ padding: '48px 0' }} />
        )}

        {visible.map((n, i) => (
          <div
            key={n.id}
            onClick={() => { markRead(n.id); if (n.appId) nav(n.cat === 'iteration' ? 'iteration-reply' : 'applications'); }}
            style={{
              padding: '16px 20px',
              borderBottom: i < visible.length - 1 ? '1px solid var(--color-divider)' : 'none',
              background: n.read ? '#fff' : 'rgba(11,79,145,0.03)',
              cursor: 'pointer',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              transition: 'background .15s',
            }}
          >
            {/* Unread dot */}
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'transparent' : 'var(--color-primary)', marginTop: 6, flexShrink: 0 }} />

            {/* Category icon */}
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${catColor[n.cat]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: catColor[n.cat], fontSize: 16, flexShrink: 0 }}>
              {catIcon[n.cat]}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                <div style={{ fontWeight: n.read ? 500 : 700, fontSize: 14, lineHeight: 1.3 }}>{n.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <antd.Tag color={n.cat === 'iteration' ? 'orange' : n.cat === 'approved' ? 'green' : n.cat === 'rejected' ? 'red' : n.cat === 'expiry' ? 'gold' : 'default'} style={{ margin: 0, fontSize: 10 }}>
                    {catLabel[n.cat]}
                  </antd.Tag>
                  <span style={{ fontSize: 11, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(n.ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{n.body}</div>
              {n.cat === 'iteration' && !n.read && (
                <antd.Button
                  size="small" type="primary" style={{ marginTop: 10 }}
                  onClick={e => { e.stopPropagation(); markRead(n.id); nav('iteration-reply'); }}
                >
                  Respond to Iteration →
                </antd.Button>
              )}
            </div>
          </div>
        ))}
      </antd.Card>

      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Notifications are retained for 90 days · Manage preferences in <antd.Typography.Link onClick={() => nav('profile')}>Profile & Settings</antd.Typography.Link>
      </div>
    </div>
  );
};

// ─── Iteration Reply ──────────────────────────────────────────────────────────
SCREENS['iteration-reply'] = function IterationReply({ nav }) {
  const app = window.MOCK.iterationApp;
  const req = app.iterationRequest;
  const [step, setStep] = React.useState(0);
  const [reply, setReply] = React.useState('');
  const [uploading, setUploading] = React.useState({});
  const [revised, setRevised] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const steps = ['Review Feedback', 'Upload Revisions', 'Confirm & Resubmit'];
  const daysLeft = Math.ceil((new Date(app.iterationDue) - new Date('2026-04-27')) / 86400000);

  const simulateUpload = (docKey) => {
    setUploading(u => ({ ...u, [docKey]: true }));
    setTimeout(() => {
      setUploading(u => ({ ...u, [docKey]: false }));
      setRevised(r => ({ ...r, [docKey]: true }));
    }, 1200);
  };

  if (submitted) {
    return (
      <div style={{ padding: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: 'var(--color-primary)', marginBottom: 24 }}>✓</div>
        <antd.Typography.Title level={3}>Revision Submitted</antd.Typography.Title>
        <antd.Typography.Text type="secondary" style={{ fontSize: 15, maxWidth: 480, lineHeight: 1.6 }}>
          Your revised application <antd.Typography.Text code>{app.id}</antd.Typography.Text> has been resubmitted. The officer will review your changes and respond within the SLA window.
        </antd.Typography.Text>
        <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Application ID</div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', marginTop: 4 }}>{app.id}</div>
          <antd.Tag color="blue" style={{ marginTop: 8 }}>Under Review</antd.Tag>
        </div>
        <antd.Button type="primary" size="large" style={{ marginTop: 32 }} onClick={() => nav('applications')}>Back to My Applications</antd.Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <antd.Breadcrumb style={{ marginBottom: 8 }} items={[
        { title: <a onClick={() => nav('applications')}>My Applications</a> },
        { title: <antd.Typography.Text code style={{ fontSize: 12 }}>{app.id}</antd.Typography.Text> },
        { title: 'Respond to Iteration' },
      ]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '8px 0 24px' }}>
        <div>
          <antd.Typography.Title level={3} style={{ margin: 0 }}>Respond to Iteration Request</antd.Typography.Title>
          <antd.Typography.Text type="secondary">{app.product} · {app.brand} {app.model} · Scheme {app.scheme}</antd.Typography.Text>
        </div>
        <antd.Tag color={daysLeft < 14 ? 'red' : 'orange'} style={{ fontSize: 13, padding: '4px 10px', fontWeight: 600 }}>
          <ClockCircleOutlined style={{ marginRight: 4 }} />{daysLeft} days remaining (due {app.iterationDue})
        </antd.Tag>
      </div>

      <antd.Steps current={step} size="small" labelPlacement="vertical" responsive style={{ marginBottom: 24 }}
        items={steps.map(s => ({ title: s }))} />

      <antd.Card bordered>
        {/* ── STEP 0: Review Feedback ── */}
        {step === 0 && (
          <div>
            <antd.Alert
              type="warning" showIcon
              message={<b>Iteration Requested by {req.by} on {new Date(req.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</b>}
              description="Please review and address all issues below before resubmitting. AI score was 62/100."
              style={{ marginBottom: 24 }}
            />

            <antd.Typography.Title level={5} style={{ marginBottom: 16 }}>Issues to Address</antd.Typography.Title>
            <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
              {req.issues.map((issue, i) => (
                <div key={issue.id} style={{
                  padding: 16, borderRadius: 10,
                  border: `1.5px solid ${issue.severity === 'error' ? 'var(--color-danger)' : 'var(--color-warning)'}`,
                  background: issue.severity === 'error' ? 'rgba(198,40,40,0.04)' : 'rgba(184,114,0,0.04)',
                  display: 'flex', gap: 12,
                }}>
                  <div style={{ color: issue.severity === 'error' ? 'var(--color-danger)' : 'var(--color-warning)', fontSize: 18, flexShrink: 0, marginTop: 2 }}>
                    {issue.severity === 'error' ? <CloseCircleOutlined /> : <WarningOutlined />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <antd.Tag color={issue.severity === 'error' ? 'red' : 'gold'} style={{ marginBottom: 6, fontSize: 10, fontWeight: 700 }}>
                      {issue.severity === 'error' ? 'MUST FIX' : 'RECOMMENDED'}
                    </antd.Tag>
                    <div style={{ fontSize: 13, lineHeight: 1.6 }}>{issue.text}</div>
                  </div>
                  <antd.Tag color="default" style={{ fontSize: 10, margin: 0, alignSelf: 'flex-start' }}>#{i + 1}</antd.Tag>
                </div>
              ))}
            </div>

            <antd.Divider />
            <antd.Typography.Title level={5} style={{ marginBottom: 12 }}>Officer's Message</antd.Typography.Title>
            <div style={{ padding: 16, background: 'var(--color-bg-subtle)', borderRadius: 10, borderLeft: '3px solid var(--color-primary)', fontSize: 13, lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
              "{req.message}"
            </div>
          </div>
        )}

        {/* ── STEP 1: Upload Revisions ── */}
        {step === 1 && (
          <div>
            <antd.Alert type="info" showIcon message="Upload revised documents for flagged issues. At minimum, replace the Test Report and provide the Wi-Fi 6E frequency declaration." style={{ marginBottom: 24 }} />

            <antd.Typography.Title level={5} style={{ marginBottom: 16 }}>Documents</antd.Typography.Title>
            <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
              {[
                { key: 'test',  name: 'Test Report (revised)',            note: 'Must include Wi-Fi 6E (6425–7125 MHz) range', required: true  },
                { key: 'decl',  name: 'Wi-Fi 6E Frequency Declaration',  note: 'New document — declare full frequency band compliance', required: true  },
                { key: 'std',   name: 'MTSFB G015:2022 Compliance Matrix',note: 'Justify Clause 4.3.1 and 4.3.2 N/A markings', required: true  },
                { key: 'bro',   name: 'Updated Technical Brochure',       note: 'Optional — only if content changed',           required: false },
              ].map(d => (
                <div key={d.key} style={{ padding: 14, border: `1.5px solid ${revised[d.key] ? 'var(--color-success)' : 'var(--color-border)'}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 14, background: revised[d.key] ? 'rgba(27,127,72,0.04)' : '#fff' }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{revised[d.key] ? '✅' : '📄'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {d.name}
                      {d.required && <antd.Tag color="red" style={{ marginLeft: 8, fontSize: 10 }}>Required</antd.Tag>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{d.note}</div>
                    {revised[d.key] && <div style={{ fontSize: 11, color: 'var(--color-success)', marginTop: 2 }}>✓ Uploaded successfully</div>}
                  </div>
                  <antd.Button
                    size="small" type={revised[d.key] ? 'default' : 'primary'}
                    icon={<UploadOutlined />}
                    loading={uploading[d.key]}
                    onClick={() => simulateUpload(d.key)}
                  >
                    {revised[d.key] ? 'Replace' : 'Upload'}
                  </antd.Button>
                </div>
              ))}
            </div>

            <antd.Divider />
            <antd.Typography.Title level={5} style={{ marginBottom: 8 }}>Message to Officer <antd.Typography.Text type="secondary" style={{ fontWeight: 400, fontSize: 13 }}>(optional)</antd.Typography.Text></antd.Typography.Title>
            <antd.Input.TextArea
              rows={4}
              placeholder="Explain what was changed and how each issue was resolved…"
              value={reply}
              onChange={e => setReply(e.target.value)}
              maxLength={1000}
              showCount
            />
          </div>
        )}

        {/* ── STEP 2: Confirm & Resubmit ── */}
        {step === 2 && (
          <div>
            <antd.Alert type="success" showIcon message="Ready to resubmit — all required documents uploaded." style={{ marginBottom: 24 }} />

            <antd.Typography.Title level={5} style={{ marginBottom: 16 }}>Resubmission Summary</antd.Typography.Title>
            <antd.Descriptions bordered size="small" column={1} style={{ marginBottom: 24 }}>
              <antd.Descriptions.Item label="Application ID"><antd.Typography.Text code>{app.id}</antd.Typography.Text></antd.Descriptions.Item>
              <antd.Descriptions.Item label="Product">{app.product} ({app.brand} {app.model})</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Scheme">Scheme {app.scheme}</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Iteration Due">{app.iterationDue} ({daysLeft} days remaining)</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Revised Documents">
                <antd.Space wrap>
                  {Object.keys(revised).map(k => <antd.Tag key={k} color="green">✓ Uploaded</antd.Tag>)}
                  {Object.keys(revised).length === 0 && <antd.Typography.Text type="secondary">None (only existing docs will resubmit)</antd.Typography.Text>}
                </antd.Space>
              </antd.Descriptions.Item>
              {reply && <antd.Descriptions.Item label="Your message">{reply}</antd.Descriptions.Item>}
            </antd.Descriptions>

            <antd.Alert
              type="info" showIcon
              message="What happens next?"
              description="Your application will re-enter the officer's review queue. The AI will re-score all documents. If the officer is satisfied, your certificate will be issued. If further changes are needed, you will receive another iteration request."
              style={{ marginBottom: 24 }}
            />

            <antd.Checkbox style={{ fontSize: 13 }}>
              I confirm the revised information is accurate and complete to the best of my knowledge, and I understand that misrepresentation is an offence under the Communications & Multimedia Act 1998.
            </antd.Checkbox>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--color-divider)' }}>
          <antd.Button disabled={step === 0} onClick={() => setStep(s => s - 1)} icon={<ArrowLeftOutlined />}>Back</antd.Button>
          {step < steps.length - 1 && (
            <antd.Button type="primary" onClick={() => setStep(s => s + 1)}>
              {step === 0 ? 'Proceed to Upload →' : 'Review & Confirm →'}
            </antd.Button>
          )}
          {step === steps.length - 1 && (
            <antd.Button
              type="primary"
              loading={submitting}
              onClick={() => { setSubmitting(true); setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1600); }}
            >
              Submit Revision
            </antd.Button>
          )}
        </div>
      </antd.Card>
    </div>
  );
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
// Standalone screen accessible via SCREENS['forgot-password'].
// Also rendered inline from LoginScreen via forgotMode state.
SCREENS['forgot-password'] = function ForgotPassword({ nav, onBack }) {
  const [step, setStep]       = React.useState(0); // 0=email, 1=otp, 2=new-password, 3=done
  const [email, setEmail]     = React.useState('');
  const [otp, setOtp]         = React.useState('');
  const [otpSent, setOtpSent] = React.useState(false);
  const [autoFill, setAutoFill] = React.useState(false);
  const [newPw, setNewPw]     = React.useState('');
  const [confirmPw, setConfirmPw] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const sendOtp = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setStep(1);
      // Auto-fill OTP after 2.5s (demo effect)
      setTimeout(() => { setOtp('847291'); setAutoFill(true); }, 2500);
    }, 900);
  };

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 700);
  };

  const resetPw = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1000);
  };

  const pwStrength = (pw) => {
    let score = 0;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = pwStrength(newPw);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'var(--color-danger)', 'var(--color-warning)', 'var(--color-info)', 'var(--color-success)'][strength];

  const wrapper = (children) => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#F5F8FB 0%,#E7EEF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <antd.Card bordered={false} style={{ width: '100%', maxWidth: 440, boxShadow: 'var(--elevation-2)', borderRadius: 16 }} bodyStyle={{ padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src="assets/mcmc-logo.png" alt="MCMC" style={{ width: 40, height: 40, background: 'var(--color-primary)', borderRadius: 8, padding: 4, marginBottom: 12 }} />
          <antd.Typography.Title level={4} style={{ margin: 0 }}>
            {step === 3 ? 'Password Reset' : 'Reset Your Password'}
          </antd.Typography.Title>
          <antd.Typography.Text type="secondary">NCEF · MCMC Certification Portal</antd.Typography.Text>
        </div>
        {children}
        {step < 3 && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <antd.Button type="link" onClick={() => onBack ? onBack() : nav('login')}>
              <ArrowLeftOutlined /> Back to Sign In
            </antd.Button>
          </div>
        )}
      </antd.Card>
    </div>
  );

  if (step === 0) return wrapper(
    <>
      <antd.Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20, textAlign: 'center', fontSize: 13 }}>
        Enter the email address linked to your account. We'll send a one-time code to verify your identity.
      </antd.Typography.Text>
      <antd.Form layout="vertical" onFinish={sendOtp}>
        <antd.Form.Item label="Email Address" required>
          <antd.Input size="large" prefix={<MailOutlined />} placeholder="nurul@axiatadigital.com.my" value={email} onChange={e => setEmail(e.target.value)} />
        </antd.Form.Item>
        <antd.Button type="primary" size="large" block loading={loading} htmlType="submit">Send OTP</antd.Button>
      </antd.Form>
    </>
  );

  if (step === 1) return wrapper(
    <>
      <antd.Alert type="success" showIcon message={`OTP sent to ${email}`} description="Check your inbox. The code expires in 10 minutes." style={{ marginBottom: 20 }} />
      {autoFill && <antd.Alert type="info" message="Demo: OTP auto-filled (847291)" style={{ marginBottom: 12, fontSize: 11 }} />}
      <antd.Form layout="vertical" onFinish={verifyOtp}>
        <antd.Form.Item label="6-digit OTP" required>
          <antd.Input size="large" prefix={<KeyOutlined />} placeholder="••••••" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} style={{ letterSpacing: 8, fontSize: 20, textAlign: 'center' }} />
        </antd.Form.Item>
        <antd.Button type="primary" size="large" block loading={loading} htmlType="submit" disabled={otp.length !== 6}>Verify Code</antd.Button>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <antd.Button type="link" size="small" onClick={sendOtp}>Resend OTP</antd.Button>
        </div>
      </antd.Form>
    </>
  );

  if (step === 2) return wrapper(
    <>
      <antd.Form layout="vertical" onFinish={resetPw}>
        <antd.Form.Item label="New Password" required extra="Min 12 characters · upper, lower, digit, symbol">
          <antd.Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••••••" value={newPw} onChange={e => setNewPw(e.target.value)} />
        </antd.Form.Item>
        {newPw.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
              {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? strengthColor : 'var(--color-bg-subtle)' }} />)}
            </div>
            <div style={{ fontSize: 11, color: strengthColor, fontWeight: 600 }}>{strengthLabel}</div>
          </div>
        )}
        <antd.Form.Item label="Confirm New Password" required>
          <antd.Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••••••" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
            status={confirmPw && confirmPw !== newPw ? 'error' : ''} />
          {confirmPw && confirmPw !== newPw && <div style={{ fontSize: 12, color: 'var(--color-danger)', marginTop: 4 }}>Passwords do not match</div>}
        </antd.Form.Item>
        <antd.Button type="primary" size="large" block loading={loading} htmlType="submit" disabled={!newPw || newPw !== confirmPw || strength < 3}>
          Reset Password
        </antd.Button>
      </antd.Form>
    </>
  );

  // Step 3 — success
  return wrapper(
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
      <antd.Typography.Title level={4}>Password Reset Successfully</antd.Typography.Title>
      <antd.Typography.Text type="secondary">Your new password is active. All other active sessions have been signed out for security.</antd.Typography.Text>
      <antd.Button type="primary" size="large" block style={{ marginTop: 24 }} onClick={() => onBack ? onBack() : nav('login')}>
        Sign In with New Password
      </antd.Button>
    </div>
  );
};
