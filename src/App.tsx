import "./App.css";

import React, { useState } from "react";
import { Button } from "./Button";
import { Display } from "./Display";
import { Operands } from "./shared/Operands";

function App() {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string>();
  const [operation, setOperation] = useState<Operands>();
  const [waitingForOperation, setWaitingForOperation] = useState<boolean>(true);
  const [hasDecimal, setHasDecimal] = useState<boolean>(false);
  const digitsOptions = [
    { type: "digit", value: "1" },
    { type: "digit", value: "2" },
    { type: "digit", value: "3" },
    { type: "digit", value: "4" },
    { type: "digit", value: "5" },
    { type: "digit", value: "6" },
    { type: "digit", value: "7" },
    { type: "digit", value: "8" },
    { type: "digit", value: "9" },
    { type: "digit", value: "0" },
    { type: "decimal", value: "." },
  ] as const;

  const operandsOptions = [
    { type: "operand", value: "+" },
    { type: "operand", value: "-" },
    { type: "operand", value: "x" },
    { type: "operand", value: "÷" },
    { type: "operand", value: "=" },
  ] as const;

  const otherOptions = [
    { type: "clear", value: "AC" },
    { type: "opposite", value: "+/-" },
    { type: "percentage", value: "%" },
  ] as const;

  return (
    <div id="wrapper">
      <div id="App">
        <Display currentValue={currentValue} />
        <div className="button-container">
          {digitsOptions.map((num) => (
            <Button
              key={num.value}
              num={num}
              operation={operation}
              setOperation={setOperation}
              currentValue={currentValue}
              setPreviousValue={setPreviousValue}
              setCurrentValue={setCurrentValue}
              previousValue={previousValue}
              waitingForOperation={waitingForOperation}
              setWaitingForOperation={setWaitingForOperation}
              hasDecimal={hasDecimal}
              setHasDecimal={setHasDecimal}
            />
          ))}
        </div>
        <div className="operations-container">
          {operandsOptions.map((num) => (
            <Button
              key={num.value}
              num={num}
              operation={operation}
              setOperation={setOperation}
              currentValue={currentValue}
              setPreviousValue={setPreviousValue}
              setCurrentValue={setCurrentValue}
              previousValue={previousValue}
              waitingForOperation={waitingForOperation}
              setWaitingForOperation={setWaitingForOperation}
              hasDecimal={hasDecimal}
              setHasDecimal={setHasDecimal}
            />
          ))}
        </div>
        <div className="top-container">
          {otherOptions.map((num) => (
            <Button
              key={num.value}
              num={num}
              operation={operation}
              setOperation={setOperation}
              currentValue={currentValue}
              setPreviousValue={setPreviousValue}
              setCurrentValue={setCurrentValue}
              previousValue={previousValue}
              waitingForOperation={waitingForOperation}
              setWaitingForOperation={setWaitingForOperation}
              hasDecimal={hasDecimal}
              setHasDecimal={setHasDecimal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
