export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer R)[] ? R : never;
