import React from 'react';
import Context from './context';
import UseStorage from './useStorage';

const StoreProvider = ({ children }) => {
  const [token, setToken] = UseStorage('token');

  return (
    <Context.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default StoreProvider;