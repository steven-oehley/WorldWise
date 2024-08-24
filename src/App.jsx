import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useFetchCities } from "./hooks/useFetchCities";

import {
  AppLayout,
  HomePage,
  Login,
  PageNotFound,
  Pricing,
  Product,
} from "pages";

import { City, CityList, CountryList, Form } from "components";

function App() {
  const { cities, isLoading, error } = useFetchCities();

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* absolute path - matches exactly to /pricing */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/app" element={<AppLayout />}>
            {/* nested routes go in here */}
            {/* index route is the default nested route - what appears when no matches */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={
                <CityList cities={cities} isLoading={isLoading} error={error} />
              }
            />
            <Route path="cities/:id" element={<City />} />
            {/* realtive path - matches a path relative to the parent route in this case /app */}
            <Route
              path="countries"
              element={
                <CountryList
                  cities={cities}
                  error={error}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* catch all route - redirect to homepage */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          {/* catch all route - page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// ABSOLUTE VS RELATIVE PATHS

// Absolute Paths ("/cities"):

// to="/cities" or path="/cities" specifies an absolute path.
// It matches exactly /cities from the root of the application.
// Use absolute paths when defining top-level routes that should always start from the root of your app.
// Example:

// javascript
// Copy code
// <Route path="/cities" element={<Cities />} />
// <Link to="/cities">Go to Cities</Link>
// This link and route will only work when navigating directly to /cities.
// Relative Paths ("cities"):

// to="cities" or path="cities" specifies a relative path.
// It matches a path relative to the parent route.
// Use relative paths for nested routes or when building paths dynamically based on the parent route.
// Example:

// javascript
// Copy code
// <Route path="/countries" element={<Countries />}>
//   <Route path="cities" element={<Cities />} />
// </Route>
// <Link to="cities">Go to Cities</Link>
// Here, the Cities component is nested under Countries, and the full path would be /countries/cities.
// Key Takeaways:
// Top-Level Routes: Use absolute paths (e.g., "/cities").
// Nested Routes: Use relative paths (e.g., "cities").
// When to Use Which:
// Absolute Path: When you want to navigate to a specific route regardless of the current location in the app.
// Relative Path: When you want the navigation or route to be relative to the current path, useful in nested route setups.
// This distinction helps you structure your routes correctly, making sure that your navigation and routing logic work as expected across different parts of your application.
