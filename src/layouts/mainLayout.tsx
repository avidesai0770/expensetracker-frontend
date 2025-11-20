import React, { useState } from "react";
import SideBar from "../components/SideBar/sideBar";
import Header from "../components/Header/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="lg:flex block min-h-screen bg-gray-50">
        <div className="lg:hidden block">
            <Header toggleSidebar={toggleSidebar} />
        </div>
      <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar}  />
      <main className="flex-1 p-6 ml-0 lg:ml-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
