// ═══════════════════════════════════════════════════════════════════════════════
// screens-n.jsx — Special Approval officer dedicated screens
// Sprint 18: role-dedicated screens (no shared branching)
// Roles: recommender (rec-*), verifier (ver-*), approver (app-*)
// ═══════════════════════════════════════════════════════════════════════════════

// ── shared helpers ────────────────────────────────────────────────────────────
function SAStageTag({ stage }) {
  const cfg = {
    recommendation: { color: 'blue',   label: 'Recommender Review' },
    verification:   { color: 'orange', label: 'Verifier Review'    },
    approval:       { color: 'red',    label: 'Approver Decision'  },
  }[stage] || { color: 'default', label: stage };
  return <antd.Tag color={cfg.color} style={{ fontSize: 11 }}>{cfg.label}</antd.Tag>;
}

function SAChainStatus({ app }) {
  const steps = [
    { title: 'Recommender', description: app.recommendedBy ? `${(MOCK.officerPerformance||[]).find(o=>o.id===app.recommendedBy)?.name || app.recommendedBy}` : 'Pending', status: app.recommendedBy ? 'finish' : 'process' },
    { title: 'Verifier',    description: app.verifiedBy    ? `${(MOCK.officerPerformance||[]).find(o=>o.id===app.verifiedBy)?.name    || app.verifiedBy}` : 'Pending', status: app.verifiedBy    ? 'finish' : app.stage === 'verification' ? 'process' : 'wait' },
    { title: 'Approver',    description: app.approvedBy    ? `${(MOCK.officerPerformance||[]).find(o=>o.id===app.approvedBy)?.name    || app.approvedBy}` : 'Pending', status: app.approvedBy    ? 'finish' : app.stage === 'approval'      ? 'process' : 'wait' },
  ];
  return (
    <antd.Steps size="small" style={{ marginBottom: 16 }} items={steps} />
  );
}

// ── SA queue table (shared layout, caller filters by stage/assignee) ──────────
function SAQueueTable({ nav, rows, myId, myStage, onDecision, decisions }) {
  return (
    <antd.Table rowKey="id" dataSource={rows} pagination={{ pageSize: 8, size: 'small', showSizeChanger: false }} scroll={{ x: 'max-content' }}
      onRow={() => ({ onClick: () => nav('officer-review'), style: { cursor: 'pointer' } })}
      columns={[
        { title: 'SA ID',      dataIndex: 'id',        width: 140, render: v => <antd.Typography.Text code style={{ fontSize: 12 }}>{v}</antd.Typography.Text> },
        { title: 'Applicant',  dataIndex: 'applicant', width: 200 },
        { title: 'Product',    dataIndex: 'product',   width: 220 },
        { title: 'Category',   dataIndex: 'category',  width: 170, render: v => <antd.Tag style={{ fontSize: 11 }}>{v}</antd.Tag> },
        { title: 'Stage',      dataIndex: 'stage',     width: 160, render: s => <SAStageTag stage={s} /> },
        { title: 'AI Score',   dataIndex: 'aiScore',   width: 90,  render: s => <antd.Tag color={s >= 80 ? 'green' : s >= 60 ? 'orange' : 'red'} style={{ fontWeight: 600 }}>{s}</antd.Tag> },
        { title: 'Priority',   dataIndex: 'priority',  width: 90,  render: p => <antd.Tag color={p === 'critical' ? 'volcano' : p === 'high' ? 'red' : 'blue'}>{p}</antd.Tag> },
        { title: 'SLA',        dataIndex: 'slaHours',  width: 80,  render: h => <antd.Tag color={h < 12 ? 'red' : h < 24 ? 'orange' : 'default'} style={{ whiteSpace: 'nowrap' }}>{h}h</antd.Tag> },
        { title: 'MOSTI',      dataIndex: 'needsMosti', width: 80, render: v => v ? <antd.Tag color="purple" style={{ fontSize: 10 }}>Required</antd.Tag> : <antd.Tag style={{ fontSize: 10 }}>N/A</antd.Tag> },
        { title: 'Submitted',  dataIndex: 'submitted', width: 130, render: v => <span style={{ whiteSpace: 'nowrap' }}>{new Date(v).toLocaleDateString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}</span> },
      ]}
    />
  );
}

// ════════════════════════════════════════════════════════════════
//  RECOMMENDER screens
// ════════════════════════════════════════════════════════════════

