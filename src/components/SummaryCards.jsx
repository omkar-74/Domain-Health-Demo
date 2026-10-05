import styled from "styled-components";
import { CardShell, Row, SubHead, GradeBadge, Bar, Pill, StatusIcon, Note } from "./ui";
import { percentTone, gradeTone } from "../theme";

const fmtDate = (iso) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

export function OverallCard({ data }) {
  const { overall } = data;
  return (
    <CardShell icon="gauge" title="Overall Score" info="Weighted result of every conclusive check across all categories.">
      <Row label="Grade">
        <GradeBadge grade={overall.grade} size={34} />
      </Row>
      <Row label="Score">{overall.percent}%</Row>
      <Bar value={overall.percent} color={gradeTone(overall.grade).fg} label="Overall score" />
      <div style={{ height: 8 }} />
      <Row label="Coverage">{overall.coverage.percent}%</Row>
      <Row label="Confidence">{overall.coverage.confidence}</Row>
      <Row label="Status">{overall.status}</Row>
      <Row label="Scanned">{fmtDate(data.generatedAt)}</Row>
      <Row label="Scan time">{(data.durationMs / 1000).toFixed(1)} s</Row>
      <Row label="Scoring version">{data.scoringVersion}</Row>
    </CardShell>
  );
}

const Item = styled.div`
  padding: 6px 0 4px;
`;

export function ComplianceCard({ compliance }) {
  return (
    <CardShell icon="scale" title="Compliance" info="Share of controls mapped to each framework that pass.">
      {Object.entries(compliance).map(([name, c]) => (
        <Item key={name}>
          <Row label={name}>
            {c.passed} / {c.total} · {c.percent}%
          </Row>
          <Bar value={c.percent} color={percentTone(c.percent).fg} label={`${name} compliance`} />
        </Item>
      ))}
    </CardShell>
  );
}

export function ServerInfoCard({ data }) {
  const h = data.categories.headers.data;
  const r = data.categories.reachability.data;
  const age = data.categories.routing.data.registeredDays;
  return (
    <CardShell icon="server" title="Server Info" info="What the response headers and detected technology reveal about the hosting.">
      <Row label="Server">{h.server || "—"}</Row>
      <Row label="Via">{h.via || "—"}</Row>
      <Row label="CF-Ray">{h.cfRay || "—"}</Row>
      <Row label="HTTP status">{r.statusCode}</Row>
      <Row label="Response time">{r.responseTimeMs} ms</Row>
      <Row label="Registered">{age == null ? "—" : `${age} days ago`}</Row>
      <SubHead>Detected technology</SubHead>
      {data.techStack.length === 0 && <Note>Nothing detected.</Note>}
      {data.techStack.map((t) => (
        <Row key={t.name} label={t.name}>
          <Pill>{t.type.toUpperCase()}</Pill>
        </Row>
      ))}
    </CardShell>
  );
}

const LABELS = {
  exposedServices: "Exposed services",
  subdomainsInCT: "Subdomains in CT logs",
  thirdPartyScripts: "Third-party scripts",
  externalDomains: "External domains",
};

export function AttackSurfaceCard({ attackSurface }) {
  return (
    <CardShell icon="target" title="Attack Surface" info="What an attacker can see from outside: services, subdomains and third-party code.">
      <Row label="Score">{attackSurface.score}</Row>
      {Object.entries(attackSurface.breakdown).map(([k, v]) => (
        <Row key={k} label={LABELS[k] || k}>
          {v}
        </Row>
      ))}
    </CardShell>
  );
}

const Link = styled.a`
  font-weight: 600;
  white-space: nowrap;
`;

const SIGNALS = { dns: "DNS", tls: "TLS", http: "HTTP", routing: "Routing", dependencies: "Dependencies" };

export function RootCauseCard({ rootCause }) {
  return (
    <CardShell icon="pulse" title="Root Cause" info="Where the scan thinks a problem sits, based on DNS, TLS, HTTP, routing and provider status.">
      <Note>{rootCause.summary}</Note>
      <Row label="Suspected layer">{rootCause.suspectedLayer}</Row>
      <Row label="Confidence">{rootCause.confidence}</Row>
      <SubHead>Signals</SubHead>
      {rootCause.evidence.map((e) => (
        <Row key={e.signal} label={SIGNALS[e.signal] || e.signal}>
          <StatusIcon ok={e.status === "healthy"} />
          <span>{e.detail}</span>
        </Row>
      ))}
      {rootCause.dependencyIncidents?.map((p) => (
        <div key={p.provider}>
          <SubHead>
            {p.provider} ({p.status})
          </SubHead>
          <Note style={{ marginTop: 0 }}>{p.description}</Note>
          {p.incidents.map((i) => (
            <Row key={i.shortlink} label={`▶ ${i.name}`} valueWidth="auto">
              <Pill>{i.status}</Pill>
              <Link href={i.shortlink} target="_blank" rel="noreferrer">
                View
              </Link>
            </Row>
          ))}
        </div>
      ))}
    </CardShell>
  );
}

const CATS = { dns: "DNS", tls: "TLS", headers: "Headers", thirdParties: "Third parties", reachability: "Reachability", routing: "Routing" };

export function FixesCard({ items }) {
  return (
    <CardShell icon="wrench" title="Fix First" info="Fixes in scan order. The points show how much each would add to the overall score.">
      {items.map((r) => (
        <div key={r.id} style={{ paddingBottom: 6 }}>
          <Row label={`▶ ${r.label}`}>+{r.overallImprovement} pts</Row>
          <Note style={{ margin: "0 0 0 14px", color: "#6a7886" }}>
            {CATS[r.category] || r.category}: {r.catGradeBefore} to {r.catGradeAfter}
          </Note>
        </div>
      ))}
    </CardShell>
  );
}
