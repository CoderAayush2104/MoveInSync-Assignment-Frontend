/* eslint-disable react/display-name */

import {  Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

// HOC for authentication and authorization
const withAuth = (WrappedComponent, allowedRole = "") => {
  return (props) => {

    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    

    if (!token) {
      // If there's no token, redirect to login
      return <Navigate to="/"/>
    }

    // Decode the JWT to get user info (including roles)
    let decodedToken;
    try {
      decodedToken = jwtDecode(token); // Assuming JWT contains user roles
      const issuedAt = decodedToken.iat;
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const tokenAgeInSeconds = currentTime - issuedAt;
      if (tokenAgeInSeconds > 24 * 60 * 60) { // 24 hours in seconds
        console.log("Token is too old");
        return <Navigate to="/"/>
      }
    } catch (error) {
      console.error("Invalid token", error);
      return <Navigate to="/"/>
    }

   

    // Check if the user has any of the allowed roles
    const isAuthorized = allowedRole === role;

    if (!isAuthorized) {
      
      return <div>Access Denied: You do not have permission to view this page.</div>;
    }

    // If authenticated and authorized, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
