import { Bar, Box, Callouts, Dot, Fill, FlatSvg, Line, Seam, ViewLabel, type CalloutSpec } from "./primitives";

const callouts: CalloutSpec[] = [
  { n: 1, x: 262, y: 14, tx: 262, ty: 61 },
  { n: 2, x: 532, y: 148, tx: 463, ty: 148 },
  { n: 3, x: 28, y: 283, tx: 166, ty: 283 },
  { n: 4, x: 532, y: 220, tx: 480, ty: 220 },
  { n: 5, x: 532, y: 294, tx: 480, ty: 294 },
];

const navWidths = [44, 36, 50, 40, 34, 46, 42, 30];
const termDots = [176, 217, 258, 299, 340, 381, 422, 463];

export function CampusFlat({ active }: { active: number | null }) {
  return (
    <FlatSvg viewBox="0 0 560 400" title="Technical flat of the Smart Campus dashboard on a laptop, with five numbered callouts.">
      <g transform="translate(0 24)">
        {/* Laptop */}
        <Box x={60} y={20} w={440} h={290} r={12} width={1.5} />
        <Box x={70} y={30} w={420} h={268} r={4} width={0.9} />
        <Dot cx={280} cy={25} r={1.4} filled />
        <Line d="M30 318H530L514 334H46ZM60 310H500M248 318v4h64v-4" width={1.2} />

        {/* Sidebar */}
        <Fill x={70} y={30} w={78} h={268} density={0.09} />
        <Dot cx={84} cy={44} r={7} />
        <Bar x={96} y={40} w={40} tone={1.6} />
        <Bar x={96} y={48} w={30} h={2.5} />
        <Fill x={76} y={60} w={66} h={14} r={3} density={0.14} />
        {navWidths.map((w, i) => (
          <Bar key={i} x={82} y={66 + i * 20} w={w} />
        ))}

        {/* Live class board */}
        <Fill x={158} y={36} w={210} h={20} r={3} density={0.86} />
        <Line d="M196 38v16M232 38v16M330 38v16" width={0.6} className="[stroke:var(--color-paper)] opacity-50" />
        <Bar x={164} y={44} w={24} light />
        <Bar x={202} y={44} w={22} light />
        <Bar x={238} y={44} w={84} light />
        <Bar x={336} y={44} w={22} light />
        <Dot cx={384} cy={46} r={5} />
        <Dot cx={400} cy={46} r={5} />
        <Dot cx={420} cy={46} r={7} />
        <Bar x={432} y={42} w={44} tone={1.4} />
        <Bar x={432} y={50} w={34} h={2.5} />

        {/* Greeting */}
        <Bar x={160} y={68} w={150} h={8} tone={3} />
        <Bar x={160} y={82} w={120} />

        {/* Term timeline */}
        <Box x={158} y={94} w={322} h={46} r={5} />
        <Bar x={168} y={102} w={74} tone={1.6} />
        <Line d="M176 122H463" width={1} />
        {termDots.map((x, i) => (
          <g key={x}>
            <Dot cx={x} cy={122} r={i === 3 ? 4.6 : 3} filled={i <= 3} />
            <Bar x={x - 10} y={130} w={20} h={2.5} />
          </g>
        ))}

        {/* Today */}
        <Box x={158} y={148} w={196} h={142} r={5} />
        <Bar x={168} y={158} w={32} tone={1.6} />
        <Bar x={300} y={158} w={44} h={2.5} />
        <Line d="M158 168H354" width={0.8} />
        {[168, 194, 220].map((y, i) => (
          <g key={y}>
            {i === 1 ? <Fill x={159} y={y} w={194} h={26} density={0.07} /> : null}
            <Bar x={168} y={y + 8} w={22} tone={1.6} />
            <Bar x={200} y={y + 8} w={108} />
            <Bar x={200} y={y + 16} w={60} h={2.5} />
            <Box x={316} y={y + 7} w={30} h={10} r={5} width={0.9} />
            <Line d={`M158 ${y + 26}H354`} width={0.5} />
          </g>
        ))}
        <Fill x={159} y={247} w={194} h={22} density={0.11} />
        <Line d="M168 265l5-9 5 9z" width={1} />
        <Bar x={182} y={255} w={150} />
        <Bar x={182} y={262} w={92} h={2.5} />
        <Bar x={168} y={277} w={120} />

        {/* Standing */}
        <Box x={362} y={148} w={118} h={94} r={5} />
        <Bar x={372} y={158} w={44} tone={1.6} />
        <Fill x={363} y={168} w={116} h={18} density={0.08} />
        {[194, 210, 226].map((y, i) => (
          <g key={y}>
            <Bar x={370} y={y} w={34} />
            <Box x={410} y={y} w={44} h={3} r={1.5} width={0.6} />
            <Bar x={410} y={y} w={[34, 26, 2][i]} tone={2.4} />
            <Bar x={460} y={y} w={12} tone={1.6} />
          </g>
        ))}
        <Seam x={366} y={190} w={110} h={46} r={3} />

        {/* Dues */}
        <Box x={362} y={250} w={118} h={40} r={5} />
        <Bar x={372} y={258} w={34} tone={1.6} />
        <Bar x={372} y={267} w={46} h={8} tone={3} />
        <Box x={424} y={267} w={48} h={9} r={4.5} width={0.9} />
        <Bar x={372} y={282} w={98} h={2} tone={2} />
      </g>

      <ViewLabel x={280} y={392}>
        FRONT VIEW · SCP-02
      </ViewLabel>
      <Callouts items={callouts} active={active} />
    </FlatSvg>
  );
}
