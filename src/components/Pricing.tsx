import { ArrowRight, Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
           <div className="hero-label" style={{ marginBottom: '16px' }}>
             99% CHEAPER THAN ENTERPRISE TOOLS
           </div>
           <h2 className="section-title" style={{ marginBottom: 0 }}>
             Stop guessing. <br/>
             <span className="italic-highlight" style={{ color: "var(--accent-blue)" }}>Start closing.</span>
           </h2>
        </div>
        
        <div className="pricing-grid">
          <div className="price-card">
            <h3 className="price-name">Single Call Analysis</h3>
            <div className="price-amount">
              <span className="price-currency">$</span>9
            </div>
            <p className="price-desc" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              Paste one transcript and get a word-for-word script designed to win back the deal.
            </p>
            <div className="price-features" style={{ marginBottom: '40px', flexGrow: 1 }}>
              <div className="feature"><Check size={16} className="feature-icon" /> Full AI Call Teardown</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Flaw & Opportunity Detection</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Custom Recovery Script</div>
            </div>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Analyze My Call</button>
          </div>

          <div className="price-card featured">
            <h3 className="price-name">Multi-Call Intelligence</h3>
            <div className="price-amount">
              <span className="price-currency">$</span>49<span className="price-period">/mo</span>
            </div>
            <p className="price-desc" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              Upload months of transcripts and get one master script built to fix recurring patterns.
            </p>
            <div className="price-features" style={{ marginBottom: '40px', flexGrow: 1 }}>
              <div className="feature"><Check size={16} className="feature-icon" /> Unlimited Call Analyses</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Pattern Recognition Across Calls</div>
              <div className="feature"><Check size={16} className="feature-icon" /> One Master Correction Script</div>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Start Winning <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
