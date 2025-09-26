import React from 'react';
import { Outlet } from "react-router";
import  Navbar from '../Pages/Shared/Nabvar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
const Rootelayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Rootelayout;