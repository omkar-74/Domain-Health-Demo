// Small pastel icons, drawn on a 24px grid. Fill uses the theme's icon blue.
const paths = {
  gauge: (
    <>
      <path d="M3 17a9 9 0 1 1 18 0z" />
      <path d="M12 17l4-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  scale: (
    <>
      <path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z" />
      <path d="M8.5 12l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" stroke="#fff" strokeWidth="1.5" fill="none" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="3" width="18" height="8" rx="2.5" />
      <rect x="3" y="13" width="18" height="8" rx="2.5" />
      <circle cx="7" cy="7" r="1.3" fill="#fff" />
      <circle cx="7" cy="17" r="1.3" fill="#fff" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#7db8ee" strokeWidth="2.2" fill="none" />
    </>
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="2.6" />
      <path d="M12 8v13M5 13a7 7 0 0 0 14 0M8 11h8" stroke="#7db8ee" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </>
  ),
  puzzle: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </>
  ),
  signal: (
    <>
      <path d="M2 9a14 14 0 0 1 20 0" stroke="#7db8ee" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M5.5 12.5a9 9 0 0 1 13 0" stroke="#7db8ee" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M9 16a4 4 0 0 1 6 0" stroke="#7db8ee" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="19.5" r="1.8" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 15V9a3 3 0 0 1 3-3h6" stroke="#7db8ee" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" fill="#fff" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  pulse: (
    <>
      <rect x="2" y="3" width="20" height="18" rx="3" />
      <path d="M4.5 13h4l2-5 3 9 2-4h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  wrench: (
    <>
      <path d="M21 6.5a5 5 0 0 1-6.6 4.8L6 19.7a2 2 0 0 1-2.8-2.8l8.4-8.4A5 5 0 0 1 17.5 2l-3 3 .5 3.5 3.5.5z" />
    </>
  ),
};

export function Icon({ name, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#7db8ee" aria-hidden="true" style={{ flex: "none" }}>
      {paths[name] || paths.globe}
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5" strokeLinecap="round" />
      <circle cx="10" cy="6.3" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 10a6 6 0 1 1-2-4.5" strokeLinecap="round" />
      <path d="M16 3v3.5h-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
