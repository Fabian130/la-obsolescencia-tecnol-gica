import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/* ── DATOS ILUSTRATIVOS ─────────────────────────────────────────────────────
   Evolución de la transición tecnológica en medios de comunicación (%).
   Fuente: datos estimados para ilustrar tendencias del sector.
   ──────────────────────────────────────────────────────────────────────────── */
export const transicionData = [
  { year: 2010, tradicional: 72, transicion: 18, digital: 10 },
  { year: 2012, tradicional: 62, transicion: 22, digital: 16 },
  { year: 2014, tradicional: 52, transicion: 26, digital: 22 },
  { year: 2016, tradicional: 42, transicion: 28, digital: 30 },
  { year: 2018, tradicional: 32, transicion: 26, digital: 42 },
  { year: 2020, tradicional: 22, transicion: 22, digital: 56 },
  { year: 2022, tradicional: 14, transicion: 16, digital: 70 },
  { year: 2024, tradicional:  8, transicion: 12, digital: 80 },
];

const keys = ["tradicional", "transicion", "digital"] as const;
const colors: Record<string, string> = {
  tradicional: "hsl(221,65%,35%)",
  transicion:  "hsl(38,80%,52%)",
  digital:     "hsl(160,55%,42%)",
};
const labels: Record<string, string> = {
  tradicional: "Medios tradicionales",
  transicion:  "En transición",
  digital:     "Plenamente digital",
};

export default function TransicionChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const draw = useCallback((width: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 24, bottom: 62, left: 55 };
    const totalH = Math.max(260, Math.min(340, width * 0.52));
    const innerW = width - margin.left - margin.right;
    const innerH = totalH - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", totalH);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([2010, 2024]).range([0, innerW]);
    const y = d3.scaleLinear().domain([0, 100]).range([innerH, 0]);

    const stack = d3.stack<typeof transicionData[0]>().keys(keys as unknown as string[]).offset(d3.stackOffsetNone);
    const stacked = stack(transicionData);

    const area = d3.area<d3.SeriesPoint<typeof transicionData[0]>>()
      .x(d => x(d.data.year)).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveMonotoneX);

    // Grid
    g.append("g").attr("class", "grid")
      .call(d3.axisLeft(y).ticks(5).tickSize(-innerW).tickFormat(() => ""))
      .call(ax => { ax.select(".domain").remove(); ax.selectAll("line").style("stroke", "#e5e7eb").style("stroke-dasharray", "3,3"); });

    // Axes
    g.append("g").attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(8))
      .call(ax => { ax.select(".domain").style("stroke", "#d1d5db"); ax.selectAll("text").style("font-size", "11px").style("fill", "#6b7280"); });
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
      .call(ax => { ax.select(".domain").style("stroke", "#d1d5db"); ax.selectAll("text").style("font-size", "11px").style("fill", "#6b7280"); });

    g.append("text")
      .attr("transform", "rotate(-90)").attr("x", -innerH / 2).attr("y", -42)
      .attr("text-anchor", "middle").style("font-size", "10px").style("fill", "#374151")
      .text("Participación en el ecosistema (%)");

    // Areas
    stacked.forEach(series => {
      g.append("path")
        .datum(series)
        .attr("fill", colors[series.key]).attr("fill-opacity", 0.78)
        .attr("stroke", "white").attr("stroke-width", 1)
        .attr("d", area);
    });

    // Vertical crosshair + tooltip
    const crosshair = g.append("line")
      .attr("y1", 0).attr("y2", innerH)
      .style("stroke", "#374151").style("stroke-width", 1.5)
      .style("stroke-dasharray", "4,3").style("pointer-events", "none")
      .style("opacity", 0);

    const dots = keys.map(key =>
      g.append("circle").attr("r", 5)
        .attr("fill", colors[key]).attr("stroke", "white").attr("stroke-width", 2)
        .style("pointer-events", "none").style("opacity", 0)
    );

    g.append("rect")
      .attr("width", innerW).attr("height", innerH)
      .attr("fill", "transparent").style("cursor", "crosshair")
      .on("mouseover", () => { crosshair.style("opacity", 1); dots.forEach(d => d.style("opacity", 1)); })
      .on("mouseout", () => { crosshair.style("opacity", 0); dots.forEach(d => d.style("opacity", 0)); hideTooltip(); })
      .on("mousemove", (event: MouseEvent) => {
        const [mx] = d3.pointer(event);
        const xVal = x.invert(mx);
        const nearIdx = d3.minIndex(transicionData, d => Math.abs(d.year - xVal));
        const row = transicionData[nearIdx];
        crosshair.attr("x1", x(row.year)).attr("x2", x(row.year));

        let cumSum = 0;
        keys.forEach((key, i) => {
          const val = row[key];
          const mid = y(cumSum + val / 2);
          cumSum += val;
          dots[i].attr("cx", x(row.year)).attr("cy", mid);
        });

        showTooltip(event,
          `<strong>Año ${row.year}</strong><br/>` +
          `<span style="color:hsl(221,65%,65%)">●</span> Tradicionales: <strong>${row.tradicional}%</strong><br/>` +
          `<span style="color:hsl(38,80%,65%)">●</span> En transición: <strong>${row.transicion}%</strong><br/>` +
          `<span style="color:hsl(160,55%,65%)">●</span> Digital: <strong>${row.digital}%</strong>`
        );
      });

    // Area labels
    [
      { key: "digital", yearIdx: 6, offset: -14 },
      { key: "transicion", yearIdx: 4, offset: 0 },
      { key: "tradicional", yearIdx: 2, offset: 0 },
    ].forEach(({ key, yearIdx, offset }) => {
      const row = transicionData[yearIdx];
      let cumSum = 0;
      for (const k of keys) {
        if (k === key) break;
        cumSum += row[k];
      }
      const val = row[key as keyof typeof row] as number;
      if (val < 12) return;
      g.append("text")
        .attr("x", x(row.year)).attr("y", y(cumSum + val / 2) + offset)
        .attr("text-anchor", "middle").attr("dy", "0.35em")
        .style("font-size", "9.5px").style("font-weight", "600").style("fill", "white")
        .style("pointer-events", "none")
        .text(labels[key].split(" ")[0]);
    });

    // Legend
    const legCols = width < 480 ? 1 : 3;
    const legItemW = width < 480 ? 160 : Math.min(innerW / 3, 170);
    const leg = g.append("g").attr("transform", `translate(${innerW / 2 - (legCols * legItemW) / 2}, ${innerH + 38})`);
    keys.forEach((key, i) => {
      const col = i % legCols, row = Math.floor(i / legCols);
      const r = leg.append("g").attr("transform", `translate(${col * legItemW}, ${row * 18})`);
      r.append("rect").attr("width", 13).attr("height", 13).attr("rx", 2).attr("fill", colors[key]).attr("fill-opacity", 0.8);
      r.append("text").attr("x", 19).attr("y", 10.5).text(labels[key]).style("font-size", "10.5px").style("fill", "#374151");
    });
  }, []);

  function showTooltip(event: MouseEvent, html: string) {
    const t = tooltipRef.current; if (!t) return;
    t.innerHTML = html;
    t.style.opacity = "1";
    const rect = containerRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left + 14;
    const y = event.clientY - rect.top - 14;
    t.style.left = (x + 190 > rect.width ? x - 210 : x) + "px";
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
