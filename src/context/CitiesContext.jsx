import { createContext, useCallback, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    const controller = new AbortController();
    async function fetchCities() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setCities(data);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();

    return () => controller.abort();
  }, []);

  const fetchCity = useCallback(
    async (id) => {
      const url = import.meta.env.VITE_API_URL;
      const controller = new AbortController();
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`${url}/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setCurrentCity(data);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }

      return { currentCity };
    },
    [setCurrentCity] // Depend on setCurrentCity to avoid unnecessary re-renders
  );

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, error, currentCity, fetchCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
