import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { ORGANIZER_ROLES } from './utils/constants';

import Home         from './pages/Home';
import Login        from './pages/Login';
import Register     from './pages/Register';
import Dashboard    from './pages/Dashboard';
import Events       from './pages/Events';
import EventDetails from './pages/EventDetails';
import Profile      from './pages/Profile';
import CreateEvent  from './pages/CreateEvent';
import EditEvent    from './pages/EditEvent';
import MyEvents     from './pages/MyEvents';
import Participants from './pages/Participants';
import NotFound     from './pages/NotFound';
import Privacy from './pages/Privacy';
import Guidelines from './pages/Guidelines';
import Help from './pages/Help';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
<Route path="/guidelines" element={<Guidelines />} />
<Route path="/help" element={<Help />} />

          {/* any authenticated user */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/events"       element={<Events />} />
            <Route path="/events/:id"   element={<EventDetails />} />
            <Route path="/profile"      element={<Profile />} />
          </Route>

          {/* organizer / admin / superadmin only */}
          <Route element={<ProtectedRoutes allowedRoles={ORGANIZER_ROLES} />}>
            <Route path="/create-event"    element={<CreateEvent />} />
            <Route path="/edit-event/:id"  element={<EditEvent />} />
            <Route path="/my-events"       element={<MyEvents />} />
            <Route path="/participants"    element={<Participants />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
