import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/* ── DATOS ILUSTRATIVOS ─────────────────────────────────────────────────────
   Ingresos publicitarios comparativos (millones USD).
   Fuente: estimaciones basadas en tendencias del mercado colombiano.
   ──────────────────────────────────────────────────────────────────────────── */
export const publicidadData = [
  { year: "2012", impreso: 320, digital: 45 },
  { year: "2014", impreso: 280, digital: 90 },
  { year: "2016", impreso: 220, digital: 160 },
  { year: "2018", impreso: 165, digital: 250 },
  { year: "2020", impreso: 95,  digital: 320 },
  { year: "2022", impreso: 62,  digital: 410 },
  { year: "2024", impreso: 40,  digital: 490 },
];

export default function PublicidadChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const draw = useCallback((width: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 24, bottom: 58, left: 68 };
    const totalH = Math.max(260, Math.min(340, width * 0.52));
    const innerW = width - margin.left - margin.right;
    const innerH = totalH - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", totalH);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().domain(publicidadData.map(d => d.year)).range([0, innerW]).padding(0.25);
    const x1 = d3.scaleBand().domain(["impreso", "digital"]).range([0, x0.bandwidth()]).padding(0.08);
    const y = d3.scaleLinear().domain([0, 550]).nice().range([innerH, 0]);

    const colors: Record<string, string> = { impreso: "hsl(221,65%,35%)", digital: "hsl(38,80%,52%)" };

    // Grid
    g.append("g").attr("class", "grid")
      .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(() => ""))
      .call(ax => { ax.select(".domain").remove(); ax.selectAll("line").style("stroke", "#e5e7eb").style("stroke-dasharray", "3,3"); });

    // Axes
    g.append("g").attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x0))
      .call(ax => { ax.select(".domain").style("stroke", "#d1d5db"); ax.selectAll("text").style("font-size", "11px").style("fill", "#6b7280"); });

    g.append("g")
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d}M`))
      .call(ax => { ax.select(".domain").style("stroke", "#d1d5db"); ax.selectAll("text").style("font-size", "11px").style("fill", "#6b7280"); });

    g.append("text")
      .attr("transform", "rotate(-90)").attr("x", -innerH / 2).attr("y", -56)
      .attr("text-anchor", "middle").style("font-size", "10px").style("fill", "#374151")
      .text("Ingresos publicitarios (millones USD)");

    // Bars with hover
    const barGroups = g.selectAll(".bar-group").data(publicidadData).enter()
      .append("g").attr("transform", d => `translate(${x0(d.year)},0)`);

    (["impreso", "digital"] as const).forEach(key => {
      barGroups.append("rect")
        .attr("x", x1(key)!).attr("width", x1.bandwidth())
        .attr("y", innerH).attr("height", 0)
        .attr("fill", colors[key]).attr("rx", 3)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
          d3.select(this).attr("fill-opacity", 0.8);
          showTooltip(event,
            `<strong>Año ${d.year}</strong><br/>` +
            `${key === "impreso"
              ? `<span style="color:hsl(221,65%,65%)">●</span> Publicidad impresa: <strong>$${d.impreso}M</strong>`
              : `<span style="color:hsl(38,80%,65%)">●</span> Publicidad digital: <strong>$${d.digital}M</strong>`}`
          );
        })
        .on("mousemove", (event, d) => {
          showTooltip(event,
            `<strong>Año ${d.year}</strong><br/>` +
            `${key === "impreso"
              ? `<span style="color:hsl(221,65%,65%)">●</span> Publicidad impresa: <strong>$${d.impreso}M</strong>`
              : `<span style="color:hsl(38,80%,65%)">●</span> Publicidad digital: <strong>$${d.digital}M</strong>`}`
          );
        })
        .on("mouseout", function() { d3.select(this).attr("fill-opacity", 1); hideTooltip(); })
        .transition().duration(800).delay((_, i) => i * 60).ease(d3.easeCubicOut)
        .attr("y", d => y(d[key]))
        .attr("height", d => innerH - y(d[key]));

      // Value labels on bars
      barGroups.append("text")
        .attr("x", x1(key)! + x1.bandwidth() / 2)
        .attr("y", d => y(d[key]) - 4)
        .attr("text-anchor", "middle")
        .style("font-size", "9px").style("fill", colors[key]).style("font-weight", "600")
        .style("opacity", 0)
        .text(d => `$${d[key]}`)
        .transition().duration(800).delay((_, i) => i * 60 + 400)
        .style("opacity", width > 400 ? 1 : 0);
    });

    // Legend
    const leg = g.append("g").attr("transform", `translate(${innerW / 2 - 120}, ${innerH + 40})`);
    [{ key: "impreso", label: "Publicidad impresa" }, { key: "digital", label: "Publicidad digital" }]
      .forEach((item, i) => {
        const row = leg.append("g").attr("transform", `translate(${i * 155}, 0)`);
        row.append("rect").attr("width", 13).attr("height", 13).attr("rx", 2).attr("fill", colors[item.key]);
        row.append("text").attr("x", 19).attr("y", 10.5).text(item.label).style("font-size", "11px").style("fill", "#374151");
      });
  }, []);

  function showTooltip(event: MouseEvent, html: string) {
    const t = tooltipRef.current; if (!t) return;
    t.innerHTML = html;
    t.style.opacity = "1";
    const rect = containerRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left + 14;
    const y = event.clientY - rect.top - 14;
    t.style.left = (x + 160 > rect.width ? x - 180 : x) + "px";
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
