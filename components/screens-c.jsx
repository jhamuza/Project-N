// Supplier screens: Certificates, Payments, Profile & Settings
const {
  DashboardOutlined, UnorderedListOutlined, PlusOutlined, StarOutlined, TeamOutlined,
  SafetyCertificateOutlined, DollarOutlined, FlagOutlined, EyeOutlined, FileSearchOutlined,
  BarChartOutlined, AuditOutlined, BellOutlined, MenuOutlined, SearchOutlined, UserOutlined,
  SettingOutlined, LogoutOutlined, QuestionCircleOutlined, GlobalOutlined, RobotOutlined,
  FileTextOutlined, FilePdfOutlined, FileImageOutlined, CheckCircleOutlined, ClockCircleOutlined,
  WarningOutlined, CloseCircleOutlined, InfoCircleOutlined, DownloadOutlined, UploadOutlined,
  EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, LockOutlined, ShopOutlined,
  CreditCardOutlined, BankOutlined, QrcodeOutlined, ArrowLeftOutlined, ArrowRightOutlined,
  SendOutlined, PaperClipOutlined, ReloadOutlined, IdcardOutlined, ExclamationCircleOutlined,
  LeftOutlined, RightOutlined, PlusCircleOutlined, MoreOutlined, HistoryOutlined, KeyOutlined,
  ApartmentOutlined, ContainerOutlined, WalletOutlined, RiseOutlined, SafetyOutlined,
  CopyOutlined, PrinterOutlined, ScanOutlined, CheckOutlined, CaretDownOutlined,
  CalendarOutlined
} = window.icons;

// ============ CERTIFICATES ============
SCREENS.certificates = function Certificates({ nav }) {
  const [filter, setFilter] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  const certs = MOCK.certificates;
  const filtered = certs
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c => !q || (c.product + c.rcn + c.model + c.brand).toLowerCase().includes(q.toLowerCase()));

  const statusTag = (s) => {
    if (s === 'active') return <antd.Tag color="green" icon={<CheckCircleOutlined />}>Active</antd.Tag>;
    if (s === 'expiring') return <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Expiring Soon</antd.Tag>;
    return <antd.Tag color="default" icon={<CloseCircleOutlined />}>Expired</antd.Tag>;
  };

  const kpis = [
    { l: 'Active Certificates', v: certs.filter(c => c.status === 'active').length, icon: <SafetyCertificateOutlined />, color: 'var(--color-success)' },
    { l: 'Expiring in 90 days', v: certs.filter(c => c.status === 'expiring').length, icon: <ClockCircleOutlined />, color: 'var(--color-warning)', warn: true },
    { l: 'Expired', v: certs.filter(c => c.status === 'expired').length, icon: <CloseCircleOutlined />, color: 'var(--color-text-muted)' },
    { l: 'Total Issued', v: certs.length, icon: <ContainerOutlined />, color: 'var(--color-primary)' },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Certificates</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>My Certificates</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Registered Compliance Numbers (RCN) · Label registry · Renewal</antd.Typography.Text>
        </div>
        <antd.Space>
          <antd.Button icon={<ScanOutlined />}>Scan RCN</antd.Button>
          <antd.Button icon={<DownloadOutlined />}>Export CSV</antd.Button>
        </antd.Space>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="kpi-label">{k.l}</div>
                  <div className="kpi-value" style={{ color: k.warn ? 'var(--color-warning)' : 'inherit' }}>{k.v}</div>
                </div>
                <div style={{ fontSize: 20, color: k.color }}>{k.icon}</div>
              </div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
          <antd.Segmented
            value={filter}
            onChange={setFilter}
            options={[
              { label: `All (${certs.length})`, value: 'all' },
              { label: `Active (${certs.filter(c => c.status === 'active').length})`, value: 'active' },
              { label: `Expiring (${certs.filter(c => c.status === 'expiring').length})`, value: 'expiring' },
              { label: `Expired (${certs.filter(c => c.status === 'expired').length})`, value: 'expired' },
            ]}
          />
          <antd.Input placeholder="Search RCN, product, brand, model…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />} style={{ width: 320 }} value={q} onChange={e => setQ(e.target.value)} />
        </div>

        <antd.Table
          rowKey="rcn"
          dataSource={filtered}
          pagination={false}
          scroll={{ x: 'max-content' }}
          onRow={(r) => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })}
          columns={[
            { title: 'RCN',     dataIndex: 'rcn',       width: 160, render: v => <antd.Typography.Text code style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
            { title: 'Scheme',  dataIndex: 'scheme',    width: 90,  render: s => <SchemeBadge scheme={s} /> },
            { title: 'Product', width: 220, render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div></div> },
            { title: 'Label',   dataIndex: 'labelType', width: 90,  render: v => <antd.Tag>{v === 'e-label' ? 'e-Label' : 'Physical'}</antd.Tag> },
            { title: 'Issued',  dataIndex: 'issued',    width: 120, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span> },
            { title: 'Expires', dataIndex: 'expires',   width: 120, render: (v, r) => (
              <span style={{ color: r.status === 'expiring' ? 'var(--color-warning)' : r.status === 'expired' ? 'var(--color-danger)' : 'inherit', fontWeight: r.status !== 'active' ? 600 : 400, whiteSpace: 'nowrap' }}>
                {new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            ) },
            { title: 'Status',  dataIndex: 'status',   width: 110, render: statusTag },
            { title: '',        width: 110, render: (_, r) => (
              <antd.Space onClick={e => e.stopPropagation()}>
                <antd.Tooltip title="Download Certificate PDF"><antd.Button size="small" icon={<DownloadOutlined />} onClick={() => { setSelected(r); }} /></antd.Tooltip>
                {r.status === 'expiring' && <antd.Button size="small" type="primary" onClick={() => nav('cert-renewal')}>Renew</antd.Button>}
              </antd.Space>
            ) },
          ]}
        />
      </antd.Card>

      <antd.Drawer open={!!selected} onClose={() => setSelected(null)} width={560} title={selected?.product}>
        {selected && <CertificateDetail cert={selected} nav={nav} />}
      </antd.Drawer>
    </div>
  );
};

