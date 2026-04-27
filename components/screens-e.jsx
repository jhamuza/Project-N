// screens-e.jsx — Admin Config (§5.18), Integrations (§5.17)

const {
  SettingOutlined, DollarOutlined, SafetyOutlined, RobotOutlined, BellOutlined,
  ApartmentOutlined, PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined,
  CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, ReloadOutlined,
  FileTextOutlined, LockOutlined, GlobalOutlined, ThunderboltOutlined,
  UserOutlined, CrownOutlined, TeamOutlined, InfoCircleOutlined,
  SwapOutlined, HistoryOutlined, ExclamationCircleOutlined, CheckOutlined
} = window.icons;

const FormOutlined_e   = window.icons.FormOutlined   || window.icons.EditOutlined;
const BranchesOut_e    = window.icons.BranchesOutlined || window.icons.ApartmentOutlined;
const NodeIndexOut_e   = window.icons.NodeIndexOutlined || window.icons.ApartmentOutlined;
const ThunderOut_e     = window.icons.ThunderboltOutlined || window.icons.StarOutlined;
const SafetyOut_e      = window.icons.SafetyOutlined  || window.icons.SafetyCertificateOutlined;
const AimOut_e         = window.icons.AimOutlined     || window.icons.ThunderboltOutlined;

