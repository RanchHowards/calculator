import React from "react";
import { Operands, operations } from "./shared/Operands";

export type ButtonProps = {
  num:
    | {
        type: "digit" | "decimal" | "percentage" | "opposite" | "clear";
        value: string;
      }
    | {
        type: "operand";
        value: Operands;
      };
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
  currentValue: string;
  previousValue?: string;
  operation?: Operands;
  setPreviousValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOperation: React.Dispatch<React.SetStateAction<Operands | undefined>>;
  waitingForOperation: boolean;
  setWaitingForOperation: React.Dispatch<React.SetStateAction<boolean>>;
  hasDecimal: boolean;
  setHasDecimal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Button: React.FC<ButtonProps> = ({
  num,
  setCurrentValue,
  currentValue,
  setPreviousValue,
  previousValue,
  operation,
  setOperation,
  setWaitingForOperation,
  waitingForOperation,
  hasDecimal,
  setHasDecimal,
}) => {
  function clearAll() {
    setCurrentValue("0");
    setHasDecimal(false);
    setPreviousValue("0");
    setOperation(undefined);
    setWaitingForOperation(true);
  }

  function opposite() {
    if (waitingForOperation && currentValue !== "0") {
      if (currentValue.startsWith("-")) {
        setCurrentValue(currentValue.slice(1, currentValue.length));
      } else setCurrentValue("-".concat(currentValue));
    }
  }

  function percentage() {
    if (waitingForOperation && currentValue !== "0") {
      const computedValue = Number(currentValue) / 100;
      setCurrentValue(computedValue.toString());
    }
  }

  function addDecimal() {
    if (waitingForOperation && !hasDecimal) {
      if (currentValue === "0") {
        setCurrentValue("0.");
        setHasDecimal(true);
      } else {
        setCurrentValue(currentValue.concat("."));
        setHasDecimal(true);
      }
    }
  }

  const buttonClickHandler = () => {
    switch (num.type) {
      case "digit":
        if (waitingForOperation) {
          if (currentValue === "0") {
            setCurrentValue(num.value);
          } else setCurrentValue(currentValue.concat(num.value));
        } else if (!waitingForOperation) {
          setPreviousValue(currentValue);
          setCurrentValue(num.value);
          setWaitingForOperation(true);
        }
        break;

      case "operand":
        if (!operation) {
          setOperation(num.value);
        } else if (waitingForOperation) {
          const computedValue = operations[operation](
            Number(previousValue),
            Number(currentValue)
          ).toString();
          if (num.value === "=") {
            setCurrentValue(computedValue);
          } else {
            setOperation(num.value);
            setCurrentValue(computedValue);
          }
        } else if (num.value === "=") {
          const computedValue = operations[operation](
            Number(currentValue),
            Number(previousValue)
          ).toString();
          setCurrentValue(computedValue);
        } else {
          setOperation(num.value);
        }
        setWaitingForOperation(false);
        setHasDecimal(false);
        break;
      case "clear":
        clearAll();
        break;
      case "opposite":
        opposite();
        break;
      case "percentage":
        percentage();
        break;
      case "decimal":
        addDecimal();
        break;
      default:
        setCurrentValue("Calculator Error!");
    }
  };

  return (
    <div
      className={`button ${num.value === "0" ? "zero" : ""}`}
      onClick={buttonClickHandler}
    >
      {num.value}
    </div>
  );
};