function CertificateDetail({ cert, nav }) {
  function downloadCertPdf() {
    const lines = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  MALAYSIAN COMMUNICATIONS AND MULTIMEDIA COMMISSION (MCMC)  ║',
      '║         CERTIFICATE OF REGISTERED COMPLIANCE (RCN)          ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      `  Registered Compliance Number : ${cert.rcn}`,
      `  Product Name                 : ${cert.product}`,
      `  Brand                        : ${cert.brand}`,
      `  Model Number                 : ${cert.model}`,
      `  Registration Scheme          : Scheme ${cert.scheme}`,
      `  Label Type                   : ${cert.labelType === 'e-label' ? 'Electronic (e-Label)' : 'Physical Sticker'}`,
      '',
      `  Issue Date                   : ${new Date(cert.issued).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}`,
      `  Expiry Date                  : ${new Date(cert.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}`,
      `  Status                       : ${cert.status === 'active' ? 'ACTIVE' : cert.status === 'expiring' ? 'EXPIRING SOON' : 'EXPIRED'}`,
      '',
      '  Issuing Authority            : Consumer & Product Permit Group (CPPG)',
      '  Issuing Officer              : En. Faisal Rahman',
      '',
      '──────────────────────────────────────────────────────────────',
      '  This certificate confirms that the above equipment has been',
      '  registered in accordance with the New Communications Equipment',
      '  Framework (NCEF) under the Communications and Multimedia',
      '  Act 1998 (Act 588).',
      '',
      '  Verify online: ncef.mcmc.gov.my/verify/' + cert.rcn,
      '──────────────────────────────────────────────────────────────',
      '  © Malaysian Communications and Multimedia Commission (MCMC)',
      '  MCMC Tower 1, Jalan Impact, Cyber 6, 63000 Cyberjaya, Selangor',
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `NCEF-Certificate-${cert.rcn}.txt`;
    a.click();
    antd.message.success('Certificate downloaded');
  }

  function downloadLabel() {
    const lines = [
      '┌──────────────────────────────────────┐',
      '│           NCEF MCMC LABEL            │',
      `│  ${cert.rcn.padEnd(36)}│`,
      `│  ${cert.brand.padEnd(20)}${('Sch ' + cert.scheme).padEnd(16)}│`,
      `│  ${cert.model.substring(0, 36).padEnd(36)}│`,
      `│  Exp: ${new Date(cert.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).padEnd(29)}│`,
      '│  [QR]  Scan to verify at mcmc.gov.my │',
      '└──────────────────────────────────────┘',
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `NCEF-Label-${cert.rcn}.txt`;
    a.click();
    antd.message.success('Label template downloaded');
  }

  return (
    <div>
      <antd.Card bordered style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', color: '#fff', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, opacity: .8, textTransform: 'uppercase', letterSpacing: .5, fontWeight: 600 }}>Registered Compliance Number</div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{cert.rcn}</div>
            <div style={{ fontSize: 13, marginTop: 10 }}>{cert.product}</div>
            <div style={{ fontSize: 11, opacity: .8 }}>{cert.brand} · {cert.model}</div>
          </div>
          <div style={{ background: '#fff', padding: 8, borderRadius: 8 }}>
            {/* QR placeholder */}
            <div style={{ width: 96, height: 96, background: `conic-gradient(#000 0 25%, transparent 25% 50%, #000 50% 75%, transparent 75%), repeating-linear-gradient(90deg, #000 0 4px, #fff 4px 8px), repeating-linear-gradient(0deg, #000 0 4px, #fff 4px 8px)`, backgroundBlendMode: 'multiply', border: '4px solid #fff' }} />
          </div>
        </div>
        <antd.Divider style={{ borderColor: 'rgba(255,255,255,.3)', margin: '16px 0' }} />
        <antd.Row gutter={16}>
          <antd.Col span={12}>
            <div style={{ fontSize: 10, opacity: .8, textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Issued</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{new Date(cert.issued).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </antd.Col>
          <antd.Col span={12}>
            <div style={{ fontSize: 10, opacity: .8, textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Expires</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{new Date(cert.expires).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </antd.Col>
        </antd.Row>
      </antd.Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
        <antd.Button icon={<DownloadOutlined />} block onClick={downloadCertPdf}>Download Certificate</antd.Button>
        <antd.Button icon={<PrinterOutlined />} block onClick={downloadLabel}>Print Label</antd.Button>
      </div>

      <antd.Divider orientation="left" orientationMargin={0} style={{ fontSize: 13 }}>Details</antd.Divider>
      <antd.Descriptions bordered column={1} size="small" items={[
        { key: '1', label: 'Application ID', children: <antd.Typography.Text code>{cert.app}</antd.Typography.Text> },
        { key: '2', label: 'Scheme', children: <SchemeBadge scheme={cert.scheme} /> },
        { key: '3', label: 'Product Category', children: 'Mobile Phone / Smartphone' },
        { key: '4', label: 'Frequency Band', children: '2400–2483.5 MHz; 5150–5850 MHz' },
        { key: '5', label: 'Max Output Power', children: '26 dBm' },
        { key: '6', label: 'Label Type', children: cert.labelType === 'e-label' ? 'Electronic (e-Label)' : 'Physical sticker' },
        { key: '7', label: 'Issuing Officer', children: 'En. Faisal Rahman (CPPG)' },
      ]} />

      <antd.Divider orientation="left" orientationMargin={0} style={{ fontSize: 13 }}>Label Registry</antd.Divider>
      <antd.Alert type="info" showIcon icon={<InfoCircleOutlined />} message="IMEI / Serial Registration" description="You must register device serials / IMEIs against this certificate before distribution." />
      <div style={{ marginTop: 12 }}>
        <antd.Button block icon={<PlusOutlined />} onClick={() => nav && nav('imei-register')}>Register IMEI / Serial Numbers</antd.Button>
      </div>

      {cert.status === 'expiring' && (
        <>
          <antd.Divider orientation="left" orientationMargin={0} style={{ fontSize: 13 }}>Renewal</antd.Divider>
          <antd.Alert type="warning" showIcon message={`Certificate expires in ${Math.ceil((new Date(cert.expires) - new Date('2026-04-19')) / 864e5)} days`} description="Start renewal early to avoid supply disruption. Eligible documents from the original submission will be reused." />
          <div style={{ marginTop: 12 }}>
            <antd.Button type="primary" block icon={<ReloadOutlined />} onClick={() => nav && nav('cert-renewal')}>Start Renewal</antd.Button>
          </div>
        </>
      )}
    </div>
  );
}

// ============ PAYMENTS ============
SCREENS.payments = function Payments({ nav, currentUser }) {
  const cu = currentUser || MOCK.profiles.supplier;
  const pays = MOCK.payments;
  const totalPaid = pays.filter(p => p.status === 'paid').reduce((a, b) => a + b.amount, 0);
  const pending = pays.filter(p => p.status === 'pending').reduce((a, b) => a + b.amount, 0);
  const [selectedPay, setSelectedPay] = React.useState(null);

  const methodIcon = (m) => {
    if (m.startsWith('FPX')) return <BankOutlined />;
    if (m.startsWith('Card')) return <CreditCardOutlined />;
    if (m.startsWith('DuitNow')) return <QrcodeOutlined />;
    if (m.startsWith('Corporate')) return <FileTextOutlined />;
    return <WalletOutlined />;
  };

  function downloadReceipt(p) {
    const lines = [
      'MCMC NCEF PORTAL — OFFICIAL RECEIPT',
      '=====================================',
      `Receipt No  : ${p.id}`,
      `Date        : ${new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}`,
      `Application : ${p.app}`,
      `Payer       : ${cu.company || 'Axiata Digital Sdn Bhd'} (${cu.supplierId || 'SUP-0426-00142'})`,
      `Method      : ${p.method}`,
      '',
      'ITEM                              AMOUNT',
      '----------------------------------------',
      `NCEF Registration Fee             RM ${p.amount.toLocaleString('en-MY')}.00`,
      '----------------------------------------',
      `TOTAL PAID                        RM ${p.amount.toLocaleString('en-MY')}.00`,
      '',
      'SST: Exempt (Government service fee)',
      '',
      p.status === 'paid' ? '*** PAYMENT RECEIVED — OFFICIAL RECEIPT ***' : '*** PAYMENT PENDING ***',
      '',
      'Malaysian Communications and Multimedia Commission (MCMC)',
      'MCMC Tower 1, Jalan Impact, Cyber 6, 63000 Cyberjaya, Selangor',
      'Tel: +603-8688 8000  |  ncef@mcmc.gov.my  |  www.mcmc.gov.my',
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `MCMC-Receipt-${p.id}.txt`;
    a.click();
    antd.message.success('Receipt downloaded');
  }

  function exportCsv() {
    const header = ['Date', 'Payment ID', 'Application', 'Method', 'Amount (RM)', 'Status'];
    const rows = pays.map(p => [
      new Date(p.date).toLocaleDateString('en-GB'),
      p.id, p.app, p.method,
      p.amount.toFixed(2),
      p.status === 'paid' ? 'Paid' : 'Pending',
    ]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ncef-payments.csv';
    a.click();
    antd.message.success('CSV exported');
  }

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Payments</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Payments & Invoices</antd.Typography.Title>
          <antd.Typography.Text type="secondary">All scheme fees, renewals and special approvals</antd.Typography.Text>
        </div>
        <antd.Space>
          <antd.Button icon={<DownloadOutlined />} onClick={exportCsv}>Export CSV</antd.Button>
          <antd.Button type="primary" icon={<PlusOutlined />}>New payment</antd.Button>
        </antd.Space>
      </div>

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { l: 'Paid this year', v: `RM ${totalPaid.toLocaleString('en-MY')}`, icon: <CheckCircleOutlined />, color: 'var(--color-success)' },
          { l: 'Outstanding', v: `RM ${pending.toLocaleString('en-MY')}`, icon: <ClockCircleOutlined />, color: 'var(--color-warning)', warn: pending > 0 },
          { l: 'Avg fee / application', v: `RM ${(totalPaid / pays.filter(p => p.status === 'paid').length).toFixed(0)}`, icon: <RiseOutlined />, color: 'var(--color-primary)' },
          { l: 'Corporate Invoice Line', v: 'RM 50,000', d: 'Limit remaining RM 38,200', icon: <BankOutlined />, color: 'var(--color-primary)' },
        ].map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="kpi-label">{k.l}</div>
                  <div className="kpi-value" style={{ color: k.warn ? 'var(--color-warning)' : 'inherit' }}>{k.v}</div>
                  {k.d && <div className="kpi-delta">{k.d}</div>}
                </div>
                <div style={{ fontSize: 20, color: k.color }}>{k.icon}</div>
              </div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Row gutter={[16, 16]}>
        <antd.Col xs={24} lg={16}>
          <antd.Card title="Transaction History" bordered extra={<antd.DatePicker.RangePicker size="small" />}>
            <antd.Table
              rowKey="id"
              dataSource={pays}
              pagination={false}
              scroll={{ x: 'max-content' }}
              onRow={r => ({ onClick: () => setSelectedPay(r), style: { cursor: 'pointer' } })}
              rowClassName={r => r.id === selectedPay?.id ? 'ant-table-row-selected' : ''}
              columns={[
                { title: 'Date',        dataIndex: 'date',   width: 120, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span> },
                { title: 'Payment ID',  dataIndex: 'id',     width: 150, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
                { title: 'Application', dataIndex: 'app',    width: 150, render: v => <antd.Typography.Text code style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
                { title: 'Method',      dataIndex: 'method', width: 160, render: v => <antd.Space size={6}>{methodIcon(v)}<span>{v}</span></antd.Space> },
                { title: 'Amount',      dataIndex: 'amount', width: 130, align: 'right', render: v => <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>RM {v.toLocaleString('en-MY')}.00</span> },
                { title: 'Status',      dataIndex: 'status', width: 100, render: s => s === 'paid' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Paid</antd.Tag> : <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Pending</antd.Tag> },
                { title: '',            width: 90,  render: (_, r) => <antd.Space onClick={e => e.stopPropagation()}><antd.Tooltip title="View invoice"><antd.Button size="small" icon={<EyeOutlined />} onClick={() => setSelectedPay(r)} /></antd.Tooltip><antd.Tooltip title="Download receipt"><antd.Button size="small" icon={<DownloadOutlined />} onClick={() => downloadReceipt(r)} /></antd.Tooltip></antd.Space> },
              ]}
            />
          </antd.Card>
        </antd.Col>
        <antd.Col xs={24} lg={8}>
          <antd.Card title="Payment Methods" bordered extra={<antd.Button type="link" size="small" icon={<PlusOutlined />}>Add</antd.Button>}>
            <antd.Space direction="vertical" style={{ width: '100%' }} size={10}>
              {[
                { icon: <CreditCardOutlined />, t: 'Visa •• 4521', d: 'Default · Expires 08/27', def: true },
                { icon: <BankOutlined />, t: 'Maybank FPX', d: 'Linked Jan 2024' },
                { icon: <FileTextOutlined />, t: 'Corporate Invoice', d: 'RM 50,000 credit line · 30 day terms' },
              ].map((m, i) => (
                <div key={i} style={{ padding: 12, border: '1px solid var(--color-border)', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--color-primary-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{m.t} {m.def && <antd.Tag color="blue" style={{ marginLeft: 6 }}>Default</antd.Tag>}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{m.d}</div>
                  </div>
                  <antd.Button type="text" size="small" icon={<MoreOutlined />} />
                </div>
              ))}
            </antd.Space>
          </antd.Card>
          <antd.Card title="Billing Information" bordered style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {cu.role === 'supplier' ? (
                <>
                  <div style={{ fontWeight: 600 }}>Axiata Digital Sdn Bhd</div>
                  <div style={{ color: 'var(--color-text-secondary)' }}>Level 21, Axiata Tower<br />No. 9 Jalan Stesen Sentral 5<br />KL Sentral, 50470 Kuala Lumpur</div>
                  <antd.Divider style={{ margin: '12px 0' }} />
                  <div><antd.Typography.Text type="secondary">SST Number </antd.Typography.Text>W10-1808-32000123</div>
                  <div><antd.Typography.Text type="secondary">Billing Email </antd.Typography.Text>finance@axiatadigital.com.my</div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 600 }}>Malaysian Communications and Multimedia Commission (MCMC)</div>
                  <div style={{ color: 'var(--color-text-secondary)' }}>MCMC Tower 1, Jalan Impact, Cyber 6<br />63000 Cyberjaya, Selangor</div>
                  <antd.Divider style={{ margin: '12px 0' }} />
                  <div><antd.Typography.Text type="secondary">Cost Centre </antd.Typography.Text>CPPG-CPQ-2026</div>
                  <div><antd.Typography.Text type="secondary">Finance Email </antd.Typography.Text>finance@mcmc.gov.my</div>
                </>
              )}
            </div>
            <antd.Button type="link" icon={<EditOutlined />} style={{ padding: 0, marginTop: 8 }}>Edit</antd.Button>
          </antd.Card>

        </antd.Col>
      </antd.Row>

      {/* Invoice / Receipt drawer */}
      <antd.Drawer
        open={!!selectedPay}
        onClose={() => setSelectedPay(null)}
        width={520}
        title={<antd.Space><FilePdfOutlined />{selectedPay?.id}</antd.Space>}
        extra={<antd.Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadReceipt(selectedPay)}>Download Receipt</antd.Button>}
      >
        {selectedPay && (() => {
          const p = selectedPay;
          const isPaid = p.status === 'paid';
          return (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              {/* MCMC letterhead */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0 20px', borderBottom: '2px solid var(--color-primary)' }}>
                <img src="assets/mcmc-logo.png" alt="MCMC" style={{ width: 48, height: 48, background: 'var(--color-primary)', borderRadius: 6, padding: 4 }} onError={e => { e.target.style.display='none'; }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--color-primary)' }}>Malaysian Communications and Multimedia Commission</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--color-text-muted)' }}>Suruhanjaya Komunikasi dan Multimedia Malaysia · NCEF Portal</div>
                </div>
              </div>

              {/* PAID stamp */}
              {isPaid && (
                <div style={{ position: 'absolute', top: 120, right: 40, transform: 'rotate(-20deg)', fontSize: 36, fontWeight: 900, color: 'rgba(22,163,74,0.18)', border: '4px solid rgba(22,163,74,0.18)', padding: '4px 12px', borderRadius: 4, letterSpacing: 6, pointerEvents: 'none', userSelect: 'none' }}>PAID</div>
              )}

              <div style={{ marginTop: 20, marginBottom: 16 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {isPaid ? 'Official Receipt' : 'Invoice (Pending)'}
                </div>
              </div>

              {/* Header fields */}
              {[
                ['Receipt No.',   p.id],
                ['Date',          new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })],
                ['Application',   p.app],
                ['Payer',         `${cu.company || 'Axiata Digital Sdn Bhd'}`],
                ['Supplier ID',   cu.supplierId || 'SUP-0426-00142'],
                ['Payment Method',p.method],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ width: 130, color: 'var(--color-text-muted)', flexShrink: 0 }}>{k}</span>
                  <span>: {v}</span>
                </div>
              ))}

              {/* Line items */}
              <div style={{ marginTop: 20, borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: 8 }}>
                  <span>Description</span><span>Amount</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>NCEF Registration / Renewal Fee</span>
                  <span>RM {p.amount.toLocaleString('en-MY')}.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>SST</span>
                  <span>Exempt</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 14, marginTop: 12, padding: '0 0 12px' }}>
                <span>Total {isPaid ? 'Paid' : 'Due'}</span>
                <span style={{ color: isPaid ? 'var(--color-success)' : 'var(--color-warning)' }}>RM {p.amount.toLocaleString('en-MY')}.00</span>
              </div>

              {isPaid && (
                <antd.Alert type="success" showIcon icon={<CheckCircleOutlined />} style={{ marginTop: 8 }} message="Payment received and verified by MCMC" description={`Transaction confirmed on ${new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} via ${p.method}.`} />
              )}
              {!isPaid && (
                <antd.Alert type="warning" showIcon style={{ marginTop: 8 }} message="Payment pending" description="Complete payment via MCMC Pay portal. Invoice expires in 7 days." />
              )}

              <div style={{ marginTop: 24, padding: '12px 0', borderTop: '1px solid var(--color-border)', fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', lineHeight: 1.6 }}>
                MCMC Tower 1, Jalan Impact, Cyber 6, 63000 Cyberjaya, Selangor, Malaysia<br />
                Tel: +603-8688 8000 · ncef@mcmc.gov.my · www.mcmc.gov.my<br />
                This is a computer-generated receipt. No signature is required.
              </div>
            </div>
          );
        })()}
      </antd.Drawer>
    </div>
  );
};

// ============ PROFILE & SETTINGS ============
SCREENS.profile = function Profile({ nav, currentUser, tweaks }) {
  const cu = currentUser || MOCK.profiles.supplier;
  const isSupplier = cu.role === 'supplier';
  const graceMode = tweaks?.graceMode;
  const [tab, setTab] = React.useState('profile');
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const tabs = [
    { k: 'profile',      t: 'My Profile',       icon: <UserOutlined /> },
    { k: 'organization', t: isSupplier ? 'Organisation' : 'MCMC Department', icon: <ShopOutlined /> },
    ...(isSupplier ? [{ k: 'team', t: 'Team Members', icon: <TeamOutlined /> }] : []),
    { k: 'security',      t: 'Security & Access',  icon: <SafetyOutlined /> },
    { k: 'notifications', t: 'Notifications',       icon: <BellOutlined /> },
    ...(isSupplier ? [{ k: 'api', t: 'API & Integrations', icon: <ApartmentOutlined /> }] : []),
    ...(isSupplier ? [{ k: 'principals', t: 'Principals', icon: <IdcardOutlined /> }] : []),
    ...(!isSupplier ? [{ k: 'calendar', t: 'Calendar Blocking', icon: <CalendarOutlined /> }] : []),
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Settings</div>
        <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Profile & Settings</antd.Typography.Title>
      </div>

      <antd.Row gutter={24}>
        <antd.Col xs={24} md={6}>
          <antd.Card bordered bodyStyle={{ padding: 8 }}>
            <antd.Menu
              mode="inline"
              selectedKeys={[tab]}
              onClick={e => setTab(e.key)}
              style={{ border: 'none' }}
              items={tabs.map(t => ({ key: t.k, icon: t.icon, label: t.t }))}
            />
          </antd.Card>
        </antd.Col>
        <antd.Col xs={24} md={18}>
          {tab === 'profile' && <ProfileTab cu={cu} graceMode={graceMode} />}
          {tab === 'organization' && <OrgTab cu={cu} />}
          {tab === 'team' && isSupplier && <TeamTab onInvite={() => setInviteOpen(true)} />}
          {tab === 'security' && <SecurityTab />}
          {tab === 'notifications' && <NotifTab />}
          {tab === 'api' && isSupplier && <ApiTab />}
          {tab === 'principals' && isSupplier && <PrincipalsTab />}
          {tab === 'calendar' && !isSupplier && <CalendarTab cu={cu} />}
        </antd.Col>
      </antd.Row>

      <InviteDrawer open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
};

function ProfileTab({ cu, graceMode }) {
  const isSupplier = cu.role === 'supplier';
  const roleAccentColor = { supplier: 'var(--color-primary)', 'team-lead': '#7B3FA0', officer: '#0F6ABF', recommender: '#2E7D32', verifier: '#E65100', approver: '#B71C1C' };
  const accentColor = roleAccentColor[cu.role] || 'var(--color-primary)';
  const roleTagColor = { supplier: 'blue', 'team-lead': 'purple', officer: 'blue', recommender: 'green', verifier: 'orange', approver: 'red' };

  const accountStatusNode = isSupplier
    ? (graceMode
        ? <span><antd.Tag color="orange" style={{ marginRight: 6 }}>Grace Period</antd.Tag><antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>Expires 05 Jul 2026 — renew to resume new applications</antd.Typography.Text></span>
        : <antd.Tag color="green" icon={<CheckCircleOutlined />}>Active</antd.Tag>)
    : null;

  const supplierDescItems = [
    { key: '1', label: 'Full Name', children: cu.name },
    { key: '2', label: 'Email', children: <span><MailOutlined style={{ marginRight: 6 }} />{cu.email}</span> },
    { key: '3', label: 'Phone', children: <span><PhoneOutlined style={{ marginRight: 6 }} />+60 12-345 6789</span> },
    { key: '4', label: 'NRIC', children: '880512-14-5678' },
    { key: '5', label: 'Position', children: 'Head of Regulatory Compliance' },
    { key: '6', label: 'Department', children: 'Product Certification' },
    { key: '7', label: 'Account Status', children: accountStatusNode },
    { key: '8', label: 'Language', children: 'English (primary) · Bahasa Malaysia' },
    { key: '9', label: 'Time Zone', children: 'Asia/Kuala_Lumpur (GMT+8)' },
  ];
  const mcmcDescItems = [
    { key: '1', label: 'Full Name', children: cu.name },
    { key: '2', label: 'Email', children: <span><MailOutlined style={{ marginRight: 6 }} />{cu.email}</span> },
    { key: '3', label: 'Phone', children: <span><PhoneOutlined style={{ marginRight: 6 }} />{cu.phone || '+603-8688 8000'}</span> },
    { key: '4', label: 'Officer ID', children: <antd.Typography.Text code>{cu.id}</antd.Typography.Text> },
    { key: '5', label: 'Grade', children: cu.grade || '—' },
    { key: '6', label: 'Division', children: cu.division || 'Consumer & Product Permit Group (CPPG)' },
    { key: '7', label: 'Department', children: cu.department || '—' },
    { key: '8', label: 'Organisation', children: 'Malaysian Communications and Multimedia Commission (MCMC)' },
    { key: '9', label: 'Language', children: 'Bahasa Malaysia (primary) · English' },
    { key: '10', label: 'Time Zone', children: 'Asia/Kuala_Lumpur (GMT+8)' },
  ];

  return (
    <antd.Card title="My Profile" bordered extra={<antd.Button icon={<EditOutlined />}>Edit</antd.Button>}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
        <antd.Avatar size={72} style={{ background: accentColor, fontSize: 28, fontWeight: 700 }}>{cu.initials}</antd.Avatar>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{cu.name}</div>
          <antd.Space size={8} style={{ marginTop: 4 }}>
            <antd.Tag color={roleTagColor[cu.role] || 'blue'} icon={<SafetyOutlined />}>{cu.title}</antd.Tag>
            <antd.Tag icon={<CheckCircleOutlined />} color="green">Verified</antd.Tag>
            {graceMode && <antd.Tag color="orange">Grace Period</antd.Tag>}
          </antd.Space>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>
            {isSupplier ? 'Member since 15 Jan 2024' : `${cu.org || 'MCMC'}`} · Last login 2 hours ago from Kuala Lumpur
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <antd.Button icon={<UploadOutlined />}>Change avatar</antd.Button>
        </div>
      </div>
      <antd.Descriptions bordered column={2} size="middle" items={isSupplier ? supplierDescItems : mcmcDescItems} />
    </antd.Card>
  );
}

function OrgTab({ cu }) {
  const isSupplier = cu.role === 'supplier';

  if (!isSupplier) {
    // MCMC officer — show department/division card
    return (
      <antd.Card title="MCMC Department" bordered>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0 20px', borderBottom: '1px solid var(--color-divider)', marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 700, fontSize: 18, textAlign: 'center', lineHeight: 1.2 }}>MCMC</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Malaysian Communications and Multimedia Commission</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Suruhanjaya Komunikasi dan Multimedia Malaysia</div>
            <antd.Space style={{ marginTop: 6 }}>
              <antd.Tag color="blue">{cu.division || 'Consumer & Product Permit Group (CPPG)'}</antd.Tag>
              <antd.Tag icon={<CheckCircleOutlined />} color="green">Government Agency</antd.Tag>
            </antd.Space>
          </div>
        </div>
        <antd.Descriptions bordered column={2} size="middle" items={[
          { key: '1', label: 'Organisation',     children: 'Malaysian Communications and Multimedia Commission (MCMC)' },
          { key: '2', label: 'Division',          children: cu.division || 'Consumer & Product Permit Group (CPPG)' },
          { key: '3', label: 'Department',        children: cu.department || '—' },
          { key: '4', label: 'Officer Grade',     children: cu.grade || '—' },
          { key: '5', label: 'Team',              children: cu.team || '—' },
          { key: '6', label: 'Direct Line',       children: cu.phone || '+603-8688 8000' },
          { key: '7', label: 'HQ Address', span: 2, children: 'MCMC Tower 1, Jalan Impact, Cyber 6, 63000 Cyberjaya, Selangor' },
          { key: '8', label: 'General Email',     children: 'ncef@mcmc.gov.my' },
          { key: '9', label: 'Website',           children: <a href="#" target="_blank">www.mcmc.gov.my</a> },
        ]} />
        <antd.Divider orientation="left" orientationMargin={0}>Official References</antd.Divider>
        <antd.List
          size="small"
          dataSource={[
            { f: 'NCEF_Officer_Appointment_Letter.pdf', t: 'Appointment Letter', s: '0.6 MB', v: true },
            { f: 'MCMC_Authority_Card.pdf',             t: 'Authority Card (Kad Kuasa)', s: '0.3 MB', v: true },
          ]}
          renderItem={d => (
            <antd.List.Item actions={[<antd.Button size="small" icon={<DownloadOutlined />} />]}>
              <antd.List.Item.Meta
                avatar={<FilePdfOutlined style={{ fontSize: 20, color: 'var(--color-danger)' }} />}
                title={<antd.Space>{d.t}{d.v && <antd.Tag color="green" style={{ fontSize: 10 }}>Verified</antd.Tag>}</antd.Space>}
                description={<antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>{d.f} · {d.s}</antd.Typography.Text>}
              />
            </antd.List.Item>
          )}
        />
      </antd.Card>
    );
  }

  return (
    <antd.Card title="Organisation" bordered extra={<antd.Button icon={<EditOutlined />}>Edit</antd.Button>}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0 20px', borderBottom: '1px solid var(--color-divider)', marginBottom: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 700, fontSize: 22 }}>AD</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Axiata Digital Sdn Bhd</div>
          <antd.Space>
            <antd.Tag color="red">Category A · Company</antd.Tag>
            <antd.Tag icon={<CheckCircleOutlined />} color="green">SSM Verified</antd.Tag>
            <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>Supplier ID <b>SUP-0426-00142</b></antd.Typography.Text>
          </antd.Space>
        </div>
      </div>
      <antd.Descriptions bordered column={2} size="middle" items={[
        { key: '1', label: 'Legal Name', children: 'Axiata Digital Sdn Bhd' },
        { key: '2', label: 'SSM BRN', children: '201901023456' },
        { key: '3', label: 'Registered Since', children: '14 Mar 2019' },
        { key: '4', label: 'Business Type', children: 'Telecommunications / Consumer Electronics' },
        { key: '5', label: 'Director', children: 'Tan Sri Dato\' Sri Jamaludin Ibrahim' },
        { key: '6', label: 'Paid-up Capital', children: 'RM 50,000,000' },
        { key: '7', label: 'Registered Address', span: 2, children: 'Level 21, Axiata Tower, No. 9 Jalan Stesen Sentral 5, KL Sentral, 50470 Kuala Lumpur' },
        { key: '8', label: 'Correspondence Email', children: 'compliance@axiatadigital.com.my' },
        { key: '9', label: 'Correspondence Phone', children: '+60 3-2263 8888' },
      ]} />
      <antd.Divider orientation="left" orientationMargin={0}>Compliance Documents</antd.Divider>
      <antd.List
        size="small"
        dataSource={[
          { f: 'SSM_Certificate_2026.pdf', t: 'Company Registration (SSM)', s: '2.1 MB', v: true },
          { f: 'Director_NRIC.pdf', t: 'Director ID', s: '0.4 MB', v: true },
          { f: 'SST_Registration.pdf', t: 'SST Registration', s: '0.8 MB', v: true },
        ]}
        renderItem={d => (
          <antd.List.Item actions={[<antd.Button size="small" icon={<DownloadOutlined />} />, <antd.Button size="small" icon={<EditOutlined />}>Replace</antd.Button>]}>
            <antd.List.Item.Meta
              avatar={<FilePdfOutlined style={{ fontSize: 20, color: 'var(--color-danger)' }} />}
              title={<antd.Space>{d.t}{d.v && <antd.Tag color="green" style={{ fontSize: 10 }}>Verified</antd.Tag>}</antd.Space>}
              description={<antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>{d.f} · {d.s}</antd.Typography.Text>}
            />
          </antd.List.Item>
        )}
      />
    </antd.Card>
  );
}

function TeamTab({ onInvite }) {
  const [q, setQ] = React.useState('');
  const [joinReqs, setJoinReqs] = React.useState(MOCK.joinRequests || []);
  const [actionLoading, setActionLoading] = React.useState(null);
  const team = MOCK.teamMembers.filter(m => !q || (m.name + m.email + m.role).toLowerCase().includes(q.toLowerCase()));
  const roleColor = { Administrator: 'purple', 'PIC (Technical)': 'blue', Submitter: 'cyan', Finance: 'gold' };

  function handleApprove(req) {
    setActionLoading(req.id + '-approve');
    setTimeout(() => {
      setJoinReqs(prev => prev.filter(r => r.id !== req.id));
      antd.message.success(`${req.name} approved — they can now sign in to NCEF.`);
      setActionLoading(null);
    }, 800);
  }

  function handleReject(req) {
    setActionLoading(req.id + '-reject');
    setTimeout(() => {
      setJoinReqs(prev => prev.filter(r => r.id !== req.id));
      antd.message.info(`Join request from ${req.name} rejected.`);
      setActionLoading(null);
    }, 800);
  }

  return (
    <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>
    {joinReqs.length > 0 && (
      <antd.Card
        bordered
        style={{ borderColor: 'var(--color-warning)', borderWidth: 1.5 }}
        title={<antd.Space><ClockCircleOutlined style={{ color: 'var(--color-warning)' }} /> Pending Join Requests <antd.Badge count={joinReqs.length} style={{ background: 'var(--color-warning)' }} /></antd.Space>}
      >
        <antd.Alert type="warning" showIcon style={{ marginBottom: 16 }}
          message="These users registered using your company SSM BRN (201901023456) and are awaiting administrator approval before they can access the NCEF portal."
        />
        <antd.List
          dataSource={joinReqs}
          renderItem={req => (
            <antd.List.Item
              actions={[
                <antd.Button type="primary" size="small" icon={<CheckCircleOutlined />}
                  loading={actionLoading === req.id + '-approve'}
                  onClick={() => handleApprove(req)}>Approve</antd.Button>,
                <antd.Button danger size="small" icon={<CloseCircleOutlined />}
                  loading={actionLoading === req.id + '-reject'}
                  onClick={() => handleReject(req)}>Reject</antd.Button>,
              ]}
            >
              <antd.List.Item.Meta
                avatar={<antd.Avatar style={{ background: 'var(--color-warning)', color: '#fff' }}>{req.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</antd.Avatar>}
                title={<antd.Space>{req.name}<antd.Tag color={roleColor[req.role] || 'default'}>{req.role}</antd.Tag></antd.Space>}
                description={<div>
                  <div style={{ fontSize: 12 }}>{req.email}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{req.message} · Requested {new Date(req.registeredAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                </div>}
              />
            </antd.List.Item>
          )}
        />
      </antd.Card>
    )}
    <antd.Card
      title={<antd.Space><TeamOutlined /> Team Members <antd.Badge count={MOCK.teamMembers.length} style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }} showZero /></antd.Space>}
      bordered
      extra={<antd.Button type="primary" icon={<PlusOutlined />} onClick={onInvite}>Invite member</antd.Button>}
    >
      <antd.Alert
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        message="Role permissions"
        description={
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>
            <b>Administrator</b> manages the account and billing · <b>PIC (Technical)</b> signs technical declarations · <b>Submitter</b> drafts & submits applications · <b>Finance</b> manages payments & invoices
          </div>
        }
        style={{ marginBottom: 16 }}
      />
      <antd.Input placeholder="Search team…" prefix={<SearchOutlined />} style={{ maxWidth: 320, marginBottom: 12 }} value={q} onChange={e => setQ(e.target.value)} />
      <antd.Table
        rowKey="id"
        dataSource={team}
        pagination={false}
        scroll={{ x: 'max-content' }}
        columns={[
          { title: 'Name', width: 240, render: (_, m) => (
            <antd.Space>
              <antd.Avatar style={{ background: 'var(--color-primary)' }}>{m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</antd.Avatar>
              <div>
                <div style={{ fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{m.email}</div>
              </div>
            </antd.Space>
          ) },
          { title: 'Role',        dataIndex: 'role',       width: 160, render: r => <antd.Tag color={roleColor[r] || 'default'}>{r}</antd.Tag> },
          { title: 'Status',      dataIndex: 'status',     width: 120, render: s => s === 'active' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Active</antd.Tag> : <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Invite Sent</antd.Tag> },
          { title: 'Joined',      dataIndex: 'joined',     width: 120, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span> },
          { title: 'Last Active', dataIndex: 'lastActive', width: 160, render: v => v ? <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span> : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
          { title: '', width: 60, render: (_, m) => (
            <antd.Dropdown menu={{ items: [
              { key: 'edit', icon: <EditOutlined />, label: 'Edit role' },
              { key: 'reset', icon: <KeyOutlined />, label: 'Reset password' },
              { key: 'resend', icon: <SendOutlined />, label: 'Resend invite', disabled: m.status === 'active' },
              { type: 'divider' },
              { key: 'remove', icon: <DeleteOutlined />, label: 'Remove', danger: true },
            ] }}>
              <antd.Button type="text" icon={<MoreOutlined />} />
            </antd.Dropdown>
          ) },
        ]}
      />
    </antd.Card>
    </antd.Space>
  );
}

function SecurityTab() {
  const [enrollOpen, setEnrollOpen] = React.useState(null); // null | 'totp' | 'sms' | 'mydigital'
  const [totpStep, setTotpStep] = React.useState(0); // 0=show QR, 1=enter code, 2=success
  const [smsStep, setSmsStep] = React.useState(0); // 0=enter phone, 1=enter OTP, 2=success
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);

  const verifyTotp = (code) => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); if (code === '847291') setTotpStep(2); else antd.message.error('Incorrect code — try again'); }, 900);
  };
  const sendSmsOtp = () => {
    setSmsStep(1);
    setTimeout(() => setOtp(''), 10);
  };
  const verifySmsOtp = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); if (otp === '847291') setSmsStep(2); else antd.message.error('Incorrect OTP — try again'); }, 700);
  };
  const closeEnroll = () => { setEnrollOpen(null); setTotpStep(0); setSmsStep(0); setPhone(''); setOtp(''); setVerifying(false); };

  return (
    <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>
      <antd.Card title={<antd.Space><LockOutlined /> Password</antd.Space>} bordered>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13 }}>Last changed 14 February 2026</div>
            <antd.Typography.Text type="secondary" style={{ fontSize: 12 }}>Required every 90 days per MCMC policy · Next required: 15 May 2026</antd.Typography.Text>
          </div>
          <antd.Button>Change password</antd.Button>
        </div>
      </antd.Card>

      <antd.Card title={<antd.Space><SafetyOutlined /> Two-Factor Authentication</antd.Space>} bordered extra={<antd.Tag color="green" icon={<CheckCircleOutlined />}>Enabled</antd.Tag>}>
        <antd.List
          dataSource={[
            { icon: <MailOutlined />, t: 'Authenticator App', d: 'Google Authenticator · Added 15 Jan 2024', def: true },
            { icon: <PhoneOutlined />, t: 'SMS to +60 12-345 6789', d: 'Backup · Not preferred for MCMC' },
            { icon: <KeyOutlined />, t: 'MyDigital ID', d: 'National e-ID · Recommended' },
          ]}
          renderItem={(m, i) => (
            <antd.List.Item actions={[
              m.def ? <antd.Tag color="blue">Default</antd.Tag> : <antd.Button size="small">Set default</antd.Button>,
              <antd.Button size="small" danger type="text">Remove</antd.Button>,
            ]}>
              <antd.List.Item.Meta avatar={m.icon} title={m.t} description={m.d} />
            </antd.List.Item>
          )}
        />
        <antd.Divider style={{ margin: '12px 0 16px' }}>Add another method</antd.Divider>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { k: 'totp', icon: <QrcodeOutlined />, label: 'Authenticator App', sub: 'TOTP (Google/Microsoft/Authy)' },
            { k: 'sms', icon: <PhoneOutlined />, label: 'SMS OTP', sub: 'One-time code via SMS' },
            { k: 'mydigital', icon: <IdcardOutlined />, label: 'MyDigital ID', sub: 'Malaysia national e-ID' },
          ].map(m => (
            <div key={m.k} onClick={() => setEnrollOpen(m.k)} style={{ padding: '12px 16px', border: '1.5px solid var(--color-border)', borderRadius: 10, cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', flex: '1 0 160px', background: '#fff', transition: 'border-color .15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--color-border)'}>
              <div style={{ fontSize: 22, color: 'var(--color-primary)' }}>{m.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </antd.Card>

      {/* ── TOTP Enrollment Modal ────────────────────────────── */}
      <antd.Modal title="Set up Authenticator App" open={enrollOpen === 'totp'} onCancel={closeEnroll} footer={null} width={440}>
        {totpStep === 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>Open your authenticator app (Google Authenticator, Microsoft Authenticator, Authy) and scan the QR code below.</div>
            {/* QR code mockup */}
            <div style={{ display: 'inline-block', padding: 12, background: '#fff', border: '2px solid #222', borderRadius: 8, marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,12px)', gap: 1 }}>
                {Array.from({ length: 49 }, (_, i) => {
                  const pattern = [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0].includes(i);
                  return <div key={i} style={{ width: 12, height: 12, background: (i%8===0||i%8===7||Math.floor(i/7)<1||Math.floor(i/7)>5||i%3===0) ? '#222' : '#fff', borderRadius: 1 }} />;
                })}
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 16 }}>Or enter manually: <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>NCEF-MCMC-2026-DEMO</code></div>
            <antd.Button type="primary" block onClick={() => setTotpStep(1)}>I've scanned the QR code →</antd.Button>
          </div>
        )}
        {totpStep === 1 && (
          <div>
            <antd.Alert message="Enter the 6-digit code shown in your authenticator app." type="info" showIcon style={{ marginBottom: 16 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <antd.Input maxLength={6} placeholder="e.g. 847291" style={{ fontFamily: 'var(--font-mono)', fontSize: 20, textAlign: 'center', letterSpacing: 6 }} onChange={e => { if (e.target.value.length === 6) verifyTotp(e.target.value); }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 8, textAlign: 'center' }}>Demo code: 847291</div>
            {verifying && <antd.Spin style={{ marginTop: 12, display: 'block', textAlign: 'center' }} />}
          </div>
        )}
        {totpStep === 2 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48 }}>✅</div>
            <antd.Typography.Title level={4} style={{ marginTop: 12 }}>Authenticator App enrolled!</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Your account is now protected by TOTP 2FA.</antd.Typography.Text>
            <div style={{ marginTop: 20 }}>
              <antd.Button type="primary" onClick={closeEnroll}>Done</antd.Button>
            </div>
          </div>
        )}
      </antd.Modal>

      {/* ── SMS OTP Enrollment Modal ─────────────────────────── */}
      <antd.Modal title="Set up SMS OTP" open={enrollOpen === 'sms'} onCancel={closeEnroll} footer={null} width={420}>
        {smsStep === 0 && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>We'll send a one-time code to your mobile number each time you sign in.</div>
            <antd.Form layout="vertical">
              <antd.Form.Item label="Mobile Number" required extra="Malaysian number (e.g. +60 12-345 6789)">
                <antd.Input prefix="+60" placeholder="12-345 6789" value={phone} onChange={e => setPhone(e.target.value)} />
              </antd.Form.Item>
              <antd.Button type="primary" block onClick={sendSmsOtp} disabled={!phone}>Send verification code</antd.Button>
            </antd.Form>
          </div>
        )}
        {smsStep === 1 && (
          <div>
            <antd.Alert message={`A 6-digit code was sent to +60 ${phone}. It expires in 5 minutes.`} type="info" showIcon style={{ marginBottom: 16 }} />
            <antd.Form layout="vertical">
              <antd.Form.Item label="Enter OTP code" required>
                <antd.Input maxLength={6} placeholder="e.g. 847291" value={otp} onChange={e => setOtp(e.target.value)} style={{ fontFamily: 'var(--font-mono)', fontSize: 20, textAlign: 'center', letterSpacing: 6 }} />
              </antd.Form.Item>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 12, textAlign: 'center' }}>Demo code: 847291</div>
              <antd.Button type="primary" block onClick={verifySmsOtp} loading={verifying} disabled={otp.length < 6}>Verify →</antd.Button>
            </antd.Form>
            <antd.Button type="link" onClick={() => setSmsStep(0)}>← Change number</antd.Button>
          </div>
        )}
        {smsStep === 2 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48 }}>✅</div>
            <antd.Typography.Title level={4} style={{ marginTop: 12 }}>SMS OTP enrolled!</antd.Typography.Title>
            <antd.Typography.Text type="secondary">Verification codes will be sent to +60 {phone}.</antd.Typography.Text>
            <div style={{ marginTop: 20 }}><antd.Button type="primary" onClick={closeEnroll}>Done</antd.Button></div>
          </div>
        )}
      </antd.Modal>

      {/* ── MyDigital ID Enrollment Modal ────────────────────── */}
      <antd.Modal title="Link MyDigital ID" open={enrollOpen === 'mydigital'} onCancel={closeEnroll} footer={[<antd.Button key="cancel" onClick={closeEnroll}>Cancel</antd.Button>, <antd.Button key="ok" type="primary" onClick={closeEnroll}>Open MyDigital ID →</antd.Button>]} width={440}>
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🪪</div>
          <antd.Typography.Title level={4}>Link your national e-ID</antd.Typography.Title>
          <antd.Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>You will be redirected to the MyDigital ID portal (uat.mydigital.gov.my) to authorise NCEF access. Return here after approving the consent.</antd.Typography.Text>
          <antd.Alert type="info" showIcon message="This is the recommended 2FA method for government portals. No phone number needed." style={{ textAlign: 'left' }} />
        </div>
      </antd.Modal>

      <antd.Card title={<antd.Space><HistoryOutlined /> Active Sessions</antd.Space>} bordered>
        <antd.List
          dataSource={[
            { d: 'MacBook Pro · Chrome · Kuala Lumpur', t: 'Active now', cur: true },
            { d: 'iPhone 15 · Safari · Kuala Lumpur', t: '2 hours ago' },
            { d: 'Windows · Edge · Cyberjaya', t: '3 days ago' },
          ]}
          renderItem={s => (
            <antd.List.Item actions={[s.cur ? <antd.Tag color="green">This device</antd.Tag> : <antd.Button size="small" danger>Sign out</antd.Button>]}>
              <antd.List.Item.Meta title={s.d} description={s.t} />
            </antd.List.Item>
          )}
        />
        <antd.Button danger style={{ marginTop: 8 }}>Sign out all other devices</antd.Button>
      </antd.Card>
    </antd.Space>
  );
}

