const categories = ['All', 'Tech fests', 'Cultural', 'Workshops', 'Sports', 'Free'];

function FilterSidebar({ active = 'All', onChange, sortLabel = 'Sort: Date, soonest' }) {
  return (
    <div style={{ display: 'flex', gap: 10, margin: '26px 0 22px', borderBottom: '1px solid var(--hairline)', paddingBottom: 18, flexWrap: 'wrap' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          className="btn-ghost btn"
          style={active === cat ? { background: 'var(--indigo)', color: '#fff', borderColor: 'var(--indigo)' } : {}}
          onClick={() => onChange?.(cat)}
        >
          {cat}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <select style={{ border: '1px solid var(--hairline)', padding: '0 14px', fontSize: 13.5, borderRadius: 8, background: 'var(--surface)', color: 'var(--slate)' }}>
        <option>{sortLabel}</option>
      </select>
    </div>
  );
}

export default FilterSidebar;
