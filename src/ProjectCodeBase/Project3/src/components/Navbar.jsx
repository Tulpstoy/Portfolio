import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="nav-logo">
          PokéTeamPlanner
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/team"
            className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}
          >
            My Team
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 