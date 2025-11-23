import { useContext, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import assets from "../../assets/assets";

const MenuBar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropDownRef = useRef(null);
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();


    return (
        <div className="p-4 bg-gray-200 items-center shadow-md">
            <div className=" items-center  gap-2">
                <button onClick={() => setOpenSidebar(!openSidebar)} className="block lg:hidden text-black hover:bg-gray-50 p-1 rounded transition-colors">
                    {openSidebar ? (
                        <X className="text-2xl" />
                    ) : (
                        <Menu className="text-2xl" />
                    )}
                </button>
                <div className="justify-between items-center flex">
                    <div className="flex items-center justify-center gap-1 group cursor-pointer">
                        <img src={assets.logo} alt="MoneyTracker Logo" className="w-10 h-10 object-cover" />
                        <h1 className="hidden lg:block text-xl font-semibold  items-center gap-1">
                            <span className="text-green-600 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                                Money
                            </span>
                            <span className="text-gray-800">Tracker</span>
                        </h1>
                    </div>
                    <div className="relative flex-row flex gap-2" ref={dropDownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center justify-center bg-gray-50 rounded-full hover:ring-2 w-12 h-12 ring-purple-500 hover:bg-gray-100 transition-colors"
                        >
                            <User className="text-purple-500 w-6 h-6" />
                        </button>

                        <div className="flex flex-col ml-2">
                            <span className="text-gray-700 font-medium">Avi Desai</span>
                            <span className="text-gray-500 text-sm">avijdesai99@gmail.com</span>
                        </div>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <button
                                    onClick={() => {
                                        setUser(null);
                                        navigate("/login");
                                    }
                                    }
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <button className="menu-item">Home</button>
            <button className="menu-item">About</button>
            <button className="menu-item">Services</button>
            <button className="menu-item">Contact</button> */}
        </div>
    );
};

export default MenuBar;