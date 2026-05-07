// ═══════════════════════════════════════════════════════════════════════════════
// screens-m.jsx — Team Lead dedicated screens
// Sprint 18: role-dedicated screens (no branching, always TL mode)
// Screens: tl-dashboard, tl-queue
// ═══════════════════════════════════════════════════════════════════════════════

// ──── TL DASHBOARD ───────────────────────────────────────────────────────────
SCREENS['tl-dashboard'] = function TLDashboard({ nav, currentUser }) {
  const myId   = currentUser?.id || 'OFF-001';
  const myName = currentUser?.name || 'En. Faisal Rahman';
  const team   = currentUser?.team || 'CPPG-TL-01';

  const officerPerf = MOCK.officerPerformance || [];
  const myPerf      = officerPerf.find(o => o.id === myId) || officerPerf[0] || {};
  const teamMembers = officerPerf.filter(o => o.team === team && o.id !== myId);

  const allQueue    = MOCK.officerQueue || [];
  const myQueue     = allQueue.filter(q => q.assignedTo === myId);
  const teamQueue   = allQueue.filter(q => q.assignedTo != null);
  const unassigned  = allQueue.filter(q => q.assignedTo == null);
  const modQueue    = (MOCK.modificationQueue || []).filter(q => q.assignedTo === myId);
  const urgentCount = myQueue.filter(q => q.slaHours <= 12).length;

  const today    = new Date();
  const greeting = today.getHours() < 12 ? 'Selamat pagi' : today.getHours() < 18 ? 'Selamat tengah hari' : 'Selamat petang';

  const kpis = [
    { label: 'My Queue',           value: myQueue.length,    delta: urgentCount > 0 ? `${urgentCount} urgent (<12h SLA)` : 'All clear',         color: urgentCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' },
    { label: 'Team Pending',       value: teamQueue.length,  delta: `${unassigned.length} unassigned — needs routing`,                            color: unassigned.length > 0 ? 'var(--color-warning)' : 'var(--color-text-primary)' },
    { label: 'Team Approvals Today', value: 8,               delta: '↑ 2 vs yesterday',                                                          color: 'var(--color-success)' },
    { label: 'Team SLA',           value: `${myPerf.slaCompliance || 96}%`, delta: `Monthly target 95% · ${teamMembers.length + 1} officers`,    color: (myPerf.slaCompliance || 96) >= 95 ? 'var(--color-success)' : 'var(--color-warning)' },
  ];

  const recentDecisions = [
    { id: 'APP-0426-00079', product: 'OPPO Find X7 Ultra',    officer: 'Pn. Rosnah Idris',    decision: 'Approved',            ts: '18 Apr 2026 · 15:42', scheme: 'A' },
    { id: 'APP-0426-00076', product: 'Redmi Note 13 Pro',     officer: 'En. Syahrul Azlan',   decision: 'Iteration Requested', ts: '17 Apr 2026 · 11:28', scheme: 'B' },
    { id: 'APP-0426-00074', product: 'TP-Link Deco BE85',     officer: 'Pn. Rosnah Idris',    decision: 'Approved',            ts: '16 Apr 2026 · 09:14', scheme: 'C' },
    { id: 'APP-0426-00071', product: 'Sony WH-1000XM6',       officer: 'En. Syahrul Azlan',   decision: 'Rejected',            ts: '15 Apr 2026 · 16:55', scheme: 'B' },
    { id: 'APP-0426-00069', product: 'Huawei MatePad Pro 13', officer: 'En. Ahmad Rashid',    decision: 'Approved',            ts: '14 Apr 2026 · 14:03', scheme: 'A' },
  ];
  const decisionColor = { Approved: 'green', 'Iteration Requested': 'orange', Rejected: 'red', Returned: 'orange' };

  const [assignOpen, setAssignOpen]   = React.useState(false);
  const [assignTarget, setAssignTarget] = React.useState(null);
  const [overrides, setOverrides]     = React.useState({});
  const officerById = React.useMemo(() => {
    const m = {};
    officerPerf.forEach(o => { m[o.id] = o; });
    return m;
  }, [officerPerf]);

  return (
    <div style={{ padding: 32, maxWidth: 1300, margin: '0 auto' }}>
      {/* Welcome header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <antd.Typography.Title level={3} style={{ margin: 0 }}>{greeting}, {myName.split(' ')[1] || myName}</antd.Typography.Title>
            <antd.Tag color="purple" icon={<CrownOutlined />} style={{ fontSize: 11, fontWeight: 700 }}>Team Lead</antd.Tag>
          </div>
          <antd.Typography.Text type="secondary">{today.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {team} · MCMC</antd.Typography.Text>
        </div>
        <antd.Space wrap>
          <antd.Button icon={<FlagOutlined />} onClick={() => nav('tl-review-list')}>View Team Queue</antd.Button>
          {myQueue.length > 0 && <antd.Button type="primary" icon={<EyeOutlined />} onClick={() => nav('tl-review-list')}>Start Review</antd.Button>}
        </antd.Space>
      </div>

      {/* Unassigned alert */}
      {unassigned.length > 0 && (
        <antd.Alert type="warning" showIcon icon={<ExclamationCircleOutlined />} style={{ marginBottom: 20 }}
          message={`${unassigned.length} application${unassigned.length > 1 ? 's' : ''} awaiting assignment`}
          description="These applications are in the queue but not yet assigned to an officer. Route them to prevent SLA breaches."
          action={<antd.Button size="small" type="primary" onClick={() => nav('tl-review-list')}>Go to Queue →</antd.Button>}
        />
      )}

      {/* KPI row */}
      <antd.Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card" onClick={() => nav('tl-review-list')} style={{ cursor: 'pointer' }}>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
              <div className="kpi-delta">{k.delta}</div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Row gutter={[16, 16]}>
        {/* Left column */}
        <antd.Col xs={24} lg={16}>
          <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>

            {/* My assigned + unassigned to route */}
            {(() => {
              const [taskFilter, setTaskFilter] = React.useState('mine');
              const combined = taskFilter === 'mine' ? [...myQueue, ...modQueue]
                : taskFilter === 'unassigned' ? unassigned
                : [...myQueue, ...modQueue, ...unassigned];
              return (
                <antd.Card bordered
                  title={<antd.Space><FlagOutlined style={{ color: 'var(--color-primary)' }} /> Applications</antd.Space>}
                  extra={<antd.Button size="small" onClick={() => nav('tl-review-list')}>Full Queue →</antd.Button>}>
                  <antd.Segmented value={taskFilter} onChange={setTaskFilter} size="small" style={{ marginBottom: 12 }} options={[
                    { label: `My assigned (${myQueue.length + modQueue.length})`, value: 'mine' },
                    { label: `Unassigned (${unassigned.length})`, value: 'unassigned' },
                    { label: `All (${myQueue.length + modQueue.length + unassigned.length})`, value: 'all' },
                  ]} />
                  {combined.length === 0 ? (
                    <antd.Result status="success" title="All clear" subTitle="No pending applications." style={{ padding: '16px 0' }} />
                  ) : (
                    <antd.Table rowKey="id" dataSource={combined} pagination={{ pageSize: 5, size: 'small', showSizeChanger: false }} size="small"
                      columns={[
                        { title: 'ID', dataIndex: 'id', width: 140, render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
                        { title: 'Product', dataIndex: 'product', ellipsis: true, render: (v, r) => <div><div style={{ fontWeight: 600, fontSize: 12 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{r.applicant}</div></div> },
                        { title: 'Scheme', dataIndex: 'scheme', width: 80, render: s => s ? <antd.Tag color={{ A: 'red', B: 'orange', C: 'green', SA: 'purple' }[s] || 'blue'} style={{ fontSize: 10, margin: 0 }}>{s === 'SA' ? 'SA' : `Sch ${s}`}</antd.Tag> : <antd.Tag color="blue" style={{ fontSize: 10 }}>MOD</antd.Tag> },
                        { title: 'SLA', dataIndex: 'slaHours', width: 70, render: h => h ? <antd.Tag color={h <= 12 ? 'red' : h <= 24 ? 'orange' : 'default'} style={{ fontSize: 10, margin: 0 }}>{h}h</antd.Tag> : <antd.Tag style={{ fontSize: 10, margin: 0 }}>—</antd.Tag> },
                        { title: 'Assigned', dataIndex: 'assignedTo', width: 100, render: (id, row) => {
                          const eff = overrides[row.id] ?? id;
                          return eff
                            ? <antd.Tag style={{ fontSize: 10 }}>{(officerById[eff]?.name || eff).split(' ').slice(-1)[0]}</antd.Tag>
                            : <antd.Button className="assign-btn" size="small" type="primary" icon={<TeamOutlined />} style={{ fontSize: 10, padding: '0 6px' }}
                                onClick={e => { e.stopPropagation(); setAssignTarget(row.id); setAssignOpen(true); }}>Assign</antd.Button>;
                        }},
                        { title: '', width: 80, render: (_, r) => <antd.Button size="small" icon={<EyeOutlined />} onClick={e => { e.stopPropagation(); nav('tl-review-list'); }}>Review</antd.Button> },
                      ]}
                    />
                  )}
                </antd.Card>
              );
            })()}

            {/* Team recent decisions */}
            <antd.Card bordered title={<antd.Space><HistoryOutlined style={{ color: 'var(--color-text-muted)' }} /> Team Recent Decisions</antd.Space>}>
              {recentDecisions.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < recentDecisions.length - 1 ? '1px solid var(--color-divider)' : 'none' }}>
                  <antd.Tag color={decisionColor[d.decision] || 'default'} style={{ fontSize: 11, margin: 0, minWidth: 100, textAlign: 'center' }}>{d.decision}</antd.Tag>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{d.product}</span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 8 }}>{d.id}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{d.officer} · {d.ts}</div>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>

        {/* Right column */}
        <antd.Col xs={24} lg={8}>
          <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>
            {/* Quick actions */}
            <antd.Card bordered title="Quick Actions" bodyStyle={{ padding: '12px 16px' }}>
              <antd.Space direction="vertical" style={{ width: '100%' }} size={8}>
                {myQueue.length > 0 && <antd.Button block type="primary" icon={<EyeOutlined />} onClick={() => nav('tl-review-list')}>Start Review ({myQueue.length})</antd.Button>}
                <antd.Button block icon={<FlagOutlined />} onClick={() => nav('tl-review-list')}>Team Review Queue</antd.Button>
                <antd.Button block icon={<BarChartOutlined />} onClick={() => nav('reports')}>Reports & Analytics</antd.Button>
                <antd.Button block icon={<AuditOutlined />} onClick={() => nav('audit')}>Audit Log</antd.Button>
                <antd.Button block icon={<SettingOutlined />} onClick={() => nav('admin-config')}>Configuration</antd.Button>
                <antd.Button block icon={<SettingOutlined />} onClick={() => nav('profile')}>Profile & Settings</antd.Button>
              </antd.Space>
            </antd.Card>

            {/* Team snapshot */}
            <antd.Card bordered title={<antd.Space><TeamOutlined /> Team Snapshot ({team})</antd.Space>}
              extra={<antd.Button size="small" onClick={() => nav('reports')}>Full Report</antd.Button>}>
              {teamMembers.slice(0, 5).map((m, i) => {
                const mQueue = allQueue.filter(q => q.assignedTo === m.id).length;
                const slaOk  = m.slaCompliance >= 95;
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < Math.min(teamMembers.length, 5) - 1 ? '1px solid var(--color-divider)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <antd.Avatar size={28} style={{ background: slaOk ? 'var(--color-primary)' : 'var(--color-warning)', fontSize: 11 }}>{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</antd.Avatar>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{m.name.split(' ').slice(-2).join(' ')}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{mQueue} in queue · {m.slaCompliance}% SLA</div>
                      </div>
                    </div>
                    <antd.Tag color={slaOk ? 'green' : 'orange'} style={{ fontSize: 10 }}>{m.slaCompliance}%</antd.Tag>
                  </div>
                );
              })}
            </antd.Card>

            {/* My performance */}
            <antd.Card bordered title="My Performance" bodyStyle={{ padding: '16px' }}>
              {[
                { label: 'Total Approved', value: myPerf.approved || 0, color: 'var(--color-success)' },
                { label: 'Total Rejected', value: myPerf.rejected || 0, color: 'var(--color-danger)' },
                { label: 'AI Overrides',   value: myPerf.aiOverrides || 0, color: 'var(--color-warning)' },
                { label: 'Avg Turnaround', value: `${myPerf.avgTurnaround || 0}h`, color: 'var(--color-text-primary)' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < 3 ? '1px solid var(--color-divider)' : 'none' }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>
      </antd.Row>

      <AssignOfficerModal open={assignOpen} onClose={() => setAssignOpen(false)}
        applicationId={assignTarget}
        currentAssigneeId={assignTarget ? (overrides[assignTarget] ?? (allQueue.find(r => r.id === assignTarget)?.assignedTo)) : null}
        onAssign={officerId => {
          setOverrides(prev => ({ ...prev, [assignTarget]: officerId }));
          const oName = (MOCK.officerPerformance || []).find(o => o.id === officerId)?.name;
          antd.message.success(`Assigned ${assignTarget} to ${oName}`);
        }} />
    </div>
  );
};

// ──── TL QUEUE ────────────────────────────────────────────────────────────────
SCREENS['tl-queue'] = function TLQueue({ nav, currentUser }) {
  const myId   = currentUser?.id || 'OFF-001';
  const team   = currentUser?.team || 'CPPG-TL-01';

  const officerPerf = MOCK.officerPerformance || [];
  const officerById = React.useMemo(() => {
    const m = {};
    officerPerf.forEach(o => { m[o.id] = o; });
    return m;
  }, [officerPerf]);
  const myPerf = officerById[myId] || {};

  const [overrides, setOverrides] = React.useState({});
  const resolved = React.useMemo(
    () => (MOCK.officerQueue || []).map(r => ({ ...r, assignedTo: overrides[r.id] ?? r.assignedTo })),
    [overrides]
  );

  const myCount         = resolved.filter(x => x.assignedTo === myId).length;
  const teamAssigned    = resolved.filter(x => x.assignedTo != null).length;
  const unassignedCount = resolved.filter(x => x.assignedTo == null).length;
  const autoCertList    = MOCK.autoCertified || [];
  const modList         = MOCK.modificationQueue || [];

  const [filter, setFilter]     = React.useState('mine');
  const [qSearch, setQSearch]   = React.useState('');
  const [qScheme, setQScheme]   = React.useState([]);
  const [qPriority, setQPriority] = React.useState('all');
  const [qAi, setQAi]           = React.useState('all');
  const [showAdv, setShowAdv]   = React.useState(false);
  const [assignOpen, setAssignOpen] = React.useState(false);
  const [assignTarget, setAssignTarget] = React.useState(null);
  const [modDecisions, setModDecisions] = React.useState({});

  const baseList = React.useMemo(() => {
    if (filter === 'mine')       return resolved.filter(x => x.assignedTo === myId);
    if (filter === 'team')       return resolved.filter(x => x.assignedTo != null);
    if (filter === 'unassigned') return resolved.filter(x => x.assignedTo == null);
    return resolved;
  }, [filter, myId, resolved]);

  const list = React.useMemo(() => {
    let r = baseList;
    if (qSearch)             r = r.filter(x => [x.id, x.applicant, x.product].join(' ').toLowerCase().includes(qSearch.toLowerCase()));
    if (qScheme.length)      r = r.filter(x => qScheme.includes(x.scheme));
    if (qPriority !== 'all') r = r.filter(x => x.priority === qPriority);
    if (qAi === 'good')      r = r.filter(x => x.aiScore >= 90);
    else if (qAi === 'warn') r = r.filter(x => x.aiScore >= 70 && x.aiScore < 90);
    else if (qAi === 'poor') r = r.filter(x => x.aiScore < 70);
    return r;
  }, [baseList, qSearch, qScheme, qPriority, qAi]);

  const advCount = qScheme.length + (qPriority !== 'all' ? 1 : 0) + (qAi !== 'all' ? 1 : 0);

  const kpis = [
    { l: 'In My Queue',         v: myCount,         d: myCount ? '1 urgent (SLA < 12h)' : 'All clear',                      warn: myCount > 0 },
    { l: 'Team Pending',        v: resolved.length, d: `${unassignedCount} unassigned`,                                       color: unassignedCount > 0 ? 'var(--color-warning)' : undefined },
    { l: 'Approved Today',      v: 8,               d: 'Avg turnaround 4.2 hrs',                                             color: 'var(--color-success)' },
    { l: 'Team SLA Compliance', v: `${myPerf.slaCompliance || 96}%`, d: 'Monthly target 95%',                               color: (myPerf.slaCompliance || 96) >= 95 ? 'var(--color-success)' : 'var(--color-warning)' },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600, marginBottom: 4 }}>
        Team Lead · {currentUser?.name || ''} · {team}
      </div>
      <antd.Typography.Title level={3} style={{ margin: '0 0 20px' }}>Review Queue — Team View</antd.Typography.Title>

      <antd.Row gutter={[16,16]} style={{ marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card">
              <div className="kpi-label">{k.l}</div>
              <div className="kpi-value" style={{ color: k.warn ? 'var(--color-warning)' : (k.color || 'inherit') }}>{k.v}</div>
              <div className="kpi-delta">{k.d}</div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Card bordered>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <antd.Segmented value={filter} onChange={v => { setFilter(v); setQSearch(''); setQScheme([]); setQPriority('all'); setQAi('all'); }} options={[
            { label: `My queue (${myCount})`,          value: 'mine' },
            { label: `Team queue (${teamAssigned})`,   value: 'team' },
            { label: `Unassigned (${unassignedCount})`, value: 'unassigned' },
            { label: <antd.Space size={4}><RobotOutlined />{`Auto-cert (${autoCertList.length})`}</antd.Space>, value: 'auto' },
            { label: <antd.Space size={4}><FormOutlined />{`Modifications (${modList.length})`}</antd.Space>,   value: 'modification' },
          ]} />
          <antd.Space wrap>
            <antd.Input placeholder="Search ID, applicant, product…" prefix={<SearchOutlined style={{ color: 'var(--color-text-muted)' }} />}
              value={qSearch} onChange={e => setQSearch(e.target.value)} allowClear style={{ width: 240 }} />
            <antd.Badge count={advCount} size="small">
              <Button icon={<FilterOutlinedIcon />} type={advCount > 0 ? 'primary' : 'default'} onClick={() => setShowAdv(v => !v)}>Filters</Button>
            </antd.Badge>
          </antd.Space>
        </div>

        {showAdv && (
          <div style={{ padding: '12px 16px', background: 'var(--color-bg-elevated)', borderRadius: 8, marginBottom: 16, border: '1px solid var(--color-border)' }}>
            <antd.Space wrap size={[24, 8]} align="center">
              <antd.Space size={8} align="center">
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Scheme</span>
                <antd.Checkbox.Group value={qScheme} onChange={setQScheme} options={[
                  { label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }, { label: 'SA', value: 'SA' },
                ]} />
              </antd.Space>
              <antd.Space size={8} align="center">
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Priority</span>
                <antd.Select value={qPriority} onChange={setQPriority} size="small" style={{ width: 110 }} options={[
                  { label: 'All', value: 'all' }, { label: 'High', value: 'high' }, { label: 'Normal', value: 'normal' }, { label: 'Low', value: 'low' },
                ]} />
              </antd.Space>
              <antd.Space size={8} align="center">
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>AI Score</span>
                <antd.Select value={qAi} onChange={setQAi} size="small" style={{ width: 150 }} options={[
                  { label: 'All', value: 'all' }, { label: 'Good (≥90)', value: 'good' }, { label: 'Warning (70–89)', value: 'warn' }, { label: 'Poor (<70)', value: 'poor' },
                ]} />
              </antd.Space>
              {advCount > 0 && (
                <Button size="small" type="link" style={{ padding: 0 }}
                  onClick={() => { setQScheme([]); setQPriority('all'); setQAi('all'); }}>Clear filters</Button>
              )}
            </antd.Space>
          </div>
        )}

        {filter === 'auto' ? (
          <>
            <antd.Alert type="info" showIcon icon={<RobotOutlined />} style={{ marginBottom: 12 }}
              message="Auto-certified applications (Scheme C, AI score ≥ 90)"
              description="Certified automatically per URS §5.2.4. No officer action required." />
            <antd.Table rowKey="id" dataSource={autoCertList} pagination={false} scroll={{ x: 'max-content' }}
              columns={[
                { title: 'App ID',    dataIndex: 'id',        width: 150, render: v => <antd.Typography.Text code style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
                { title: 'Applicant', dataIndex: 'applicant', width: 220 },
                { title: 'Product',   dataIndex: 'product',   width: 220 },
                { title: 'AI Score',  dataIndex: 'aiScore',   width: 90,  render: s => <antd.Tag color="green" style={{ fontWeight: 700 }}>{s}</antd.Tag> },
                { title: 'RCN Issued', dataIndex: 'rcn',      width: 150, render: v => <antd.Typography.Text code style={{ fontSize: 12, color: 'var(--color-success)' }}>{v}</antd.Typography.Text> },
                { title: 'Issued At', dataIndex: 'issuedAt',  width: 160, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</span> },
                { title: 'Status',    width: 140, render: () => <antd.Tag color="green" icon={<RobotOutlined />}>Auto-certified</antd.Tag> },
              ]}
            />
          </>
        ) : filter === 'modification' ? (
          <>
            <antd.Alert type="info" showIcon icon={<FormOutlined />} style={{ marginBottom: 12 }}
              message="Modification requests" description="Review proposed certificate changes and issue Accept / Not Accept decision. (URS §5.6.3)" />
            <antd.Table rowKey="id" dataSource={modList} pagination={false} scroll={{ x: 'max-content' }}
              columns={[
                { title: 'Mod ID',   dataIndex: 'id',       width: 150, render: v => <antd.Typography.Text code style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
                { title: 'RCN',      dataIndex: 'rcn',      width: 140, render: v => <antd.Typography.Text code style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
                { title: 'Applicant',dataIndex: 'applicant',width: 200 },
                { title: 'Product',  dataIndex: 'product',  width: 200 },
                { title: 'Type',     dataIndex: 'change',   width: 80,  render: v => <antd.Tag color="blue">{v}</antd.Tag> },
                { title: 'Proposed Change', dataIndex: 'reason', width: 300, render: v => <span style={{ fontSize: 12 }}>{v}</span> },
                { title: 'AI Score', dataIndex: 'aiScore',  width: 90,  render: s => <antd.Tag color={s >= 90 ? 'green' : s >= 70 ? 'orange' : 'red'} style={{ fontWeight: 600 }}>{s}</antd.Tag> },
                { title: 'Decision', width: 220, render: (_, row) => {
                  const d = modDecisions[row.id];
                  if (d) return <antd.Tag color={d === 'accepted' ? 'green' : 'red'} style={{ fontWeight: 600 }}>{d === 'accepted' ? 'Accepted' : 'Not Accepted'}</antd.Tag>;
                  return (
                    <antd.Space size={6}>
                      <antd.Button size="small" type="primary" icon={<CheckCircleOutlined />}
                        onClick={() => { setModDecisions(p => ({ ...p, [row.id]: 'accepted' })); antd.message.success(`Modification ${row.id} accepted`); }}>Accept</antd.Button>
                      <antd.Button size="small" danger icon={<CloseCircleOutlined />}
                        onClick={() => { setModDecisions(p => ({ ...p, [row.id]: 'rejected' })); antd.message.warning(`Modification ${row.id} returned`); }}>Not Accept</antd.Button>
                    </antd.Space>
                  );
                }},
              ]}
            />
          </>
        ) : (
          <antd.Table rowKey="id" dataSource={list} pagination={false} scroll={{ x: 'max-content' }}
            onRow={row => ({ onClick: e => { if (e.target.closest('.assign-btn')) return; nav('tl-review-list'); }, style: { cursor: 'pointer' } })}
            columns={[
              { title: 'App ID',    dataIndex: 'id',       width: 140, render: v => <antd.Typography.Text code style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{v}</antd.Typography.Text> },
              { title: 'Scheme',    dataIndex: 'scheme',   width: 130, render: s => <antd.Tag style={{ fontSize: 11 }}>{s === 'SA' ? 'Special Approval' : `Scheme ${s}`}</antd.Tag> },
              { title: 'Applicant', dataIndex: 'applicant', width: 200 },
              { title: 'Product',   dataIndex: 'product',  width: 220 },
              { title: 'AI Score',  dataIndex: 'aiScore',  width: 90,  render: s => <antd.Tag color={s >= 90 ? 'green' : s >= 70 ? 'orange' : 'red'} style={{ fontWeight: 600 }}>{s}</antd.Tag> },
              { title: 'Priority',  dataIndex: 'priority', width: 90,  render: p => <antd.Tag color={p === 'high' ? 'red' : p === 'critical' ? 'volcano' : p === 'low' ? 'default' : 'blue'}>{p}</antd.Tag> },
              { title: 'SLA',       dataIndex: 'slaHours', width: 90,  render: h => <antd.Tag color={h < 12 ? 'red' : h < 24 ? 'orange' : 'default'} style={{ whiteSpace: 'nowrap' }}>{h}h left</antd.Tag> },
              { title: 'Assigned',  dataIndex: 'assignedTo', width: 130, render: (id, row) => {
                const eff = overrides[row.id] ?? id;
                return eff
                  ? <antd.Tooltip title={officerById[eff]?.name}><antd.Tag>{officerById[eff]?.name?.split(' ').slice(-1)[0] || eff}</antd.Tag></antd.Tooltip>
                  : <antd.Button className="assign-btn" size="small" type="primary" icon={<TeamOutlined />}
                      onClick={e => { e.stopPropagation(); setAssignTarget(row.id); setAssignOpen(true); }}>Assign…</antd.Button>;
              }},
              { title: 'Submitted', dataIndex: 'submitted', width: 140, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}</span> },
            ]}
          />
        )}
      </antd.Card>

      <AssignOfficerModal open={assignOpen} onClose={() => setAssignOpen(false)}
        applicationId={assignTarget}
        currentAssigneeId={assignTarget ? (overrides[assignTarget] ?? resolved.find(r => r.id === assignTarget)?.assignedTo) : null}
        onAssign={officerId => {
          setOverrides(prev => ({ ...prev, [assignTarget]: officerId }));
          antd.message.success(`Assigned ${assignTarget} to ${officerById[officerId]?.name}`);
        }} />
    </div>
  );
};

// ──── TL REVIEW LIST (split-pane inbox for Team Lead) ────────────────────────
SCREENS['tl-review-list'] = function TLReviewList({ nav, tweaks, currentUser }) {
  const myId   = currentUser?.id || 'OFF-001';
  const team   = currentUser?.team || 'CPPG-TL-01';
  const OfficerReviewPanelFn = window.OfficerReviewPanel;

  const officerPerf = MOCK.officerPerformance || [];
  const officerById = React.useMemo(() => {
    const m = {};
    officerPerf.forEach(o => { m[o.id] = o; });
    return m;
  }, [officerPerf]);

  const [overrides, setOverrides] = React.useState({});
  const resolved = React.useMemo(
    () => (MOCK.officerQueue || []).map(r => ({ ...r, assignedTo: overrides[r.id] ?? r.assignedTo })),
    [overrides]
  );

  const myQueue         = resolved.filter(x => x.assignedTo === myId);
  const teamQueue       = resolved.filter(x => x.assignedTo != null);
  const unassigned      = resolved.filter(x => x.assignedTo == null);
  const modList         = MOCK.modificationQueue || [];

  const [filter, setFilter]       = React.useState('mine');
  const [selectedId, setSelectedId] = React.useState(() => myQueue[0]?.id || null);
  const [decided, setDecided]     = React.useState({});
  const [modDecisions, setModDecisions] = React.useState({});
  const [assignOpen, setAssignOpen]   = React.useState(false);
  const [assignTarget, setAssignTarget] = React.useState(null);

  const baseList = filter === 'mine'         ? myQueue
    : filter === 'team'         ? teamQueue
    : filter === 'unassigned'   ? unassigned
    : filter === 'modification' ? modList
    : resolved;

  const schemeColor = { A: 'red', B: 'orange', C: 'green', SA: 'purple' };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* LEFT PANE */}
      <div style={{ width: 380, flexShrink: 0, borderRight: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-elevated)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-divider)', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .4, fontWeight: 600, marginBottom: 6 }}>Team Lead · {team}</div>
          <antd.Segmented size="small" value={filter} onChange={v => { setFilter(v); setSelectedId(null); }} style={{ width: '100%' }} options={[
            { label: `Mine (${myQueue.length})`,         value: 'mine' },
            { label: `Team (${teamQueue.length})`,       value: 'team' },
            { label: `Unassigned (${unassigned.length})`, value: 'unassigned' },
            { label: `Mods (${modList.length})`,         value: 'modification' },
          ]} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {baseList.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>No items in this view</div>
          ) : (
            baseList.map(row => {
              const isSelected = selectedId === row.id;
              const isDecided  = !!decided[row.id];
              const effAssigned = overrides[row.id] ?? row.assignedTo;
              const assignee    = officerById[effAssigned];

              if (filter === 'modification') {
                const d = modDecisions[row.id];
                return (
                  <div key={row.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-divider)', background: '#fff' }}>
                    <antd.Typography.Text code style={{ fontSize: 11 }}>{row.id}</antd.Typography.Text>
                    <antd.Tag color="blue" style={{ fontSize: 10, margin: '0 0 0 6px' }}>{row.change}</antd.Tag>
                    <div style={{ fontWeight: 600, fontSize: 13, margin: '4px 0 2px' }}>{row.product}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 6 }}>{row.applicant}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 8 }}>{row.reason}</div>
                    {d ? (
                      <antd.Tag color={d === 'accepted' ? 'green' : 'red'}>{d === 'accepted' ? 'Accepted' : 'Not Accepted'}</antd.Tag>
                    ) : (
                      <antd.Space size={6}>
                        <antd.Button size="small" type="primary" icon={<CheckCircleOutlined />}
                          onClick={() => { setModDecisions(p => ({ ...p, [row.id]: 'accepted' })); antd.message.success(`Modification ${row.id} accepted`); }}>Accept</antd.Button>
                        <antd.Button size="small" danger icon={<CloseCircleOutlined />}
                          onClick={() => { setModDecisions(p => ({ ...p, [row.id]: 'rejected' })); antd.message.warning(`Modification ${row.id} not accepted`); }}>Not Accept</antd.Button>
                      </antd.Space>
                    )}
                  </div>
                );
              }

              return (
                <div key={row.id} onClick={() => setSelectedId(row.id)}
                  style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--color-divider)', background: isSelected ? 'rgba(11,79,145,0.06)' : '#fff', borderLeft: isSelected ? '3px solid var(--color-primary)' : '3px solid transparent', transition: 'background 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <antd.Typography.Text code style={{ fontSize: 11 }}>{row.id}</antd.Typography.Text>
                    <antd.Tag color={schemeColor[row.scheme] || 'blue'} style={{ fontSize: 10, margin: 0 }}>{row.scheme === 'SA' ? 'SA' : `Sch ${row.scheme}`}</antd.Tag>
                    {isDecided && <antd.Tag color="green" style={{ fontSize: 10, margin: 0 }}>Decided</antd.Tag>}
                    {row.slaHours <= 12 && !isDecided && <antd.Tag color="red" style={{ fontSize: 10, margin: 0 }}>Urgent</antd.Tag>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.product}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.applicant}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <antd.Tag color={row.priority === 'high' ? 'red' : 'blue'} style={{ fontSize: 10, margin: 0 }}>{row.priority}</antd.Tag>
                    <antd.Tag color={row.slaHours < 12 ? 'red' : row.slaHours < 24 ? 'orange' : 'default'} style={{ fontSize: 10, margin: 0 }}>{row.slaHours}h SLA</antd.Tag>
                    {assignee ? (
                      <antd.Tag color={assignee.role === 'team-lead' ? 'purple' : 'default'} style={{ fontSize: 10, margin: 0 }}>{assignee.name.split(' ').slice(-1)[0]}</antd.Tag>
                    ) : (
                      <antd.Button size="small" type="primary"
                        style={{ fontSize: 10, padding: '0 6px', height: 20, lineHeight: '18px' }}
                        onClick={e => { e.stopPropagation(); setAssignTarget(row.id); setAssignOpen(true); }}>
                        Assign…
                      </antd.Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT PANE */}
      <div style={{ flex: 1, overflow: 'auto', background: 'var(--color-bg-base)' }}>
        {selectedId && filter !== 'modification' && OfficerReviewPanelFn ? (
          <OfficerReviewPanelFn key={selectedId} nav={nav} tweaks={tweaks} currentUser={currentUser} rowId={selectedId}
            onDecision={(id) => {
              setDecided(prev => ({ ...prev, [id]: true }));
              const next = baseList.find(r => !decided[r.id] && r.id !== id);
              if (next) setSelectedId(next.id);
            }}
          />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <antd.Result icon={<FileSearchOutlined style={{ color: 'var(--color-text-muted)', fontSize: 48 }} />}
              title={filter === 'modification' ? 'Modification decisions inline' : 'Select an application'}
              subTitle={filter === 'modification' ? 'Accept or Not Accept using the buttons in the list on the left.' : 'Click an application in the queue to load its review panel.'} />
          </div>
        )}
      </div>

      <AssignOfficerModal open={assignOpen} onClose={() => setAssignOpen(false)}
        applicationId={assignTarget}
        currentAssigneeId={assignTarget ? (overrides[assignTarget] ?? resolved.find(r => r.id === assignTarget)?.assignedTo) : null}
        onAssign={officerId => {
          setOverrides(prev => ({ ...prev, [assignTarget]: officerId }));
          antd.message.success(`Assigned ${assignTarget} to ${officerById[officerId]?.name}`);
        }} />
    </div>
  );
};
