function Footer() {
  return (
    <footer style={{ padding: '44px 64px', display: 'flex', justifyContent: 'space-between', color: 'var(--slate)', fontSize: 13 }}>
      <div>© 2026 EventHub, built for our campus community.</div>
      <div style={{ display: 'flex', gap: 28 }}><a>Privacy</a><a>Guidelines</a><a>Help</a></div>
    </footer>
  );
}

export default Footer;
