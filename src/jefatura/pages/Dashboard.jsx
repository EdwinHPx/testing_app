import { Card, Row, Col, Tabs, Tab } from "react-bootstrap";
import { FaHome, FaInfoCircle, FaUsers } from "react-icons/fa";
import useTitulo from "../../hooks/DinamicTittle";
import logoAdeLarge from '../../assets/images/ade/logo2.png';
import adelg from '../../assets/images/ade/ade-lg.gif';
import logoAdeSm from '../../assets/images/ade/sofwaremaster.png';
import sm from '../../assets/images/ade/sm.png';
import imgDev1 from '@assets/images/developers/desarrollador.png';
import imgDev2 from '@assets/images/developers/desarrolladora2.jpg';
import imgDevPrincipal from '@assets/images/developers/desarrollador1.jpg'
import imgMC from '@assets/images/developers/desarrolladora.png';
import "./Dashboard.css";


const contributors = [
  { name: "Angel Daniel San Martin Gutierrez", image: imgDev1 },
  { name: "Angel Manuel Castillo Larios", image: imgDev1 },
  { name: "Carlos Alberto Santiago Andres", image: imgDev1 },
  { name: "Tereza Itzel Guzman Tellez", image: imgDev2 },
];

const projectLeader = {
  name: "M.C. Leslie Isabel Garcia Garcia",
  image: imgMC 
};

const mainDeveloperReact = {
    name: "Edwin Ronnyel Hernandez Peralta",
    image: imgDevPrincipal, 
    role: "Encargado del FrontEnd (React)"
};

const Dashboard = () => {
  useTitulo("ADE | Inicio");

  return (
    <div className="dashboard-container py-4">
      <Card className="dashboard-main-card">
        <div className="dashboard-component-header">
          <div className="dashboard-header-content">
            <div className="dashboard-header-icon">
              <FaHome />
            </div>
            <div>
              <h4 className="dashboard-header-title">Bienvenido al Panel ADE</h4>
              <p className="dashboard-header-subtitle">
                Sistema de Administración y Dirección Escolar.
              </p>
            </div>
          </div>
        </div>
 
        <Card.Body className="dashboard-tabs-container">
          <Tabs defaultActiveKey="welcome" id="dashboard-tabs" className="mb-3 dashboard-nav-tabs">
            <Tab eventKey="welcome" title="Bienvenida">
              <div className="dashboard-welcome-body">
                <Row className="align-items-center">
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <img src={adelg} alt="Logo ISIC" className="dashboard-logo img-fluid" />
                  </Col>
                  <Col md={8} className="text-md-start">
                    <h2 className="dashboard-welcome-title">Explora los Módulos del Sistema</h2>
                    <p className="dashboard-welcome-text">
                      Este panel de control te permite acceder a diversas funcionalidades para la gestión académica y administrativa. A continuación, se describen brevemente los principales módulos disponibles:
                    </p>
                    <ul className="dashboard-module-list">
                      <li><strong>Mi Perfil:</strong> Gestiona tu información personal, datos de contacto y configuraciones de seguridad.</li>
                      <li><strong>Estudiantes:</strong> Administra la información de los alumnos, inscripciones, y seguimiento académico.</li>
                      <li><strong>Reinscripciones:</strong> Gestiona el proceso de reinscripción de los estudiantes por periodo.</li>
                      <li><strong>Asignaturas:</strong> Visualiza, busca y gestiona todas las asignaturas del sistema.</li>
                      <li><strong>Listas de Asistencia:</strong> Accede y descarga las listas de asistencia para cada asignatura.</li>
                      <li><strong>Carga Académica:</strong> Gestiona las cargas académicas de los docentes por periodo.</li>
                      <li><strong>Actividades de Apoyo:</strong> Administra las actividades complementarias para los docentes.</li>
                    </ul>
                    <p className="dashboard-welcome-text">
                      Utiliza el menú de navegación lateral para acceder rápidamente a cada uno de estos módulos y optimizar la gestión académica y administrativa de la institución.
                    </p>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey="about" title={<span><FaInfoCircle className="me-2" />Acerca de</span>}>
              <div className="dashboard-about-section p-4">
                <Row className="justify-content-center mb-4 align-items-center">
                  <Col md={5} xs={12} className="text-center text-md-end pe-md-3">
                    <img src={logoAdeLarge} alt="ADE Logo" className="dashboard-ade-logo slide-in-left" />
                  </Col>
                  <Col xs="auto" className="d-none d-md-block">
                    <div className="dashboard-logo-divider fade-in-delayed"></div>
                  </Col>
                  <Col md={5} xs={12} className="text-center text-md-start ps-md-3">
                    <img src={sm} alt="ADE GIF" className="dashboard-ade-logo slide-in-right" />
                  </Col>
                </Row>
                <Row className="justify-content-center mb-4">
                  <Col md={10} xs={12} className="text-center">
                    <h3 className="dashboard-about-title fade-in-up">Administrador Escolar (ADE)</h3>
                    <p className="dashboard-about-text fade-in-up">
                      <strong>Versión:</strong> ADE React - ALPHA<br />
                      ADE es un sistema diseñado para facilitar la administración y dirección escolar,
                      migrado a React para ofrecer una experiencia de usuario moderna, mejor rendimiento y mantenibilidad.
                    </p>
                  </Col>
                </Row>

                <hr className="my-4 fade-in-delayed" />

                <h4 className="dashboard-section-title text-center mb-4 fade-in-up">
                  <FaUsers className="me-2" />Equipo de Desarrollo
                </h4>
                
                <div className="text-center mb-4">
                  <h5 className="dashboard-leader-title fade-in-up">Líder del Proyecto</h5>
                  <img src={projectLeader.image} alt={projectLeader.name} className="dashboard-dev-img rounded-circle mb-2 scale-in" />
                  <p className="dashboard-dev-name fade-in-up">{projectLeader.name}</p>
                  <img src={logoAdeSm} alt="Software Master Logo" className="dashboard-sm-logo mt-2 fade-in-up" />
                  <p className="dashboard-sm-text fade-in-up">Centro de desarrollo: Creamos y Construimos Futuros Programadores</p>
                </div>
                
                <Row className="justify-content-center mb-4">
                    <Col md={8} className="text-center">
                        <h5 className="dashboard-contributors-title mb-3 fade-in-up">Contribuidor Principal (Versión React)</h5>
                        <img 
                            src={mainDeveloperReact.image} 
                            alt={mainDeveloperReact.name} 
                            className="dashboard-dev-img rounded-circle mb-2 scale-in" 
                        />
                        <p className="dashboard-dev-name fade-in-up">{mainDeveloperReact.name}</p>
                        <p className="dashboard-dev-role fade-in-up">{mainDeveloperReact.role}</p>
                    </Col>
                </Row>

                <h5 className="dashboard-contributors-title text-center mt-4 mb-3 fade-in-up">Contribuidores (Versiones Anteriores)</h5>
                <Row className="g-3 justify-content-center">
                  {contributors.map((contributor, index) => (
                    <Col key={index} lg={2} md={3} sm={4} xs={6} className="text-center mb-3 staggered-fade-in">
                      <img src={contributor.image} alt={contributor.name} className="dashboard-dev-img-small rounded-circle mb-1" />
                      <p className="dashboard-dev-name-small">{contributor.name}</p>
                    </Col>
                  ))}
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
