import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Activity } from 'lucide-react';

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError('');
    
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the email with the verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'An error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate('/analyze');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'Invalid verification code.');
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
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '16px' }}>
            <Link to="/" style={{ marginBottom: '12px', display: 'inline-block' }}>
              <img src="/main-logo-2.png" alt="Verbatify Logo" height="28" style={{ display: 'block', filter: 'invert(1) brightness(2)' }} />
            </Link>
            <h1 className="auth-title text-gradient" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
              {pendingVerification ? 'Check your email' : 'Start closing.'}
            </h1>
            {pendingVerification && (
              <p className="auth-subtitle" style={{ marginTop: '8px', fontSize: '0.875rem' }}>
                We sent a verification code to {emailAddress}
              </p>
            )}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>

            {error && <div className="auth-error">{error}</div>}

            {!pendingVerification ? (
              <form className="auth-form" onSubmit={handleSignUp}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', background: 'rgba(255,255,255,0.05)' }}
                  onClick={() => signUp?.authenticateWithRedirect({ strategy: 'oauth_google', redirectUrl: '/sso-callback', redirectUrlComplete: '/dashboard' })}
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
                  <label className="form-label" htmlFor="password">Password</label>
                  <input 
                    id="password"
                    type="password" 
                    className="form-input" 
                    placeholder="Create a strong password" 
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
                  {isLoading ? 'Creating Account...' : 'Create account'}
                  {isLoading ? <Sparkles size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleVerify}>
                <div className="form-group">
                  <label className="form-label" htmlFor="code">Verification Code</label>
                  <input 
                    id="code"
                    type="text" 
                    className="form-input" 
                    placeholder="Enter the 6-digit code" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    style={{ fontSize: '1.25rem', letterSpacing: '0.2em', textAlign: 'center' }}
                  />
                </div>

                <div id="clerk-captcha"></div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                  disabled={isLoading || !code}
                >
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                  {isLoading ? <Sparkles size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                </button>
              </form>
            )}

            {!pendingVerification && (
              <div className="auth-footer">
                Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}