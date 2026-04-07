import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

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

        <div className="nav-auth" style={{ minWidth: '60px', minHeight: '32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <SignedOut>
            <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s ease' }} className="hover-accent">
              Sign In
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s ease', marginRight: '16px' }} className="hover-accent">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: { borderRadius: '0px' } } }} />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
