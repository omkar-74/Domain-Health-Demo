import { useState } from "react";
import styled from "styled-components";
import { gradeTone } from "../theme";
import { Icon, InfoIcon, RefreshIcon } from "./icons";

/* ---------- Card (matches the website's card spec) ---------- */
export const Card = styled.div`
  background: rgb(255, 255, 255);
  border: 1.5px solid rgb(3, 71, 114);
  border-radius: 8px 8px 0px;
  padding: 0.5rem 1rem 1rem;
  position: relative;
  max-height: 38rem;
  overflow: auto;
  font-family: Rajdhani, sans-serif;
  font-size: 14px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #f1e9cc;
`;
const Title = styled.h2`
  flex: 1;
  min-width: 0;
  font-family: Orbitron, Rajdhani, sans-serif;
  font-weight: 700;
  font-size: 21px;
  line-height: 1.2;
  color: ${(p) => p.theme.brand};
`;
const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(p) => p.theme.muted};
`;
const IconBtn = styled.button`
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  border-radius: 50%;
  &:hover {
    color: ${(p) => p.theme.brand};
  }
`;

export const Note = styled.p`
  margin: 4px 0 8px;
  color: ${(p) => p.theme.brand};
  font-size: 14px;
`;

/**
 * A card with the website's header: icon, title, optional grade, (i) toggles a
 * description, refresh resets the card's view state and calls onRefresh if given.
 */
export function CardShell({ icon, title, info, grade, showGrade, onRefresh, children }) {
  const [showInfo, setShowInfo] = useState(false);
  const [n, setN] = useState(0);
  return (
    <Card>
      <Head>
        <Icon name={icon} />
        <Title>{title}</Title>
        <Tools>
          {showGrade && <GradeBadge grade={grade} size={26} />}
          <IconBtn type="button" aria-label="About this check" aria-expanded={showInfo} onClick={() => setShowInfo((v) => !v)}>
            <InfoIcon />
          </IconBtn>
          <IconBtn
            type="button"
            aria-label="Refresh"
            onClick={() => {
              setN((v) => v + 1);
              onRefresh?.();
            }}
          >
            <RefreshIcon />
          </IconBtn>
        </Tools>
      </Head>
      {showInfo && info && <Note>{info}</Note>}
      <div key={n}>{children}</div>
    </Card>
  );
}

/* ---------- Rows ---------- */
export const SubHead = styled.h3`
  margin: 12px 0 4px;
  font-size: 16px;
  font-weight: 700;
  color: ${(p) => p.theme.brand};
`;

const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 5px 0;
`;
const RowLabel = styled.span`
  font-weight: 700;
  color: ${(p) => p.theme.ink};
  min-width: 0;
`;
const RowValue = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  min-width: 0;
  max-width: 62%;
  text-align: right;
  color: ${(p) => p.theme.value};
  overflow-wrap: anywhere;
`;

export function Row({ label, children, valueWidth }) {
  return (
    <RowWrap>
      <RowLabel>{label}</RowLabel>
      <RowValue style={valueWidth ? { maxWidth: valueWidth, flex: "none" } : undefined}>{children}</RowValue>
    </RowWrap>
  );
}

/* ---------- Yes / No / unknown value with the website's icons ---------- */
export function StatusIcon({ ok, size = 18 }) {
  if (ok === true)
    return (
      <svg width={size} height={size} viewBox="0 0 18 18" role="img" aria-label="Yes">
        <rect x="1" y="1" width="16" height="16" rx="3" fill="#43b06a" />
        <path d="M5 9.2l2.6 2.6L13 6.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (ok === false)
    return (
      <svg width={size} height={size} viewBox="0 0 18 18" role="img" aria-label="No">
        <path d="M4 4l10 10M14 4L4 14" stroke="#f0457a" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" role="img" aria-label="Unknown">
      <circle cx="9" cy="9" r="7.5" fill="none" stroke="#9aa6b2" strokeWidth="1.5" />
      <path d="M6 9h6" stroke="#9aa6b2" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function YesNo({ ok, yes = "Yes", no = "No", unknown = "Unknown" }) {
  return (
    <>
      <StatusIcon ok={ok} />
      <span>{ok === true ? yes : ok === false ? no : unknown}</span>
    </>
  );
}

/* ---------- Small pieces ---------- */
const BadgeBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: ${(p) => Math.round(p.$size * 0.28)}px;
  font-family: Orbitron, Rajdhani, sans-serif;
  font-weight: 700;
  font-size: ${(p) => Math.round(p.$size * 0.5)}px;
  color: ${(p) => p.$tone.fg};
  background: ${(p) => p.$tone.bg};
`;
export function GradeBadge({ grade, size = 28 }) {
  return (
    <BadgeBox $size={size} $tone={gradeTone(grade)} aria-label={`Grade ${grade || "not available"}`}>
      {grade || "–"}
    </BadgeBox>
  );
}

export const Pill = styled.span`
  display: inline-block;
  padding: 1px 10px;
  border-radius: 999px;
  background: #e1eefb;
  color: ${(p) => p.theme.brand};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

const Track = styled.div`
  height: 6px;
  border-radius: 999px;
  background: ${(p) => p.theme.line};
  overflow: hidden;
`;
const Fill = styled.div`
  height: 100%;
  width: ${(p) => p.$v}%;
  background: ${(p) => p.$c};
  border-radius: inherit;
`;
export function Bar({ value, color, label }) {
  return (
    <Track role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value ?? 0}>
      <Fill $v={value ?? 0} $c={color} />
    </Track>
  );
}
