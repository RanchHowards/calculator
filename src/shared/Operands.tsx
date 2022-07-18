import { ArrayElement } from "../utilities/ArrayElement";

const operands = ["+", "-", "x", "÷", "="] as const;

export type Operands = ArrayElement<typeof operands>;

export type Operation = (num1: number, num2: number) => number;

export const operations: Record<Operands, Operation> = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  x: (num1, num2) => num1 * num2,
  "÷": (num1, num2) => num1 / num2,
  "=": (num) => num,
};

export function isOperand(str: unknown): str is Operands {
  return (
    typeof str === "string" && (operands as readonly string[]).includes(str)
  );
}
