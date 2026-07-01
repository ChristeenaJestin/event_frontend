function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <input className="field-input" {...props} />
    </div>
  );
}

export default Input;