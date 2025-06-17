import { createBrowserRouter, Navigate } from "react-router-dom";
import JefaturaLayout from "./JefaturaLayout";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
// import Estudiantes from "../pages/Estudiantes";
import Asignaturas from "../pages/Asignaturas";
import CAcademica from "../pages/CAcademica";
import Reinscripciones from "../pages/Reinscripciones";
import ActApoyo from "../pages/ActApoyo";
import Asistencia from "../pages/Asistencia";

const router = createBrowserRouter([
  {
    path: "/jefatura",
    element: <JefaturaLayout />,
    children: [
      { index: true, element: <Navigate to="inicio" replace /> },
      { path: "inicio", element: <Dashboard /> },
      { path: "perfil", element: <Perfil /> },
      // { path: "estudiantes", element: <Estudiantes /> },
      { path: "asignaturas", element: <Asignaturas /> },
      { path: "c_academica", element: <CAcademica /> },
      { path: "reinscripciones", element: <Reinscripciones /> },
      { path: "asistencia", element: <Asistencia /> },
      { path: "act_apoyo", element: <ActApoyo /> },
    ],
  },
]);

export default router;
