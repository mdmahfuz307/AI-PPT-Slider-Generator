import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface UserDetail {
  fullName: string | null;
  email: string;
  createdAt: Date;
  credits: number;
}

export interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: (user: UserDetail | null) => void;
}

export const UserDetailContext = createContext<UserDetailContextType | undefined>(undefined);

export function UserDetailProvider({ children }: { children: ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export function useUserDetail() {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUserDetail must be used within UserDetailProvider');
  }
  return context;
}  