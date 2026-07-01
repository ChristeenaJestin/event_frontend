import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardIcon, EventsIcon, MyEventsIcon, ParticipantsIcon, ProfileIcon, SettingsIcon } from '../common/Icons';
import useAuth from '../../hooks/useAuth';
import { ORGANIZER_ROLES, ROLE_LABELS } from '../../utils/constants';

// each item optionally restricted to specific roles
const NAV_ITEMS = [
  { path: '/dashboard',    label: 'Dashboard',      Icon: DashboardIcon    },
  { path: '/events',       label: 'Explore events', Icon: EventsIcon       },
  { path: '/my-events',    label: 'My events',      Icon: MyEventsIcon,    roles: ORGANIZER_ROLES },
  { path: '/participants', label: 'Participants',    Icon: ParticipantsIcon, roles: ORGANIZER_ROLES },
];

const ACCOUNT_ITEMS = [
  { path: '/profile',  label: 'Profile',  Icon: ProfileIcon  },
  { path: '/settings', label: 'Settings', Icon: SettingsIcon },
];

function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const handleLogout = async () => {
  await logout();
  navigate("/login", { replace: true });
};
const { user, logout } = useAuth();

  const visible = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(user?.role)
  );

  return (
    <aside className="app-sidebar">
      <div className="brand"><span className="dot" />EventHub</div>

      <nav>
        {visible.map(({ path, label, Icon }) => (
          <a
            key={path}
            className={location.pathname === path ? 'current' : ''}
            onClick={() => navigate(path)}
          >
            <Icon />{label}
          </a>
        ))}
      </nav>

      <div className="sb-group">Account</div>
      <nav>
        {ACCOUNT_ITEMS.map(({ path, label, Icon }) => (
          <a
            key={path}
            className={location.pathname === path ? 'current' : ''}
            onClick={() => navigate(path)}
          >
            <Icon />{label}
          </a>
        ))}
      </nav>

     <div className="sb-footer">
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div className="avatar">{user?.initials || 'U'}</div>

    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, color: '#fff' }}>
        {user?.name || 'Guest'}
      </div>

      <div style={{ fontSize: 11.5, color: '#A9ABCB' }}>
        {ROLE_LABELS[user?.role] || ''}
      </div>
    </div>
  </div>

  <button
    onClick={handleLogout}
    style={{
      marginTop: "14px",
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      background: "#EF4444",
      color: "#fff",
      fontWeight: 600,
      transition: "0.2s"
    }}
    onMouseOver={(e) => (e.target.style.background = "#DC2626")}
    onMouseOut={(e) => (e.target.style.background = "#EF4444")}
  >
    Logout
  </button>
</div>
    </aside>
  );
}

export default Sidebar;
