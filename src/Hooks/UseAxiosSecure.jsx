import React from 'react';
import axios from 'axios';

//  axios instance create

const axiossecure = axios.create({
    baseURL:'http://localhost:3000',


})


const UseAxiosSecure = () => {
    return {axiossecure};
};

export default UseAxiosSecure;