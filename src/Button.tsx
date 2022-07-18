import { Operands, isOperand, operations } from "./shared/Operands";

export type ButtonProps = {
  num: number | Operands | string;
  setCurrentValue?: React.Dispatch<React.SetStateAction<string>>;
  currentValue?: string;
  previousValue?: string;
  operation?: Operands;
  setPreviousValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOperation?: React.Dispatch<React.SetStateAction<Operands | undefined>>;
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
    if (
      typeof num === "number" &&
      setCurrentValue &&
      setPreviousValue &&
      currentValue
    ) {
      if (waitingForOperation) {
        if (currentValue === "0") {
          setCurrentValue(num.toString());
        } else setCurrentValue(currentValue.concat(num.toString()));
      } else if (!waitingForOperation) {
        setCurrentValue(num.toString());
        setWaitingForOperation(true);
      }
    } else if (
      isOperand(num) &&
      setOperation &&
      setPreviousValue &&
      currentValue
    ) {
      console.log(previousValue, setCurrentValue);
      if (!operation) {
        setOperation(num);
        setPreviousValue(currentValue);
        setWaitingForOperation(false);
      } else if (previousValue && setCurrentValue) {
        if (waitingForOperation) {
          const computedValue = operations[operation](
            Number(previousValue),
            Number(currentValue)
          ).toString();
          setPreviousValue(computedValue);
          setCurrentValue(computedValue);

          setWaitingForOperation(false);
          setOperation(num);
        } else {
          setOperation(num);
        }
      }
    }
  };

  return (
    <div
      className={`button ${num === 0 ? "zero" : ""}`}
      onClick={buttonClickHandler}
    >
      {num}
    </div>
  );
};
