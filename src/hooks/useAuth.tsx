import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface Profile {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ role: string }>;
  signUp: (email: string, password: string, data: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading] = useState(false);

  const signIn = async (email: string, _password: string) => {
    // Mock login - determine role from email
    let role = "citizen";
    if (email.includes("admin")) role = "admin";
    else if (email.includes("investigator") || email.includes("inv")) role = "investigator";

    const mockUser = { id: "mock-user-1", email };
    setUser(mockUser);
    setProfile({
      full_name: email.split("@")[0],
      email,
      phone: "+977-9800000000",
      address: "Kathmandu, Nepal",
      avatar_url: "",
    });
    return { role };
  };

  const signUp = async (email: string, _password: string, data: Partial<Profile>) => {
    const mockUser = { id: "mock-user-1", email };
    setUser(mockUser);
    setProfile({
      full_name: data.full_name || email.split("@")[0],
      email,
      phone: data.phone || "",
      address: data.address || "",
      avatar_url: "",
    });
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {};

  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut, refreshProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
