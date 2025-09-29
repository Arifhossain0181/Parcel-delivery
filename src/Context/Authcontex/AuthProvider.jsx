import React from 'react';
import AuthContext from './Authcontext'
const AuthProvider = () => {
    const authinfo ={
        
    }
    return (
        <AuthContext value={authinfo}></AuthContext>
    );
};

export default AuthProvider;