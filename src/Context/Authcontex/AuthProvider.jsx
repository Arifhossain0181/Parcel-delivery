import React from 'react';
import { Authcontext } from './Authcontext';

const AuthProvider = ({ children }) => {
    const authinfo = {
        // TODO: add authentication state and methods here
    };

    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;