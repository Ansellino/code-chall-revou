function formatIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductGrid({ products, brandsById }) {
  if (products.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Produk tidak ditemukan</h2>
        <p>Coba ubah filter kategori, subkategori, atau brand.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Daftar Produk</h2>
        <p className="text-sm text-slate-500">{products.length} item</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {brandsById[product.brandId]?.name ?? "Unknown brand"}
            </div>
            <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-slate-600 sm:text-base">
              {formatIDR(product.price)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