SCREENS['rec-dashboard'] = function RecDashboard({ nav, currentUser }) {
  const myId   = currentUser?.id || 'OFF-004';
  const myName = currentUser?.name || 'En. Ahmad Rashid';

  const officerPerf = MOCK.officerPerformance || [];
  const myPerf      = officerPerf.find(o => o.id === myId) || {};
  const saQueue     = MOCK.saQueue || [];
  const myQueue     = saQueue.filter(q => q.assignedRecommender === myId && q.stage === 'recommendation');
  const urgentCount = myQueue.filter(q => q.slaHours <= 12).length;

  const today    = new Date();
  const greeting = today.getHours() < 12 ? 'Selamat pagi' : 'Selamat tengah hari';

  const kpis = [
    { label: 'Awaiting Recommendation', value: myQueue.length,    delta: urgentCount > 0 ? `${urgentCount} urgent` : 'All clear',    color: urgentCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' },
    { label: 'Recommended This Month',  value: myPerf.approved || 0, delta: 'Lifetime total',                                         color: 'var(--color-success)' },
    { label: 'Avg Decision Time',       value: `${myPerf.avgTurnaround || 0}h`, delta: 'Team avg 4.6h',                              color: 'var(--color-text-primary)' },
    { label: 'SLA Compliance',          value: `${myPerf.slaCompliance || 0}%`, delta: 'Monthly target 95%',                         color: (myPerf.slaCompliance||0) >= 95 ? 'var(--color-success)' : 'var(--color-warning)' },
  ];

  const recent = [
    { id: 'SA-0426-00019', product: 'Nokia AirScale 5G NR',      decision: 'Recommend',     ts: '12 Apr 2026 · 11:40' },
    { id: 'SA-0426-00017', product: 'Ericsson RRU 5258 B41',     decision: 'Do Not Recommend', ts: '10 Apr 2026 · 15:22' },
    { id: 'SA-0426-00014', product: 'Huawei AAU 5613 (26 GHz)',  decision: 'Recommend',     ts: '08 Apr 2026 · 09:05' },
  ];
  const decColor = { 'Recommend': 'green', 'Do Not Recommend': 'red', 'Return for Revision': 'orange' };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <antd.Typography.Title level={3} style={{ margin: 0 }}>{greeting}, {myName.split(' ').slice(-1)[0]}</antd.Typography.Title>
            <antd.Tag color="green" style={{ fontSize: 11, fontWeight: 700 }}>Recommender (P5/P6)</antd.Tag>
          </div>
          <antd.Typography.Text type="secondary">{today.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · Special Approvals Unit</antd.Typography.Text>
        </div>
        <antd.Space wrap>
          <antd.Button icon={<FlagOutlined />} onClick={() => nav('rec-queue')}>My SA Queue</antd.Button>
          {myQueue.length > 0 && <antd.Button type="primary" icon={<EyeOutlined />} onClick={() => nav('rec-review')}>Start Review</antd.Button>}
        </antd.Space>
      </div>

      <antd.Row gutter={[16,16]} style={{ marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card" onClick={() => nav('rec-queue')} style={{ cursor: 'pointer' }}>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
              <div className="kpi-delta">{k.delta}</div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      <antd.Row gutter={[16,16]}>
        <antd.Col xs={24} lg={16}>
          <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>
            {/* My pending SA apps */}
            <antd.Card bordered title={<antd.Space><FlagOutlined style={{ color: 'var(--color-primary)' }} /> Pending Recommendation</antd.Space>}
              extra={<antd.Button size="small" onClick={() => nav('rec-queue')}>All →</antd.Button>}>
              {myQueue.length === 0 ? (
                <antd.Result status="success" title="All clear" subTitle="No SA applications awaiting your recommendation." style={{ padding: '16px 0' }} />
              ) : (
                <antd.Table rowKey="id" dataSource={myQueue} pagination={{ pageSize: 4, size: 'small' }} size="small"
                  onRow={() => ({ onClick: () => nav('rec-review'), style: { cursor: 'pointer' } })}
                  columns={[
                    { title: 'SA ID',    dataIndex: 'id',       width: 140, render: v => <antd.Typography.Text code style={{ fontSize: 11 }}>{v}</antd.Typography.Text> },
                    { title: 'Product',  dataIndex: 'product',  ellipsis: true, render: (v,r) => <div><div style={{ fontWeight:600, fontSize:12 }}>{v}</div><div style={{ fontSize:11, color:'var(--color-text-muted)' }}>{r.applicant}</div></div> },
                    { title: 'Category', dataIndex: 'category', width: 150, render: v => <antd.Tag style={{ fontSize:10 }}>{v}</antd.Tag> },
                    { title: 'SLA',      dataIndex: 'slaHours', width: 70,  render: h => <antd.Tag color={h<=12?'red':h<=24?'orange':'default'} style={{ fontSize:10,margin:0 }}>{h}h</antd.Tag> },
                    { title: '', width: 90, render: () => <antd.Button size="small" type="primary" icon={<EyeOutlined />} onClick={e => { e.stopPropagation(); nav('rec-review'); }}>Review</antd.Button> },
                  ]}
                />
              )}
            </antd.Card>

            {/* Recent decisions */}
            <antd.Card bordered title={<antd.Space><HistoryOutlined style={{ color: 'var(--color-text-muted)' }} /> My Recent Decisions</antd.Space>}>
              {recent.map((d, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom: i < recent.length-1 ? '1px solid var(--color-divider)' : 'none' }}>
                  <antd.Tag color={decColor[d.decision] || 'default'} style={{ fontSize:11, margin:0, minWidth:140, textAlign:'center' }}>{d.decision}</antd.Tag>
                  <div style={{ flex:1, minWidth:0 }}><span style={{ fontSize:13, fontWeight:500 }}>{d.product}</span><span style={{ fontSize:11, color:'var(--color-text-muted)', fontFamily:'var(--font-mono)', marginLeft:8 }}>{d.id}</span></div>
                  <div style={{ fontSize:11, color:'var(--color-text-muted)', whiteSpace:'nowrap' }}>{d.ts}</div>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>

        <antd.Col xs={24} lg={8}>
          <antd.Space direction="vertical" size={16} style={{ width: '100%' }}>
            <antd.Card bordered title="SA Workflow Guide" bodyStyle={{ padding:'14px 16px' }}>
              <antd.Timeline items={[
                { color:'blue',   children: <div><b>Recommender (P5/P6)</b><br/><span style={{fontSize:12,color:'var(--color-text-muted)'}}>You review the SA application and issue a Recommend / Do Not Recommend finding.</span></div> },
                { color:'orange', children: <div><b>Verifier (P7)</b><br/><span style={{fontSize:12,color:'var(--color-text-muted)'}}>Verifier endorses or returns the recommender finding.</span></div> },
                { color:'red',    children: <div><b>Approver (P8 / DG)</b><br/><span style={{fontSize:12,color:'var(--color-text-muted)'}}>Director makes the final Special Approval decision.</span></div> },
              ]} />
            </antd.Card>
            <antd.Card bordered title="My Performance" bodyStyle={{ padding:'16px' }}>
              {[
                { label:'Total Recommended',  value: myPerf.approved || 0,          color:'var(--color-success)' },
                { label:'Not Recommended',    value: myPerf.rejected || 0,          color:'var(--color-danger)' },
                { label:'Returned for Rev.',  value: myPerf.aiOverrides || 0,       color:'var(--color-warning)' },
                { label:'Avg Decision Time',  value: `${myPerf.avgTurnaround||0}h`, color:'var(--color-text-primary)' },
              ].map((s,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom: i<3 ? '1px solid var(--color-divider)' : 'none' }}>
                  <span style={{ fontSize:12, color:'var(--color-text-secondary)' }}>{s.label}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:s.color }}>{s.value}</span>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

SCREENS['rec-queue'] = function RecQueue({ nav, currentUser }) {
  const myId   = currentUser?.id || 'OFF-004';
  const saQueue = MOCK.saQueue || [];
  const myRows  = saQueue.filter(q => q.assignedRecommender === myId && q.stage === 'recommendation');
  const myCount = myRows.length;
  const urgentCount = myRows.filter(q => q.slaHours <= 12).length;

  const officerPerf = MOCK.officerPerformance || [];
  const myPerf = officerPerf.find(o => o.id === myId) || {};

  const kpis = [
    { l: 'Awaiting Recommendation', v: myCount,          d: urgentCount > 0 ? `${urgentCount} urgent` : 'All clear', warn: urgentCount > 0 },
    { l: 'Recommended This Month',  v: myPerf.approved || 0, d: 'Lifetime total',                                      color: 'var(--color-success)' },
    { l: 'Avg Decision Time',       v: `${myPerf.avgTurnaround||0}h`, d: 'Team avg 4.6h' },
    { l: 'SLA Compliance',          v: `${myPerf.slaCompliance||0}%`, d: 'Monthly target 95%', color: (myPerf.slaCompliance||0) >= 95 ? 'var(--color-success)' : 'var(--color-warning)' },
  ];

  return (
    <div style={{ padding:32, maxWidth:1400, margin:'0 auto' }}>
      <div style={{ fontSize:12, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:.4, fontWeight:600 }}>Recommender (P5/P6) · {currentUser?.name}</div>
      <antd.Typography.Title level={3} style={{ margin:'4px 0 20px' }}>My SA Review Queue</antd.Typography.Title>
      <antd.Row gutter={[16,16]} style={{ marginBottom:20 }}>
        {kpis.map((k,i) => (
          <antd.Col xs={12} md={6} key={i}><div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color: k.warn?'var(--color-warning)':(k.color||'inherit') }}>{k.v}</div><div className="kpi-delta">{k.d}</div></div></antd.Col>
        ))}
      </antd.Row>
      <antd.Card bordered>
        {myRows.length === 0 ? (
          <antd.Result status="success" title="Queue clear" subTitle="No SA applications are currently assigned to you for recommendation." style={{ padding:'40px 0' }} />
        ) : (
          <>
            <antd.Alert type="info" showIcon style={{ marginBottom:12 }}
              message="Special Approval — Recommender stage"
              description="Review each application's technical merits, check MOSTI letters where required, and issue a Recommend or Do Not Recommend finding. Your finding goes to the Verifier (P7)." />
            <SAQueueTable nav={nav} rows={myRows} myId={myId} myStage="recommendation" />
          </>
        )}
      </antd.Card>
    </div>
  );
};

SCREENS['rec-review'] = function RecReview({ nav, currentUser }) {
  const app = (MOCK.saQueue || []).find(q => q.stage === 'recommendation') || (MOCK.saQueue||[])[0] || {};
  const [decision, setDecision] = React.useState('');
  const [notes, setNotes]       = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [mostiOk, setMostiOk]  = React.useState(false);

  if (submitted) return (
    <div style={{ padding:48, maxWidth:700, margin:'0 auto', textAlign:'center' }}>
      <antd.Result status="success" title="Recommendation submitted"
        subTitle={`Your finding for ${app.id} has been forwarded to the Verifier (P7). The application is now in the Verification stage.`}
        extra={[
          <antd.Button type="primary" key="queue" onClick={() => { setSubmitted(false); nav('rec-queue'); }}>Back to Queue</antd.Button>,
          <antd.Button key="dash" onClick={() => { setSubmitted(false); nav('rec-dashboard'); }}>Dashboard</antd.Button>,
        ]} />
    </div>
  );

  return (
    <div style={{ padding:32, maxWidth:1100, margin:'0 auto' }}>
      <antd.Button icon={<ArrowLeftOutlined />} style={{ marginBottom:16 }} onClick={() => nav('rec-queue')}>Back to Queue</antd.Button>

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <antd.Typography.Title level={3} style={{ margin:0 }}>{app.id}</antd.Typography.Title>
        <SAStageTag stage="recommendation" />
        {app.needsMosti && <antd.Tag color="purple" icon={<StarOutlined />}>MOSTI Required</antd.Tag>}
      </div>

      <antd.Row gutter={[16,16]}>
        {/* Left: application details */}
        <antd.Col xs={24} lg={14}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title="Application Details" size="small">
              {[
                ['Applicant',   app.applicant],
                ['Product',     app.product],
                ['Category',    app.category],
                ['Purpose',     app.purpose],
                ['MOSTI Ref',   app.mosteRef || '(none)'],
                ['Submitted',   app.submitted ? new Date(app.submitted).toLocaleString('en-GB') : '—'],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'flex', gap:12, padding:'6px 0', borderBottom:'1px solid var(--color-divider)' }}>
                  <span style={{ width:110, fontSize:12, fontWeight:600, color:'var(--color-text-muted)', flexShrink:0 }}>{k}</span>
                  <span style={{ fontSize:13 }}>{v}</span>
                </div>
              ))}
            </antd.Card>

            <antd.Card bordered title="Approval Chain" size="small"><SAChainStatus app={app} /></antd.Card>

            <antd.Card bordered title={<antd.Space><RobotOutlined style={{ color:'var(--color-primary)' }} /> AI Pre-screening</antd.Space>} size="small">
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                <antd.Progress type="circle" percent={app.aiScore} size={56}
                  strokeColor={app.aiScore >= 80 ? '#1B7F48' : app.aiScore >= 60 ? '#B87200' : '#C62828'} format={p => <span style={{ fontWeight:700, fontSize:13 }}>{p}</span>} />
                <div>
                  <div style={{ fontWeight:600 }}>AI Confidence Score</div>
                  <div style={{ fontSize:12, color:'var(--color-text-muted)' }}>{app.aiScore >= 80 ? 'Low risk — documentation complete' : app.aiScore >= 60 ? 'Medium risk — review flagged items' : 'High risk — multiple flags'}</div>
                </div>
              </div>
              <antd.Alert type={app.aiScore >= 80 ? 'success' : 'warning'} showIcon style={{ fontSize:12 }}
                message={app.aiScore >= 80 ? 'All documents validated. MOSTI letter present and in date.' : 'Secondary frequency band not specified in technical brochure. Awaiting clarification.'} />
            </antd.Card>
          </antd.Space>
        </antd.Col>

        {/* Right: decision panel */}
        <antd.Col xs={24} lg={10}>
          <antd.Card bordered title="Recommender Decision" style={{ position:'sticky', top:20 }}>
            {app.needsMosti && (
              <antd.Alert type="warning" showIcon icon={<ExclamationCircleOutlined />} style={{ marginBottom:16, fontSize:12 }}
                message="MOSTI endorsement required"
                description="This application involves controlled or prohibited-category equipment. Confirm MOSTI letter is present and valid before recommending." />
            )}
            {app.needsMosti && (
              <div style={{ marginBottom:16 }}>
                <antd.Checkbox checked={mostiOk} onChange={e => setMostiOk(e.target.checked)}>
                  I confirm MOSTI endorsement letter {app.mosteRef} has been sighted and is valid
                </antd.Checkbox>
              </div>
            )}
            <antd.Space direction="vertical" style={{ width:'100%', marginBottom:16 }} size={8}>
              {[
                { key:'recommend',   label:'Recommend',           color:'#1B7F48', desc:'Forward to Verifier (P7) with positive finding.' },
                { key:'return',      label:'Return for Revision',  color:'#B87200', desc:'Request additional documentation from applicant.' },
                { key:'not-recommend', label:'Do Not Recommend',   color:'#C62828', desc:'Issue a negative finding — application will not proceed.' },
              ].map(opt => (
                <div key={opt.key} onClick={() => setDecision(opt.key)} style={{
                  padding:'10px 14px', borderRadius:8, cursor:'pointer', border:`1.5px solid ${decision===opt.key ? opt.color : 'var(--color-border)'}`,
                  background: decision===opt.key ? `${opt.color}12` : '#fff',
                }}>
                  <div style={{ fontWeight:600, color:opt.color, fontSize:13 }}>{opt.label}</div>
                  <div style={{ fontSize:11, color:'var(--color-text-muted)', marginTop:2 }}>{opt.desc}</div>
                </div>
              ))}
            </antd.Space>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:600, marginBottom:6 }}>Recommender Notes <span style={{ color:'var(--color-danger)' }}>*</span></div>
              <antd.Input.TextArea rows={4} placeholder="Summarise your technical review findings. This will be visible to the Verifier and in the audit trail." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <antd.Button type="primary" block icon={<SendOutlined />}
              disabled={!decision || !notes.trim() || (app.needsMosti && !mostiOk)}
              onClick={() => { antd.message.success(`Recommendation "${decision}" submitted for ${app.id}`); setSubmitted(true); }}>
              Submit Recommendation
            </antd.Button>
            <div style={{ fontSize:11, color:'var(--color-text-muted)', marginTop:8, textAlign:'center' }}>Your finding will be forwarded to the Verifier (P7) immediately.</div>
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
//  VERIFIER screens
// ════════════════════════════════════════════════════════════════

