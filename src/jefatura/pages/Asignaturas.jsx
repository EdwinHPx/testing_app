import { useState, useMemo } from "react";
import { Table, Button, Card, Row, Col, Form, Badge, Pagination, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaBook, FaRegSadTear } from "react-icons/fa";
import { mockAsignaturas } from "../../data/Asignaturas";
import useTitulo from "../../hooks/DinamicTittle";
import '../style/Asignaturas.css';

// Componente principal para mostrar y gestionar asignaturas
const Asignaturas = () => {
  useTitulo("ADE | Asignaturas");

  // Estados
  const [asignaturas, setAsignaturas] = useState(mockAsignaturas);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showModal, setShowModal] = useState(false);
  const [newAsignatura, setNewAsignatura] = useState({
    name: '', code: '', semestre: '', ht: '', hp: '', creditos: ''
  });

  // Lógica filtrado
  const filteredAsignaturas = useMemo(() => {
    if (!searchTerm) return asignaturas;
    return asignaturas.filter(asig =>
      asig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asig.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [asignaturas, searchTerm]);

  const sortedAsignaturas = useMemo(() => {
    let sortableItems = [...filteredAsignaturas];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredAsignaturas, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAsignaturas = sortedAsignaturas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAsignaturas.length / itemsPerPage);
  
  const startEntry = sortedAsignaturas.length > 0 ? indexOfFirstItem + 1 : 0;
  const endEntry = Math.min(indexOfLastItem, sortedAsignaturas.length);
  const totalEntries = sortedAsignaturas.length;

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
    if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
    setSortConfig({ key, direction });
  };
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ms-1 text-muted" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ms-1 text-primary" />;
    return <FaSortDown className="ms-1 text-primary" />;
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleNewAsignaturaChange = (e) => {
    const { name, value } = e.target;
    setNewAsignatura(prev => ({ ...prev, [name]: value }));
  };
  const handleSaveAsignatura = () => {
    if (!newAsignatura.name || !newAsignatura.code || !newAsignatura.creditos) {
      alert('Por favor, completa los campos obligatorios: Nombre, Código y Créditos.');
      return;
    }
    setAsignaturas(prev => [...prev, { ...newAsignatura, id: Date.now() }]);
    handleCloseModal();
    setNewAsignatura({ name: '', code: '', semestre: '', ht: '', hp: '', creditos: '' });
  };

  return (
    <div className="asig-container">
      <Card className="asig-main-card">
        <Card.Body className="p-0">

          <div className="asig-component-header">
            <div className="asig-header-content">
              <div className="asig-header-icon">
                <FaBook />
              </div>
              <div>
                <h4 className="asig-header-title">Listado de Asignaturas</h4>
                <p className="asig-header-subtitle">
                  Visualiza, busca y gestiona todas las asignaturas del sistema.
                </p>
              </div>
            </div>
            <div className="asig-header-actions">
              <Button variant="primary" onClick={handleShowModal} className="asig-add-button">
                <FaPlus /> Nueva Asignatura
              </Button>
            </div>
          </div>

          <div className="asig-controls-bar">
            <InputGroup className="asig-search-bar">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control 
                placeholder="Buscar por nombre o código..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </InputGroup>
            <div className="asig-items-per-page">
              <span>Mostrar:</span>
              <Form.Select 
                size="sm" 
                className="asig-items-per-page-select" 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Form.Select>
            </div>
          </div>

          <div className="asig-table-container">
            <div className="asig-table-wrapper">
              <Table responsive className="asig-table">
                <thead className="asig-table-header">
                  <tr>
                    <th onClick={() => requestSort('id')} className="asig-sortable-header"># {getSortIcon('id')}</th>
                    <th onClick={() => requestSort('name')} className="text-start asig-sortable-header">Nombre {getSortIcon('name')}</th>
                    <th onClick={() => requestSort('code')} className="asig-sortable-header">Código {getSortIcon('code')}</th>
                    <th onClick={() => requestSort('semestre')} className="asig-sortable-header">Semestre {getSortIcon('semestre')}</th>
                    <th onClick={() => requestSort('ht')} className="asig-sortable-header">HT {getSortIcon('ht')}</th>
                    <th onClick={() => requestSort('hp')} className="asig-sortable-header">HP {getSortIcon('hp')}</th>
                    <th onClick={() => requestSort('creditos')} className="asig-sortable-header">Créditos {getSortIcon('creditos')}</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAsignaturas.length > 0 ? (
                    currentAsignaturas.map((asignatura) => (
                      <tr key={asignatura.id}>
                        <td>{asignatura.id}</td>
                        <td className="fw-medium text-start">{asignatura.name}</td>
                        <td><Badge bg="info">{asignatura.code}</Badge></td>
                        <td>{asignatura.semestre}</td>
                        <td>{asignatura.ht}</td>
                        <td>{asignatura.hp}</td>
                        <td className="fw-bold">{asignatura.creditos}</td>
                        <td className="asig-actions-cell">
                          <Button variant="outline-info" size="sm" title="Editar"><FaEdit /></Button>
                          <Button variant="outline-danger" size="sm" title="Eliminar"><FaTrash /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <div className="asig-no-results">
                          <FaRegSadTear className="asig-no-results-icon" />
                          <p>No se encontraron asignaturas que coincidan con la búsqueda.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>

        {sortedAsignaturas.length > 0 && (
          <Card.Footer className="asig-footer">
            <div className="asig-pagination-info">
              Mostrando {startEntry} a {endEntry} de {totalEntries} entradas
            </div>
            <Pagination className="asig-pagination">
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
        className="asig-modal"
        dialogClassName="asig-modal-dialog"
      >
        <div className="asig-modal-content modal-content">
          <Modal.Header closeButton className="asig-modal-header">
            <Modal.Title className="asig-modal-title">Agregar Nueva Asignatura</Modal.Title>
          </Modal.Header>
          <Modal.Body className="asig-modal-body">
            <Form>
              <div className="asig-form-section">
                <div className="asig-form-section-title">Información Básica</div>
                <Form.Group className="mb-4">
                  <Form.Label className="asig-form-label asig-required-field">Nombre de la Asignatura</Form.Label>
                  <Form.Control className="asig-form-control" type="text" name="name" value={newAsignatura.name} onChange={handleNewAsignaturaChange} placeholder="Ej: Programación Avanzada" required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="asig-form-label asig-required-field">Código</Form.Label>
                  <Form.Control className="asig-form-control" type="text" name="code" value={newAsignatura.code} onChange={handleNewAsignaturaChange} placeholder="Ej: SCD-1027" required />
                </Form.Group>
              </div>
              
              <div className="asig-form-section">
                <div className="asig-form-section-title">Detalles Académicos</div>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="asig-form-label">Semestre</Form.Label>
                      <Form.Control className="asig-form-control" type="number" name="semestre" value={newAsignatura.semestre} onChange={handleNewAsignaturaChange} placeholder="Ej: 3" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="asig-form-label asig-required-field">Créditos</Form.Label>
                      <Form.Control className="asig-form-control" type="number" name="creditos" value={newAsignatura.creditos} onChange={handleNewAsignaturaChange} placeholder="Ej: 4" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="asig-form-label">Horas Teóricas (HT)</Form.Label>
                      <Form.Control className="asig-form-control" type="number" name="ht" value={newAsignatura.ht} onChange={handleNewAsignaturaChange} placeholder="Ej: 2" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="asig-form-label">Horas Prácticas (HP)</Form.Label>
                      <Form.Control className="asig-form-control" type="number" name="hp" value={newAsignatura.hp} onChange={handleNewAsignaturaChange} placeholder="Ej: 2" />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className="asig-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="asig-modal-button-cancel">Cancelar</Button>
            <Button variant="primary" onClick={handleSaveAsignatura} className="asig-modal-button-save">Guardar Asignatura</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Asignaturas;