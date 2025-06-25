import { Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Tracker from './pages/Tracker';
import Authpage from './pages/Auth';
import AnalyticsPage from './pages/Analytics';
// import Planner from './pages/Planner';
import Membership from './pages/Membership';
import TimetablePage from './pages/TimetablePg';
import InstructorsPage from './pages/InstructorsPg';
import NotFoundPage from './pages/404';
import Style from './pages/Style';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Analytics/>    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tools" element={<Tools />} />
        <Route path="/Tracker" element={<Tracker />} />
        <Route path="/Auth" element={<Authpage />} />
        <Route path="/Analytics" element={<AnalyticsPage />} />
        {/* <Route path="/Planner" element={<Planner />} /> */}
        <Route path="/Membership" element={<Membership />} />
        <Route path="/TimetablePg" element={<TimetablePage />} />
        <Route path="/InstructorsPg" element={<InstructorsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/Style" element={<Style />} />

      </Routes>
    </>
  );
};

export default App;
