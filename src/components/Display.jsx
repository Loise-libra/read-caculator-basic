import React from 'react';

// Componente para la pantalla de la calculadora
// Recibe el valor a mostrar como una 'prop'
const Display = ({ value }) => {
  return (
    <div className="display">
      {value}
    </div>
  );
};

export default Display;