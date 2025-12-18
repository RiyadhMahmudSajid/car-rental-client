import React from 'react';
import UserOverview from './user/overview/UserOverview';
import useUserRole from '../Hook/useUserRole';
import AdminOverview from './Admin/Overview/AdminOverview';


const DashboardHome = () => {
  
 const { role, isLoading } = useUserRole()


  if(isLoading){
    <p>loding....</p>
  }

  return (
    <div>
      {
        role === "Admin" ?  <AdminOverview></AdminOverview> : <UserOverview></UserOverview>
      }
     
    </div>
  );
};

export default DashboardHome; 