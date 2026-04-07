const baseSegments = ["Home", "Catalog"];

export default function Breadcrumb({ category, subcategory, brand }) {
  const segments = [...baseSegments];

  if (category) {
    segments.push(category);
  }
  if (subcategory) {
    segments.push(subcategory);
  }
  if (brand) {
    segments.push(brand);
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li key={`${segment}-${index}`} className="flex items-center gap-2">
              {index !== 0 && <span className="text-slate-300">/</span>}
              <span className={isLast ? "font-medium text-slate-900" : ""}>{segment}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
