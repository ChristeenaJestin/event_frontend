function Select({ label, children, ...props }) {
  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <select className="field-input" style={{ color: 'var(--slate)' }} {...props}>
        {children}
      </select>
    </div>
  );
}

export default Select;