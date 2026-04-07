import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Activity } from 'lucide-react';

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
        firstName,
        lastName,
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
        navigate('/dashboard');
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
          <h2 className="auth-quote" style={{ marginBottom: '40px' }}>Turn lost deals into your best training material.</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px', fontSize: '1.125rem' }}>Identify Blind Spots</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Instantly catch the exact objections and buying signals your team is missing on every call.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                <Sparkles size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px', fontSize: '1.125rem' }}>Generate Winning Scripts</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Get word-for-word, AI-generated rebuttals tailored to the exact moment you lost the deal.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                <Activity size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px', fontSize: '1.125rem' }}>Recover Missed Revenue</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Scale your win rate by turning one lost deal into a playbook for closing the next ten.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-spotlight"></div>
        <div className="auth-card">
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
            <Link to="/" style={{ marginBottom: '16px', display: 'inline-block' }}>
              <img src="/main-logo-2.png" alt="Verbatify Logo" height="40" style={{ display: 'block', filter: 'invert(1) brightness(2)' }} />
            </Link>
            <h1 className="auth-title text-gradient" style={{ fontSize: '2rem', marginBottom: 0 }}>
              {pendingVerification ? 'Check your email' : 'Start closing.'}
            </h1>
            {pendingVerification && (
              <p className="auth-subtitle" style={{ marginTop: '8px' }}>
                We sent a verification code to {emailAddress}
              </p>
            )}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>

            {error && <div className="auth-error">{error}</div>}

            {!pendingVerification ? (
              <form className="auth-form" onSubmit={handleSignUp}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input 
                      id="firstName"
                      type="text" 
                      className="form-input" 
                      placeholder="Jane" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input 
                      id="lastName"
                      type="text" 
                      className="form-input" 
                      placeholder="Doe" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
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
                  className="btn-primary"                   style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                  disabled={isLoading || !emailAddress || !password || !firstName || !lastName}
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
                  className="btn-primary"                   style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
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
