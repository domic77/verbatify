import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle2, AlertCircle, TrendingUp, Sparkles, MessageSquare, ArrowRight, Layers, ArrowUpRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    headerIcon: MessageSquare,
    headerTitle: "SINGLE CALL TRANSCRIPT",
    transcript: [
      { speaker: "Rep", text: "So the core platform is $1,200/mo." },
      { speaker: "Prospect", text: "That fits our budget. We're just worried about the time it'll take our team to migrate all our historical data." },
      { speaker: "Rep", text: "Don't worry, the interface is super intuitive. I'll send over the contract!" }
    ],
    wins: "Secured agreement on core pricing.",
    flaws: "Dismissed a critical buying concern with a generic feature claim.",
    opportunities: "Should have asked: 'How many months of historical data are we talking about?'",
    upsell: "Missed the $3,000 'White-Glove Migration Service' add-on. They literally asked for help.",
    nextButton: "View Multi-Call Demo"
  },
  {
    id: 2,
    headerIcon: Layers,
    headerTitle: "MULTI-CALL BATCH UPLOAD",
    transcript: [
      { speaker: "Call 1 (Mon)", text: "Prospect: The software looks great, but our compliance team needs custom reporting." },
      { speaker: "Call 2 (Wed)", text: "Prospect: We love the tool, but getting our European offices onboarded sounds like a headache." },
      { speaker: "Call 3 (Fri)", text: "Prospect: The standard limits are fine, but what happens if we have a massive traffic spike?" }
    ],
    wins: "Consistently generating strong initial product interest.",
    flaws: "Reps are treating enterprise-level requirements as standard feature requests.",
    opportunities: "Should have asked: 'Is this a hard requirement for your procurement team to sign off?'",
    upsell: "Left $50k+ on the table. 30% of these calls qualify for the 'Enterprise Tier' upgrade, but reps only pitched the Pro plan.",
    nextButton: "View Single Call Demo"
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'reading' | 'scanning' | 'analyzed'>('reading');

  const currentScenario = SCENARIOS[currentIndex];

  const handleAction = () => {
    if (phase === 'reading') {
      setPhase('scanning');
      setTimeout(() => setPhase('analyzed'), 1500);
    } else if (phase === 'analyzed') {
      setPhase('reading');
      setCurrentIndex((prev) => (prev + 1) % SCENARIOS.length);
    }
  };

  const HeaderIcon = currentScenario.headerIcon;

  return (
    <section className="hero">
      <div className="container hero-grid">
        
        {/* Left Text Section */}
        <div className="hero-content">
          <div className="hero-label">
            AI-POWERED — CALL TEARDOWN & ANALYSIS
          </div>
          
          <h1 className="hero-title text-gradient">
            Stop Guessing Why You're <br />
            <span className="italic-highlight">
              Losing
            </span> Good Deals.
          </h1>
          
          <p className="hero-desc" style={{ marginBottom: '40px' }}>
            See how Verbatify instantly identifies missed opportunities and gives you word-for-word scripts to perfect your pitch across all your sales calls.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '16px 32px', fontSize: '1.125rem' }}>
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Unified Demo Section */}
        <div className="visual-wrapper">
          <div className={`report-card ${phase === 'scanning' ? 'scanning' : ''}`} style={{ maxWidth: '440px', padding: 0 }}>
            {/* Unified Header */}
            <div className="rc-header" style={{ padding: '20px 24px', margin: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeaderIcon size={16} color="var(--accent-blue)" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-primary)' }}>
                  {phase === 'reading' ? currentScenario.headerTitle : phase === 'scanning' ? 'ANALYZING...' : 'AI ANALYSIS REPORT'}
                </span>
              </div>
              {phase === 'scanning' && <Sparkles size={14} className="animate-spin" style={{color: 'var(--accent-blue)'}} />}
            </div>

            {/* Dynamic Content Area */}
            <div style={{ padding: '24px', minHeight: '340px' }}>
              {phase === 'reading' ? (
                <div className="transcript-body fade-in" style={{ padding: 0, minHeight: 'auto', background: 'transparent' }}>
                  {currentScenario.transcript.map((msg, idx) => {
                    const isProspect = msg.speaker.toLowerCase().includes('prospect') || msg.speaker.toLowerCase().includes('call');
                    // Always pulse the bad objection in the reading phase to draw attention
                    const isBadObjection = isProspect;
                    return (
                      <div key={idx} className={`chat-bubble ${msg.speaker.toLowerCase().includes('rep') ? 'rep' : 'prospect'} ${(isBadObjection) ? 'objection' : ''}`} style={{ marginBottom: idx === currentScenario.transcript.length - 1 ? 0 : '16px' }}>
                        <span className="speaker-label">{msg.speaker}</span>
                        <p>{msg.text}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rc-content fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="rc-section wins" style={{ marginBottom: 0 }}>
                    <div className="rc-title green"><CheckCircle2 size={16} /> WINS</div>
                    {phase === 'analyzed' ? (
                      <p className="rc-text fade-in">{currentScenario.wins}</p>
                    ) : (
                      <div className={`skeleton-wrapper ${phase === 'scanning' ? 'pulse' : ''}`}>
                        <div className="rc-line w-full"></div>
                        <div className="rc-line w-3-4"></div>
                      </div>
                    )}
                  </div>

                  <div className="rc-section flaws" style={{ marginBottom: 0 }}>
                    <div className="rc-title red"><AlertCircle size={16} /> CRITICAL FLAWS</div>
                    {phase === 'analyzed' ? (
                      <p className="rc-text fade-in">{currentScenario.flaws}</p>
                    ) : (
                      <div className={`skeleton-wrapper ${phase === 'scanning' ? 'pulse' : ''}`}>
                        <div className="rc-line w-full"></div>
                        <div className="rc-line w-1-2"></div>
                      </div>
                    )}
                  </div>

                  <div className="rc-section opportunities" style={{ marginBottom: 0 }}>
                    <div className="rc-title blue"><TrendingUp size={16} /> OPPORTUNITIES</div>
                    {phase === 'analyzed' ? (
                      <p className="rc-text fade-in">{currentScenario.opportunities}</p>
                    ) : (
                      <div className={`skeleton-wrapper ${phase === 'scanning' ? 'pulse' : ''}`}>
                        <div className="rc-line w-full"></div>
                        <div className="rc-line w-3-4"></div>
                      </div>
                    )}
                  </div>

                  <div className="rc-section upsell" style={{ marginBottom: 0 }}>
                    <div className="rc-title" style={{ color: 'var(--text-primary)' }}><ArrowUpRight size={16} /> MISSED UPSELL</div>
                    {phase === 'analyzed' ? (
                      <p className="rc-text fade-in">{currentScenario.upsell}</p>
                    ) : (
                      <div className={`skeleton-wrapper ${phase === 'scanning' ? 'pulse' : ''}`}>
                        <div className="rc-line w-full"></div>
                        <div className="rc-line w-1-2"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="sample-caption" style={{ paddingBottom: '24px', marginTop: 0 }}>
              {phase === 'reading' ? "SAMPLE DATA" : phase === 'analyzed' ? "AUTOMATED DEMO OUTPUT" : "WAITING FOR ANALYSIS..."}
            </div>
            
            <div style={{ padding: '0 24px 24px 24px', display: 'flex', justifyContent: 'center' }}>
              <button 
                className={`btn-secondary ${phase === 'reading' ? 'pulse-btn' : ''}`}
                style={{ width: '100%', justifyContent: 'center', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--accent-blue)', color: 'var(--text-primary)' }}
                onClick={handleAction}
                disabled={phase === 'scanning'}
              >
                {phase === 'reading' ? 'Analyze Transcript' : phase === 'scanning' ? 'Analyzing...' : currentScenario.nextButton} 
                {phase === 'reading' ? <Play size={16} fill="currentColor" /> : phase === 'scanning' ? <Sparkles size={16} className="animate-spin" style={{color: 'currentColor'}} /> : <ArrowRight size={16} color="currentColor" />}
              </button>
            </div>
            
            {phase === 'scanning' && <div className="scanner-line"></div>}
          </div>
        </div>

      </div>
    </section>
  );
}
