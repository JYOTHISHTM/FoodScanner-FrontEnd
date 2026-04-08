


// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { useAdminAuth } from "../context/AdminAuthContext";

// const ProtectedRoute = () => {
//   const { isLoggedIn } = useAuth();
//   const { isAuthenticated } = useAdminAuth();

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;