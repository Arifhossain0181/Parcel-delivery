import React from 'react';
import UseAuthhooks from '../Hooks/UseAuthhooks';
import useUserRole from '../Hooks/useUseRole';
import { Navigate, useNavigate } from 'react-router-dom';
const AdminRoutes = ({children}) => {
    const {user ,loading} = UseAuthhooks();
    const {role ,roleLoading} = useUserRole();

    console.log(role);
    const location = useNavigate();
    if(loading || roleLoading){
        return <span className="loading loading-ball loading-xl"></span>
    }

    if(!user || role !== 'admin'){
                 return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;

    }
    return children
};

export default AdminRoutes;