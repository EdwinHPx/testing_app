import { useState, useMemo } from "react";
import { Table, Button, Card, Form, Pagination, InputGroup } from "react-bootstrap";
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaListAlt, FaRegSadTear, FaFilePdf } from "react-icons/fa";
import useTitulo from "../../hooks/DinamicTittle";
import { AsistenciaData } from "../../data/Asistencia";
import '../style/Asistencia.css';

const Asistencia = () => {
  useTitulo("ADE | Listas de Asistencia");

  // Estados
  const [listas] = useState(AsistenciaData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'materia', direction: 'ascending' });

  // Lógica de filtrado y ordenamiento
  const filteredListas = useMemo(() => {
    if (!searchTerm) return listas;
    return listas.filter(lista =>
      lista.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lista.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lista.clave.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lista.carrera.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [listas, searchTerm]);

  const sortedListas = useMemo(() => {
    let sortableItems = [...filteredListas];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredListas, sortConfig]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListas = sortedListas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedListas.length / itemsPerPage);
  
  const startEntry = sortedListas.length > 0 ? indexOfFirstItem + 1 : 0;
  const endEntry = Math.min(indexOfLastItem, sortedListas.length);
  const totalEntries = sortedListas.length;

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
    if (sortConfig.key !== key) return <FaSort className="ms-1 text-muted" size={14} />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ms-1 text-primary" size={14} />;
    return <FaSortDown className="ms-1 text-primary" size={14} />;
  };

  return (
    <div className="asis-container">
      <Card className="asis-main-card">
        <Card.Body className="p-0">
          {/* --- ENCABEZADO --- */}
          <div className="asis-component-header">
            <div className="asis-header-content">
              <div className="asis-header-icon">
                <FaListAlt />
              </div>
              <div>
                <h4 className="asis-header-title">Listas de Asistencia</h4>
                <p className="asis-header-subtitle">
                  Visualiza y descarga las listas de asistencia para cada asignatura.
                </p>
              </div>
            </div>
          </div>
          
          {/* --- BARRA DE CONTROLES --- */}
          <div className="asis-controls-bar">
            <InputGroup className="asis-search-bar">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control 
                placeholder="Buscar por materia, docente, carrera..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </InputGroup>
            <div className="asis-items-per-page">
              <span>Mostrar:</span>
              <Form.Select 
                size="sm" 
                className="asis-items-per-page-select" 
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

          <div className="asis-table-container">
            <div className="asis-table-wrapper">
              <Table responsive className="asis-table">
                <thead className="asis-table-header">
                  <tr>
                    <th onClick={() => requestSort('clave')} className="asis-sortable-header">Clave {getSortIcon('clave')}</th>
                    <th onClick={() => requestSort('materia')} className="text-start asis-sortable-header">Materia {getSortIcon('materia')}</th>
                    <th onClick={() => requestSort('docente')} className="text-start asis-sortable-header">Docente {getSortIcon('docente')}</th>
                    <th onClick={() => requestSort('grupo')} className="asis-sortable-header">Grupo {getSortIcon('grupo')}</th>
                    <th onClick={() => requestSort('alumnos')} className="asis-sortable-header">No. Alumnos {getSortIcon('alumnos')}</th>
                    <th onClick={() => requestSort('carrera')} className="text-start asis-sortable-header">Carrera {getSortIcon('carrera')}</th>
                    <th onClick={() => requestSort('periodo')} className="asis-sortable-header">Período {getSortIcon('periodo')}</th>
                    <th>Descargar</th>
                  </tr>
                </thead>
                <tbody>
                  {currentListas.length > 0 ? (
                    currentListas.map((lista) => (
                      <tr key={lista.id}>
                        <td>{lista.clave}</td>
                        <td className="fw-medium text-start">{lista.materia}</td>
                        <td className="text-start">{lista.docente}</td>
                        <td>{lista.grupo}</td>
                        <td>{lista.alumnos}</td>
                        <td className="text-start">{lista.carrera}</td>
                        <td>{lista.periodo}</td>
                        <td className="asis-pdf-cell">
                          <Button variant="outline-danger" size="sm" className="asis-pdf-button" title="Descargar PDF">
                            <FaFilePdf />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <div className="asis-no-results">
                          <FaRegSadTear className="asis-no-results-icon" />
                          <p>No se encontraron listas que coincidan con la búsqueda.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>

        {sortedListas.length > 0 && (
          <Card.Footer className="asis-footer">
            <div className="asis-pagination-info">
              Mostrando {startEntry} a {endEntry} de {totalEntries} entradas
            </div>
            <Pagination className="asis-pagination">
              <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
              <span className="page-info">{`Página ${currentPage} de ${totalPages}`}</span>
              <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default Asistencia;