import { useEffect } from "react";

const useTitulo = (titulo) => {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
};

export default useTitulo;
