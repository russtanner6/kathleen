type Props = {
  brand: string;
  copyright: string;
  signature?: string;
  tagline?: string;
};

export default function Footer({ brand, copyright, signature, tagline }: Props) {
  return (
    <footer>
      <div className="footer-brand-stack">
        <div className="footer-brand">{brand}</div>
        {tagline && <div className="footer-tagline">{tagline}</div>}
        {signature && <div className="footer-signature">{signature}</div>}
      </div>
      <div className="footer-copy">{copyright}</div>
    </footer>
  );
}
