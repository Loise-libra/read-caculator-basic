import React from 'react';

// Componente reutilizable para cada botón
// Recibe:
// - onClick: la función a ejecutar cuando se hace clic
// - children: el texto o símbolo que mostrará el botón (ej: "7", "+")
// - className: para darle estilos especiales (ej: "operator", "wide")
const Button = ({ onClick, children, className = '' }) => {
  return (
    <button className={`btn ${className}`} onClick={() => onClick(children)}>
      {children}
    </button>
  );
};

export default Button;