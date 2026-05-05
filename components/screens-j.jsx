// screens-j.jsx — Compliance Status Management §5.10 (full rebuild)
// Overrides SCREENS['compliance-status'] from screens-d.jsx

Object.assign(window.MOCK, {
  complianceSuppliers: [
    { id: 'SUP-0126-00087', name: 'Axiata Digital Sdn Bhd',          category: 'A', status: 'active',             certCount: 6,  pendingApps: 3, lastChanged: null,          changedBy: null },
    { id: 'SUP-0420-00012', name: 'Maxis Broadband Sdn Bhd',         category: 'A', status: 'under_surveillance',  certCount: 12, pendingApps: 2, lastChanged: '2026-04-15', changedBy: 'En. Faisal Rahman' },
    { id: 'SUP-0322-00045', name: 'Celcom Axiata Berhad',            category: 'A', status: 'active',             certCount: 9,  pendingApps: 0, lastChanged: null,          changedBy: null },
    { id: 'SUP-0125-00355', name: 'YTL Communications Sdn Bhd',      category: 'A', status: 'under_surveillance',  certCount: 2,  pendingApps: 1, lastChanged: '2026-04-20', changedBy: 'Pn. Rosnah Idris' },
    { id: 'SUP-0922-00067', name: 'Iris Corporation Berhad',         category: 'C', status: 'suspended',           certCount: 0,  pendingApps: 0, lastChanged: '2025-11-30', changedBy: 'Pn. Rosnah Idris' },
    { id: 'SUP-0326-00478', name: 'Sapura Industrial Berhad',        category: 'B', status: 'active',             certCount: 1,  pendingApps: 0, lastChanged: null,          changedBy: null },
  ],
  complianceCerts: [
    { rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro',        brand: 'Xiaomi',   scheme: 'C', supplierId: 'SUP-0126-00087', status: 'active',   expires: '2029-04-09', lastChanged: null,          changedBy: null },
    { rcn: 'RCN-0326-00442', product: 'OPPO Find X7 Ultra',   brand: 'OPPO',     scheme: 'A', supplierId: 'SUP-0126-00087', status: 'active',   expires: '2029-04-04', lastChanged: null,          changedBy: null },
    { rcn: 'RCN-0125-00198', product: 'Samsung Galaxy S23',   brand: 'Samsung',  scheme: 'A', supplierId: 'SUP-0126-00087', status: 'active',   expires: '2026-06-12', lastChanged: null,          changedBy: null },
    { rcn: 'RCN-1124-00612', product: 'Ericsson Router 6672', brand: 'Ericsson', scheme: 'B', supplierId: 'SUP-0420-00012', status: 'under_surveillance', expires: '2026-05-28', lastChanged: '2026-04-15', changedBy: 'En. Faisal Rahman' },
    { rcn: 'RCN-0823-00084', product: 'TP-Link Archer AX73',  brand: 'TP-Link',  scheme: 'C', supplierId: 'SUP-0621-00091', status: 'active',   expires: '2026-08-13', lastChanged: null,          changedBy: null },
    { rcn: 'RCN-0722-00021', product: 'Huawei P50 Pocket',    brand: 'Huawei',   scheme: 'A', supplierId: 'SUP-0224-00142', status: 'cancelled', expires: '2025-07-04', lastChanged: '2025-07-05',  changedBy: 'System' },
  ],
  complianceTimelines: {
    'SUP-0420-00012': [
      { status: 'active',             date: '2020-01-14', by: 'System',            reason: 'Account verified — initial activation' },
      { status: 'under_surveillance', date: '2026-04-15', by: 'En. Faisal Rahman', reason: 'PMS audit initiated — non-conformance flagged in RCN-1124-00612. Label model mismatch on 1 product line.' },
    ],
    'SUP-0922-00067': [
      { status: 'active',    date: '2022-09-25', by: 'System',          reason: 'Account verified' },
      { status: 'suspended', date: '2025-11-30', by: 'Pn. Rosnah Idris',reason: 'Multiple non-conformances over 2 audit cycles. Enforcement action pending Section 233 CMA 1998. Blocks all new SDoC submissions.' },
    ],
    'SUP-0125-00355': [
      { status: 'active',             date: '2025-01-12', by: 'System',          reason: 'Account activated (added by MCMC Admin)' },
      { status: 'under_surveillance', date: '2026-04-20', by: 'Pn. Rosnah Idris',reason: 'Recurring signal booster intelligence — YTL YES 5G Router flagged in post monitoring. Audit initiated.' },
    ],
    'RCN-1124-00612': [
      { status: 'active',             date: '2024-11-02', by: 'System',            reason: 'Certificate issued after Scheme B approval' },
      { status: 'under_surveillance', date: '2026-04-15', by: 'En. Faisal Rahman', reason: 'Related to supplier Maxis Broadband Sdn Bhd PMS audit. Label non-conformance investigation ongoing.' },
    ],
    'RCN-0722-00021': [
      { status: 'active',    date: '2022-07-05', by: 'System', reason: 'Certificate issued' },
      { status: 'cancelled', date: '2025-07-05', by: 'System', reason: 'Certificate expired on 2025-07-04 and not renewed within 6-month grace period. Removed from public registry.' },
    ],
  },
  enforcementActions: [
    { id: 'ENF-0426-001', entity: 'Iris Corporation Berhad', entityId: 'SUP-0922-00067', type: 'Suspension', dateIssued: '2025-11-30', issuedBy: 'Pn. Rosnah Idris', status: 'active', basis: 'Section 233 CMA 1998 — repeated non-conformance in 2 consecutive PMS audit cycles', followUpDate: '2026-02-28' },
    { id: 'ENF-0426-002', entity: 'Unknown (SB-2000 Signal Booster)', entityId: null, type: 'Market Removal', dateIssued: '2026-04-18', issuedBy: 'En. Faisal Rahman', status: 'in_progress', basis: 'Prohibited device — unlicensed operation on 700 MHz. Takedown requests submitted to Shopee, Mudah, Facebook', followUpDate: '2026-05-18' },
    { id: 'ENF-0426-003', entity: 'Maxis Broadband Sdn Bhd', entityId: 'SUP-0420-00012', type: 'Corrective Action Notice', dateIssued: '2026-04-22', issuedBy: 'En. Faisal Rahman', status: 'pending_response', basis: 'Label model number mismatch on Huawei Mate 60 Pro (batch HM-2026-0341). 30 days to remedy.', followUpDate: '2026-05-22' },
  ],
});

const {
  SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  WarningOutlined, InfoCircleOutlined, DownloadOutlined, EditOutlined, EyeOutlined,
  ExclamationCircleOutlined, LockOutlined, FilePdfOutlined, PlusOutlined
} = window.icons;
const SafetyOut_j = window.icons.SafetyOutlined || window.icons.SafetyCertificateOutlined;
const AlertOut_j  = window.icons.AlertOutlined  || window.icons.WarningOutlined;

// ─── STATUS METADATA ─────────────────────────────────────────────────────────
const STATUS_META = {
  active:             { label: 'Active',              color: 'green',   bg: 'var(--color-success-bg)',  border: 'var(--color-success)', dot: 'var(--color-success)' },
  under_surveillance: { label: 'Under Surveillance',  color: 'orange',  bg: 'var(--color-warning-bg)',  border: 'var(--color-warning)', dot: 'var(--color-warning)' },
  suspended:          { label: 'Suspended',           color: 'red',     bg: 'var(--color-danger-bg)',   border: 'var(--color-danger)',  dot: 'var(--color-danger)' },
  cancelled:          { label: 'Cancelled',           color: 'default', bg: 'var(--color-bg-subtle)',   border: 'var(--color-border)',  dot: 'var(--color-text-muted)' },
};
const ENF_STATUS = { active: 'red', in_progress: 'orange', pending_response: 'gold', closed: 'green' };

const StatusTag = ({ status }) => {
  const m = STATUS_META[status] || STATUS_META.active;
  return <antd.Tag color={m.color}>{m.label}</antd.Tag>;
};

// ─── PROPAGATION WARNINGS ─────────────────────────────────────────────────────
const PROPAGATION = {
  suspended:          ['Blocks all new SDoC, Special Approval, Renewal, and Modification submissions', 'Applicant notified immediately via email and in-app alert', 'Officer dashboard flags supplier as suspended'],
  cancelled:          ['Certificate removed from Public Search Portal immediately', 'IMEI/SN registry entries linked to this RCN marked inactive', 'Importation module: RCN validation will fail for this certificate'],
  under_surveillance: ['Supplier/certificate flagged on officer dashboard', 'Future applications prioritised for manual review', 'AI Risk Scoring Engine receives negative signal for next PMS cycle'],
  active:             ['Restores full access and submission rights', 'Public registry updated immediately', 'Any SDoC restrictions lifted'],
};

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CHANGE MODAL
// ─────────────────────────────────────────────────────────────────────────────
function StatusChangeModal({ open, entity, entityType, currentStatus, onClose, onSave }) {
  const [newStatus, setNewStatus] = React.useState('');
  const [reason, setReason]       = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);

  React.useEffect(() => { if (open) { setNewStatus(''); setReason(''); setConfirmed(false); } }, [open]);

  const isDestructive = ['suspended', 'cancelled'].includes(newStatus);

  return (
    <antd.Modal open={open} onCancel={onClose} width={520}
      title={<antd.Space><SafetyOut_j />Change Compliance Status</antd.Space>}
      okText={isDestructive ? 'Apply (Destructive Action)' : 'Apply Status Change'}
      okButtonProps={{ disabled: !newStatus || !reason || (isDestructive && !confirmed), danger: isDestructive }}
      onOk={() => { onSave(newStatus, reason); onClose(); }}>
      {entity && (
        <antd.Form layout="vertical">
          <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }}
            message={`Changing compliance status for: ${entity} (${entityType})`}
            description={<span>Current status: <StatusTag status={currentStatus} /></span>}
          />

          <antd.Form.Item label="New Compliance Status" required>
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(STATUS_META).filter(([k]) => k !== currentStatus).map(([key, meta]) => (
                <div key={key} onClick={() => setNewStatus(key)}
                  style={{ padding: 12, border: `1.5px solid ${newStatus === key ? meta.border : 'var(--color-border)'}`, borderRadius: 8, cursor: 'pointer', background: newStatus === key ? meta.bg : '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <antd.Tag color={meta.color} style={{ margin: 0 }}>{meta.label}</antd.Tag>
                    </div>
                    {newStatus === key && <CheckCircleOutlined style={{ color: meta.dot, fontSize: 16 }} />}
                  </div>
                  {newStatus === key && PROPAGATION[key] && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>System Effects:</div>
                      {PROPAGATION[key].map((p, i) => (
                        <div key={i} style={{ fontSize: 11, color: isDestructive ? 'var(--color-danger)' : 'var(--color-text-secondary)', display: 'flex', gap: 4 }}>
                          <span>{isDestructive ? '⚠' : '→'}</span><span>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </antd.Form.Item>

          <antd.Form.Item label="Reason (mandatory — recorded in immutable audit trail)" required>
            <antd.Input.TextArea rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder="Provide a detailed justification. This will be included in the immutable compliance history and any notifications sent to the entity." />
          </antd.Form.Item>

          {isDestructive && (
            <antd.Checkbox checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ color: 'var(--color-danger)', fontWeight: 600 }}>
              I confirm this action will immediately propagate system-wide and cannot be undone without a further status change.
            </antd.Checkbox>
          )}
        </antd.Form>
      )}
    </antd.Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTITY DETAIL DRAWER
// ─────────────────────────────────────────────────────────────────────────────
function EntityDrawer({ open, entity, entityType, onClose, onChangeStatus, isLead }) {
  if (!entity) return null;
  const key = entityType === 'supplier' ? entity.id : entity.rcn;
  const history = MOCK.complianceTimelines[key] || [];

  return (
    <antd.Drawer open={open} onClose={onClose} width={520}
      title={entityType === 'supplier' ? entity.name : `${entity.rcn} — ${entity.product}`}
      footer={isLead && <antd.Button type="primary" icon={<EditOutlined />} onClick={() => { onClose(); setTimeout(() => onChangeStatus(entity), 100); }}>Change Compliance Status</antd.Button>}>
      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
          <StatusTag status={entity.status} />
          {entity.lastChanged && <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>Changed {entity.lastChanged} by {entity.changedBy}</antd.Typography.Text>}
        </div>

        {entity.status === 'suspended' && (
          <antd.Alert type="error" showIcon icon={<LockOutlined />} style={{ marginBottom: 16 }}
            message="Account suspended — new submissions blocked"
            description="This supplier cannot submit new SDoC, Special Approval, Renewal, or Modification applications while suspended."
          />
        )}
        {entity.status === 'cancelled' && (
          <antd.Alert type="error" showIcon style={{ marginBottom: 16 }}
            message="Certificate cancelled — removed from Public Registry"
            description="This certificate no longer appears on the Public Search Portal. IMEI/SN registry entries are marked inactive."
          />
        )}
        {entity.status === 'under_surveillance' && (
          <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }}
            message="Under surveillance — applications prioritised for manual review"
          />
        )}

        {entityType === 'supplier' && (
          <antd.Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }} items={[
            { key: 'id',    label: 'Supplier ID',       children: <antd.Typography.Text code>{entity.id}</antd.Typography.Text> },
            { key: 'cat',   label: 'Category',          children: <antd.Tag>Cat {entity.category}</antd.Tag> },
            { key: 'certs', label: 'Active Certs',      children: entity.certCount },
            { key: 'apps',  label: 'Pending Applications', children: entity.pendingApps > 0 ? <antd.Tag color="orange">{entity.pendingApps} pending</antd.Tag> : <antd.Typography.Text type="secondary">None</antd.Typography.Text> },
          ]} />
        )}
        {entityType === 'cert' && (
          <antd.Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }} items={[
            { key: 'rcn',    label: 'RCN',     children: <antd.Typography.Text code>{entity.rcn}</antd.Typography.Text> },
            { key: 'scheme', label: 'Scheme',  children: <SchemeBadge scheme={entity.scheme} /> },
            { key: 'supp',   label: 'Supplier',children: <antd.Typography.Text code style={{ fontSize: 11 }}>{entity.supplierId}</antd.Typography.Text> },
            { key: 'exp',    label: 'Expires', children: new Date(entity.expires).toLocaleDateString('en-GB') },
          ]} />
        )}

        <antd.Divider orientation="left" orientationMargin={0}>Compliance Status History</antd.Divider>
        {history.length === 0
          ? <antd.Typography.Text type="secondary">No status changes recorded — entity has been Active since creation.</antd.Typography.Text>
          : <antd.Timeline items={history.map((h, i) => ({
              color: h.status === 'active' ? 'green' : h.status === 'suspended' ? 'red' : h.status === 'cancelled' ? 'gray' : 'orange',
              children: (
                <div style={{ fontSize: 12 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
                    <StatusTag status={h.status} />
                    {i === history.length - 1 && <antd.Tag color="default" style={{ fontSize: 10 }}>Current</antd.Tag>}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', marginBottom: 4 }}>{h.date} · {h.by}</div>
                  <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{h.reason}</div>
                </div>
              ),
            }))} />
        }
      </div>
    </antd.Drawer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['compliance-status'] = function ComplianceStatus({ nav, currentUser }) {
  const [tab, setTab]             = React.useState('suppliers');
  const [changeTarget, setChangeTarget] = React.useState(null);
  const [drawerTarget, setDrawerTarget] = React.useState(null);
  const [drawerType, setDrawerType]     = React.useState(null);
  const [statuses, setStatuses]         = React.useState({});
  const [selected, setSelected]         = React.useState(new Set());
  const [bulkOpen, setBulkOpen]         = React.useState(false);
  const [q, setQ]                       = React.useState('');
  const isLead = currentUser?.role === 'team-lead';

  const suppliers = MOCK.complianceSuppliers;
  const certs     = MOCK.complianceCerts;
  const enfs      = MOCK.enforcementActions;

  function getStatus(entity, field) { return statuses[entity[field]] || entity.status; }
  function openChange(entity) { setChangeTarget(entity); }
  function handleSave(entity, idField, newStat, reason) {
    setStatuses(prev => ({ ...prev, [entity[idField]]: newStat }));
    antd.message.success(`Status updated to "${STATUS_META[newStat]?.label}" for ${entity.name || entity.rcn}. Propagated system-wide.`);
    setChangeTarget(null);
  }

  const filteredSup = suppliers.filter(s => !q || (s.name + s.id).toLowerCase().includes(q.toLowerCase()));
  const filteredCert = certs.filter(c => !q || (c.product + c.rcn + c.brand).toLowerCase().includes(q.toLowerCase()));

  const totalSuspended = suppliers.filter(s => getStatus(s, 'id') === 'suspended').length;
  const totalSurv      = [...suppliers, ...certs].filter(e => getStatus(e, e.id ? 'id' : 'rcn') === 'under_surveillance').length;
  const totalCancelled = certs.filter(c => getStatus(c, 'rcn') === 'cancelled').length;

  // ── SUPPLIER TAB ────────────────────────────────────────────────────────────
  const SupplierTab = () => (
    <div>
      <antd.Alert type="info" showIcon style={{ marginBottom: 16 }} icon={<InfoCircleOutlined />}
        message="Suspending a supplier immediately blocks all new submissions system-wide. Status changes propagate in real time and are immutably logged."
      />
      <antd.Table rowKey="id" dataSource={filteredSup} pagination={false} scroll={{ x: 'max-content' }}
        rowSelection={isLead ? { selectedRowKeys: [...selected], onChange: keys => setSelected(new Set(keys)) } : undefined}
        onRow={r => ({ style: { background: getStatus(r, 'id') === 'suspended' ? 'var(--color-danger-bg)' : getStatus(r, 'id') === 'under_surveillance' ? 'var(--color-warning-bg)' : 'transparent' } })}
        columns={[
          { title: 'Supplier',          width: 220, render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.name}</div><antd.Typography.Text code style={{ fontSize: 11 }}>{r.id}</antd.Typography.Text></div> },
          { title: 'Cat',               dataIndex: 'category',   width: 70,  render: c => <antd.Tag>Cat {c}</antd.Tag> },
          { title: 'Active Certs',      dataIndex: 'certCount',  width: 100, align: 'center' },
          { title: 'Pending Apps',      dataIndex: 'pendingApps', width: 110, align: 'center', render: v => v > 0 ? <antd.Tag color="orange">{v}</antd.Tag> : '—' },
          { title: 'Compliance Status', width: 160, render: (_, r) => <StatusTag status={getStatus(r, 'id')} /> },
          { title: 'Last Changed',      width: 160, render: (_, r) => r.lastChanged ? <div><div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{r.lastChanged}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.changedBy}</div></div> : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
          { title: '', width: 140, render: (_, r) => (
            <antd.Space>
              <antd.Button size="small" icon={<EyeOutlined />} onClick={() => { setDrawerTarget(r); setDrawerType('supplier'); }}>History</antd.Button>
              {isLead && <antd.Button size="small" onClick={() => openChange(r)}>Change</antd.Button>}
            </antd.Space>
          ) },
        ]}
        footer={() => isLead && selected.size > 1 ? (
          <antd.Button icon={<EditOutlined />} onClick={() => setBulkOpen(true)}>Bulk Change Status ({selected.size} suppliers)</antd.Button>
        ) : null}
      />
    </div>
  );

  // ── CERT TAB ────────────────────────────────────────────────────────────────
  const CertTab = () => (
    <div>
      <antd.Alert type="info" showIcon style={{ marginBottom: 16 }} icon={<InfoCircleOutlined />}
        message="Cancelling a certificate immediately removes it from the Public Search Portal. IMEI/SN registry entries are marked inactive in real time."
      />
      <antd.Table rowKey="rcn" dataSource={filteredCert} pagination={false} scroll={{ x: 'max-content' }}
        onRow={r => ({ style: { background: getStatus(r, 'rcn') === 'cancelled' ? 'var(--color-bg-subtle)' : getStatus(r, 'rcn') === 'under_surveillance' ? 'var(--color-warning-bg)' : 'transparent' } })}
        columns={[
          { title: 'Certificate',       width: 220, render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><antd.Typography.Text code style={{ fontSize: 11 }}>{r.rcn}</antd.Typography.Text></div> },
          { title: 'Brand',             dataIndex: 'brand',      width: 120 },
          { title: 'Scheme',            dataIndex: 'scheme',     width: 90,  render: s => <SchemeBadge scheme={s} /> },
          { title: 'Supplier',          dataIndex: 'supplierId', width: 120, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
          { title: 'Expires',           dataIndex: 'expires',    width: 110, render: v => <span style={{ color: new Date(v) < new Date() ? 'var(--color-danger)' : 'inherit', whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB')}</span> },
          { title: 'Compliance Status', width: 160, render: (_, r) => <StatusTag status={getStatus(r, 'rcn')} /> },
          { title: 'Last Changed',      width: 160, render: (_, r) => r.lastChanged ? <div><div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{r.lastChanged}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.changedBy}</div></div> : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
          { title: '', width: 140, render: (_, r) => (
            <antd.Space>
              <antd.Button size="small" icon={<EyeOutlined />} onClick={() => { setDrawerTarget(r); setDrawerType('cert'); }}>History</antd.Button>
              {isLead && <antd.Button size="small" onClick={() => openChange(r)}>Change</antd.Button>}
            </antd.Space>
          ) },
        ]}
      />
    </div>
  );

  // ── ENFORCEMENT TAB ─────────────────────────────────────────────────────────
  const EnfTab = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <antd.Typography.Text type="secondary" style={{ fontSize: 13 }}>Formal enforcement actions under the Communications and Multimedia Act 1998. All actions are logged immutably.</antd.Typography.Text>
        {isLead && <antd.Button type="primary" icon={<PlusOutlined />}>Log Enforcement Action</antd.Button>}
      </div>
      {enfs.map(e => (
        <antd.Card key={e.id} bordered size="small" style={{ marginBottom: 12, borderLeft: `4px solid ${e.type === 'Suspension' ? 'var(--color-danger)' : e.type === 'Market Removal' ? 'var(--color-warning)' : 'var(--color-info)'}` }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <antd.Typography.Text code style={{ fontSize: 11 }}>{e.id}</antd.Typography.Text>
                <antd.Tag color={e.type === 'Suspension' ? 'red' : e.type === 'Market Removal' ? 'orange' : 'blue'}>{e.type}</antd.Tag>
                <antd.Tag color={ENF_STATUS[e.status]}>{e.status.replace('_', ' ')}</antd.Tag>
              </div>
              <div style={{ fontWeight: 600 }}>{e.entity}</div>
              {e.entityId && <antd.Typography.Text code style={{ fontSize: 11 }}>{e.entityId}</antd.Typography.Text>}
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 8, lineHeight: 1.5 }}>{e.basis}</div>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 2 }}>Issued {e.dateIssued}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>By {e.issuedBy}</div>
              <div style={{ fontSize: 11, color: 'var(--color-warning)', marginTop: 6, fontWeight: 600 }}>Follow-up: {e.followUpDate}</div>
              <antd.Space style={{ marginTop: 8 }}>
                <antd.Button size="small" icon={<DownloadOutlined />}>Export</antd.Button>
                {isLead && <antd.Button size="small">Update</antd.Button>}
              </antd.Space>
            </div>
          </div>
        </antd.Card>
      ))}
    </div>
  );

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC · CPPG Compliance</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Compliance Status Management</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Govern supplier & certificate compliance · Immutable audit trail · System-wide propagation</antd.Typography.Text>
        </div>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Active',             v: suppliers.filter(s => getStatus(s, 'id') === 'active').length,             color: 'var(--color-success)' },
          { l: 'Under Surveillance', v: totalSurv,     color: 'var(--color-warning)', warn: totalSurv > 0 },
          { l: 'Suspended Suppliers',v: totalSuspended, color: 'var(--color-danger)',  warn: totalSuspended > 0 },
          { l: 'Cancelled Certs',    v: totalCancelled, color: 'var(--color-text-muted)' },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? k.color : k.color }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      {!isLead && (
        <antd.Alert type="info" showIcon icon={<LockOutlined />} style={{ marginBottom: 16 }}
          message="View only — status changes require System Administrator role"
          description="You can view compliance history for all entities. Contact your Team Lead to initiate a status change."
        />
      )}

      <antd.Card bordered style={{ marginBottom: 16 }}>
        <antd.Input placeholder="Search suppliers or certificates…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} value={q} onChange={e => setQ(e.target.value)} style={{ maxWidth: 320 }} />
      </antd.Card>

      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <antd.Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 20px' }} items={[
          { key: 'suppliers',    label: `Suppliers (${suppliers.length})`,   children: <div style={{ padding: '4px 0 20px' }}><SupplierTab /></div> },
          { key: 'certificates', label: `Certificates (${certs.length})`,    children: <div style={{ padding: '4px 0 20px' }}><CertTab /></div> },
          { key: 'enforcement',  label: `Enforcement Actions (${enfs.length})`, children: <div style={{ padding: '4px 0 20px' }}><EnfTab /></div> },
        ]} />
      </antd.Card>

      {/* Status change modal */}
      <StatusChangeModal
        open={!!changeTarget}
        entity={changeTarget?.name || changeTarget?.product}
        entityType={changeTarget?.id ? 'Supplier' : 'Certificate'}
        currentStatus={changeTarget ? getStatus(changeTarget, changeTarget.id ? 'id' : 'rcn') : 'active'}
        onClose={() => setChangeTarget(null)}
        onSave={(newStat, reason) => handleSave(changeTarget, changeTarget.id ? 'id' : 'rcn', newStat, reason)}
      />

      {/* Entity detail drawer */}
      <EntityDrawer
        open={!!drawerTarget}
        entity={drawerTarget}
        entityType={drawerType}
        onClose={() => setDrawerTarget(null)}
        onChangeStatus={(e) => { setDrawerTarget(null); setChangeTarget(e); }}
        isLead={isLead}
      />

      {/* Bulk modal */}
      <antd.Modal open={bulkOpen} onCancel={() => setBulkOpen(false)} title={`Bulk Status Change — ${selected.size} suppliers`}
        okText="Apply to All Selected" onOk={() => { antd.message.success(`Status updated for ${selected.size} suppliers.`); setSelected(new Set()); setBulkOpen(false); }}>
        <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }} message={`This will change the compliance status of ${selected.size} suppliers simultaneously. All changes are immutable and propagate system-wide.`} />
        <antd.Form layout="vertical">
          <antd.Form.Item label="New Status" required>
            <antd.Select options={Object.entries(STATUS_META).map(([k, v]) => ({ value: k, label: v.label }))} placeholder="Select new status…" />
          </antd.Form.Item>
          <antd.Form.Item label="Reason (applies to all)" required>
            <antd.Input.TextArea rows={3} placeholder="Provide justification for the bulk status change…" />
          </antd.Form.Item>
        </antd.Form>
      </antd.Modal>
    </div>
  );
};

Object.assign(window, { SCREENS });
