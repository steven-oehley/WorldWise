import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product/Product";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/app" element={<AppLayout />} />
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
