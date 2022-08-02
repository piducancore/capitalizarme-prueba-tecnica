import Plot from "react-plotly.js";
import { useGraphStore } from "../store";

export default function Scatterplot() {
  const { data, indicator, year, month } = useGraphStore();
  const hasData = data.serie.length;
  if (hasData) {
    return (
      <Plot
        data={[
          {
            x: data.serie.map((x) => x.fecha),
            y: data.serie.map((y) => y.valor),
            type: "scatter",
            mode: "lines",
            marker: { color: "purple" },
          },
        ]}
        layout={{
          title: `${indicator.name} ${month && !indicator.yearsOnly && `de ${month}`} de ${year}`,
          yaxis: { title: `Valor en ${data.unidad_medida.toLowerCase()}` },
          autosize: true,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
  return null;
}
