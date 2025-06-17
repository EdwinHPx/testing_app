import { useState, useMemo } from "react";
import {
  Table,
  Button,
  Card,
  Form,
  Pagination,
  InputGroup,
} from "react-bootstrap";
import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUserGraduate,
  FaRegSadTear,
  FaFilePdf,
} from "react-icons/fa";
import useTitulo from "../../hooks/DinamicTittle";
import { ReinscripcionesData } from "../../data/Reinscripciones";
import "../style/Reinscripciones.css";

const Reinscripciones = () => {
  useTitulo("ADE | Reinscripciones");

  // Estados
  const [reinscripciones] = useState(ReinscripcionesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "nombre",
    direction: "ascending",
  });

  // Lógica de filtrado y ordenamiento
  const filteredReinscripciones = useMemo(() => {
    if (!searchTerm) return reinscripciones;
    return reinscripciones.filter(
      (reins) =>
        reins.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reins.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reins.carrera.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reinscripciones, searchTerm]);

  const sortedReinscripciones = useMemo(() => {
    let sortableItems = [...filteredReinscripciones];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredReinscripciones, sortConfig]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReinscripciones = sortedReinscripciones.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedReinscripciones.length / itemsPerPage);

  const startEntry =
    sortedReinscripciones.length > 0 ? indexOfFirstItem + 1 : 0;
  const endEntry = Math.min(indexOfLastItem, sortedReinscripciones.length);
  const totalEntries = sortedReinscripciones.length;

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
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending")
      direction = "descending";
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <FaSort className="ms-1 text-muted" size={14} />;
    if (sortConfig.direction === "ascending")
      return <FaSortUp className="ms-1 text-primary" size={14} />;
    return <FaSortDown className="ms-1 text-primary" size={14} />;
  };

  // Función para renderizar el estado con la clase apropiada
  const renderEstado = (estado) => {
    let className = "reins-status-badge ";
    switch (estado.toLowerCase()) {
      case "reinscrito":
        className += "active";
        break;
      case "pendiente":
        className += "pending";
        break;
      default:
        className += "inactive";
    }
    return <span className={className}>{estado}</span>;
  };

  return (
    <div className="reins-container">
      <Card className="reins-main-card">
        <Card.Body className="p-0">
          {/* --- ENCABEZADO --- */}
          <div className="reins-component-header">
            <div className="reins-header-content">
              <div className="reins-header-icon">
                <FaUserGraduate />
              </div>
              <div>
                <h4 className="reins-header-title">Reinscripciones</h4>
                <p className="reins-header-subtitle">
                  Gestiona el proceso de reinscripción de los estudiantes por
                  periodo.
                </p>
              </div>
            </div>
          </div>

          {/* --- BARRA DE CONTROLES --- */}
          <div className="reins-controls-bar">
            <InputGroup className="reins-search-bar">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por nombre, matrícula o carrera..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
            <div className="reins-items-per-page">
              <span>Mostrar:</span>
              <Form.Select
                size="sm"
                className="reins-items-per-page-select"
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

          <div className="reins-table-container">
            <div className="reins-table-wrapper">
              <Table responsive className="reins-table">
                <thead className="reins-table-header">
                  <tr>
                    <th
                      onClick={() => requestSort("matricula")}
                      className="reins-sortable-header"
                    >
                      Matrícula {getSortIcon("matricula")}
                    </th>
                    <th
                      onClick={() => requestSort("nombre")}
                      className="text-start reins-sortable-header"
                    >
                      Nombre {getSortIcon("nombre")}
                    </th>
                    <th
                      onClick={() => requestSort("carrera")}
                      className="text-start reins-sortable-header"
                    >
                      Carrera {getSortIcon("carrera")}
                    </th>
                    <th
                      onClick={() => requestSort("semestre")}
                      className="reins-sortable-header"
                    >
                      Semestre {getSortIcon("semestre")}
                    </th>
                    <th
                      onClick={() => requestSort("periodo")}
                      className="reins-sortable-header"
                    >
                      Periodo {getSortIcon("periodo")}
                    </th>
                    <th
                      onClick={() => requestSort("estado")}
                      className="reins-sortable-header"
                    >
                      Estado {getSortIcon("estado")}
                    </th>
                    <th>Comprobante</th>
                    {/* <th>Acciones</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentReinscripciones.length > 0 ? (
                    currentReinscripciones.map((reinscripcion) => (
                      <tr key={reinscripcion.id}>
                        <td>{reinscripcion.matricula}</td>
                        <td className="fw-medium text-start">
                          {reinscripcion.nombre}
                        </td>
                        <td className="text-start">{reinscripcion.carrera}</td>
                        <td>{reinscripcion.semestre}</td>
                        <td>{reinscripcion.periodo}</td>
                        <td>{renderEstado(reinscripcion.estado)}</td>

                        {/* Celda para el botón PDF */}
                        <td className="reins-pdf-cell">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="reins-pdf-button"
                            title="Descargar comprobante"
                            disabled={
                              reinscripcion.estado.toLowerCase() !==
                              "reinscrito"
                            }
                          >
                            <FaFilePdf />
                          </Button>
                        </td>

                        {/* Celda para el botón Editar
                        <td className="reins-actions-cell">
                          <Button
                            variant="outline-info"
                            size="sm"
                            title="Editar"
                          >
                            <FaEdit />
                          </Button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <div className="reins-no-results">
                          <FaRegSadTear className="reins-no-results-icon" />
                          <p>
                            No se encontraron registros que coincidan con la
                            búsqueda.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>

        {sortedReinscripciones.length > 0 && (
          <Card.Footer className="reins-footer">
            <div className="reins-pagination-info">
              Mostrando {startEntry} a {endEntry} de {totalEntries} entradas
            </div>
            <Pagination className="reins-pagination">
              <Pagination.Prev
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              />
              <span className="page-info">{`Página ${currentPage} de ${totalPages}`}</span>
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default Reinscripciones;
