import { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUserCog } from 'react-icons/fa'; // Icono más apropiado para el perfil
import { PerfilData } from '../../data/Perfil'; 
import { Estados } from '../../data/Estados';
import useTitulo from '../../hooks/DinamicTittle';
import '../style/Perfil.css';

const Perfil = () => {
  useTitulo("ADE | Mi Perfil");

  // Estado para almacenar los datos del perfil
  const [profileData, setProfileData] = useState(PerfilData[0]);

  // Manejador para actualizar el estado cuando un campo cambia
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    console.log("Datos actualizados:", profileData);
    alert("¡Datos actualizados con éxito! (simulación)");
  };

  return (
    <div className="perfil-container">
      {/* Tarjeta principal que envuelve todo el contenido */}
      <Card className="perfil-main-card">
        <div className="perfil-component-header">
          <div className="perfil-header-content">
            <div className="perfil-header-icon">
              <FaUserCog />
            </div>
            <div>
              <h4 className="perfil-header-title">Mi Perfil</h4>
              <p className="perfil-header-subtitle">Gestiona tu información personal, de contacto y seguridad.</p>
            </div>
          </div>
        </div>

        {/* El contenido de los formularios */}
        <Card.Body>
          <Row>
            {/* Columna Izquierda: Mi Perfil */}
            <Col md={5}>
              <Card className="perfil-section-card">
                <Card.Header>Mi Perfil</Card.Header>
                <Card.Body>
                  <div className="perfil-display-name">{profileData.nombre}</div>
                  <Form>
                    <Form.Group className="mb-3" controlId="correo">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control type="email" value={profileData.correo} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="area">
                      <Form.Label>Area</Form.Label>
                      <Form.Control type="text" value={profileData.area} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nivelEstudios">
                      <Form.Label>Nivel de Estudios</Form.Label>
                      <Form.Control type="text" name="nivelEstudios" value={profileData.nivelEstudios} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rfc">
                      <Form.Label>RFC</Form.Label>
                      <Form.Control type="text" name="rfc" value={profileData.rfc} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="curp">
                      <Form.Label>CURP</Form.Label>
                      <Form.Control type="text" name="curp" value={profileData.curp} onChange={handleChange} />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Columna Derecha: Datos Domiciliarios */}
            <Col md={7}>
              <Card className="perfil-section-card">
                <Card.Header>Datos Domiciliarios</Card.Header>
                <Card.Body>
                  <Form>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group controlId="entidadFederativa">
                          <Form.Label>Entidad federativa</Form.Label>
                          <Form.Select name="entidadFederativa" value={profileData.entidadFederativa} onChange={handleChange}>
                            {Estados.map((estado, index) => (
                              <option key={index} value={estado}>
                                {estado}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="municipio">
                          <Form.Label>Municipio</Form.Label>
                          <Form.Control type="text" name="municipio" value={profileData.municipio} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="colonia">
                          <Form.Label>Colonia</Form.Label>
                          <Form.Control type="text" name="colonia" value={profileData.colonia} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="calle">
                      <Form.Label>Calle</Form.Label>
                      <Form.Control type="text" name="calle" value={profileData.calle} onChange={handleChange} />
                    </Form.Group>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="numInterior">
                          <Form.Label>N° Interior</Form.Label>
                          <Form.Control type="text" name="numInterior" value={profileData.numInterior} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="numExterior">
                          <Form.Label>N° Exterior</Form.Label>
                          <Form.Control type="text" name="numExterior" value={profileData.numExterior} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="telefono">
                          <Form.Label>Teléfono</Form.Label>
                          <Form.Control type="tel" name="telefono" value={profileData.telefono} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="codigoPostal">
                          <Form.Label>Código Postal</Form.Label>
                          <Form.Control type="text" name="codigoPostal" value={profileData.codigoPostal} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="text-end mt-4">
                      <Button variant="primary" className="perfil-update-button" onClick={handleUpdate}>
                        Actualizar datos
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Perfil;