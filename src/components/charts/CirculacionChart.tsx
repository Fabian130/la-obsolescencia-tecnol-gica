import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/* ── DATOS ILUSTRATIVOS ─────────────────────────────────────────────────────
   Fuente: datos estimados basados en tendencias globales y colombianas.
   Unidades: circulación impresa en miles; consumo digital en millones de usuarios.
   ──────────────────────────────────────────────────────────────────────────── */
export const circulacionData = {
  years: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
  impresa: [850, 780, 690, 580, 450, 320, 210, 145],
  digital: [12, 28, 58, 110, 195, 310, 420, 510],
};

export default function CirculacionChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const draw = useCallback((width: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 50, left: 65 };
    const innerW = width - margin.left - margin.right;
    const totalH = Math.max(260, Math.min(340, width * 0.52));
    const innerH = totalH - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", totalH);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([2010, 2024]).range([0, innerW]);
    const yLeft = d3.scaleLinear().domain([0, 1000]).range([innerH, 0]);
    const yRight = d3.scaleLinear().domain([0, 600]).range([innerH, 0]);

    // Gridlines
    g.append("g").attr("class", "grid")
      .call(d3.axisLeft(yLeft).ticks(5).tickSize(-innerW).tickFormat(() => ""))
      .call(ax => { ax.select(".domain").remove(); ax.selectAll("line").style("stroke", "#e5e7eb").style("stroke-dasharray", "3,3"); });

    // Axes
    g.append("g").attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(8))
      .call(ax => { ax.select(".domain").style("stroke", "#d1d5db"); ax.selectAll("text").style("font-size", "11px").style("fill", "#6b7280"); });

    g.append("g")
      .call(d3.axisLeft(yLeft).ticks(5))
      .call(ax => { ax.select(".domain").style("stroke", "#d1d5db"); ax.selectAll("text").style("font-size", "11px").style("fill", "#6b7280"); });

    g.append("text")
      .attr("transform", "rotate(-90)").attr("x", -innerH / 2).attr("y", -52)
      .attr("text-anchor", "middle").style("font-size", "10px").style("fill", "#374151")
      .text("Circulación impresa (miles)");

    // Area impresa
    const areaImpresa = d3.area<number>()
      .x((_, i) => x(circulacionData.years[i]))
      .y0(innerH).y1(d => yLeft(d))
      .curve(d3.curveMonotoneX);

    g.append("path").datum(circulacionData.impresa)
      .attr("fill", "hsl(221,65%,30%)").attr("fill-opacity", 0.08)
      .attr("d", areaImpresa);

    // Lines
    const lineImpresa = d3.line<number>()
      .x((_, i) => x(circulacionData.years[i])).y(d => yLeft(d)).curve(d3.curveMonotoneX);
    const lineDigital = d3.line<number>()
      .x((_, i) => x(circulacionData.years[i])).y(d => yRight(d)).curve(d3.curveMonotoneX);

    const pI = g.append("path").datum(circulacionData.impresa)
      .attr("fill", "none").attr("stroke", "hsl(221,65%,30%)").attr("stroke-width", 2.5).attr("d", lineImpresa);
    const lenI = pI.node()!.getTotalLength();
    pI.attr("stroke-dasharray", lenI).attr("stroke-dashoffset", lenI)
      .transition().duration(1200).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    const pD = g.append("path").datum(circulacionData.digital)
      .attr("fill", "none").attr("stroke", "hsl(38,80%,50%)").attr("stroke-width", 2.5).attr("d", lineDigital);
    const lenD = pD.node()!.getTotalLength();
    pD.attr("stroke-dasharray", lenD).attr("stroke-dashoffset", lenD)
      .transition().duration(1200).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    // Hover overlay
    const bisect = d3.bisector((_, i: number) => circulacionData.years[i]).left;
    const focus = g.append("g").style("display", "none");
    focus.append("line").attr("class", "focus-line").attr("y1", 0).attr("y2", innerH)
      .style("stroke", "#9ca3af").style("stroke-dasharray", "4,3").style("stroke-width", 1.5);
    const dotI = focus.append("circle").attr("r", 6).attr("fill", "hsl(221,65%,30%)").attr("stroke", "white").attr("stroke-width", 2);
    const dotD = focus.append("circle").attr("r", 6).attr("fill", "hsl(38,80%,50%)").attr("stroke", "white").attr("stroke-width", 2);

    g.append("rect")
      .attr("width", innerW).attr("height", innerH)
      .attr("fill", "transparent")
      .style("cursor", "crosshair")
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => { focus.style("display", "none"); hideTooltip(); })
      .on("mousemove", (event: MouseEvent) => {
        const [mx] = d3.pointer(event);
        const xVal = x.invert(mx);
        const idx = Math.max(0, Math.min(circulacionData.years.length - 1,
          bisect(circulacionData.impresa, xVal, 0)));
        const nearIdx = idx > 0 && Math.abs(circulacionData.years[idx - 1] - xVal) < Math.abs(circulacionData.years[idx] - xVal) ? idx - 1 : idx;
        const yr = circulacionData.years[nearIdx];
        const imp = circulacionData.impresa[nearIdx];
        const dig = circulacionData.digital[nearIdx];
        focus.select(".focus-line").attr("x1", x(yr)).attr("x2", x(yr));
        dotI.attr("cx", x(yr)).attr("cy", yLeft(imp));
        dotD.attr("cx", x(yr)).attr("cy", yRight(dig));
        showTooltip(event,
          `<strong>Año ${yr}</strong><br/>` +
          `<span style="color:hsl(221,65%,65%)">●</span> Circulación impresa: <strong>${imp}K</strong><br/>` +
          `<span style="color:hsl(38,80%,65%)">●</span> Consumo digital: <strong>${dig}M usuarios</strong>`
        );
      });

    // Legend
    const legX = innerW - (width < 480 ? 150 : 170);
    const leg = g.append("g").attr("transform", `translate(${Math.max(10, legX)}, 0)`);
    [{ color: "hsl(221,65%,30%)", label: "Circulación impresa" }, { color: "hsl(38,80%,50%)", label: "Consumo digital" }]
      .forEach((item, i) => {
        const row = leg.append("g").attr("transform", `translate(0,${i * 20})`);
        row.append("line").attr("x1", 0).attr("x2", 16).attr("y1", 8).attr("y2", 8)
          .attr("stroke", item.color).attr("stroke-width", 2.5);
        row.append("text").attr("x", 22).attr("y", 12).text(item.label)
          .style("font-size", "10px").style("fill", "#374151");
      });
  }, []);

  function showTooltip(event: MouseEvent, html: string) {
    const t = tooltipRef.current; if (!t) return;
    t.innerHTML = html;
    t.style.opacity = "1";
    const rect = containerRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left + 14;
    const y = event.clientY - rect.top - 14;
    t.style.left = (x + t.offsetWidth > rect.width ? x - t.offsetWidth - 20 : x) + "px";
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
