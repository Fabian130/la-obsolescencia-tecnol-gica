import { useState, useEffect, useRef } from "react";
import CirculacionChart from "@/components/charts/CirculacionChart";
import PublicidadChart from "@/components/charts/PublicidadChart";
import ConsumoChart from "@/components/charts/ConsumoChart";
import TransicionChart from "@/components/charts/TransicionChart";
import DescargaPDF from "@/components/DescargaPDF";

/* ── Intersection Observer hook para animaciones al hacer scroll ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ── Iconos SVG simples ── */
const icons = {
  habit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  platform: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  ),
  ad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  tech: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  cost: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  digital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  sub: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
  diversify: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  ),
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "problema", label: "El problema" },
    { id: "falla", label: "Falla de mercado" },
    { id: "causas", label: "Causas" },
    { id: "graficas", label: "Gráficas" },
    { id: "colombia", label: "Colombia" },
    { id: "soluciones", label: "Soluciones" },
    { id: "conclusion", label: "Conclusión" },
    { id: "referencias", label: "Referencias" },
    { id: "descargar", label: "⬇ PDF", highlight: true },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(210 20% 98%)", color: "hsl(220 20% 14%)" }}>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(215 20% 90%)" : "none",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
        }}
        role="navigation" aria-label="Menú principal"
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: scrolled ? "hsl(221,65%,30%)" : "white",
            transition: "color 0.3s",
          }}>
            Economía & Medios
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ gap: "0.25rem" }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: item.highlight ? 700 : 500,
                  color: item.highlight
                    ? (scrolled ? "hsl(221,65%,30%)" : "hsl(38,80%,68%)")
                    : (scrolled ? "hsl(221,65%,30%)" : "rgba(255,255,255,0.88)"),
                  background: item.highlight && scrolled ? "hsl(221,65%,30%,0.08)" : "none",
                  border: item.highlight && scrolled ? "1px solid hsl(221,65%,30%,0.25)" : "none",
                  cursor: "pointer",
                  padding: "0.35rem 0.65rem",
                  borderRadius: "0.375rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = scrolled ? "hsl(221 65% 30% / 0.12)" : "rgba(255,255,255,0.14)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = item.highlight && scrolled ? "hsl(221,65%,30%,0.08)" : "transparent"; }}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "hsl(221,65%,30%)" : "white" }}
            aria-label="Abrir menú"
            data-testid="button-menu-mobile"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 22, height: 22 }}>
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            backgroundColor: "white",
            borderTop: "1px solid hsl(215 20% 90%)",
            padding: "0.75rem 1.5rem 1rem",
            display: "flex", flexDirection: "column", gap: "0.25rem",
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  padding: "0.5rem 0.75rem", borderRadius: "0.375rem",
                  fontSize: "0.9375rem", fontWeight: 500, color: "hsl(221,65%,30%)",
                }}
                data-testid={`nav-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <header
        className="hero-bg"
        style={{ paddingTop: "6rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
        role="banner"
      >
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="fade-in" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "9999px",
            padding: "0.375rem 1rem", marginBottom: "1.75rem",
            border: "1px solid rgba(255,255,255,0.25)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "hsl(38,80%,65%)", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8125rem", fontWeight: 500 }}>
              Trabajo académico · Economía y Finanzas
            </span>
          </div>

          <h1
            className="fade-in stagger-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "white",
              lineHeight: 1.18,
              marginBottom: "1.25rem",
            }}
          >
            Falla de mercado en medios impresos
          </h1>

          <p
            className="fade-in stagger-2"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "rgba(255,255,255,0.82)",
              marginBottom: "1rem",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            Obsolescencia tecnológica y transformación digital en Colombia
          </p>

          <p
            className="fade-in stagger-3"
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.72)",
              maxWidth: 620,
              margin: "0 auto 2.25rem",
              lineHeight: 1.65,
            }}
          >
            Este análisis examina cómo la innovación tecnológica ha generado ineficiencias en el mercado 
            de medios impresos, con especial énfasis en el caso colombiano, desde una perspectiva económica 
            y de teoría de fallas de mercado.
          </p>

          <button
            className="fade-in stagger-4"
            onClick={() => scrollTo("problema")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "hsl(38,80%,52%)", color: "hsl(220,20%,14%)",
              fontWeight: 600, fontSize: "0.9375rem",
              padding: "0.75rem 1.75rem", borderRadius: "0.5rem",
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget).style.transform = "translateY(-2px)"; (e.currentTarget).style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { (e.currentTarget).style.transform = "none"; (e.currentTarget).style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)"; }}
            data-testid="button-hero-cta"
          >
            {icons.arrow} Explorar el análisis
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── 1. DEFINICIÓN DEL PROBLEMA ── */}
        <section id="problema" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(221,65%,30%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(221,65%,30%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sección 1</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "1.75rem", color: "hsl(220,20%,14%)" }}>
              Definición del problema
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                {
                  title: "¿Qué es la obsolescencia tecnológica?",
                  body: "La obsolescencia tecnológica ocurre cuando un producto, proceso o tecnología pierde su utilidad funcional o competitividad frente a alternativas más avanzadas, sin que necesariamente haya dejado de funcionar. En el contexto de los medios de comunicación, este fenómeno se expresa cuando los formatos y canales tradicionales de distribución de información son desplazados por plataformas digitales más eficientes, accesibles y escalables.",
                },
                {
                  title: "Relación con los medios impresos",
                  body: "Los periódicos y revistas impresos constituyeron durante siglos el principal canal de acceso a la información pública. Sin embargo, a partir de la masificación de internet —y especialmente con la proliferación de smartphones y redes sociales— este modelo enfrentó una transformación estructural: los lectores migraron hacia plataformas digitales que ofrecen contenido gratuito, inmediato y personalizable. Esta transición no fue gradual ni predecible para los actores del sector.",
                },
                {
                  title: "Digitalización y consumo de información",
                  body: "La digitalización alteró profundamente los hábitos de consumo informativo. La información pasó de ser un bien con escasez artificial de distribución —limitada por los costos de impresión y logística— a un bien de abundancia digital, disponible en tiempo real y con cobertura global. Esta transformación reconfiguró las reglas de competencia del mercado, generando externalidades de red que favorecen de manera asimétrica a las plataformas tecnológicas frente a los medios tradicionales.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid hsl(215,20%,90%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.75rem", color: "hsl(221,65%,28%)" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "hsl(220,15%,35%)" }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="highlight-box">
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "hsl(220,15%,30%)", margin: 0 }}>
                <strong>En síntesis:</strong> la obsolescencia tecnológica en los medios impresos no es un fenómeno 
                aislado ni meramente técnico. Es el resultado de una reconfiguración sistémica de las condiciones 
                económicas bajo las cuales operaba un mercado consolidado durante más de un siglo, lo que introduce 
                distorsiones propias de las fallas de mercado clásicas.
              </p>
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 2. FALLA DE MERCADO ── */}
        <section id="falla" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(38,80%,52%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(38,65%,40%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sección 2</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "1.75rem" }}>
              ¿Por qué esto representa una falla de mercado?
            </h2>

            <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "hsl(220,15%,35%)", marginBottom: "1.5rem" }}>
              En la teoría económica, una <strong>falla de mercado</strong> se produce cuando el mecanismo de precios 
              no logra asignar eficientemente los recursos disponibles, generando resultados subóptimos para el conjunto 
              de la sociedad. La obsolescencia tecnológica en los medios impresos configura este escenario a través de 
              múltiples vías de ineficiencia simultánea.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {[
                {
                  icon: "📉", color: "hsl(0,60%,55%)",
                  title: "Pérdida acelerada de lectores",
                  body: "La migración masiva de audiencias hacia canales digitales gratuitos erosiona la base de lectores de los medios impresos. Esta pérdida no responde a una disminución de la calidad informativa, sino a un cambio estructural en las preferencias y los costos de transacción del consumidor.",
                },
                {
                  icon: "📊", color: "hsl(221,65%,35%)",
                  title: "Caída de ingresos por pauta",
                  body: "El modelo de negocio de los medios impresos dependía históricamente de los ingresos publicitarios. Al fragmentarse la audiencia en múltiples plataformas digitales con mayor capacidad de segmentación y medición, los anunciantes redistribuyen sus presupuestos, generando una externalidad negativa directa sobre la viabilidad financiera del sector impreso.",
                },
                {
                  icon: "💰", color: "hsl(38,80%,52%)",
                  title: "Costos de adaptación altos",
                  body: "La transición hacia modelos digitales implica inversiones significativas en tecnología, talento humano especializado y reconversión de plataformas. Estos costos de ajuste actúan como barreras de entrada al nuevo paradigma y como costos hundidos para los medios que no logran escalarlos eficientemente.",
                },
                {
                  icon: "🏢", color: "hsl(160,55%,40%)",
                  title: "Cierre de medios y externalidades sociales",
                  body: "La desaparición de medios impresos locales o regionales genera externalidades sociales negativas: reducción del pluralismo informativo, menor cobertura de asuntos de interés público local y debilitamiento del ecosistema periodístico. El mercado, por sí solo, no internaliza estos costos sociales.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid hsl(215,20%,90%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.975rem", fontWeight: 600, color: item.color }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "hsl(220,15%,38%)", margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>

            <div className="conclusion-box">
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "hsl(220,15%,30%)", margin: 0 }}>
                <strong>Perspectiva económica:</strong> la innovación disruptiva digital actúa como un choque exógeno 
                que altera la estructura de costos, los patrones de demanda y las condiciones de competencia del sector. 
                A diferencia de una ineficiencia generada por monopolio o externalidad convencional, esta falla surge 
                del propio dinamismo tecnológico del mercado, lo que plantea dilemas particulares para la intervención 
                regulatoria y la política pública de medios.
              </p>
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 3. CAUSAS PRINCIPALES ── */}
        <section id="causas" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(160,55%,40%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(160,45%,32%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sección 3</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "0.5rem" }}>
              Causas principales
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "hsl(220,15%,45%)", marginBottom: "1.75rem", lineHeight: 1.6 }}>
              La crisis de los medios impresos no obedece a un factor único, sino a la convergencia de múltiples fuerzas estructurales que actúan de manera simultánea y se refuerzan mutuamente.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1rem" }}>
              {[
                {
                  icon: icons.habit, color: "hsl(221,65%,30%)", bg: "hsl(221,65%,30%,0.07)",
                  letter: "A",
                  title: "Cambio en hábitos de consumo",
                  body: "Las generaciones más jóvenes han adoptado el consumo informativo digital como norma, priorizando la inmediatez, la movilidad y la personalización del contenido por sobre el formato físico. Esta transformación generacional es irreversible a corto plazo y representa el fundamento demográfico de la crisis.",
                },
                {
                  icon: icons.platform, color: "hsl(38,80%,46%)", bg: "hsl(38,80%,52%,0.07)",
                  letter: "B",
                  title: "Migración a plataformas digitales",
                  body: "Plataformas como Google, Facebook, Twitter/X y TikTok concentran hoy el consumo informativo global mediante algoritmos de recomendación que compiten directamente con los medios tradicionales en la captación de atención, sin incurrir en los costos de producción periodística.",
                },
                {
                  icon: icons.ad, color: "hsl(0,60%,50%)", bg: "hsl(0,60%,55%,0.07)",
                  letter: "C",
                  title: "Reducción de publicidad impresa",
                  body: "Los presupuestos publicitarios han migrado masivamente hacia canales digitales, atraídos por métricas de impacto más precisas, menor costo por impresión y mayor capacidad de segmentación de audiencias. Este desplazamiento elimina la principal fuente de ingresos que sostuvo a los medios impresos durante décadas.",
                },
                {
                  icon: icons.tech, color: "hsl(280,48%,48%)", bg: "hsl(280,48%,50%,0.07)",
                  letter: "D",
                  title: "Velocidad de innovación tecnológica",
                  body: "El ritmo acelerado de la innovación tecnológica —móviles, broadband, redes sociales, inteligencia artificial— supera la capacidad de adaptación de organizaciones con estructuras operativas diseñadas para entornos estables. La brecha entre el tiempo de adaptación institucional y el tiempo de innovación tecnológica es un factor crítico de la crisis.",
                },
                {
                  icon: icons.cost, color: "hsl(160,55%,38%)", bg: "hsl(160,55%,40%,0.07)",
                  letter: "E",
                  title: "Costos de adaptación altos",
                  body: "La transición hacia el modelo digital requiere inversión en infraestructura tecnológica, desarrollo de nuevas competencias editoriales y de negocio, y experimentación con modelos de monetización alternativos. Estos costos son particularmente gravosos para medios pequeños o medianos que operan con márgenes reducidos.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="cause-card"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid hsl(215,20%,90%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    position: "relative", overflow: "hidden",
                  }}
                  data-testid={`card-cause-${i}`}
                >
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    width: 28, height: 28, borderRadius: "50%",
                    backgroundColor: item.color,
                    color: "white", fontWeight: 700, fontSize: "0.8125rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.letter}
                  </div>
                  <div style={{ color: item.color, marginBottom: "0.75rem" }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 600, marginBottom: "0.625rem", color: "hsl(220,20%,18%)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "hsl(220,15%,40%)", margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 4. GRÁFICAS INTERACTIVAS ── */}
        <section id="graficas" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(221,65%,30%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(221,65%,30%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sección 4</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "0.5rem" }}>
              Análisis cuantitativo
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "hsl(220,15%,45%)", marginBottom: "0.75rem" }}>
              Las siguientes gráficas, construidas con D3.js, ilustran las tendencias del sector mediante datos estimados. 
              Pasa el cursor sobre los elementos para ver los valores interactivos.
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.25rem 0.75rem",
              backgroundColor: "hsl(221,65%,30%,0.08)",
              border: "1px solid hsl(221,65%,30%,0.2)",
              borderRadius: "9999px",
              fontSize: "0.75rem", fontWeight: 500, color: "hsl(221,65%,30%)",
              marginBottom: "2.5rem",
            }}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12 }}>
                <circle cx="12" cy="12" r="10" opacity="0.3" /><circle cx="12" cy="12" r="6" opacity="0.5" /><circle cx="12" cy="12" r="3" />
              </svg>
              Gráficas interactivas — pasa el cursor para ver detalles
            </div>
          </AnimatedSection>

          {/* Gráfica 1 */}
          <AnimatedSection>
            <ChartCard
              number="01"
              title="Circulación impresa vs. Consumo digital"
              subtitle="Tendencia histórica (2010–2024)"
              interpretation="La gráfica evidencia una relación inversamente proporcional entre circulación impresa y consumo digital. Mientras la primera cae de manera sostenida a una tasa promedio estimada del 11% anual, el consumo digital crece de forma exponencial, superando ampliamente el volumen de lectores tradicionales hacia 2018. Esta tijera de datos es la expresión más clara de la sustitución tecnológica en el sector."
              data-testid="chart-circulacion"
            >
              <CirculacionChart />
            </ChartCard>
          </AnimatedSection>

          {/* Gráfica 2 */}
          <AnimatedSection>
            <ChartCard
              number="02"
              title="Ingresos publicitarios: impreso vs. digital"
              subtitle="Comparación de ingresos en millones de USD (2012–2024)"
              interpretation="El gráfico de barras agrupadas muestra el traslado de inversión publicitaria desde el formato impreso hacia los medios digitales. Para 2016, el volumen de publicidad digital supera por primera vez al impreso, configurando el punto de inflexión del modelo de negocio. A partir de ese año, la brecha se amplía de forma acelerada, comprometiendo la sostenibilidad financiera de los medios tradicionales."
              data-testid="chart-publicidad"
            >
              <PublicidadChart />
            </ChartCard>
          </AnimatedSection>

          {/* Gráfica 3 */}
          <AnimatedSection>
            <ChartCard
              number="03"
              title="Distribución del consumo de noticias por canal"
              subtitle="Colombia, estimación 2024"
              interpretation="El gráfico de dona muestra que, en 2024, las redes sociales y los portales web de noticias concentran el 64% del consumo informativo. La prensa impresa representa únicamente el 8% de la audiencia, una cifra que contrasta radicalmente con su participación histórica de más del 70% en décadas anteriores. Este desplazamiento confirma la magnitud estructural de la transformación en el ecosistema de medios."
              data-testid="chart-consumo"
            >
              <ConsumoChart />
            </ChartCard>
          </AnimatedSection>

          {/* Gráfica 4 */}
          <AnimatedSection>
            <ChartCard
              number="04"
              title="Evolución de la transición tecnológica en medios"
              subtitle="Participación relativa por modelo operativo (2010–2024)"
              interpretation="El área apilada permite visualizar la evolución sistémica del ecosistema de medios: los modelos plenamente tradicionales han cedido progresivamente terreno, primero a los medios en transición y luego a los completamente digitales. El período 2016–2020 marca la fase crítica de aceleración, en la que los modelos tradicionales perdieron más de la mitad de su participación relativa en el ecosistema mediático total."
              data-testid="chart-transicion"
            >
              <TransicionChart />
            </ChartCard>
          </AnimatedSection>

          {/* Conclusión del análisis */}
          <AnimatedSection>
            <div style={{
              backgroundColor: "hsl(221,65%,28%)",
              borderRadius: "0.875rem",
              padding: "2rem 2.25rem",
              color: "white",
              marginTop: "1rem",
            }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.875rem", color: "hsl(38,80%,65%)" }}>
                Conclusión del análisis cuantitativo
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.88)", margin: 0 }}>
                Los cuatro paneles gráficos confirman, desde distintos ángulos de medición, la magnitud de la disrupción 
                tecnológica en el sector de medios impresos. La caída de circulación, el desplazamiento publicitario, la 
                fragmentación de audiencias y la recomposición del ecosistema mediático constituyen evidencia empírica 
                convergente de una falla de mercado inducida por obsolescencia tecnológica. En términos de eficiencia 
                económica, el mercado no ha logrado preservar el stock de capital institucional acumulado por los medios 
                impresos sin generar costos sociales distribuidos que el precio de mercado no refleja adecuadamente.
              </p>
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 5. IMPACTO EN COLOMBIA ── */}
        <section id="colombia" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(0,60%,50%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(0,55%,42%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sección 5</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "1.75rem" }}>
              Impacto en Colombia
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
              {[
                {
                  title: "Transformación del mercado editorial colombiano",
                  body: "El mercado de medios impresos en Colombia experimentó transformaciones significativas a lo largo de la última década. Medios regionales de larga trayectoria redujeron sus frecuencias de publicación o migraron hacia formatos exclusivamente digitales, mientras que los grandes conglomerados mediáticos —como el Grupo Editorial El Tiempo y Semana— iniciaron procesos de reconversión digital con distintos grados de éxito. El impacto fue especialmente marcado en los medios de circulación regional, cuya base publicitaria local resultó ser particularmente vulnerable a la migración hacia plataformas de alcance nacional.",
                },
                {
                  title: "Cambio en los modelos de negocio",
                  body: "La caída de la pauta publicitaria impresa obligó a los medios colombianos a explorar nuevas fuentes de ingresos, incluyendo modelos de suscripción digital (paywall), la producción de contenido patrocinado (branded content) y la diversificación hacia servicios de consultoría de audiencias y organización de eventos. No obstante, estos nuevos modelos aún no generan los volúmenes de ingreso suficientes para compensar íntegramente la pérdida de ingresos publicitarios del modelo impreso en la mayoría de los casos.",
                },
                {
                  title: "Necesidad de adaptación tecnológica",
                  body: "La supervivencia y relevancia de los medios de comunicación colombianos en el nuevo entorno digital depende de su capacidad para invertir en plataformas digitales propias, desarrollar competencias en analítica de datos y métricas de audiencia, y construir relaciones de valor directo con sus lectores. Esta transformación requiere no solo inversión tecnológica, sino también un cambio cultural en las organizaciones periodísticas, orientado hacia la experimentación, la medición de impacto y la monetización directa de audiencias leales.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    padding: "1.625rem",
                    border: "1px solid hsl(215,20%,90%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    borderLeft: "4px solid hsl(0,60%,52%)",
                  }}
                >
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.75rem", color: "hsl(0,55%,40%)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "hsl(220,15%,38%)", margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 6. SOLUCIONES ── */}
        <section id="soluciones" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(160,55%,40%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(160,45%,32%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sección 6</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "1.75rem" }}>
              Respuestas del sector ante la crisis
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: "1rem" }}>
              {[
                {
                  icon: icons.digital, color: "hsl(221,65%,30%)",
                  title: "Digitalización de contenidos",
                  body: "La transición hacia versiones digitales de los medios impresos implica no solo la replicación del contenido en línea, sino la redefinición del flujo editorial para plataformas que priorizan el contenido multimedia, la inmediatez y la interacción con el usuario. Este proceso requiere inversión sostenida en tecnología y talento.",
                },
                {
                  icon: icons.sub, color: "hsl(38,80%,46%)",
                  title: "Modelos de suscripción digital",
                  body: "Los paywall —total o metered— representan una apuesta por la monetización directa de audiencias comprometidas. Medios como el New York Times y The Guardian han demostrado la viabilidad de este modelo a escala global, aunque su implementación exitosa requiere una propuesta de valor editorial diferenciada y sólida.",
                },
                {
                  icon: icons.diversify, color: "hsl(160,55%,40%)",
                  title: "Diversificación de ingresos",
                  body: "La reducción de la dependencia de la publicidad tradicional ha impulsado a los medios a explorar nuevas líneas de ingreso: branded content, membresías, formación, organización de eventos, licencias de contenido y servicios de investigación de audiencias para anunciantes.",
                },
                {
                  icon: icons.social, color: "hsl(280,48%,48%)",
                  title: "Multicanalidad y redes sociales",
                  body: "Los medios impresos han adoptado estrategias de distribución multicanal, publicando contenido adaptado a distintas plataformas: Instagram, YouTube, TikTok y podcasts. Este enfoque amplía el alcance de las marcas periodísticas hacia segmentos de audiencia que consumen contenido exclusivamente en entornos móviles.",
                },
                {
                  icon: icons.analytics, color: "hsl(0,60%,50%)",
                  title: "Analítica de audiencias",
                  body: "El uso de herramientas de analítica digital permite a los medios conocer con precisión las preferencias, los comportamientos de consumo y los patrones de fidelización de sus lectores. Esta información resulta fundamental para optimizar la estrategia editorial, la oferta publicitaria y el diseño de propuestas de suscripción.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="solution-card"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid hsl(215,20%,90%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  data-testid={`card-solution-${i}`}
                >
                  <div style={{ color: item.color, marginBottom: "0.75rem" }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 600, marginBottom: "0.625rem", color: "hsl(220,20%,18%)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "hsl(220,15%,42%)", margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 7. CONCLUSIÓN ── */}
        <section id="conclusion" style={{ paddingTop: "5rem", paddingBottom: "3.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(221,65%,30%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(221,65%,30%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Conclusión</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "1.75rem" }}>
              Reflexión final
            </h2>

            <div style={{
              backgroundColor: "white",
              borderRadius: "0.875rem",
              padding: "2.25rem",
              border: "1px solid hsl(215,20%,90%)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.82, color: "hsl(220,15%,30%)", marginBottom: "1.25rem" }}>
                La obsolescencia tecnológica en la industria de medios impresos constituye un caso paradigmático de falla 
                de mercado inducida por la innovación disruptiva. A diferencia de las fallas de mercado clásicas —como los 
                monopolios o las externalidades ambientales—, este fenómeno es provocado no por la concentración de poder 
                de mercado ni por la ausencia de propiedad sobre bienes comunes, sino por la velocidad y la profundidad con 
                que la innovación tecnológica reconfigura las condiciones de competencia, los patrones de demanda y las 
                estructuras de ingreso de todo un sector.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.82, color: "hsl(220,15%,30%)", marginBottom: "1.25rem" }}>
                En el caso colombiano, la transición digital del ecosistema mediático ha generado costos de ajuste 
                significativos: cierre o reducción de medios impresos regionales, pérdida de empleos periodísticos 
                especializados y contracción del pluralismo informativo en territorios donde la prensa impresa era la 
                única fuente de información de proximidad. Estos costos no son capturados por el precio de mercado, lo 
                que constituye precisamente la dimensión de falla de mercado más relevante desde la perspectiva del 
                bienestar social.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.82, color: "hsl(220,15%,30%)", margin: 0 }}>
                La respuesta del sector —digitalización, modelos de suscripción, diversificación de ingresos y analítica 
                de audiencias— apunta en la dirección correcta, pero requiere condiciones habilitadoras que el mercado 
                por sí solo no garantiza: acceso equitativo a la conectividad digital, regulación de las plataformas 
                tecnológicas que concentran el tráfico informativo, y mecanismos de apoyo público al periodismo de 
                interés general. La economía de los medios en la era digital no es solo una cuestión de eficiencia 
                sectorial, sino de arquitectura institucional para una democracia informada.
              </p>
            </div>
          </AnimatedSection>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid hsl(215,20%,90%)" }} />

        {/* ── 8. REFERENCIAS ── */}
        <section id="referencias" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: "hsl(220,15%,55%)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(220,15%,45%)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Referencias</span>
            </div>
            <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", marginBottom: "1.75rem" }}>
              Fuentes y referencias bibliográficas
            </h2>

            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "1.75rem 2rem",
              border: "1px solid hsl(215,20%,90%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              marginBottom: "1.25rem",
            }}>
              <p style={{ fontSize: "0.8rem", color: "hsl(38,65%,40%)", backgroundColor: "hsl(38,80%,52%,0.08)", border: "1px solid hsl(38,80%,52%,0.25)", borderRadius: "0.375rem", padding: "0.625rem 0.875rem", marginBottom: "1.25rem", fontWeight: 500 }}>
                ⚠️ Nota: los datos estadísticos utilizados en las gráficas son <strong>ilustrativos y estimados</strong>, construidos con base en tendencias documentadas del sector. No representan cifras oficiales precisas. Las fuentes bibliográficas listadas a continuación corresponden a trabajos académicos y de referencia sobre el tema.
              </p>
              <ol style={{ paddingLeft: "1.25rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Picard, R. G. (2014). Twilight or new dawn of journalism? Evidence from the changing news ecosystem. Journalism Practice, 8(5), 488-498.",
                  "Reuters Institute for the Study of Journalism (2023). Digital News Report 2023. University of Oxford.",
                  "Boczkowski, P. J. (2004). Digitizing the News: Innovation in Online Newspapers. MIT Press.",
                  "McChesney, R. W., & Nichols, J. (2010). The Death and Life of American Journalism. Nation Books.",
                  "Ministerio de Tecnologías de la Información y las Comunicaciones (MINTIC). (2022). Informe de industria de contenidos digitales en Colombia.",
                  "World Association of News Publishers (WAN-IFRA). (2023). World Press Trends Report.",
                  "Stiglitz, J. E. (2000). Economics of the Public Sector (3rd ed.). W. W. Norton & Company. [Cap. 4: Market Failures]",
                  "Akerlof, G. A., & Shiller, R. J. (2015). Phishing for Phools: The Economics of Manipulation and Deception. Princeton University Press.",
                  "Asociación Colombiana de Medios de Información (AMI). Informes anuales del sector de prensa colombiana.",
                  "Christensen, C. M. (1997). The Innovator's Dilemma. Harvard Business School Press.",
                ].map((ref, i) => (
                  <li key={i} style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "hsl(220,15%,38%)" }}>
                    {ref}
                  </li>
                ))}
              </ol>
            </div>

            <p style={{ fontSize: "0.8125rem", color: "hsl(220,15%,55%)", textAlign: "center", lineHeight: 1.6 }}>
              Trabajo académico elaborado para la asignatura de Economía y Finanzas.<br />
              Todo el contenido es de carácter educativo. Los datos gráficos son ilustrativos y editables en el código fuente.
            </p>
          </AnimatedSection>
        </section>
      </main>

      {/* ── DESCARGA PDF ── */}
      <DescargaPDF />

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: "hsl(221,65%,22%)",
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          padding: "1.5rem",
          fontSize: "0.8125rem",
        }}
        role="contentinfo"
      >
        <p style={{ margin: 0 }}>
          Falla de Mercado en Medios Impresos · Trabajo universitario de Economía y Finanzas · Colombia, 2024
        </p>
      </footer>
    </div>
  );
}

/* ── ChartCard wrapper ── */
function ChartCard({
  number, title, subtitle, interpretation, children, "data-testid": testId
}: {
  number: string;
  title: string;
  subtitle: string;
  interpretation: string;
  children: React.ReactNode;
  "data-testid"?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0.875rem",
        border: "1px solid hsl(215,20%,90%)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
      data-testid={testId}
    >
      <div style={{ padding: "1.25rem 1.75rem 0.75rem", borderBottom: "1px solid hsl(215,20%,93%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
          <span style={{
            fontSize: "0.75rem", fontWeight: 700, color: "hsl(221,65%,30%)",
            backgroundColor: "hsl(221,65%,30%,0.08)", border: "1px solid hsl(221,65%,30%,0.2)",
            borderRadius: "0.25rem", padding: "0.1rem 0.45rem", fontFamily: "monospace",
          }}>
            {number}
          </span>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 600, margin: 0, color: "hsl(220,20%,18%)" }}>
            {title}
          </h3>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "hsl(220,15%,55%)", margin: 0 }}>{subtitle}</p>
      </div>
      <div style={{ padding: "1.25rem 1rem 0.75rem" }}>
        {children}
      </div>
      <div style={{ padding: "0.875rem 1.75rem 1.25rem", backgroundColor: "hsl(210,20%,98%)", borderTop: "1px solid hsl(215,20%,93%)" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "hsl(220,15%,40%)", margin: 0 }}>
          <strong style={{ color: "hsl(221,65%,30%)" }}>Interpretación: </strong>
          {interpretation}
        </p>
      </div>
    </div>
  );
}
