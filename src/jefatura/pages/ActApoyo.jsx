import { useState, useMemo } from "react";
import { Table, Button, Card, Form, Pagination, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaClipboardList, FaRegSadTear, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useTitulo from "../../hooks/DinamicTittle";
import { ActividadesDeApoyoData } from "../../data/ActApoyo";
import '../style/ActApoyo.css';

// Componente principal para mostrar y gestionar Actividades de Apoyo
const ActApoyo = () => {
  useTitulo("ADE | Actividades de Apoyo");

  // Estados
  const [actividades, setActividades] = useState(ActividadesDeApoyoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showModal, setShowModal] = useState(false);
  const [newActividad, setNewActividad] = useState({ name: '' });

  // Lógica de filtrado y ordenamiento
  const filteredActividades = useMemo(() => {
    if (!searchTerm) return actividades;
    return actividades.filter(act =>
      act.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [actividades, searchTerm]);

  const sortedActividades = useMemo(() => {
    let sortableItems = [...filteredActividades];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.direction === 'ascending' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        } else {
          if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredActividades, sortConfig]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActividades = sortedActividades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedActividades.length / itemsPerPage);
  
  const startEntry = sortedActividades.length > 0 ? indexOfFirstItem + 1 : 0;
  const endEntry = Math.min(indexOfLastItem, sortedActividades.length);
  const totalEntries = sortedActividades.length;

  // Manejadores de eventos
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
  const handleNewActividadChange = (e) => {
    const { name, value } = e.target;
    setNewActividad(prev => ({ ...prev, [name]: value }));
  };
  const handleSaveActividad = () => {
    if (!newActividad.name.trim()) { // Añadido .trim()
      alert('Por favor, ingresa el nombre de la actividad.');
      return;
    }
    const newId = actividades.length > 0 ? Math.max(...actividades.map(a => a.id)) + 1 : 1;
    setActividades(prev => [...prev, { ...newActividad, id: newId }]);
    handleCloseModal();
    setNewActividad({ name: '' });
  };

  return (
    <div className="act-container">
      <Card className="act-main-card">
        <Card.Body className="p-0">

          <div className="act-component-header">
            <div className="act-header-content">
              <div className="act-header-icon">
                <FaClipboardList />
              </div>
              <div> 
                <h4 className="act-header-title">Actividades de Apoyo</h4>
                <p className="act-header-subtitle">
                  Administra las actividades de apoyo para los docentes.
                </p>
              </div>
            </div>
            <div className="act-header-actions">
              <Button variant="primary" onClick={handleShowModal} className="act-add-button">
                <FaPlus /> Nuevo Registro
              </Button>
            </div>
          </div>

          <div className="act-controls-bar">
            <InputGroup className="act-search-bar">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control 
                placeholder="Buscar por nombre de actividad..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </InputGroup>
            <div className="act-items-per-page">
              <span>Mostrar:</span>
              <Form.Select 
                size="sm" 
                className="act-items-per-page-select" 
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

          <div className="act-table-container">
            <div className="act-table-wrapper">
              <Table responsive className="act-table">
                <thead className="act-table-header">
                  <tr>
                    <th onClick={() => requestSort('name')} className="text-start act-sortable-header">Actividad de apoyo {getSortIcon('name')}</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentActividades.length > 0 ? (
                    currentActividades.map((actividad) => (
                      <tr key={actividad.id}>
                        {/* <td>{actividad.id}</td> */}
                        <td className="fw-medium text-start">{actividad.name}</td>
                        <td className="act-actions-cell">
                          <Button variant="outline-info" size="sm" title="Editar"><FaEdit /></Button>
                          <Button variant="outline-danger" size="sm" title="Eliminar"><FaTrash /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}> {/* Ajustar colSpan si se añade la columna ID */}
                        <div className="act-no-results">
                          <FaRegSadTear className="act-no-results-icon" />
                          <p>No se encontraron actividades que coincidan con la búsqueda.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>

        {sortedActividades.length > 0 && (
          <Card.Footer className="act-footer">
            <div className="act-pagination-info">
              Mostrando {startEntry} a {endEntry} de {totalEntries} entradas
            </div>
            <Pagination className="act-pagination">
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
        className="act-modal"
        dialogClassName="act-modal-dialog" 
      >
        <div className="modal-content act-modal-content">
          <Modal.Header closeButton className="act-modal-header">
            <Modal.Title className="act-modal-title">Nueva Actividad de Apoyo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="act-modal-body">
            <Form>
                <Form.Group className="mb-3"> 
                  <Form.Label className="act-form-label act-required-field">Nombre de la actividad</Form.Label>
                  <Form.Control 
                    className="act-form-control"
                    type="text" 
                    name="name" 
                    value={newActividad.name} 
                    onChange={handleNewActividadChange} 
                    placeholder="Ej: Asesoría Académica" 
                    required 
                  />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="act-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="act-modal-button-cancel">Cancelar</Button>
            <Button variant="primary" onClick={handleSaveActividad} className="act-modal-button-save">Guardar Actividad</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default ActApoyo;