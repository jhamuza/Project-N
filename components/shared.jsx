// Shared components: AI score visualisations, status pills, page shell
const { Layout, Menu, Button, Avatar, Dropdown, Badge, Tag, Space, Typography, Breadcrumb, Input, Select, Tooltip, Progress, Card, Row, Col, Statistic, Table, Steps, Form, Upload, Modal, Drawer, Alert, Radio, Checkbox, DatePicker, Divider, List, Tabs, Empty, Segmented } = antd;
const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// --- STATUS PILL ---
function StatusPill({ status }) {
  const map = {
    draft:              { cls: 'draft',     label: 'Draft' },
    under_review:       { cls: 'review',    label: 'Under Review' },
    submitted:          { cls: 'review',    label: 'Submitted' },
    iteration_required: { cls: 'iteration', label: 'Iteration Required' },
    approved:           { cls: 'approved',  label: 'Approved' },
    rejected:           { cls: 'rejected',  label: 'Rejected' },
    expired:            { cls: 'expired',   label: 'Expired' },
    priority:           { cls: 'priority',  label: 'Priority Review' },
  };
  const s = map[status] || { cls: 'draft', label: status };
  return <span className={`status-pill ${s.cls}`}><span className="dot" />{s.label}</span>;
}

function SchemeBadge({ scheme }) {
  const cls = scheme?.toLowerCase();
  const label = scheme === 'SA' ? 'Special Approval' : `Scheme ${scheme}`;
  return <span className={`scheme-badge ${cls}`}>{label}</span>;
}

// --- AI SCORE (3 variants, controlled via viz prop) ---
function AiScoreCard({ score, reasoning, viz = 'gauge', compact = false, supplierMode = false }) {
  const tone = score >= 90 ? 'success' : score >= 70 ? 'warning' : 'danger';
  const verdictMcmc = score >= 90 ? 'Auto-accept eligible' : score >= 70 ? 'Priority review' : 'Standard review';
  const verdictSupplier = score >= 90 ? 'Approved automatically' : score >= 70 ? 'Under review' : 'Further review required';
  const verdict = supplierMode ? verdictSupplier : verdictMcmc;
  const toneColor = { success: 'var(--color-success)', warning: 'var(--color-warning)', danger: 'var(--color-danger)' }[tone];
  const [expanded, setExpanded] = React.useState(false);

  const Header = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: .5, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{supplierMode ? 'Compliance Score' : 'AI Confidence Score'}</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{supplierMode ? '8 compliance criteria' : 'Qwen2.5-VL · 8 criteria'}</div>
      </div>
      <Tag color={tone === 'success' ? 'green' : tone === 'warning' ? 'orange' : 'red'} style={{ margin: 0, fontWeight: 600 }}>{verdict}</Tag>
    </div>
  );

  const Gauge = () => {
    const r = 52, c = 2 * Math.PI * r;
    return (
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <svg className={`score-gauge ${tone}`} viewBox="0 0 120 120" width={120} height={120}>
          <circle className="bg" cx="60" cy="60" r={r} />
          <circle className="fg" cx="60" cy="60" r={r} strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} transform="rotate(-90 60 60)" />
          <text x="60" y="58" textAnchor="middle" fontSize="28" fontWeight="700" fill="var(--color-text-primary)">{score}</text>
          <text x="60" y="76" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">/ 100</text>
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .3, fontWeight: 600 }}>Result</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, color: toneColor }}>{verdict}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 8 }}>
            {supplierMode ? (
              <>
                {tone === 'success' && 'All compliance criteria met. Your application qualifies for expedited processing.'}
                {tone === 'warning' && 'Minor items flagged. An officer will review your submission within 2 working days.'}
                {tone === 'danger' && 'Some criteria require attention. An officer will contact you with details.'}
              </>
            ) : (
              <>
                {tone === 'success' && 'Exceeds 90% threshold. Officer review optional for Scheme C.'}
                {tone === 'warning' && '70–89% band. Routes to priority queue.'}
                {tone === 'danger' && 'Below 70%. Standard officer review required.'}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Bar = () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: toneColor, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>/ 100</span>
        <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: toneColor }}>{verdict}</span>
      </div>
      <div style={{ position: 'relative', height: 10, background: 'var(--color-bg-subtle)', borderRadius: 999 }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, var(--color-danger) 0%, var(--color-danger) 69%, var(--color-warning) 70%, var(--color-warning) 89%, var(--color-success) 90%, var(--color-success) 100%)`, opacity: .18, borderRadius: 999 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${score}%`, background: toneColor, borderRadius: 999, transition: 'width .8s' }} />
        <div style={{ position: 'absolute', left: '70%', top: -4, bottom: -4, width: 1, background: 'var(--color-border-strong)' }} />
        <div style={{ position: 'absolute', left: '90%', top: -4, bottom: -4, width: 1, background: 'var(--color-border-strong)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 600 }}>
        <span>0</span><span>70</span><span>90</span><span>100</span>
      </div>
    </div>
  );

  const Verdict = () => (
    <div style={{ textAlign: 'center', padding: '12px 0' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 999, background: `${toneColor}15`, border: `1px solid ${toneColor}40` }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: toneColor }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: toneColor, letterSpacing: .3 }}>{verdict.toUpperCase()}</span>
      </div>
      <div style={{ fontSize: 56, fontWeight: 800, color: toneColor, lineHeight: 1.1, marginTop: 12, fontFeatureSettings: '"tnum"' }}>{score}<span style={{ fontSize: 20, color: 'var(--color-text-muted)', fontWeight: 500 }}> / 100</span></div>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Generated 2 minutes ago · 8 criteria evaluated</div>
    </div>
  );

  return (
    <Card size="small" bordered style={{ borderColor: 'var(--color-border)' }}>
      {Header}
      <div style={{ marginTop: 16 }}>
        {viz === 'gauge' && <Gauge />}
        {viz === 'bar' && <Bar />}
        {viz === 'verdict' && <Verdict />}
      </div>
      {!compact && (
        <>
          <Divider style={{ margin: '16px 0 12px' }} />
          <Button type="link" size="small" style={{ padding: 0 }} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide' : 'Show'} {supplierMode ? 'compliance details' : 'reasoning'} ({reasoning.length} criteria)
          </Button>
          {expanded && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {reasoning.map((r, i) => (
                <div key={i} style={{ padding: 10, background: r.pass ? 'var(--color-success-bg)' : 'var(--color-warning-bg)', borderRadius: 8, borderLeft: `3px solid ${r.pass ? 'var(--color-success)' : 'var(--color-warning)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{r.category}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: r.pass ? 'var(--color-success)' : 'var(--color-warning)' }}>{r.score}/{r.max}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.5 }}>{r.note}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
}

Object.assign(window, { StatusPill, SchemeBadge, AiScoreCard });