function NotifTab() {
  const Row = ({ t, d, defaults }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-divider)' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{d}</div>
      </div>
      <antd.Space>
        <antd.Checkbox defaultChecked={defaults.includes('email')}>Email</antd.Checkbox>
        <antd.Checkbox defaultChecked={defaults.includes('sms')}>SMS</antd.Checkbox>
        <antd.Checkbox defaultChecked={defaults.includes('inapp')}>In-app</antd.Checkbox>
      </antd.Space>
    </div>
  );
  return (
    <antd.Card title="Notification Preferences" bordered>
      <Row t="Application status change" d="Submitted, under review, approved, iteration required, rejected" defaults={['email', 'inapp']} />
      <Row t="Officer messages" d="Questions or iteration requests from CPPG officers" defaults={['email', 'sms', 'inapp']} />
      <Row t="Certificate expiring" d="90, 60, 30 days before expiry" defaults={['email', 'inapp']} />
      <Row t="Payment receipts" d="Invoice issued, paid, corporate invoice reminder" defaults={['email']} />
      <Row t="Regulatory updates" d="New MCMC circulars, standard updates, scheme changes" defaults={['email']} />
      <Row t="Team activity" d="Member invited, role changed, member removed" defaults={['inapp']} />
    </antd.Card>
  );
}

