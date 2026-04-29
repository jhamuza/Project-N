// Screens: SDoC Wizard (Scheme A/B/C), Special Approval, Officer Review

// ============ SDoC WIZARD ============
SCREENS['sdoc-wizard'] = function SDoCWizard({ nav, tweaks }) {
  const [scheme, setScheme] = React.useState('A');
  const [step, setStep] = React.useState(0);
  const [aiRunning, setAiRunning] = React.useState(false);
  const [aiDone, setAiDone] = React.useState(false);
  const [form] = Form.useForm();

  const steps = [
    { k: 'scheme', t: 'Scheme' },
    { k: 'product', t: 'Product' },
    { k: 'docs', t: 'Documents' },
    { k: 'ai', t: 'Document Validation' },
    { k: 'review', t: 'Review' },
    { k: 'pay', t: 'Payment' },
    { k: 'confirm', t: 'Confirm' },
  ];

  React.useEffect(() => {
    if (step === 3 && !aiDone) {
      setAiRunning(true);
      const t = setTimeout(() => { setAiRunning(false); setAiDone(true); }, 2400);
      return () => clearTimeout(t);
    }
  }, [step]);

  const schemes = [
    { k: 'A', t: 'Scheme A', sub: 'Generic Certification', d: 'Most consumer devices — radio/telecom equipment with standard compliance profile.', fee: 'RM 1,200', sla: '3 working days', ai: 'Standard compliance review · Processed within 3 working days' },
    { k: 'B', t: 'Scheme B', sub: 'Specific Certification', d: 'Equipment requiring detailed technical review (non-standard parameters, custom modulation).', fee: 'RM 2,500', sla: '5 working days', ai: 'Enhanced document review + mandatory officer verification' },
    { k: 'C', t: 'Scheme C', sub: 'Self-Declaration (SDoC)', d: 'Low-risk equipment under a manufacturer conformity declaration.', fee: 'RM 600', sla: '1 working day', ai: 'Eligible for expedited approval within 1 working day' },
  ];

  const Sidebar = () => (
    <div style={{ width: 280, padding: 24, borderRight: '1px solid var(--color-divider)', background: 'var(--color-bg-elevated)', minHeight: '100%' }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginBottom: 4 }}>SDoC Application</div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 24 }}>Scheme {scheme} · Draft</div>
      {tweaks.wizardPattern === 'vertical' && (
        <div>
          {steps.map((s, i) => (
            <div key={s.k} onClick={() => i < step && setStep(i)} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', cursor: i < step ? 'pointer' : 'default', opacity: i > step ? .5 : 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid', borderColor: i === step ? 'var(--color-primary)' : i < step ? 'var(--color-success)' : 'var(--color-border)', background: i < step ? 'var(--color-success)' : i === step ? 'var(--color-primary)' : '#fff', color: i <= step ? '#fff' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{i < step ? '✓' : i + 1}</div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3 }}>Step {i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: i === step ? 600 : 500 }}>{s.t}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Divider />
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700 }}>Application ID</div>
      <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', marginTop: 2 }}>APP-0426-00088</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginTop: 16 }}>Auto-saved</div>
      <div style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 2 }}>✓ 3 seconds ago</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginTop: 16 }}>Support</div>
      <Button type="link" size="small" style={{ padding: 0 }}>Ask MINA assistant</Button>
    </div>
  );

  const TopBar = () => (
    <div style={{ padding: '20px 32px', background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-divider)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: tweaks.wizardPattern === 'horizontal' ? 20 : 0 }}>
        <div>
          <Breadcrumb items={[{ title: <a onClick={() => nav('dashboard')}>Dashboard</a> }, { title: <a onClick={() => nav('applications')}>Applications</a> }, { title: 'New SDoC' }]} />
          <Title level={3} style={{ margin: '6px 0 0' }}>{steps[step].t}</Title>
        </div>
        <Space>
          <Button>Save draft</Button>
          <Button danger type="text">Cancel</Button>
        </Space>
      </div>
      {tweaks.wizardPattern === 'horizontal' && (
        <Steps current={step} size="small" labelPlacement="vertical" responsive items={steps.map(s => ({ title: s.t }))} />
      )}
      {tweaks.wizardPattern === 'pill' && (
        <div className="wizard-pill-bar" style={{ marginTop: 16 }}>
          {steps.map((s, i) => (
            <div key={s.k} className={`pill ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => i <= step && setStep(i)}>
              {i < step ? '✓ ' : `${i + 1}. `}{s.t}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const SchemeStep = () => (
    <div style={{ maxWidth: 900 }}>
      <Alert type="info" showIcon message="Your product suggests Scheme A based on radio equipment profile" description="Your uploaded datasheet was assessed and matched to MCMC MTSFB TC G015:2022 category." style={{ marginBottom: 20 }} />
      <Row gutter={16}>
        {schemes.map(s => (
          <Col xs={24} md={8} key={s.k}>
            <div onClick={() => setScheme(s.k)} style={{ padding: 20, border: `2px solid ${scheme === s.k ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 12, cursor: 'pointer', background: scheme === s.k ? 'var(--color-primary-soft)' : '#fff', height: '100%', position: 'relative' }}>
              {s.k === 'A' && <div style={{ position: 'absolute', top: -10, right: 14, fontSize: 10, fontWeight: 700, padding: '2px 8px', background: 'var(--color-warning)', color: '#fff', borderRadius: 4, letterSpacing: .5 }}>SUGGESTED</div>}
              <SchemeBadge scheme={s.k} />
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>{s.sub}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 10, lineHeight: 1.5 }}>{s.d}</div>
              <Divider style={{ margin: '14px 0' }} />
              <div style={{ fontSize: 12, display: 'grid', gap: 6 }}>
                <div><b>Fee:</b> <span style={{ color: 'var(--color-text-secondary)' }}>{s.fee}</span></div>
                <div><b>SLA:</b> <span style={{ color: 'var(--color-text-secondary)' }}>{s.sla}</span></div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>{s.ai}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );

  const ProductStep = () => (
    <Form form={form} layout="vertical" style={{ maxWidth: 780 }}>
      <Row gutter={16}>
        <Col span={12}><Form.Item label="Brand" required><Input placeholder="Samsung" /></Form.Item></Col>
        <Col span={12}><Form.Item label="Model / Part Number" required><Input placeholder="SM-S928B" /></Form.Item></Col>
        <Col span={24}><Form.Item label="Marketing Name" extra="Optional — helps label registry"><Input placeholder="Galaxy S24 Ultra" /></Form.Item></Col>
        <Col span={12}><Form.Item label="Product Category" required><Select placeholder="Select…" options={[{value:'mobile',label:'Mobile Phone / Smartphone'},{value:'wifi',label:'Wi-Fi / WLAN Device'},{value:'bt',label:'Bluetooth Device'},{value:'iot',label:'IoT / Connected Device'},{value:'network',label:'Network Equipment'}]} /></Form.Item></Col>
        <Col span={12}><Form.Item label="Country of Origin" required><Select placeholder="Select…" showSearch options={[{value:'vn',label:'Vietnam'},{value:'cn',label:'China'},{value:'kr',label:'Korea, Republic of'},{value:'th',label:'Thailand'}]} /></Form.Item></Col>
        <Col span={24}>
          <Form.Item
            label="Certifying Agency (CA)"
            required
            extra="Select all accredited labs whose test reports you are submitting. Multiple selections allowed."
          >
            <Select
              mode="multiple"
              placeholder="Select certifying agencies…"
              maxTagCount="responsive"
              options={[
                { value: 'sirim', label: 'SIRIM QAS International Sdn Bhd' },
                { value: 'tuv', label: 'TÜV Rheinland Malaysia' },
                { value: 'sgs', label: 'SGS Malaysia Sdn Bhd' },
                { value: 'bureau_veritas', label: 'Bureau Veritas (Malaysia)' },
                { value: 'intertek', label: 'Intertek Testing Services (M) Sdn Bhd' },
                { value: 'ul', label: 'UL International (Malaysia)' },
                { value: 'fcc_lab', label: 'FCC-accredited foreign lab (attach accreditation letter)' },
                { value: 'ce_lab', label: 'CE Notified Body (attach NB certificate)' },
              ]}
              defaultValue={['sirim']}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Divider orientation="left" orientationMargin={0} style={{ fontSize: 14 }}>Technical Parameters</Divider>
        </Col>
        <Col span={8}><Form.Item label="Frequency Band (MHz)" required><Input placeholder="2400–2483.5" /></Form.Item></Col>
        <Col span={8}><Form.Item label="Max Output Power (dBm)" required><Input placeholder="26" /></Form.Item></Col>
        <Col span={8}><Form.Item label="Antenna Gain (dBi)" required><Input placeholder="3.5" /></Form.Item></Col>
        <Col span={8}><Form.Item label="Modulation"><Input placeholder="OFDMA, 256-QAM" /></Form.Item></Col>
        <Col span={8}><Form.Item label="Channel Bandwidth (MHz)"><Input placeholder="20 / 40 / 80 / 160" /></Form.Item></Col>
        <Col span={8}><Form.Item label="Supply Voltage (V)"><Input placeholder="5 DC / 3.7 Li-ion" /></Form.Item></Col>
        <Col span={24}><Form.Item label="Intended Use"><TextArea rows={3} placeholder="Consumer smartphone sold through authorised retail channels in Malaysia." /></Form.Item></Col>
      </Row>
    </Form>
  );

  const DocsStep = () => (
    <div style={{ maxWidth: 780 }}>
      <Alert message="We'll extract and verify data from your uploads" description="Upload clear, non-redacted copies. Fields will be populated automatically; you can review before submission." type="info" showIcon style={{ marginBottom: 20 }} />
      <div style={{ display: 'grid', gap: 12 }}>
        {[
          { k: 'reg', label: 'Company Registration (SSM)', req: true, status: 'verified', file: 'Company_Registration_SSM.pdf' },
          { k: 'bro', label: 'Technical Brochure / Datasheet', req: true, status: 'verified', file: 'Technical_Brochure_S24Ultra.pdf' },
          { k: 'test', label: 'Test Report (accredited lab)', req: true, status: 'verified', file: 'Test_Report_SIRIM_2026.pdf' },
          { k: 'photo', label: 'Product Photos (front, back, label)', req: true, status: 'pending', file: '3 files uploaded' },
          { k: 'decl', label: 'Declaration Letter', req: true, status: 'upload' },
          { k: 'coc', label: 'CE / FCC Certificate (foreign)', req: false, status: 'upload' },
        ].map(d => (
          <div key={d.k} className="doc-tile" style={{ padding: 14 }}>
            <div className="icon">📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{d.label} {d.req && <Tag color="red" style={{ fontSize: 10, margin: '0 0 0 6px' }}>Required</Tag>}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{d.file || 'Not uploaded'}</div>
            </div>
            {d.status === 'verified' && <Tag color="green" icon="✓">OCR Verified</Tag>}
            {d.status === 'pending' && <Tag color="orange">Analysing…</Tag>}
            {d.status === 'upload' && <Upload><Button size="small">+ Upload</Button></Upload>}
          </div>
        ))}
      </div>
    </div>
  );

  const AIStep = () => (
    <div style={{ maxWidth: 780 }}>
      {aiRunning && (
        <Card bordered style={{ borderColor: 'var(--color-primary)', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileSearchOutlined style={{ fontSize: 24, color: 'var(--color-primary)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Validating your submission…</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>Cross-referencing SSM records, document content, and compliance standards</div>
              <Progress percent={70} status="active" showInfo={false} strokeColor="var(--color-primary)" style={{ marginTop: 10 }} />
            </div>
          </div>
        </Card>
      )}
      {aiDone && (
        <>
          <AiScoreCard score={87} reasoning={MOCK.aiReasoning} viz={tweaks.aiViz} supplierMode />
          <Alert type="warning" showIcon style={{ marginTop: 16 }} message="2 items flagged for officer review" description="Your compliance score of 87 meets the processing threshold but a brief officer review is required. Expected turnaround: ~2 working days." />
        </>
      )}
    </div>
  );

  const ReviewStep = () => (
    <div style={{ maxWidth: 900 }}>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Product Summary" size="small" bordered style={{ marginBottom: 12 }}>
            <Row gutter={[16, 12]}>
              {[
                ['Scheme', <SchemeBadge scheme={scheme} />],
                ['Brand', 'Samsung'],
                ['Model', 'SM-S928B'],
                ['Marketing Name', 'Galaxy S24 Ultra'],
                ['Category', 'Mobile Phone / Smartphone'],
                ['Country of Origin', 'Vietnam'],
                ['Frequency Band', '2400–2483.5 MHz'],
                ['Max Output Power', '26 dBm'],
              ].map(([k, v], i) => (
                <Col span={12} key={i}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{v}</div>
                </Col>
              ))}
            </Row>
          </Card>
          <Card title="Documents (6)" size="small" bordered>
            <div style={{ display: 'grid', gap: 8 }}>
              {MOCK.documents.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13 }}>
                  <span>📄</span>
                  <span style={{ flex: 1 }}>{d.name}</span>
                  <Text type="secondary" style={{ fontSize: 11 }}>{d.size}</Text>
                  <Tag color={d.ocrStatus === 'verified' ? 'green' : 'orange'} style={{ fontSize: 10, margin: 0 }}>{d.ocrStatus === 'verified' ? '✓ Verified' : 'Pending'}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <AiScoreCard score={87} reasoning={MOCK.aiReasoning} viz="bar" compact supplierMode />
          <Card size="small" bordered style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Fee Summary</div>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>RM 1,200</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Scheme A base fee (incl. 8% SST)</div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const PayStep = () => (
    <div style={{ maxWidth: 560 }}>
      <Card bordered>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Amount Due</div>
        <div style={{ fontSize: 36, fontWeight: 700 }}>RM 1,200.00</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 20 }}>Scheme A · APP-0426-00088 · Includes 8% SST</div>
        <Divider />
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Payment Method</div>
        <Radio.Group defaultValue="fpx" style={{ display: 'grid', gap: 8, width: '100%' }}>
          {[
            { v: 'fpx', t: 'FPX Online Banking', d: 'Malaysia Electronic Payment System' },
            { v: 'card', t: 'Credit / Debit Card', d: 'Visa, Mastercard, American Express' },
            { v: 'duitnow', t: 'DuitNow QR', d: 'Scan with any participating bank app' },
            { v: 'invoice', t: 'Corporate Invoice', d: '30-day terms · Pre-approved accounts only' },
          ].map(m => (
            <Radio key={m.v} value={m.v} style={{ padding: 14, border: '1px solid var(--color-border)', borderRadius: 8, margin: 0, width: '100%' }}>
              <div style={{ display: 'inline-block' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.t}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{m.d}</div>
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </Card>
    </div>
  );

  const ConfirmStep = () => (
    <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: 560, margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', width: 80, height: 80, borderRadius: '50%', background: 'var(--color-success-bg)', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: 'var(--color-success)' }}>✓</div>
      <Title level={3} style={{ marginTop: 16 }}>Application Submitted</Title>
      <Text type="secondary">Payment received. Your application is in the priority review queue.</Text>
      <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12 }}>
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Application ID</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>APP-0426-00088</div>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Expected Decision</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>22 Apr 2026</div>
          </Col>
        </Row>
      </div>
      <Space style={{ marginTop: 28 }}>
        <Button size="large" onClick={() => nav('applications')}>View My Applications</Button>
        <Button size="large" type="primary" onClick={() => nav('dashboard')}>Go to Dashboard</Button>
      </Space>
    </div>
  );

  const StepBody = [SchemeStep, ProductStep, DocsStep, AIStep, ReviewStep, PayStep, ConfirmStep][step];

  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      {tweaks.wizardPattern === 'vertical' && <Sidebar />}
      <div style={{ flex: 1 }}>
        <TopBar />
        <div style={{ padding: 32 }}>
          <StepBody />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--color-divider)', maxWidth: 900 }}>
            <Button disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</Button>
            {step < steps.length - 1 && (
              <Button type="primary" size="large" onClick={() => setStep(step + 1)} disabled={step === 3 && aiRunning}>
                {step === 4 ? 'Proceed to Payment →' : step === 5 ? 'Pay RM 1,200 →' : 'Continue →'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ SPECIAL APPROVAL ============
function WaiverCodeInput() {
  const [code, setCode] = React.useState('');
  const [status, setStatus] = React.useState(null); // null | 'checking' | 'valid' | 'invalid'
  const check = () => {
    if (!code.trim()) return;
    setStatus('checking');
    setTimeout(() => {
      setStatus(code.trim().toUpperCase() === 'MCMC-RD-2026' ? 'valid' : 'invalid');
    }, 800);
  };
  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          placeholder="e.g. MCMC-RD-2026"
          value={code}
          onChange={e => { setCode(e.target.value); setStatus(null); }}
          style={{ fontFamily: 'var(--font-mono)', flex: 1 }}
          status={status === 'invalid' ? 'error' : status === 'valid' ? '' : ''}
          onPressEnter={check}
        />
        <Button onClick={check} loading={status === 'checking'}>Apply</Button>
      </div>
      {status === 'valid' && (
        <Alert type="success" showIcon message="Waiver applied — application fee waived" style={{ marginTop: 8 }} />
      )}
      {status === 'invalid' && (
        <Alert type="error" showIcon message="Invalid waiver code. Please check with your MCMC contact." style={{ marginTop: 8 }} />
      )}
      {!status && <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6 }}>Demo code: MCMC-RD-2026</div>}
    </div>
  );
}

SCREENS['special-approval'] = function SpecialApproval({ nav, tweaks }) {
  const [step, setStep] = React.useState(0);
  const [purpose, setPurpose] = React.useState(null);
  const [isProhibited, setIsProhibited] = React.useState(false);
  const [mcmcApproved, setMcmcApproved] = React.useState(null);

  const purposes = [
    { k: 'rd', t: 'Research & Development', d: 'Internal prototype testing, lab evaluation, non-commercial R&D', prohibited: false },
    { k: 'demo', t: 'Demonstration / Exhibition', d: 'Trade show, conference demo — limited duration and venue', prohibited: false },
    { k: 'personal', t: 'Personal Use', d: 'Individual importing one unit for non-commercial use', prohibited: false },
    { k: 'prohibited', t: 'Prohibited Equipment (R&D only)', d: 'Jammers, scanners, SDR transmitters — requires MCMC head approval', prohibited: true },
  ];

  const steps = ['Purpose', 'Equipment', 'Details', 'Documents', 'Declaration', 'Confirm'];

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <Breadcrumb items={[{ title: <a onClick={() => nav('dashboard')}>Dashboard</a> }, { title: 'Special Approval' }]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '8px 0 24px' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Special Approval Application</Title>
          <Text type="secondary">Communications & Multimedia Act 1998 · Section 126</Text>
        </div>
        <Tag color="purple" style={{ fontWeight: 600 }}>SCHEME SA</Tag>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Steps current={step} size="small" labelPlacement="vertical" responsive items={steps.map(s => ({ title: s }))} />
      </div>

      <Card bordered>
        {step === 0 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>What is the purpose of this equipment?</Title>
            <Text type="secondary">Select one. Prohibited-equipment R&D involves an additional multi-level escalation workflow.</Text>
            <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
              {purposes.map(p => (
                <div key={p.k} onClick={() => { setPurpose(p.k); setIsProhibited(p.prohibited); }} style={{ padding: 16, border: `2px solid ${purpose === p.k ? (p.prohibited ? 'var(--color-danger)' : 'var(--color-primary)') : 'var(--color-border)'}`, borderRadius: 12, cursor: 'pointer', background: purpose === p.k ? (p.prohibited ? 'var(--color-danger-bg)' : 'var(--color-primary-soft)') : '#fff', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid', borderColor: purpose === p.k ? (p.prohibited ? 'var(--color-danger)' : 'var(--color-primary)') : 'var(--color-border-strong)', background: purpose === p.k ? (p.prohibited ? 'var(--color-danger)' : 'var(--color-primary)') : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, flexShrink: 0, marginTop: 2 }}>{purpose === p.k && '✓'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{p.t} {p.prohibited && <Tag color="red" style={{ marginLeft: 6, fontSize: 10 }}>RESTRICTED</Tag>}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Equipment Classification</Title>
            <Text type="secondary">Help us identify the correct review path.</Text>
            {isProhibited && (
              <Alert
                type="error"
                showIcon
                style={{ marginTop: 16 }}
                message="Prohibited Equipment Disclosure"
                description={
                  <>
                    <p style={{ margin: 0 }}>Prohibited equipment (radio jammers, SDR transmitters operating outside licensed bands, receivers that intercept private communications) is restricted under the Communications & Multimedia Act 1998.</p>
                    <p style={{ margin: '8px 0 0' }}>Import for R&D purposes requires <b>sequential approval</b> from: (1) the assigned officer, (2) the Head of Certification, (3) the Director General of MCMC.</p>
                  </>
                }
              />
            )}
            <Form layout="vertical" style={{ marginTop: 24, maxWidth: 600 }}>
              <Form.Item label="Equipment Type" required>
                <Select placeholder="Select…" options={[
                  { value: 'jammer', label: 'Radio Frequency Jammer' },
                  { value: 'sdr', label: 'Software Defined Radio (unlicensed bands)' },
                  { value: 'scanner', label: 'Wideband Receiver / Scanner' },
                  { value: 'custom', label: 'Custom RF Device (specify)' },
                ]} />
              </Form.Item>
              <Form.Item label="Is the equipment from an MCMC pre-approved vendor?" required>
                <Radio.Group onChange={e => setMcmcApproved(e.target.value)}>
                  <Radio value="yes">Yes — from list</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Radio.Group>
              </Form.Item>
              {mcmcApproved === 'no' && (
                <Alert type="warning" showIcon message="Non-listed vendor" description="Additional vendor due-diligence documentation required in the next step." />
              )}
            </Form>
          </div>
        )}
        {step === 2 && (
          <Form layout="vertical">
            <Title level={4} style={{ marginTop: 0 }}>Equipment & Research Details</Title>
            <Row gutter={16}>
              <Col span={12}><Form.Item label="Manufacturer" required><Input placeholder="Keysight Technologies" /></Form.Item></Col>
              <Col span={12}><Form.Item label="Model" required><Input placeholder="N5182B MXG" /></Form.Item></Col>
              <Col span={12}><Form.Item label="Quantity" required><Input type="number" placeholder="1" /></Form.Item></Col>
              <Col span={12}><Form.Item label="Frequency Range" required><Input placeholder="100 kHz – 6 GHz" /></Form.Item></Col>
              <Col span={12}><Form.Item label="Import Date" required><DatePicker style={{ width: '100%' }} /></Form.Item></Col>
              <Col span={12}><Form.Item label="Intended Duration in Malaysia" required><Select options={[{value:'3m',label:'3 months'},{value:'6m',label:'6 months'},{value:'1y',label:'1 year'},{value:'2y',label:'2 years'}]} /></Form.Item></Col>
              <Col span={24}><Form.Item label="Research Purpose (detailed)" required><TextArea rows={4} placeholder="We intend to evaluate 5G mmWave transmission characteristics in a shielded anechoic chamber at our KL Sentral R&D lab…" /></Form.Item></Col>
              <Col span={24}><Form.Item label="Operating Location" required><Input placeholder="Shielded Lab 3F, Axiata R&D Centre, Cyberjaya" /></Form.Item></Col>
              <Col span={24}><Form.Item label="Responsible Engineer / PI" required><Input placeholder="Dr. Siti Hajar binti Mohd Nor (PhD, MIET)" /></Form.Item></Col>
            </Row>
          </Form>
        )}
        {step === 3 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Required Documents</Title>
            <Text type="secondary">All special-approval submissions require these attachments. {isProhibited && <b>Prohibited-equipment R&D requires an additional Ministry sponsorship letter.</b>}</Text>
            <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
              {[
                { t: 'Letter of Justification (Company Letterhead)', req: true },
                { t: 'Equipment Specification / Datasheet', req: true },
                { t: 'Import Permit Application', req: true },
                { t: 'Safety & Shielding Assessment', req: true },
                { t: 'Proof of Lab Accreditation', req: true },
                ...(isProhibited ? [{ t: 'Ministry of Science, Technology & Innovation (MOSTI) Sponsorship Letter', req: true, extra: 'Prohibited equipment only' }] : []),
                { t: 'MCMC Pre-approval Ticket (if applicable)', req: false },
              ].map((d, i) => (
                <div key={i} className="doc-tile">
                  <div className="icon">📄</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{d.t} {d.req && <Tag color="red" style={{ fontSize: 10, margin: '0 0 0 6px' }}>Required</Tag>}</div>
                    {d.extra && <div style={{ fontSize: 11, color: 'var(--color-danger)', marginTop: 2 }}>{d.extra}</div>}
                  </div>
                  <Upload><Button size="small">+ Upload</Button></Upload>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>Declaration & Undertaking</Title>
            {isProhibited && (
              <Alert type="warning" showIcon message="Multi-level approval notice" style={{ marginBottom: 16 }}
                description={
                  <div>
                    Your application will route sequentially through:
                    <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      {['Officer (CPPG)', 'Head of Certification', 'Director General MCMC'].map((p, i, arr) => (
                        <React.Fragment key={i}>
                          <Tag color="purple" style={{ padding: '4px 10px', fontWeight: 600 }}>{p}</Tag>
                          {i < arr.length - 1 && <span style={{ color: 'var(--color-text-muted)' }}>→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ marginTop: 10, fontSize: 12 }}>Expected decision time: 10–15 working days</div>
                  </div>
                }
              />
            )}
            <div style={{ display: 'grid', gap: 14, maxWidth: 760 }}>
              {[
                'I declare the information provided is true and accurate to the best of my knowledge.',
                'I understand misrepresentation is an offence under the CMA 1998 and may result in prosecution.',
                'I agree not to use the equipment outside the declared purpose, location, or duration.',
                'I will surrender the equipment to MCMC upon completion of the approved activity.',
                ...(isProhibited ? ['I accept that prohibited equipment may not be transferred, sold, or exhibited to any third party without explicit written MCMC approval.'] : []),
              ].map((t, i) => (
                <Checkbox key={i} style={{ fontSize: 13, lineHeight: 1.6 }}>{t}</Checkbox>
              ))}
            </div>
            <Divider />
            <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 10, padding: 16, maxWidth: 480, marginBottom: 20, border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Fee Waiver Code <Tag style={{ fontSize: 10 }}>Optional</Tag></div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 10 }}>If MCMC has issued a waiver code for this application (e.g. academic/R&D exemption), enter it here to bypass the standard SA application fee.</div>
              <WaiverCodeInput />
            </div>
            <Form.Item label="Digital signature (full name)" required style={{ maxWidth: 400 }}>
              <Input placeholder="Dr. Siti Hajar binti Mohd Nor" />
            </Form.Item>
          </div>
        )}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ display: 'inline-flex', width: 80, height: 80, borderRadius: '50%', background: isProhibited ? '#EDE7F6' : 'var(--color-success-bg)', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: isProhibited ? '#5E35B1' : 'var(--color-success)' }}>{isProhibited ? '⏳' : '✓'}</div>
            <Title level={3} style={{ marginTop: 16 }}>Special Approval Submitted</Title>
            <Text type="secondary">{isProhibited ? 'Routed to multi-level approval queue' : 'Routed to CPPG officer for review'}</Text>
            <div style={{ marginTop: 24, padding: 20, background: 'var(--color-primary-soft)', borderRadius: 12, display: 'inline-block' }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Application ID</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>APP-SA-0426-00012</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>Expected decision: {isProhibited ? '10–15 working days' : '3–5 working days'}</div>
            </div>
            <div style={{ marginTop: 28 }}>
              <Button size="large" type="primary" onClick={() => nav('applications')}>View My Applications</Button>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--color-divider)' }}>
          <Button disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</Button>
          {step < steps.length - 1 && <Button type="primary" onClick={() => setStep(step + 1)}>Continue →</Button>}
        </div>
      </Card>
    </div>
  );
};

// ============ OFFICER REVIEW SPLIT VIEW ============
SCREENS['officer-review'] = function OfficerReview({ nav, tweaks, currentUser }) {
  const [decision, setDecision] = React.useState(null);
  const [iterMsg, setIterMsg] = React.useState('');
  const [showDocViewer, setShowDocViewer] = React.useState(false);
  const [activeDoc, setActiveDoc] = React.useState(null);
  const [reassignOpen, setReassignOpen] = React.useState(false);
  const [assignedOverride, setAssignedOverride] = React.useState(null);
  const a = MOCK.assessments[0];
  const isLead = currentUser?.role === 'team-lead';
  const isOfficer = currentUser?.role === 'officer';

  // Access guard: normal officer can only review apps assigned to them.
  // Use the first queue entry as the "current app" for this mocked screen.
  const queueEntry = MOCK.officerQueue.find(q => q.id === a.id) || MOCK.officerQueue[0];
  const assignedId = assignedOverride ?? queueEntry?.assignedTo;
  const assignedOfficer = MOCK.officerPerformance.find(o => o.id === assignedId);
  const canReview = !isOfficer || assignedId === currentUser.id;

  if (!canReview) {
    return (
      <antd.Result
        status="warning"
        title="Not assigned to you"
        subTitle={<>Application <Typography.Text code>{a.id}</Typography.Text> is currently assigned to <b>{assignedOfficer?.name || 'another officer'}</b>. Ask your Team Lead to reassign if needed.</>}
        extra={<Button type="primary" onClick={() => nav('officer-queue')}>Back to My Queue</Button>}
        style={{ padding: '80px 24px' }}
      />
    );
  }

  return (
    <div>
      <div style={{ padding: '16px 32px', background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Breadcrumb items={[{ title: <a onClick={() => nav('officer-queue')}>Queue</a> }, { title: <span style={{ fontFamily: 'var(--font-mono)' }}>{a.id}</span> }]} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6 }}>
            <SchemeBadge scheme={a.scheme} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>{a.product}</span>
            <Text type="secondary">· {a.brand} {a.model}</Text>
            <StatusPill status={a.status} />
            {assignedOfficer && (
              <Tag color={assignedOfficer.role === 'team-lead' ? 'purple' : 'blue'}>
                Assigned to {assignedOfficer.name}
              </Tag>
            )}
          </div>
        </div>
        <Space>
          <Tooltip title="Previous in queue"><Button icon="←">Prev</Button></Tooltip>
          <Tooltip title="Next in queue"><Button icon="→">Next</Button></Tooltip>
          {isLead && <Button onClick={() => setReassignOpen(true)}>Reassign</Button>}
          <Button type="text" danger>Flag</Button>
        </Space>
      </div>

      {isLead && window.AssignOfficerModal && (
        <window.AssignOfficerModal
          open={reassignOpen}
          onClose={() => setReassignOpen(false)}
          applicationId={a.id}
          currentAssigneeId={assignedId}
          onAssign={(officerId) => {
            setAssignedOverride(officerId);
            const name = MOCK.officerPerformance.find(o => o.id === officerId)?.name;
            antd.message.success(`${a.id} reassigned to ${name}`);
          }}
        />
      )}

      <div className="officer-split">
        {/* LEFT: Document viewer */}
        <div style={{ padding: 24, overflow: 'auto', background: 'var(--color-bg-base)' }}>
          <Tabs
            defaultActiveKey="docs"
            items={[
              {
                key: 'docs',
                label: 'Documents (6)',
                children: (
                  <div style={{ display: 'grid', gap: 10 }}>
                    {MOCK.documents.map((d, i) => (
                      <div key={i} className="doc-tile" onClick={() => { setActiveDoc(d); setShowDocViewer(true); }} style={{ cursor: 'pointer' }}>
                        <div className="icon">📄</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{d.type} · {d.size}</div>
                        </div>
                        {d.ocrStatus === 'verified' && <Tag color="green" style={{ fontSize: 10, margin: 0 }}>✓ OCR Verified</Tag>}
                        {d.ocrStatus === 'pending' && <Tag color="orange" style={{ fontSize: 10, margin: 0 }}>Pending</Tag>}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: 'fields',
                label: 'Extracted Fields',
                children: (
                  <Card bordered>
                    <Row gutter={[16, 16]}>
                      {[
                        ['Brand', 'Samsung', 'verified'],
                        ['Model / PN', 'SM-S928B', 'verified'],
                        ['Marketing Name', '— (blank)', 'warn'],
                        ['Frequency Band', '2400–2483.5 MHz', 'verified'],
                        ['Max Output Power', '26 dBm', 'verified'],
                        ['Antenna Gain', '3.5 dBi', 'verified'],
                        ['Modulation', 'OFDMA, 256-QAM', 'verified'],
                        ['Test Lab', 'SIRIM QAS (#LM-15-004)', 'verified'],
                        ['Standards', 'MCMC MTSFB TC G015:2022', 'warn'],
                        ['Country of Origin', 'Vietnam', 'verified'],
                      ].map(([k, v, s], i) => (
                        <Col span={12} key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 10, background: s === 'warn' ? 'var(--color-warning-bg)' : 'var(--color-bg-subtle)', borderRadius: 6 }}>
                            <div>
                              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>{k}</div>
                              <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{v}</div>
                            </div>
                            {s === 'verified' ? <Tag color="green" style={{ fontSize: 10, margin: 0 }}>✓</Tag> : <Tag color="orange" style={{ fontSize: 10, margin: 0 }}>!</Tag>}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                ),
              },
              {
                key: 'audit',
                label: 'Audit Trail',
                children: (
                  <Card bordered>
                    <List
                      size="small"
                      dataSource={[
                        { t: 'Application submitted', u: 'Nurul Aisyah (SUP-0426-00142)', d: '15 Apr 2026, 14:20', icon: '📤' },
                        { t: 'AI validation complete (score 87)', u: 'Qwen2.5-VL', d: '15 Apr 2026, 14:21', icon: '🤖' },
                        { t: 'Auto-assigned to En. Faisal', u: 'NCEF Router', d: '15 Apr 2026, 14:21', icon: '➡️' },
                        { t: 'Opened for review', u: 'En. Faisal Rahman', d: '18 Apr 2026, 10:30', icon: '👁' },
                      ]}
                      renderItem={e => (
                        <List.Item style={{ padding: '10px 0' }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{ fontSize: 16 }}>{e.icon}</div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500 }}>{e.t}</div>
                              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{e.u} · {e.d}</div>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                ),
              },
            ]}
          />
        </div>

        {/* RIGHT: Decision panel */}
        <div style={{ padding: 24, background: 'var(--color-bg-elevated)', borderLeft: '1px solid var(--color-divider)', overflow: 'auto' }}>
          <AiScoreCard score={a.aiScore} reasoning={MOCK.aiReasoning} viz={tweaks.aiViz} />

          <Divider />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginBottom: 10 }}>Applicant</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
            <Avatar style={{ background: 'var(--color-primary)' }}>A</Avatar>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Axiata Digital Sdn Bhd</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>SUP-0426-00142 · 47 approvals · 0 rejections</div>
            </div>
          </div>

          <Divider />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginBottom: 10 }}>Decision</div>
          <Radio.Group value={decision} onChange={e => setDecision(e.target.value)} style={{ width: '100%', display: 'grid', gap: 8 }}>
            {[
              { v: 'approve', t: 'Approve', d: 'Issue certificate (RCN)', color: 'var(--color-success)' },
              { v: 'iterate', t: 'Request Iteration', d: 'Return to applicant for amendment', color: 'var(--color-warning)' },
              { v: 'reject', t: 'Reject', d: 'Close application with documented reason', color: 'var(--color-danger)' },
            ].map(o => (
              <Radio key={o.v} value={o.v} style={{ padding: 10, border: `1px solid ${decision === o.v ? o.color : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: decision === o.v ? `${o.color}10` : '#fff' }}>
                <span style={{ display: 'inline-block' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: decision === o.v ? o.color : 'inherit' }}>{o.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{o.d}</div>
                </span>
              </Radio>
            ))}
          </Radio.Group>

          {decision === 'iterate' && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginBottom: 8 }}>Iteration Request</div>
              <Select
                placeholder="Select templates (multi)…"
                mode="multiple"
                style={{ width: '100%' }}
                options={[
                  { value: 'band', label: 'Frequency band — missing secondary range' },
                  { value: 'clause', label: 'Standards — unjustified N/A clause' },
                  { value: 'name', label: 'Marketing name blank' },
                ]}
              />
              <TextArea value={iterMsg} onChange={e => setIterMsg(e.target.value)} rows={4} placeholder="Additional notes to applicant…" style={{ marginTop: 8 }} />
              <DatePicker placeholder="Resubmission deadline" style={{ width: '100%', marginTop: 8 }} />
            </div>
          )}
          {decision === 'reject' && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginBottom: 8 }}>Rejection Reason</div>
              <Select placeholder="Primary reason…" style={{ width: '100%' }} options={[{ value: 'specs', label: 'Technical specifications do not meet standards' }, { value: 'docs', label: 'Documents insufficient / not authentic' }, { value: 'fraud', label: 'Suspected misrepresentation' }]} />
              <TextArea rows={4} placeholder="Detailed rationale (included in notification)…" style={{ marginTop: 8 }} />
            </div>
          )}
          {decision === 'approve' && (
            <Alert type="success" showIcon style={{ marginTop: 16 }} message="Certificate will be issued on submit" description="RCN will be auto-generated and emailed to the applicant with the AI-signed certificate PDF." />
          )}

          <div style={{ marginTop: 24, display: 'grid', gap: 8 }}>
            <Button type="primary" size="large" block disabled={!decision} onClick={() => alert('Decision submitted')}>Submit Decision</Button>
            <Button block>Save draft</Button>
          </div>

          <Divider />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 700, marginBottom: 10 }}>SLA</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Progress type="circle" size={60} percent={62} strokeColor="var(--color-warning)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>18 hrs remaining</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Scheme A · 48 hr SLA</div>
            </div>
          </div>
        </div>
      </div>

      <Drawer title={activeDoc?.name || 'Document Preview'} open={showDocViewer} onClose={() => setShowDocViewer(false)} width={760}>
        {/* PDF viewer toolbar */}
        <div style={{ background: '#3c3c3c', borderRadius: '6px 6px 0 0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, color: '#ddd' }}>
          <Button size="small" style={{ background: '#555', border: 'none', color: '#ddd' }} icon={<LeftOutlined />} />
          <Button size="small" style={{ background: '#555', border: 'none', color: '#ddd' }} icon={<RightOutlined />} />
          <span style={{ fontSize: 12, color: '#aaa', marginLeft: 4 }}>Page 1 / 3</span>
          <div style={{ flex: 1 }} />
          <Button size="small" style={{ background: '#555', border: 'none', color: '#ddd' }} icon={<ZoomInOutlined />} />
          <Button size="small" style={{ background: '#555', border: 'none', color: '#ddd' }} icon={<ZoomOutOutlined />} />
          <span style={{ fontSize: 12, color: '#aaa' }}>100%</span>
          <div style={{ flex: 1 }} />
          <Button size="small" style={{ background: '#555', border: 'none', color: '#ddd' }} icon={<DownloadOutlined />}>Download</Button>
        </div>
        {/* PDF page mockup */}
        <div style={{ background: '#525659', padding: 16, borderRadius: '0 0 6px 6px', minHeight: 420, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 540, minHeight: 380, borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.4)', padding: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 10, color: '#bbb', fontFamily: 'monospace' }}>{activeDoc?.name || 'document.pdf'}</div>
            {/* Simulated document content lines */}
            <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, background: '#0B4F91', borderRadius: 4 }} />
              <div>
                <div style={{ height: 8, background: '#222', borderRadius: 2, width: 140, marginBottom: 4 }} />
                <div style={{ height: 6, background: '#aaa', borderRadius: 2, width: 100 }} />
              </div>
            </div>
            <div style={{ height: 1, background: '#e5e7eb', margin: '12px 0' }} />
            {[[160,'#333'],[220,'#555'],[180,'#555'],[240,'#555'],[200,'#555']].map(([w,c],i) => (
              <div key={i} style={{ height: 7, background: c, borderRadius: 2, width: w, marginBottom: 10 }} />
            ))}
            <div style={{ height: 1, background: '#e5e7eb', margin: '16px 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Manufacturer','Keysight Technologies'],['Model','SM-S928B'],['Freq Band','2400–2483.5 MHz'],['Max Power','26 dBm'],['Test Date','12 Jan 2026'],['Lab Ref','SIRIM #LM-15-004']].map(([k,v],i) => (
                <div key={i} style={{ background: '#f8f9fa', borderRadius: 4, padding: '6px 10px' }}>
                  <div style={{ fontSize: 9, color: '#888', textTransform: 'uppercase', letterSpacing: .4 }}>{k}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#222', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              {[[240,'#555'],[200,'#555'],[260,'#555'],[180,'#aaa']].map(([w,c],i) => (
                <div key={i} style={{ height: 7, background: c, borderRadius: 2, width: w, marginBottom: 10 }} />
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 10, color: '#bbb' }}>1</div>
          </div>
        </div>
        <Divider>OCR Extraction</Divider>
        <List
          size="small"
          dataSource={[
            'Model: SM-S928B ✓',
            'Frequency: 2400–2483.5 MHz ✓',
            'Max Power: 26 dBm ✓',
            'Test Lab: SIRIM QAS (#LM-15-004) ✓',
          ]}
          renderItem={i => <List.Item>{i}</List.Item>}
        />
      </Drawer>
    </div>
  );
};

// ============ SUPPLIERS MANAGEMENT (MCMC Admin / Officer) ============
// Per amended URS: ADMIN and OFFICER can view/add/remove suppliers without verification
// (their authority replaces the normal 2-layer verification flow). Removal is soft-delete.
// They may NOT create SDoC registrations on a supplier's behalf — that remains a supplier action.
SCREENS['suppliers-mgmt'] = function SuppliersManagement({ nav, currentUser }) {
  const role = currentUser?.role || 'officer';
  const roleLabel = role === 'team-lead' ? 'MCMC System Administrator' : 'MCMC Officer';
  const [suppliers, setSuppliers] = React.useState(MOCK.supplierDirectory);
  const [filter, setFilter] = React.useState('active');
  const [search, setSearch] = React.useState('');
  const [addOpen, setAddOpen] = React.useState(false);
  const [bulkOpen, setBulkOpen] = React.useState(false);
  const [confirmRemove, setConfirmRemove] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const list = suppliers
    .filter(s => filter === 'all' ? true : filter === 'active' ? !s.deletedAt : !!s.deletedAt)
    .filter(s => {
      if (!search) return true;
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.brn.includes(q) || s.id.toLowerCase().includes(q);
    });

  const counts = {
    all: suppliers.length,
    active: suppliers.filter(s => !s.deletedAt).length,
    deleted: suppliers.filter(s => s.deletedAt).length,
  };

  function handleAdd(values) {
    const next = {
      id: 'SUP-0426-' + String(suppliers.length + 1).padStart(5, '0'),
      name: values.name,
      brn: values.brn,
      category: values.category,
      since: new Date().toISOString().slice(0, 10),
      approvals: 0,
      active: true,
      address: values.address,
      pic: values.pic,
      picEmail: values.picEmail,
      addedBy: role === 'team-lead' ? 'mcmc-admin' : 'mcmc-officer',
      addedAt: new Date().toISOString().slice(0, 10),
      verifiedAt: null,
      deletedAt: null,
    };
    setSuppliers([next, ...suppliers]);
    setAddOpen(false);
    setToast({ type: 'success', msg: `Added ${values.name} (${next.id}) — no verification required.` });
  }

  function handleBulkImport(rows) {
    const start = suppliers.length;
    const added = rows.map((r, i) => ({
      id: 'SUP-0426-' + String(start + i + 1).padStart(5, '0'),
      name: r.name, brn: r.brn, category: r.category || 'A',
      since: new Date().toISOString().slice(0, 10),
      approvals: 0, active: true, address: r.address || '',
      pic: r.pic || '', picEmail: r.picEmail || '',
      addedBy: role === 'team-lead' ? 'mcmc-admin' : 'mcmc-officer',
      addedAt: new Date().toISOString().slice(0, 10),
      verifiedAt: null, deletedAt: null,
    }));
    setSuppliers([...added, ...suppliers]);
    setBulkOpen(false);
    setToast({ type: 'success', msg: `Bulk imported ${added.length} suppliers.` });
  }

  function handleRemove(s) {
    setSuppliers(suppliers.map(x => x.id === s.id ? { ...x, deletedAt: new Date().toISOString().slice(0, 10), active: false } : x));
    setConfirmRemove(null);
    setToast({ type: 'warning', msg: `${s.name} soft-deleted. Records preserved for audit.` });
  }

  function handleRestore(s) {
    setSuppliers(suppliers.map(x => x.id === s.id ? { ...x, deletedAt: null, active: true } : x));
    setToast({ type: 'success', msg: `${s.name} restored.` });
  }

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>{roleLabel} · {currentUser?.name}</div>
          <Typography.Title level={3} style={{ margin: '4px 0 0' }}>Suppliers Management</Typography.Title>
          <Typography.Text type="secondary">Master directory of registered suppliers. MCMC-added entries skip the 2-layer verification.</Typography.Text>
        </div>
        <Space>
          <Button icon={<UploadOutlined />} onClick={() => setBulkOpen(true)}>Bulk import</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>Add supplier</Button>
        </Space>
      </div>

      {toast && (
        <Alert
          type={toast.type}
          message={toast.msg}
          showIcon closable
          afterClose={() => setToast(null)}
          style={{ marginBottom: 16 }}
        />
      )}

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {[
          { l: 'Total registered', v: counts.all, d: `Across categories A, B, C, D` },
          { l: 'Active', v: counts.active, d: 'Visible to suppliers + officers', color: 'var(--color-success)' },
          { l: 'Soft-deleted', v: counts.deleted, d: 'Records retained for audit', color: 'var(--color-warning)' },
          { l: 'MCMC-added (this year)', v: suppliers.filter(s => (s.addedBy || '').startsWith('mcmc-') && s.addedAt >= '2026-01-01').length, d: 'No verification required' },
        ].map((k, i) => (
          <Col xs={12} md={6} key={i}>
            <div className="kpi-card">
              <div className="kpi-label">{k.l}</div>
              <div className="kpi-value" style={{ color: k.color }}>{k.v}</div>
              <div className="kpi-delta">{k.d}</div>
            </div>
          </Col>
        ))}
      </Row>

      <Card bordered>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Segmented
            value={filter}
            onChange={setFilter}
            options={[
              { label: `Active (${counts.active})`, value: 'active' },
              { label: `Soft-deleted (${counts.deleted})`, value: 'deleted' },
              { label: `All (${counts.all})`, value: 'all' },
            ]}
          />
          <Input
            placeholder="Search name, BRN, or supplier ID…"
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 240, maxWidth: 480 }}
            allowClear
          />
        </div>
        <Table
          rowKey="id"
          dataSource={list}
          pagination={{ pageSize: 8 }}
          columns={[
            { title: 'Supplier ID', dataIndex: 'id', render: v => <Typography.Text code style={{ fontSize: 12 }}>{v}</Typography.Text> },
            { title: 'Name', dataIndex: 'name', render: (v, r) => <span style={{ fontWeight: 600, color: r.deletedAt ? 'var(--color-text-muted)' : 'inherit', textDecoration: r.deletedAt ? 'line-through' : 'none' }}>{v}</span> },
            { title: 'BRN', dataIndex: 'brn' },
            { title: 'Category', dataIndex: 'category', render: c => <Tag color={c === 'A' ? 'blue' : c === 'B' ? 'green' : c === 'C' ? 'purple' : 'default'}>Cat {c}</Tag> },
            { title: 'PIC', dataIndex: 'pic', render: (v, r) => v ? <div style={{ fontSize: 12 }}><div>{v}</div><div style={{ color: 'var(--color-text-muted)' }}>{r.picEmail}</div></div> : '—' },
            { title: 'Approvals', dataIndex: 'approvals', align: 'right' },
            { title: 'Added by', dataIndex: 'addedBy', render: v => v === 'self-registration' ? <Tag>Self</Tag> : v === 'mcmc-admin' ? <Tag color="blue" icon={<CrownOutlined />}>Admin</Tag> : <Tag color="cyan" icon={<UserOutlined />}>Officer</Tag> },
            { title: 'Verified', dataIndex: 'verifiedAt', render: v => v ? <Tag color="green" icon={<CheckCircleOutlined />}>{v}</Tag> : <Tag color="orange">No verification</Tag> },
            {
              title: 'Action',
              key: 'action',
              render: (_, r) => r.deletedAt
                ? <Button size="small" type="link" onClick={() => handleRestore(r)}>Restore</Button>
                : <Button size="small" type="link" danger icon={<DeleteOutlined />} onClick={() => setConfirmRemove(r)}>Remove</Button>,
            },
          ]}
        />
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-text-muted)' }}>
          Showing {list.length} of {counts.all} suppliers · Soft-deleted entries are hidden from suppliers but kept for audit trail.
        </div>
      </Card>

      {/* Add supplier modal — admin/officer flow, no verification */}
      <Modal
        title={<Space><PlusOutlined /> Add supplier (no verification)</Space>}
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        footer={null}
        width={560}
      >
        <Alert
          type="info"
          showIcon
          message="MCMC-added suppliers skip the 2-layer verification flow"
          description="As an authorised MCMC user, your registration is treated as already verified. The supplier can immediately submit applications."
          style={{ marginBottom: 16 }}
        />
        <Form layout="vertical" onFinish={handleAdd}>
          <Row gutter={12}>
            <Col span={16}><Form.Item label="Company name" name="name" rules={[{ required: true }]}><Input placeholder="e.g. Acme Communications Sdn Bhd" /></Form.Item></Col>
            <Col span={8}><Form.Item label="Category" name="category" initialValue="A" rules={[{ required: true }]}>
              <Select options={[
                { value: 'A', label: 'Cat A — Company' },
                { value: 'B', label: 'Cat B — Individual' },
                { value: 'C', label: 'Cat C — Institution' },
              ]} />
            </Form.Item></Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}><Form.Item label="BRN (SSM number)" name="brn" rules={[{ required: true }]}><Input placeholder="e.g. 201901023456" /></Form.Item></Col>
            <Col span={12}><Form.Item label="Address" name="address"><Input placeholder="Registered address" /></Form.Item></Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}><Form.Item label="Person in charge" name="pic" rules={[{ required: true }]}><Input placeholder="Full name" /></Form.Item></Col>
            <Col span={12}><Form.Item label="PIC email" name="picEmail" rules={[{ required: true, type: 'email' }]}><Input placeholder="pic@company.com.my" /></Form.Item></Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <Button onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>Add supplier</Button>
          </div>
        </Form>
      </Modal>

      {/* Bulk import modal */}
      <Modal
        title={<Space><UploadOutlined /> Bulk import suppliers (CSV)</Space>}
        open={bulkOpen}
        onCancel={() => setBulkOpen(false)}
        footer={null}
        width={560}
      >
        <Alert
          type="info"
          showIcon
          message="CSV format: name,brn,category,address,pic,picEmail"
          description="Each row creates a supplier with no verification. Duplicate BRNs are merged into the existing record."
          style={{ marginBottom: 16 }}
        />
        <Upload.Dragger
          accept=".csv"
          showUploadList={false}
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const lines = String(e.target.result).split('\n').filter(Boolean).slice(1);
              const rows = lines.map(line => {
                const [name, brn, category, address, pic, picEmail] = line.split(',').map(c => (c || '').trim());
                return { name, brn, category, address, pic, picEmail };
              }).filter(r => r.name && r.brn);
              if (rows.length === 0) {
                setToast({ type: 'error', msg: 'No valid rows found in the CSV.' });
                setBulkOpen(false);
              } else {
                handleBulkImport(rows);
              }
            };
            reader.readAsText(file);
            return false;
          }}
        >
          <p style={{ fontSize: 32, margin: 0 }}><UploadOutlined /></p>
          <p style={{ margin: '8px 0' }}>Click or drag CSV file here</p>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Maximum 500 rows per upload</p>
        </Upload.Dragger>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--color-bg-subtle)', borderRadius: 6, fontSize: 12 }}>
          <strong>Sample row:</strong><br/>
          <code>Acme Comms Sdn Bhd,201901023456,A,"Level 5, Wisma Acme",Ali bin Abu,ali.abu@acme.my</code>
        </div>
      </Modal>

      {/* Confirm soft-delete */}
      <Modal
        title={<Space style={{ color: 'var(--color-warning)' }}><WarningOutlined /> Soft-delete supplier?</Space>}
        open={!!confirmRemove}
        onCancel={() => setConfirmRemove(null)}
        onOk={() => handleRemove(confirmRemove)}
        okText="Soft-delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        width={460}
      >
        {confirmRemove && (
          <div>
            <p>The supplier <strong>{confirmRemove.name}</strong> ({confirmRemove.id}) will be hidden from the active directory but their records — applications, certificates, payments — will be preserved for audit.</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>This action can be reversed by toggling the <em>Soft-deleted</em> filter and clicking Restore.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

Object.assign(window, { SCREENS });
