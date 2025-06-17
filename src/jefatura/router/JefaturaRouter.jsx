import { Routes, Route, Navigate } from "react-router-dom";
import JefaturaLayout from "./JefaturaLayout";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
// import Estudiantes from "../pages/Estudiantes";
import Asignaturas from "../pages/Asignaturas";
import CAcademica from "../pages/CAcademica";
import Reinscripciones from "../pages/Reinscripciones";
import ActApoyo from "../pages/ActApoyo";
import Asistencia from "../pages/Asistencia";

const JefaturaRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<JefaturaLayout />}>
        <Route index element={<Navigate to="inicio" replace />} />
        <Route path="inicio" element={<Dashboard />} />
        <Route path="perfil" element={<Perfil />} />
        {/* <Route path="estudiantes" element={<Estudiantes />} /> */}
        <Route path="asignaturas" element={<Asignaturas />} />
        <Route path="c_academica" element={<CAcademica />} />
        <Route path="reinscripciones" element={<Reinscripciones />} />
        <Route path="asistencia" element={<Asistencia />} />
        <Route path="act_apoyo" element={<ActApoyo />} />
      </Route>
    </Routes>
  );
};

export default JefaturaRouter;