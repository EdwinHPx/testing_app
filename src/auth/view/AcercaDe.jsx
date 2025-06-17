import { useState } from "react";
import "@assets/css/AcercaDe.css"; // Asegúrate de que este import sea correcto
import "@bostonstrap/css/bootstrap.min.css";

function AcercaDe() {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <img
        src="/assets/images/ade/info.png"
        alt="Acerca de"
        className="acerca-trigger-img" // Clase para la imagen que abre el modal
        onClick={openModal}
      />

      {/* Modal */}
      {show && (
        <div
          className="acerca-modal-backdrop fade show d-block" // Clase para el fondo del modal
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="acerca-modal-content modal-content">
              {/* Encabezado del Modal */}
              <div className="acerca-modal-header modal-header">
                <h5 className="acerca-modal-title modal-title">Acerca de</h5>
                <button
                  type="button"
                  className="acerca-modal-close-btn btn-close"
                  aria-label="Cerrar"
                  onClick={closeModal}
                ></button>
              </div>

              {/* Cuerpo del Modal */}
              <div className="acerca-modal-body modal-body">
                {/* He agrupado esta parte en un 'about-section' como en tu CSS */}
                <div className="acerca-section text-center mb-4">
                  <img
                    src="/assets/images/ade/adee.png"
                    alt="Administrador Escolar"
                    className="img-fluid"
                    style={{ maxWidth: "50px" }}
                  />
                  <h4>Administrador Escolar</h4>
                  <p className="text-muted">Version: 4.5.0</p>
                </div>

                {/* Desarrollador */}
                <div className="acerca-section mt-4">
                  <h6>Desarrollado por:</h6>
                  <div className="d-flex align-items-center">
                    <img
                      src="/assets/images/ade/sm.png"
                      alt="Desarrollador"
                      className="img-fluid me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <span>M.C. Leslie Isabel Garcia Garcia</span>
                  </div>
                </div>

                {/* Accordion */}
                <div className="acerca-accordion accordion mt-4" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed" // Bootstrap maneja esta clase, la dejamos
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAddons"
                        aria-expanded="false"
                        aria-controls="collapseAddons"
                      >
                        Add-ons Desarrollados
                      </button>
                    </h2>
                    <div
                      id="collapseAddons"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul className="acerca-addons-list list-unstyled">
                          <li>PDF Marker: Ver 2.0</li>
                          <li>Notify: Ver 2.1.0</li>
                          <li>ADE Secure: Ver 1.5.0</li>
                          <li>ADE Render: Ver 2.1</li>
                          <li>ADE Batch: Ver 1.0</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie del Modal */}
              <div className="acerca-modal-footer modal-footer">
                <button
                  type="button"
                  className="acerca-footer-close-btn btn btn-secondary"
                  onClick={closeModal}
                >
                  <i className="fa fa-times me-2"></i>Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AcercaDe;