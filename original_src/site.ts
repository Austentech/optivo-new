export const SITE = {
  name: "Optivo Solutions",
  tagline: "Digital Marketing That Drives Real Growth",
  email: "info@optivo.in",
  phones: ["+91 7481837663", "+91 9205024047", "+91 7061632097"],
  whatsapp: "917481837663",
  address: {
    line1: "House No 14, Ramnagri Ashiana Road",
    line2: "Sector 4, Ashiana Nagar Phase 1",
    line3: "Khajpura - 800025",
  },
  hours: "Mon – Sat · 10:00 AM – 7:00 PM",
  rating: 4.9,
  mapsQuery:
    "Optivo Solutions, House No 14, Ramnagri Ashiana Road, Sector 4, Ashiana Nagar Phase 1, Khajpura, Patna, Bihar 800025",
};

export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    msg ?? "Hello Optivo Solutions, I want to know more about your digital marketing services."
  )}`;

export const callLink = (n = SITE.phones[0]) => `tel:${n.replace(/\s/g, "")}`;

export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  SITE.mapsQuery
)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;
