// status: confirmed | pending | draft | cancelled | free
function Badge({ status = 'draft', children }) {
  return <span className={`pill pill-${status}`}>{children}</span>;
}

export default Badge;