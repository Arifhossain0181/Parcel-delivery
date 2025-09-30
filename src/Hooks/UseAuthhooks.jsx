import React, { useContext } from 'react';
import { Authcontext } from '../Context/Authcontex/Authcontext';

const UseAuthhooks = () => {
    const authinfo = useContext(Authcontext);
    return authinfo;
};

export default UseAuthhooks;