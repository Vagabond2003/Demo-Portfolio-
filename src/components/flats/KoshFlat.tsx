import { Bar, Box, Callouts, Dot, Fill, FlatSvg, Line, Seam, ViewLabel, type CalloutSpec } from "./primitives";

const callouts: CalloutSpec[] = [
  { n: 1, x: 52, y: 108, tx: 134, ty: 108 },
  { n: 2, x: 52, y: 176, tx: 142, ty: 171 },
  { n: 3, x: 382, y: 172, tx: 336, ty: 147 },
  { n: 4, x: 372, y: 124, tx: 372, ty: 93 },
  { n: 5, x: 52, y: 300, tx: 130, ty: 300 },
];

export function KoshFlat({ active }: { active: number | null }) {
  return (
    <FlatSvg viewBox="0 0 420 490" title="Technical flat of the Kosh wallet screen on a phone, with five numbered callouts.">
      {/* Body */}
      <Box x={112} y={24} w={196} h={412} r={30} width={1.5} />
      <Box x={120} y={32} w={180} h={396} r={23} width={0.9} />
      <Line d="M110 116v26M110 156v40M310 136v52" width={2.4} />
      <Fill x={180} y={44} w={60} h={14} r={7} density={0.85} />

      {/* Balance header */}
      <Fill x={120} y={32} w={180} h={150} r={23} density={0.07} />
      <Line d="M120 182V55a23 23 0 0 1 23-23h134a23 23 0 0 1 23 23v127" width={0.9} />
      <Seam x={126} y={66} w={168} h={78} r={6} />
      <Bar x={134} y={72} w={64} />
      <Bar x={134} y={90} w={78} h={2.5} />
      <Bar x={134} y={102} w={110} h={12} tone={2.4} />
      <Box x={134} y={124} w={56} h={14} r={7} width={0.9} />
      <Box x={196} y={124} w={56} h={14} r={7} width={0.9} />

      {/* Action card */}
      <Box x={130} y={150} w={160} h={62} r={12} fill="var(--color-paper)" />
      {[142, 178, 214, 250].map((x) => (
        <g key={x}>
          <Box x={x} y={160} w={22} h={22} r={6} width={1} />
          <Bar x={x + 1} y={190} w={20} h={2.5} />
        </g>
      ))}
      <Line d="M147 176l12-6-4 11-2-4z" width={0.9} />
      <Line d="M182 167h14v8h-14zM189 171m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" width={0.9} />
      <Line d="M219 166h5v5h-5zM226 166h5v5h-5zM219 173h5v5h-5zM228 175h3v3" width={0.9} />
      <Line d="M257 165h8v14h-8zM260 176h2" width={0.9} />

      {/* PIN verified bubble, overhanging the screen as in the real UI */}
      <Box x={236} y={132} w={100} h={30} r={8} fill="var(--color-paper)" />
      <Line d="M246 139l6-2 6 2v5c0 4-3 6-6 7-3-1-6-3-6-7z" width={0.9} />
      <Bar x={262} y={141} w={42} tone={1.6} />
      <Bar x={262} y={150} w={64} h={2.5} />

      {/* Recent payments */}
      <Bar x={132} y={226} w={36} h={2.5} tone={1.4} />
      {[238, 282, 326].map((y) => (
        <g key={y}>
          <Box x={130} y={y} w={160} h={36} r={8} width={1} />
          <Box x={138} y={y + 8} w={20} h={20} r={5} width={0.9} />
          <Bar x={166} y={y + 12} w={60} />
          <Bar x={166} y={y + 21} w={40} h={2.5} tone={0.7} />
          <Bar x={248} y={y + 14} w={34} tone={1.8} />
        </g>
      ))}
      <Box x={84} y={262} w={96} h={30} r={8} fill="var(--color-paper)" />
      <Dot cx={97} cy={277} r={6} />
      <Line d="M94 277l2 2 4-4" width={0.9} />
      <Bar x={108} y={271} w={56} tone={1.4} />
      <Bar x={108} y={280} w={44} h={2.5} />
      <Bar x={180} y={414} w={60} h={4} tone={2.2} />

      {/* Detail A: language switch */}
      <circle cx={372} cy={58} r={34} className="flat-line" fill="var(--color-paper)" stroke="currentColor" strokeWidth={1} />
      <Box x={346} y={48} w={52} h={20} r={10} width={1} />
      <Fill x={348} y={50} w={24} h={16} r={8} density={0.85} />
      <text x={360} y={61.5} textAnchor="middle" className="flat-fill" fill="var(--color-paper)" style={{ font: "700 8px var(--font-archivo)" }}>
        EN
      </text>
      <text x={385} y={62} textAnchor="middle" lang="bn" className="flat-fill" fill="currentColor" style={{ font: "600 8px var(--font-anek)" }}>
        বাংলা
      </text>
      <text x={372} y={84} textAnchor="middle" className="flat-fill" fill="currentColor" opacity={0.6} style={{ font: "600 6.5px var(--font-archivo)", letterSpacing: "0.14em" }}>
        DETAIL A
      </text>

      <ViewLabel x={210} y={474}>
        FRONT VIEW · KSH-01
      </ViewLabel>
      <Callouts items={callouts} active={active} />
    </FlatSvg>
  );
}
