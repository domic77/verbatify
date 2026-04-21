import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Activity } from 'lucide-react';

export default function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/analyze');
      } else {
        console.log(result);
        setError('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-left">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <h2 className="auth-quote" style={{ marginBottom: '40px' }}>Debug your AI Agents.<br/>Coach your Human Reps.</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px', fontSize: '1.125rem' }}>Isolate Fatal Flaws</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Instantly catch the exact objections your human reps miss and the logic loops where your AI agents get stuck.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                <Sparkles size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px', fontSize: '1.125rem' }}>Optimize Playbooks & Prompts</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Get word-for-word human recovery scripts and optimized System Prompts generated directly from your failed calls.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                <Activity size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px', fontSize: '1.125rem' }}>Recover Missed Revenue</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Scale your win rate by turning batches of lost deals into a master playbook to close the next hundred.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-spotlight"></div>
        <div className="auth-card">
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <img src="/main-logo-2.png" alt="Verbatify Logo" height="28" style={{ display: 'block', filter: 'invert(1) brightness(2)' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Verbatify</span>
            </Link>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="auth-title text-gradient" style={{ fontSize: '1.5rem', marginBottom: '16px', textAlign: 'center' }}>
              Welcome back
            </h1>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', background: 'rgba(255,255,255,0.05)' }}
                onClick={() => signIn?.authenticateWithRedirect({ strategy: 'oauth_google', redirectUrl: '/sso-callback', redirectUrlComplete: '/dashboard' })}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', color: 'var(--text-secondary)' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <span style={{ padding: '0 12px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or email</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  className="form-input" 
                  placeholder="you@company.com" 
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="password" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Password</span>
                </label>
                <input 
                  id="password"
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div id="clerk-captcha"></div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                disabled={isLoading || !emailAddress || !password}
              >
                {isLoading ? 'Signing in...' : 'Log in to account'}
                {isLoading ? <Sparkles size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account? <Link to="/signup" className="auth-link">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}