export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HCI Berlin Audit Labs",
    "description": "Hospitality material science and procurement auditing.",
    "url": "https://hci-berlin.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Berlin", "addressCountry": "DE" }
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
    />
  );
}