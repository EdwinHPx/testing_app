// src/router/AdeSoftware.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRouter from "../auth/router/AuthRouter";
import JefaturaRouter from "../jefatura/router/JefaturaRouter";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas de Autenticación */}
      <Route path="/auth/*" element={<LoginRouter />} />
      
      {/* Rutas de Jefatura */}
      <Route path="/jefatura/*" element={<JefaturaRouter />} />
      
      {/* Redirección a Login */}
      <Route path="/" element={<Navigate to="/auth/iniciar-sesion" replace />} />
      
      {/* 404 */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};
export default AppRouter;