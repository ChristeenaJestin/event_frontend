function Card({ children, style = {}, className = '', ...props }) {
  return (
    <div
      className={className}
      style={{
        border: '1px solid var(--hairline)',
        background: 'var(--surface)',
        borderRadius: '14px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
