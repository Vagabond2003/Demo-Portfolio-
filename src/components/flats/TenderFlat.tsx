import { Bar, Box, Callouts, Dot, Fill, FlatSvg, Line, ViewLabel, type CalloutSpec } from "./primitives";

const callouts: CalloutSpec[] = [
  { n: 1, x: 18, y: 110, tx: 51, ty: 110 },
  { n: 2, x: 256, y: 16, tx: 256, ty: 152 },
  { n: 3, x: 364, y: 16, tx: 364, ty: 150 },
  { n: 4, x: 540, y: 277, tx: 490, ty: 277 },
  { n: 5, x: 540, y: 71, tx: 476, ty: 71 },
];

const stepWidths = [54, 40, 58, 52];
const rows = [204, 234, 264, 294];

export function TenderFlat({ active }: { active: number | null }) {
  return (
    <FlatSvg viewBox="0 0 560 400" title="Technical flat of the Tender Package Builder in a browser window, with five numbered callouts.">
      {/* Window */}
      <Box x={40} y={36} w={480} h={300} r={8} width={1.5} />
      <Line d="M40 56H520" width={1} />
      <Dot cx={54} cy={46} r={3} />
      <Dot cx={64} cy={46} r={3} />
      <Dot cx={74} cy={46} r={3} />
      <Box x={150} y={41} w={260} h={10} r={5} width={0.8} />

      {/* Sidebar with the four steps */}
      <Fill x={41} y={57} w={95} h={278} density={0.12} />
      <Bar x={50} y={68} w={60} tone={1.8} />
      <Bar x={50} y={76} w={44} tone={1.8} />
      <Bar x={50} y={94} w={30} h={2.5} />
      {stepWidths.map((w, i) => (
        <g key={i}>
          <Dot cx={56} cy={110 + i * 22} r={5} filled={i === 0} />
          <Bar x={66} y={108 + i * 22} w={w} />
        </g>
      ))}
      <Fill x={48} y={200} w={80} h={16} r={3} density={0.18} />
      <Bar x={66} y={206.5} w={44} h={2.5} tone={1.6} />

      {/* Title and language switch */}
      <Bar x={150} y={66} w={120} h={7} tone={3} />
      <Bar x={150} y={80} w={170} h={2.5} />
      <Box x={420} y={64} w={56} h={14} r={3} width={0.9} />
      <Fill x={421} y={65} w={27} h={12} r={2} density={0.85} />
      <text x={434.5} y={74} textAnchor="middle" className="flat-fill" fill="var(--color-paper)" style={{ font: "700 6.5px var(--font-archivo)" }}>
        EN
      </text>
      <text x={462} y={74.5} textAnchor="middle" lang="bn" className="flat-fill" fill="currentColor" style={{ font: "600 7px var(--font-anek)" }}>
        বাংলা
      </text>
      <Box x={482} y={64} w={30} h={14} r={3} width={0.8} />

      {/* Add PDF files */}
      <Box x={150} y={92} w={362} h={86} r={4} />
      <Dot cx={160} cy={102} r={4} />
      <Bar x={170} y={100} w={62} tone={1.6} />
      <rect x={158} y={110} width={346} height={26} rx={3} className="flat-seam" fill="none" stroke="currentColor" strokeWidth={0.8} strokeDasharray="3 2.5" opacity={0.55} />
      <Fill x={300} y={117} w={62} h={12} r={2} density={0.85} />

      {/* File checks: rejected, duplicate, accepted */}
      {[158, 274, 390].map((x, i) => (
        <g key={x}>
          {i === 1 ? <Fill x={x} y={142} w={110} h={28} r={3} density={0.07} /> : null}
          <Box x={x} y={142} w={i === 2 ? 114 : 110} h={28} r={3} width={0.9} />
          <Box x={x + 5} y={147} w={14} h={18} r={2} width={0.8} />
          <Bar x={x + 24} y={150} w={58} />
          <Bar x={x + 24} y={158} w={36} h={2.5} />
        </g>
      ))}
      <Line d="M252 152l8 8M260 152l-8 8" width={1.3} />
      <Fill x={350} y={147} w={28} h={8} r={4} density={0.3} />
      <Line d="M486 156l3 3 6-6" width={1.2} />

      {/* Match table */}
      <Box x={150} y={186} w={362} h={142} r={4} />
      {[
        [160, 10],
        [180, 40],
        [270, 30],
        [390, 40],
        [464, 28],
      ].map(([x, w]) => (
        <Bar key={x} x={x} y={194} w={w} h={2.5} tone={1.4} />
      ))}
      <Line d="M150 204H512" width={0.8} />
      {rows.map((y, i) => (
        <g key={y}>
          {i > 0 ? <Line d={`M150 ${y}H512`} width={0.5} /> : null}
          <Bar x={160} y={y + 10} w={6} tone={1.6} />
          <Bar x={180} y={y + 8} w={70} tone={1.4} />
          <Box x={180} y={y + 16} w={30} h={7} r={3.5} width={0.7} />
          <Box x={270} y={y + 7} w={100} h={13} r={2} width={0.8} />
          {i % 2 === 0 ? (
            <Box x={390} y={y + 7} w={56} h={13} r={2} width={0.8} />
          ) : (
            <Bar x={390} y={y + 12} w={40} h={2.5} />
          )}
          {i === 2 ? (
            <Fill x={464} y={y + 9} w={26} h={9} r={4.5} density={0.85} />
          ) : (
            <Box x={464} y={y + 9} w={26} h={9} r={4.5} width={0.8} />
          )}
        </g>
      ))}

      <ViewLabel x={280} y={372}>
        FRONT VIEW · TPB-03
      </ViewLabel>
      <Callouts items={callouts} active={active} />
    </FlatSvg>
  );
}
