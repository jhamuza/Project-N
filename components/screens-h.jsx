// screens-h.jsx — Post-Market Surveillance §5.8 (full rebuild)
// Overrides SCREENS['pms'] from screens-d.jsx

Object.assign(window.MOCK, {
  pmsAuditsFull: [
    {
      id: 'PMS-0426-001', supplier: 'Axiata Digital Sdn Bhd', supplierId: 'SUP-0126-00087',
      riskScore: 72, lastAudit: '2025-11-15', products: 23, status: 'proposed',
      reason: 'High volume · 12 months since last audit',
      riskBreakdown: { riskClass: 22, complianceHistory: 18, volume: 16, complaints: 0, randomSampling: 16 },
      notified: false, auditDate: null,
      sampling: [
        { rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro',      scheme: 'C', sampled: true  },
        { rcn: 'RCN-0326-00442', product: 'OPPO Find X7 Ultra', scheme: 'A', sampled: true  },
        { rcn: 'RCN-0823-00084', product: 'TP-Link Archer AX73',scheme: 'C', sampled: false },
      ],
    },
    {
      id: 'PMS-0426-002', supplier: 'Maxis Broadband Sdn Bhd', supplierId: 'SUP-0420-00012',
      riskScore: 85, lastAudit: '2025-06-20', products: 58, status: 'active',
      reason: 'Non-conformance flagged in previous cycle',
      riskBreakdown: { riskClass: 25, complianceHistory: 22, volume: 18, complaints: 12, randomSampling: 8 },
      notified: true, auditDate: '2026-04-22',
      findings: {
        checklist: [
          { id: 'chk-01', item: 'RCN label affixed to product',        result: 'pass',    note: '' },
          { id: 'chk-02', item: 'RCN label affixed to packaging',      result: 'pass',    note: '' },
          { id: 'chk-03', item: 'Label content matches registration',  result: 'fail',    note: 'Model number on label differs from registered BRA-LX9 — shows BRA-LX9A' },
          { id: 'chk-04', item: 'Technical specs within declared range',result: 'pass',   note: '' },
          { id: 'chk-05', item: 'Test report on-site and valid',       result: 'pending', note: '' },
          { id: 'chk-06', item: 'No RF emissions outside declared band',result: 'pass',   note: '' },
        ],
        observations: 'Label discrepancy found on Huawei Mate 60 Pro units. Batch #HM-2026-0341 affected. Supplier claims it was a printing error.',
        testResultsUploaded: true,
        nonConformances: [
          { id: 'NC-0426-001', item: 'Label model number mismatch', severity: 'minor', status: 'open', correctionDeadline: '2026-05-22' },
        ],
      },
      sampling: [
        { rcn: 'RCN-0126-00087', product: 'Huawei Mate 60 Pro',       scheme: 'A', sampled: true,  ncFound: true  },
        { rcn: 'RCN-0222-00044', product: 'Ericsson AIR 6419',         scheme: 'A', sampled: true,  ncFound: false },
        { rcn: 'RCN-0423-00112', product: '5G mmWave Test Unit',       scheme: 'SA',sampled: false, ncFound: false },
      ],
    },
    {
      id: 'PMS-0426-003', supplier: 'YTL Communications Sdn Bhd', supplierId: 'SUP-0125-00355',
      riskScore: 91, lastAudit: null, products: 5, status: 'proposed',
      reason: 'New supplier — mandatory first-cycle audit',
      riskBreakdown: { riskClass: 20, complianceHistory: 25, volume: 8, complaints: 18, randomSampling: 20 },
      notified: false, auditDate: null,
      sampling: [
        { rcn: 'RCN-0125-00198', product: 'YTL YES 5G Router', scheme: 'B', sampled: true },
      ],
    },
    {
      id: 'PMS-0325-004', supplier: 'Digi Telecommunications', supplierId: 'SUP-0823-00210',
      riskScore: 63, lastAudit: '2025-09-10', products: 9, status: 'completed',
      reason: 'Routine annual audit — passed',
      riskBreakdown: { riskClass: 15, complianceHistory: 12, volume: 10, complaints: 0, randomSampling: 26 },
      notified: true, auditDate: '2025-09-10',
      findings: {
        checklist: [
          { id: 'chk-01', item: 'RCN label affixed to product',        result: 'pass', note: '' },
          { id: 'chk-02', item: 'Label content matches registration',  result: 'pass', note: '' },
          { id: 'chk-03', item: 'Technical specs within declared range',result:'pass', note: '' },
          { id: 'chk-04', item: 'Test report on-site and valid',       result: 'pass', note: '' },
          { id: 'chk-05', item: 'No RF emissions outside declared band',result:'pass', note: '' },
        ],
        observations: 'No issues found. All products compliant. Digi has a well-maintained internal compliance system.',
        testResultsUploaded: true,
        nonConformances: [],
      },
      sampling: [
        { rcn: 'RCN-0823-00210', product: 'Digi 5G Home Gateway', scheme: 'B', sampled: true, ncFound: false },
      ],
    },
  ],
  aiParameters: [
    { id: 'param-01', name: 'Equipment Risk Classification (A/B/C)', weight: 25, editable: false, desc: 'Based on scheme — Scheme A (high) scores higher' },
    { id: 'param-02', name: 'Supplier Compliance History',           weight: 25, editable: true,  desc: 'Prior non-conformances, past audit outcomes' },
    { id: 'param-03', name: 'Registration Volume',                   weight: 15, editable: true,  desc: 'Number of active registrations — high-volume suppliers audited more frequently' },
    { id: 'param-04', name: 'Complaint Signals',                     weight: 15, editable: true,  desc: 'Open complaints from Post Monitoring module — feeds into score directly' },
    { id: 'param-05', name: 'Random Sampling (AI-generated)',        weight: 20, editable: false, desc: 'Randomised component to ensure unpredictability of audit schedule' },
  ],
});

const {
  SearchOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  WarningOutlined, InfoCircleOutlined, DownloadOutlined, UploadOutlined, EditOutlined,
  EyeOutlined, SendOutlined, RobotOutlined, BellOutlined, FileTextOutlined,
  ExclamationCircleOutlined, CheckOutlined, FilePdfOutlined
} = window.icons;
const AimOut_h    = window.icons.AimOutlined    || window.icons.ThunderboltOutlined;
const AlertOut_h  = window.icons.AlertOutlined  || window.icons.WarningOutlined;
const ThunderOut_h= window.icons.ThunderboltOutlined || window.icons.StarOutlined;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const riskColor = s => s >= 85 ? 'var(--color-danger)' : s >= 70 ? 'var(--color-warning)' : 'var(--color-success)';
const riskTag   = s => s >= 85 ? 'red' : s >= 70 ? 'orange' : 'green';
const checkResultIcon = r => r === 'pass' ? <CheckCircleOutlined style={{ color: 'var(--color-success)' }} /> : r === 'fail' ? <CloseCircleOutlined style={{ color: 'var(--color-danger)' }} /> : <ClockCircleOutlined style={{ color: 'var(--color-warning)' }} />;

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFY MODAL
// ─────────────────────────────────────────────────────────────────────────────
function NotifyModal({ open, audit, onClose, onSent }) {
  const [template, setTemplate] = React.useState('standard');
  const [date, setDate]         = React.useState('');
  const [notes, setNotes]       = React.useState('');

  const templates = {
    standard: `Dear ${audit?.supplier || 'Supplier'},\n\nMCMC wishes to inform you that your company has been selected for a Post-Market Surveillance (PMS) audit under the NCEF framework.\n\nPlease ensure all certificate documentation, test reports, and relevant personnel are available on the scheduled audit date.\n\nFor any queries, contact the CPPG Helpdesk at cppg@mcmc.gov.my.`,
    urgent:   `URGENT — 48-HOUR NOTICE\n\nDear ${audit?.supplier || 'Supplier'},\n\nYour company has been selected for an urgent Post-Market Surveillance audit following recent intelligence findings. An MCMC officer will be on-site within 48 hours.\n\nImmediate compliance is required under the Communications and Multimedia Act 1998.`,
  };

  return (
    <antd.Modal open={open} onCancel={onClose} title={<antd.Space><BellOutlined />Notify Supplier of Audit</antd.Space>}
      okText="Send Notification" onOk={() => { onSent(audit); onClose(); }} width={580}>
      {audit && (
        <antd.Form layout="vertical">
          <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }}
            message={`Audit ${audit.id} will be initiated for ${audit.supplier}`}
            description={<span>Risk Score: <antd.Tag color={riskTag(audit.riskScore)}>{audit.riskScore}</antd.Tag> · {audit.reason}</span>}
          />
          <antd.Form.Item label="Notification Template">
            <antd.Radio.Group value={template} onChange={e => setTemplate(e.target.value)}>
              <antd.Radio value="standard">Standard PMS Audit Notice</antd.Radio>
              <antd.Radio value="urgent">Priority Notice (48h on-site)</antd.Radio>
            </antd.Radio.Group>
          </antd.Form.Item>
          <antd.Form.Item label="Scheduled Audit Date" required>
            <antd.DatePicker style={{ width: '100%' }} onChange={(_, ds) => setDate(ds)} />
          </antd.Form.Item>
          <antd.Form.Item label="Notification Body (editable)">
            <antd.Input.TextArea rows={7} value={templates[template] + (notes ? '\n\n' + notes : '')} style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }} readOnly />
          </antd.Form.Item>
          <antd.Form.Item label="Additional Instructions">
            <antd.Input.TextArea rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Please make the technical PIC available and prepare all original test reports…" />
          </antd.Form.Item>
        </antd.Form>
      )}
    </antd.Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINDINGS DRAWER
