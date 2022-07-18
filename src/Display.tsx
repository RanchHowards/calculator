export type DisplayProps = { currentValue: string };

export const Display: React.FC<DisplayProps> = ({ currentValue }) => {
  return <div className="display">{currentValue}</div>;
};
