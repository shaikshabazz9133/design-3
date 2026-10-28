type Props = { lat: number; lon: number; label: string; className?: string };

/** OpenStreetMap embed: no API key, lazy-loaded, with a link out for directions. */
export function MapEmbed({ lat, lon, label, className }: Props) {
  const d = 0.006;
  const bbox = [lon - d * 1.8, lat - d, lon + d * 1.8, lat + d].join(",");
  return (
    <iframe
      title={`Map showing ${label}`}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
      loading="lazy"
      className={`h-full w-full border-0 ${className ?? ""}`}
    />
  );
}

export function directionsHref(lat: number, lon: number) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
}
