import { useEffect, useState } from "react";

export function useFetchCities() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    const controller = new AbortController();
    async function fetchData() {
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

    fetchData();

    return () => controller.abort();
  }, []);

  return { cities, isLoading, error };
}
