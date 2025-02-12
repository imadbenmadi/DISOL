import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./AppContext";

const ProtectedRoute = () => {
    const { isAuth } = useAppContext();

    if (isAuth === null) return null; // Wait for auth check

    return isAuth ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
