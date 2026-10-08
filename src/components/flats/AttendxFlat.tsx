import { Bar, Box, Callouts, Dot, Fill, FlatSvg, Line, ViewLabel, type CalloutSpec } from "./primitives";

const callouts: CalloutSpec[] = [
  { n: 1, x: 52, y: 132, tx: 164, ty: 132 },
  { n: 2, x: 52, y: 218, tx: 130, ty: 218 },
  { n: 3, x: 372, y: 283, tx: 290, ty: 283 },
  { n: 4, x: 52, y: 354, tx: 142, ty: 354 },
  { n: 5, x: 360, y: 350, tx: 360, ty: 381 },
];

const chart = [22, 34, 28, 40, 18, 36, 30];

export function AttendxFlat({ active }: { active: number | null }) {
  return (
    <FlatSvg viewBox="0 0 420 490" title="Technical flat of the AttendX dashboard on a phone, with five numbered callouts.">
      <Box x={112} y={24} w={196} h={412} r={30} width={1.5} />
      <Box x={120} y={32} w={180} h={396} r={23} width={0.9} />
      <Line d="M110 116v26M110 156v40M310 136v52" width={2.4} />
      <Fill x={180} y={44} w={60} h={14} r={7} density={0.85} />

      <Bar x={134} y={68} w={70} tone={1.6} />
      <Bar x={134} y={78} w={50} h={2.5} />
      <Box x={250} y={64} w={40} h={12} r={6} width={0.9} />

      {/* Attendance wheel */}
      <circle cx={210} cy={140} r={44} className="flat-fill" fill="none" stroke="currentColor" strokeWidth={7} opacity={0.12} />
      <path d="M210 96A44 44 0 1 1 166.8 131.8" className="flat-line" fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
      <Bar x={190} y={132} w={40} h={10} tone={3} />
      <Bar x={196} y={148} w={28} h={2.5} />

      {/* At-risk alert */}
      <Fill x={130} y={196} w={160} h={44} r={10} density={0.07} />
      <Box x={130} y={196} w={160} h={44} r={10} width={1} />
      <Line d="M144 226l7-12 7 12zM151 219v3" width={1} />
      <Bar x={166} y={208} w={96} tone={1.6} />
      <Bar x={166} y={217} w={70} h={2.5} />
      <Bar x={166} y={225} w={50} h={2.5} />

      {/* Stats */}
      <Box x={130} y={248} w={160} h={70} r={10} />
      {chart.map((h, i) => (
        <rect key={i} x={146 + i * 19} y={306 - h} width={10} height={h} rx={2} className="flat-fill" fill="currentColor" opacity={i === 3 ? 0.55 : 0.2} />
      ))}
      <Line d="M140 306H280" width={0.8} />

      {/* Study timer */}
      <Box x={130} y={326} w={160} h={56} r={10} />
      <Dot cx={158} cy={354} r={16} />
      <path d="M154 347l10 7-10 7z" className="flat-fill" fill="currentColor" opacity={0.85} />
      <Bar x={184} y={344} w={60} h={6} tone={2.4} />
      <Bar x={184} y={356} w={80} h={2.5} />
      {[184, 210, 236].map((x) => (
        <Box key={x} x={x} y={364} w={22} h={8} r={4} width={0.7} />
      ))}

      {/* Bottom navigation */}
      <Line d="M120 396H300" width={0.8} />
      {[146, 178, 210, 242, 274].map((cx, i) => (
        <Dot key={cx} cx={cx} cy={410} r={5} filled={i === 0} />
      ))}
      <Bar x={180} y={420} w={60} h={4} tone={2.2} />

      {/* Install prompt, outside the frame */}
      <Box x={318} y={381} w={86} h={30} r={8} fill="var(--color-paper)" />
      <Box x={326} y={388} w={16} h={16} r={4} width={0.9} />
      <Line d="M334 392v8M330 396h8" width={1} />
      <Bar x={348} y={391} w={46} tone={1.6} />
      <Bar x={348} y={400} w={34} h={2.5} />

      <ViewLabel x={210} y={474}>
        FRONT VIEW · ATX-04
      </ViewLabel>
      <Callouts items={callouts} active={active} />
    </FlatSvg>
  );
}
