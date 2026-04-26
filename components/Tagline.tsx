type Props = {
  text: string;
};

export default function Tagline({ text }: Props) {
  if (!text) return null;
  return (
    <div className="page-tagline reveal">
      <span>{text}</span>
    </div>
  );
}
