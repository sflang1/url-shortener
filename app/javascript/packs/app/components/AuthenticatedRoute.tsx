import React from "react";
import { IndexRouteProps, LayoutRouteProps, Navigate, Outlet, PathRouteProps, Route, useNavigate } from "react-router";

const AuthenticatedRoute: React.FC = (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
  // protect the route.
  const accessToken = localStorage.getItem('access_token');

  return accessToken ? <Outlet/> : <Navigate to="/login"/>
}

export default AuthenticatedRoute;