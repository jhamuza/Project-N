// screens-e.jsx — Admin Config (§5.18), Integrations (§5.17)

const {
  SettingOutlined, DollarOutlined, SafetyOutlined, RobotOutlined, BellOutlined,
  ApartmentOutlined, PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined,
  CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, ReloadOutlined,
  FileTextOutlined, LockOutlined, GlobalOutlined, ThunderboltOutlined,
  UserOutlined, CrownOutlined, TeamOutlined, InfoCircleOutlined,
  SwapOutlined, HistoryOutlined, ExclamationCircleOutlined, CheckOutlined,
  TagOutlined, UsergroupAddOutlined, BarChartOutlined, EyeOutlined, CloseOutlined
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
    { id: 'fee-01', category: 'SDoC Registration',   scheme: 'Scheme A', type: 'Per year per model',   baseFee: 350.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-02', category: 'SDoC Registration',   scheme: 'Scheme B', type: 'Per year per model',   baseFee: 250.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-03', category: 'SDoC Registration',   scheme: 'Scheme C', type: 'Per year per model',   baseFee: 150.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-04', category: 'Special Approval',    scheme: 'Low/Med Risk', type: 'Per application',  baseFee: 500.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-05', category: 'Special Approval',    scheme: 'High Risk',    type: 'Per application',  baseFee: 1000.00,sstEnabled: false, sstPct: 0 },
    { id: 'fee-06', category: 'Special Approval',    scheme: 'Prohibited',   type: 'Per application',  baseFee: 2000.00,sstEnabled: false, sstPct: 0 },
    { id: 'fee-07', category: 'IMEI Registration',   scheme: 'All',          type: 'Per IMEI number',  baseFee: 0.50,   sstEnabled: false, sstPct: 0 },
    { id: 'fee-08', category: 'Serial Number Reg.',  scheme: 'All',          type: 'Per serial number', baseFee: 0.15,  sstEnabled: false, sstPct: 0 },
    { id: 'fee-09', category: 'Account Registration',scheme: 'Category A',   type: 'Per year',         baseFee: 300.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-10', category: 'Account Registration',scheme: 'Category B/C', type: 'Per year',         baseFee: 0.00,   sstEnabled: false, sstPct: 0 },
    { id: 'fee-11', category: 'Account Registration',scheme: 'Category D',   type: 'Per year',         baseFee: 200.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-12', category: 'Renewal',             scheme: 'Scheme A',     type: 'Per year per model',baseFee: 350.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-13', category: 'Renewal',             scheme: 'Scheme B',     type: 'Per year per model',baseFee: 250.00, sstEnabled: false, sstPct: 0 },
    { id: 'fee-14', category: 'Renewal',             scheme: 'Scheme C',     type: 'Per year per model',baseFee: 150.00, sstEnabled: false, sstPct: 0 },
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
    const [dirty, setDirty] = React.useState(false);
    const [saved, setSaved] = React.useState(false);
    const [editingId, setEditingId] = React.useState(null);
    const [editBuf, setEditBuf] = React.useState({});
    const categories = [...new Set(fees.map(f => f.category))];

    function sstAmt(f) { return f.sstEnabled ? Math.round(f.baseFee * f.sstPct) / 100 : 0; }
    function total(f)  { return f.baseFee + sstAmt(f); }

    function startEdit(f) {
      setEditingId(f.id);
      setEditBuf({ baseFee: String(f.baseFee), sstPct: String(f.sstPct), sstEnabled: f.sstEnabled });
    }
    function commitEdit(id) {
      setFees(prev => prev.map(f => f.id === id ? {
        ...f,
        baseFee: parseFloat(editBuf.baseFee) || 0,
        sstPct: editBuf.sstEnabled ? (parseFloat(editBuf.sstPct) || 0) : 0,
        sstEnabled: editBuf.sstEnabled,
      } : f));
      setEditingId(null);
      setDirty(true);
      setSaved(false);
    }

    const fmtMYR = v => `RM ${v.toFixed(2)}`;

    const columns = [
      { title: 'Scheme / Type', dataIndex: 'scheme', width: 160, render: v => <antd.Tag>{v}</antd.Tag> },
      { title: 'Basis', dataIndex: 'type', width: 180, render: v => <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{v}</span> },
      {
        title: 'Actual Fee', dataIndex: 'baseFee', width: 150, align: 'right',
        render: (v, r) => editingId === r.id
          ? <antd.InputNumber size="small" value={parseFloat(editBuf.baseFee)} min={0} step={0.01} precision={2}
              onChange={val => setEditBuf(b => ({ ...b, baseFee: String(val ?? 0) }))}
              style={{ width: 100 }} addonBefore="RM" />
          : <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{fmtMYR(v)}</span>,
      },
      {
        title: 'SST', width: 110, align: 'center',
        render: (_, r) => editingId === r.id
          ? <antd.Space size={4}>
              <antd.Switch size="small" checked={editBuf.sstEnabled} onChange={v => setEditBuf(b => ({ ...b, sstEnabled: v, sstPct: v ? (b.sstPct || '8') : '0' }))} />
              {editBuf.sstEnabled && (
                <antd.InputNumber size="small" value={parseFloat(editBuf.sstPct)} min={0} max={30} step={1} precision={0}
                  onChange={val => setEditBuf(b => ({ ...b, sstPct: String(val ?? 0) }))}
                  style={{ width: 64 }} addonAfter="%" />
              )}
            </antd.Space>
          : r.sstEnabled
            ? <antd.Tag color="orange">{r.sstPct}%</antd.Tag>
            : <antd.Typography.Text type="secondary" style={{ fontSize: 11 }}>Exempt</antd.Typography.Text>,
      },
      {
        title: 'SST Amount', width: 120, align: 'right',
        render: (_, r) => {
          const amt = editingId === r.id
            ? (editBuf.sstEnabled ? (parseFloat(editBuf.baseFee) || 0) * (parseFloat(editBuf.sstPct) || 0) / 100 : 0)
            : sstAmt(r);
          return <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{fmtMYR(amt)}</span>;
        },
      },
      {
        title: 'Total', width: 130, align: 'right',
        render: (_, r) => {
          const base = editingId === r.id ? (parseFloat(editBuf.baseFee) || 0) : r.baseFee;
          const sst  = editingId === r.id
            ? (editBuf.sstEnabled ? base * (parseFloat(editBuf.sstPct) || 0) / 100 : 0)
            : sstAmt(r);
          return <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary)' }}>{fmtMYR(base + sst)}</span>;
        },
      },
      {
        title: '', width: 100, align: 'right',
        render: (_, r) => {
          if (!isAdmin) return null;
          if (editingId === r.id) return (
            <antd.Space size={4}>
              <antd.Button size="small" type="primary" onClick={() => commitEdit(r.id)}>Save</antd.Button>
              <antd.Button size="small" onClick={() => setEditingId(null)}>Cancel</antd.Button>
            </antd.Space>
          );
          return <antd.Button type="text" size="small" icon={<EditOutlined />} onClick={() => startEdit(r)} disabled={editingId !== null} />;
        },
      },
    ];

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <antd.Typography.Text type="secondary" style={{ fontSize: 13 }}>
            All fees in MYR. No SST applicable. Changes take effect from the next billing cycle.
          </antd.Typography.Text>
          <antd.Space>
            {saved && <antd.Tag color="green" icon={<CheckCircleOutlined />}>Saved</antd.Tag>}
            <antd.Button type="primary" icon={<CheckOutlined />} onClick={() => { setSaved(true); setDirty(false); }} disabled={!dirty || editingId !== null}>
              Publish Fee Schedule
            </antd.Button>
          </antd.Space>
        </div>
        {categories.map(cat => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>{cat}</div>
            <antd.Table rowKey="id" dataSource={fees.filter(f => f.category === cat)} pagination={false} size="small" columns={columns} />
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
    const [members, setMembers]       = React.useState(MOCK.mcmcTeamMembers.map(m => ({ ...m, roles: [...m.roles] })));
    const [roleDefs]                   = React.useState(MOCK.roleDefinitions);
    const [activeRole, setActiveRole]  = React.useState('officer');
    const [perfOpen, setPerfOpen]      = React.useState(null);  // member id
    const [addMemberOpen, setAddMemberOpen] = React.useState(false);
    const [addRoleTarget, setAddRoleTarget] = React.useState(null); // member id for role assignment
    const [newMemberForm, setNewMemberForm] = React.useState({ name: '', grade: '', email: '', department: 'CPQ', roles: [] });

    const roleColor = { officer: 'blue', recommender: 'green', verifier: 'orange', approver: 'red', 'team-lead': 'purple' };

    const roleDef = roleDefs.find(r => r.key === activeRole);
    const roleMembers = members.filter(m => m.roles.includes(activeRole));
    const lead = roleMembers.find(m => m.roles.includes('team-lead') || m.grade === 'N54' || m.grade === 'JUSA C') || roleMembers[0];

    const removeFromRole = (memberId) => {
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, roles: m.roles.filter(r => r !== activeRole) } : m));
      antd.message.success('Role removed. Changes will apply to new assignments only.');
    };

    const addRoleToMember = (memberId, role) => {
      setMembers(prev => prev.map(m => m.id === memberId && !m.roles.includes(role) ? { ...m, roles: [...m.roles, role] } : m));
      setAddRoleTarget(null);
      antd.message.success(`Role assigned.`);
    };

    const addNewMember = () => {
      if (!newMemberForm.name || !newMemberForm.email) { antd.message.error('Name and email are required.'); return; }
      const id = `OFF-${String(members.length + 11).padStart(3, '0')}`;
      setMembers(prev => [...prev, { id, initials: newMemberForm.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase(), ...newMemberForm, division: 'CPPG', reportsTo: lead?.id || null, phone: '' }]);
      setAddMemberOpen(false);
      setNewMemberForm({ name: '', grade: '', email: '', department: 'CPQ', roles: [] });
      antd.message.success('Team member added.');
    };

    const perfMember = perfOpen ? members.find(m => m.id === perfOpen) : null;
    const perfStats = MOCK.officerPerformance?.find(p => p.id === perfOpen) || { approved: 0, rejected: 0, avgTurnaround: 0, slaCompliance: 0, aiOverrides: 0 };

    return (
      <div>
        {/* Role selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {roleDefs.map(r => (
            <div key={r.key} onClick={() => setActiveRole(r.key)}
              style={{ padding: '10px 18px', border: `2px solid ${activeRole === r.key ? `var(--color-${r.color === 'blue' ? 'primary' : 'text-secondary'}, #555)` : 'var(--color-border)'}`, borderColor: activeRole === r.key ? (r.key === 'officer' ? 'var(--color-primary)' : r.key === 'recommender' ? '#389e0d' : r.key === 'verifier' ? '#d46b08' : r.key === 'approver' ? '#cf1322' : '#531dab') : 'var(--color-border)', borderRadius: 10, cursor: 'pointer', background: activeRole === r.key ? '#fafafa' : '#fff', minWidth: 160 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <antd.Tag color={r.color} style={{ margin: 0, fontSize: 11, fontWeight: 600 }}>{r.label}</antd.Tag>
                <antd.Badge count={members.filter(m => m.roles.includes(r.key)).length} style={{ background: 'var(--color-primary)' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.3 }}>{r.description.slice(0, 60)}…</div>
            </div>
          ))}
        </div>

        {/* Role detail header */}
        <antd.Card bordered style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <antd.Space>
                <antd.Tag color={roleDef?.color} style={{ fontWeight: 700, fontSize: 13 }}>{roleDef?.label}</antd.Tag>
                <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>{roleDef?.description}</antd.Typography.Text>
              </antd.Space>
              {lead && (
                <div style={{ marginTop: 8, fontSize: 12 }}>
                  <antd.Typography.Text type="secondary">Role Lead: </antd.Typography.Text>
                  <antd.Tag icon={<CrownOutlined />} color="gold" style={{ fontSize: 11 }}>{lead.name} · {lead.grade}</antd.Tag>
                </div>
              )}
            </div>
            <antd.Space>
              <antd.Button icon={<UsergroupAddOutlined />} onClick={() => setAddRoleTarget('new')}>Add existing member</antd.Button>
              <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => setAddMemberOpen(true)}>New team member</antd.Button>
            </antd.Space>
          </div>
        </antd.Card>

        {/* Members list for this role */}
        <antd.Table
          rowKey="id"
          dataSource={roleMembers}
          pagination={false}
          size="middle"
          locale={{ emptyText: 'No members assigned to this role yet.' }}
          columns={[
            { title: 'Officer', render: (_, m) => (
              <antd.Space>
                <antd.Avatar style={{ background: 'var(--color-primary)', fontSize: 12, fontWeight: 700 }}>{m.initials}</antd.Avatar>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{m.email}</div>
                </div>
              </antd.Space>
            )},
            { title: 'Grade', dataIndex: 'grade', render: v => <antd.Tag>{v}</antd.Tag> },
            { title: 'Department', dataIndex: 'department', render: v => <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
            { title: 'All Roles', dataIndex: 'roles', render: (roles, m) => (
              <antd.Space size={4} wrap>
                {roles.map(r => <antd.Tag key={r} color={roleColor[r]} style={{ fontSize: 10 }}>{roleDefs.find(d => d.key === r)?.label || r}</antd.Tag>)}
                <antd.Tooltip title="Assign additional role">
                  <antd.Tag style={{ cursor: 'pointer', border: '1px dashed var(--color-border)', fontSize: 10 }} onClick={() => setAddRoleTarget(m.id)}><PlusOutlined /> role</antd.Tag>
                </antd.Tooltip>
              </antd.Space>
            )},
            { title: '', render: (_, m) => (
              <antd.Space>
                <antd.Button size="small" icon={<BarChartOutlined />} onClick={() => setPerfOpen(m.id)}>Performance</antd.Button>
                <antd.Popconfirm title={`Remove ${m.name} from ${roleDef?.label}?`} okText="Remove" okButtonProps={{ danger: true }} onConfirm={() => removeFromRole(m.id)}>
                  <antd.Button size="small" danger icon={<CloseOutlined />} />
                </antd.Popconfirm>
              </antd.Space>
            )},
          ]}
        />

        {/* Assign role to existing member modal */}
        <antd.Modal title={`Assign ${roleDef?.label} role to…`} open={!!addRoleTarget && addRoleTarget !== 'new'} onCancel={() => setAddRoleTarget(null)} footer={null} width={480}>
          <antd.List
            dataSource={members.filter(m => !m.roles.includes(activeRole))}
            renderItem={m => (
              <antd.List.Item actions={[<antd.Button size="small" type="primary" onClick={() => addRoleToMember(m.id, activeRole)}>Assign</antd.Button>]}>
                <antd.List.Item.Meta
                  avatar={<antd.Avatar style={{ background: 'var(--color-primary)' }}>{m.initials}</antd.Avatar>}
                  title={<antd.Space>{m.name} <antd.Tag>{m.grade}</antd.Tag></antd.Space>}
                  description={<antd.Space size={4} wrap>{m.roles.map(r => <antd.Tag key={r} color={roleColor[r]} style={{ fontSize: 10 }}>{r}</antd.Tag>)}</antd.Space>}
                />
              </antd.List.Item>
            )}
            locale={{ emptyText: 'All team members already have this role.' }}
          />
        </antd.Modal>

        {/* Also handle addRoleTarget='new' by opening add member modal */}
        {addRoleTarget === 'new' && !addMemberOpen && (() => { setAddRoleTarget(null); setAddMemberOpen(true); return null; })()}

        {/* Add new member modal */}
        <antd.Modal title="Add New MCMC Team Member" open={addMemberOpen} onCancel={() => setAddMemberOpen(false)} onOk={addNewMember} okText="Add Member" width={520}>
          <antd.Form layout="vertical" style={{ marginTop: 8 }}>
            <antd.Row gutter={16}>
              <antd.Col span={14}><antd.Form.Item label="Full Name" required><antd.Input value={newMemberForm.name} onChange={e => setNewMemberForm(f => ({ ...f, name: e.target.value }))} placeholder="En. Ahmad bin Hassan" /></antd.Form.Item></antd.Col>
              <antd.Col span={10}><antd.Form.Item label="Grade" required><antd.Select value={newMemberForm.grade} onChange={v => setNewMemberForm(f => ({ ...f, grade: v }))} placeholder="Select…" options={['N41','N44','N48','N52','N54','JUSA C'].map(g => ({ value: g, label: g }))} style={{ width: '100%' }} /></antd.Form.Item></antd.Col>
              <antd.Col span={24}><antd.Form.Item label="Email" required><antd.Input value={newMemberForm.email} onChange={e => setNewMemberForm(f => ({ ...f, email: e.target.value }))} placeholder="ahmad@mcmc.gov.my" /></antd.Form.Item></antd.Col>
              <antd.Col span={12}><antd.Form.Item label="Department"><antd.Select value={newMemberForm.department} onChange={v => setNewMemberForm(f => ({ ...f, department: v }))} options={['CPQ','SAU','Directorate','IT & Systems'].map(d => ({ value: d, label: d }))} style={{ width: '100%' }} /></antd.Form.Item></antd.Col>
              <antd.Col span={12}><antd.Form.Item label="Assign Roles"><antd.Select mode="multiple" value={newMemberForm.roles} onChange={v => setNewMemberForm(f => ({ ...f, roles: v }))} options={roleDefs.map(r => ({ value: r.key, label: r.label }))} style={{ width: '100%' }} /></antd.Form.Item></antd.Col>
            </antd.Row>
          </antd.Form>
        </antd.Modal>

        {/* Performance drawer */}
        <antd.Drawer title={<antd.Space><BarChartOutlined />{perfMember?.name} — Performance</antd.Space>} open={!!perfOpen} onClose={() => setPerfOpen(null)} width={500}>
          {perfMember && (
            <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>
              <antd.Card bordered size="small">
                <antd.Descriptions column={2} size="small">
                  <antd.Descriptions.Item label="Grade">{perfMember.grade}</antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Department">{perfMember.department}</antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Email"><a>{perfMember.email}</a></antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Phone">{perfMember.phone || '—'}</antd.Descriptions.Item>
                  <antd.Descriptions.Item label="Roles" span={2}><antd.Space>{perfMember.roles.map(r => <antd.Tag key={r} color={roleColor[r]} style={{ fontSize: 11 }}>{roleDefs.find(d => d.key === r)?.label || r}</antd.Tag>)}</antd.Space></antd.Descriptions.Item>
                </antd.Descriptions>
              </antd.Card>
              <antd.Typography.Text type="secondary" style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .4 }}>This Month · Individual Performance</antd.Typography.Text>
              <antd.Row gutter={[12, 12]}>
                {[
                  { label: 'Approved', value: perfStats.approved || 12, color: 'var(--color-success)' },
                  { label: 'Rejected', value: perfStats.rejected || 2, color: 'var(--color-danger, #cf1322)' },
                  { label: 'Avg Turnaround', value: `${perfStats.avgTurnaround || 4.1}d`, color: 'var(--color-primary)' },
                  { label: 'SLA Compliance', value: `${perfStats.slaCompliance || 94}%`, color: perfStats.slaCompliance >= 90 ? 'var(--color-success)' : 'var(--color-warning)' },
                  { label: 'AI Overrides', value: perfStats.aiOverrides || 3, color: 'var(--color-text-secondary)' },
                  { label: 'In Queue Now', value: 2, color: 'var(--color-warning)' },
                ].map((s, i) => (
                  <antd.Col span={8} key={i}>
                    <div style={{ padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  </antd.Col>
                ))}
              </antd.Row>
              <antd.Typography.Text type="secondary" style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .4 }}>Team Performance · {perfMember.division} / {perfMember.department}</antd.Typography.Text>
              <antd.Table
                rowKey="id"
                size="small"
                pagination={false}
                dataSource={members.filter(m => m.department === perfMember.department)}
                columns={[
                  { title: 'Officer', render: (_, m) => <antd.Space><antd.Avatar size={24} style={{ background: 'var(--color-primary)', fontSize: 10 }}>{m.initials}</antd.Avatar><span style={{ fontSize: 12 }}>{m.name.split(' ').slice(-1)[0]}</span></antd.Space> },
                  { title: 'Approved', render: (_, m) => { const p = MOCK.officerPerformance?.find(p => p.id === m.id); return p?.approved ?? '—'; }},
                  { title: 'SLA', render: (_, m) => { const p = MOCK.officerPerformance?.find(p => p.id === m.id); return p ? <antd.Tag color={p.slaCompliance >= 90 ? 'green' : 'orange'}>{p.slaCompliance}%</antd.Tag> : '—'; }},
                ]}
              />
            </antd.Space>
          )}
        </antd.Drawer>
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

  // ── SA LETTER CONFIG ───────────────────────────────────────────────────────
  const SALetterConfigTab = () => {
    const LETTER_FIELDS = [
      { id: 'ref',        section: 'Header',      label: 'Reference Number',         editable: false, note: 'Auto-generated by system' },
      { id: 'date',       section: 'Header',      label: 'Issue Date',               editable: false, note: 'Locked to date of final approval' },
      { id: 'addressee',  section: 'Addressee',   label: 'Addressee Name & Title',   editable: true,  note: 'OIC may correct applicant name/title' },
      { id: 'company',    section: 'Addressee',   label: 'Company / Organisation',   editable: false, note: 'Pulled from verified applicant profile' },
      { id: 'subject',    section: 'Body',        label: 'Subject Line (Purpose)',   editable: false, note: 'Derived from approved purpose category' },
      { id: 'equip',      section: 'Body',        label: 'Equipment Block',          editable: true,  note: 'OIC may correct model / manufacturer' },
      { id: 'qty',        section: 'Body',        label: 'Quantity',                 editable: false, note: 'Locked to payment receipt quantity' },
      { id: 'freq',       section: 'Body',        label: 'Frequency Range',          editable: true,  note: 'OIC may refine declared range' },
      { id: 'purpose',    section: 'Body',        label: 'Declared Purpose',         editable: false, note: 'Locked to approved purpose' },
      { id: 'cond1',      section: 'Conditions',  label: 'Condition 1 — Location',   editable: true,  note: 'OIC may specify exact site address' },
      { id: 'cond2',      section: 'Conditions',  label: 'Condition 2 — Duration',   editable: true,  note: 'OIC may adjust approved duration' },
      { id: 'cond3',      section: 'Conditions',  label: 'Condition 3 — Surrender',  editable: false, note: 'Standard clause — not editable' },
      { id: 'cond4',      section: 'Conditions',  label: 'Condition 4 — Inspection', editable: false, note: 'Restricted tier only; not editable' },
      { id: 'signatory',  section: 'Signature',   label: 'Signatory Name & Grade',   editable: false, note: 'Auto-filled from final approver profile' },
    ];

    const [fields, setFields] = React.useState(LETTER_FIELDS);
    const [dirty, setDirty] = React.useState(false);

    function toggle(id) {
      setFields(prev => prev.map(f => f.id === id ? { ...f, editable: !f.editable } : f));
      setDirty(true);
    }

    const sections = [...new Set(fields.map(f => f.section))];

    return (
      <div style={{ maxWidth: 820 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <antd.Typography.Title level={5} style={{ margin: 0 }}>SA Letter Field Permissions</antd.Typography.Title>
            <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Toggle which fields the assigned OIC may edit before issuing the SA Letter. Locked fields are read-only in the officer portal.
            </antd.Typography.Text>
          </div>
          <antd.Button
            type="primary"
            disabled={!dirty}
            onClick={() => { setDirty(false); antd.message.success('SA Letter field permissions published'); }}
          >
            Publish Changes
          </antd.Button>
        </div>

        <antd.Alert type="info" showIcon style={{ marginBottom: 16 }} message="Changes take effect for all new SA applications. In-progress applications retain their existing field permissions." />

        {sections.map(section => (
          <antd.Card key={section} size="small" title={<span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .4, color: 'var(--color-text-muted)' }}>{section}</span>} style={{ marginBottom: 12 }} bordered>
            {fields.filter(f => f.section === section).map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--color-divider)' }}>
                <antd.Switch
                  checked={f.editable}
                  onChange={() => toggle(f.id)}
                  size="small"
                  checkedChildren="Editable"
                  unCheckedChildren="Locked"
                  style={{ minWidth: 80 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{f.note}</div>
                </div>
                <antd.Tag color={f.editable ? 'blue' : 'default'} style={{ minWidth: 60, textAlign: 'center' }}>
                  {f.editable ? 'OIC editable' : 'System locked'}
                </antd.Tag>
              </div>
            ))}
          </antd.Card>
        ))}
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

  // ── WORKFLOW DIAGRAM ──────────────────────────────────────────────────────────
  const FlowDiagramTab = () => {
    const [appType, setAppType] = React.useState('sdoc-ab');

    const roleTag = { supplier: 'geekblue', system: 'purple', officer: 'blue', recommender: 'green', verifier: 'orange', approver: 'red', rmcd: 'gold', esb: 'default', mixed: 'cyan' };

    const WORKFLOWS = {
      'sdoc-ab': {
        label: 'SDoC — Scheme A / B', badge: 'orange', totalSLA: '11 working days',
        note: 'Full 4-tier approval chain: Officer → Recommender → Verifier → Approver',
        stages: [
          { n: 1, label: 'Submit Application', roleKey: 'supplier', roleLabel: 'Supplier', sla: 'Same day', actions: ['Selects scheme', 'Uploads CoC + docs', 'Pays registration fee', 'Signs declaration (Part E)'] },
          { n: 2, label: 'AI Validation', roleKey: 'system', roleLabel: 'System (Qwen2.5-VL)', sla: '< 5 min', actions: ['Scores all documents (8 sub-scores)', 'Routes < 70 as Priority', 'Routes ≥ 90 (Scheme C only) for auto-accept'] },
          { n: 3, label: 'OIC / Officer Review', roleKey: 'officer', roleLabel: 'CPPG Officer', sla: '3 wd', actions: ['Full document review', 'Iterate (request revision)', 'Escalate to Recommender'] },
          { n: 4, label: 'Recommender', roleKey: 'recommender', roleLabel: 'Recommender (P5/P6)', sla: '3 wd', actions: ['Endorse application', 'Return to Officer for clarification'] },
          { n: 5, label: 'Verifier', roleKey: 'verifier', roleLabel: 'Verifier (P7)', sla: '3 wd', actions: ['Policy and technical verification', 'Return to Recommender'] },
          { n: 6, label: 'Approver', roleKey: 'approver', roleLabel: 'Approver (P8)', sla: '2 wd', actions: ['Accept → trigger certificate issuance', 'Not Accept (reject with reasons)', 'Return for further review'] },
          { n: 7, label: 'Certificate Issued', roleKey: 'system', roleLabel: 'System', sla: 'Automatic', actions: ['RCN generated (format: RCN-MMYY-XXXXX)', 'Label registry updated', 'Supplier notified by email'] },
        ],
      },
      'sdoc-c': {
        label: 'SDoC — Scheme C (Self-Declaration)', badge: 'green', totalSLA: '0 – 1 working day',
        note: 'AI auto-accept path for scores ≥ 90; officer review only when score < 90',
        stages: [
          { n: 1, label: 'Submit Application', roleKey: 'supplier', roleLabel: 'Supplier', sla: 'Same day', actions: ['Self-declaration (no CoC required)', 'Standards Declaration letter only', 'Pays registration fee'] },
          { n: 2, label: 'AI Validation', roleKey: 'system', roleLabel: 'System (Qwen2.5-VL)', sla: '< 5 min', actions: ['Score ≥ 90 → Auto-accept path', 'Score < 90 → Route to Officer', 'Score < 70 → Priority queue'] },
          { n: 3, label: 'Auto-Accept or Officer Review', roleKey: 'mixed', roleLabel: 'System / CPPG Officer', sla: '0 – 1 wd', actions: ['Auto-accept if AI score ≥ 90 (expedited)', 'Officer confirms if score < 90', 'Iterate if docs insufficient'] },
          { n: 4, label: 'Certificate Issued', roleKey: 'system', roleLabel: 'System', sla: 'Automatic', actions: ['RCN generated', 'Label registry updated', 'Supplier notified'] },
        ],
      },
      'sa': {
        label: 'Special Approval', badge: 'purple', totalSLA: '30 – 45 working days',
        note: 'Risk-tiered: Low/Med risk = standard chain; High risk or Prohibited = extended review + MOSTI endorsement',
        stages: [
          { n: 1, label: 'Submit Application', roleKey: 'supplier', roleLabel: 'Supplier', sla: 'Same day', actions: ['Purpose declaration (R&D / Demo / Trial etc.)', 'Risk tier auto-classified', 'Prohibited equipment: extra MOSTI docs required'] },
          { n: 2, label: 'OIC / Officer Review', roleKey: 'officer', roleLabel: 'CPPG Officer', sla: '5 wd', actions: ['Technical assessment', 'Risk tier validation', 'Iterate or escalate to Recommender'] },
          { n: 3, label: 'Recommender', roleKey: 'recommender', roleLabel: 'Recommender (P5/P6)', sla: '5 wd', actions: ['Endorsement with conditions', 'SA Letter draft prepared'] },
          { n: 4, label: 'Verifier', roleKey: 'verifier', roleLabel: 'Verifier (P7)', sla: '5 wd', actions: ['Policy compliance review', 'SA Letter reviewed & finalised'] },
          { n: 5, label: 'Approver', roleKey: 'approver', roleLabel: 'Approver (P8)', sla: '5 wd', actions: ['Issue SA Letter', 'Reject with detailed reasons'] },
          { n: 6, label: 'SA Letter Issued', roleKey: 'system', roleLabel: 'System', sla: 'Automatic', actions: ['SA Letter PDF emailed to supplier', 'Valid for one shipment/purpose only'] },
        ],
      },
      'renewal': {
        label: 'Certificate Renewal', badge: 'blue', totalSLA: '3 working days',
        note: 'CoC must remain valid for Scheme A. Renewal period capped at remaining CoC validity or 5 years, whichever is shorter.',
        stages: [
          { n: 1, label: 'Submit Renewal', roleKey: 'supplier', roleLabel: 'Supplier', sla: 'Same day', actions: ['Select certificate', 'Update docs if needed (Scheme A: CoC re-upload)', 'Select renewal period (1–5 yr, capped)', 'Sign declaration + pay fee'] },
          { n: 2, label: 'Document Re-check', roleKey: 'mixed', roleLabel: 'System + CPPG Officer', sla: '2 wd', actions: ['AI re-validates updated documents', 'CoC validity check for Scheme A', 'Officer confirms compliance'] },
          { n: 3, label: 'Certificate Renewed', roleKey: 'system', roleLabel: 'System', sla: 'Automatic', actions: ['Expiry date extended', 'RCN updated in label registry', 'Renewal history recorded'] },
        ],
      },
      'imei': {
        label: 'IMEI / SN Registration', badge: 'cyan', totalSLA: 'Same day (< 2 min)',
        note: 'Fully automated: format validation + duplicate check + GSMA DB lookup. No manual approval step.',
        stages: [
          { n: 1, label: 'Submit', roleKey: 'supplier', roleLabel: 'Supplier', sla: 'Same day', actions: ['Link to RCN', 'Enter IMEI/SN range manually or upload CSV', 'Confirm batch quantity'] },
          { n: 2, label: 'Format & Uniqueness Validation', roleKey: 'system', roleLabel: 'System', sla: '< 2 min', actions: ['Luhn algorithm check (IMEI)', 'Duplicate check against NCEF DB', 'GSMA TAC lookup for brand/model match'] },
          { n: 3, label: 'Registered', roleKey: 'system', roleLabel: 'System', sla: 'Automatic', actions: ['IMEIs/SNs linked to RCN', 'Receipt generated (format: IMEI-RCP-XXXX)', 'Importation validation now possible'] },
        ],
      },
      'import': {
        label: 'Importation (via RMCD)', badge: 'default', totalSLA: 'RMCD-determined',
        note: 'MCMC validates equipment reference and transmits via IBM webMethods ESB. Fees and CoA are RMCD\'s responsibility.',
        stages: [
          { n: 1, label: 'Submit Application', roleKey: 'supplier', roleLabel: 'Supplier', sla: 'Same day', actions: ['Select permit type (Scheme A/B/C or SA)', 'Validate RCN or SA reference', 'Enter trader, consignor, logistics details'] },
          { n: 2, label: 'NCEF Validation', roleKey: 'system', roleLabel: 'System', sla: '< 5 min', actions: ['RCN/SA cross-check against NCEF registry', 'IMEI/SN quantity verification', 'Block if validation fails'] },
          { n: 3, label: 'Transmit to RMCD', roleKey: 'esb', roleLabel: 'IBM webMethods ESB', sla: '< 1 min', actions: ['Push to RMCD MyOGA via ESB', 'RMCD reference number assigned'] },
          { n: 4, label: 'RMCD Review & Payment', roleKey: 'rmcd', roleLabel: 'RMCD', sla: 'RMCD-determined', actions: ['Fee determination by RMCD', 'Importer pays at RMCD MyOGA portal'] },
          { n: 5, label: 'CoA Issued', roleKey: 'rmcd', roleLabel: 'RMCD', sla: 'Post-payment', actions: ['CoA format: CoA-MMYY-XXXXXX', 'Status reflected in NCEF import permits list'] },
        ],
      },
    };

    const wf = WORKFLOWS[appType];

    return (
      <div>
        <antd.Alert type="info" showIcon style={{ marginBottom: 20 }}
          message="Workflow diagrams are read-only. Modify stage assignments in the Workflow Config tab."
        />
        <div style={{ marginBottom: 20 }}>
          <antd.Typography.Text strong style={{ marginRight: 12 }}>Application type:</antd.Typography.Text>
          <antd.Radio.Group value={appType} onChange={e => setAppType(e.target.value)} optionType="button" buttonStyle="solid">
            {Object.entries(WORKFLOWS).map(([k, w]) => (
              <antd.Radio.Button key={k} value={k}>{w.label.split(' — ')[0].split(' (')[0]}</antd.Radio.Button>
            ))}
          </antd.Radio.Group>
        </div>

        <antd.Card bordered style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <antd.Space>
                <antd.Typography.Title level={4} style={{ margin: 0 }}>{wf.label}</antd.Typography.Title>
                <antd.Tag color="blue">Total SLA: {wf.totalSLA}</antd.Tag>
                <antd.Tag>{wf.stages.length} stages</antd.Tag>
              </antd.Space>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>{wf.note}</div>
            </div>
          </div>

          {/* Flow diagram */}
          <div style={{ overflowX: 'auto', paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, minWidth: 'max-content' }}>
              {wf.stages.map((s, i) => (
                <React.Fragment key={s.n}>
                  {i > 0 && (
                    <div style={{ alignSelf: 'flex-start', marginTop: 28, padding: '0 4px', color: 'var(--color-text-muted)', fontSize: 18, userSelect: 'none' }}>→</div>
                  )}
                  <div style={{ width: 200, background: '#fafafa', border: '1.5px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -10, left: 14, background: 'var(--color-primary)', color: '#fff', borderRadius: 10, fontSize: 10, fontWeight: 700, padding: '1px 8px' }}>Step {s.n}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
                    <antd.Tag color={roleTag[s.roleKey] || 'default'} style={{ marginBottom: 8, fontSize: 10 }}>{s.roleLabel}</antd.Tag>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 8 }}>SLA: <b>{s.sla}</b></div>
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
                      {s.actions.map((a, j) => (
                        <div key={j} style={{ fontSize: 11, color: 'var(--color-text-secondary)', lineHeight: 1.5, display: 'flex', gap: 4, alignItems: 'baseline' }}>
                          <span style={{ color: 'var(--color-primary)', fontSize: 8, marginTop: 3 }}>●</span>{a}
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </antd.Card>

        {/* Stage summary table */}
        <antd.Card title="Stage Summary" bordered size="small">
          <antd.Table rowKey="n" pagination={false} size="small"
            dataSource={wf.stages}
            columns={[
              { title: '#', dataIndex: 'n', width: 40, align: 'center' },
              { title: 'Stage', dataIndex: 'label', render: v => <b>{v}</b> },
              { title: 'Responsible', dataIndex: 'roleLabel', render: (v, r) => <antd.Tag color={roleTag[r.roleKey] || 'default'} style={{ fontSize: 11 }}>{v}</antd.Tag> },
              { title: 'SLA', dataIndex: 'sla' },
              { title: 'Key Actions', dataIndex: 'actions', render: v => v.slice(0, 2).map((a, i) => <div key={i} style={{ fontSize: 11 }}>{a}</div>) },
            ]}
          />
        </antd.Card>
      </div>
    );
  };

  // ── EQUIPMENT TYPE MASTER LIST ─────────────────────────────────────────────
  const EquipmentTypeTab = () => {
    const INIT_TYPES = [
      { id: 1, code: 'TC-001', name: 'Mobile Phone / Smartphone',   scheme: 'A/B/C', active: true },
      { id: 2, code: 'TC-002', name: 'Wi-Fi / WLAN Device',         scheme: 'A/B/C', active: true },
      { id: 3, code: 'TC-003', name: 'Bluetooth Device',            scheme: 'B/C',   active: true },
      { id: 4, code: 'TC-004', name: 'IoT / Connected Device',      scheme: 'B/C',   active: true },
      { id: 5, code: 'TC-005', name: 'Network Equipment (Active)',  scheme: 'A',     active: true },
      { id: 6, code: 'TC-006', name: 'Network Equipment (Passive)', scheme: 'A/B',   active: true },
      { id: 7, code: 'TC-007', name: 'Radar / Sensing Equipment',   scheme: 'A',     active: false },
      { id: 8, code: 'TC-008', name: 'Broadcasting Equipment',      scheme: 'A',     active: true },
      { id: 9, code: 'TC-009', name: 'Satellite Terminal',          scheme: 'SA',    active: true },
      { id: 10,code: 'TC-010', name: 'Temporary Import (R&D/Demo)', scheme: 'D',     active: true },
    ];
    const [types, setTypes] = React.useState(INIT_TYPES);
    const [editId, setEditId] = React.useState(null);
    const [editBuf, setEditBuf] = React.useState({});
    const [addOpen, setAddOpen] = React.useState(false);
    const [draft, setDraft] = React.useState({ code: '', name: '', scheme: 'A/B/C', active: true });
    const [dirty, setDirty] = React.useState(false);

    const schemeOptions = ['A', 'B', 'C', 'A/B', 'A/B/C', 'B/C', 'A/C', 'SA', 'D'].map(v => ({ value: v, label: v }));

    function startEdit(t) { setEditId(t.id); setEditBuf({ code: t.code, name: t.name, scheme: t.scheme, active: t.active }); }
    function commitEdit(id) {
      setTypes(prev => prev.map(t => t.id === id ? { ...t, ...editBuf } : t));
      setEditId(null); setDirty(true);
    }
    function removeType(id) { setTypes(prev => prev.filter(t => t.id !== id)); setDirty(true); }
    function addType() {
      if (!draft.code || !draft.name) return;
      setTypes(prev => [...prev, { ...draft, id: Date.now() }]);
      setAddOpen(false); setDraft({ code: '', name: '', scheme: 'A/B/C', active: true }); setDirty(true);
    }

    const cols = [
      { title: 'Tech Code', dataIndex: 'code', width: 110, render: (v, r) => editId === r.id
        ? <antd.Input size="small" value={editBuf.code} onChange={e => setEditBuf(b => ({ ...b, code: e.target.value }))} style={{ width: 90 }} />
        : <antd.Typography.Text code style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
      { title: 'Equipment Type Name', dataIndex: 'name', render: (v, r) => editId === r.id
        ? <antd.Input size="small" value={editBuf.name} onChange={e => setEditBuf(b => ({ ...b, name: e.target.value }))} />
        : <span style={{ fontWeight: 500 }}>{v}</span> },
      { title: 'Eligible Scheme(s)', dataIndex: 'scheme', width: 160, render: (v, r) => editId === r.id
        ? <antd.Select size="small" value={editBuf.scheme} onChange={s => setEditBuf(b => ({ ...b, scheme: s }))} options={schemeOptions} style={{ width: 110 }} />
        : <antd.Tag>{v}</antd.Tag> },
      { title: 'Active', dataIndex: 'active', width: 80, align: 'center', render: (v, r) => editId === r.id
        ? <antd.Switch size="small" checked={editBuf.active} onChange={a => setEditBuf(b => ({ ...b, active: a }))} />
        : <antd.Switch size="small" checked={v} disabled /> },
      { title: '', width: 120, align: 'right', render: (_, r) => editId === r.id
        ? <antd.Space size={4}>
            <antd.Button size="small" type="primary" onClick={() => commitEdit(r.id)}>Save</antd.Button>
            <antd.Button size="small" onClick={() => setEditId(null)}>Cancel</antd.Button>
          </antd.Space>
        : <antd.Space size={4}>
            <antd.Button size="small" icon={<EditOutlined />} onClick={() => startEdit(r)} />
            <antd.Button size="small" icon={<DeleteOutlined />} danger onClick={() => removeType(r.id)} />
          </antd.Space> },
    ];

    return (
      <antd.Card title={<antd.Space><TagOutlined /> Equipment Type Master List</antd.Space>} bordered
        extra={<antd.Space>
          {dirty && <antd.Button type="primary" onClick={() => { setDirty(false); antd.message.success('Equipment types published'); }}>Publish Changes</antd.Button>}
          <antd.Button icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>Add Type</antd.Button>
        </antd.Space>}>
        <antd.Alert type="info" showIcon style={{ marginBottom: 16 }}
          message="Equipment types and technical codes drive the product category dropdown in new SDoC applications and determine eligible certification schemes." />
        <antd.Table rowKey="id" columns={cols} dataSource={types} size="small" pagination={false} />

        <antd.Modal open={addOpen} title="Add Equipment Type" onCancel={() => setAddOpen(false)} onOk={addType}
          okText="Add" okButtonProps={{ disabled: !draft.code || !draft.name }}>
          <div style={{ display: 'grid', gap: 14, marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Technical Code <span style={{ color: 'var(--color-danger)' }}>*</span></div>
              <antd.Input value={draft.code} onChange={e => setDraft(d => ({ ...d, code: e.target.value }))} placeholder="TC-011" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Equipment Type Name <span style={{ color: 'var(--color-danger)' }}>*</span></div>
              <antd.Input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} placeholder="e.g. Wearable Device" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Eligible Scheme(s)</div>
              <antd.Select value={draft.scheme} onChange={s => setDraft(d => ({ ...d, scheme: s }))} options={schemeOptions} style={{ width: '100%' }} />
            </div>
          </div>
        </antd.Modal>
      </antd.Card>
    );
  };

  // ── NOTIFICATION TEMPLATE EDITOR ───────────────────────────────────────────
  const NotifTemplateTab = () => {
    const TEMPLATES = [
      { id: 'tpl-01', event: 'Application Submitted',    channel: 'Email',  subject: 'NCEF: Application {{appId}} Received', active: true },
      { id: 'tpl-02', event: 'Application Under Review', channel: 'Email',  subject: 'NCEF: Your Application {{appId}} is Under Review', active: true },
      { id: 'tpl-03', event: 'Iteration Required',       channel: 'Email',  subject: 'NCEF: Action Required – {{appId}} Needs Amendment', active: true },
      { id: 'tpl-04', event: 'Iteration Required',       channel: 'In-App', subject: 'Action required: {{appId}} returned for amendment', active: true },
      { id: 'tpl-05', event: 'Application Approved',     channel: 'Email',  subject: 'NCEF: Certificate Issued for {{appId}}', active: true },
      { id: 'tpl-06', event: 'Application Rejected',     channel: 'Email',  subject: 'NCEF: Application {{appId}} Not Approved', active: true },
      { id: 'tpl-07', event: 'Certificate Expiring',     channel: 'Email',  subject: 'NCEF: Certificate {{rcn}} Expiring in {{days}} Days', active: true },
      { id: 'tpl-08', event: 'Payment Received',         channel: 'Email',  subject: 'NCEF: Payment Confirmed – {{appId}}', active: true },
      { id: 'tpl-09', event: 'Account Expiring',         channel: 'Email',  subject: 'NCEF: Your Supplier Account Expires in {{days}} Days', active: true },
      { id: 'tpl-10', event: 'Draft Auto-Lapse Warning', channel: 'Email',  subject: 'NCEF: Draft Application {{appId}} Will Lapse in {{days}} Days', active: true },
    ];

    const BODY_TPL = `Dear {{name}},

This is an automated notification from the NCEF Portal (National Communication Equipment Framework), operated by the Malaysian Communications and Multimedia Commission (MCMC).

{{body}}

For enquiries, contact CPPG at cppg@mcmc.gov.my or call 03-8688 8000.

Regards,
CPPG Certification Division
Malaysian Communications and Multimedia Commission (MCMC)

---
This email was sent to {{email}}. Do not reply to this automated message.`;

    const [templates, setTemplates] = React.useState(TEMPLATES);
    const [selected, setSelected] = React.useState('tpl-01');
    const [body, setBody] = React.useState(BODY_TPL);
    const [dirty, setDirty] = React.useState(false);
    const [preview, setPreview] = React.useState(false);

    const tpl = templates.find(t => t.id === selected);
    const previewBody = body.replace(/\{\{name\}\}/g, 'Nurul Aisyah binti Ahmad')
      .replace(/\{\{email\}\}/g, 'nurul.aisyah@axiatadigital.com')
      .replace(/\{\{appId\}\}/g, 'APP-0426-00088')
      .replace(/\{\{rcn\}\}/g, 'RCN-0326-00430')
      .replace(/\{\{days\}\}/g, '14')
      .replace(/\{\{body\}\}/g, 'Your application has been received and will be reviewed by the Certification team within the SLA period.');

    return (
      <antd.Row gutter={16}>
        <antd.Col span={8}>
          <antd.Card title={<antd.Space><BellOutlined /> Templates</antd.Space>} bordered bodyStyle={{ padding: 0 }}>
            <antd.List
              dataSource={templates}
              renderItem={t => (
                <antd.List.Item
                  onClick={() => { setSelected(t.id); setDirty(false); }}
                  style={{ padding: '10px 16px', cursor: 'pointer', background: selected === t.id ? 'var(--color-primary-soft)' : 'transparent', borderLeft: selected === t.id ? '3px solid var(--color-primary)' : '3px solid transparent' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: selected === t.id ? 700 : 500, fontSize: 13 }}>{t.event}</div>
                    <antd.Space size={4} style={{ marginTop: 2 }}>
                      <antd.Tag style={{ fontSize: 10 }}>{t.channel}</antd.Tag>
                      {!t.active && <antd.Tag color="red" style={{ fontSize: 10 }}>Disabled</antd.Tag>}
                    </antd.Space>
                  </div>
                  <antd.Switch size="small" checked={t.active} onClick={e => { e.stopPropagation(); setTemplates(prev => prev.map(x => x.id === t.id ? { ...x, active: !x.active } : x)); }} />
                </antd.List.Item>
              )}
            />
          </antd.Card>
        </antd.Col>
        <antd.Col span={16}>
          {tpl && (
            <antd.Card
              title={<span>{tpl.event} <antd.Tag style={{ marginLeft: 4 }}>{tpl.channel}</antd.Tag></span>}
              bordered
              extra={<antd.Space>
                <antd.Button size="small" onClick={() => setPreview(true)}>Preview</antd.Button>
                {dirty && <antd.Button size="small" type="primary" onClick={() => { setDirty(false); antd.message.success('Template saved'); }}>Save</antd.Button>}
              </antd.Space>}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Subject Line</div>
                <antd.Input value={tpl.subject} onChange={e => { setTemplates(prev => prev.map(x => x.id === tpl.id ? { ...x, subject: e.target.value } : x)); setDirty(true); }} />
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>Available variables: <code>{'{{appId}}'}</code> <code>{'{{name}}'}</code> <code>{'{{rcn}}'}</code> <code>{'{{days}}'}</code></div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Email Body</div>
                <antd.Input.TextArea rows={14} value={body} onChange={e => { setBody(e.target.value); setDirty(true); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }} />
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>Use <code>{'{{body}}'}</code> as the event-specific message placeholder. Standard MCMC header/footer is injected automatically.</div>
              </div>
            </antd.Card>
          )}
        </antd.Col>

        <antd.Modal open={preview} title="Email Preview" onCancel={() => setPreview(false)} footer={<antd.Button onClick={() => setPreview(false)}>Close</antd.Button>} width={620}>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: '#0B4F91', padding: '16px 24px', color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>NCEF Portal</div>
              <div style={{ fontSize: 11, opacity: .75 }}>Malaysian Communications and Multimedia Commission (MCMC)</div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Subject: <strong>{tpl?.subject?.replace(/\{\{appId\}\}/g,'APP-0426-00088').replace(/\{\{rcn\}\}/g,'RCN-0326-00430').replace(/\{\{days\}\}/g,'14')}</strong></div>
              <antd.Divider style={{ margin: '12px 0' }} />
              <pre style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.7 }}>{previewBody}</pre>
            </div>
          </div>
        </antd.Modal>
      </antd.Row>
    );
  };

  const tabs = [
    { key: 'fees',          label: <antd.Space><DollarOutlined />Fee Structure</antd.Space>,          children: <FeeTab /> },
    { key: 'iteration',     label: <antd.Space><HistoryOutlined />Iteration & SLA</antd.Space>,        children: <IterationTab /> },
    { key: 'workflow',      label: <antd.Space><BranchesOut_e />Workflow Config</antd.Space>,          children: <WorkflowTab /> },
    { key: 'flow-diagram',  label: <antd.Space><NodeIndexOut_e />Workflow Diagram</antd.Space>,        children: <FlowDiagramTab /> },
    { key: 'ai',            label: <antd.Space><RobotOutlined />AI Thresholds</antd.Space>,            children: <AITab /> },
    { key: 'sa-letter',       label: <antd.Space><FileTextOutlined />SA Letter Config</antd.Space>,        children: <SALetterConfigTab /> },
    { key: 'equipment-types', label: <antd.Space><TagOutlined />Equipment Types</antd.Space>,               children: <EquipmentTypeTab /> },
    { key: 'notif-templates', label: <antd.Space><BellOutlined />Notification Templates</antd.Space>,       children: <NotifTemplateTab /> },
    { key: 'announcements',   label: <antd.Space><EyeOutlined />Announcements</antd.Space>,                 children: <AnnouncementsTab /> },
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

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT MANAGER SCREENS (§5.11)
// ─────────────────────────────────────────────────────────────────────────────

SCREENS['cm-dashboard'] = function CMDashboard({ nav, currentUser }) {
  const cm = currentUser || MOCK.profiles['content-manager'];
  const stats = [
    { label: 'Published Announcements', value: 8,  icon: <BellOutlined />,      color: 'var(--color-primary)' },
    { label: 'Draft Articles',          value: 3,  icon: <FormOutlined_e />,     color: 'var(--color-warning)' },
    { label: 'Active FAQ Items',        value: 24, icon: <CheckCircleOutlined />, color: 'var(--color-success)' },
    { label: 'Pending Review',          value: 2,  icon: <WarningOutlined />,    color: 'var(--color-danger)' },
  ];
  const recentActivity = [
    { action: 'Published', title: 'NCEF Fee Schedule Update 2026', ts: '2026-05-04 14:32', by: cm.name },
    { action: 'Updated',   title: 'How to Register — Step-by-Step Guide', ts: '2026-05-03 09:15', by: cm.name },
    { action: 'Drafted',   title: 'New Prohibited Equipment Category Announcement', ts: '2026-05-02 16:44', by: cm.name },
    { action: 'Published', title: 'System Maintenance Notice — 10 May 2026', ts: '2026-05-01 11:20', by: cm.name },
  ];
  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Content Manager · MCMC</div>
        <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Content Dashboard</antd.Typography.Title>
        <antd.Typography.Text type="secondary">{cm.name} · {cm.department}</antd.Typography.Text>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map(s => (
          <antd.Col xs={12} md={6} key={s.label}>
            <antd.Card bordered bodyStyle={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 24, color: s.color }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            </antd.Card>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Row gutter={16}>
        <antd.Col span={14}>
          <antd.Card title="Recent Activity" bordered>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-divider)' : 'none' }}>
                <div>
                  <antd.Tag color={a.action === 'Published' ? 'green' : a.action === 'Updated' ? 'blue' : 'gold'} style={{ fontSize: 10 }}>{a.action}</antd.Tag>
                  <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 6 }}>{a.title}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0, marginLeft: 12 }}>{a.ts.split(' ')[0]}</div>
              </div>
            ))}
          </antd.Card>
        </antd.Col>
        <antd.Col span={10}>
          <antd.Card title="Quick Actions" bordered>
            <antd.Space direction="vertical" style={{ width: '100%' }}>
              <antd.Button block icon={<PlusOutlined />} onClick={() => nav('cm-announcements')}>New Announcement</antd.Button>
              <antd.Button block icon={<FormOutlined_e />} onClick={() => nav('cm-faq')}>Edit FAQ Item</antd.Button>
              <antd.Button block icon={<GlobalOutlined />} onClick={() => nav('public-portal')}>Preview Public Portal</antd.Button>
            </antd.Space>
          </antd.Card>
          <antd.Card title="Content Health" bordered style={{ marginTop: 16 }}>
            {[
              { label: 'Last published', value: '4 May 2026', ok: true },
              { label: 'Overdue reviews', value: '2 items', ok: false },
              { label: 'Broken links', value: 'None detected', ok: true },
              { label: 'BM translations', value: '18 / 24 complete', ok: false },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--color-divider)', fontSize: 13 }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{r.label}</span>
                <span style={{ fontWeight: 500, color: r.ok ? 'var(--color-success)' : 'var(--color-warning)' }}>{r.value}</span>
              </div>
            ))}
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

SCREENS['cm-announcements'] = function CMAnnouncements({ nav, currentUser }) {
  const INIT = [
    { id: 'ann-01', title: 'NCEF Fee Schedule Update 2026', body: 'Effective 1 June 2026, the NCEF fee schedule will be updated to reflect new certification costs. Please review the updated schedule on the fee page.', status: 'published', publishedAt: '2026-05-04', lang: 'both', pinned: true },
    { id: 'ann-02', title: 'System Maintenance Notice — 10 May 2026', body: 'The NCEF Portal will be unavailable from 11:00 PM to 3:00 AM on 10–11 May 2026 for scheduled maintenance.', status: 'published', publishedAt: '2026-05-01', lang: 'both', pinned: false },
    { id: 'ann-03', title: 'New Prohibited Equipment Category Announcement', body: 'MCMC has gazetted a new category of prohibited telecommunications equipment effective 15 June 2026. Affected suppliers must apply for Special Approval.', status: 'draft', publishedAt: null, lang: 'en', pinned: false },
    { id: 'ann-04', title: 'Scheme C Auto-Acceptance Threshold Update', body: 'The AI confidence threshold for Scheme C auto-acceptance has been adjusted from 85% to 90% effective 1 May 2026.', status: 'published', publishedAt: '2026-04-28', lang: 'both', pinned: false },
  ];
  const [items, setItems] = React.useState(INIT);
  const [editId, setEditId] = React.useState(null);
  const [draft, setDraft] = React.useState({ title: '', body: '', lang: 'en', pinned: false });
  const [addOpen, setAddOpen] = React.useState(false);

  const editItem = items.find(i => i.id === editId);

  function publish(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'published', publishedAt: '2026-05-05' } : i));
    antd.message.success('Announcement published to Public Portal');
  }
  function unpublish(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'draft', publishedAt: null } : i));
    antd.message.info('Announcement unpublished');
  }
  function togglePin(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, pinned: !i.pinned } : i));
  }
  function deleteItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
    antd.message.info('Announcement deleted');
  }
  function addNew() {
    if (!draft.title || !draft.body) return;
    setItems(prev => [{ ...draft, id: `ann-${Date.now()}`, status: 'draft', publishedAt: null }, ...prev]);
    setAddOpen(false);
    setDraft({ title: '', body: '', lang: 'en', pinned: false });
    antd.message.success('Draft saved');
  }
  function saveEdit() {
    setItems(prev => prev.map(i => i.id === editId ? { ...i, ...draft } : i));
    setEditId(null);
    antd.message.success('Changes saved');
  }

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Content Manager</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Announcements</antd.Typography.Title>
        </div>
        <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => { setDraft({ title: '', body: '', lang: 'en', pinned: false }); setAddOpen(true); }}>New Announcement</antd.Button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map(item => (
          <antd.Card key={item.id} bordered size="small" style={{ borderLeft: item.status === 'published' ? '3px solid var(--color-success)' : '3px solid var(--color-warning)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  {item.pinned && <antd.Tag color="gold" style={{ fontSize: 10 }}>📌 Pinned</antd.Tag>}
                  <antd.Tag color={item.status === 'published' ? 'green' : 'orange'} style={{ fontSize: 10 }}>
                    {item.status === 'published' ? 'Published' : 'Draft'}
                  </antd.Tag>
                  <antd.Tag style={{ fontSize: 10 }}>{item.lang === 'both' ? 'EN + BM' : item.lang.toUpperCase()}</antd.Tag>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.body}</div>
                {item.publishedAt && <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6 }}>Published {item.publishedAt}</div>}
              </div>
              <antd.Space direction="vertical" size={4}>
                <antd.Button size="small" icon={<EditOutlined />} onClick={() => { setDraft({ title: item.title, body: item.body, lang: item.lang, pinned: item.pinned }); setEditId(item.id); }}>Edit</antd.Button>
                {item.status === 'draft'
                  ? <antd.Button size="small" type="primary" onClick={() => publish(item.id)}>Publish</antd.Button>
                  : <antd.Button size="small" onClick={() => unpublish(item.id)}>Unpublish</antd.Button>
                }
                <antd.Button size="small" onClick={() => togglePin(item.id)}>{item.pinned ? 'Unpin' : 'Pin'}</antd.Button>
                <antd.Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteItem(item.id)} />
              </antd.Space>
            </div>
          </antd.Card>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <antd.Modal
        open={addOpen || !!editId}
        title={editId ? 'Edit Announcement' : 'New Announcement'}
        onCancel={() => { setAddOpen(false); setEditId(null); }}
        onOk={editId ? saveEdit : addNew}
        okText={editId ? 'Save Changes' : 'Save Draft'}
        okButtonProps={{ disabled: !draft.title || !draft.body }}
        width={600}
      >
        <div style={{ display: 'grid', gap: 14, marginTop: 8 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Title <span style={{ color: 'var(--color-danger)' }}>*</span></div>
            <antd.Input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="Announcement title…" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Body <span style={{ color: 'var(--color-danger)' }}>*</span></div>
            <antd.Input.TextArea rows={5} value={draft.body} onChange={e => setDraft(d => ({ ...d, body: e.target.value }))} placeholder="Announcement content…" />
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Language</div>
              <antd.Select value={draft.lang} onChange={v => setDraft(d => ({ ...d, lang: v }))} style={{ width: '100%' }}
                options={[{ value: 'en', label: 'English only' }, { value: 'bm', label: 'Bahasa Malaysia only' }, { value: 'both', label: 'English + BM' }]} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
              <antd.Space>
                <antd.Switch size="small" checked={draft.pinned} onChange={v => setDraft(d => ({ ...d, pinned: v }))} />
                <span style={{ fontSize: 12 }}>Pin to top</span>
              </antd.Space>
            </div>
          </div>
        </div>
      </antd.Modal>
    </div>
  );
};

