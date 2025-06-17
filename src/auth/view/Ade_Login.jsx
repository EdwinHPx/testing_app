import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import DesarrolladoresModal from "../components/SMLogin_Modal";
import "@assets/css/style_login.css";
import "@assets/css/modal_login.css";
import useTitulo from "../../hooks/DinamicTittle";

function ViewLogin() {
  useTitulo("ADE | Iniciar sesión");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === "sistemas@example.com" && password === "isic1234") {
      navigate("/jefatura/"); 
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <motion.div
      className="login-container d-flex flex-column justify-content-center align-items-center vh-100 fondo-shadow"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-card card p-4 shadow-lg">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img
            id="loginpage"
            src="/assets/images/ade/logo-bl.png"
            className="img-fluid login-logo"
            alt="Logo ADE"
            title="ADE SOFTWARE"
          />
        </div>

        <h2 className="text-center mb-3 login-text">Iniciar Sesión</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form id="adeForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo institucional:</label>
            <input
              type="email"
              id="email"
              className="form-control form-input"
              placeholder="usuario@itsvc.edu.mx"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="form-control form-input"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link
            to="../recuperar-contrasena" 
            className="text-decoration-none text-primary fw-bold"
          >
            Olvidé mi Contraseña
          </Link>

          <button
            style={{ marginTop: "10px" }}
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 mb-3 login-btn"
          >
            Ingresar <i className="fa fa-arrow-right ms-2"></i>
          </button>

          <p className="text-center text-muted mt-4 mb-0 ade-text">
            ADE REACT v-ALPHA
          </p>
        </form>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
        <DesarrolladoresModal />
      </div>
    </motion.div>
  );
}

export default ViewLogin;
