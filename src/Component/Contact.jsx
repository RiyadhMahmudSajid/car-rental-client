
// import React, { useContext } from 'react';


// import { useQuery } from '@tanstack/react-query';
// import { AuthContex } from '../Contex/AuthProvider';
// import useAxios from './Hook/useAxios';
import useUserRole from './Hook/useUserRole';
const Contact = () => {

    // const { user, loading } = useContext(AuthContex)
    // const axiosInstance = useAxios()
    // const { data, isLoading } = useQuery({
    //     queryKey: ['role', user?.email],
    //     enabled: !loading && !!user?.email,
    //     queryFn: async () => {
    //         const result = await axiosInstance.get(`/role?email=${user.email}`)
    //         console.log(result)
    //         return result;
    //     }
    // })
    const {role,isLoading} = useUserRole()
    if(isLoading){
        return <p>loading...</p>
    }
    console.log(role)
    return (
        <div>

        </div>
    );
};

export default Contact;