SCREENS['ver-dashboard'] = function VerDashboard({ nav, currentUser }) {
  const myId   = currentUser?.id || 'OFF-005';
  const myName = currentUser?.name || 'Pn. Halimah Yusof';

  const officerPerf = MOCK.officerPerformance || [];
  const myPerf      = officerPerf.find(o => o.id === myId) || {};
  const saQueue     = MOCK.saQueue || [];
  const myQueue     = saQueue.filter(q => q.assignedVerifier === myId && q.stage === 'verification');
  const urgentCount = myQueue.filter(q => q.slaHours <= 12).length;

  const today    = new Date();
  const greeting = today.getHours() < 12 ? 'Selamat pagi' : 'Selamat tengah hari';

  const kpis = [
    { label: 'Awaiting Verification',  value: myQueue.length,    delta: urgentCount > 0 ? `${urgentCount} urgent` : 'All clear',   color: urgentCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' },
    { label: 'Verified This Month',    value: myPerf.approved || 0, delta: 'Lifetime total',                                        color: 'var(--color-success)' },
    { label: 'Avg Decision Time',      value: `${myPerf.avgTurnaround || 0}h`, delta: 'Unit avg',                                  color: 'var(--color-text-primary)' },
    { label: 'SLA Compliance',         value: `${myPerf.slaCompliance || 0}%`, delta: 'Monthly target 95%',                        color: (myPerf.slaCompliance||0) >= 95 ? 'var(--color-success)' : 'var(--color-warning)' },
  ];

  const recent = [
    { id: 'SA-0426-00016', product: 'Nokia Flexi Multiradio 10 BTS', decision: 'Verified & Escalated', ts: '11 Apr 2026 · 14:30' },
    { id: 'SA-0426-00013', product: 'Ericsson AIR 6449 (Sub-6)',      decision: 'Referred Back',        ts: '09 Apr 2026 · 10:15' },
  ];
  const decColor = { 'Verified & Escalated': 'green', 'Referred Back': 'orange', 'Rejected': 'red' };

  return (
    <div style={{ padding:32, maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <antd.Typography.Title level={3} style={{ margin:0 }}>{greeting}, {myName.split(' ').slice(-1)[0]}</antd.Typography.Title>
            <antd.Tag color="orange" style={{ fontSize:11, fontWeight:700 }}>Verifier (P7)</antd.Tag>
          </div>
          <antd.Typography.Text type="secondary">{today.toLocaleDateString('en-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })} · Special Approvals Unit</antd.Typography.Text>
        </div>
        <antd.Space wrap>
          <antd.Button icon={<FlagOutlined />} onClick={() => nav('ver-queue')}>My SA Queue</antd.Button>
          {myQueue.length > 0 && <antd.Button type="primary" icon={<EyeOutlined />} onClick={() => nav('ver-review')}>Start Review</antd.Button>}
        </antd.Space>
      </div>

      <antd.Row gutter={[16,16]} style={{ marginBottom:24 }}>
        {kpis.map((k,i) => (
          <antd.Col xs={12} md={6} key={i}><div className="kpi-card" onClick={() => nav('ver-queue')} style={{ cursor:'pointer' }}><div className="kpi-label">{k.label}</div><div className="kpi-value" style={{ color:k.color }}>{k.value}</div><div className="kpi-delta">{k.delta}</div></div></antd.Col>
        ))}
      </antd.Row>

      <antd.Row gutter={[16,16]}>
        <antd.Col xs={24} lg={16}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title={<antd.Space><FlagOutlined style={{ color:'var(--color-primary)' }} /> Awaiting Verification</antd.Space>}
              extra={<antd.Button size="small" onClick={() => nav('ver-queue')}>All →</antd.Button>}>
              {myQueue.length === 0 ? (
                <antd.Result status="success" title="All clear" subTitle="No SA applications awaiting your verification." style={{ padding:'16px 0' }} />
              ) : (
                <antd.Table rowKey="id" dataSource={myQueue} pagination={{ pageSize:4, size:'small' }} size="small"
                  onRow={() => ({ onClick: () => nav('ver-review'), style:{ cursor:'pointer' } })}
                  columns={[
                    { title:'SA ID',    dataIndex:'id',       width:140, render:v => <antd.Typography.Text code style={{ fontSize:11 }}>{v}</antd.Typography.Text> },
                    { title:'Product',  dataIndex:'product',  ellipsis:true, render:(v,r) => <div><div style={{ fontWeight:600,fontSize:12 }}>{v}</div><div style={{ fontSize:11,color:'var(--color-text-muted)' }}>{r.applicant}</div></div> },
                    { title:'Recommender Notes', dataIndex:'recommenderNotes', ellipsis:true, render:v => <span style={{ fontSize:11,color:'var(--color-text-secondary)' }}>{v}</span> },
                    { title:'SLA',      dataIndex:'slaHours', width:70, render:h => <antd.Tag color={h<=12?'red':h<=24?'orange':'default'} style={{ fontSize:10,margin:0 }}>{h}h</antd.Tag> },
                    { title:'', width:90, render:() => <antd.Button size="small" type="primary" icon={<EyeOutlined />} onClick={e => { e.stopPropagation(); nav('ver-review'); }}>Verify</antd.Button> },
                  ]} />
              )}
            </antd.Card>
            <antd.Card bordered title={<antd.Space><HistoryOutlined style={{ color:'var(--color-text-muted)' }} /> My Recent Decisions</antd.Space>}>
              {recent.map((d,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom: i<recent.length-1?'1px solid var(--color-divider)':'none' }}>
                  <antd.Tag color={decColor[d.decision]||'default'} style={{ fontSize:11,margin:0,minWidth:140,textAlign:'center' }}>{d.decision}</antd.Tag>
                  <div style={{ flex:1,minWidth:0 }}><span style={{ fontSize:13,fontWeight:500 }}>{d.product}</span><span style={{ fontSize:11,color:'var(--color-text-muted)',fontFamily:'var(--font-mono)',marginLeft:8 }}>{d.id}</span></div>
                  <div style={{ fontSize:11,color:'var(--color-text-muted)',whiteSpace:'nowrap' }}>{d.ts}</div>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>
        <antd.Col xs={24} lg={8}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title="Verifier Role" bodyStyle={{ padding:'14px 16px' }}>
              <antd.Timeline items={[
                { color:'green',  children:<div><b>Recommender finding received</b><br/><span style={{ fontSize:12,color:'var(--color-text-muted)' }}>The Recommender's technical review is available for your reference.</span></div> },
                { color:'orange', children:<div><b>Your role: Verify & Escalate</b><br/><span style={{ fontSize:12,color:'var(--color-text-muted)' }}>Verify the recommender finding and escalate to the Approver (P8), or refer back for revision.</span></div> },
                { color:'gray',   children:<div><b>Approver decision</b><br/><span style={{ fontSize:12,color:'var(--color-text-muted)' }}>After verification, the Director (P8) makes the final Special Approval decision.</span></div> },
              ]} />
            </antd.Card>
            <antd.Card bordered title="My Performance" bodyStyle={{ padding:'16px' }}>
              {[
                { label:'Total Verified',   value:myPerf.approved||0,          color:'var(--color-success)' },
                { label:'Referred Back',    value:myPerf.aiOverrides||0,       color:'var(--color-warning)' },
                { label:'Rejected',         value:myPerf.rejected||0,          color:'var(--color-danger)' },
                { label:'Avg Decision',     value:`${myPerf.avgTurnaround||0}h`, color:'var(--color-text-primary)' },
              ].map((s,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:i<3?'1px solid var(--color-divider)':'none' }}>
                  <span style={{ fontSize:12, color:'var(--color-text-secondary)' }}>{s.label}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:s.color }}>{s.value}</span>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

SCREENS['ver-queue'] = function VerQueue({ nav, currentUser }) {
  const myId    = currentUser?.id || 'OFF-005';
  const saQueue = MOCK.saQueue || [];
  const myRows  = saQueue.filter(q => q.assignedVerifier === myId && q.stage === 'verification');
  const officerPerf = MOCK.officerPerformance || [];
  const myPerf = officerPerf.find(o => o.id === myId) || {};

  const kpis = [
    { l:'Awaiting Verification',  v:myRows.length, d:myRows.filter(q=>q.slaHours<=12).length > 0 ? `${myRows.filter(q=>q.slaHours<=12).length} urgent` : 'All clear', warn:myRows.filter(q=>q.slaHours<=12).length > 0 },
    { l:'Verified This Month',    v:myPerf.approved||0, d:'Lifetime total', color:'var(--color-success)' },
    { l:'Avg Decision Time',      v:`${myPerf.avgTurnaround||0}h`, d:'Unit avg' },
    { l:'SLA Compliance',         v:`${myPerf.slaCompliance||0}%`, d:'Monthly target 95%', color:(myPerf.slaCompliance||0)>=95?'var(--color-success)':'var(--color-warning)' },
  ];

  return (
    <div style={{ padding:32, maxWidth:1400, margin:'0 auto' }}>
      <div style={{ fontSize:12, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:.4, fontWeight:600 }}>Verifier (P7) · {currentUser?.name}</div>
      <antd.Typography.Title level={3} style={{ margin:'4px 0 20px' }}>My SA Verification Queue</antd.Typography.Title>
      <antd.Row gutter={[16,16]} style={{ marginBottom:20 }}>
        {kpis.map((k,i) => <antd.Col xs={12} md={6} key={i}><div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color:k.warn?'var(--color-warning)':(k.color||'inherit') }}>{k.v}</div><div className="kpi-delta">{k.d}</div></div></antd.Col>)}
      </antd.Row>
      <antd.Card bordered>
        {myRows.length === 0 ? (
          <antd.Result status="success" title="Queue clear" subTitle="No SA applications are currently pending your verification." style={{ padding:'40px 0' }} />
        ) : (
          <>
            <antd.Alert type="info" showIcon style={{ marginBottom:12 }} message="Special Approval — Verifier stage"
              description="Review the Recommender's finding, assess whether it is well-founded, then Verify & Escalate to Approver (P8), or Refer Back for revision." />
            <SAQueueTable nav={nav} rows={myRows} myId={myId} myStage="verification" />
          </>
        )}
      </antd.Card>
    </div>
  );
};

SCREENS['ver-review'] = function VerReview({ nav, currentUser }) {
  const app = (MOCK.saQueue || []).find(q => q.stage === 'verification') || (MOCK.saQueue||[])[0] || {};
  const [decision, setDecision] = React.useState('');
  const [notes, setNotes]       = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) return (
    <div style={{ padding:48, maxWidth:700, margin:'0 auto', textAlign:'center' }}>
      <antd.Result status="success" title="Verification submitted"
        subTitle={`Your verification for ${app.id} has been forwarded to the Approver (P8). The application is now in the Approval stage.`}
        extra={[
          <antd.Button type="primary" key="queue" onClick={() => { setSubmitted(false); nav('ver-queue'); }}>Back to Queue</antd.Button>,
          <antd.Button key="dash" onClick={() => { setSubmitted(false); nav('ver-dashboard'); }}>Dashboard</antd.Button>,
        ]} />
    </div>
  );

  return (
    <div style={{ padding:32, maxWidth:1100, margin:'0 auto' }}>
      <antd.Button icon={<ArrowLeftOutlined />} style={{ marginBottom:16 }} onClick={() => nav('ver-queue')}>Back to Queue</antd.Button>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <antd.Typography.Title level={3} style={{ margin:0 }}>{app.id}</antd.Typography.Title>
        <SAStageTag stage="verification" />
        {app.needsMosti && <antd.Tag color="purple" icon={<StarOutlined />}>MOSTI Required</antd.Tag>}
      </div>

      <antd.Row gutter={[16,16]}>
        <antd.Col xs={24} lg={14}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title="Application Details" size="small">
              {[['Applicant',app.applicant],['Product',app.product],['Category',app.category],['Purpose',app.purpose],['MOSTI Ref',app.mosteRef||'(none)']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', gap:12, padding:'6px 0', borderBottom:'1px solid var(--color-divider)' }}>
                  <span style={{ width:110, fontSize:12, fontWeight:600, color:'var(--color-text-muted)', flexShrink:0 }}>{k}</span>
                  <span style={{ fontSize:13 }}>{v}</span>
                </div>
              ))}
            </antd.Card>
            <antd.Card bordered title="Approval Chain" size="small"><SAChainStatus app={app} /></antd.Card>
            <antd.Card bordered title={<antd.Space><CheckCircleOutlined style={{ color:'var(--color-success)' }} /> Recommender Finding</antd.Space>} size="small">
              <antd.Alert type="success" showIcon style={{ marginBottom:12, fontSize:12 }}
                message={`Recommended by ${(MOCK.officerPerformance||[]).find(o=>o.id===app.recommendedBy)?.name || app.recommendedBy}`}
                description={app.recommenderNotes || 'No notes provided.'} />
              {app.recommendedAt && <div style={{ fontSize:11, color:'var(--color-text-muted)' }}>Recommended on {new Date(app.recommendedAt).toLocaleString('en-GB')}</div>}
            </antd.Card>
          </antd.Space>
        </antd.Col>

        <antd.Col xs={24} lg={10}>
          <antd.Card bordered title="Verifier Decision" style={{ position:'sticky', top:20 }}>
            <antd.Space direction="vertical" style={{ width:'100%', marginBottom:16 }} size={8}>
              {[
                { key:'verify',    label:'Verify & Escalate',  color:'#1B7F48', desc:'Endorses recommender finding and escalates to Approver (P8).' },
                { key:'referback', label:'Refer Back',         color:'#B87200', desc:'Return to recommender for further review or clarification.' },
                { key:'reject',    label:'Reject',             color:'#C62828', desc:'Issue a rejection finding — application closed.' },
              ].map(opt => (
                <div key={opt.key} onClick={() => setDecision(opt.key)} style={{
                  padding:'10px 14px', borderRadius:8, cursor:'pointer', border:`1.5px solid ${decision===opt.key?opt.color:'var(--color-border)'}`,
                  background: decision===opt.key ? `${opt.color}12` : '#fff',
                }}>
                  <div style={{ fontWeight:600, color:opt.color, fontSize:13 }}>{opt.label}</div>
                  <div style={{ fontSize:11, color:'var(--color-text-muted)', marginTop:2 }}>{opt.desc}</div>
                </div>
              ))}
            </antd.Space>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:600, marginBottom:6 }}>Verifier Notes <span style={{ color:'var(--color-danger)' }}>*</span></div>
              <antd.Input.TextArea rows={4} placeholder="Document your verification assessment. This is visible to the Approver." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <antd.Button type="primary" block icon={<SendOutlined />}
              disabled={!decision || !notes.trim()}
              onClick={() => { antd.message.success(`Verification "${decision}" submitted for ${app.id}`); setSubmitted(true); }}>
              Submit Verification
            </antd.Button>
            <div style={{ fontSize:11, color:'var(--color-text-muted)', marginTop:8, textAlign:'center' }}>If verified, this will go to the Approver (P8) immediately.</div>
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
//  APPROVER screens
// ════════════════════════════════════════════════════════════════

SCREENS['app-dashboard'] = function AppDashboard({ nav, currentUser }) {
  const myId   = currentUser?.id || 'OFF-006';
  const myName = currentUser?.name || "Dato' Dr. Razif";

  const officerPerf = MOCK.officerPerformance || [];
  const myPerf      = officerPerf.find(o => o.id === myId) || {};
  const saQueue     = MOCK.saQueue || [];
  const myQueue     = saQueue.filter(q => q.assignedApprover === myId && q.stage === 'approval');
  const urgentCount = myQueue.filter(q => q.slaHours <= 12).length;
  const allSA       = saQueue;

  const today    = new Date();
  const greeting = today.getHours() < 12 ? 'Selamat pagi' : 'Selamat tengah hari';

  const kpis = [
    { label:'Awaiting My Decision', value:myQueue.length,    delta:urgentCount > 0 ? `${urgentCount} urgent` : 'All clear',     color:urgentCount>0?'var(--color-warning)':'var(--color-success)' },
    { label:'SA Pipeline (Total)',   value:allSA.length,     delta:`${allSA.filter(q=>q.stage==='recommendation').length} at recommender · ${allSA.filter(q=>q.stage==='verification').length} at verifier`, color:'var(--color-text-primary)' },
    { label:'Approved This Month',  value:myPerf.approved||0, delta:'Lifetime total',                                            color:'var(--color-success)' },
    { label:'SLA Compliance',       value:`${myPerf.slaCompliance||0}%`, delta:'Monthly target 95%',                            color:(myPerf.slaCompliance||0)>=95?'var(--color-success)':'var(--color-warning)' },
  ];

  const recent = [
    { id:'SA-0426-00011', product:'Spirent TestCenter C50U', decision:'Approved', ts:'08 Apr 2026 · 11:20' },
    { id:'SA-0426-00010', product:'Keysight UXM 5G (mmWave)', decision:'Rejected', ts:'06 Apr 2026 · 15:50' },
    { id:'SA-0426-00009', product:'Rohde & Schwarz CMX500', decision:'Approved', ts:'04 Apr 2026 · 09:30' },
  ];
  const decColor = { 'Approved':'green', 'Rejected':'red', 'Returned':'orange' };

  return (
    <div style={{ padding:32, maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <antd.Typography.Title level={3} style={{ margin:0 }}>{greeting}, {myName.split(' ').slice(-1)[0]}</antd.Typography.Title>
            <antd.Tag color="red" style={{ fontSize:11, fontWeight:700 }}>Approver (P8)</antd.Tag>
          </div>
          <antd.Typography.Text type="secondary">{today.toLocaleDateString('en-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })} · Special Approvals Unit · MCMC</antd.Typography.Text>
        </div>
        <antd.Space wrap>
          <antd.Button icon={<BarChartOutlined />} onClick={() => nav('reports')}>Reports</antd.Button>
          <antd.Button icon={<FlagOutlined />} onClick={() => nav('app-queue')}>My Queue</antd.Button>
          {myQueue.length > 0 && <antd.Button type="primary" icon={<EyeOutlined />} onClick={() => nav('app-review')}>Decide Now</antd.Button>}
        </antd.Space>
      </div>

      <antd.Row gutter={[16,16]} style={{ marginBottom:24 }}>
        {kpis.map((k,i) => (
          <antd.Col xs={12} md={6} key={i}>
            <div className="kpi-card" onClick={() => nav('app-queue')} style={{ cursor:'pointer' }}>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value" style={{ color:k.color }}>{k.value}</div>
              <div className="kpi-delta">{k.delta}</div>
            </div>
          </antd.Col>
        ))}
      </antd.Row>

      {/* SA Pipeline overview */}
      <antd.Card bordered title={<antd.Space><ApartmentOutlined /> SA Pipeline Overview</antd.Space>} style={{ marginBottom:16 }}
        extra={<antd.Button size="small" onClick={() => nav('app-queue')}>View All →</antd.Button>}>
        <antd.Row gutter={[16,16]}>
          {[
            { stage:'recommendation', label:'At Recommender', color:'#1B7F48' },
            { stage:'verification',   label:'At Verifier',    color:'#B87200' },
            { stage:'approval',       label:'Awaiting My Decision', color:'#C62828' },
          ].map((s,i) => {
            const count = allSA.filter(q => q.stage === s.stage).length;
            return (
              <antd.Col xs={24} md={8} key={i}>
                <div style={{ textAlign:'center', padding:'16px', background:`${s.color}0D`, borderRadius:8, border:`1px solid ${s.color}30` }}>
                  <div style={{ fontSize:28, fontWeight:700, color:s.color }}>{count}</div>
                  <div style={{ fontSize:12, color:'var(--color-text-secondary)', marginTop:4 }}>{s.label}</div>
                </div>
              </antd.Col>
            );
          })}
        </antd.Row>
      </antd.Card>

      <antd.Row gutter={[16,16]}>
        <antd.Col xs={24} lg={16}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title={<antd.Space><FlagOutlined style={{ color:'var(--color-danger)' }} /> Awaiting My Decision</antd.Space>}
              extra={<antd.Button size="small" onClick={() => nav('app-queue')}>All →</antd.Button>}>
              {myQueue.length === 0 ? (
                <antd.Result status="success" title="All clear" subTitle="No SA applications awaiting your approval at this time." style={{ padding:'16px 0' }} />
              ) : (
                <antd.Table rowKey="id" dataSource={myQueue} pagination={{ pageSize:4, size:'small' }} size="small"
                  onRow={() => ({ onClick:() => nav('app-review'), style:{ cursor:'pointer' } })}
                  columns={[
                    { title:'SA ID',    dataIndex:'id',       width:140, render:v => <antd.Typography.Text code style={{ fontSize:11 }}>{v}</antd.Typography.Text> },
                    { title:'Product',  dataIndex:'product',  ellipsis:true, render:(v,r) => <div><div style={{ fontWeight:600,fontSize:12 }}>{v}</div><div style={{ fontSize:11,color:'var(--color-text-muted)' }}>{r.applicant}</div></div> },
                    { title:'Verifier Notes', dataIndex:'verifierNotes', ellipsis:true, render:v => <span style={{ fontSize:11,color:'var(--color-text-secondary)' }}>{v}</span> },
                    { title:'SLA', dataIndex:'slaHours', width:70, render:h => <antd.Tag color={h<=12?'red':h<=24?'orange':'default'} style={{ fontSize:10,margin:0 }}>{h}h</antd.Tag> },
                    { title:'', width:90, render:() => <antd.Button size="small" type="primary" danger icon={<CheckCircleOutlined />} onClick={e => { e.stopPropagation(); nav('app-review'); }}>Decide</antd.Button> },
                  ]} />
              )}
            </antd.Card>
            <antd.Card bordered title={<antd.Space><HistoryOutlined style={{ color:'var(--color-text-muted)' }} /> My Recent Decisions</antd.Space>}>
              {recent.map((d,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:i<recent.length-1?'1px solid var(--color-divider)':'none' }}>
                  <antd.Tag color={decColor[d.decision]||'default'} style={{ fontSize:11,margin:0,minWidth:90,textAlign:'center' }}>{d.decision}</antd.Tag>
                  <div style={{ flex:1,minWidth:0 }}><span style={{ fontSize:13,fontWeight:500 }}>{d.product}</span><span style={{ fontSize:11,color:'var(--color-text-muted)',fontFamily:'var(--font-mono)',marginLeft:8 }}>{d.id}</span></div>
                  <div style={{ fontSize:11,color:'var(--color-text-muted)',whiteSpace:'nowrap' }}>{d.ts}</div>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>

        <antd.Col xs={24} lg={8}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title="Quick Actions" bodyStyle={{ padding:'12px 16px' }}>
              <antd.Space direction="vertical" style={{ width:'100%' }} size={8}>
                {myQueue.length > 0 && <antd.Button block type="primary" danger icon={<CheckCircleOutlined />} onClick={() => nav('app-review')}>Decide on ({myQueue.length})</antd.Button>}
                <antd.Button block icon={<FlagOutlined />} onClick={() => nav('app-queue')}>My Approval Queue</antd.Button>
                <antd.Button block icon={<BarChartOutlined />} onClick={() => nav('reports')}>Reports & Analytics</antd.Button>
                <antd.Button block icon={<SettingOutlined />} onClick={() => nav('profile')}>Profile & Settings</antd.Button>
              </antd.Space>
            </antd.Card>
            <antd.Card bordered title="My Performance" bodyStyle={{ padding:'16px' }}>
              {[
                { label:'SA Approved',   value:myPerf.approved||0,          color:'var(--color-success)' },
                { label:'SA Rejected',   value:myPerf.rejected||0,          color:'var(--color-danger)' },
                { label:'Returned',      value:myPerf.aiOverrides||0,       color:'var(--color-warning)' },
                { label:'Avg Decision',  value:`${myPerf.avgTurnaround||0}h`, color:'var(--color-text-primary)' },
              ].map((s,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:i<3?'1px solid var(--color-divider)':'none' }}>
                  <span style={{ fontSize:12, color:'var(--color-text-secondary)' }}>{s.label}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:s.color }}>{s.value}</span>
                </div>
              ))}
            </antd.Card>
          </antd.Space>
        </antd.Col>
      </antd.Row>
    </div>
  );
};

SCREENS['app-queue'] = function AppQueue({ nav, currentUser }) {
  const myId    = currentUser?.id || 'OFF-006';
  const saQueue = MOCK.saQueue || [];
  const myRows  = saQueue.filter(q => q.assignedApprover === myId && q.stage === 'approval');
  const officerPerf = MOCK.officerPerformance || [];
  const myPerf = officerPerf.find(o => o.id === myId) || {};
  const urgentCount = myRows.filter(q => q.slaHours <= 12).length;

  const kpis = [
    { l:'Awaiting Decision',     v:myRows.length,       d:urgentCount > 0 ? `${urgentCount} urgent` : 'All clear', warn:urgentCount > 0 },
    { l:'Approved This Month',   v:myPerf.approved||0,  d:'Lifetime total', color:'var(--color-success)' },
    { l:'Avg Decision Time',     v:`${myPerf.avgTurnaround||0}h`, d:'Unit avg' },
    { l:'SLA Compliance',        v:`${myPerf.slaCompliance||0}%`, d:'Monthly target 95%', color:(myPerf.slaCompliance||0)>=95?'var(--color-success)':'var(--color-warning)' },
  ];

  return (
    <div style={{ padding:32, maxWidth:1400, margin:'0 auto' }}>
      <div style={{ fontSize:12, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:.4, fontWeight:600 }}>Approver (P8) · {currentUser?.name}</div>
      <antd.Typography.Title level={3} style={{ margin:'4px 0 20px' }}>My SA Approval Queue</antd.Typography.Title>
      <antd.Row gutter={[16,16]} style={{ marginBottom:20 }}>
        {kpis.map((k,i) => <antd.Col xs={12} md={6} key={i}><div className="kpi-card"><div className="kpi-label">{k.l}</div><div className="kpi-value" style={{ color:k.warn?'var(--color-warning)':(k.color||'inherit') }}>{k.v}</div><div className="kpi-delta">{k.d}</div></div></antd.Col>)}
      </antd.Row>
      <antd.Card bordered>
        {myRows.length === 0 ? (
          <antd.Result status="success" title="Queue clear" subTitle="No SA applications currently await your approval decision." style={{ padding:'40px 0' }} />
        ) : (
          <>
            <antd.Alert type="warning" showIcon style={{ marginBottom:12 }} message="Special Approval — Approver stage"
              description="These applications have passed Recommender and Verifier review. Your decision is final. Approve, Reject, or Return for further verification." />
            <SAQueueTable nav={nav} rows={myRows} myId={myId} myStage="approval" />
          </>
        )}
      </antd.Card>
    </div>
  );
};

SCREENS['app-review'] = function AppReview({ nav, currentUser }) {
  const app = (MOCK.saQueue || []).find(q => q.stage === 'approval') || (MOCK.saQueue||[])[0] || {};
  const [decision, setDecision] = React.useState('');
  const [notes, setNotes]       = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [dgEscalate, setDgEscalate] = React.useState(false);

  const isProhibited = app.category === 'Prohibited Equipment';

  if (submitted) return (
    <div style={{ padding:48, maxWidth:700, margin:'0 auto', textAlign:'center' }}>
      <antd.Result status={decision === 'approve' ? 'success' : 'error'} title={decision === 'approve' ? 'Special Approval Granted' : 'Application Rejected'}
        subTitle={`Your decision for ${app.id} has been recorded and the applicant notified. ${decision==='approve' ? 'An SA letter will be generated within 1 working day.' : 'The application has been closed.'}`}
        extra={[
          <antd.Button type="primary" key="queue" onClick={() => { setSubmitted(false); nav('app-queue'); }}>Back to Queue</antd.Button>,
          <antd.Button key="dash" onClick={() => { setSubmitted(false); nav('app-dashboard'); }}>Dashboard</antd.Button>,
        ]} />
    </div>
  );

  return (
    <div style={{ padding:32, maxWidth:1100, margin:'0 auto' }}>
      <antd.Button icon={<ArrowLeftOutlined />} style={{ marginBottom:16 }} onClick={() => nav('app-queue')}>Back to Queue</antd.Button>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <antd.Typography.Title level={3} style={{ margin:0 }}>{app.id}</antd.Typography.Title>
        <SAStageTag stage="approval" />
        {app.needsMosti && <antd.Tag color="purple" icon={<StarOutlined />}>MOSTI Endorsed</antd.Tag>}
        {isProhibited && <antd.Tag color="volcano" icon={<ExclamationCircleOutlined />}>Prohibited Category</antd.Tag>}
      </div>

      <antd.Row gutter={[16,16]}>
        <antd.Col xs={24} lg={14}>
          <antd.Space direction="vertical" size={16} style={{ width:'100%' }}>
            <antd.Card bordered title="Application Details" size="small">
              {[['Applicant',app.applicant],['Product',app.product],['Category',app.category],['Purpose',app.purpose],['MOSTI Ref',app.mosteRef||'(none)']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', gap:12, padding:'6px 0', borderBottom:'1px solid var(--color-divider)' }}>
                  <span style={{ width:110, fontSize:12, fontWeight:600, color:'var(--color-text-muted)', flexShrink:0 }}>{k}</span>
                  <span style={{ fontSize:13 }}>{v}</span>
                </div>
              ))}
            </antd.Card>
            <antd.Card bordered title="Approval Chain" size="small"><SAChainStatus app={app} /></antd.Card>
            <antd.Card bordered title="Recommender & Verifier Findings" size="small">
              <antd.Alert type="success" showIcon message="Recommender finding" style={{ marginBottom:10, fontSize:12 }}
                description={app.recommenderNotes || 'No notes.'} />
              <antd.Alert type="info" showIcon message="Verifier endorsement" style={{ fontSize:12 }}
                description={app.verifierNotes || 'No notes.'} />
            </antd.Card>
          </antd.Space>
        </antd.Col>

        <antd.Col xs={24} lg={10}>
          <antd.Card bordered title="Approval Decision" style={{ position:'sticky', top:20 }}>
            {isProhibited && (
              <antd.Alert type="error" showIcon icon={<ExclamationCircleOutlined />} style={{ marginBottom:16, fontSize:12 }}
                message="Prohibited equipment category"
                description="This application falls under prohibited equipment (R&D). Your approval must be documented and the DG MCMC has been pre-notified per URS §5.5.4." />
            )}
            <antd.Space direction="vertical" style={{ width:'100%', marginBottom:16 }} size={8}>
              {[
                { key:'approve',  label:'Approve',              color:'#1B7F48', desc:'Grant Special Approval. SA letter generated within 1 working day.' },
                { key:'iterate',  label:'Return to Verifier',   color:'#B87200', desc:'Return for additional verification before final decision.' },
                { key:'reject',   label:'Reject',               color:'#C62828', desc:'Reject the SA application — no further escalation.' },
              ].map(opt => (
                <div key={opt.key} onClick={() => setDecision(opt.key)} style={{
                  padding:'10px 14px', borderRadius:8, cursor:'pointer', border:`1.5px solid ${decision===opt.key?opt.color:'var(--color-border)'}`,
                  background: decision===opt.key ? `${opt.color}12` : '#fff',
                }}>
                  <div style={{ fontWeight:600, color:opt.color, fontSize:13 }}>{opt.label}</div>
                  <div style={{ fontSize:11, color:'var(--color-text-muted)', marginTop:2 }}>{opt.desc}</div>
                </div>
              ))}
            </antd.Space>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:600, marginBottom:6 }}>Approval Notes <span style={{ color:'var(--color-danger)' }}>*</span></div>
              <antd.Input.TextArea rows={4} placeholder="Provide the rationale for your decision. This will appear in the audit log and the SA letter." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            {decision === 'approve' && (
              <antd.Checkbox style={{ marginBottom:12, fontSize:12 }} checked={dgEscalate} onChange={e => setDgEscalate(e.target.checked)}>
                Flag for DG MCMC notification (prohibited / high-profile equipment)
              </antd.Checkbox>
            )}
            <antd.Button type="primary" danger={decision === 'reject'} block icon={<SendOutlined />}
              disabled={!decision || !notes.trim()}
              onClick={() => { antd.message.success(`Decision "${decision}" recorded for ${app.id}`); setSubmitted(true); }}>
              Confirm Decision
            </antd.Button>
            <div style={{ fontSize:11, color:'var(--color-text-muted)', marginTop:8, textAlign:'center' }}>This decision is final and will be recorded in the audit log.</div>
          </antd.Card>
        </antd.Col>
      </antd.Row>
    </div>
  );
};
