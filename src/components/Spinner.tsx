import { MoonLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div style={{ display: "grid", placeContent: "center", height: "450px" }}>
      <MoonLoader speedMultiplier={0.8} color="purple" />
    </div>
  );
}
