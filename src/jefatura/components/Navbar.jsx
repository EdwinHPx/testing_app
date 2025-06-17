import { FaBars, FaBell, FaUser, FaSearch, FaCog } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import "../style/Navbar.css";
import PropTypes from "prop-types";

const Navbar = ({ toggleSidebar }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nueva calificación registrada", time: "Hace 5 minutos", read: false },
    { id: 2, text: "Reunión de profesores mañana", time: "Hace 1 hora", read: false },
    { id: 3, text: "Actualización del sistema completada", time: "Hace 1 día", read: true }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHidden(prevScrollPos < currentScrollPos && currentScrollPos > 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <nav className={`navbar ${isHidden ? "hidden" : ""}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="hamburger" onClick={toggleSidebar} aria-label="Menú">
            <FaBars size={24} color="white" />
          </button>
          <h4 className="text-white mb-0 ms-2 d-none d-sm-block">Sistema Escolar</h4>
        </div>
        
        <div className="d-flex align-items-center">
          <div className="search-box me-3 d-none d-md-flex">
            <input type="text" placeholder="Buscar..." className="form-control-sm text-white border-0" />
            <button className="btn btn-sm text-white">
              <FaSearch size={14} />
            </button>
          </div>
          
          <Dropdown className="me-3">
            <Dropdown.Toggle variant="link" id="dropdown-notifications" className="border-0 text-white position-relative p-2">
              <FaBell size={18} />
              {unreadCount > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle badge-sm">
                  {unreadCount}
                </Badge>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="shadow-lg">
              <Dropdown.Header className="text-primary fw-bold">Notificaciones</Dropdown.Header>
              <div className="notification-container">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Dropdown.Item 
                      key={notification.id} 
                      onClick={() => markAsRead(notification.id)}
                      className={notification.read ? "text-muted" : ""}
                    >
                      <div className="d-flex flex-column">
                        <span>{notification.text}</span>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                      {!notification.read && (
                        <Badge bg="primary" className="ms-2" pill>Nuevo</Badge>
                      )}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No hay notificaciones</Dropdown.Item>
                )}
              </div>
              <Dropdown.Divider />
              <Dropdown.Item className="text-center text-primary">Ver todas</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-user" className="border-0 text-white d-flex align-items-center p-2">
              <div className="bg-white rounded-circle p-1 me-2">
                <FaUser size={16} className="text-primary" />
              </div>
              <span className="d-none d-md-block">Admin</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="shadow-lg">
              <Dropdown.Item className="text-primary">
                <FaUser className="me-2" /> Perfil
              </Dropdown.Item>
              <Dropdown.Item className="text-primary">
                <FaCog className="me-2" /> Configuración
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
