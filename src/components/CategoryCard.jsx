import { useState } from "react";
import styled from "styled-components";
import { CardShell, Row, SubHead, YesNo, StatusIcon, Pill, Note } from "./ui";

const META = {
  dns: { title: "DNS", icon: "globe", info: "Name resolution and email authentication (SPF, DMARC, DNSSEC)." },
  tls: { title: "TLS", icon: "lock", info: "HTTPS connection, certificate validity and Certificate Transparency." },
  headers: { title: "Security Headers", icon: "anchor", info: "HTTP response headers that harden the site in the browser." },
  thirdParties: { title: "Third-Party Scripts", icon: "puzzle", info: "External scripts loaded by the page and their risk." },
  reachability: { title: "Reachability", icon: "signal", info: "Whether the site responds, how fast, and how it redirects." },
  routing: { title: "Routing", icon: "route", info: "BGP visibility, RPKI validation and domain age." },
};

const num = (v, unit = "") => (v == null ? "—" : `${v}${unit}`);
const present = (v) => v != null && v !== "";

// Which key facts to show at the top of each card, taken from category.data
const DETAILS = {
  dns: (d) => [
    ["A record", <YesNo ok={d.hasA} />],
    ["AAAA (IPv6)", <YesNo ok={d.hasAAAA} />],
    ["MX records", <YesNo ok={d.hasMX} />],
    ["Nameservers", `${d.nsCount}${d.nsDiverse ? "" : " (not diverse)"}`],
    ["DNSSEC", <YesNo ok={d.dnssec} />],
    ["CAA record", <YesNo ok={d.hasCAA} />],
    ["SPF", <YesNo ok={d.spf?.valid} yes="Valid" no="Missing" />],
    ["SPF record", d.spf?.record || "—"],
    ["DMARC", <YesNo ok={d.dmarc?.valid} yes="Valid" no="Missing" />],
  ],
  tls: (d) => [
    ["Reachable over HTTPS", <YesNo ok={d.reachable} />],
    ["Protocol", d.version || "—"],
    ["Certificate valid", <YesNo ok={d.certValid} />],
    ["Days until expiry", d.daysUntilExpiry == null ? "Unknown" : d.daysUntilExpiry],
    ["CT log data", <YesNo ok={d.ctAvailable} yes="Available" no="Unavailable" />],
  ],
  headers: (d) => [
    ["Strict-Transport-Security", <YesNo ok={present(d.hsts)} />],
    ["Content-Security-Policy", <YesNo ok={present(d.csp)} />],
    ["X-Content-Type-Options", <YesNo ok={present(d.xContentType)} />],
    ["X-Frame-Options", <YesNo ok={present(d.xFrameOptions)} />],
    ["Referrer-Policy", <YesNo ok={present(d.referrerPolicy)} />],
    ["Permissions-Policy", <YesNo ok={present(d.permissionsPolicy)} />],
  ],
  thirdParties: (d) => [
    ["Scripts detected", d.total],
    ["High risk", d.highRisk],
    ["Cross-site", d.crossSite],
    ["Before consent", d.beforeConsent],
    ["Render blocking", d.renderBlocking],
    ["Without SRI", d.scriptsWithoutSRI],
    ["Compromised", d.compromisedScripts],
  ],
  reachability: (d) => [
    ["Status code", d.statusCode],
    ["Response time", num(d.responseTimeMs, " ms")],
    ["HTTPS redirect", <YesNo ok={d.httpsRedirect} />],
    ["Redirects", d.redirectCount],
    ["security.txt", <YesNo ok={d.securityTxt?.present} yes="Present" no="Not found" />],
  ],
  routing: (d) => [
    ["BGP route visible", <YesNo ok={d.bgpVisible} />],
    ["RPKI valid", <YesNo ok={d.available ? d.rpkiValid : null} unknown="Not checked" />],
    ["Domain age", d.registeredDays == null ? "—" : `${d.registeredDays} days`],
  ],
};

const FindingBtn = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 5px 0;
  cursor: pointer;
  font-weight: 700;
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.focus};
    outline-offset: 2px;
  }
  .l {
    min-width: 0;
  }
  .l::before {
    content: "${(p) => (p.$open ? "▼" : "▶")} ";
    font-size: 11px;
    color: ${(p) => p.theme.brand};
  }
  .r {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    color: ${(p) => p.theme.value};
    white-space: nowrap;
  }
`;
const Fix = styled.div`
  margin: 0 0 6px 14px;
  p {
    margin: 0 0 4px;
    color: ${(p) => p.theme.brand};
  }
  p.fix {
    color: ${(p) => p.theme.value};
  }
`;
const Tags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

function Finding({ f }) {
  const [open, setOpen] = useState(false);
  const ok = f.status === "pass" ? true : f.status === "fail" ? false : null;
  const text = ok === true ? "Pass" : ok === false ? "Fail" : "Inconclusive";
  return (
    <>
      <FindingBtn type="button" $open={open} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="l">{f.label}</span>
        <span className="r">
          <StatusIcon ok={ok} />
          {text}
        </span>
      </FindingBtn>
      {open && (
        <Fix>
          <p>{f.detail}</p>
          {f.status !== "pass" && f.remediation && <p className="fix">{f.remediation}</p>}
          {f.frameworks.length > 0 && (
            <Tags>
              {f.frameworks.map((fw) => (
                <Pill key={fw}>{fw}</Pill>
              ))}
            </Tags>
          )}
        </Fix>
      )}
    </>
  );
}

export default function CategoryCard({ id, category }) {
  const meta = META[id] || { title: id, icon: "globe", info: "" };
  const rows = DETAILS[id]?.(category.data) || [];
  const fails = category.findings.filter((f) => f.status === "fail");

  return (
    <CardShell icon={meta.icon} title={meta.title} info={meta.info} grade={category.grade} showGrade>
      {category.percent == null ? (
        <Note>Not enough conclusive checks to give this a grade.</Note>
      ) : (
        <Row label="Score">
          {category.score} / {category.maxScore} ({category.percent}%)
        </Row>
      )}
      <Row label="Checks completed">
        {category.coverage.completed} / {category.coverage.total}
      </Row>
      {rows.map(([label, value]) => (
        <Row key={label} label={label}>
          {value}
        </Row>
      ))}
      <SubHead>Checks{fails.length ? ` (${fails.length} failed)` : ""}</SubHead>
      {category.findings.map((f) => (
        <Finding key={f.id} f={f} />
      ))}
    </CardShell>
  );
}
