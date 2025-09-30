import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from "react-router-dom";

const Parcelicon = () => {
    return (
             <div>
                <Link to="/">
                    <div className='flex items-end'>
                        <img src={logo} alt="ProFast logo" />
                        <h2 className='text-2xl -ml-2 font-extrabold'>ProFast</h2>
                    </div>
                </Link>
             </div>
    );
};

export default Parcelicon;