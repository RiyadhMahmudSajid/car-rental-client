import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ThemeContext } from '../Contex/ThemeProvider';
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { IoCloseSharp } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { AuthContex } from '../Contex/AuthProvider';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logOut, loading } = useContext(AuthContex)
    console.log(user)
    const navItem = [
        { name: "Home", path: '/' },
        { name: "Cars", path: '/all-car' },
        { name: 'My Booking', path: '/my-booking' },
        { name: 'Contact', path: '/contact' }
    ];
    const handleLogOut = () => {
        logOut()
    }

    const Logo = () => (
        <span className='text-2xl font-extrabold text-primary tracking-tight'>
            GoDrive
        </span>
    );

    return (
        <nav className="sticky top-0 z-20 shadow-md bg-surface text-text-base transition-colors duration-300">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">


                <button
                    onClick={() => setSidebarOpen(true)}
                    className="block sm:hidden p-2 text-text-base rounded-md border border-border hover:bg-border transition-colors"
                >
                    <FiMenu className="w-6 h-6" />
                </button>
                <div className="hidden sm:block mr-2">
                    <Logo />
                </div>


                <div
                    className={`
                        font-semibold transition-all duration-300  md:space-x-6 sm:items-center 
                        ${!sidebarOpen ? 'max-sm:w-0  overflow-hidden' : 'max-sm:w-64  max-sm:pl-6'}
     
                        max-sm:fixed top-0 bottom-0 left-0 max-sm:min-h-screen max-sm:h-full
                        max-sm:bg-background max-sm:text-text-base 
                        max-sm:pt-6  flex max-sm:flex-col gap-5 z-40 
                    `}
                >


                    <div className='flex justify-between mb-8 sm:hidden '>
                        <Logo></Logo>
                        <IoCloseSharp
                            onClick={() => setSidebarOpen(false)}
                            className="w-7 h-7 cursor-pointer text-text-base"
                        />
                    </div>


                    {navItem.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `text-text-secondary hover:text-primary transition-colors duration-200 sm:text-sm
                                ${isActive
                                    ? 'text-primary font-bold sm:border-b-2 sm:border-primary '
                                    : 'max-sm:text-text-base max-sm:py-2'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>


                <div className="flex items-center space-x-4">


                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-border text-text-secondary transition-colors"
                    >
                        {theme === 'light' ? <FaRegMoon size={20} /> : <LuSun size={20} />}
                    </button>
                    {user && (
                        <NavLink
                            to="/dashboard"
                            className="px-3 py-1 bg-surface border border-border rounded-lg text-text-base hover:bg-primary hover:text-white transition-colors"
                        >
                            Dashboard
                        </NavLink>
                    )}
                    <div>
                        {
                            user?.photoURL ? <div className='w-8 h-8 rounded-full overflow-hidden'>
                                <img className='w-full h-full' src={user.photoURL}></img>
                            </div> : <CgProfile />

                        }
                    </div>

                    {loading ? <div className="w-24 h-10 bg-gray-300 rounded-lg "></div> : (
                        user ? (
                            <Link onClick={handleLogOut} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-200">
                                Logout
                            </Link>
                        ) : (
                            <NavLink
                                to="/login"
                                className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-200"
                            >
                                Login
                            </NavLink>
                        )
                    )}



                </div>


                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;