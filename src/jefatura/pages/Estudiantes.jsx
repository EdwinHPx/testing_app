import { useState, useMemo } from "react";
import { Table, Button, Card, Row, Col, Form, Badge, Pagination, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaGraduationCap, FaRegSadTear, FaUser, FaIdCard } from "react-icons/fa";
import { EstudiantesData } from "../../data/Estudiantes"; // Ruta actualizada
import useTitulo from "../../hooks/DinamicTittle";
import '../style/Estudiantes.css';

const Estudiantes = () => {
  useTitulo("ADE | Estudiantes");

  // Estados
  const [students, setStudents] = useState(EstudiantesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'No_Control', direction: 'ascending' });
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    Nombre: '', Ap_Paterno: '', Ap_Materno: '', No_Control: ''
  });

  // Lógica filtrado
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(student =>
      student.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.Ap_Paterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.Ap_Materno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.No_Control.toString().includes(searchTerm)
    );
  }, [students, searchTerm]);

  const sortedStudents = useMemo(() => {
    let sortableItems = [...filteredStudents];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredStudents, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  
  const startEntry = sortedStudents.length > 0 ? indexOfFirstItem + 1 : 0;
  const endEntry = Math.min(indexOfLastItem, sortedStudents.length);
  const totalEntries = sortedStudents.length;

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
    if (sortConfig.key !== key) return <FaSort className="ms-1 text-muted" size={14} />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ms-1 text-primary" size={14} />;
    return <FaSortDown className="ms-1 text-primary" size={14} />;
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };
  const handleSaveStudent = () => {
    if (!newStudent.Nombre || !newStudent.Ap_Paterno || !newStudent.No_Control) {
      alert('Por favor, completa los campos obligatorios: Nombre, Apellido Paterno y Matrícula.');
      return;
    }
    setStudents(prev => [...prev, { ...newStudent }]);
    handleCloseModal();
    setNewStudent({ Nombre: '', Ap_Paterno: '', Ap_Materno: '', No_Control: '' });
  };

  return (
    <div className="stud-container">
      <Card className="stud-main-card">
        <Card.Body className="p-0">
          {/* --- ENCABEZADO --- */}
          <div className="stud-component-header">
            <div className="stud-header-content">
              <div className="stud-header-icon">
                <FaGraduationCap />
              </div>
              <div>
                <h4 className="stud-header-title">Listado de Estudiantes</h4>
                <p className="stud-header-subtitle">
                  Visualiza, busca y gestiona todos los estudiantes del sistema.
                </p>
              </div>
            </div>
            <div className="stud-header-actions">
              <Button variant="primary" onClick={handleShowModal} className="stud-add-button">
                <FaPlus /> Nuevo Estudiante
              </Button>
            </div>
          </div>
          
          {/* --- BARRA DE CONTROLES --- */}
          <div className="stud-controls-bar">
            <InputGroup className="stud-search-bar">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control 
                placeholder="Buscar por nombre, apellido o matrícula..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </InputGroup>
            <div className="stud-items-per-page">
              <span>Mostrar:</span>
              <Form.Select 
                size="sm" 
                className="stud-items-per-page-select" 
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

          <div className="stud-table-container">
            <div className="stud-table-wrapper">
              <Table responsive className="stud-table">
                <thead className="stud-table-header">
                  <tr>
                    <th onClick={() => requestSort('No_Control')} className="stud-sortable-header"> Matrícula {getSortIcon('No_Control')}</th>
                    <th onClick={() => requestSort('Nombre')} className="stud-sortable-header"> Nombre {getSortIcon('Nombre')}</th>
                    <th onClick={() => requestSort('Ap_Paterno')} className="stud-sortable-header"> Ap. Paterno {getSortIcon('Ap_Paterno')}</th>
                    <th onClick={() => requestSort('Ap_Materno')} className="stud-sortable-header"> Ap. Materno {getSortIcon('Ap_Materno')}</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <tr key={student.No_Control}>
                        <td><Badge bg="info">{student.No_Control}</Badge></td>
                        <td className="fw-medium">{student.Nombre}</td>
                        <td className="fw-medium">{student.Ap_Paterno}</td>
                        <td className="fw-medium">{student.Ap_Materno}</td>
                        <td className="stud-actions-cell">
                          <Button variant="outline-info" size="sm" title="Editar"><FaEdit /></Button>
                          <Button variant="outline-danger" size="sm" title="Eliminar"><FaTrash /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className="stud-no-results">
                          <FaRegSadTear className="stud-no-results-icon" />
                          <p>No se encontraron estudiantes que coincidan con la búsqueda.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>        
        {sortedStudents.length > 0 && (
          <Card.Footer className="stud-footer">
            <div className="stud-pagination-info">
              Mostrando {startEntry} a {endEntry} de {totalEntries} entradas
            </div>
            <Pagination className="stud-pagination">
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
        className="stud-modal"
        dialogClassName="stud-modal-dialog"
      >
        <div className="stud-modal-content modal-content">
          <Modal.Header closeButton className="stud-modal-header">
            <Modal.Title className="stud-modal-title">Agregar Nuevo Estudiante</Modal.Title>
          </Modal.Header>
          <Modal.Body className="stud-modal-body">
            <Form>
              <div className="stud-form-section">
                <div className="stud-form-section-title">
                  <FaUser /> Información Personal
                </div>
                <Form.Group className="mb-4">
                  <Form.Label className="stud-form-label stud-required-field">Nombre(s)</Form.Label>
                  <Form.Control 
                    className="stud-form-control" 
                    type="text" 
                    name="Nombre" 
                    value={newStudent.Nombre} 
                    onChange={handleNewStudentChange} 
                    placeholder="Ej: Edwin Ronnyel" 
                    required 
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="stud-form-label stud-required-field">Apellido Paterno</Form.Label>
                      <Form.Control 
                        className="stud-form-control" 
                        type="text" 
                        name="Ap_Paterno" 
                        value={newStudent.Ap_Paterno} 
                        onChange={handleNewStudentChange} 
                        placeholder="Ej: Hernández" 
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="stud-form-label">Apellido Materno</Form.Label>
                      <Form.Control 
                        className="stud-form-control" 
                        type="text" 
                        name="Ap_Materno" 
                        value={newStudent.Ap_Materno} 
                        onChange={handleNewStudentChange} 
                        placeholder="Ej: Peralta"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              
              <div className="stud-form-section">
                <div className="stud-form-section-title">
                  <FaIdCard /> Información Académica
                </div>
                <Form.Group className="mb-4">
                  <Form.Label className="stud-form-label stud-required-field">Matrícula</Form.Label>
                  <Form.Control 
                    className="stud-form-control" 
                    type="number" 
                    name="No_Control" 
                    value={newStudent.No_Control} 
                    onChange={handleNewStudentChange} 
                    placeholder="Ej: 21VC0063" 
                    required 
                  />
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className="stud-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="stud-modal-button-cancel">
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveStudent} className="stud-modal-button-save">
              Guardar Estudiante
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Estudiantes;