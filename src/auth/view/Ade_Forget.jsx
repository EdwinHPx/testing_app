import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importar Framer Motion
import "@assets/css/style_login.css";
import DesarrolladoresModal from "../components/SMLogin_Modal";
import useTitulo from "../../hooks/DinamicTittle"; //PARA TITULOS DINAMICOS


function ViewForgetPwd() {

  // TITULO DINAMICO:
  useTitulo("ADE | Recuperar contraseña");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRecover = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@itsvc\\.edu\\.mx$/;
    if (emailRegex.test(email)) {
      setMessage("Se ha enviado un enlace de recuperación a tu correo.");
    } else {
      setError("Por favor, ingresa un correo institucional válido.");
    }
  };

  return (
    <motion.div
      className="login-container d-flex flex-column justify-content-center align-items-center vh-100 fondo-shadow"
      initial={{ opacity: 0, x: 50 }} // Estado inicial (entra desde la derecha)
      animate={{ opacity: 1, x: 0 }} // Estado final (fade-in)
      exit={{ opacity: 0, x: -50 }} // Estado al desmontarse (fade-out hacia la izquierda)
      transition={{ duration: 0.5 }}
    >
      <div className="login-card card p-4 shadow-lg">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img
            id="loginpage"
            src="/assets/images/forgotpwd/forgotpwd.png"
            className="img-fluid login-logo"
            alt="Logo ADE"
            title="ADE SOFTWARE"
          />
        </div>
        <h2 className="text-center mb-3 login-text">Recuperar Contraseña</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form id="recoverForm" onSubmit={handleRecover}>
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
          <button
            style={{ marginTop: "10px" }}
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 mb-3 login-btn"
          >
            Recuperar Contraseña
          </button>
          <button
            className="btn btn-outline-secondary w-100 rounded-pill py-2"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
          <p className="text-center text-muted mt-4 mb-0 ade-text">
            ADE REACT v-ALPHA
          </p>
        </form>
      </div>
      <DesarrolladoresModal />
    </motion.div>
  );
}

export default ViewForgetPwd;
