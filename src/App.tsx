import "./App.css";

import React, { useState } from "react";
import { Button } from "./Button";
import { Display } from "./Display";
import { Operands } from "../shared/Operands";

type Operation = (num1: number, num2: number) => number;

const operations: Record<Operands, Operation> = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  x: (num1, num2) => num1 * num2,
  "÷": (num1, num2) => num1 / num2,
  "=": (num1, num2) => num2,
};

function App() {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string>();
  const [operation, setOperation] = useState<Operands>();
  const [waitingForOperation, setWaitingForOperation] = useState<boolean>(true);
  return (
    <div id="wrapper">
      <div id="App">
        <Display currentValue={currentValue} />
        <div className="button-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ","].map((num) => (
            <Button
              key={num}
              num={num}
              operation={operation}
              setOperation={setOperation}
              currentValue={currentValue}
              setPreviousValue={setPreviousValue}
              setCurrentValue={setCurrentValue}
              previousValue={previousValue}
              waitingForOperation={waitingForOperation}
              setWaitingForOperation={setWaitingForOperation}
            />
          ))}
        </div>
        <div className="operations-container">
          {["+", "-", "x", "÷", "="].map((num) => (
            <Button
              key={num}
              num={num}
              operation={operation}
              setOperation={setOperation}
              currentValue={currentValue}
              setPreviousValue={setPreviousValue}
              setCurrentValue={setCurrentValue}
              previousValue={previousValue}
              waitingForOperation={waitingForOperation}
              setWaitingForOperation={setWaitingForOperation}
            />
          ))}
        </div>
        <div className="top-container">
          {["AC", "+/-", "%"].map((num) => (
            <Button
              key={num}
              num={num}
              operation={operation}
              setOperation={setOperation}
              currentValue={currentValue}
              setPreviousValue={setPreviousValue}
              setCurrentValue={setCurrentValue}
              previousValue={previousValue}
              waitingForOperation={waitingForOperation}
              setWaitingForOperation={setWaitingForOperation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
