import { Navigate, Outlet } from "react-router-dom";

// Simulated authentication check
const isAuthenticated = (): boolean => {
    // return !!localStorage.getItem("authToken"); // Example token check
    return true;
};

const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
