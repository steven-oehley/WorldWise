import styles from "./CityList.module.css";

import CityItem from "../CityItem/CityItem";
import Error from "../Error";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

function CityList({ cities, isLoading, error }) {
  if (isLoading) return <Spinner />;

  if (error) return <Error />;

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
export default CityList;
