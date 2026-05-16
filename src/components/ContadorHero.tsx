import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  color?: string;
}

const STATS: Stat[] = [
  { value: 83,   prefix: "−", suffix: "%", label: "Caída de circulación impresa",   color: "hsl(0,65%,62%)" },
  { value: 4150, prefix: "+", suffix: "%", label: "Crecimiento del consumo digital", color: "hsl(160,55%,52%)" },
  { value: 88,   prefix: "−", suffix: "%", label: "Inversión publicitaria impresa",  color: "hsl(38,80%,62%)" },
  { value: 8,    suffix: "%", label: "Cuota actual de prensa impresa",               color: "hsl(221,60%,62%)" },
];

function useCountUp(target: number, duration = 1600, active: boolean, decimals = 0) {
  const [current, setCurrent] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, target, duration, decimals]);

  return current;
}

function StatCard({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (active && !started) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [active, started, delay]);

  const count = useCountUp(stat.value, 1800, started, stat.decimals ?? 0);

  return (
    <div style={{
      textAlign: "center",
      padding: "1.25rem 1rem",
      backgroundColor: "rgba(255,255,255,0.07)",
      borderRadius: "0.75rem",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(8px)",
      transition: "transform 0.2s ease, background-color 0.2s ease",
      cursor: "default",
      minWidth: 0,
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
    >
      <div style={{
        fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: stat.color ?? "white",
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        marginBottom: "0.375rem",
      }}>
        {stat.prefix ?? ""}{count.toLocaleString("es-CO")}{stat.suffix ?? ""}
      </div>
      <div style={{
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.4,
        fontWeight: 400,
      }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function ContadorHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginTop: "2.5rem" }}>
      <p style={{
        fontSize: "0.7rem",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: "0.875rem",
        fontWeight: 500,
      }}>
        Indicadores clave del sector · Datos ilustrativos
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "0.75rem",
      }}>
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} active={active} delay={i * 150} />
        ))}
      </div>
    </div>
  );
}
