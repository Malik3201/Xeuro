// components/SEOHead.jsx
import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, image }) {
  const defaultTitle = 'Xeuro Sports — Premium Sportswear Manufacturer, Sialkot';
  const defaultDesc = 'B2B sportswear & hosiery manufacturer. Cut-to-pack, sublimation, embroidery, private labeling. MOQ 50 pcs. Sialkot, Pakistan.';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="keywords" content="sportswear manufacturer, hosiery, sublimation printing, Sialkot, Pakistan, bulk order, private label, teamwear" />
    </Helmet>
  );
}
