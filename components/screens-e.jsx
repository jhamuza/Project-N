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
    { id: 'fee-01', category: 'SDoC Registration',   scheme: 'Scheme A', type: 'Per year per model',   baseFee: 324.07, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-02', category: 'SDoC Registration',   scheme: 'Scheme B', type: 'Per year per model',   baseFee: 231.48, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-03', category: 'SDoC Registration',   scheme: 'Scheme C', type: 'Per year per model',   baseFee: 138.89, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-04', category: 'Special Approval',    scheme: 'Low/Med Risk', type: 'Per application',  baseFee: 500.00, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-05', category: 'Special Approval',    scheme: 'High Risk',    type: 'Per application',  baseFee: 1000.00,sstEnabled: true,  sstPct: 8 },
    { id: 'fee-06', category: 'Special Approval',    scheme: 'Prohibited',   type: 'Per application',  baseFee: 2000.00,sstEnabled: true,  sstPct: 8 },
    { id: 'fee-07', category: 'IMEI Registration',   scheme: 'All',          type: 'Per IMEI number',  baseFee: 0.50,   sstEnabled: false, sstPct: 0 },
    { id: 'fee-08', category: 'Serial Number Reg.',  scheme: 'All',          type: 'Per serial number', baseFee: 0.15,  sstEnabled: false, sstPct: 0 },
    { id: 'fee-09', category: 'Account Registration',scheme: 'Category A',   type: 'Per year',         baseFee: 300.00, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-10', category: 'Account Registration',scheme: 'Category B/C', type: 'Per year',         baseFee: 0.00,   sstEnabled: false, sstPct: 0 },
    { id: 'fee-11', category: 'Account Registration',scheme: 'Category D',   type: 'Per year',         baseFee: 200.00, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-12', category: 'Renewal',             scheme: 'Scheme A',     type: 'Per year per model',baseFee: 324.07, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-13', category: 'Renewal',             scheme: 'Scheme B',     type: 'Per year per model',baseFee: 231.48, sstEnabled: true,  sstPct: 8 },
    { id: 'fee-14', category: 'Renewal',             scheme: 'Scheme C',     type: 'Per year per model',baseFee: 138.89, sstEnabled: true,  sstPct: 8 },
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
            All fees in MYR. Total = Actual Fee + SST Amount. Changes take effect from the next billing cycle.
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
