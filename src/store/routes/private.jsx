import React, { useContext } from "react";
import { Navigate } from 'react-router-dom';
import storeContext from "../context";

const RoutesPrivate = ({ children }) => {
  const { token } = useContext(storeContext);

  if (!token.data) {
    return <Navigate to="/login" replace />
  }
  return children;

}

export default RoutesPrivate;