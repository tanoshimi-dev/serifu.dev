import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login as accountLogin, fetchStatus, account, isAccountLoggedIn, logout as accountLogout,
  rememberMeLogin, getAuthUser, getUser
} from '@/lib/rtk/slices/accountSlice';


interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check login status from localStorage or an API
    // const storedLoginStatus = localStorage.getItem('isIhLoggedIn');
    // if (storedLoginStatus === 'true') {
    //   setIsLoggedIn(true);
    // }


  }, []);



  const login = () => {
    
    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));
    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }
    //console.log('login xsrfToken', xsrfToken);

    if (xsrfToken) {
      setIsLoggedIn(true);
      // localStorage.setItem('isLoggedIn', 'true');
      // localStorage.setItem('token', xsrfToken);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    // localStorage.removeItem('token');
    // localStorage.removeItem('isLoggedIn');
  };

  return (
    <Suspense>
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
    </Suspense>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};