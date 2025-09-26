import React from 'react';
import logo from '../../../assets/logo.png'
const Parcelicon = () => {
    return (
        <div className='flex  items-end'>
            <img src={logo} alt="" />
            <h2 className=' text-2xl -ml-2 font-extrabold'>ProFast</h2>
        </div>
    );
};

export default Parcelicon;