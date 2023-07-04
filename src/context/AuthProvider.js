import { createContext, useState } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [estaLogado, setEstaLogado] = useState(false);

  const fazerLogin = async (email, senha) => {
    try {
      await auth.signInWithEmailAndPassword(email, senha);
      setEstaLogado(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fazerLogout = async () => {
    try {
      await auth.signOut();
      setEstaLogado(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        estaLogado,
        fazerLogin,
        fazerLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
