function EventHubLogo({ size = 42 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>

        {/* E */}
        <path
          d="M46 14H26C17 14 10 21 10 32C10 43 17 50 26 50H46"
          stroke="url(#grad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M22 26H40"
          stroke="url(#grad)"
          strokeWidth="15"
          strokeLinecap="round"
        />

        <path
          d="M22 38H38"
          stroke="url(#grad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Decorative dots */}
        <circle cx="53" cy="22" r="3.5" fill="#FF6B6B" />
        <circle cx="57" cy="32" r="3.5" fill="#D946EF" />
        <circle cx="53" cy="42" r="3.5" fill="#6366F1" />

        {/* Sparkle */}
        <path
          d="M45 30L47 26L49 30L53 32L49 34L47 38L45 34L41 32L45 30Z"
          fill="#FF6B6B"
        />
      </svg>

      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            color: "#fff",
          }}
        >
          Event
          <span
            style={{
              background:
                "linear-gradient(90deg,#D946EF,#6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hub
          </span>
        </div>

        <div
          style={{
            fontSize: 5,
            letterSpacing: "3px",
            color: "#9CA3AF",
            marginTop: 2,
          }}
        >
          DISCOVER • ORGANIZE 
        </div>
      </div>
    </div>
  );
}

export default EventHubLogo;