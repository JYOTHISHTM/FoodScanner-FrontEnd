import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ScanHistory from "./pages/History";
import ProductInfo from "./pages/ProductInfo";
import Favorites from "./pages/Favorites"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmailLogin from "./pages/EmailLogin";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// function Layout() {
//   const location = useLocation();

//   const hideLayout = location.pathname === "/login";

//   return (
//           <AdminAuthProvider>
//     <div className="flex flex-col min-h-screen">

//       <Navbar />

//       <main className="flex-grow">
//         <Routes>


//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route path="dashboard" element={<AdminDashboard />} />
//               <Route path="users" element={<AdminUsers />} />
//               <Route index element={<Navigate to="/admin/dashboard" replace />} />
//             </Route>



//           <Route path="/email-login" element={<PublicRoute><EmailLogin /></PublicRoute>} />
//           <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/history" element={<ScanHistory />} />
//             <Route path="/favorites" element={<Favorites />} />
//             <Route path="/product/:id" element={<ProductInfo />} />
//           </Route>



//         </Routes>
//       </main>

//       {!hideLayout && <Footer />}
//     </div>
//           </AdminAuthProvider>
//   );
// }

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideFooter =
    location.pathname === "/login" || isAdminRoute;

  return (
    <div className="flex flex-col min-h-screen">

      {/* ✅ Show Navbar ONLY for user */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>

          {/* ✅ ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Route>

          {/* ✅ USER PUBLIC */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/email-login" element={<PublicRoute><EmailLogin /></PublicRoute>} />

          {/* ✅ USER PROTECTED */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<ScanHistory />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/product/:id" element={<ProductInfo />} />
          </Route>

        </Routes>
      </main>

      {/* ✅ Hide footer for admin */}
      {!hideFooter && <Footer />}
    </div>
  );
}


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;