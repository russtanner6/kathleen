type Props = {
  brand: string;
  copyright: string;
};

export default function Footer({ brand, copyright }: Props) {
  return (
    <footer>
      <div className="footer-brand">{brand}</div>
      <div className="footer-copy">{copyright}</div>
    </footer>
  );
}