// ─── Mock data for admin config ───────────────────────────────────────────────
Object.assign(window.MOCK, {
  feeStructure: [
    { id: 'fee-01', category: 'SDoC Registration',  scheme: 'Scheme A', type: 'Annual (per model)',     amount: 1200, currency: 'MYR', sst: true  },
    { id: 'fee-02', category: 'SDoC Registration',  scheme: 'Scheme B', type: 'Annual (per model)',     amount: 2500, currency: 'MYR', sst: true  },
    { id: 'fee-03', category: 'SDoC Registration',  scheme: 'Scheme C', type: 'Annual (per model)',     amount: 600,  currency: 'MYR', sst: true  },
    { id: 'fee-04', category: 'Special Approval',   scheme: 'Low/Med Risk', type: 'Per application',    amount: 500,  currency: 'MYR', sst: true  },
    { id: 'fee-05', category: 'Special Approval',   scheme: 'High Risk',    type: 'Per application',    amount: 1000, currency: 'MYR', sst: true  },
    { id: 'fee-06', category: 'Special Approval',   scheme: 'Prohibited',   type: 'Per application',    amount: 2000, currency: 'MYR', sst: true  },
    { id: 'fee-07', category: 'IMEI Registration',  scheme: 'All',          type: 'Per IMEI number',    amount: 0.50, currency: 'MYR', sst: false },
    { id: 'fee-08', category: 'Serial Number Reg.', scheme: 'All',          type: 'Per serial number',  amount: 0.15, currency: 'MYR', sst: false },
    { id: 'fee-09', category: 'Account Registration',scheme: 'Category A',  type: 'Per year',           amount: 300,  currency: 'MYR', sst: true  },
    { id: 'fee-10', category: 'Account Registration',scheme: 'Category B/C',type: 'Per year',           amount: 0,    currency: 'MYR', sst: false },
    { id: 'fee-11', category: 'Account Registration',scheme: 'Category D',  type: 'Per year',           amount: 200,  currency: 'MYR', sst: true  },
    { id: 'fee-12', category: 'Renewal',            scheme: 'Scheme A',     type: 'Per year per model', amount: 600,  currency: 'MYR', sst: true  },
    { id: 'fee-13', category: 'Renewal',            scheme: 'Scheme B',     type: 'Per year per model', amount: 1000, currency: 'MYR', sst: true  },
    { id: 'fee-14', category: 'Renewal',            scheme: 'Scheme C',     type: 'Per year per model', amount: 300,  currency: 'MYR', sst: true  },
  ],
  workflowChainConfig: [
    { id: 'wf-01', step: 1, roleLabel: 'OIC / CPPG Officer', roleKey: 'officer',      actions: ['Escalate', 'Return for iteration'], canReject: false, mandatory: true  },
    { id: 'wf-02', step: 2, roleLabel: 'Recommender (P5/P6)', roleKey: 'recommender', actions: ['Escalate', 'Return'],                canReject: false, mandatory: true  },
    { id: 'wf-03', step: 3, roleLabel: 'Verifier (P7)',       roleKey: 'verifier',     actions: ['Escalate', 'Return'],                canReject: false, mandatory: true  },
    { id: 'wf-04', step: 4, roleLabel: 'Approver (P8)',       roleKey: 'approver',     actions: ['Accept', 'Not Accept', 'Return'],     canReject: true,  mandatory: true  },
  ],
  announcements: [
    { id: 'ann-01', title: 'NCEF Portal Launch', body: 'The NCEF Online Registration System is now live. Suppliers may begin submitting SDoC applications.', audience: 'Public', status: 'active', published: '2026-04-01' },
    { id: 'ann-02', title: 'Updated Fee Schedule effective 1 July 2026', body: 'Revised fee structure will take effect 1 July 2026. Current rates remain valid until 30 June 2026.', audience: 'Registered', status: 'draft', published: null },
  ],
  integrations: [
    { id: 'int-sirim',  name: 'SIRIM eComM',        dir: 'Bidirectional', purpose: 'CoA issuance validation; historical data migration', status: 'operational', lastPing: '2026-04-27T08:55:00', latency: 142, uptime: 99.8 },
    { id: 'int-rmcd',   name: 'RMCD MyOGA System',  dir: 'Outbound',      purpose: 'Import permit applications; payment redirect',       status: 'operational', lastPing: '2026-04-27T08:54:00', latency: 218, uptime: 99.2 },
    { id: 'int-ssm',    name: 'SSM Search',          dir: 'Outbound',      purpose: 'Real-time company registration validation',          status: 'operational', lastPing: '2026-04-27T08:56:00', latency: 87,  uptime: 99.9 },
    { id: 'int-pay',    name: 'MCMC Pay',            dir: 'Bidirectional', purpose: 'Payment processing; callback confirmation',          status: 'degraded',    lastPing: '2026-04-27T08:50:00', latency: 1240,uptime: 97.1 },
    { id: 'int-sifs',   name: 'MCMC SIFS',           dir: 'Outbound',      purpose: 'Financial transaction sync for reconciliation',      status: 'operational', lastPing: '2026-04-27T08:55:00', latency: 103, uptime: 100  },
    { id: 'int-aad',    name: 'Azure Active Directory', dir: 'Inbound',   purpose: 'SSO for internal MCMC users via Keycloak',           status: 'operational', lastPing: '2026-04-27T08:56:00', latency: 61,  uptime: 99.99},
    { id: 'int-esb',    name: 'IBM webMethods ESB',  dir: 'Hub',           purpose: 'Central integration hub for all external systems',   status: 'operational', lastPing: '2026-04-27T08:56:00', latency: 34,  uptime: 99.95},
  ],
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN CONFIG (§5.18)
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['admin-config'] = function AdminConfig({ nav, currentUser }) {
  const [tab, setTab] = React.useState('fees');
  const isAdmin = currentUser?.role === 'team-lead';

  // ── FEE STRUCTURE ──────────────────────────────────────────────────────────
  const FeeTab = () => {
    const [fees, setFees] = React.useState(MOCK.feeStructure);
    const [editId, setEditId] = React.useState(null);
    const [editVal, setEditVal] = React.useState('');
    const [saved, setSaved] = React.useState(false);
    const categories = [...new Set(fees.map(f => f.category))];

    function startEdit(f) { setEditId(f.id); setEditVal(String(f.amount)); }
    function commitEdit(id) {
      setFees(prev => prev.map(f => f.id === id ? { ...f, amount: parseFloat(editVal) || 0 } : f));
      setEditId(null);
      setSaved(false);
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <antd.Typography.Text type="secondary" style={{ fontSize: 13 }}>
            All fees are in Malaysian Ringgit (MYR). SST (8%) applies where indicated. Changes take effect from the next billing cycle.
          </antd.Typography.Text>
          <antd.Space>
            {saved && <antd.Tag color="green" icon={<CheckCircleOutlined />}>Saved</antd.Tag>}
            <antd.Button type="primary" icon={<CheckOutlined />} onClick={() => setSaved(true)} disabled={editId !== null}>Save Fee Schedule</antd.Button>
          </antd.Space>
        </div>
        {categories.map(cat => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>{cat}</div>
            <antd.Table
              rowKey="id"
              dataSource={fees.filter(f => f.category === cat)}
              pagination={false}
              size="small"
              columns={[
                { title: 'Scheme / Type', dataIndex: 'scheme', width: 180, render: v => <antd.Tag>{v}</antd.Tag> },
                { title: 'Basis',         dataIndex: 'type',   width: 200, render: v => <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{v}</span> },
                { title: 'SST',           dataIndex: 'sst',    width: 80,  align: 'center', render: v => v ? <antd.Tag color="orange">8%</antd.Tag> : <antd.Typography.Text type="secondary" style={{ fontSize: 11 }}>Exempt</antd.Typography.Text> },
                { title: 'Amount (MYR)',  dataIndex: 'amount', align: 'right', render: (v, r) => editId === r.id
                  ? <antd.Space><antd.Input size="small" value={editVal} onChange={e => setEditVal(e.target.value)} style={{ width: 100, textAlign: 'right' }} autoFocus /><antd.Button size="small" type="primary" onClick={() => commitEdit(r.id)}>✓</antd.Button><antd.Button size="small" onClick={() => setEditId(null)}>✕</antd.Button></antd.Space>
                  : <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>RM {v.toFixed(2)}</span>
                },
                { title: '', width: 60, render: (_, r) => isAdmin && editId !== r.id && <antd.Button type="text" size="small" icon={<EditOutlined />} onClick={() => startEdit(r)} /> },
              ]}
            />
          </div>
        ))}
        <antd.Alert type="info" showIcon message="Waiver codes" description="System Administrators and Officers may issue waiver codes to grant specific applicants a discount or full waiver of applicable fees. Manage waivers via the Suppliers screen." style={{ marginTop: 8 }} />
      </div>
    );
  };

  // ── ITERATION & SLA ────────────────────────────────────────────────────────
  const IterationTab = () => {
    const [vals, setVals] = React.useState({
      iterDefault: 45,
      iterMax: 90,
      slaA: 3,
      slaB: 5,
      slaC: 1,
      slaSA: 5,
      slaSAProhibited: 15,
      graceMonths: 6,
      renewalMaxYears: 5,
      notif90: true,
      notif60: true,
      notif30: true,
    });
    const [dirty, setDirty] = React.useState(false);
    const set = (k, v) => { setVals(p => ({ ...p, [k]: v })); setDirty(true); };
    const Row = ({ label, desc, children }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-divider)' }}>
        <div><div style={{ fontWeight: 500, fontSize: 13 }}>{label}</div>{desc && <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{desc}</div>}</div>
        {children}
      </div>
    );

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <antd.Button type="primary" disabled={!dirty} onClick={() => { setDirty(false); antd.message.success('SLA & iteration settings saved.'); }}>Save Changes</antd.Button>
        </div>

        <antd.Card bordered style={{ marginBottom: 16 }}>
          <antd.Typography.Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Iteration Periods</antd.Typography.Title>
          <Row label="Default Iteration Period" desc="Days applicants have to resubmit after returning an application">
            <antd.Space><antd.InputNumber min={7} max={180} value={vals.iterDefault} onChange={v => set('iterDefault', v)} addonAfter="days" style={{ width: 160 }} /><antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>Extendable by officer</antd.Typography.Text></antd.Space>
          </Row>
          <Row label="Maximum Iteration Extension" desc="Maximum total days an officer can extend an iteration to">
            <antd.InputNumber min={vals.iterDefault} max={365} value={vals.iterMax} onChange={v => set('iterMax', v)} addonAfter="days" style={{ width: 160 }} />
          </Row>
        </antd.Card>

        <antd.Card bordered style={{ marginBottom: 16 }}>
          <antd.Typography.Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Officer SLA Targets (working days)</antd.Typography.Title>
          {[
            { k: 'slaA',            l: 'Scheme A',              d: 'SDoC with full certification' },
            { k: 'slaB',            l: 'Scheme B',              d: 'SDoC with verification' },
            { k: 'slaC',            l: 'Scheme C (manual)',     d: 'When below auto-accept threshold' },
            { k: 'slaSA',           l: 'Special Approval',      d: 'Low / Medium / High risk' },
            { k: 'slaSAProhibited', l: 'Special Approval — Prohibited', d: 'Multi-level approval chain' },
          ].map(item => (
            <Row key={item.k} label={item.l} desc={item.d}>
              <antd.InputNumber min={1} max={30} value={vals[item.k]} onChange={v => set(item.k, v)} addonAfter="days" style={{ width: 140 }} />
            </Row>
          ))}
        </antd.Card>

        <antd.Card bordered>
          <antd.Typography.Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Renewal & Grace Periods</antd.Typography.Title>
          <Row label="Account/Certificate Grace Period" desc="Months after expiry applicants may still renew without reapplying">
            <antd.InputNumber min={1} max={12} value={vals.graceMonths} onChange={v => set('graceMonths', v)} addonAfter="months" style={{ width: 150 }} />
          </Row>
          <Row label="Maximum Cumulative Registration Period" desc="Maximum years a supplier/certificate can be registered (cumulative)">
            <antd.InputNumber min={1} max={10} value={vals.renewalMaxYears} onChange={v => set('renewalMaxYears', v)} addonAfter="years" style={{ width: 150 }} />
          </Row>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>Expiry Notification Schedule</div>
            <antd.Space size={16}>
              {[{ k: 'notif90', l: '90 days before' }, { k: 'notif60', l: '60 days before' }, { k: 'notif30', l: '30 days before' }].map(n => (
                <antd.Checkbox key={n.k} checked={vals[n.k]} onChange={e => set(n.k, e.target.checked)}>{n.l}</antd.Checkbox>
              ))}
            </antd.Space>
          </div>
        </antd.Card>
      </div>
    );
  };

  // ── WORKFLOW CONFIG ─────────────────────────────────────────────────────────
  const WorkflowTab = () => {
    const [chain, setChain] = React.useState(MOCK.workflowChainConfig);
    const [dirty, setDirty] = React.useState(false);
    const roleOpts = [
      { value: 'officer',     label: 'OIC / CPPG Officer' },
      { value: 'recommender', label: 'Recommender (P5/P6)' },
      { value: 'verifier',    label: 'Verifier (P7)' },
      { value: 'approver',    label: 'Approver (P8)' },
    ];
    const roleColor = { officer: 'blue', recommender: 'green', verifier: 'orange', approver: 'red' };

    return (
      <div>
        <antd.Alert type="info" showIcon style={{ marginBottom: 20 }} message="Multi-level approval chain — Prohibited Equipment" description="This configures the sequential approval chain for Special Approval (Prohibited Equipment) applications. Each step must complete before the next is activated. Only the Approver (P8) may reject an application." />
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, overflowX: 'auto', paddingBottom: 8 }}>
          {chain.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ border: '1.5px solid var(--color-border)', borderRadius: 12, padding: 16, minWidth: 200, background: '#fff', boxShadow: 'var(--elevation-1)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 4 }}>Step {step.step}</div>
                <antd.Select
                  value={step.roleKey}
                  style={{ width: '100%', marginBottom: 10 }}
                  options={roleOpts}
                  onChange={v => { setChain(prev => prev.map(s => s.id === step.id ? { ...s, roleKey: v, roleLabel: roleOpts.find(o => o.value === v)?.label } : s)); setDirty(true); }}
                />
                <antd.Tag color={roleColor[step.roleKey]} style={{ marginBottom: 8 }}>{step.roleLabel}</antd.Tag>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 6 }}>Actions:</div>
                <antd.Space size={[4, 4]} wrap>
                  {step.actions.map((a, j) => (
                    <antd.Tag key={j} closable={a !== 'Escalate' && a !== 'Accept' && !step.mandatory} style={{ fontSize: 11 }}>{a}</antd.Tag>
                  ))}
                </antd.Space>
                {step.canReject && <div style={{ marginTop: 8 }}><antd.Tag color="red" style={{ fontSize: 10 }}>Can reject application</antd.Tag></div>}
              </div>
              {i < chain.length - 1 && <span style={{ fontSize: 20, color: 'var(--color-text-muted)', flexShrink: 0 }}>→</span>}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20, color: 'var(--color-text-muted)' }}>→</span>
            <div style={{ border: '1.5px dashed var(--color-border)', borderRadius: 12, padding: 16, minWidth: 140, textAlign: 'center', color: 'var(--color-text-muted)', cursor: 'pointer', background: 'var(--color-bg-subtle)' }} onClick={() => antd.message.info('Custom steps are configurable in production. This demo is limited to the 4 standard NCEF roles.')}>
              <PlusOutlined style={{ fontSize: 20, marginBottom: 4 }} />
              <div style={{ fontSize: 12 }}>Add step</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>Changes apply to new applications only. In-flight applications retain their original chain configuration.</antd.Typography.Text>
          <antd.Button type="primary" disabled={!dirty} onClick={() => { setDirty(false); antd.message.success('Workflow chain saved.'); }}>Save Workflow</antd.Button>
        </div>
      </div>
    );
  };

  // ── AI THRESHOLDS ──────────────────────────────────────────────────────────
  const AITab = () => {
    const [vals, setVals] = React.useState({
      schemeC_autoAccept: 90,
      schemeC_priority: 70,
      renewal_autoAccept: 90,
      onboarding_autoAccept: 90,
      pms_riskHigh: 80,
      pms_riskMedium: 60,
    });
    const [dirty, setDirty] = React.useState(false);
    const set = (k, v) => { setVals(p => ({ ...p, [k]: v })); setDirty(true); };

    const ThreshRow = ({ label, desc, valKey, color, min = 1, max = 99 }) => (
      <div style={{ padding: '14px 0', borderBottom: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, maxWidth: 420 }}>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{label}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{desc}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <antd.Slider min={min} max={max} value={vals[valKey]} onChange={v => set(valKey, v)} style={{ width: 160 }} trackStyle={{ background: color }} handleStyle={{ borderColor: color }} />
          <antd.InputNumber min={min} max={max} value={vals[valKey]} onChange={v => set(valKey, v || 0)} formatter={v => `${v}%`} parser={v => parseInt(v?.replace('%', '')) || 0} style={{ width: 80 }} />
        </div>
      </div>
    );

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <antd.Button type="primary" disabled={!dirty} onClick={() => { setDirty(false); antd.message.success('AI thresholds updated. Changes apply to new submissions immediately.'); }}>Apply Thresholds</antd.Button>
        </div>
        <antd.Card bordered style={{ marginBottom: 16 }}>
          <antd.Typography.Title level={5} style={{ marginTop: 0 }}>Scheme C — Confidence Thresholds</antd.Typography.Title>
          <ThreshRow label="Auto-Accept Threshold" desc="Applications scoring at or above this are auto-accepted without officer review (Scheme C only)" valKey="schemeC_autoAccept" color="var(--color-success)" />
          <ThreshRow label="Priority Review Threshold" desc="Applications scoring between this and the auto-accept threshold route to Priority Queue" valKey="schemeC_priority" color="var(--color-warning)" max={vals.schemeC_autoAccept - 1} />
          <div style={{ marginTop: 12, padding: 12, background: 'var(--color-bg-subtle)', borderRadius: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
            <b>Scoring bands:</b> Auto-accept ≥{vals.schemeC_autoAccept}% · Priority review {vals.schemeC_priority}–{vals.schemeC_autoAccept - 1}% · Standard review &lt;{vals.schemeC_priority}%
          </div>
        </antd.Card>
        <antd.Card bordered style={{ marginBottom: 16 }}>
          <antd.Typography.Title level={5} style={{ marginTop: 0 }}>Renewal & Onboarding</antd.Typography.Title>
          <ThreshRow label="Renewal Auto-Accept Threshold" desc="Certificate renewals scoring above this are automatically approved (Scheme C + B)" valKey="renewal_autoAccept" color="var(--color-success)" />
          <ThreshRow label="Onboarding Auto-Accept Threshold" desc="New supplier/company profile registrations scoring above this are automatically accepted" valKey="onboarding_autoAccept" color="var(--color-success)" />
        </antd.Card>
        <antd.Card bordered>
          <antd.Typography.Title level={5} style={{ marginTop: 0 }}>PMS Risk Scoring Bands</antd.Typography.Title>
          <ThreshRow label="High Risk Threshold" desc="Suppliers scoring above this are proposed for immediate audit" valKey="pms_riskHigh" color="var(--color-danger)" />
          <ThreshRow label="Medium Risk Threshold" desc="Suppliers scoring above this (below high) are added to the standard audit cycle" valKey="pms_riskMedium" color="var(--color-warning)" max={vals.pms_riskHigh - 1} />
        </antd.Card>
      </div>
    );
  };

  // ── ANNOUNCEMENTS ──────────────────────────────────────────────────────────
  const AnnouncementsTab = () => {
    const [items, setItems] = React.useState(MOCK.announcements);
    const [newOpen, setNewOpen] = React.useState(false);
    const [draft, setDraft] = React.useState({ title: '', body: '', audience: 'Public' });

    function publish(id) {
      setItems(prev => prev.map(a => a.id === id ? { ...a, status: 'active', published: new Date().toISOString().slice(0, 10) } : a));
      antd.message.success('Announcement published to portal.');
    }
    function retract(id) {
      setItems(prev => prev.map(a => a.id === id ? { ...a, status: 'draft', published: null } : a));
    }
    function addNew() {
      setItems(prev => [...prev, { id: `ann-${Date.now()}`, ...draft, status: 'draft', published: null }]);
      setNewOpen(false);
      setDraft({ title: '', body: '', audience: 'Public' });
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <antd.Typography.Text type="secondary" style={{ fontSize: 13 }}>Announcements published here appear on the Public Search Portal and in the in-app notification feed.</antd.Typography.Text>
          <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => setNewOpen(true)}>New Announcement</antd.Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(a => (
            <antd.Card key={a.id} bordered size="small" extra={
              <antd.Space>
                {a.status === 'draft'  && <antd.Button type="primary" size="small" onClick={() => publish(a.id)}>Publish</antd.Button>}
                {a.status === 'active' && <antd.Button size="small" onClick={() => retract(a.id)}>Retract</antd.Button>}
                <antd.Button type="text" size="small" danger icon={<DeleteOutlined />} />
              </antd.Space>
            }>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{a.body}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <antd.Tag color={a.status === 'active' ? 'green' : 'default'}>{a.status === 'active' ? 'Live' : 'Draft'}</antd.Tag>
                    <antd.Tag>{a.audience}</antd.Tag>
                    {a.published && <antd.Typography.Text type="secondary" style={{ fontSize: 11 }}>Published {a.published}</antd.Typography.Text>}
                  </div>
                </div>
              </div>
            </antd.Card>
          ))}
        </div>
        <antd.Modal open={newOpen} onCancel={() => setNewOpen(false)} title="New Announcement" okText="Create" onOk={addNew} okButtonProps={{ disabled: !draft.title || !draft.body }} width={520}>
          <antd.Form layout="vertical">
            <antd.Form.Item label="Title" required><antd.Input value={draft.title} onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} placeholder="Announcement title…" /></antd.Form.Item>
            <antd.Form.Item label="Body" required><antd.Input.TextArea rows={4} value={draft.body} onChange={e => setDraft(p => ({ ...p, body: e.target.value }))} placeholder="Announcement content…" /></antd.Form.Item>
            <antd.Form.Item label="Audience">
              <antd.Radio.Group value={draft.audience} onChange={e => setDraft(p => ({ ...p, audience: e.target.value }))}>
                <antd.Radio value="Public">Public (portal + unauthenticated)</antd.Radio>
                <antd.Radio value="Registered">Registered users only</antd.Radio>
                <antd.Radio value="Internal">Internal MCMC only</antd.Radio>
              </antd.Radio.Group>
            </antd.Form.Item>
          </antd.Form>
        </antd.Modal>
      </div>
    );
  };

  const tabs = [
    { key: 'fees',          label: <antd.Space><DollarOutlined />Fee Structure</antd.Space>,          children: <FeeTab /> },
    { key: 'iteration',     label: <antd.Space><HistoryOutlined />Iteration & SLA</antd.Space>,        children: <IterationTab /> },
    { key: 'workflow',      label: <antd.Space><BranchesOut_e />Workflow Config</antd.Space>,          children: <WorkflowTab /> },
    { key: 'ai',            label: <antd.Space><RobotOutlined />AI Thresholds</antd.Space>,            children: <AITab /> },
    { key: 'announcements', label: <antd.Space><BellOutlined />Announcements</antd.Space>,             children: <AnnouncementsTab /> },
  ];

  if (!isAdmin) return (
    <antd.Result status="403" icon={<LockOutlined style={{ color: 'var(--color-warning)' }} />} title="System Administrators only" subTitle="Configuration & Settings is restricted to MCMC System Administrators." extra={<antd.Button type="primary" onClick={() => nav('officer-queue')}>Back to Queue</antd.Button>} style={{ padding: '80px 24px' }} />
  );

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>System Administrator · MCMC NCEF</div>
        <antd.Typography.Title level={3} style={{ margin: '4px 0 4px' }}>Configuration & Settings</antd.Typography.Title>
        <antd.Typography.Text type="secondary">Fee structure · Iteration periods · Workflow config · AI thresholds · Announcements</antd.Typography.Text>
      </div>
      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <antd.Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 20px' }} items={tabs.map(t => ({ key: t.key, label: t.label, children: <div style={{ padding: '4px 0 24px' }}>{t.children}</div> }))} />
      </antd.Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INTEGRATIONS STATUS (§5.17)
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['integrations'] = function Integrations({ nav, currentUser }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [statuses, setStatuses] = React.useState(MOCK.integrations);

  function refresh() {
    setRefreshing(true);
    setTimeout(() => {
      setStatuses(prev => prev.map(s => ({ ...s, lastPing: new Date().toISOString(), latency: Math.round(s.latency * (0.9 + Math.random() * 0.2)) })));
      setRefreshing(false);
      antd.message.success('Integration health refreshed.');
    }, 1400);
  }

  const statusColor = { operational: 'var(--color-success)', degraded: 'var(--color-warning)', down: 'var(--color-danger)' };
  const statusBg    = { operational: 'var(--color-success-bg)', degraded: 'var(--color-warning-bg)', down: 'var(--color-danger-bg)' };
  const statusTag   = { operational: 'green', degraded: 'orange', down: 'red' };
  const dirColor    = { Bidirectional: 'blue', Outbound: 'cyan', Inbound: 'purple', Hub: 'geekblue' };

  const operational = statuses.filter(s => s.status === 'operational').length;
  const degraded    = statuses.filter(s => s.status === 'degraded').length;
  const down        = statuses.filter(s => s.status === 'down').length;
  const avgUptime   = (statuses.reduce((a, b) => a + b.uptime, 0) / statuses.length).toFixed(2);

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>System Administrator · MCMC NCEF</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 4px' }}>Integration Health</antd.Typography.Title>
          <antd.Typography.Text type="secondary">IBM webMethods ESB · External system status · Real-time monitoring</antd.Typography.Text>
        </div>
        <antd.Button icon={<ReloadOutlined spin={refreshing} />} onClick={refresh} loading={refreshing}>Refresh Status</antd.Button>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { l: 'Operational', v: operational, color: 'var(--color-success)' },
          { l: 'Degraded',    v: degraded,    color: 'var(--color-warning)', warn: degraded > 0 },
          { l: 'Down',        v: down,        color: 'var(--color-danger)',  warn: down > 0 },
          { l: 'Avg Uptime',  v: `${avgUptime}%`, color: avgUptime >= 99 ? 'var(--color-success)' : 'var(--color-warning)' },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? k.color : k.color }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      {degraded > 0 && (
        <antd.Alert type="warning" showIcon style={{ marginBottom: 20 }} message={`${degraded} integration${degraded > 1 ? 's' : ''} degraded`} description={statuses.filter(s => s.status === 'degraded').map(s => s.name).join(', ') + ' — elevated latency detected. Payments may be slower than usual.'} />
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        {statuses.map(s => (
          <antd.Card key={s.id} bordered size="small" style={{ borderLeft: `4px solid ${statusColor[s.status]}`, background: statusBg[s.status] + '40' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                  <antd.Tag color={statusTag[s.status]} style={{ margin: 0 }}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</antd.Tag>
                  <antd.Tag color={dirColor[s.dir]} style={{ margin: 0, fontSize: 11 }}>{s.dir}</antd.Tag>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>{s.purpose}</div>
              </div>
              <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Latency</div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: s.latency > 500 ? 'var(--color-warning)' : 'var(--color-success)' }}>{s.latency}ms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Uptime</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: s.uptime >= 99.5 ? 'var(--color-success)' : s.uptime >= 98 ? 'var(--color-warning)' : 'var(--color-danger)' }}>{s.uptime}%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Last Ping</div>
                  <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>{new Date(s.lastPing).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                </div>
              </div>
            </div>
          </antd.Card>
        ))}
      </div>

      <antd.Card bordered style={{ marginTop: 20 }}>
        <antd.Typography.Title level={5} style={{ marginTop: 0 }}>Integration Architecture</antd.Typography.Title>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, color: 'var(--color-text-secondary)', background: 'var(--color-bg-subtle)', padding: 16, borderRadius: 8, overflowX: 'auto', whiteSpace: 'pre' }}>{`NCEF Portal (ReactJS)
    ↕ Apache APISIX (API Gateway)
    ↕ Spring Boot Microservices
    ↕ IBM webMethods ESB (Central Integration Hub)
         ├── SIRIM eComM        [Bidirectional] CoA validation + data migration
         ├── RMCD MyOGA System  [Outbound]      Import permits + payment redirect
         ├── SSM Search         [Outbound]      Company registration validation
         ├── MCMC Pay           [Bidirectional] Payment processing + callbacks
         └── MCMC SIFS          [Outbound]      Financial reconciliation`}</div>
      </antd.Card>
    </div>
  );
};

Object.assign(window, { SCREENS });
