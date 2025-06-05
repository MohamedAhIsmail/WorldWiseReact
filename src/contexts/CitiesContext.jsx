/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoding(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoding(false);
      }
    }

    getCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoding(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoding(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoding(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      setCities(cities=> [...cities, data])
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  // check if we using context in the wrong place
  if (context === undefined)
    throw new Error("CitiesContxt was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
