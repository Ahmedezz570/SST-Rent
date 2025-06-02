
import { createContext, useContext, useState, useEffect } from "react";
import { users, User } from "../data/dummyData";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "student" | "admin",
    studentId?: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("https://core-production-71d5.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) return false;
  
      const data = await res.json();
  
      
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token); 
  
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  

  // const register = async (
  //   name: string,
  //   email: string,
  //   password: string,
  //   role: "student" | "admin",
  //   studentId?: string
  // ): Promise<boolean> => {
  //   // Simulate API call
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       // Check if user already exists
  //       const existingUser = users.find((u) => u.email === email);
  //       if (existingUser) {
  //         resolve(false);
  //         return;
  //       }

  //       // Create new user
  //       const newUser: User = {
  //         id: String(users.length + 1),
  //         name,
  //         email,
  //         password,
  //         role,
  //         studentId,
  //         createdAt: new Date().toISOString().split('T')[0], // Add the missing createdAt field
  //       };

  //       // Add to users array (in a real app, this would be a database call)
  //       users.push(newUser);

  //       // Log in the new user
  //       setUser(newUser);
  //       localStorage.setItem("user", JSON.stringify(newUser));
  //       resolve(true);
  //     }, 500); // Simulate network delay
  //   });
  // };
  const register = async (
    name: string,
    email: string,
    password: string,
    role: "student" | "admin",
    studentId?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role, studentId }),
      });
  
      if (!res.ok) return false;
  
      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