function ApiTab() {
  return (
    <antd.Card title={<antd.Space><ApartmentOutlined /> API & Integrations</antd.Space>} bordered extra={<antd.Button type="primary" icon={<PlusOutlined />}>Generate key</antd.Button>}>
      <antd.Alert type="info" showIcon message="Public API access (beta)" description="Integrate directly with your ERP or PLM system. Submit applications, check status, retrieve certificates via REST or webhook." style={{ marginBottom: 16 }} />
      <antd.List
        dataSource={[
          { t: 'Production key', v: 'ncef_live_••••••••••••••8F2K', d: 'Created 14 Feb 2026 · Last used 2 hours ago' },
          { t: 'Test key', v: 'ncef_test_••••••••••••••9R7P', d: 'Created 22 Jan 2024 · Last used 3 days ago' },
        ]}
        renderItem={k => (
          <antd.List.Item actions={[<antd.Button size="small" icon={<CopyOutlined />}>Copy</antd.Button>, <antd.Button size="small" danger>Revoke</antd.Button>]}>
            <antd.List.Item.Meta title={k.t} description={<><code>{k.v}</code><div>{k.d}</div></>} />
          </antd.List.Item>
        )}
      />
      <antd.Divider>Webhooks</antd.Divider>
      <antd.Typography.Text type="secondary">No webhooks configured. Add one to receive application.updated and certificate.issued events.</antd.Typography.Text>
      <div style={{ marginTop: 8 }}>
        <antd.Button icon={<PlusOutlined />}>Add webhook</antd.Button>
      </div>
    </antd.Card>
  );
}

