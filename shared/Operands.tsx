import { ArrayElement } from "../utilities/ArrayElement";

const operands = ["+", "-", "x", "÷", "="] as const;

export type Operands = ArrayElement<typeof operands>;

export function isOperand(str: unknown): str is Operands {
  return (
    typeof str === "string" && (operands as readonly string[]).includes(str)
  );
}
