import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Profile from "../pages/Profile";
import CreateEvent from "../pages/CreateEvent";
import EditEvent from "../pages/EditEvent";
import MyEvents from "../pages/MyEvents";
import Participants from "../pages/Participants";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/events" element={<Events />} />

      <Route path="/events/:id" element={<EventDetails />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/create-event" element={<CreateEvent />} />

      <Route path="/edit-event/:id" element={<EditEvent />} />

      <Route path="/my-events" element={<MyEvents />} />

      <Route
        path="/participants/:id"
        element={<Participants />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;