function InviteDrawer({ open, onClose }) {
  return (
    <antd.Drawer open={open} onClose={onClose} width={480} title="Invite team member">
      <antd.Form layout="vertical">
        <antd.Form.Item label="Full Name" required><antd.Input placeholder="Tan Mei Ling" /></antd.Form.Item>
        <antd.Form.Item label="Work Email" required><antd.Input placeholder="name@axiatadigital.com.my" prefix={<MailOutlined />} /></antd.Form.Item>
        <antd.Form.Item label="Role" required>
          <antd.Radio.Group style={{ display: 'grid', gap: 10, width: '100%' }}>
            {[
              { v: 'admin', t: 'Administrator', d: 'Full access including billing, team and API' },
              { v: 'pic', t: 'PIC (Technical)', d: 'Sign technical declarations on behalf of the company' },
              { v: 'submit', t: 'Submitter', d: 'Draft and submit applications; cannot manage billing' },
              { v: 'finance', t: 'Finance', d: 'View and manage payments, invoices and credit line' },
            ].map(r => (
              <antd.Radio key={r.v} value={r.v} style={{ padding: 12, border: '1px solid var(--color-border)', borderRadius: 8, margin: 0, width: '100%' }}>
                <span style={{ display: 'inline-block' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.d}</div>
                </span>
              </antd.Radio>
            ))}
          </antd.Radio.Group>
        </antd.Form.Item>
        <antd.Form.Item label="Welcome message (optional)"><antd.Input.TextArea rows={3} placeholder="Welcome to the team! You'll be handling our Scheme A submissions…" /></antd.Form.Item>
      </antd.Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <antd.Button onClick={onClose}>Cancel</antd.Button>
        <antd.Button type="primary" icon={<SendOutlined />} onClick={onClose}>Send invite</antd.Button>
      </div>
    </antd.Drawer>
  );
}

// ============ CALENDAR BLOCKING (MCMC Officers) ============
function CalendarTab({ cu }) {
  const isLead = cu?.role === 'team-lead';
  const BLOCK_TYPES = ['Annual Leave', 'Medical Leave', 'Training / Course', 'Public Holiday', 'Non-Working Day'];

  const [blocks, setBlocks] = React.useState([
    { id: 1, type: 'Annual Leave',    start: '2026-05-19', end: '2026-05-22', notes: 'Hari Raya Aidiladha break',   status: 'upcoming' },
    { id: 2, type: 'Training / Course', start: '2026-06-08', end: '2026-06-09', notes: 'MCMC Internal Audit Training', status: 'upcoming' },
  ]);
  const [addOpen, setAddOpen] = React.useState(false);
  const [draft, setDraft] = React.useState({ type: 'Annual Leave', start: '', end: '', notes: '' });
  const [transferOpen, setTransferOpen] = React.useState(null);
  const [transferTo, setTransferTo] = React.useState(null);

  const otherOfficers = MOCK.officerPerformance.filter(o => o.id !== cu?.id).slice(0, 4);

  function addBlock() {
    if (!draft.start || !draft.end) return;
    setBlocks(prev => [...prev, { ...draft, id: Date.now(), status: 'upcoming' }]);
    setAddOpen(false);
    antd.message.success('Blocked period saved — queue manager notified');
  }
  function removeBlock(id) {
    setBlocks(prev => prev.filter(b => b.id !== id));
    antd.message.info('Blocked period removed');
  }

  const typeColor = { 'Annual Leave': 'blue', 'Medical Leave': 'red', 'Training / Course': 'orange', 'Public Holiday': 'green', 'Non-Working Day': 'default' };

  return (
    <antd.Card title={<antd.Space><ClockCircleOutlined /> Calendar Blocking</antd.Space>} bordered
      extra={<antd.Button type="primary" icon={<PlusOutlined />} onClick={() => { setDraft({ type: 'Annual Leave', start: '', end: '', notes: '' }); setAddOpen(true); }}>Add Blocked Period</antd.Button>}>

      <antd.Alert type="info" showIcon style={{ marginBottom: 16 }}
        message="Blocked periods mark you as unavailable for new task assignments. Your Team Lead will be notified and can transfer existing assignments during your absence."
      />

      {/* Team Lead: pending transfer panel */}
      {isLead && blocks.length > 0 && (
        <antd.Card size="small" style={{ marginBottom: 16, border: '1px solid var(--color-warning)', background: '#fffbe6' }}
          title={<span style={{ color: '#875100', fontWeight: 600 }}><WarningOutlined /> Assignments pending during upcoming leave</span>}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12 }}>
            3 applications are assigned to officers with upcoming blocked periods. You can pre-emptively transfer them.
          </div>
          {[
            { id: 'APP-0426-00087', officer: 'Pn. Rosnah Idris', blocked: '19–22 May' },
            { id: 'APP-0426-00091', officer: 'En. Syahrul Azlan', blocked: '08–09 Jun' },
          ].map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-divider)' }}>
              <div>
                <antd.Typography.Text code style={{ fontSize: 12 }}>{item.id}</antd.Typography.Text>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)', marginLeft: 8 }}>Assigned: {item.officer} · Blocked: {item.blocked}</span>
              </div>
              <antd.Button size="small" onClick={() => { setTransferOpen(item.id); setTransferTo(null); }}>Transfer</antd.Button>
            </div>
          ))}
        </antd.Card>
      )}

      {blocks.length === 0 ? (
        <antd.Empty description="No blocked periods scheduled" image={antd.Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {blocks.map(b => (
            <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: 10, background: '#fafafa' }}>
              <antd.Tag color={typeColor[b.type] || 'default'} style={{ marginTop: 2, minWidth: 100, textAlign: 'center' }}>{b.type}</antd.Tag>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>
                  {new Date(b.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  {' — '}
                  {new Date(b.end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                {b.notes && <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{b.notes}</div>}
              </div>
              <antd.Tag color="orange">Upcoming</antd.Tag>
              <antd.Button size="small" danger icon={<DeleteOutlined />} type="text" onClick={() => removeBlock(b.id)} />
            </div>
          ))}
        </div>
      )}

      {/* Add Blocked Period Modal */}
      <antd.Modal
        open={addOpen}
        title="Add Blocked Period"
        onCancel={() => setAddOpen(false)}
        onOk={addBlock}
        okText="Save"
        okButtonProps={{ disabled: !draft.start || !draft.end }}
      >
        <div style={{ display: 'grid', gap: 14, marginTop: 8 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Block Type</div>
            <antd.Select value={draft.type} onChange={v => setDraft(d => ({ ...d, type: v }))} style={{ width: '100%' }}
              options={BLOCK_TYPES.map(t => ({ value: t, label: t }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Start Date <span style={{ color: 'var(--color-danger)' }}>*</span></div>
              <antd.Input type="date" value={draft.start} onChange={e => setDraft(d => ({ ...d, start: e.target.value }))} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>End Date <span style={{ color: 'var(--color-danger)' }}>*</span></div>
              <antd.Input type="date" value={draft.end} onChange={e => setDraft(d => ({ ...d, end: e.target.value }))} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Notes <span style={{ color: 'var(--color-text-muted)' }}>(optional)</span></div>
            <antd.Input.TextArea rows={2} value={draft.notes} onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))} placeholder="e.g. Attending MCMC Internal Training Programme…" />
          </div>
        </div>
      </antd.Modal>

      {/* Transfer Assignment Modal */}
      <antd.Modal
        open={!!transferOpen}
        title={<span>Transfer Assignment — <antd.Typography.Text code style={{ fontSize: 13 }}>{transferOpen}</antd.Typography.Text></span>}
        onCancel={() => setTransferOpen(null)}
        onOk={() => {
          if (!transferTo) return;
          const name = otherOfficers.find(o => o.id === transferTo)?.name;
          antd.message.success(`${transferOpen} transferred to ${name}`);
          setTransferOpen(null);
        }}
        okText="Confirm Transfer"
        okButtonProps={{ disabled: !transferTo }}
      >
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12 }}>Select an available officer to receive this assignment:</div>
          <antd.Radio.Group value={transferTo} onChange={e => setTransferTo(e.target.value)} style={{ width: '100%', display: 'grid', gap: 8 }}>
            {otherOfficers.map(o => (
              <antd.Radio key={o.id} value={o.id} style={{ padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, margin: 0 }}>
                <span style={{ fontWeight: 600 }}>{o.name}</span>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginLeft: 8 }}>Queue: {o.queue} · SLA: {o.slaCompliance}%</span>
              </antd.Radio>
            ))}
          </antd.Radio.Group>
        </div>
      </antd.Modal>
    </antd.Card>
  );
}

