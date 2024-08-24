import { v4 as uuidv4 } from "uuid";

import { CountryItem, Error, Message, Spinner } from "components";

import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading, error }) {
  if (isLoading) return <Spinner />;

  if (error) return <Error error={error} />;

  if (cities.length === 0)
    return <Message message="Add your first city by clicking on the map" />;

  const uniqueCountries = cities.reduce((acc, city) => {
    // Check if the country is already in the accumulator
    if (!acc.some((item) => item.country === city.country)) {
      acc.push({ country: city.country, emoji: city.emoji, id: uuidv4() });
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
export default CountryList;
