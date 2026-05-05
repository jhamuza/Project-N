// screens-g.jsx — Importation Module §5.7 (full rebuild)
// Overrides SCREENS['importation'] from screens-d.jsx

// ─── Extended mock data ───────────────────────────────────────────────────────
Object.assign(window.MOCK, {
  importPermitsFull: [
    {
      id: 'IMP-0426-001', type: 'Scheme A', rcn: 'RCN-0326-00442', product: 'OPPO Find X7 Ultra',
      quantity: 500, imeiCount: 500, serialCount: 0,
      consignor: 'Guangdong OPPO Mobile Telecommunications Corp., Ltd.', countryOfOrigin: 'China',
      consignee: 'Axiata Digital Sdn Bhd', agent: 'Aman Logistics Sdn Bhd',
      port: 'KLIA Cargo Terminal', mode: 'Air Freight',
      status: 'pending_rmcd', submitted: '2026-04-10', coaRef: null, rmcdRef: 'RMCD-2604-08812',
    },
    {
      id: 'IMP-0326-002', type: 'Scheme C', rcn: 'RCN-0326-00449', product: 'Mi Band 9 Pro',
      quantity: 2000, imeiCount: 0, serialCount: 2000,
      consignor: 'Anhui Huami Information Technology Co., Ltd.', countryOfOrigin: 'China',
      consignee: 'Axiata Digital Sdn Bhd', agent: 'Transcargo Forwarding Sdn Bhd',
      port: 'Port Klang (Northport)', mode: 'Sea Freight',
      status: 'coa_issued', submitted: '2026-03-28', coaRef: 'CoA-0426-123456', rmcdRef: 'RMCD-2603-07214',
    },
    {
      id: 'IMP-0226-003', type: 'Special Approval', rcn: null, saRef: 'SA-0226-00004', product: 'Keysight N5182B Signal Generator',
      quantity: 1, imeiCount: 0, serialCount: 1,
      consignor: 'Keysight Technologies Inc.', countryOfOrigin: 'United States',
      consignee: 'Axiata Digital Sdn Bhd', agent: 'JAS Forwarding (M) Sdn Bhd',
      port: 'KLIA Cargo Terminal', mode: 'Air Freight',
      status: 'coa_issued', submitted: '2026-02-14', coaRef: 'CoA-0226-098712', rmcdRef: 'RMCD-2602-05433',
    },
  ],
  customStations: ['KLIA Cargo Terminal', 'Port Klang (Northport)', 'Port Klang (Westport)', 'Penang Port', 'Port of Tanjung Pelepas (PTP)', 'Johor Port', 'Bintulu Port', 'Kuching Port'],
  countries: ['China', 'South Korea', 'United States', 'Germany', 'Japan', 'Taiwan', 'Netherlands', 'Sweden', 'Finland'],
});