// ============ PRINCIPAL MANAGEMENT (Supplier) ============
function PrincipalsTab() {
  const [principals, setPrincipals] = React.useState(
    MOCK.myPrincipals.map(lp => ({ ...MOCK.principalDirectory.find(p => p.id === lp.id), ...lp }))
  );
  const [addOpen, setAddOpen] = React.useState(false);
  const [addStep, setAddStep] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(null);
  const [louUploaded, setLouUploaded] = React.useState(false);
  const [loaUploaded, setLoaUploaded] = React.useState(false);
  const [removeConfirm, setRemoveConfirm] = React.useState(null);

  const available = MOCK.principalDirectory.filter(p => !principals.find(lp => lp.id === p.id));
  const selected = MOCK.principalDirectory.find(p => p.id === selectedId);

  function doAdd() {
    if (!selectedId || !louUploaded || !loaUploaded) return;
    setPrincipals(prev => [...prev, { ...selected, linkedAt: new Date().toISOString().slice(0, 10), louStatus: 'pending', loaStatus: 'pending' }]);
    setAddOpen(false);
    setAddStep(0);
    setSelectedId(null);
    setLouUploaded(false);
    setLoaUploaded(false);
    antd.message.success(`${selected.name} added as Principal — documents pending MCMC verification`);
  }
  function doRemove(id) {
    setPrincipals(prev => prev.filter(p => p.id !== id));
    setRemoveConfirm(null);
    antd.message.info('Principal unlinked from your account');
  }

  const docStatus = s => s === 'verified'
    ? <antd.Tag color="green" style={{ fontSize: 10 }}>Verified</antd.Tag>
    : <antd.Tag color="orange" style={{ fontSize: 10 }}>Pending</antd.Tag>;

  return (
    <antd.Card
      title={<antd.Space><IdcardOutlined /> Linked Principals</antd.Space>}
      bordered
      extra={<antd.Button type="primary" icon={<PlusOutlined />} onClick={() => { setAddOpen(true); setAddStep(0); setSelectedId(null); setLouUploaded(false); setLoaUploaded(false); }}>Add Principal</antd.Button>}
    >
      <antd.Alert type="info" showIcon style={{ marginBottom: 16 }}
        message="Principals are overseas manufacturers or brand owners whose products you distribute. Each link requires a Letter of Undertaking (LoU) and Letter of Authorisation (LoA) verified by MCMC."
      />

      {principals.length === 0 ? (
        <antd.Empty description="No principals linked yet" image={antd.Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {principals.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', border: '1px solid var(--color-border)', borderRadius: 10, background: '#fafafa' }}>
              <antd.Avatar size={44} style={{ background: 'var(--color-primary)', flexShrink: 0, fontSize: 14, fontWeight: 700 }}>
                {p.name?.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </antd.Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</span>
                  <antd.Tag style={{ fontSize: 10 }}>{p.category}</antd.Tag>
                  <antd.Tag style={{ fontSize: 10 }}>{p.country}</antd.Tag>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 6 }}>
                  <antd.Typography.Text code style={{ fontSize: 11 }}>{p.id}</antd.Typography.Text>
                  <span style={{ marginLeft: 8 }}>Linked {new Date(p.linkedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <antd.Space size={6}>
                  <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>LoU:</span>{docStatus(p.louStatus)}
                  <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginLeft: 4 }}>LoA:</span>{docStatus(p.loaStatus)}
                </antd.Space>
              </div>
              <antd.Button size="small" danger onClick={() => setRemoveConfirm(p.id)}>Remove</antd.Button>
            </div>
          ))}
        </div>
      )}

      {/* Add Principal Modal */}
      <antd.Modal
        open={addOpen}
        title={addStep === 0 ? 'Add Principal — Select Company' : 'Add Principal — Upload Documents'}
        onCancel={() => setAddOpen(false)}
        footer={
          <antd.Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            {addStep === 1 && <antd.Button onClick={() => setAddStep(0)}>← Back</antd.Button>}
            {addStep === 0 && <antd.Button type="primary" disabled={!selectedId} onClick={() => setAddStep(1)}>Next →</antd.Button>}
            {addStep === 1 && <antd.Button type="primary" disabled={!louUploaded || !loaUploaded} onClick={doAdd}>Add Principal</antd.Button>}
          </antd.Space>
        }
      >
        {addStep === 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12 }}>Select from registered principals in the NCEF directory:</div>
            <antd.Radio.Group value={selectedId} onChange={e => setSelectedId(e.target.value)} style={{ width: '100%', display: 'grid', gap: 8 }}>
              {available.map(p => (
                <antd.Radio key={p.id} value={p.id} style={{ padding: '10px 12px', border: `1px solid ${selectedId === p.id ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 8, margin: 0, background: selectedId === p.id ? 'var(--color-primary-soft)' : '#fff' }}>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{p.country} · {p.category} · <antd.Typography.Text code style={{ fontSize: 10 }}>{p.id}</antd.Typography.Text></div>
                </antd.Radio>
              ))}
            </antd.Radio.Group>
            {available.length === 0 && <antd.Empty description="All registered principals are already linked" image={antd.Empty.PRESENTED_IMAGE_SIMPLE} />}
          </div>
        )}
        {addStep === 1 && selected && (
          <div style={{ marginTop: 8 }}>
            <antd.Alert type="info" showIcon style={{ marginBottom: 16 }} message={<span>Linking <strong>{selected.name}</strong> — both documents are required before MCMC can verify the relationship.</span>} />
            {[
              { key: 'lou', label: 'Letter of Undertaking (LoU)', note: 'On company letterhead, signed by authorised representative', uploaded: louUploaded, setUploaded: setLouUploaded },
              { key: 'loa', label: 'Letter of Authorisation (LoA)', note: 'Authorising your company to distribute/register the principal\'s equipment', uploaded: loaUploaded, setUploaded: setLoaUploaded },
            ].map(doc => (
              <div key={doc.key} style={{ marginBottom: 12, padding: 14, border: `1px solid ${doc.uploaded ? 'var(--color-success)' : 'var(--color-border)'}`, borderRadius: 8, background: doc.uploaded ? 'var(--color-success-bg, #f6ffed)' : '#fafafa' }}>
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{doc.label} <span style={{ color: 'var(--color-danger)' }}>*</span></div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{doc.note}</div>
                  </div>
                  {doc.uploaded
                    ? <antd.Tag color="green">✓ Uploaded</antd.Tag>
                    : <antd.Button size="small" icon={<UploadOutlined />} onClick={() => doc.setUploaded(true)}>Upload PDF</antd.Button>
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </antd.Modal>

      {/* Remove confirmation */}
      <antd.Modal
        open={!!removeConfirm}
        title="Remove Principal"
        onCancel={() => setRemoveConfirm(null)}
        onOk={() => doRemove(removeConfirm)}
        okText="Remove"
        okButtonProps={{ danger: true }}
      >
        <antd.Alert type="warning" showIcon style={{ marginBottom: 12 }}
          message="Removing this principal will unlink all associated applications. MCMC must be notified if active registrations reference this principal."
        />
        <p style={{ fontSize: 13 }}>Are you sure you want to remove <strong>{principals.find(p => p.id === removeConfirm)?.name}</strong> as a linked principal?</p>
      </antd.Modal>
    </antd.Card>
  );
}

// ============ CONSULTANTS (Supplier Admin) ============
// Per amended URS: Supplier Admin can view/add/remove consultants linked to their company.
// Add picks from system-wide MOCK.consultantDirectory (Category D users); remove unlinks
// from this supplier but does not delete the consultant globally.
SCREENS.consultants = function Consultants({ nav }) {
  const me = MOCK.profiles.supplier;
  const [linked, setLinked] = React.useState(MOCK.myConsultants);
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [confirmUnlink, setConfirmUnlink] = React.useState(null);
  const [pickedId, setPickedId] = React.useState(null);
  const [primaryFor, setPrimaryFor] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [toast, setToast] = React.useState(null);

  // Resolve full consultant info by joining linked rows with the directory.
  const enriched = linked.map(l => ({ ...MOCK.consultantDirectory.find(c => c.id === l.id), ...l }));
  const linkedIds = new Set(linked.map(l => l.id));
  const available = MOCK.consultantDirectory.filter(c => !linkedIds.has(c.id) && c.active);

  function handleLink() {
    if (!pickedId) return;
    setLinked([...linked, { id: pickedId, linkedAt: new Date().toISOString().slice(0, 10), primaryFor, notes }]);
    setLinkOpen(false);
    setPickedId(null); setPrimaryFor([]); setNotes('');
    const c = MOCK.consultantDirectory.find(x => x.id === pickedId);
    setToast({ type: 'success', msg: `Linked ${c.name} (${c.firm}) to ${me.company}.` });
  }

  function handleUnlink(c) {
    setLinked(linked.filter(l => l.id !== c.id));
    setConfirmUnlink(null);
    setToast({ type: 'warning', msg: `${c.name} unlinked from your account. (Their NCEF profile remains active.)` });
  }

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Supplier Administrator · {me.company}</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Consultants</antd.Typography.Title>
          <antd.Typography.Text type="secondary">Telecom / EMC / Safety consultants linked to your supplier account. They may submit applications on your behalf when you grant access.</antd.Typography.Text>
        </div>
        <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => setLinkOpen(true)}>Add consultant</antd.Button>
      </div>

      {toast && (
        <antd.Alert
          type={toast.type}
          message={toast.msg}
          showIcon closable
          afterClose={() => setToast(null)}
          style={{ marginBottom: 16 }}
        />
      )}

      <antd.Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {[
          { l: 'Linked consultants', v: linked.length, d: 'Currently active for this account', color: 'var(--color-primary)' },
          { l: 'Engagements (last 12m)', v: enriched.reduce((a, c) => a + (c.engagements || 0), 0), d: 'Across all linked consultants' },
          { l: 'Available in directory', v: available.length, d: 'Other registered Category D users' },
        ].map((k, i) => (
          <antd.Col xs={24} md={8} key={i}>
            <div className="kpi-card">
              <div className="kpi-label">{k.l}</div>
              <div className="kpi-value" style={{ color: k.color }}>{k.v}</div>
              <div className="kpi-delta">{k.d}</div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered title={<antd.Space><ApartmentOutlined /> Linked to {me.company}</antd.Space>}>
        {enriched.length === 0 ? (
          <antd.Empty
            description="No consultants linked yet"
            image={antd.Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <antd.Button type="primary" icon={<PlusOutlined />} onClick={() => setLinkOpen(true)}>Add consultant</antd.Button>
          </antd.Empty>
        ) : (
          <antd.Table
            rowKey="id"
            dataSource={enriched}
            pagination={false}
            columns={[
              { title: 'Consultant', key: 'who', render: (_, r) => (
                <div>
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.firm}</div>
                </div>
              ) },
              { title: 'Expertise', dataIndex: 'expertise', render: tags => (
                <antd.Space size={[4, 4]} wrap>
                  {(tags || []).map((t, i) => <antd.Tag key={i}>{t}</antd.Tag>)}
                </antd.Space>
              ) },
              { title: 'Primary for', dataIndex: 'primaryFor', render: (v) => (v || []).map((x, i) => <antd.Tag key={i} color="blue">{x}</antd.Tag>) },
              { title: 'Contact', key: 'contact', render: (_, r) => (
                <div style={{ fontSize: 12 }}>
                  <div><MailOutlined style={{ marginRight: 4, color: 'var(--color-text-muted)' }} />{r.email}</div>
                  <div><PhoneOutlined style={{ marginRight: 4, color: 'var(--color-text-muted)' }} />{r.phone}</div>
                </div>
              ) },
              { title: 'Linked', dataIndex: 'linkedAt' },
              { title: 'Engagements', dataIndex: 'engagements', align: 'right' },
              {
                title: 'Action',
                key: 'action',
                render: (_, r) => <antd.Button size="small" type="link" danger icon={<DeleteOutlined />} onClick={() => setConfirmUnlink(r)}>Remove</antd.Button>,
              },
            ]}
          />
        )}
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-text-muted)' }}>
          Removing a consultant unlinks them from this account only — their NCEF registration stays active for other suppliers.
        </div>
      </antd.Card>

      {/* Link existing consultant modal */}
      <antd.Modal
        title={<antd.Space><PlusOutlined /> Link consultant to {me.company}</antd.Space>}
        open={linkOpen}
        onCancel={() => setLinkOpen(false)}
        onOk={handleLink}
        okText="Link consultant"
        okButtonProps={{ disabled: !pickedId }}
        cancelText="Cancel"
        width={560}
      >
        <antd.Alert
          type="info"
          showIcon
          message="Pick from registered Category D consultants"
          description="If your consultant isn't in the list, ask them to register at the NCEF Portal first. Self-registration is required before linking."
          style={{ marginBottom: 16 }}
        />
        <antd.Form layout="vertical">
          <antd.Form.Item label="Consultant" required>
            <antd.Select
              showSearch
              placeholder="Search by name or firm…"
              optionFilterProp="label"
              value={pickedId}
              onChange={setPickedId}
              options={available.map(c => ({
                value: c.id,
                label: `${c.name} — ${c.firm}`,
              }))}
            />
          </antd.Form.Item>
          {pickedId && (() => {
            const c = MOCK.consultantDirectory.find(x => x.id === pickedId);
            return (
              <div style={{ padding: 12, background: 'var(--color-bg-subtle)', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>
                <div><strong>{c.name}</strong> · {c.firm}</div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>{c.email} · {c.phone}</div>
                <div style={{ marginTop: 6 }}>
                  <antd.Space size={[4, 4]} wrap>
                    {c.expertise.map((t, i) => <antd.Tag key={i}>{t}</antd.Tag>)}
                  </antd.Space>
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: 'var(--color-text-muted)' }}>{c.engagements} prior engagements · Registered since {c.since}</div>
              </div>
            );
          })()}
          <antd.Form.Item label="Primary for (optional)">
            <antd.Select
              mode="multiple"
              placeholder="Select schemes this consultant handles"
              value={primaryFor}
              onChange={setPrimaryFor}
              options={[
                { value: 'Scheme A', label: 'Scheme A — Standard' },
                { value: 'Scheme B', label: 'Scheme B — Type Approval' },
                { value: 'Scheme C', label: 'Scheme C — Self-Declaration' },
                { value: 'Scheme SA', label: 'Scheme SA — Special Approval' },
              ]}
            />
          </antd.Form.Item>
          <antd.Form.Item label="Internal notes (optional)">
            <antd.Input.TextArea rows={2} placeholder="e.g. Handles all our IoT submissions" value={notes} onChange={e => setNotes(e.target.value)} />
          </antd.Form.Item>
        </antd.Form>
      </antd.Modal>

      {/* Confirm unlink */}
      <antd.Modal
        title={<antd.Space style={{ color: 'var(--color-warning)' }}><WarningOutlined /> Remove consultant?</antd.Space>}
        open={!!confirmUnlink}
        onCancel={() => setConfirmUnlink(null)}
        onOk={() => handleUnlink(confirmUnlink)}
        okText="Remove"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        width={460}
      >
        {confirmUnlink && (
          <div>
            <p><strong>{confirmUnlink.name}</strong> ({confirmUnlink.firm}) will be unlinked from {me.company}.</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>They will lose access to submit applications on your behalf. Past applications they submitted are not affected.</p>
          </div>
        )}
      </antd.Modal>
    </div>
  );
};

Object.assign(window, { SCREENS });
