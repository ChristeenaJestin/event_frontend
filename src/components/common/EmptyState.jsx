function EmptyState({ message }) {
  return (
    <div className="text-center py-10 text-gray-500" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--slate)' }}>
      {message}
    </div>
  );
}

export default EmptyState;
