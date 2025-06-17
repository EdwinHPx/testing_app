import { Routes, Route, Navigate } from "react-router-dom";
import ViewLogin from "../view/Ade_Login";
import ViewForgotPwd from "../view/Ade_Forget";
import MetaTags from "../components/login_head";

const LoginRouter = () => {
  return (
    <>
      <MetaTags />
      <Routes>
        {/* Login */}
        <Route path="iniciar-sesion" element={<ViewLogin />} />

        {/* Redirección de "/" hacia "/iniciar-sesion" */}
        <Route path="/" element={<Navigate to="iniciar-sesion" replace />} />

        {/* Recuperar contraseña */}
        <Route path="recuperar-contrasena" element={<ViewForgotPwd />} />

        {/* Si quieres que /Ade_Forget redirija a /recuperar-contrasena */}
        <Route path="Ade_Forget" element={<Navigate to="recuperar-contrasena" replace />} />

      </Routes>
    </>
  );
};

export default LoginRouter;
