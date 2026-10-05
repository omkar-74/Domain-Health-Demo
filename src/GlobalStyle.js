import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    background: ${(p) => p.theme.bg};
    color: ${(p) => p.theme.ink};
    font-family: Rajdhani, system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, p { margin: 0; }
  button { font: inherit; color: inherit; cursor: pointer; }
  a { color: ${(p) => p.theme.brand}; }
  :focus-visible { outline: 2px solid ${(p) => p.theme.focus}; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
`;
