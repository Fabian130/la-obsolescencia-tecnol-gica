import { useState } from "react";

export default function DescargaPDF() {
  const [loading, setLoading] = useState(false);

  function handlePrint() {
    setLoading(true);
    setTimeout(() => {
      window.print();
      setLoading(false);
    }, 200);
  }

  return (
    <section
      id="descargar"
      className="no-print"
      style={{
        background: "linear-gradient(135deg, hsl(221,65%,22%) 0%, hsl(221,55%,38%) 100%)",
        padding: "4rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.12)",
          border: "2px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 30, height: 30 }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.4rem,3.5vw,2rem)",
          fontWeight: 700, color: "white",
          marginBottom: "0.75rem",
        }}>
          Descargar como PDF
        </h2>

        <p style={{
          fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)",
          lineHeight: 1.65, marginBottom: "2rem",
        }}>
          Exporta este análisis completo como un documento PDF listo para entregar. 
          Se generará una versión optimizada para impresión con todas las gráficas, 
          el contenido académico y las referencias bibliográficas.
        </p>

        {/* Feature chips */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.625rem",
          justifyContent: "center", marginBottom: "2.25rem",
        }}>
          {[
            "📊 Gráficas incluidas",
            "📝 Formato académico",
            "📚 Referencias completas",
            "🖨️ Optimizado para impresión",
          ].map(label => (
            <span key={label} style={{
              padding: "0.35rem 0.875rem",
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "9999px",
              fontSize: "0.8125rem", color: "rgba(255,255,255,0.88)",
            }}>
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={handlePrint}
            disabled={loading}
            data-testid="button-download-pdf"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "hsl(38,80%,52%)",
              color: "hsl(220,20%,14%)",
              fontWeight: 700, fontSize: "0.9375rem",
              padding: "0.8rem 2rem", borderRadius: "0.5rem",
              border: "none", cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              opacity: loading ? 0.75 : 1,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)"; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)"; }}
          >
            {loading ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Preparando...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar PDF
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            data-testid="button-print"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "white",
              fontWeight: 600, fontSize: "0.9375rem",
              padding: "0.8rem 1.75rem", borderRadius: "0.5rem",
              border: "1px solid rgba(255,255,255,0.25)",
              cursor: "pointer",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Imprimir
          </button>
        </div>

        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "1.5rem" }}>
          Usa "Guardar como PDF" en el diálogo de impresión de tu navegador para exportar el documento.
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