// ─────────────────────────────────────────────────────────────────────────────
function FindingsDrawer({ open, audit, onClose }) {
  const [checklist, setChecklist] = React.useState(audit?.findings?.checklist || []);
  const [obs, setObs]             = React.useState(audit?.findings?.observations || '');
  const [ncText, setNcText]       = React.useState('');
  const [ncSev, setNcSev]         = React.useState('minor');
  const [ncList, setNcList]       = React.useState(audit?.findings?.nonConformances || []);
  const [saved, setSaved]         = React.useState(false);

  React.useEffect(() => {
    setChecklist(audit?.findings?.checklist || []);
    setObs(audit?.findings?.observations || '');
    setNcList(audit?.findings?.nonConformances || []);
    setSaved(false);
  }, [audit?.id]);

  function setResult(id, result) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, result } : c));
    setSaved(false);
  }
  function setNote(id, note) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, note } : c));
    setSaved(false);
  }
  function addNC() {
    if (!ncText) return;
    setNcList(prev => [...prev, { id: `NC-${Date.now()}`, item: ncText, severity: ncSev, status: 'open', correctionDeadline: '2026-05-28' }]);
    setNcText(''); setSaved(false);
  }

  const passCount = checklist.filter(c => c.result === 'pass').length;
  const failCount = checklist.filter(c => c.result === 'fail').length;
  const pendCount = checklist.filter(c => c.result === 'pending').length;

  return (
    <antd.Drawer open={open} onClose={onClose} width={600} title={audit ? `Audit Findings — ${audit.id} · ${audit.supplier}` : ''}
      footer={<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}><antd.Button onClick={onClose}>Cancel</antd.Button><antd.Button type="primary" icon={<CheckOutlined />} onClick={() => { setSaved(true); antd.message.success('Findings saved. Non-conformances will feed back into the AI Risk Scoring Engine.'); }}>Save Findings</antd.Button></div>}>
      {audit && (
        <div>
          {saved && <antd.Alert type="success" showIcon style={{ marginBottom: 16 }} message="Findings saved" description="Non-conformance records have been logged and will affect this supplier's future AI risk score." />}

          {/* Summary */}
          <antd.Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
            {[{ l: 'Pass', v: passCount, color: 'var(--color-success)' }, { l: 'Fail', v: failCount, color: 'var(--color-danger)', warn: failCount > 0 }, { l: 'Pending', v: pendCount, color: 'var(--color-warning)' }].map((k, i) => (
              <antd.Col span={8} key={i}><div className="kpi-card" style={{ padding: '12px 14px' }}><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ fontSize: 22, color: k.warn && k.v > 0 ? k.color : k.color }}>{k.v}</div></div></antd.Col>
            ))}
          </antd.Row>

          {/* Checklist */}
          <antd.Typography.Title level={5} style={{ marginTop: 0 }}>Compliance Checklist</antd.Typography.Title>
          {checklist.map(c => (
            <div key={c.id} style={{ padding: '10px 12px', border: `1px solid ${c.result === 'fail' ? 'var(--color-danger)' : c.result === 'pass' ? 'var(--color-success)' : 'var(--color-border)'}40`, borderRadius: 8, marginBottom: 8, background: c.result === 'fail' ? 'var(--color-danger-bg)' : c.result === 'pass' ? 'var(--color-success-bg)' : 'var(--color-bg-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1 }}>
                  {checkResultIcon(c.result)}
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{c.item}</span>
                </div>
                <antd.Radio.Group size="small" value={c.result} onChange={e => setResult(c.id, e.target.value)} buttonStyle="solid">
                  <antd.Radio.Button value="pass">Pass</antd.Radio.Button>
                  <antd.Radio.Button value="fail">Fail</antd.Radio.Button>
                  <antd.Radio.Button value="pending">N/A</antd.Radio.Button>
                </antd.Radio.Group>
              </div>
              {c.result === 'fail' && (
                <antd.Input size="small" style={{ marginTop: 8 }} placeholder="Describe the non-conformance…" value={c.note} onChange={e => setNote(c.id, e.target.value)} />
              )}
              {c.result === 'pass' && c.note && <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>{c.note}</div>}
            </div>
          ))}

          {/* Observations */}
          <antd.Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Observations & Remarks</antd.Divider>
          <antd.Input.TextArea rows={4} value={obs} onChange={e => { setObs(e.target.value); setSaved(false); }} placeholder="Overall audit observations, context, special circumstances…" style={{ marginBottom: 16 }} />

          {/* Document upload */}
          <antd.Divider orientation="left" orientationMargin={0}>Audit Evidence & Test Results</antd.Divider>
          <antd.Upload.Dragger multiple style={{ borderRadius: 8, marginBottom: 16 }}>
            <p style={{ fontSize: 24, margin: 0 }}>📎</p>
            <p style={{ fontWeight: 600 }}>Upload audit evidence</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Test reports, photos, compliance checklists, inspection documents · PDF / PNG / JPEG</p>
          </antd.Upload.Dragger>

          {/* Non-conformances */}
          <antd.Divider orientation="left" orientationMargin={0}>Non-Conformance Records</antd.Divider>
          <antd.Alert type="info" showIcon style={{ marginBottom: 12 }} message="NC records automatically feed back into the AI Risk Scoring Engine, affecting this supplier's future audit priority." />
          {ncList.map((nc, i) => (
            <div key={nc.id} style={{ padding: 10, border: `1px solid ${nc.severity === 'major' ? 'var(--color-danger)' : 'var(--color-warning)'}40`, borderRadius: 8, marginBottom: 8, background: nc.severity === 'major' ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <antd.Tag color={nc.severity === 'major' ? 'red' : 'orange'} style={{ marginRight: 8 }}>{nc.severity}</antd.Tag>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{nc.item}</span>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Correction deadline: {nc.correctionDeadline} · Status: {nc.status}</div>
              </div>
              <antd.Tag color={nc.status === 'open' ? 'orange' : 'green'}>{nc.status}</antd.Tag>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <antd.Select value={ncSev} onChange={setNcSev} style={{ width: 110 }} options={[{ value: 'minor', label: 'Minor NC' }, { value: 'major', label: 'Major NC' }]} />
            <antd.Input placeholder="Describe non-conformance…" value={ncText} onChange={e => setNcText(e.target.value)} onPressEnter={addNC} />
            <antd.Button type="primary" onClick={addNC} disabled={!ncText}>Add</antd.Button>
          </div>
        </div>
      )}
    </antd.Drawer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['pms'] = function PMS({ nav, currentUser }) {
  const [tab, setTab]             = React.useState('proposed');
  const [sampling, setSampling]   = React.useState(15);
  const [showParams, setShowParams] = React.useState(false);
  const [notifyTarget, setNotifyTarget] = React.useState(null);
  const [findingsTarget, setFindingsTarget] = React.useState(null);
  const [notifiedIds, setNotifiedIds] = React.useState(new Set(['PMS-0426-002']));
  const [params, setParams]       = React.useState(MOCK.aiParameters);
  const [selectedAudit, setSelectedAudit] = React.useState(null);

  const audits    = MOCK.pmsAuditsFull;
  const proposed  = audits.filter(a => a.status === 'proposed');
  const active    = audits.filter(a => a.status === 'active');
  const completed = audits.filter(a => a.status === 'completed');
  const totalNC   = audits.reduce((sum, a) => sum + (a.findings?.nonConformances?.length || 0), 0);

  function handleSent(audit) {
    setNotifiedIds(prev => new Set([...prev, audit.id]));
    antd.message.success(`Audit notification sent to ${audit.supplier}`);
  }

  // ── RISK BAR ────────────────────────────────────────────────────────────────
  const RiskBar = ({ score }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 80, height: 6, background: 'var(--color-bg-subtle)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score}%`, background: riskColor(score), borderRadius: 999 }} />
      </div>
      <antd.Tag color={riskTag(score)} style={{ fontWeight: 600, margin: 0 }}>{score}</antd.Tag>
    </div>
  );

  // ── PROPOSED TAB ────────────────────────────────────────────────────────────
  const ProposedTab = () => (
    <div>
      <antd.Row gutter={16} style={{ marginBottom: 16 }}>
        <antd.Col xs={24} lg={16}>
          <antd.Alert type="info" showIcon icon={<RobotOutlined />}
            message="AI Risk Scoring Engine — Proposed Audit List"
            description="The list below is generated by the AI engine based on configurable weighted parameters. Review, adjust if needed, then notify suppliers to initiate audits."
            action={<antd.Button size="small" onClick={() => setShowParams(!showParams)}>{showParams ? 'Hide' : 'Configure'} Parameters</antd.Button>}
          />
        </antd.Col>
        <antd.Col xs={24} lg={8}>
          <antd.Card size="small" bordered>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 6 }}>Product Sampling Rate</div>
            <antd.Slider min={5} max={50} step={5} value={sampling} onChange={setSampling} marks={{ 5: '5%', 25: '25%', 50: '50%' }} />
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>AI will propose {sampling}% of product models for physical sampling per audit</div>
          </antd.Card>
        </antd.Col>
      </antd.Row>

      {showParams && (
        <antd.Card bordered style={{ marginBottom: 16, background: 'var(--color-bg-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>AI Scoring Parameters</div>
            <antd.Button size="small" type="primary" onClick={() => { antd.message.success('Parameters saved. Proposals will refresh.'); setShowParams(false); }}>Save</antd.Button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12 }}>Total weight must sum to 100. Locked parameters cannot be changed.</div>
          {params.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: i < params.length - 1 ? '1px solid var(--color-divider)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{p.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {p.editable
                  ? <antd.InputNumber min={0} max={50} value={p.weight} onChange={v => setParams(prev => prev.map(x => x.id === p.id ? { ...x, weight: v || 0 } : x))} addonAfter="%" style={{ width: 100 }} />
                  : <><antd.Tag>{p.weight}%</antd.Tag><antd.Tag color="default">Locked</antd.Tag></>}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: params.reduce((a, b) => a + b.weight, 0) === 100 ? 'var(--color-success)' : 'var(--color-danger)' }}>
            Total: {params.reduce((a, b) => a + b.weight, 0)}% {params.reduce((a, b) => a + b.weight, 0) !== 100 && '⚠ Must equal 100%'}
          </div>
        </antd.Card>
      )}

      {proposed.map(audit => (
        <antd.Card key={audit.id} bordered style={{ marginBottom: 12, borderLeft: `4px solid ${riskColor(audit.riskScore)}` }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                <antd.Typography.Text code style={{ fontSize: 11 }}>{audit.id}</antd.Typography.Text>
                {notifiedIds.has(audit.id) && <antd.Tag color="green" icon={<CheckCircleOutlined />}>Notified</antd.Tag>}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{audit.supplier}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{audit.supplierId} · {audit.products} registered products</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 6 }}>{audit.reason}</div>
            </div>

            {/* Risk breakdown */}
            <div style={{ minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>Risk Breakdown</div>
              {Object.entries(audit.riskBreakdown).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--color-divider)', marginTop: 4, paddingTop: 4 }}>
                <RiskBar score={audit.riskScore} />
              </div>
            </div>

            {/* Product sampling */}
            <div style={{ minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>Sampling Proposals ({sampling}%)</div>
              {audit.sampling.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                  <antd.Checkbox checked={s.sampled} style={{ margin: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{s.product}</div>
                    <span className={`scheme-badge ${s.scheme?.toLowerCase()}`}>{s.scheme}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {!notifiedIds.has(audit.id)
                ? <antd.Button type="primary" icon={<SendOutlined />} onClick={() => setNotifyTarget(audit)}>Notify & Initiate</antd.Button>
                : <antd.Button icon={<EyeOutlined />}>View Notification</antd.Button>}
              <antd.Button icon={<EditOutlined />}>Edit Sampling</antd.Button>
            </div>
          </div>
        </antd.Card>
      ))}
    </div>
  );

  // ── ACTIVE TAB ──────────────────────────────────────────────────────────────
  const ActiveTab = () => (
    <div>
      {active.map(audit => {
        const pass   = audit.findings?.checklist?.filter(c => c.result === 'pass').length || 0;
        const fail   = audit.findings?.checklist?.filter(c => c.result === 'fail').length || 0;
        const nc     = audit.findings?.nonConformances?.length || 0;
        const total  = audit.findings?.checklist?.length || 0;
        const pct    = total ? Math.round((pass / total) * 100) : 0;
        return (
          <antd.Card key={audit.id} bordered style={{ marginBottom: 12, borderLeft: `4px solid ${nc > 0 ? 'var(--color-danger)' : 'var(--color-warning)'}` }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <antd.Typography.Text code style={{ fontSize: 11 }}>{audit.id}</antd.Typography.Text>
                  <antd.Tag color="orange">In Progress</antd.Tag>
                  {nc > 0 && <antd.Tag color="red" icon={<ExclamationCircleOutlined />}>{nc} NC</antd.Tag>}
                </div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{audit.supplier}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>Audit date: {audit.auditDate} · {audit.products} products</div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Checklist progress ({pass}/{total} items)</div>
                  <antd.Progress percent={pct} size="small" strokeColor={pct === 100 ? 'var(--color-success)' : fail > 0 ? 'var(--color-danger)' : 'var(--color-primary)'} />
                </div>
              </div>

              {/* Sampling */}
              <div style={{ minWidth: 200 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, marginBottom: 8 }}>Product Samples</div>
                {audit.sampling.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                    {s.ncFound ? <ExclamationCircleOutlined style={{ color: 'var(--color-danger)' }} /> : <CheckCircleOutlined style={{ color: 'var(--color-success)' }} />}
                    <div><div style={{ fontSize: 11, fontWeight: 500 }}>{s.product}</div></div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <antd.Button type="primary" icon={<EditOutlined />} onClick={() => setFindingsTarget(audit)}>Record Findings</antd.Button>
                <antd.Button icon={<DownloadOutlined />}>Export Report</antd.Button>
              </div>
            </div>
          </antd.Card>
        );
      })}
    </div>
  );

  // ── COMPLETED TAB ───────────────────────────────────────────────────────────
  const CompletedTab = () => (
    <div>
      {completed.map(audit => {
        const nc = audit.findings?.nonConformances?.length || 0;
        return (
          <antd.Card key={audit.id} bordered style={{ marginBottom: 12, borderLeft: `4px solid ${nc > 0 ? 'var(--color-warning)' : 'var(--color-success)'}` }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <antd.Typography.Text code style={{ fontSize: 11 }}>{audit.id}</antd.Typography.Text>
                  <antd.Tag color={nc > 0 ? 'orange' : 'green'}>{nc > 0 ? `${nc} NC found` : 'Fully compliant'}</antd.Tag>
                </div>
                <div style={{ fontWeight: 600 }}>{audit.supplier}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Completed {audit.auditDate} · {audit.reason}</div>
                {audit.findings?.observations && (
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 6, fontStyle: 'italic' }}>"{audit.findings.observations}"</div>
                )}
              </div>
              <antd.Space>
                <antd.Button icon={<EyeOutlined />} onClick={() => setFindingsTarget(audit)}>View Findings</antd.Button>
                <antd.Button icon={<DownloadOutlined />}>PDF Report</antd.Button>
              </antd.Space>
            </div>
          </antd.Card>
        );
      })}
    </div>
  );

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>MCMC · CPPG</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Post-Market Surveillance</antd.Typography.Title>
          <antd.Typography.Text type="secondary">AI-assisted audit proposals · Product sampling · Findings & non-conformance recording</antd.Typography.Text>
        </div>
        <antd.Button type="primary" icon={<RobotOutlined />} onClick={() => antd.message.success('AI proposals refreshed — scoring recalculated from latest complaint signals and compliance data.')}>Refresh AI Proposals</antd.Button>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'AI Proposed',        v: proposed.length,  color: 'var(--color-primary)' },
          { l: 'Active Audits',      v: active.length,    color: 'var(--color-warning)', warn: active.length > 0 },
          { l: 'Completed (YTD)',    v: completed.length, color: 'var(--color-success)' },
          { l: 'Open Non-Conformances', v: totalNC,       color: 'var(--color-danger)',  warn: totalNC > 0 },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && k.v > 0 ? k.color : k.color }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered bodyStyle={{ padding: 0 }}>
        <antd.Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 20px' }} items={[
          { key: 'proposed',  label: `AI Proposed (${proposed.length})`,  children: <div style={{ padding: '4px 0 20px' }}><ProposedTab /></div> },
          { key: 'active',    label: `Active (${active.length})`,          children: <div style={{ padding: '4px 0 20px' }}><ActiveTab /></div> },
          { key: 'completed', label: `Completed (${completed.length})`,   children: <div style={{ padding: '4px 0 20px' }}><CompletedTab /></div> },
        ]} />
      </antd.Card>

      <NotifyModal open={!!notifyTarget} audit={notifyTarget} onClose={() => setNotifyTarget(null)} onSent={handleSent} />
      <FindingsDrawer open={!!findingsTarget} audit={findingsTarget} onClose={() => setFindingsTarget(null)} />
    </div>
  );
};

Object.assign(window, { SCREENS });
