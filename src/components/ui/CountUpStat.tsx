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
      className="glass rounded-xl p-6 text-center hover:border-cyber-cyan/30 transition-all duration-300"
      style={{
        boxShadow: "0 0 15px rgba(0, 245, 255, 0.05)",
      }}
    >
      {isInfinity ? (
        <div className="text-5xl font-display text-cyber-cyan infinity-pulse mb-2">
          ∞
        </div>
      ) : (
        <div className="text-5xl font-display text-cyber-cyan mb-2">
          {count}
          <span className="text-3xl">{suffix}</span>
        </div>
      )}
      <div className="text-sm text-dim-gray font-mono">{label}</div>
    </div>
  );
}
