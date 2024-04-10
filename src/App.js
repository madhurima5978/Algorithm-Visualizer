
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import SortingVisualizer from './components/SortingVisualizer';
import PathFinder from './components/PathFinder';
function App() {
  return (
    <Router>
      <div className='App'>
      <div className="nav">

        <Link to='/sorting'> <p>Sorting Algorithms</p></Link>
        <Link to='/pathfinding'><p>Path Finding</p></Link>
      </div>

      
        <Routes className='comp'>
          <Route className='component' path="/sorting" element={<SortingVisualizer />} />
          <Route className='component' path="/pathfinding" element={<PathFinder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
