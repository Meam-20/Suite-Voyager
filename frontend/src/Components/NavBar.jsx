import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    // Backend theke admin status check korar logic
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/admin/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                });
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                setIsAdmin(false);
            })
            .catch(error => console.log(error));
    }

    const NavLinks = (
        <>
            <li className="text-lg font-semibold">
                <NavLink 
                    style={({ isActive }) => ({
                        color: isActive ? "#1E2C1A" : "white",
                        backgroundColor: isActive ? "#D49B35" : "",
                    })} 
                    to="/"
                >Home</NavLink>
            </li>
            <li className="text-lg font-semibold">
                <NavLink 
                    style={({ isActive }) => ({
                        color: isActive ? "#1E2C1A" : "white",
                        backgroundColor: isActive ? "#D49B35" : "",
                    })} 
                    to="/rooms"
                >Rooms</NavLink>
            </li>
            <li className="text-lg font-semibold">
                <NavLink 
                    style={({ isActive }) => ({
                        color: isActive ? "#1E2C1A" : "white",
                        backgroundColor: isActive ? "#D49B35" : "",
                    })} 
                    to="/myBookings"
                >My Bookings</NavLink>
            </li>

            {/* ⭐ JODI ADMIN HOY TOBUI DASHBOARD DEKHABE ⭐ */}
            {isAdmin && (
                <li className="text-lg font-semibold">
                    <NavLink 
                        style={({ isActive }) => ({
                            color: isActive ? "#1E2C1A" : "white",
                            backgroundColor: isActive ? "#D49B35" : "",
                        })} 
                        to="/dashboard"
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}

            {user ? (
                <div className="flex flex-col lg:flex-row gap-2 lg:ml-4">
                    <button onClick={handleSignOut} className="text-lg font-semibold text-[#D49B35] border-[#D49B35] btn bg-[#1E2C1A] hover:bg-black">Sign Out</button>
                </div>
            ) : (
                <li className="text-lg font-semibold">
                    <NavLink 
                        style={({ isActive }) => ({
                            color: isActive ? "#1E2C1A" : "white",
                            backgroundColor: isActive ? "#D49B35" : "",
                        })} 
                        to="/login"
                    >Login</NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar lg:w-11/12 lg:mx-auto lg:rounded-lg bg-[#1E2C1A] lg:my-4 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 text-[#D49B35] w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[10] p-2 bg-[#1E2C1A] rounded-box w-52 border border-[#D49B35]">
                        {NavLinks}
                    </ul>
                </div>
                <Link to="/" className="flex items-center px-4">
                    <img className="w-16 h-12 lg:w-20 lg:h-15 object-contain" src="https://i.ibb.co/R36SZtG/Sv-removebg-preview.png" alt="SuiteVoyage Logo" />
                    <h1 className="text-[#D49B35] font-bold text-xl lg:text-2xl ml-2">SuiteVoyage</h1>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {NavLinks}
                </ul>
            </div>
            <div className="navbar-end px-4">
                {user && (
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end">
                            <h2 className="text-sm font-bold text-white">{user?.displayName}</h2>
                            {isAdmin && <span className="text-[10px] bg-[#D49B35] text-[#1E2C1A] px-2 rounded-full font-bold uppercase">Admin</span>}
                        </div>
                        <div className="avatar online">
                            <div className="w-10 rounded-full border-2 border-[#D49B35]">
                                <img src={user?.photoURL || "https://i.ibb.co/mJR9p7v/user.png"} alt="User Profile" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;