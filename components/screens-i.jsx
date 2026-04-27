// screens-i.jsx — Post Monitoring §5.9 (full rebuild)
// Overrides SCREENS['post-monitoring'] from screens-d.jsx

Object.assign(window.MOCK, {
  intelligenceRecords: [
    {
      id: 'INT-0426-001', equipment: 'Generic LTE Router (unregistered)', brand: 'Unknown', model: 'LTE-R100',
      imei: null, serial: 'N/A', supplierId: null, source: 'IntelliGenCE', severity: 'high', status: 'open',
      date: '2026-04-15', description: 'Device found listed on Lazada (MY) and Shopee without MCMC RCN sticker. 14 active listings from 6 different sellers. Estimated 800+ units sold.',
      platforms: ['Lazada', 'Shopee'], urls: ['lazada.com.my/...', 'shopee.com.my/...'],
      timeline: [
        { date: '2026-04-15', by: 'AI Web Crawler', action: 'Complaint created from web crawl result — 14 listings detected' },
        { date: '2026-04-16', by: 'En. Faisal Rahman', action: 'Assigned to investigation. Contacted Lazada compliance team.' },
      ],
    },
    {
      id: 'INT-0426-002', equipment: 'Bluetooth Speaker BS-Pro 5', brand: 'SoundMax', model: 'BS-500',
      imei: null, serial: 'BS500-MY-20240412', supplierId: 'SUP-0126-00087', source: 'Public complaint', severity: 'medium', status: 'investigating',
      date: '2026-04-10', description: 'Customer reports interference with Wi-Fi 6E router. Output power suspected to exceed declared 20 dBm. 3 separate complaints from different states.',
      platforms: [], urls: [],
      timeline: [
        { date: '2026-04-10', by: 'Public (via portal)', action: 'Complaint submitted by end user — Wi-Fi interference reported' },
        { date: '2026-04-11', by: 'Pn. Rosnah Idris', action: 'Complaint validated. RF measurement test ordered.' },
        { date: '2026-04-14', by: 'Pn. Rosnah Idris', action: '2 additional complaints received — pattern flagged. AI auto-proposed PMS audit for SUP-0126-00087.' },
      ],
      recurring: true, relatedComplaints: 3,
    },
    {
      id: 'INT-0426-003', equipment: 'Illegal Signal Booster', brand: 'Unknown', model: 'SB-2000',
      imei: null, serial: null, supplierId: null, source: 'AI web crawl', severity: 'critical', status: 'open',
      date: '2026-04-18', description: 'Signal booster operating on licensed 700 MHz band without registration. Found on 3 e-commerce platforms. Device can cause significant interference to cellular networks.',
      platforms: ['Shopee', 'Mudah', 'Facebook Marketplace'], urls: [],
      timeline: [
        { date: '2026-04-18', by: 'AI Web Crawler', action: 'Critical: signal booster listed on 3 platforms — escalated immediately' },
      ],
    },
    {
      id: 'INT-0326-004', equipment: 'TP-Link Archer AX73', brand: 'TP-Link', model: 'AX5400',
      imei: null, serial: 'TPLINK-AX73-SG2024', supplierId: 'SUP-0621-00091', source: 'Officer field visit', severity: 'low', status: 'closed',
      date: '2026-03-20', description: 'Label location inconsistency — RCN on packaging only, not affixed to product chassis. Corrective action advised and confirmed completed.',
      platforms: [], urls: [],
      timeline: [
        { date: '2026-03-20', by: 'En. Syahrul Azlan', action: 'Label non-compliance observed during retail visit at Low Yat Plaza' },
        { date: '2026-03-22', by: 'En. Syahrul Azlan', action: 'Corrective action issued to TM Technology Services' },
        { date: '2026-04-01', by: 'En. Syahrul Azlan', action: 'Supplier confirmed updated labelling on new stock. Case closed.' },
      ],
    },
  ],
  webCrawlFeed: [
    { id: 'WC-001', ts: '2026-04-28T07:12:00', platform: 'Shopee', title: 'WiFi Signal Booster 4G 5G Unlicensed', url: 'shopee.com.my/product/...', confidence: 94, severity: 'critical', status: 'flagged', reason: 'Contains keywords: "no registration needed", "boosts signal", operating on licensed bands' },
    { id: 'WC-002', ts: '2026-04-28T06:44:00', platform: 'Lazada', title: 'Budget LTE Router (Import) — No Box', url: 'lazada.com.my/product/...', confidence: 81, severity: 'high', status: 'flagged', reason: 'No MCMC RCN label visible in product images. Listed as "imported directly".' },
    { id: 'WC-003', ts: '2026-04-28T05:30:00', platform: 'TikTok Shop', title: 'Mini Wireless Camera with Frequency Jammer', url: 'tiktok.com/shop/...', confidence: 97, severity: 'critical', status: 'escalated', reason: 'Jammer device — explicitly prohibited. Listing removed by platform after MCMC report.' },
    { id: 'WC-004', ts: '2026-04-27T22:15:00', platform: 'Facebook Marketplace', title: 'Xiaomi Mi Router AX9000 (unboxed)', url: 'fb.com/marketplace/...', confidence: 45, severity: 'low', status: 'dismissed', reason: 'Private resale of legitimate registered product. Likely compliant — dismissed.' },
    { id: 'WC-005', ts: '2026-04-27T18:00:00', platform: 'Mudah', title: 'Signal Repeater 700MHz — Celcom Compatible', url: 'mudah.my/product/...', confidence: 88, severity: 'high', status: 'flagged', reason: '700 MHz is a licensed band. Product likely requires Special Approval or is illegal.' },
  ],
  knowledgeBase: [
    { id: 'KB-001', brand: 'Unknown', model: 'LTE-R100', category: 'LTE Router', imeis: [], serials: [], rcn: null, status: 'unregistered', complaints: 1, firstSeen: '2026-04-15', lastSeen: '2026-04-18', notes: 'Active investigation. Estimated 800+ units in market.' },
    { id: 'KB-002', brand: 'SoundMax', model: 'BS-500', category: 'Bluetooth Speaker', imeis: [], serials: ['BS500-MY-20240412'], rcn: 'RCN-?', status: 'under_review', complaints: 3, firstSeen: '2026-04-10', lastSeen: '2026-04-14', notes: 'Recurring RF interference complaints. PMS audit initiated.' },
    { id: 'KB-003', brand: 'Unknown', model: 'SB-2000', category: 'Signal Booster', imeis: [], serials: [], rcn: null, status: 'illegal', complaints: 1, firstSeen: '2026-04-18', lastSeen: '2026-04-18', notes: 'Prohibited device. MCMC enforcement action pending.' },
    { id: 'KB-004', brand: 'TP-Link', model: 'AX5400', category: 'Wi-Fi Router', imeis: [], serials: ['TPLINK-AX73-SG2024'], rcn: 'RCN-0823-00084', status: 'registered', complaints: 1, firstSeen: '2026-03-20', lastSeen: '2026-04-01', notes: 'Labelling issue resolved. Case closed.' },
  ],
});

