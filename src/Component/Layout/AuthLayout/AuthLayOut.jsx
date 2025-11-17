import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../../Navbar';

const AuthLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default AuthLayOut;