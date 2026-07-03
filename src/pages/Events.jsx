import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/common/Button";
import EventGrid from "../components/events/EventGrid";
import FilterSidebar from "../components/events/FilterSidebar";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import { PlusIcon } from "../components/common/Icons";
import * as eventApi from "../api/eventApi";
import useAuth from "../hooks/useAuth";
import { ORGANIZER_ROLES } from "../utils/constants";
import { normalizeEvent } from "../utils/helpers";

function Events() {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const canCreate = hasRole(...ORGANIZER_ROLES);

  const [category, setCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    eventApi
      .getEvents()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.events || [];
        setEvents(list.map((e, i) => normalizeEvent(e, i)));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((event) => {
    // Category filter
    if (category !== "All") {
      if (category === "Free") {
        if (event.isPaid) return false;
      } else {
        const selectedCategory =
          category === "Tech fests"
            ? "Tech fest"
            : category;

        if (
          (event.category || "").toLowerCase() !==
          selectedCategory.toLowerCase()
        ) {
          return false;
        }
      }
    }

    // Search filter
    if (search.trim() !== "") {
      const keyword = search.toLowerCase();

      return (
        event.title?.toLowerCase().includes(keyword) ||
        event.description?.toLowerCase().includes(keyword) ||
        event.venue?.toLowerCase().includes(keyword)
      );
    }

    return true;
  });

  
    return (
  <DashboardLayout
    search={true}
    searchValue={search}
    onSearch={setSearch}
  >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 8,
        }}
      >
        <div>
          <div className="eyebrow">All events</div>
          <h1
            className="h1"
            style={{ fontSize: 28, marginTop: 8 }}
          >
            Explore events
          </h1>
        </div>

        {canCreate && (
          <Button
            icon={<PlusIcon />}
            onClick={() => navigate("/create-event")}
          >
            Create event
          </Button>
        )}
      </div>

      <FilterSidebar
        active={category}
        onChange={setCategory}
      />

      {loading && <Loader label="Loading events…" />}

      {!loading && error && (
        <EmptyState message="Couldn't load events. Please try again." />
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <EmptyState message="No events found." />
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <EventGrid
          events={filteredEvents}
          onEventClick={(e) => navigate(`/events/${e.id}`)}
          onCreateClick={
            canCreate
              ? () => navigate("/create-event")
              : undefined
          }
          showCreateTile={canCreate}
        />
      )}
       </DashboardLayout>
   
  );
}

export default Events;