const {
  SearchOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  WarningOutlined, InfoCircleOutlined, DownloadOutlined, EditOutlined, EyeOutlined,
  ExclamationCircleOutlined, GlobalOutlined, RobotOutlined, FileTextOutlined, SendOutlined
} = window.icons;
const AlertOut_i  = window.icons.AlertOutlined  || window.icons.WarningOutlined;
const AimOut_i    = window.icons.AimOutlined    || window.icons.ThunderboltOutlined;

// ─── helpers ─────────────────────────────────────────────────────────────────
const SEV_COLOR = { critical: 'var(--color-danger)', high: 'var(--color-warning)', medium: 'var(--color-info)', low: 'var(--color-text-muted)' };
const SEV_BG    = { critical: 'var(--color-danger-bg)', high: 'var(--color-warning-bg)', medium: 'var(--color-info-bg)', low: 'var(--color-bg-subtle)' };
const SEV_TAG   = { critical: 'red', high: 'orange', medium: 'blue', low: 'default' };
const STAT_TAG  = { open: 'red', investigating: 'orange', closed: 'green', flagged: 'orange', escalated: 'red', dismissed: 'default' };

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['post-monitoring'] = function PostMonitoring({ nav, currentUser }) {
  const [tab, setTab]           = React.useState('complaints');
  const [selected, setSelected] = React.useState(null);
  const [intakeOpen, setIntakeOpen] = React.useState(false);
  const [q, setQ]               = React.useState('');
  const [kbQ, setKbQ]           = React.useState('');

  const recs = MOCK.intelligenceRecords;
  const filtered = recs.filter(r => !q || (r.id + r.equipment + r.brand + r.source + r.description).toLowerCase().includes(q.toLowerCase()));
  const kb = MOCK.knowledgeBase.filter(k => !kbQ || (k.brand + k.model + k.category + (k.rcn||'')).toLowerCase().includes(kbQ.toLowerCase()));

  const open  = recs.filter(r => r.status === 'open').length;
  const crit  = recs.filter(r => r.severity === 'critical').length;
  const recur = recs.filter(r => r.recurring).length;

  // ── COMPLAINTS TAB ──────────────────────────────────────────────────────────
  const ComplaintsTab = () => (
    <antd.Row gutter={16}>
      <antd.Col xs={24} lg={selected ? 12 : 24}>
        <antd.Card bordered>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <antd.Input placeholder="Search complaints…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} value={q} onChange={e => setQ(e.target.value)} style={{ maxWidth: 320 }} />
            <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => setIntakeOpen(true)}>New Intelligence Record</antd.Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(r => (
              <div key={r.id} onClick={() => setSelected(selected?.id === r.id ? null : r)}
                style={{ padding: 14, border: `1.5px solid ${selected?.id === r.id ? 'var(--color-primary)' : SEV_BG[r.severity] === 'var(--color-bg-subtle)' ? 'var(--color-border)' : SEV_COLOR[r.severity] + '40'}`, borderRadius: 10, cursor: 'pointer', background: selected?.id === r.id ? 'var(--color-primary-soft)' : SEV_BG[r.severity] }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, padding: '2px 8px', borderRadius: 4, background: SEV_COLOR[r.severity], color: '#fff' }}>{r.severity}</span>
                      <antd.Tag color={STAT_TAG[r.status]} style={{ margin: 0 }}>{r.status}</antd.Tag>
                      <antd.Tag style={{ margin: 0, fontSize: 11 }}>{r.source}</antd.Tag>
                      {r.recurring && <antd.Tag color="purple" icon={<ExclamationCircleOutlined />} style={{ margin: 0, fontSize: 11 }}>Recurring · {r.relatedComplaints} complaints</antd.Tag>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.equipment}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                      <antd.Typography.Text code style={{ fontSize: 11 }}>{r.id}</antd.Typography.Text> · {new Date(r.date).toLocaleDateString('en-GB')}
                      {r.supplierId && <span> · <antd.Typography.Text code style={{ fontSize: 11 }}>{r.supplierId}</antd.Typography.Text></span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 6, lineHeight: 1.5 }}>{r.description.slice(0, 120)}{r.description.length > 120 ? '…' : ''}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    {r.timeline?.length || 0} update{r.timeline?.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </antd.Card>
      </antd.Col>

      {selected && (
        <antd.Col xs={24} lg={12}>
          <antd.Card bordered title={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, padding: '2px 8px', borderRadius: 4, background: SEV_COLOR[selected.severity], color: '#fff' }}>{selected.severity}</span>
              <span>{selected.id}</span>
            </div>
          } extra={<antd.Button type="text" size="small" onClick={() => setSelected(null)}>✕</antd.Button>}>

            <antd.Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }} items={[
              { key: 'equip',  label: 'Equipment',   children: <div><div style={{ fontWeight: 600 }}>{selected.equipment}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{selected.brand} · {selected.model}</div></div> },
              { key: 'imei',   label: 'IMEI / SN',   children: selected.imei || selected.serial || <antd.Typography.Text type="secondary">Not captured</antd.Typography.Text> },
              { key: 'source', label: 'Source',       children: selected.source },
              { key: 'status', label: 'Status',       children: <antd.Tag color={STAT_TAG[selected.status]}>{selected.status}</antd.Tag> },
              { key: 'supp',   label: 'Linked Supplier', children: selected.supplierId ? <antd.Typography.Text code>{selected.supplierId}</antd.Typography.Text> : <antd.Typography.Text type="secondary">Unknown / unlicensed</antd.Typography.Text> },
              ...(selected.platforms?.length ? [{ key: 'plat', label: 'Platforms', children: <antd.Space wrap>{selected.platforms.map(p => <antd.Tag key={p} icon={<GlobalOutlined />}>{p}</antd.Tag>)}</antd.Space> }] : []),
              ...(selected.recurring ? [{ key: 'rec', label: 'Recurring Pattern', children: <antd.Tag color="purple">{selected.relatedComplaints} related complaints — AI auto-proposed PMS audit</antd.Tag> }] : []),
            ]} />

            <div style={{ fontSize: 13, lineHeight: 1.6, background: 'var(--color-bg-subtle)', padding: 12, borderRadius: 8, marginBottom: 16 }}>{selected.description}</div>

            {/* Timeline */}
            <antd.Divider orientation="left" orientationMargin={0} style={{ fontSize: 13 }}>Investigation Timeline</antd.Divider>
            <antd.Timeline items={selected.timeline?.map(t => ({
              color: t.by.includes('AI') ? 'var(--color-primary)' : 'var(--color-success)',
              dot: t.by.includes('AI') ? <RobotOutlined style={{ fontSize: 14, color: 'var(--color-primary)' }} /> : undefined,
              children: <div style={{ fontSize: 12 }}>
                <div style={{ fontWeight: 600 }}>{t.action}</div>
                <div style={{ color: 'var(--color-text-muted)' }}>{t.date} · {t.by}</div>
              </div>,
            }))} />

            {/* Add update */}
            <antd.Form.Item label="Add Update" style={{ marginTop: 8 }}>
              <antd.Input.TextArea rows={2} placeholder="Record investigation update, findings, or actions taken…" />
            </antd.Form.Item>

            {/* Actions */}
            <antd.Space wrap>
              <antd.Button type="primary" icon={<AimOut_i />} onClick={() => antd.message.success(`PMS audit triggered for complaint ${selected.id}`)}>Trigger PMS Audit</antd.Button>
              <antd.Button icon={<EditOutlined />}>Update Status</antd.Button>
              <antd.Button icon={<DownloadOutlined />}>Export Report</antd.Button>
            </antd.Space>
          </antd.Card>
        </antd.Col>
      )}
    </antd.Row>
  );

  // ── KNOWLEDGE BASE TAB ──────────────────────────────────────────────────────
  const KnowledgeBaseTab = () => {
    const kbStatusColor = { unregistered: 'orange', under_review: 'blue', illegal: 'red', registered: 'green' };
    const kbStatusLabel = { unregistered: 'Unregistered', under_review: 'Under Review', illegal: 'Illegal/Prohibited', registered: 'Registered' };
    return (
      <div>
        <antd.Alert type="info" showIcon style={{ marginBottom: 16 }}
          message="IntelliGenCE Equipment Directory"
          description="Central knowledge base of communications equipment identified in the Malaysian market through complaints and officer intelligence. Updated by officers via the MCMC IntelliGenCE programme."
        />
        <antd.Input placeholder="Search by brand, model, category, RCN…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} value={kbQ} onChange={e => setKbQ(e.target.value)} style={{ maxWidth: 380, marginBottom: 16 }} />
        <antd.Table rowKey="id" dataSource={kb} pagination={false} columns={[
          { title: 'Equipment', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.brand} {r.model}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.category}</div></div> },
          { title: 'IMEI / SN', render: (_, r) => r.serials?.length ? <antd.Typography.Text code style={{ fontSize: 11 }}>{r.serials[0]}</antd.Typography.Text> : <antd.Typography.Text type="secondary" style={{ fontSize: 11 }}>Not captured</antd.Typography.Text> },
          { title: 'RCN', dataIndex: 'rcn', render: v => v && v !== 'RCN-?' ? <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> : <antd.Typography.Text type="secondary" style={{ fontSize: 11 }}>None</antd.Typography.Text> },
          { title: 'Status', dataIndex: 'status', render: s => <antd.Tag color={kbStatusColor[s]}>{kbStatusLabel[s]}</antd.Tag> },
          { title: 'Complaints', dataIndex: 'complaints', align: 'center', render: v => <antd.Tag color={v >= 3 ? 'red' : v >= 1 ? 'orange' : 'default'}>{v}</antd.Tag> },
          { title: 'First Seen', dataIndex: 'firstSeen', render: v => new Date(v).toLocaleDateString('en-GB') },
          { title: 'Last Seen', dataIndex: 'lastSeen', render: v => new Date(v).toLocaleDateString('en-GB') },
          { title: 'Notes', dataIndex: 'notes', render: v => <antd.Typography.Text type="secondary" style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
        ]} />
      </div>
    );
  };

  // ── INTAKE MODAL ────────────────────────────────────────────────────────────
  const IntakeModal = () => (
    <antd.Modal open={intakeOpen} onCancel={() => setIntakeOpen(false)} title="New Complaint / Market Intelligence Record"
      okText="Create Record" onOk={() => { antd.message.success('Intelligence record created.'); setIntakeOpen(false); }} width={580}>
      <antd.Form layout="vertical">
        <antd.Form.Item label="Equipment Name / Description" required><antd.Input placeholder="Generic LTE Router, Signal Booster model X…" /></antd.Form.Item>
        <antd.Row gutter={12}>
          <antd.Col span={12}><antd.Form.Item label="Brand"><antd.Input placeholder="Unknown / brand name" /></antd.Form.Item></antd.Col>
          <antd.Col span={12}><antd.Form.Item label="Model / Part No."><antd.Input placeholder="LTE-R100" /></antd.Form.Item></antd.Col>
        </antd.Row>
        <antd.Row gutter={12}>
          <antd.Col span={12}><antd.Form.Item label="IMEI Number (if known)"><antd.Input placeholder="353456789012345" /></antd.Form.Item></antd.Col>
          <antd.Col span={12}><antd.Form.Item label="Serial Number (if known)"><antd.Input placeholder="SN-2024-XXXX" /></antd.Form.Item></antd.Col>
        </antd.Row>
        <antd.Row gutter={12}>
          <antd.Col span={12}>
            <antd.Form.Item label="Source" required>
              <antd.Select options={[
                { value: 'IntelliGenCE', label: 'IntelliGenCE Programme' },
                { value: 'Public complaint', label: 'Public Complaint (Portal)' },
                { value: 'Officer field visit', label: 'Officer Field Visit' },
                { value: 'Tip-off', label: 'Tip-off / Anonymous' },
              ]} />
            </antd.Form.Item>
          </antd.Col>
          <antd.Col span={12}>
            <antd.Form.Item label="Severity" required>
              <antd.Select options={['critical', 'high', 'medium', 'low'].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))} />
            </antd.Form.Item>
          </antd.Col>
        </antd.Row>
        <antd.Form.Item label="Linked Supplier (if known)">
          <antd.Select showSearch placeholder="Search supplier…" options={MOCK.supplierDirectory.map(s => ({ value: s.id, label: `${s.name} (${s.id})` }))} allowClear />
        </antd.Form.Item>
        <antd.Form.Item label="Online Platform / Location (if applicable)">
          <antd.Select mode="multiple" placeholder="Select platforms…" options={['Shopee', 'Lazada', 'Mudah', 'Facebook Marketplace', 'TikTok Shop', 'Carousell', 'Other'].map(v => ({ value: v, label: v }))} />
        </antd.Form.Item>
        <antd.Form.Item label="Description" required>
          <antd.Input.TextArea rows={4} placeholder="Describe the complaint or intelligence finding in detail — include observed non-compliance, quantities, locations, potential impact…" />
        </antd.Form.Item>
      </antd.Form>
    </antd.Modal>
  );

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC · IntelliGenCE Programme</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Post Monitoring</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Equipment complaints · IntelliGenCE knowledge base</antd.Typography.Text>
        </div>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Total Records',      v: recs.length },
          { l: 'Open',               v: open,  color: 'var(--color-danger)',  warn: open > 0 },
          { l: 'Critical Severity',  v: crit,  color: 'var(--color-danger)',  warn: crit > 0 },
          { l: 'Recurring Patterns', v: recur, color: 'var(--color-warning)', warn: recur > 0 },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? k.color : k.color || 'inherit' }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <antd.Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 20px' }} items={[
          { key: 'complaints',    label: <antd.Space><AlertOut_i />Complaints ({recs.length})</antd.Space>,    children: <div style={{ padding: '4px 0 20px' }}><ComplaintsTab /></div> },

          { key: 'knowledge',    label: <antd.Space><FileTextOutlined />Knowledge Base ({MOCK.knowledgeBase.length})</antd.Space>, children: <div style={{ padding: '4px 0 20px' }}><KnowledgeBaseTab /></div> },
        ]} />
      </antd.Card>

      <IntakeModal />
    </div>
  );
};

Object.assign(window, { SCREENS });
