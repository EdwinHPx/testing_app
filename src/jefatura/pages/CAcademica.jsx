import { useState, useMemo } from 'react';
import { Table, Button, Card, Row, Col, Form, Pagination, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaFileUpload, FaRegSadTear, FaFilePdf, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import useTitulo from '../../hooks/DinamicTittle';
import { CAcademicaData } from '../../data/CAcademica';
import '../style/CAcademica.css';

const CargaAcademica = () => {
  useTitulo("ADE | Carga Académica");

  const [cargas, setCargas] = useState(CAcademicaData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'nombre', direction: 'ascending' });
  const [showModal, setShowModal] = useState(false);
  const [newCarga, setNewCarga] = useState({
    nombre: '',
    oficio: '',
    periodo: ''
  });

  const filteredCargas = useMemo(() => {
    if (!searchTerm) return cargas;
    return cargas.filter(carga =>
      carga.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carga.oficio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cargas, searchTerm]);

  const sortedCargas = useMemo(() => {
    let sortableItems = [...filteredCargas];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCargas, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCargas = sortedCargas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCargas.length / itemsPerPage);

  const startEntry = sortedCargas.length > 0 ? indexOfFirstItem + 1 : 0;
  const endEntry = Math.min(indexOfLastItem, sortedCargas.length);
  const totalEntries = sortedCargas.length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ms-1 text-muted" size={14} />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ms-1 text-primary" size={14} />;
    return <FaSortDown className="ms-1 text-primary" size={14} />;
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleNewCargaChange = (e) => {
    const { name, value } = e.target;
    setNewCarga(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveCarga = () => {
    if (!newCarga.nombre || !newCarga.periodo) {
      alert('Por favor, completa el nombre del docente y el periodo.');
      return;
    }
    const newEntry = {
      id: Date.now(),
      ...newCarga
    };
    setCargas(prev => [newEntry, ...prev]);
    handleCloseModal();
    setNewCarga({ nombre: '', oficio: '', periodo: '' });
  };

  return (
    <div className="carga-container">
      <Card className="carga-main-card">
        <Card.Body className="p-0">
          <div className="carga-component-header">
            <div className="carga-header-content">
              <div className="carga-header-icon">
                <FaFileUpload />
              </div>
              <div>
                <h4 className="carga-header-title">Cargas Académicas</h4>
                <p className="carga-header-subtitle">Gestiona las cargas académicas de los docentes por periodo.</p>
              </div>
            </div>
            <div className="carga-header-actions">
              <Button variant="primary" onClick={handleShowModal} className="carga-add-button">
                <FaPlus /> Nueva Carga
              </Button>
            </div>
          </div>

          <div className="carga-controls-bar">
            <InputGroup className="carga-search-bar">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                placeholder="Buscar por nombre u oficio..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
            <div className="carga-items-per-page">
              <span>Mostrar:</span>
              <Form.Select
                size="sm"
                className="carga-items-per-page-select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Form.Select>
            </div>
          </div>

          <div className="carga-table-container">
            <div className="carga-table-wrapper">
              <Table responsive className="carga-table">
                <thead className="carga-table-header">
                  <tr>
                    <th onClick={() => requestSort('nombre')} className="text-start carga-sortable-header">Nombre(s) {getSortIcon('nombre')}</th>
                    <th onClick={() => requestSort('oficio')} className="text-center carga-sortable-header">Oficio {getSortIcon('oficio')}</th>
                    <th onClick={() => requestSort('periodo')} className="text-center carga-sortable-header">Periodo de Asignación {getSortIcon('periodo')}</th>
                    <th className="text-center">PDF</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCargas.length > 0 ? (
                    currentCargas.map((carga) => (
                      <tr key={carga.id}>
                        <td className="fw-medium text-start">{carga.nombre}</td>
                        <td className="text-center">{carga.oficio || '-'}</td>
                        <td className="text-center">{carga.periodo}</td>
                        <td className="carga-pdf-cell">
                          <Button variant="outline-danger" size="sm" className="pdf-button" title="Ver PDF">
                            <FaFilePdf/>
                          </Button>
                        </td>
                        <td className="carga-actions-cell">
                          <Button variant="outline-info" size="sm" title="Editar"><FaEdit /></Button>
                          <Button variant="outline-danger" size="sm" title="Eliminar"><FaTrash /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className="carga-no-results">
                          <FaRegSadTear className="carga-no-results-icon" />
                          <p>No se encontraron cargas académicas que coincidan con la búsqueda.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>

        {sortedCargas.length > 0 && (
          <Card.Footer className="carga-footer">
            <div className="carga-pagination-info">
              Mostrando {startEntry} a {endEntry} de {totalEntries} entradas
            </div>
            <Pagination className="carga-pagination">
              <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
              <span className="page-info">{`Página ${currentPage} de ${totalPages}`}</span>
              <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
          </Card.Footer>
        )}
      </Card>
      
      {/* Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        className="carga-modal"
        dialogClassName="carga-modal-dialog"
      >
        <div className="modal-content carga-modal-content">
          <Modal.Header closeButton className="carga-modal-header">
            <Modal.Title className="carga-modal-title">Nueva Carga Académica</Modal.Title>
          </Modal.Header>
          <Modal.Body className="carga-modal-body">
            <Form>
              <div className="carga-form-section">
                <div className="carga-form-section-title">
                  <FaFileAlt /> Información del Docente
                </div>
                <Form.Group className="mb-3">
                  <Form.Label className="carga-form-label carga-required-field">Nombre del Docente</Form.Label>
                  <Form.Control 
                    className="carga-form-control" 
                    type="text" 
                    name="nombre" 
                    value={newCarga.nombre} 
                    onChange={handleNewCargaChange} 
                    placeholder="Nombre completo del docente" 
                  />
                </Form.Group>
              </div>
              
              <div className="carga-form-section">
                <div className="carga-form-section-title">
                  <FaCalendarAlt /> Detalles de Asignación
                </div>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="carga-form-label">No. de Oficio</Form.Label>
                      <Form.Control 
                        className="carga-form-control" 
                        type="text" 
                        name="oficio" 
                        value={newCarga.oficio} 
                        onChange={handleNewCargaChange} 
                        placeholder="Ej: JDSIC/001/2025" 
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="carga-form-label carga-required-field">Periodo de Asignación</Form.Label>
                      <Form.Control 
                        className="carga-form-control" 
                        type="text" 
                        name="periodo" 
                        value={newCarga.periodo} 
                        onChange={handleNewCargaChange} 
                        placeholder="Ej: ENERO - JUNIO 2025" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className="carga-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="carga-modal-button-cancel">
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveCarga} className="carga-modal-button-save">
              Guardar Carga
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default CargaAcademica;