const {
  SearchOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  WarningOutlined, InfoCircleOutlined, DownloadOutlined, EyeOutlined, ArrowRightOutlined,
  SafetyCertificateOutlined, ExclamationCircleOutlined, FilePdfOutlined
} = window.icons;
const BankOutlined_g = window.icons.BankOutlined || window.icons.ShopOutlined;
const ImportOut_g    = window.icons.ImportOutlined || window.icons.ArrowRightOutlined;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
SCREENS['importation'] = function Importation({ nav }) {
  const [view, setView]     = React.useState('list'); // 'list' | 'wizard'
  const [selected, setSelected] = React.useState(null);

  // Wizard state
  const [step, setStep]           = React.useState(0);
  const [permitType, setPermitType] = React.useState('');
  const [ref, setRef]             = React.useState('');
  const [qty, setQty]             = React.useState('');
  const [imeiQty, setImeiQty]     = React.useState('');
  const [validating, setValidating] = React.useState(false);
  const [validated, setValidated]   = React.useState(false);
  const [validateError, setValidateError] = React.useState(false);
  const [validatedProduct, setVP]   = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone]           = React.useState(false);
  const [newRef]                  = React.useState(`IMP-0426-${String(Date.now()).slice(-3)}`);

  const STEPS = ['Permit Type', 'Validate Reference', 'Trader & Consignor', 'Consignee & Agent', 'Logistics', 'Review & Submit'];

  function resetWizard() { setStep(0); setPermitType(''); setRef(''); setQty(''); setImeiQty(''); setValidated(false); setVP(null); setValidateError(false); setDone(false); }

  function doValidate() {
    setValidating(true);
    setValidateError(false);
    setTimeout(() => {
      const cert = MOCK.certificates.find(c => c.rcn.toLowerCase() === ref.toLowerCase());
      const saApp = ref.startsWith('SA-') ? { product: 'Keysight N5182B Signal Generator', scheme: 'SA' } : null;
      const found = cert || saApp;
      if (found) { setVP(found); setValidated(true); }
      else setValidateError(true);
      setValidating(false);
    }, 1200);
  }

  function doSubmit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1600);
  }

  const permits = MOCK.importPermitsFull;

  // ── DONE STATE ──────────────────────────────────────────────────────────────
  if (done) return (
    <div style={{ padding: 60, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px' }}>✓</div>
      <antd.Typography.Title level={3}>Submitted to RMCD MyOGA</antd.Typography.Title>
      <antd.Typography.Text type="secondary">Your import permit application has been transmitted via IBM webMethods ESB to RMCD. Complete payment at the RMCD MyOGA portal to receive your CoA.</antd.Typography.Text>
      <div style={{ margin: '24px 0', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, textAlign: 'left', minWidth: 180 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>NCEF Reference</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary)', fontSize: 16, marginTop: 4 }}>{newRef}</div>
        </div>
        <div style={{ padding: 20, background: 'var(--color-warning-bg)', borderRadius: 12, textAlign: 'left', minWidth: 180 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>RMCD Status</div>
          <div style={{ fontWeight: 600, color: 'var(--color-warning)', marginTop: 4 }}>Awaiting payment at RMCD</div>
        </div>
      </div>
      <antd.Alert type="info" showIcon style={{ textAlign: 'left', marginBottom: 20 }}
        message="Next: Pay at RMCD MyOGA System"
        description={<span>RMCD determines and collects all import permit fees. Once paid, a <b>Certificate of Acceptance (CoA)</b> in the format <antd.Typography.Text code>CoA-MMYY-XXXXXX</antd.Typography.Text> will be issued and reflected in your import permits list.</span>}
      />
      <antd.Space>
        <antd.Button onClick={() => { resetWizard(); setView('list'); }}>Back to Import Permits</antd.Button>
        <antd.Button type="primary" onClick={() => { resetWizard(); setView('wizard'); }}>New Application</antd.Button>
      </antd.Space>
    </div>
  );

  // ── WIZARD ──────────────────────────────────────────────────────────────────
  if (view === 'wizard') return (
    <div style={{ padding: 32, maxWidth: 960, margin: '0 auto' }}>
      <antd.Breadcrumb items={[{ title: <a onClick={() => { resetWizard(); setView('list'); }}>Import Permits</a> }, { title: 'New Application' }]} style={{ marginBottom: 12 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <antd.Typography.Title level={3} style={{ margin: 0 }}>New Import Permit Application</antd.Typography.Title>
        <antd.Tag color="blue" icon={<BankOutlined_g />}>Via RMCD MyOGA System · MCMC as Issuance Agency</antd.Tag>
      </div>

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

        {/* STEP 0 — Permit Type */}
        {step === 0 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Select Permit Type</antd.Typography.Title>
            <antd.Alert type="info" showIcon style={{ marginBottom: 20 }}
              message="Automatic assignment"
              description="Upon entering this module, you are automatically assigned MCMC as the Permit Issuance Agency with RMCD. All fees are determined and collected by RMCD — not MCMC."
            />
            <antd.Radio.Group value={permitType} onChange={e => setPermitType(e.target.value)} style={{ display: 'grid', gap: 12, width: '100%' }}>
              {[
                { v: 'Scheme A', t: 'Scheme A — Standard Certification', d: 'Full SDoC with CoC from accredited body. Validates RCN validity and IMEI/SN data.', badge: 'red' },
                { v: 'Scheme B', t: 'Scheme B — Specific Certification', d: 'SDoC with detailed technical verification. Validates RCN and quantity.', badge: 'orange' },
                { v: 'Scheme C', t: 'Scheme C — Self-Declaration', d: 'Low-risk equipment. Expedited review. Validates RCN.', badge: 'green' },
                { v: 'SA',       t: 'Special Approval', d: 'R&D, demonstration, trial, market survey, PoC, or personal import. Validates SA reference number.', badge: 'purple' },
              ].map(opt => (
                <antd.Radio key={opt.v} value={opt.v} style={{ padding: 14, border: `1.5px solid ${permitType === opt.v ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: permitType === opt.v ? 'var(--color-primary-soft)' : '#fff' }}>
                  <div style={{ display: 'inline-block', marginLeft: 6 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 600 }}>{opt.t}</span>
                      <span className={`scheme-badge ${opt.v === 'SA' ? 'sa' : opt.v.replace('Scheme ', '').toLowerCase()}`}>{opt.v}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{opt.d}</div>
                  </div>
                </antd.Radio>
              ))}
            </antd.Radio.Group>
            <div style={{ marginTop: 20 }}>
              <antd.Button type="primary" disabled={!permitType} onClick={() => setStep(1)}>Continue →</antd.Button>
            </div>
          </div>
        )}

        {/* STEP 1 — Validate Reference */}
        {step === 1 && (
          <div style={{ maxWidth: 600 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>
              Validate {permitType === 'SA' ? 'Special Approval Reference' : 'Registered Compliance Number (RCN)'}
            </antd.Typography.Title>
            <antd.Typography.Text type="secondary">
              The system validates your reference against NCEF records, including certificate validity, IMEI/SN registration, and quantity compliance before forwarding to RMCD.
            </antd.Typography.Text>
            <antd.Form layout="vertical" style={{ marginTop: 20 }}>
              <antd.Form.Item label={permitType === 'SA' ? 'Special Approval Reference Number' : 'Registered Compliance Number (RCN)'} required>
                <antd.Input size="large"
                  placeholder={permitType === 'SA' ? 'SA-0426-00012' : 'RCN-0326-00449'}
                  value={ref} onChange={e => { setRef(e.target.value); setValidated(false); setVP(null); setValidateError(false); }}
                  prefix={<SafetyCertificateOutlined style={{ color: 'var(--color-text-muted)' }} />}
                  suffix={validated ? <CheckCircleOutlined style={{ color: 'var(--color-success)' }} /> : null}
                />
              </antd.Form.Item>
              <antd.Row gutter={12}>
                <antd.Col span={12}>
                  <antd.Form.Item label="Import Quantity" required extra="Total units in this shipment">
                    <antd.InputNumber size="large" style={{ width: '100%' }} min={1} value={qty || undefined} onChange={v => setQty(v)} placeholder="500" addonAfter="units" />
                  </antd.Form.Item>
                </antd.Col>
                {permitType !== 'SA' && (
                  <antd.Col span={12}>
                    <antd.Form.Item label="IMEI / Serial Numbers" extra="Must match registered identifiers">
                      <antd.InputNumber size="large" style={{ width: '100%' }} min={0} value={imeiQty || undefined} onChange={v => setImeiQty(v)} placeholder="500" addonAfter="IMEIs" />
                    </antd.Form.Item>
                  </antd.Col>
                )}
              </antd.Row>

              {validateError && (
                <antd.Alert type="error" showIcon style={{ marginBottom: 8 }} message="Reference not found"
                  description="The RCN or SA reference number was not found in NCEF records, or may have expired. Verify the reference and try again. Valid test values: RCN-0326-00449, RCN-0326-00442, SA-0426-00012."
                />
              )}
              {validated && validatedProduct && (
                <antd.Alert type="success" showIcon style={{ marginBottom: 8 }} message="Reference validated successfully"
                  description={
                    <div>
                      <div><b>Product:</b> {validatedProduct.product || validatedProduct.model}</div>
                      {validatedProduct.scheme && <div><b>Scheme:</b> {validatedProduct.scheme} · Status: Active</div>}
                      <div style={{ marginTop: 6, color: 'var(--color-success)', fontWeight: 600, fontSize: 12 }}>✓ IMEI/SN data and quantity verified against NCEF registry</div>
                    </div>
                  }
                />
              )}
            </antd.Form>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <antd.Button onClick={() => setStep(0)}>← Back</antd.Button>
              {!validated
                ? <antd.Button type="primary" loading={validating} disabled={!ref || !qty} onClick={doValidate}>Validate →</antd.Button>
                : <antd.Button type="primary" onClick={() => setStep(2)}>Continue →</antd.Button>}
            </div>
          </div>
        )}

        {/* STEP 2 — Trader & Consignor */}
        {step === 2 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Trader Information & Consignor Details</antd.Typography.Title>
            <antd.Form layout="vertical">
              <antd.Card size="small" bordered style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Trader Information (RMCD/JKDM Registration)</div>
                <antd.Alert type="info" showIcon style={{ marginBottom: 14 }} message="Trader details must match your RMCD/JKDM registration exactly for cross-system validation." />
                <antd.Row gutter={16}>
                  <antd.Col span={12}><antd.Form.Item label="Trader Name" required><antd.Input defaultValue="Axiata Digital Sdn Bhd" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Trader RMCD/JKDM Code" required><antd.Input placeholder="MY-2019-000345" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="ROC / ROB Number" required><antd.Input defaultValue="201901023456" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="SST Registration Number"><antd.Input placeholder="W10-1808-32000123" /></antd.Form.Item></antd.Col>
                  <antd.Col span={24}><antd.Form.Item label="Registered Address" required><antd.Input.TextArea rows={2} defaultValue="Level 21, Axiata Tower, No. 9 Jalan Stesen Sentral 5, KL Sentral, 50470 Kuala Lumpur" /></antd.Form.Item></antd.Col>
                </antd.Row>
              </antd.Card>

              <antd.Card size="small" bordered>
                <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Consignor Details (Overseas Supplier)</div>
                <antd.Row gutter={16}>
                  <antd.Col span={12}><antd.Form.Item label="Company Name" required><antd.Input placeholder="Guangdong OPPO Mobile Telecommunications Corp., Ltd." /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Country / Place of Origin" required>
                    <antd.Select showSearch placeholder="Select country…" options={MOCK.countries.map(c => ({ value: c, label: c }))} />
                  </antd.Form.Item></antd.Col>
                  <antd.Col span={24}><antd.Form.Item label="Full Address" required><antd.Input.TextArea rows={2} placeholder="No. 18 Haibin Road, Wuchang, Dongguan, Guangdong 523860, China" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Contact Person"><antd.Input placeholder="Mr. Li Wei" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Contact Email"><antd.Input placeholder="li.wei@oppo.com" /></antd.Form.Item></antd.Col>
                </antd.Row>
              </antd.Card>
            </antd.Form>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <antd.Button onClick={() => setStep(1)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setStep(3)}>Continue →</antd.Button>
            </div>
          </div>
        )}

        {/* STEP 3 — Consignee & Agent */}
        {step === 3 && (
          <div>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Consignee & Customs Agent</antd.Typography.Title>
            <antd.Form layout="vertical">
              <antd.Card size="small" bordered style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Consignee (Malaysian Importer)</div>
                <antd.Row gutter={16}>
                  <antd.Col span={12}><antd.Form.Item label="Company Name" required><antd.Input defaultValue="Axiata Digital Sdn Bhd" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="ROC / ROB Number" required><antd.Input defaultValue="201901023456" /></antd.Form.Item></antd.Col>
                  <antd.Col span={24}><antd.Form.Item label="Full Address" required><antd.Input.TextArea rows={2} defaultValue="Level 21, Axiata Tower, No. 9 Jalan Stesen Sentral 5, KL Sentral, 50470 Kuala Lumpur" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Contact Person" required><antd.Input defaultValue="Nurul Aisyah binti Ahmad" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Contact Phone" required><antd.Input defaultValue="+60 3-2263 8888" /></antd.Form.Item></antd.Col>
                </antd.Row>
              </antd.Card>

              <antd.Card size="small" bordered>
                <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Customs / Forwarding Agent</div>
                <antd.Row gutter={16}>
                  <antd.Col span={12}><antd.Form.Item label="Agent Name" required><antd.Input placeholder="Aman Logistics Sdn Bhd" /></antd.Form.Item></antd.Col>
                  <antd.Col span={12}><antd.Form.Item label="Agent Code (JKDM)" required><antd.Input placeholder="A-2015-00423" /></antd.Form.Item></antd.Col>
                  <antd.Col span={24}><antd.Form.Item label="Agent Address"><antd.Input.TextArea rows={2} placeholder="No. 12, Jalan Cargo, Sepang, 64000 Selangor" /></antd.Form.Item></antd.Col>
                </antd.Row>
              </antd.Card>
            </antd.Form>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <antd.Button onClick={() => setStep(2)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setStep(4)}>Continue →</antd.Button>
            </div>
          </div>
        )}

        {/* STEP 4 — Logistics */}
        {step === 4 && (
          <div style={{ maxWidth: 680 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Logistics & Shipment Details</antd.Typography.Title>
            <antd.Form layout="vertical">
              <antd.Row gutter={16}>
                <antd.Col span={12}>
                  <antd.Form.Item label="Mode of Transport" required>
                    <antd.Select defaultValue="air" options={[{ value: 'air', label: '✈ Air Freight' }, { value: 'sea', label: '🚢 Sea Freight' }, { value: 'land', label: '🚛 Land / Road' }, { value: 'express', label: '📦 Express Courier' }]} />
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={12}>
                  <antd.Form.Item label="Purpose of Import" required>
                    <antd.Select defaultValue="commercial" options={[{ value: 'commercial', label: 'Commercial Sale' }, { value: 'personal', label: 'Personal Use' }, { value: 'rd', label: 'Research & Development' }, { value: 'demo', label: 'Demonstration / Sample' }]} />
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={12}>
                  <antd.Form.Item label="Custom Station / Port of Entry" required>
                    <antd.Select showSearch defaultValue="KLIA Cargo Terminal" options={MOCK.customStations.map(s => ({ value: s, label: s }))} />
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={12}>
                  <antd.Form.Item label="Expected Arrival Date">
                    <antd.DatePicker style={{ width: '100%' }} />
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={12}>
                  <antd.Form.Item label="HS Tariff Code" extra="Harmonised System code for customs classification">
                    <antd.Input placeholder="8517.12.00" />
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={12}>
                  <antd.Form.Item label="CIF Value (MYR)" extra="Cost, Insurance & Freight value for customs valuation">
                    <antd.InputNumber style={{ width: '100%' }} placeholder="850000" formatter={v => `RM ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v?.replace(/RM\s?|(,*)/g, '')} />
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={24}>
                  <antd.Form.Item label="Remarks / Special Instructions">
                    <antd.Input.TextArea rows={3} placeholder="e.g. Temperature-controlled handling required. Lithium battery classification applies." />
                  </antd.Form.Item>
                </antd.Col>
              </antd.Row>
            </antd.Form>
            <div style={{ display: 'flex', gap: 10 }}>
              <antd.Button onClick={() => setStep(3)}>← Back</antd.Button>
              <antd.Button type="primary" onClick={() => setStep(5)}>Review →</antd.Button>
            </div>
          </div>
        )}

        {/* STEP 5 — Review & Submit */}
        {step === 5 && (
          <div style={{ maxWidth: 680 }}>
            <antd.Typography.Title level={4} style={{ marginTop: 0 }}>Review & Submit to RMCD</antd.Typography.Title>
            <antd.Descriptions bordered column={2} size="small" style={{ marginBottom: 16 }}>
              <antd.Descriptions.Item label="Permit Type" span={2}><antd.Tag>{permitType}</antd.Tag></antd.Descriptions.Item>
              <antd.Descriptions.Item label={permitType === 'SA' ? 'SA Reference' : 'RCN'}><antd.Typography.Text code>{ref}</antd.Typography.Text></antd.Descriptions.Item>
              <antd.Descriptions.Item label="Product">{validatedProduct?.product || validatedProduct?.model || '—'}</antd.Descriptions.Item>
              {validatedProduct?.scheme && <antd.Descriptions.Item label="Scheme"><antd.Tag color={{ A: 'red', B: 'orange', C: 'green', SA: 'purple' }[validatedProduct.scheme] || 'default'}>Scheme {validatedProduct.scheme}</antd.Tag></antd.Descriptions.Item>}
              {validatedProduct?.brand && <antd.Descriptions.Item label="Brand / Manufacturer">{validatedProduct.brand}</antd.Descriptions.Item>}
              <antd.Descriptions.Item label="Quantity">{qty} units</antd.Descriptions.Item>
              {permitType !== 'SA' && <antd.Descriptions.Item label="IMEI / SNs">{imeiQty || 0} identifiers</antd.Descriptions.Item>}
              <antd.Descriptions.Item label="Consignor">Guangdong OPPO Mobile Telecom Corp.</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Country of Origin">China</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Consignee" span={2}>Axiata Digital Sdn Bhd · ROC 201901023456</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Agent">Aman Logistics Sdn Bhd · A-2015-00423</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Port">KLIA Cargo Terminal</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Mode">Air Freight</antd.Descriptions.Item>
              <antd.Descriptions.Item label="Payment">Collected by RMCD MyOGA</antd.Descriptions.Item>
            </antd.Descriptions>
            <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }}
              message="Payment at RMCD — not MCMC Pay"
              description="You will be directed to the RMCD MyOGA System to complete payment. All import permit fees are determined and collected exclusively by RMCD. No payment is made through the NCEF portal."
            />
            <antd.Alert type="info" showIcon style={{ marginBottom: 20 }}
              message="CoA upon successful payment"
              description={<span>RMCD will issue a <b>Certificate of Acceptance (CoA)</b> in the format <antd.Typography.Text code>CoA-MMYY-XXXXXX</antd.Typography.Text> once payment is confirmed. This links your NCEF-validated equipment to the physical shipment.</span>}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <antd.Button onClick={() => setStep(4)}>← Back</antd.Button>
              <antd.Button type="primary" loading={submitting} onClick={doSubmit} icon={<ArrowRightOutlined />}>Submit to RMCD MyOGA</antd.Button>
            </div>
          </div>
        )}
      </antd.Card>
    </div>
  );

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  const statusMeta = {
    pending_rmcd: { label: 'Pending RMCD Payment', color: 'orange' },
    coa_issued:   { label: 'CoA Issued',            color: 'green'  },
    rejected:     { label: 'Rejected by RMCD',      color: 'red'    },
  };

  return (
    <div style={{ padding: 32, maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Supplier · RMCD Integration</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Import Permits</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Import permit applications via RMCD MyOGA · Certificate of Acceptance (CoA) tracking</antd.Typography.Text>
        </div>
        <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => { resetWizard(); setView('wizard'); }}>New Import Application</antd.Button>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Total Applications', v: permits.length },
          { l: 'CoA Issued',         v: permits.filter(p => p.status === 'coa_issued').length,   color: 'var(--color-success)' },
          { l: 'Pending RMCD',       v: permits.filter(p => p.status === 'pending_rmcd').length, warn: true },
          { l: 'Total Units Imported',v: permits.filter(p => p.status === 'coa_issued').reduce((a, b) => a + b.quantity, 0).toLocaleString() },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn && parseInt(k.v) > 0 ? 'var(--color-warning)' : k.color || 'inherit' }}>{k.v}</div></div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered style={{ overflowX: 'auto' }}>
        <antd.Table rowKey="id" dataSource={permits} pagination={false} scroll={{ x: 'max-content' }}
          onRow={r => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })}
          columns={[
            { title: 'App ID',     dataIndex: 'id',      width: 120, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
            { title: 'Type',       dataIndex: 'type',    width: 80,  render: v => <antd.Tag style={{ whiteSpace: 'nowrap' }}>{v}</antd.Tag> },
            { title: 'Reference',  width: 140, render: (_, r) => r.rcn ? <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{r.rcn}</antd.Typography.Text> : <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{r.saRef}</antd.Typography.Text> },
            { title: 'Product',    dataIndex: 'product', width: 220, render: (v, r) => <div><div style={{ fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.consignor}</div></div> },
            { title: 'Qty',        dataIndex: 'quantity', width: 70, align: 'right', render: v => v.toLocaleString() },
            { title: 'Port',       dataIndex: 'port',    width: 150 },
            { title: 'Submitted',  dataIndex: 'submitted', width: 110, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB')}</span> },
            { title: 'RMCD Ref',   dataIndex: 'rmcdRef',  width: 130, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
            { title: 'Status',     dataIndex: 'status',   width: 180, render: s => { const m = statusMeta[s] || { label: s, color: 'default' }; return <antd.Tag color={m.color} style={{ whiteSpace: 'nowrap' }}>{m.label}</antd.Tag>; } },
            { title: 'CoA',        dataIndex: 'coaRef',   width: 130, render: v => v ? <antd.Space size="small"><antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text><antd.Button size="small" icon={<DownloadOutlined />} /></antd.Space> : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
          ]}
        />
      </antd.Card>

      <antd.Drawer open={!!selected} onClose={() => setSelected(null)} width={560} title={selected ? `${selected.id} — ${selected.product}` : ''}>
        {selected && (
          <div>
            <antd.Tag color={statusMeta[selected.status]?.color} style={{ marginBottom: 16, fontSize: 13, padding: '4px 10px' }}>{statusMeta[selected.status]?.label}</antd.Tag>
            <antd.Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }} items={[
              { key: 'type',      label: 'Permit Type',       children: <antd.Tag>{selected.type}</antd.Tag> },
              { key: 'ref',       label: selected.rcn ? 'RCN' : 'SA Reference', children: <antd.Typography.Text code>{selected.rcn || selected.saRef}</antd.Typography.Text> },
              { key: 'product',   label: 'Product',           children: selected.product },
              { key: 'qty',       label: 'Quantity',          children: `${selected.quantity.toLocaleString()} units` },
              { key: 'imei',      label: 'IMEI / SNs',        children: `${(selected.imeiCount || 0) + (selected.serialCount || 0)} identifiers` },
              { key: 'consignor', label: 'Consignor',         children: <div><div style={{ fontWeight: 600 }}>{selected.consignor}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{selected.countryOfOrigin}</div></div> },
              { key: 'consignee', label: 'Consignee',         children: selected.consignee },
              { key: 'agent',     label: 'Agent',             children: selected.agent },
              { key: 'port',      label: 'Port',              children: selected.port },
              { key: 'mode',      label: 'Mode',              children: selected.mode },
              { key: 'submitted', label: 'Submitted',         children: new Date(selected.submitted).toLocaleDateString('en-GB') },
              { key: 'rmcd',      label: 'RMCD Reference',    children: <antd.Typography.Text code>{selected.rmcdRef}</antd.Typography.Text> },
            ]} />
            {selected.coaRef ? (
              <antd.Alert type="success" showIcon icon={<CheckCircleOutlined />}
                message={<span>Certificate of Acceptance issued: <antd.Typography.Text code>{selected.coaRef}</antd.Typography.Text></span>}
                description="This CoA serves as verified link between NCEF-validated equipment and the physical shipment. Download for customs clearance."
                action={<antd.Button size="small" icon={<DownloadOutlined />}>Download CoA</antd.Button>}
              />
            ) : (
              <antd.Alert type="warning" showIcon icon={<ClockCircleOutlined />}
                message="Awaiting RMCD payment"
                description="Complete payment at the RMCD MyOGA portal to receive your Certificate of Acceptance (CoA)."
                action={<antd.Button size="small" type="primary" icon={<ArrowRightOutlined />}>Go to RMCD</antd.Button>}
              />
            )}
          </div>
        )}
      </antd.Drawer>
    </div>
  );
};

Object.assign(window, { SCREENS });
