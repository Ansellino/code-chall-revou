import { useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";
import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";

export default function CatalogPage() {
  const { categories, subCategories, brands, products } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedCategory = searchParams.get("category") ?? "";
  const selectedSubcategory = searchParams.get("subcategory") ?? "";
  const selectedBrand = searchParams.get("brand") ?? "";

  const filteredSubcategories = subCategories.filter(
    (item) => item.categoryId === selectedCategory
  );
  const filteredBrands = brands.filter(
    (item) => item.subCategoryId === selectedSubcategory
  );

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((item) => [item.id, item])),
    [categories]
  );
  const subCategoryMap = useMemo(
    () => Object.fromEntries(subCategories.map((item) => [item.id, item])),
    [subCategories]
  );
  const brandMap = useMemo(
    () => Object.fromEntries(brands.map((item) => [item.id, item])),
    [brands]
  );

  const filteredProducts = products.filter((product) => {
    if (selectedBrand) {
      return product.brandId === selectedBrand;
    }
    if (selectedSubcategory) {
      const brandIds = filteredBrands.map((item) => item.id);
      return brandIds.includes(product.brandId);
    }
    if (selectedCategory) {
      const subIds = filteredSubcategories.map((item) => item.id);
      const brandIds = brands
        .filter((item) => subIds.includes(item.subCategoryId))
        .map((item) => item.id);
      return brandIds.includes(product.brandId);
    }
    return true;
  });

  const updateParams = (next) => {
    const nextParams = new URLSearchParams();
    if (next.category) nextParams.set("category", next.category);
    if (next.subcategory) nextParams.set("subcategory", next.subcategory);
    if (next.brand) nextParams.set("brand", next.brand);
    setSearchParams(nextParams);
  };

  const handleCategoryChange = (categoryId) => {
    updateParams({ category: categoryId, subcategory: "", brand: "" });
  };

  const handleSubcategoryChange = (subcategoryId) => {
    updateParams({
      category: selectedCategory,
      subcategory: subcategoryId,
      brand: "",
    });
  };

  const handleBrandChange = (brandId) => {
    updateParams({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      brand: brandId,
    });
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  const activeFilterCount = [selectedCategory, selectedSubcategory, selectedBrand].filter(
    Boolean
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-6 space-y-3 lg:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
            Product Catalog
          </p>
          <Breadcrumb
            category={categoryMap[selectedCategory]?.name ?? ""}
            subcategory={subCategoryMap[selectedSubcategory]?.name ?? ""}
            brand={brandMap[selectedBrand]?.name ?? ""}
          />
        </header>

        <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{filteredProducts.length}</span> produk tampil
          </p>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
          >
            Filter
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/35 p-4 lg:hidden">
            <div className="ml-auto h-full w-full max-w-sm overflow-auto rounded-2xl bg-white p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Filter Produk</h2>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                >
                  Tutup
                </button>
              </div>
              <FilterPanel
                categories={categories}
                subCategories={filteredSubcategories}
                brands={filteredBrands}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                selectedBrand={selectedBrand}
                onCategoryChange={handleCategoryChange}
                onSubcategoryChange={handleSubcategoryChange}
                onBrandChange={handleBrandChange}
                onReset={handleReset}
              />
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
              >
                Terapkan
              </button>
            </div>
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="hidden lg:block">
            <FilterPanel
              categories={categories}
              subCategories={filteredSubcategories}
              brands={filteredBrands}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              selectedBrand={selectedBrand}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
              onBrandChange={handleBrandChange}
              onReset={handleReset}
            />
          </div>

          <ProductGrid products={filteredProducts} brandsById={brandMap} />
        </section>
      </div>
    </main>
  );
}
