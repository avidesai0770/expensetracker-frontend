import { useContext } from "react";
import {
  Blocks,
  TicketPlus,
  CirclePlus,
  ListPlus,
  UserPen,
  Settings,
  LogOut,
  DollarSign,
  IndianRupeeIcon,
} from "lucide-react";
import assets from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";



interface SideBarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ open, toggleSidebar }: SideBarProps) => {

  const navigate = useNavigate();
  const { setUser}  = useContext(AppContext)

  const HandleClearCookie = () => {
    console.log('called');
    localStorage.clear();
    setUser(null)
    navigate("/");
  }


  return (
    <>


      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-20 h-[100vh]
          bg-white border-r border-gray-200/50
          w-60 lg:w-80 flex flex-col justify-between item-start
          py-6 px-3 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo (only desktop) */}
        <div className="hidden lg:flex text-start items-center gap-2 mb-6 group cursor-pointer">
          <img src={assets.logo} alt="MoneyTracker Logo" className="w-10 h-10 object-cover" />
          <h1 className="text-xl font-semibold flex gap-1">
            <span className="text-green-600 group-hover:-translate-y-0.5 transition-transform">
              Money
            </span>
            <span className="text-gray-800">Tracker</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col justify-between h-full">
          <nav className="flex flex-col space-y-3 gap-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-left px-4 py-3 hover:border border-green-600 w-full flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all ${isActive
                  ? "bg-green-50 text-green-600 border border-green-600"
                  : ""
                }`
              }
            >
              <Blocks /> Dashboard
            </NavLink>
            <NavLink
              to="/expense"
              className={({ isActive }) =>
                `text-left px-4 py-3 hover:border border-green-600 w-full flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all ${isActive
                  ? "bg-green-50 text-green-600 border border-green-600"
                  : ""
                }`
              }
            >
              <TicketPlus /> Add Expenses
            </NavLink>
            <NavLink
              to="/income"
              className={({ isActive }) =>
                `text-left px-4 py-3 hover:border border-green-600 w-full flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all ${isActive
                  ? "bg-green-50 text-green-600 border border-green-600"
                  : ""
                }`
              }
            >
              <CirclePlus /> Add Income
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `text-left px-4 py-3 hover:border border-green-600 w-full flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all ${isActive
                  ? "bg-green-50 text-green-600 border border-green-600"
                  : ""
                }`
              }
            >
              <ListPlus /> Categories
            </NavLink>
             <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `text-left px-4 py-3 hover:border border-green-600 w-full flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all ${isActive
                  ? "bg-green-50 text-green-600 border border-green-600"
                  : ""
                }`
              }
            >
              <IndianRupeeIcon /> Transactions
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-left px-4 py-3 hover:border border-green-600 w-full flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all ${isActive
                  ? "bg-green-50 text-green-600 border border-green-600"
                  : ""
                }`
              }
            >
              <UserPen /> Profile
            </NavLink>
          </nav>

          {/* Bottom buttons */}
          <div className="w-full flex flex-col gap-3 mt-4">
          
            <button
              onClick={HandleClearCookie}
              className="text-left hover:border border-green-600 px-4 py-2 flex gap-2 items-center rounded-lg hover:bg-green-50 hover:text-green-600 transition-all"
            >
              <LogOut /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-10"
        ></div>
      )}
    </>
  );
};

export default SideBar;
