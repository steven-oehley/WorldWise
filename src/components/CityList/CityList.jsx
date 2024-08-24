import styles from "./CityList.module.css";

import { CityItem, Error, Message, Spinner } from "components";

function CityList({ cities, isLoading, error }) {
  if (isLoading) return <Spinner />;

  if (error) return <Error />;

  if (cities.length === 0)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
export default CityList;
