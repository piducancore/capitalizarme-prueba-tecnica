import { useGraphStore, indicators, months } from "../store";

export default function Selectors() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "8px" }}>
      <SelectIndicator />
      <SelectYear />
      <SelectMonth />
    </div>
  );
}

export function SelectIndicator() {
  const { indicator, setState } = useGraphStore();
  return (
    <select name="indicator" onChange={setState} value={indicator?.id}>
      <option value="">Selecciona un indicador</option>
      {indicators.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

export function SelectYear() {
  const { indicator, year, setState } = useGraphStore();
  const years = Array.from(
    { length: new Date().getFullYear() - indicator?.startAt + 1 },
    (_, i) => indicator.startAt + i
  );
  return (
    <select name="year" onChange={setState} value={year}>
      <option value="">Selecciona un año</option>
      {indicator?.startAt &&
        years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
    </select>
  );
}

export function SelectMonth() {
  const { indicator, month, setState } = useGraphStore();
  return (
    <select name="month" onChange={setState} value={month} disabled={indicator?.yearsOnly}>
      <option value="">Selecciona un mes</option>
      {months.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}
