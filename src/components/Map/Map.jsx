import styles from "./Map.module.css";

import { useNavigate, useSearchParams } from "react-router-dom";

// Map is seperate from sidebar, which is based on routes using the outlet - displaying either cities or countries
// The map always appears in the AppLayout - contains sidebar and map
// based on interactions in the sidebar the url and UI will change
// the map is always open and rendered so it has access to the changing url and can use params and querystrings from there

// params - control piece of ui
// navigate to url and add param
// component picks up that param using useParams and renders UI based on this

// query string can pass data around - can pick up that data here in map and use from query string

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("form")} className={styles.mapContainer}>
      Map: {lat}, {lng}
    </div>
  );
}
export default Map;
