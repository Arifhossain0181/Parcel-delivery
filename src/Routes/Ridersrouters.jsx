import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuthhooks from '../Hooks/UseAuthhooks.jsx';
import useUserRole from '../Hooks/useUseRole.jsx';
const Ridersrouters = ({ children }) => {
    const { user, loading } = UseAuthhooks();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <div>Loading...</div>;
    }

    // Block non-riders only
    if (!user || role !== 'rider') {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

    // Allow riders
    return children;
};
export default Ridersrouters;