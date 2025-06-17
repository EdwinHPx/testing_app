import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../style/JefaturaLayout.css";

function JefaturaLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsSidebarOpen(false);
      }
    };
    
    // Evitar deslizamiento cuando el sidebar está abierto en móviles
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="layout-container">
      {isMobile && (
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="main-content">
        <Outlet />
      </div>
      {/* Overlay para cerrar el sidebar al hacer clic fuera en móviles */}
      {isMobile && isSidebarOpen && (
        <div 
          className="position-fixed top-0 left-0 w-100 h-100 bg-dark" 
          style={{ opacity: 0.5, zIndex: 1020 }}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default JefaturaLayout;