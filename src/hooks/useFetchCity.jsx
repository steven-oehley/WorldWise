import { useEffect, useState } from "react";

export function useFetchCity(id) {
  const [city, setCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    setIsLoading(true);
    setError("");
  };

  // pretend need to fetch for specific id - often case for external apis
  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    const controller = new AbortController();

    const fetchCity = async () => {
      handleReset();
      try {
        const response = await fetch(`${url}/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setCity(data);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCity();

    return () => controller.abort();
  }, [id]);

  return { city, isLoading, error };
}
