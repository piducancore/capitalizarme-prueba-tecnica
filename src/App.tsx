import React from "react";
import Selectors from "./components/Selectors";
import Loading from "./components/Spinner";
import Scatterplot from "./components/Scatterplot";
import { useGraphStore } from "./store";

export default function App() {
  const { loading, error } = useGraphStore();
  return (
    <React.Fragment>
      <Selectors />
      {loading ? <Loading /> : error.length ? <p>{error}</p> : <Scatterplot />}
    </React.Fragment>
  );
}
