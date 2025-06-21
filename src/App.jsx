import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authpage from './pages/Auth';
import Planner from './pages/Planner';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Authpage />} />
      <Route path="/Planner" element={<Planner />} />
    </Routes>
  );
};

export default App;
