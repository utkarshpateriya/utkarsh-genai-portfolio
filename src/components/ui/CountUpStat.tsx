import { useCountUp } from "../../hooks/useCountUp";

interface CountUpStatProps {
  end: number;
  label: string;
  suffix?: string;
  isInfinity?: boolean;
}

export default function CountUpStat({
  end,
  label,
  suffix = "+",
  isInfinity = false,
}: CountUpStatProps) {
  const { count, ref } = useCountUp(end, 2000);

  return (
    <div
      ref={ref}
      className="glass rounded-xl p-6 text-center hover:border-white/10 transition-all duration-300"
    >
      {isInfinity ? (
        <div className="font-display text-[52px] font-bold text-cyber-cyan infinity-pulse mb-2">
          ∞
        </div>
      ) : (
        <div className="font-display text-[52px] font-bold text-cyber-cyan mb-2">
          {count}
          <span className="text-[36px]">{suffix}</span>
        </div>
      )}
      <div className="label-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
    </div>
  );
}
