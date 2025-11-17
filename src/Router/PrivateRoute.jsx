import React, { useContext } from 'react';
import { AuthContex } from '../Contex/AuthProvider';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const location = useLocation()
    console.log(location)

    const {user,loading} = useContext(AuthContex)
    
    if(loading){
        return <p>Loading...</p>
    }
    if(user){

        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;