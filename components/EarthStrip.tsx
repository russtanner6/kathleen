type Props = {
  elements: { icon: string; label: string }[];
};

export default function EarthStrip({ elements }: Props) {
  return (
    <div className="earth-strip">
      {elements.map((el) => (
        <div className="earth-el" key={el.label}>
          <span className="earth-el-icon">{el.icon}</span>
          <span className="earth-el-label">{el.label}</span>
        </div>
      ))}
    </div>
  );
}
