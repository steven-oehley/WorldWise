import React from "react";

import styles from "./CountryList.module.css";

import CityItem from "../CityItem/CityItem";
import Error from "../Error";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

function CountryList({ cities, isLoading, error }) {
  if (isLoading) return <Spinner />;

  if (error) return <Error error={error} />;

  if (cities.length === 0)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
export default CountryList;
