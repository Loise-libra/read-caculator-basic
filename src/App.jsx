// src/App.jsx

import { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [displayValue, setDisplayValue] = useState("0");

  // ===============================================================
  // ===== INICIO DEL CÓDIGO ACTUALIZADO ===========================
  // ===============================================================
  const handleButtonClick = (value) => {
    // Lógica para números
    if (!isNaN(value)) {
      if (displayValue === "0") {
        setDisplayValue(value);
      } else {
        setDisplayValue(displayValue + value);
      }
      setCurrentValue(currentValue === "0" ? value : currentValue + value);
      return;
    }

    // Lógica para el punto decimal
    if (value === ".") {
      if (!currentValue.includes(".")) {
        setCurrentValue(currentValue + ".");
        setDisplayValue(displayValue + ".");
      }
      return;
    }

    if (["+", "-", "×", "÷"].includes(value)) {
      if (previousValue) {
        const result = calculate();
        setPreviousValue(result);
        setDisplayValue(result + value);
      } else {
        setPreviousValue(currentValue);
        setDisplayValue(displayValue + value);
      }
      setCurrentValue("0");
      setOperator(value);
      return;
    }

    // Lógica para el signo igual
    if (value === "=") {
      if (operator && previousValue) {
        const result = calculate();
        setDisplayValue(result);
        setCurrentValue(result);
        setPreviousValue(null);
        setOperator(null);
      }
      return;
    }

    // Lógica para funciones especiales
    switch (value) {
      case "AC": // All Clear
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
        setDisplayValue("0");
        break;

      // --- ¡NUEVA LÓGICA PARA +/-! ---
      case "+/-":
        if (currentValue === "0") return; // No hacer nada si es 0

        const negatedValue = (parseFloat(currentValue) * -1).toString();
        setCurrentValue(negatedValue);

        if (operator && previousValue) {
          // Si estamos modificando el segundo número (ej: 12+15)
          // Quitamos el valor anterior (15) y ponemos el nuevo (-15)
          const displayPrefix = displayValue.substring(0, displayValue.length - currentValue.length);
          setDisplayValue(displayPrefix + negatedValue);
        } else {
          // Si estamos modificando el primer número
          setDisplayValue(negatedValue);
        }
        break;

      // --- ¡NUEVA LÓGICA PARA %! ---
      case "%":
        if (currentValue === "0") return; // No hacer nada si es 0

        // Se calcula el porcentaje del valor actual (ej: 50 -> 0.5)
        const percentageValue = (parseFloat(currentValue) / 100).toString();
        setCurrentValue(percentageValue);

        if (operator && previousValue) {
          // Si estamos modificando el segundo número (ej: 12+50 -> 12+0.5)
          const displayPrefix = displayValue.substring(0, displayValue.length - currentValue.length);
          setDisplayValue(displayPrefix + percentageValue);
        } else {
          // Si estamos modificando el primer número
          setDisplayValue(percentageValue);
        }
        break;
    }
  };
  // ===============================================================
  // ===== FIN DEL CÓDIGO ACTUALIZADO ==============================
  // ===============================================================


  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return "0";

    let result;
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) return "Error";
        result = prev / current;
        break;
      default:
        return current.toString();
    }
    return result.toString();
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons-grid">
        <Button onClick={handleButtonClick} className="special">AC</Button>
        <Button onClick={handleButtonClick} className="special">+/-</Button>
        <Button onClick={handleButtonClick} className="special">%</Button>
        <Button onClick={handleButtonClick} className="operator">÷</Button>

        <Button onClick={handleButtonClick}>7</Button>
        <Button onClick={handleButtonClick}>8</Button>
        <Button onClick={handleButtonClick}>9</Button>
        <Button onClick={handleButtonClick} className="operator">×</Button>
        
        <Button onClick={handleButtonClick}>4</Button>
        <Button onClick={handleButtonClick}>5</Button>
        <Button onClick={handleButtonClick}>6</Button>
        <Button onClick={handleButtonClick} className="operator">-</Button>

        <Button onClick={handleButtonClick}>1</Button>
        <Button onClick={handleButtonClick}>2</Button>
        <Button onClick={handleButtonClick}>3</Button>
        <Button onClick={handleButtonClick} className="operator">+</Button>

        <Button onClick={handleButtonClick} className="wide">0</Button>
        <Button onClick={handleButtonClick}>.</Button>
        <Button onClick={handleButtonClick} className="operator">=</Button>
      </div>
    </div>
  );
}

export default App;