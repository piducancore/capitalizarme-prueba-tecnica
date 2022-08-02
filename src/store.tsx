import create from "zustand";

interface GraphState {
  indicator: { id: string; name: string; startAt: number; yearsOnly: boolean };
  year: string;
  month: string;
  data: {
    unidad_medida: string;
    serie: Array<{ fecha: string; valor: number }>;
  };
  loading: boolean;
  error: string;
  setState: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  fetchData: () => void;
}

export const useGraphStore = create<GraphState>()((set, get) => ({
  indicator: { id: "", name: "", startAt: 0, yearsOnly: false },
  year: "",
  month: "",
  data: { unidad_medida: "", serie: [] },
  loading: false,
  error: "",
  setState: async (e) => {
    set({ [e.target.name]: e.target.value, data: { unidad_medida: "", serie: [] } });
    if (e.target.name === "indicator") {
      const indicator = indicators[indicators.findIndex((x) => x.id === e.target.value)];
      set({ indicator });
      if (Number(indicator?.startAt) > Number(get().year) || !indicator?.id.length) {
        set({ year: "" });
      }
    }
    const { fetchData } = get();
    fetchData();
  },
  fetchData: async () => {
    try {
      const { indicator, year, month } = get();
      if ((indicator?.yearsOnly && year.length) || (!indicator?.yearsOnly && year.length && month.length)) {
        set(() => ({ loading: true }));
        const response = await (await fetch("https://mindicador.cl/api/" + indicator.id + "/" + year)).json();
        const byMonth = (e: { fecha: string }) => new Date(e.fecha).getMonth() === months.findIndex((m) => m === month);
        const data = indicator.yearsOnly ? response : { ...response, serie: response.serie.filter(byMonth) };
        set({ data, loading: false, error: data.serie.length ? "" : "No data available for this time period." });
      }
    } catch (err) {
      set(() => ({ hasErrors: JSON.stringify(err), loading: false }));
    }
  },
}));

export const indicators = [
  { id: "uf", name: "Unidad de fomento (UF)", startAt: 1977, yearsOnly: false },
  { id: "libra_cobre", name: "Libra de Cobre", startAt: 2012, yearsOnly: false },
  { id: "tasa_desempleo", name: "Tasa de desempleo", startAt: 2009, yearsOnly: true },
  { id: "euro", name: "Euro", startAt: 1999, yearsOnly: false },
  { id: "imacec", name: "Imacec", startAt: 1997, yearsOnly: true },
  { id: "dolar", name: "Dólar observado", startAt: 1984, yearsOnly: false },
  { id: "tpm", name: "Tasa Política Monetaria (TPM)", startAt: 2001, yearsOnly: false },
  { id: "ivp", name: "Indice de valor promedio (IVP)", startAt: 1990, yearsOnly: false },
  { id: "ipc", name: "Indice de Precios al Consumidor (IPC)", startAt: 1928, yearsOnly: true },
  { id: "dolar_intercambio", name: "Dólar acuerdo", startAt: 1988, yearsOnly: false },
  { id: "utm", name: "Unidad Tributaria Mensual (UTM)", startAt: 1990, yearsOnly: true },
  { id: "bitcoin", name: "Bitcoin", startAt: 2009, yearsOnly: false },
];

export const months = Array.from({ length: 12 })
  .map((_, i) => new Date(0, i).toLocaleString("es", { month: "long" }))
  .map((m) => m.charAt(0).toUpperCase() + m.slice(1));
