import { CitiesProvider } from "./CitiesContext";
import { AuthProvider } from "./FakeAuthContext.jsx";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <CitiesProvider>{children}</CitiesProvider>
  </AuthProvider>
);

export { AppProviders };