SCREENS['cm-faq'] = function CMFaq({ nav }) {
  const CATS = ['General', 'Registration', 'Documents', 'Fees', 'Schemes', 'Renewal', 'Post-Market'];
  const INIT_FAQS = [
    { id: 'faq-01', cat: 'General',       q: 'What is NCEF?',                                                         a: 'The National Communication Equipment Framework (NCEF) is MCMC\'s unified platform for certifying communications and multimedia equipment sold or imported into Malaysia.', status: 'published', lang: 'both' },
    { id: 'faq-02', cat: 'Registration',  q: 'How do I register as a supplier?',                                      a: 'Visit the Onboarding section and provide your SSM registration, company details, and authorised signatory information. Approval typically takes 2–3 working days.', status: 'published', lang: 'both' },
    { id: 'faq-03', cat: 'Schemes',       q: 'What is the difference between Scheme A, B, and C?',                    a: 'Scheme A (High Risk) requires full CoC from an accredited lab. Scheme B (Medium Risk) is AI-assisted with CoC or equivalent. Scheme C (Low Risk) allows self-declaration with a signed Standards Declaration.', status: 'published', lang: 'both' },
    { id: 'faq-04', cat: 'Documents',     q: 'What documents do I need for Scheme A?',                                a: 'SSM Registration, Technical Brochure/Datasheet, Test Report from an accredited lab, Product Photos (front, back, label), Certificate of Conformity (CoC), and Standards Declaration Letter.', status: 'published', lang: 'en' },
    { id: 'faq-05', cat: 'Fees',          q: 'How much does an NCEF certificate cost?',                               a: 'Fee Schedule 2026: Scheme A — RM 350/year, Scheme B — RM 250/year, Scheme C — RM 150/year. Fees are payable per model per year. SST is currently exempt.', status: 'published', lang: 'both' },
    { id: 'faq-06', cat: 'Renewal',       q: 'When should I renew my certificate?',                                   a: 'You will receive alerts 90 and 60 days before expiry. Renewal can be initiated up to 6 months before the expiry date. Certificates lapse if not renewed within 30 days of expiry.', status: 'draft', lang: 'en' },
    { id: 'faq-07', cat: 'Post-Market',   q: 'What happens if my product fails a post-market surveillance check?',   a: 'MCMC may issue a corrective action notice. Depending on severity, the certificate may be suspended pending an investigation. Repeated non-conformances may result in cancellation and enforcement action.', status: 'published', lang: 'both' },
  ];
  const [faqs, setFaqs] = React.useState(INIT_FAQS);
  const [catFilter, setCatFilter] = React.useState('All');
  const [editId, setEditId] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [draft, setDraft] = React.useState({ cat: 'General', q: '', a: '', lang: 'en', status: 'draft' });

  const displayed = catFilter === 'All' ? faqs : faqs.filter(f => f.cat === catFilter);

  function saveEdit() {
    setFaqs(prev => prev.map(f => f.id === editId ? { ...f, ...draft } : f));
    setEditId(null);
    antd.message.success('FAQ item saved');
  }
  function addNew() {
    if (!draft.q || !draft.a) return;
    setFaqs(prev => [...prev, { ...draft, id: `faq-${Date.now()}` }]);
    setAddOpen(false);
    setDraft({ cat: 'General', q: '', a: '', lang: 'en', status: 'draft' });
    antd.message.success('FAQ item created');
  }
  function toggleStatus(id) {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, status: f.status === 'published' ? 'draft' : 'published' } : f));
  }
  function deleteFaq(id) {
    setFaqs(prev => prev.filter(f => f.id !== id));
    antd.message.info('FAQ item deleted');
  }

  const editFaq = faqs.find(f => f.id === editId);

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Content Manager</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>FAQ & Help</antd.Typography.Title>
        </div>
        <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => { setDraft({ cat: 'General', q: '', a: '', lang: 'en', status: 'draft' }); setAddOpen(true); }}>Add FAQ Item</antd.Button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {['All', ...CATS].map(c => (
          <antd.Button key={c} size="small" type={catFilter === c ? 'primary' : 'default'} onClick={() => setCatFilter(c)}>{c}</antd.Button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {displayed.map(f => (
          <antd.Card key={f.id} bordered size="small" style={{ borderLeft: f.status === 'published' ? '3px solid var(--color-success)' : '3px solid var(--color-warning)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <antd.Tag color="blue" style={{ fontSize: 10 }}>{f.cat}</antd.Tag>
                  <antd.Tag color={f.status === 'published' ? 'green' : 'orange'} style={{ fontSize: 10 }}>{f.status === 'published' ? 'Published' : 'Draft'}</antd.Tag>
                  <antd.Tag style={{ fontSize: 10 }}>{f.lang === 'both' ? 'EN + BM' : f.lang.toUpperCase()}</antd.Tag>
                </div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Q: {f.q}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>A: {f.a}</div>
              </div>
              <antd.Space size={4}>
                <antd.Button size="small" icon={<EditOutlined />} onClick={() => { setDraft({ cat: f.cat, q: f.q, a: f.a, lang: f.lang, status: f.status }); setEditId(f.id); }} />
                <antd.Button size="small" type={f.status === 'published' ? 'default' : 'primary'} onClick={() => toggleStatus(f.id)}>{f.status === 'published' ? 'Unpublish' : 'Publish'}</antd.Button>
                <antd.Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteFaq(f.id)} />
              </antd.Space>
            </div>
          </antd.Card>
        ))}
        {displayed.length === 0 && <antd.Empty description="No FAQ items in this category" image={antd.Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>

      {/* Add / Edit Modal */}
      <antd.Modal
        open={addOpen || !!editId}
        title={editId ? 'Edit FAQ Item' : 'Add FAQ Item'}
        onCancel={() => { setAddOpen(false); setEditId(null); }}
        onOk={editId ? saveEdit : addNew}
        okText={editId ? 'Save Changes' : 'Add Item'}
        okButtonProps={{ disabled: !draft.q || !draft.a }}
        width={600}
      >
        <div style={{ display: 'grid', gap: 14, marginTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Category</div>
              <antd.Select value={draft.cat} onChange={v => setDraft(d => ({ ...d, cat: v }))} style={{ width: '100%' }}
                options={CATS.map(c => ({ value: c, label: c }))} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Language</div>
              <antd.Select value={draft.lang} onChange={v => setDraft(d => ({ ...d, lang: v }))} style={{ width: '100%' }}
                options={[{ value: 'en', label: 'English only' }, { value: 'bm', label: 'Bahasa Malaysia only' }, { value: 'both', label: 'EN + BM' }]} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Question <span style={{ color: 'var(--color-danger)' }}>*</span></div>
            <antd.Input value={draft.q} onChange={e => setDraft(d => ({ ...d, q: e.target.value }))} placeholder="Enter the FAQ question…" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Answer <span style={{ color: 'var(--color-danger)' }}>*</span></div>
            <antd.Input.TextArea rows={4} value={draft.a} onChange={e => setDraft(d => ({ ...d, a: e.target.value }))} placeholder="Enter the answer…" />
          </div>
        </div>
      </antd.Modal>
    </div>
  );
};

Object.assign(window, { SCREENS });
