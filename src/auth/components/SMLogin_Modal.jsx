import "@assets/css/modal_login.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DesarrolladoresModal = () => {
  const contributors = [
    { name: "Angel Daniel San Martin Gutierrez", image: "/assets/images/developers/desarrollador.png" },
    { name: "Angel Manuel Castillo Larios", image: "/assets/images/developers/desarrollador.png" },
    { name: "Carlos Alberto Santiago Andres", image: "/assets/images/developers/desarrolladora2.png" },
    { name: "Tereza Itzel Guzman Tellez", image: "/assets/images/developers/desarrolladora2.png" },
    { name: "Jeremy Roberto Moreno Chávez", image: "/assets/images/developers/desarrollador.png" },
    { name: "Luis Eduardo Aguirre Álvarez", image: "/assets/images/developers/desarrollador.png" },
    { name: "Marcial Francisco Nicolas", image: "/assets/images/developers/desarrollador.png" },
    { name: "Horacio Chavarría Lozano", image: "/assets/images/developers/desarrollador.png" },
    { name: "Erick Iván Fernández Salazar", image: "/assets/images/developers/desarrollador.png" },
    { name: "Uri Gamaliel Jiménez López", image: "/assets/images/developers/desarrollador.png" },
    { name: "Maurilio Alejandro Escamilla Gaona", image: "/assets/images/developers/desarrollador.png" },
    { name: "Ángel Adolfo Juárez Mundo", image: "/assets/images/developers/desarrollador.png" },
  ];

  return (
    <>
      {/* Imagen que abre el modal */}
      <img
        src="/assets/images/ade/software-master.gif"
        alt="Logo SoftwareMaster"
        className="dev-modal-trigger-img img-fluid mt-3" // Clase única
        data-bs-toggle="modal"
        data-bs-target="#desarrolladoresModal"
        title="Haz clic para ver los desarrolladores"
      />
      {/* Modal de Desarrolladores */}
      <div
        className="dev-modal modal fade" // Clase única
        id="desarrolladoresModal"
        tabIndex="-1"
        aria-labelledby="desarrolladoresModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="dev-modal-content modal-content">
            <div className="dev-modal-header modal-header">
              <h5 className="dev-modal-title modal-title" id="desarrolladoresModalLabel">
                Desarrolladores
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="dev-modal-body modal-body">
              {/* Líder del proyecto */}
              <div className="dev-modal-leader-section text-center mb-4">
                <h4>Centro de desarrollo</h4>
                <h5>Creamos y Construimos Futuros Programadores</h5>
                <img
                  src="/assets/images/ade/sofwaremaster.png"
                  alt="Software Master"
                  width="250px"
                  className="mb-2"
                />
                <h6>Líder del Proyecto</h6>
                <p className="mb-1">
                  M.C. Leslie Isabel Garcia Garcia
                </p>
                <img
                  src="/assets/images/developers/desarrolladora.png"
                  alt="Leslie Isabel Garcia Garcia"
                  className="img-fluid rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              {/* Accordion */}
              <div className="dev-modal-accordion accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      ADE React - Versión Alpha
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>Inicialización del proyecto:</strong> Primera
                        versión del sistema ADE utilizando React y una
                        arquitectura moderna.
                      </p>
                      <p>
                        <strong>Contribuidor:</strong> Edwin Ronnyel Hernandez
                        Peralta
                      </p>
                      <div className="text-center">
                        <img
                          src="/assets/images/developers/desarrollador2.png"
                          alt="Edwin Ronnyel Hernandez Peralta"
                          className="img-fluid rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Versiones Anteriores de ADE
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {/* ... Contenido ... */}
                      <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                          1280: { slidesPerView: 4 },
                        }}
                        className="dev-modal-swiper" // Clase para el carrusel
                      >
                        {contributors.map((contributor, index) => (
                          <SwiperSlide key={index} className="dev-modal-swiper-slide">
                            <div className="text-center">
                              <img
                                src={contributor.image}
                                alt={contributor.name}
                                className="img-fluid rounded-circle"
                                style={{ width: "80px", height: "80px" }}
                              />
                              <p className="mt-4 small">{contributor.name}</p>
                              <br />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dev-modal-footer modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesarrolladoresModal;