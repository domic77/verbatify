import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/main-logo-2.png" alt="Verbatify Logo" height="32" style={{ display: 'block', filter: 'invert(1) brightness(2)' }} />
          <span>Verbatify</span>
        </Link>
        
        <div className="nav-links">
          <a href="/#features">Features</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#pricing">Pricing</a>
        </div>

        <div className="nav-auth">
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
