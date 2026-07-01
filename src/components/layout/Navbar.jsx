import { SearchIcon, BellIcon } from '../common/Icons';
import useAuth from '../../hooks/useAuth';

function Navbar({ search = true, placeholder = 'Search events, clubs…', breadcrumb }) {
  const { user } = useAuth();
  return (
    <div className="app-topbar">
      {breadcrumb
        ? <div style={{ fontSize: 13, color: 'var(--slate)' }}>{breadcrumb}</div>
        : search
          ? <div className="app-search"><SearchIcon />{placeholder}</div>
          : <div />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <BellIcon />
        <div className="avatar">{user?.initials || 'U'}</div>
      </div>
    </div>
  );
}

export default Navbar;
