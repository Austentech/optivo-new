import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export function StatCounter({
  value,
  suffix,
  label,
  decimals,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const d = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const displayValue = useMemo(() => (d ? value.toFixed(d) : 0), [d, value]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-gradient-brand md:text-6xl">
        {inView ? <CountUp end={value} duration={2} separator="," decimals={d} /> : displayValue}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}