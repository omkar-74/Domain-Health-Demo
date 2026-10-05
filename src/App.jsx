import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { theme } from "./theme";
import report from "./data/report.json";
import CategoryCard from "./components/CategoryCard";
import { OverallCard, ComplianceCard, ServerInfoCard, AttackSurfaceCard, RootCauseCard, FixesCard } from "./components/SummaryCards";

const Page = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px 64px;
`;
const Title = styled.h1`
  font-family: Orbitron, Rajdhani, sans-serif;
  font-size: clamp(24px, 4vw, 34px);
  color: ${(p) => p.theme.brand};
`;
const Sub = styled.p`
  margin: 4px 0 20px;
  color: ${(p) => p.theme.muted};
  font-size: 15px;
`;

// Masonry: CSS columns flow cards top to bottom, then into the next column.
const Masonry = styled.div`
  columns: 3 340px;
  column-gap: 16px;
`;
const Slot = styled.div`
  break-inside: avoid;
  margin-bottom: 16px;
`;

// Swap `report` for a fetch() result or a prop when wiring this to your API.
export default function App({ data = report }) {
  const c = data.categories;
  const cards = [
    <OverallCard key="overall" data={data} />,
    <CategoryCard key="dns" id="dns" category={c.dns} />,
    <CategoryCard key="headers" id="headers" category={c.headers} />,
    <ComplianceCard key="compliance" compliance={data.compliance} />,
    <ServerInfoCard key="server" data={data} />,
    <CategoryCard key="tls" id="tls" category={c.tls} />,
    <CategoryCard key="reach" id="reachability" category={c.reachability} />,
    <CategoryCard key="third" id="thirdParties" category={c.thirdParties} />,
    <AttackSurfaceCard key="surface" attackSurface={data.attackSurface} />,
    <CategoryCard key="routing" id="routing" category={c.routing} />,
    <RootCauseCard key="root" rootCause={data.rootCause} />,
    <FixesCard key="fixes" items={data.recommendations} />,
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Title>{data.domain}</Title>
        <Sub>Domain health report</Sub>
        <Masonry>
          {cards.map((card) => (
            <Slot key={card.key}>{card}</Slot>
          ))}
        </Masonry>
      </Page>
    </ThemeProvider>
  );
}
