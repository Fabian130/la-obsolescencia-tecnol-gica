import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/* ── DATOS ILUSTRATIVOS ─────────────────────────────────────────────────────
   Distribución del consumo de noticias por canal en Colombia (año 2024).
   Fuente: estimaciones basadas en informes de medios latinoamericanos.
   ──────────────────────────────────────────────────────────────────────────── */
export const consumoData = [
  { label: "Redes sociales",          value: 38, color: "hsl(221,65%,35%)" },
  { label: "Portales web de noticias",value: 26, color: "hsl(38,80%,52%)" },
  { label: "Televisión",              value: 18, color: "hsl(160,55%,42%)" },
  { label: "Radio",                   value: 10, color: "hsl(280,48%,50%)" },
  { label: "Prensa impresa",          value:  8, color: "hsl(0,60%,55%)" },
];

export default function ConsumoChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const draw = useCallback((width: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const totalH = Math.max(260, Math.min(320, width * 0.54));
    const radius = Math.min(width * 0.28, totalH * 0.42, 130);
    const cx = width < 500 ? width / 2 : width * 0.36;
    const cy = totalH / 2;

    svg.attr("width", width).attr("height", totalH);
    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);

    const pie = d3.pie<typeof consumoData[0]>().value(d => d.value).sort(null).padAngle(0.025);
    const arc = d3.arc<d3.PieArcDatum<typeof consumoData[0]>>()
      .innerRadius(radius * 0.56).outerRadius(radius);
    const arcHover = d3.arc<d3.PieArcDatum<typeof consumoData[0]>>()
      .innerRadius(radius * 0.56).outerRadius(radius * 1.08);
    const arcLabel = d3.arc<d3.PieArcDatum<typeof consumoData[0]>>()
      .innerRadius(radius * 0.72).outerRadius(radius * 0.72);

    const slices = g.selectAll(".slice").data(pie(consumoData)).enter()
      .append("path").attr("class", "slice")
      .attr("fill", d => d.data.color)
      .attr("stroke", "white").attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("transition", "filter 0.15s ease");

    slices
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition().duration(120)
          .attr("d", arcHover as unknown as string)
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");
        centerText.text(`${d.data.value}%`);
        centerLabel.text(d.data.label.split(" ")[0]);
        showTooltip(event,
          `<strong>${d.data.label}</strong><br/>` +
          `Participación: <strong>${d.data.value}%</strong> del consumo`
        );
      })
      .on("mousemove", (event, d) => {
        showTooltip(event,
          `<strong>${d.data.label}</strong><br/>` +
          `Participación: <strong>${d.data.value}%</strong> del consumo`
        );
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition().duration(120)
          .attr("d", arc as unknown as string)
          .style("filter", "none");
        centerText.text("100%");
        centerLabel.text("Total");
        hideTooltip();
      });

    // Animate slices
    slices.transition().duration(900).delay((_, i) => i * 100)
      .attrTween("d", function(d) {
        const interp = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
        return (t: number) => arc(interp(t)) ?? "";
      });

    // Percentage labels inside slices (only if big enough)
    g.selectAll(".pct-label").data(pie(consumoData)).enter()
      .append("text").attr("class", "pct-label")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .attr("text-anchor", "middle").attr("dy", "0.35em")
      .style("font-size", d => d.data.value >= 15 ? "11px" : "9px")
      .style("font-weight", "600").style("fill", "white")
      .style("pointer-events", "none").style("opacity", 0)
      .text(d => d.data.value >= 10 ? `${d.data.value}%` : "")
      .transition().delay(900).duration(300).style("opacity", 1);

    // Center text
    const centerText = g.append("text").attr("text-anchor", "middle").attr("dy", "-0.1em")
      .style("font-size", "1.35rem").style("font-weight", "700").style("fill", "#1f2937").text("100%");
    const centerLabel = g.append("text").attr("text-anchor", "middle").attr("dy", "1.3em")
      .style("font-size", "0.65rem").style("fill", "#9ca3af").text("Total");

    // Legend
    const legX = width < 500 ? 0 : cx + radius + 24;
    const legY = width < 500 ? cy + radius + 18 : cy - (consumoData.length * 26) / 2;
    const legG = svg.append("g").attr("transform", `translate(${legX}, ${legY})`);

    consumoData.forEach((item, i) => {
      const row = legG.append("g").attr("transform", `translate(0, ${i * 26})`);
      row.append("rect").attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", item.color);
      row.append("text").attr("x", 18).attr("y", 9.5).text(item.label)
        .style("font-size", "10.5px").style("fill", "#374151");
      row.append("text").attr("x", 18).attr("y", 20).text(`${item.value}%`)
        .style("font-size", "9px").style("fill", "#9ca3af");
    });
  }, []);

  function showTooltip(event: MouseEvent, html: string) {
    const t = tooltipRef.current; if (!t) return;
    t.innerHTML = html;
    t.style.opacity = "1";
    const rect = containerRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left + 14;
    const y = event.clientY - rect.top - 14;
    t.style.left = (x + 180 > rect.width ? x - 200 : x) + "px";
    t.style.top = Math.max(0, y) + "px";
  }
  function hideTooltip() { if (tooltipRef.current) tooltipRef.current.style.opacity = "0"; }

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (w > 0) draw(w);
    });
    ro.observe(containerRef.current);
    draw(containerRef.current.clientWidth || 500);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <svg ref={svgRef} style={{ display: "block", width: "100%" }} />
      <div ref={tooltipRef} className="tooltip-d3" />
    </div>
  );
}
