import { Operands, isOperand, operations } from "./shared/Operands";

export type ButtonProps = {
  num:
    | {
        type: "digit";
        value: string;
      }
    | {
        type: "other";
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
}) => {
  const buttonClickHandler = () => {
    if (num.type === "digit") {
      if (waitingForOperation) {
        if (currentValue === "0") {
          setCurrentValue(num.value);
        } else setCurrentValue(currentValue.concat(num.value));
      } else if (!waitingForOperation) {
        setCurrentValue(num.value);
        setWaitingForOperation(true);
      }
    } else if (num.type === "operand") {
      if (!operation) {
        setOperation(num.value);
        setPreviousValue(currentValue);
        setWaitingForOperation(false);
      } else if (waitingForOperation) {
        const computedValue = operations[operation](
          Number(previousValue),
          Number(currentValue)
        ).toString();
        setPreviousValue(computedValue);
        setCurrentValue(computedValue);

        setWaitingForOperation(false);
        setOperation(num.value);
      } else {
        setOperation(num.value);
      }
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
