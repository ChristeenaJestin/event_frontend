function Loader({ label = 'Loading…' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '60px 0', color: 'var(--slate)' }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '3px solid var(--hairline)',
          borderTopColor: 'var(--indigo)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ fontSize: 13.5 }}>{label}</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default Loader;