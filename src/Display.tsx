export type DisplayProps = { currentValue: string };

export const Display: React.FC<DisplayProps> = ({ currentValue }) => {
  const roundedValue = (
    Math.round(Number(currentValue) * 100000) / 100000
  ).toString();
  const displayValue = roundedValue.length > 7 ? "WOWZERS" : roundedValue;
  return <div className="display">{displayValue}</div>;
};
