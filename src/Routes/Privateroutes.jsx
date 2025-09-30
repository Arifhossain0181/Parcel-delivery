import React from 'react';
import UseAuthhooks from '../../Hooks/UseAuthhooks';
import { Navigate, useNavigate,
  useLocation, } from 'react-router';
const Privateroutes = ({children}) => {
    const location = useLocation();

    const {user,loading} = UseAuthhooks()
    if(loading){
        return <span className="loading loading-ball loading-xl"></span>
    }
    if(!user){
         return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default Privateroutes;