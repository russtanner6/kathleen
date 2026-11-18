type Props = {
  brand: string;
  copyright: string;
  signature?: string;
};

export default function Footer({ brand, copyright, signature }: Props) {
  return (
    <footer>
      <div className="footer-brand-stack">
        <div className="footer-brand">{brand}</div>
        {signature && <div className="footer-signature">{signature}</div>}
      </div>
      <div className="footer-copy">{copyright}</div>
    </footer>
  );
}
