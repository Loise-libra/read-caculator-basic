import { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleButtonClick = (value) => {
    // Lógica para números
    if (!isNaN(value)) {
      setCurrentValue(currentValue === "0" ? value : currentValue + value);
      return;
    }

    // Lógica para el punto decimal
    if (value === ".") {
      if (!currentValue.includes(".")) {
        setCurrentValue(currentValue + ".");
      }
      return;
    }

    // Lógica para operadores principales
    if (["+", "-", "×", "÷"].includes(value)) {
      if (previousValue) {
        // Si ya hay una operación pendiente, la resolvemos primero
        const result = calculate();
        setPreviousValue(result);
        setCurrentValue("0");
      } else {
        setPreviousValue(currentValue);
        setCurrentValue("0");
      }
      setOperator(value);
      return;
    }

    // Lógica para el signo igual
    if (value === "=") {
      if (operator && previousValue) {
        setCurrentValue(calculate());
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
        break;
      case "+/-": // Cambiar signo
        setCurrentValue((parseFloat(currentValue) * -1).toString());
        break;
      case "%": // Porcentaje
        setCurrentValue((parseFloat(currentValue) / 100).toString());
        break;
      case "√": // Raíz cuadrada
        setCurrentValue(Math.sqrt(parseFloat(currentValue)).toString());
        break;
    }
  };

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
        if (current === 0) return "Error"; // Manejo de división por cero
        result = prev / current;
        break;
      default:
        return current.toString();
    }
    return result.toString();
  };

  return (
    <div className="calculator">
      <Display value={currentValue} />
      <div className="buttons-grid">
        <Button onClick={handleButtonClick} className="special">{currentValue !== "0" ? "C" : "AC"}</Button>
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
        
        {/* Puedes añadir más botones para funciones avanzadas aquí */}
        {/* <Button onClick={handleButtonClick} className="special">√</Button> */}
      </div>
    </div>
  );
}

export default App;