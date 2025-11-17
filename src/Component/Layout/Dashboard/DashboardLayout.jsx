import React, { useContext } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Dashboaed/DashboardSidebar";
import { AuthContex } from "../../../Contex/AuthProvider";
import { ThemeContext } from "../../../Contex/ThemeProvider";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

const DashboardLayout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user } = useContext(AuthContex);

    return (
        <div className="flex bg-background text-text-base min-h-screen">

           
            <div className="hidden lg:block w-64"></div>

      
            <DashboardSidebar />

            <main className="flex-1 p-5 ">

      
                <div className="flex gap-4 justify-end items-center mb-8 pb-4 border-b border-border">
                    <h2 className="text-sm font-semibold">
                        <span className="text-primary">{user?.displayName || "User"}</span> 
                    </h2>

                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full bg-surface  shadow-md hover:bg-border transition"
                    >
                        {theme === "light" ? (
                            <FaRegMoon size={22} className="text-primary" />
                        ) : (
                            <LuSun size={22} className="text-primary" />
                        )}
                    </button>
                </div>

                <div className="pt-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
