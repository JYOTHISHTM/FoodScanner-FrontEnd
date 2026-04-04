import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";


interface UserType {
  _id: string;
  name: string;
  email: string;
  allergies?: string[];
  height?: string;
  age?: number;
  weight?: string
  gender?:string

}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, user: UserType) => void;
  logout: () => void;
}




export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null)


  // auto login on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem('user')

    if (storedUser) setUser(JSON.parse(storedUser));

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token: string, user: UserType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};