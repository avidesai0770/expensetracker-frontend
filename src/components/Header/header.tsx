import { Menu } from 'lucide-react';
import assets from '../../assets/assets';


interface HeaderProps {
    toggleSidebar: () => void;
}


const Header = ({ toggleSidebar }: HeaderProps) => {

    return (
        <div className="bg-white p-3 shadow-sm z-30">
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleSidebar}
                    className="text-black hover:bg-gray-100 p-2 rounded transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div className="flex gap-1 items-center">
                    <img
                        src={assets.logo}
                        alt="MoneyTracker Logo"
                        className="object-cover w-8 h-8"
                    />
                    <h1 className="text-lg font-semibold">
                        <span className="text-green-600">Money</span>
                        <span className="text-gray-800">Tracker</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Header