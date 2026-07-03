// convert backend snake_case event → UI-friendly camelCase shape
export function normalizeEvent(e, index = 0) {
  const gradients = [
    "linear-gradient(135deg,#4F46E5,#818CF8)",
    "linear-gradient(135deg,#FF6B4A,#FFB199)",
    "linear-gradient(135deg,#16A34A,#86EFAC)",
    "linear-gradient(135deg,#D97706,#FCD34D)",
    "linear-gradient(135deg,#4F46E5,#A5B4FC)",
  ];

  const status = (e.status || "DRAFT").toUpperCase();

  return {
    id: e.id,
    title: e.title || "",
    description: e.description || "",
    category: e.category || "",
    venue: e.venue || "",

    startDate: e.start_date,
    endDate: e.end_date,

    registrationDeadline: e.registration_deadline,

    maxParticipants: e.max_participants ?? 0,

    bannerUrl: e.banner_url || null,

    status,

    registrationCount: e.registration_count ?? 0,

    isPaid: e.is_paid ?? false,

    price: e.price ?? 0,

    createdBy: e.created_by,

    createdByName: e.creator_name || "",

    isRegistered: e.is_registered ?? false,

    revenue: e.revenue ?? 0,

    gradient: !e.banner_url
      ? gradients[index % gradients.length]
      : undefined,

    bannerStyle: e.banner_url
      ? {
          background: `url(${e.banner_url}) center/cover no-repeat`,
        }
      : {
          background: gradients[index % gradients.length],
        },

    statusLabel:
      status === "UPCOMING"
        ? "Upcoming"
        : status === "PUBLISHED"
        ? "Published"
        : status === "PENDING"
        ? "Pending"
        : status === "DRAFT"
        ? "Draft"
        : status === "CANCELLED"
        ? "Cancelled"
        : status,

    badgeStatus:
      status === "UPCOMING"
        ? "confirmed"
        : status === "PUBLISHED"
        ? "confirmed"
        : status === "PENDING"
        ? "pending"
        : status === "CANCELLED"
        ? "cancelled"
        : "draft",

    dateLabel: e.start_date
      ? new Date(e.start_date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
      : "TBD",

    priceLabel:
      e.is_paid && e.price
        ? `₹${e.price}`
        : "FREE",
  };
}

// normalize backend user
export function normalizeUser(u) {
  if (!u) return null;

  return {
    id: u.id,
    name: u.name || "",
    email: u.email || "",
    role: (u.role || "USER").toUpperCase(),

    profileImage: u.profile_image || null,

    createdAt: u.created_at,

    initials: u.name
      ? u.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U",
  };
}

// normalize participant
export function normalizeParticipant(p) {
  const user = p.users || {};

  return {
    id: p.id,

    name: user.name || "",

    email: user.email || "",

    profileImage: user.profile_image || null,

    initials: user.name
      ? user.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U",

    department: p.department || "—",

    year: p.year || "",

    status:
      p.status?.toUpperCase() === "CONFIRMED"
        ? "confirmed"
        : p.status?.toUpperCase() === "WAITLISTED"
        ? "pending"
        : p.status?.toUpperCase() === "CANCELLED"
        ? "cancelled"
        : "draft",

    statusLabel:
      p.status?.toUpperCase() === "CONFIRMED"
        ? "Confirmed"
        : p.status?.toUpperCase() === "WAITLISTED"
        ? "Waitlisted"
        : p.status?.toUpperCase() === "CANCELLED"
        ? "Cancelled"
        : p.status || "Pending",

    attendanceStatus: p.attendance_status || "",

    rsvpDate: p.registered_at
      ? new Date(p.registered_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "—",
  };
}

export function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}