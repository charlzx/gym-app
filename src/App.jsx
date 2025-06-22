import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Tracker from './pages/Tracker';
import Authpage from './pages/Auth';
import Analytics from './pages/Analytics';
import Planner from './pages/Planner';
import Membership from './pages/Membership';
import TimetablePage from './pages/TimetablePg';
import InstructorsPage from './pages/InstructorsPg';
import NotFoundPage from './pages/404';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tools" element={<Tools />} />
      <Route path="/Tracker" element={<Tracker />} />
      <Route path="/Auth" element={<Authpage />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/Planner" element={<Planner />} />
      <Route path="/Membership" element={<Membership />} />
      <Route path="/TimetablePg" element={<TimetablePage />} />
      <Route path="/InstructorsPg" element={<InstructorsPage />} />
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
