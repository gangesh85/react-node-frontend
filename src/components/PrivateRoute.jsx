import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  let auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
