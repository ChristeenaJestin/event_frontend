import useAuth from "../../hooks/useAuth";

function Navbar({ breadcrumb }) {
  const { user } = useAuth();

  return (
    <div className="app-topbar">
      {breadcrumb ? (
        <div style={{ fontSize: 13, color: "var(--slate)" }}>
          {breadcrumb}
        </div>
      ) : (
        <div />
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="avatar">
          {user?.initials || "U"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;