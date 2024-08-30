import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import {
//   AppLayout,
//   HomePage,
//   Login,
//   PageNotFound,
//   Pricing,
//   Product,
// } from "pages";

// ** Build size without code splitting
// dist/index.html                   0.49 kB │ gzip:   0.32 kB
// dist/assets/index-DH3_Mig7.css   30.12 kB │ gzip:   5.14 kB
// dist/assets/index-BYQUe5oC.js   510.58 kB │ gzip: 149.34 kB

// ** Build size after code splitting

// vite v5.4.2 building for production...
// transforming (1) index.html
// ../bg.jpg referenced in ../bg.jpg didn't resolve at build time, it will remain unchanged to be resolved at runtime
// ✓ 296 modules transformed.
// dist/index.html                           0.49 kB │ gzip:   0.32 kB
// dist/assets/Logo-CtfPMVPO.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-fP6ipu4U.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-CX3p79nw.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DKp2I-AC.css         0.50 kB │ gzip:   0.30 kB
// dist/assets/PageNav-C2lIXkPA.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-CqJQB_Bu.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-DaN750Wa.css           26.36 kB │ gzip:   4.41 kB
// dist/assets/Product.module-DpVUF5Lu.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-JTlHDKkC.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-CJg58F2-.js              0.23 kB │ gzip:   0.21 kB
// dist/assets/PageNav-rXfMkFnk.js           0.49 kB │ gzip:   0.28 kB
// dist/assets/Pricing--Fu1AzkF.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-D0NqchJb.js          0.67 kB │ gzip:   0.42 kB
// dist/assets/Product-HiI75eiE.js           0.85 kB │ gzip:   0.49 kB
// dist/assets/Login-DNbuzScv.js             1.02 kB │ gzip:   0.55 kB
// dist/assets/AppLayout-CI2ZcCsu.js       156.93 kB │ gzip:  46.21 kB
// dist/assets/index-CT1E6U1D.js           351.67 kB │ gzip: 102.75 kB

const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const HomePage = lazy(() => import("./pages/HomePage/Homepage"));
const Login = lazy(() => import("./pages/Login/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product/Product"));

import { City, CityList, CountryList, Form, SpinnerFullPage } from "components";
import { ProtectedRoute } from "./pages";

function App() {
  return (
    <div className="app">
      <Router>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* absolute path - matches exactly to /pricing */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* nested routes go in here */}
              {/* index route is the default nested route - what appears when no matches */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              {/* realtive path - matches a path relative to the parent route in this case /app */}
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/login" element={<Login />} />
            {/* catch all route - redirect to homepage */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            {/* catch all route - page not found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
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
