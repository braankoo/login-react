import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import MainLayout from './Layouts/Main';

function App():JSX.Element {
  return (
      <Router>
        <Routes>
          <Route
              key="login"
              path="/"
              element={<MainLayout className="login"><Login /></MainLayout>}
          />
        </Routes>
      </Router>
  );
}

export default App;
