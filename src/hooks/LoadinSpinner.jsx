import "@assets/css/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <img
        src="/assets/images/ade/ade-lg.gif"
        alt="Cargando..."
        className="loading-image"
      />
    </div>
  );
};

export default LoadingSpinner;