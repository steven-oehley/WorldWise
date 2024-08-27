import { createContext, useCallback, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "error":
      return { ...state, isLoading: false, error: payload };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, payload],
        currentCity: payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payload),
        currentCity: {},
      };
    default:
      throw new Error("Unknown action type");
  }
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, error, currentCity } = state;

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    const controller = new AbortController();

    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        if (e.name !== "AbortError")
          dispatch({ type: "error", payload: e.message });
      }
    }

    fetchCities();
    return () => controller.abort();
  }, []);

  const fetchCity = useCallback(async (id) => {
    const url = import.meta.env.VITE_API_URL;
    const controller = new AbortController();
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${url}/${id}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (e) {
      if (e.name !== "AbortError")
        dispatch({ type: "error", payload: e.message });
    }
  }, []);

  const createCity = useCallback(async (newCity) => {
    const url = import.meta.env.VITE_API_URL;
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (e) {
      if (e.name !== "AbortError")
        dispatch({ type: "error", payload: e.message });
    }
  }, []);

  const deleteCity = useCallback(async (id) => {
    const url = import.meta.env.VITE_API_URL;
    dispatch({ type: "loading" });
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (e) {
      if (e.name !== "AbortError")
        dispatch({ type: "error", payload: e.message });
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
