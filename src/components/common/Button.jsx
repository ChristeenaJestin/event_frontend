function Button({ children, variant = 'primary', icon, className = '', ...props }) {
  const variantClass =
    variant === 'secondary' ? 'btn-secondary' :
    variant === 'ghost' ? 'btn-ghost' :
    variant === 'coral' ? 'btn-coral' : '';

  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
}

export default Button;
