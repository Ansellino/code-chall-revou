function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterPanel({
  categories,
  subCategories,
  brands,
  selectedCategory,
  selectedSubcategory,
  selectedBrand,
  onCategoryChange,
  onSubcategoryChange,
  onBrandChange,
  onReset,
}) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filter</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <SelectField
          id="category"
          label="Category"
          value={selectedCategory}
          options={categories}
          onChange={onCategoryChange}
          placeholder="Semua kategori"
        />

        <SelectField
          id="subcategory"
          label="Subcategory"
          value={selectedSubcategory}
          options={subCategories}
          onChange={onSubcategoryChange}
          placeholder={selectedCategory ? "Pilih subkategori" : "Pilih kategori dulu"}
          disabled={!selectedCategory}
        />

        <SelectField
          id="brand"
          label="Brand"
          value={selectedBrand}
          options={brands}
          onChange={onBrandChange}
          placeholder={selectedSubcategory ? "Pilih brand" : "Pilih subkategori dulu"}
          disabled={!selectedSubcategory}
        />
      </div>
    </aside>
  );
}
