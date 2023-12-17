import React from 'react'
import {createContext, useState} from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
export const server = "http://localhost:3000/api/v1/features";

type ContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: Record<string, unknown>; // Replace this with the actual type of your user state
  setUser: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};
createContext({isAuthenticated: false});

export const Context = createContext<ContextValue>({ 
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // Initial function placeholder
  loading: false,
  setLoading: () => {}, // Initial function placeholder
  user: {}, // Replace this with the initial state of your user
  setUser: () => {}, // Initial function placeholder
});

const AppWrapper = ()=>{
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState({});
  return(
    <Context.Provider value={{
      isAuthenticated,setIsAuthenticated,
      loading,setLoading,
      user,setUser
      }}>
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)