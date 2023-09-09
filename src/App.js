import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Missions from './components/Missions';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/missions" element={<Missions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
