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
  CopyOutlined, PrinterOutlined, ScanOutlined, CheckOutlined, CaretDownOutlined
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
          onRow={(r) => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })}
          columns={[
            { title: 'RCN', dataIndex: 'rcn', render: v => <antd.Typography.Text code style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
            { title: 'Scheme', dataIndex: 'scheme', render: s => <SchemeBadge scheme={s} /> },
            { title: 'Product', render: (_, r) => <div><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{r.brand} · {r.model}</div></div> },
            { title: 'Label', dataIndex: 'labelType', render: v => <antd.Tag>{v === 'e-label' ? 'e-Label' : 'Physical'}</antd.Tag> },
            { title: 'Issued', dataIndex: 'issued', render: v => new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
            { title: 'Expires', dataIndex: 'expires', render: (v, r) => (
              <span style={{ color: r.status === 'expiring' ? 'var(--color-warning)' : r.status === 'expired' ? 'var(--color-danger)' : 'inherit', fontWeight: r.status !== 'active' ? 600 : 400 }}>
                {new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            ) },
            { title: 'Status', dataIndex: 'status', render: statusTag },
            { title: '', render: (_, r) => (
              <antd.Space>
                <antd.Tooltip title="Download PDF"><antd.Button size="small" icon={<DownloadOutlined />} /></antd.Tooltip>
                {r.status === 'expiring' && <antd.Button size="small" type="primary">Renew</antd.Button>}
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
        <antd.Button icon={<DownloadOutlined />} block>Download PDF</antd.Button>
        <antd.Button icon={<PrinterOutlined />} block>Print label</antd.Button>
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
          <antd.Alert type="warning" showIcon message={`Certificate expires in ${Math.ceil((new Date(cert.expires) - new Date('2026-04-19')) / 864e5)} days`} description="Start renewal early to avoid supply disruption. AI will reuse most documents from the original submission." />
          <div style={{ marginTop: 12 }}>
            <antd.Button type="primary" block icon={<ReloadOutlined />} onClick={() => nav && nav('cert-renewal')}>Start Renewal</antd.Button>
          </div>
        </>
      )}
    </div>
  );
}

// ============ PAYMENTS ============
SCREENS.payments = function Payments({ nav }) {
  const pays = MOCK.payments;
  const totalPaid = pays.filter(p => p.status === 'paid').reduce((a, b) => a + b.amount, 0);
  const pending = pays.filter(p => p.status === 'pending').reduce((a, b) => a + b.amount, 0);

  const methodIcon = (m) => {
    if (m.startsWith('FPX')) return <BankOutlined />;
    if (m.startsWith('Card')) return <CreditCardOutlined />;
    if (m.startsWith('DuitNow')) return <QrcodeOutlined />;
    if (m.startsWith('Corporate')) return <FileTextOutlined />;
    return <WalletOutlined />;
  };

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600 }}>Payments</div>
          <antd.Typography.Title level={3} style={{ margin: '4px 0 0' }}>Payments & Invoices</antd.Typography.Title>
          <antd.Typography.Text type="secondary">All scheme fees, renewals and special approvals</antd.Typography.Text>
        </div>
        <antd.Space>
          <antd.Button icon={<DownloadOutlined />}>Export CSV</antd.Button>
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
              columns={[
                { title: 'Date', dataIndex: 'date', render: v => new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                { title: 'Payment ID', dataIndex: 'id', render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
                { title: 'Application', dataIndex: 'app', render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
                { title: 'Method', dataIndex: 'method', render: v => <antd.Space size={6}>{methodIcon(v)}<span>{v}</span></antd.Space> },
                { title: 'Amount', dataIndex: 'amount', align: 'right', render: v => <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>RM {v.toLocaleString('en-MY')}.00</span> },
                { title: 'Status', dataIndex: 'status', render: s => s === 'paid' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Paid</antd.Tag> : <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Pending</antd.Tag> },
                { title: '', render: () => <antd.Space><antd.Tooltip title="Download invoice"><antd.Button size="small" icon={<DownloadOutlined />} /></antd.Tooltip><antd.Tooltip title="Download receipt"><antd.Button size="small" icon={<FilePdfOutlined />} /></antd.Tooltip></antd.Space> },
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
              <div style={{ fontWeight: 600 }}>Axiata Digital Sdn Bhd</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>Level 21, Axiata Tower<br />No. 9 Jalan Stesen Sentral 5<br />KL Sentral, 50470 Kuala Lumpur</div>
              <antd.Divider style={{ margin: '12px 0' }} />
              <div><antd.Typography.Text type="secondary">SST Number</antd.Typography.Text> W10-1808-32000123</div>
              <div><antd.Typography.Text type="secondary">Billing Email</antd.Typography.Text> finance@axiatadigital.com.my</div>
            </div>
            <antd.Button type="link" icon={<EditOutlined />} style={{ padding: 0, marginTop: 8 }}>Edit</antd.Button>
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

// ============ PROFILE & SETTINGS ============
SCREENS.profile = function Profile({ nav }) {
  const [tab, setTab] = React.useState('profile');
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const tabs = [
    { k: 'profile', t: 'My Profile', icon: <UserOutlined /> },
    { k: 'organization', t: 'Organisation', icon: <ShopOutlined /> },
    { k: 'team', t: 'Team Members', icon: <TeamOutlined /> },
    { k: 'security', t: 'Security & Access', icon: <SafetyOutlined /> },
    { k: 'notifications', t: 'Notifications', icon: <BellOutlined /> },
    { k: 'api', t: 'API & Integrations', icon: <ApartmentOutlined /> },
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
          {tab === 'profile' && <ProfileTab />}
          {tab === 'organization' && <OrgTab />}
          {tab === 'team' && <TeamTab onInvite={() => setInviteOpen(true)} />}
          {tab === 'security' && <SecurityTab />}
          {tab === 'notifications' && <NotifTab />}
          {tab === 'api' && <ApiTab />}
        </antd.Col>
      </antd.Row>

      <InviteDrawer open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
};

function ProfileTab() {
  return (
    <antd.Card title="My Profile" bordered extra={<antd.Button icon={<EditOutlined />}>Edit</antd.Button>}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
        <antd.Avatar size={72} style={{ background: 'var(--color-primary)', fontSize: 28 }}>NA</antd.Avatar>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Nurul Aisyah binti Ahmad</div>
          <antd.Space size={8} style={{ marginTop: 4 }}>
            <antd.Tag color="blue" icon={<SafetyOutlined />}>Administrator</antd.Tag>
            <antd.Tag icon={<CheckCircleOutlined />} color="green">Verified</antd.Tag>
          </antd.Space>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>Member since 15 Jan 2024 · Last login 2 hours ago from Kuala Lumpur</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <antd.Button icon={<UploadOutlined />}>Change avatar</antd.Button>
        </div>
      </div>
      <antd.Descriptions bordered column={2} size="middle" items={[
        { key: '1', label: 'Full Name', children: 'Nurul Aisyah binti Ahmad' },
        { key: '2', label: 'Email', children: <span><MailOutlined style={{ marginRight: 6 }} />nurul.aisyah@axiatadigital.com.my</span> },
        { key: '3', label: 'Phone', children: <span><PhoneOutlined style={{ marginRight: 6 }} />+60 12-345 6789</span> },
        { key: '4', label: 'NRIC', children: '880512-14-5678' },
        { key: '5', label: 'Position', children: 'Head of Regulatory Compliance' },
        { key: '6', label: 'Department', children: 'Product Certification' },
        { key: '7', label: 'Language', children: 'English (primary) · Bahasa Malaysia' },
        { key: '8', label: 'Time Zone', children: 'Asia/Kuala_Lumpur (GMT+8)' },
      ]} />
    </antd.Card>
  );
}

function OrgTab() {
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
  const team = MOCK.teamMembers.filter(m => !q || (m.name + m.email + m.role).toLowerCase().includes(q.toLowerCase()));
  const roleColor = { Administrator: 'purple', 'PIC (Technical)': 'blue', Submitter: 'cyan', Finance: 'gold' };

  return (
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
        columns={[
          { title: 'Name', render: (_, m) => (
            <antd.Space>
              <antd.Avatar style={{ background: 'var(--color-primary)' }}>{m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</antd.Avatar>
              <div>
                <div style={{ fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{m.email}</div>
              </div>
            </antd.Space>
          ) },
          { title: 'Role', dataIndex: 'role', render: r => <antd.Tag color={roleColor[r] || 'default'}>{r}</antd.Tag> },
          { title: 'Status', dataIndex: 'status', render: s => s === 'active' ? <antd.Tag color="green" icon={<CheckCircleOutlined />}>Active</antd.Tag> : <antd.Tag color="orange" icon={<ClockCircleOutlined />}>Invite Sent</antd.Tag> },
          { title: 'Joined', dataIndex: 'joined', render: v => new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
          { title: 'Last Active', dataIndex: 'lastActive', render: v => v ? new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : <antd.Typography.Text type="secondary">—</antd.Typography.Text> },
          { title: '', render: (_, m) => (
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
  );
}

function SecurityTab() {
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
        <antd.Button icon={<PlusOutlined />} style={{ marginTop: 8 }}>Add method</antd.Button>
      </antd.Card>

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

Object.assign(window, { SCREENS });
