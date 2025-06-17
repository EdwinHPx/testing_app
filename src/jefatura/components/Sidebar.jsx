import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBook, FaTimes, FaSignOutAlt, FaUser, FaClipboardList, FaListAlt} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import logoAde from '@assets/images/ade/adee.png';
import "../style/Sidebar.css";
import PropTypes from "prop-types";

function Sidebar({ isOpen, onClose, isMobile }) {
  const location = useLocation();
  
  const menuItems = [
    { to: "/jefatura/inicio", icon: <FaHome />, text: "Inicio" },
    { to: "/jefatura/perfil", icon: <FaUser />, text: "Mi Perfil" },
    // { to: "/jefatura/estudiantes", icon: <FaUserGraduate />, text: "Estudiantes" },
    { to: "/jefatura/asignaturas", icon: <FaBook />, text: "Asignaturas" },
    { to: "/jefatura/c_academica", icon: <MdMenuBook />, text: "Cargas Académicas" },
    { to: "/jefatura/reinscripciones", icon: <MdPlaylistAddCheckCircle />, text: "Reinscripciones" },
    { to: "/jefatura/asistencia", icon: <FaListAlt />, text: "Listas de Asistencia" },
    { to: "/jefatura/act_apoyo", icon: <FaClipboardList />, text: "Actividades de Apoyo" },

  ];

  const handleClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");

  };

  return (
    <nav
      className={`sidebar ${isOpen ? "open" : ""}`}
    >
      {isMobile && (
        <button className="close-btn" onClick={onClose} aria-label="Cerrar Sidebar">
          <FaTimes size={24} />
        </button>
      )}
      <div className="sidebar-header text-center py-4">
        <div className="sidebar-logo-container">
          <img src={logoAde} alt="ADE Logo" className="sidebar-logo mb-2" style={{ width: '70px', height: 'auto' }} />
        </div>
      </div>
      <ul className="nav flex-column mt-4">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.to}>
            <Link
              to={item.to}
              className={`nav-link d-flex align-items-center ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={handleClick}
            >
              {item.icon}
              <span className="flex-grow-1">{item.text}</span>
            </Link>
          </li>
        ))}
        <hr className="sidebar-divider my-3 border-secondary opacity-25" />
        <li className="nav-item mt-auto">
          <button 
            className="nav-link text-white px-4 py-3 d-flex align-items-center w-100 border-0 bg-transparent log-out"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-3" />
            <span className="flex-grow-1">Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

// Validación de las props
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;