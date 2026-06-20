"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputDigit = (digit) => {
    if (waitingForNewValue) {
      setDisplay(String(digit));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearAll = () => { setDisplay("0"); setPrevValue(null); setOperator(null); setWaitingForNewValue(false); };
  const clearEntry = () => { setDisplay("0"); };
  const inputPercent = () => { setDisplay(String(parseFloat(display) / 100)); };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const performOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && prevValue !== null) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const memoryAdd = () => setMemory(memory + parseFloat(display));
  const memorySub = () => setMemory(memory - parseFloat(display));
  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForNewValue(true);
  };

  const numBtn = { border: "none", borderRadius: "16px", fontSize: "18px", fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 0 rgba(0,0,0,0.12)", background: "#f7a8c0", color: "#fff", };
  const opBtn = { border: "none", borderRadius: "16px", fontSize: "18px", fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 0 rgba(0,0,0,0.12)", background: "#fce8ef", color: "#d4527e", };
  const funcBtn = { border: "none", borderRadius: "16px", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 0 rgba(0,0,0,0.12)", background: "#fce8ef", color: "#d4527e", };
  const onacBtn = { border: "none", borderRadius: "16px", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 0 rgba(0,0,0,0.12)", background: "#f06ea0", color: "#fff", };
  const equalsBtn = { border: "none", borderRadius: "16px", fontSize: "18px", fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 0 rgba(0,0,0,0.12)", background: "#f8c2d4", color: "#a23a5e", };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#fdf2f6", padding: "2rem", }} >
      <div style={{ width: "340px", background: "linear-gradient(180deg, #ffd9e6 0%, #ffc2d8 100%)", borderRadius: "28px", padding: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", }} >
        <div style={{ background: "#dce6dc", borderRadius: "14px", padding: "14px 16px", marginBottom: "16px", }} >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#5a6b5a", marginBottom: "4px", fontWeight: 600, }} >
            <span>{memory !== 0 ? "M" : ""}</span>
            <span style={{ letterSpacing: "1px" }}>Hasil Perhitungan</span>
          </div>
          <div style={{ textAlign: "right", fontSize: "34px", fontWeight: 700, color: "#2c2c2c", fontFamily: "monospace", overflow: "hidden", whiteSpace: "nowrap", }} > {display} </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", }} >
          <button onClick={memoryAdd} style={funcBtn}>M+</button>
          <button onClick={memorySub} style={funcBtn}>M-</button>
          <button onClick={memoryRecall} style={funcBtn}>MRC</button>
          <button onClick={() => {}} style={funcBtn}>GT</button>
          <button onClick={clearEntry} style={onacBtn}>CE</button>

          <button onClick={clearAll} style={onacBtn}>ON/AC</button>
          <button onClick={() => performOperator("÷")} style={opBtn}>÷</button>
          <button onClick={() => performOperator("×")} style={opBtn}>×</button>
          <button onClick={inputPercent} style={opBtn}>%</button>
          <button onClick={() => {}} style={funcBtn}>MU</button>

          <button onClick={() => inputDigit(7)} style={numBtn}>7</button>
          <button onClick={() => inputDigit(8)} style={numBtn}>8</button>
          <button onClick={() => inputDigit(9)} style={numBtn}>9</button>
          <button onClick={() => performOperator("-")} style={opBtn}>-</button>
          <button onClick={() => performOperator("+")} style={{ ...opBtn, gridRow: "span 2" }} > + </button>

          <button onClick={() => inputDigit(4)} style={numBtn}>4</button>
          <button onClick={() => inputDigit(5)} style={numBtn}>5</button>
          <button onClick={() => inputDigit(6)} style={numBtn}>6</button>

          <button onClick={() => inputDigit(1)} style={numBtn}>1</button>
          <button onClick={() => inputDigit(2)} style={numBtn}>2</button>
          <button onClick={() => inputDigit(3)} style={numBtn}>3</button>
          <button onClick={handleEquals} style={{ ...equalsBtn, gridRow: "span 2" }}> = </button>

          <button onClick={() => inputDigit(0)} style={{ ...numBtn, gridColumn: "span 2" }} > 0 </button>
          <button onClick={() => { inputDigit(0); inputDigit(0); }} style={numBtn} > 00 </button>
          <button onClick={inputDot} style={numBtn}>.</button>
        </div>
      </div>
    </div>
  );
}