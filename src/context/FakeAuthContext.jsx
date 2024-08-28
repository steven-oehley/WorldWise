import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (currentState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "login":
      return { ...currentState, user: payload, isAuthenticated: true };
    case "logout":
      return {
        ...currentState,
        user: initialState.user,
        isAuthenticated: initialState.isAuthenticated,
      };

    default:
      throw new Error("Unkown action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  function login(inputEmail, inputPassword) {
    const { email: userEmail, password: userPassword } = FAKE_USER;
    if (inputEmail === userEmail && inputPassword === userPassword)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
