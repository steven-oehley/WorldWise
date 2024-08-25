import { CitiesContext } from "./CitiesContext";
import { useContext } from "react";

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext used outside of CitiesProvider");
  return context;
};

export { useCities };
