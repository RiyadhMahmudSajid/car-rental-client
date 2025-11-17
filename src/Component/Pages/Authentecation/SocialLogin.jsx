import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContex } from '../../../Contex/AuthProvider';

const SocialLogin = () => {
    const {  googleLogin } = useContext(AuthContex)
    const handleGoogleSignIn = () => {
             googleLogin().then((result) => {
                 const user = result.user;
                 console.log(user)
            }).catch((error) => {
                 console.log(error)
            })
    }

    return (
        <button
            onClick={handleGoogleSignIn}

            className={`
        w-full flex items-center justify-center gap-3 mt-4
        border-2 border-border
        rounded-lg py-2.5 px-4 
       text-text-base
       bg-background 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        transition-all duration-200 ease-in-out
        shadow-sm hover:shadow-md
       
      `}
        >
            <FaGoogle className="w-5 h-5 text-red-500" />
            <span className="font-medium ">
                Continue with Google
            </span>
        </button>
    );
};

export default SocialLogin;