import { Link } from "react-router-dom";

const ViewLogin = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {/* Tarjeta de login */}
      <div className="card shadow login-card">
        {/* Logo */}
        <div className="text-center mt-4">
          <Link to="/">
            <img
              src="/assets/images/ade/logo-bl.png"
              alt="loginpage"
              className="img-fluid login-logo"
            />
          </Link>
        </div>

        {/* Formulario */}
        <form id="adeForm" className="p-4">
          {/* Campo de correo institucional */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold text-muted">
              Correo Institucional
            </label>
            <input
              type="email"
              className="form-control form-input"
              id="email"
              placeholder="usuario@itsvc.edu.mx"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold text-muted">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control form-input"
              id="password"
              placeholder="*********"
              required
            />
          </div>

          {/* Enlace de recuperación de contraseña */}
          <div className="text-end mb-3">
            <Link to="/recuperar-contrasena" className="text-decoration-none text-primary fw-bold">
              Olvidé mi Contraseña
            </Link>
          </div>

          {/* Botón de acceso */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 mb-3 login-btn"
          >
            Acceder <i className="fa fa-arrow-right ms-2"></i>
          </button>

          {/* Botón de "Acerca de" */}
          <div className="mb-2">
            <Link to="/acerca-de" className="text-decoration-none">
              <button
                type="button"
                className="btn btn-outline-secondary w-100 rounded-pill py-2 d-flex align-items-center justify-content-center"
              >
                Acerca de
                <img
                  src="/assets/images/ade/info.png"
                  alt="info"
                  className="ms-2"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </Link>
          </div>

          {/* Botón de "Desarrolladores" */}
          <div>
            <Link to="/desarrolladores" className="text-decoration-none">
              <button
                type="button"
                className="btn btn-dark w-100 rounded-pill py-2 d-flex align-items-center justify-content-center"
              >
                Desarrolladores
                <img
                  src="/assets/images/ade/info.png"
                  alt="info"
                  className="ms-2"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </Link>
          </div>

          {/* Versión del sistema */}
          <p className="text-center text-muted mt-4 mb-0">ADE V4.5.0</p>
        </form>
      </div>
    </div>
  );
};

export default ViewLogin;