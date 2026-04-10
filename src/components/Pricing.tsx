import { ArrowRight, Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
           <div className="pricing-label" style={{ marginBottom: '16px' }}>
             99% CHEAPER THAN ENTERPRISE TOOLS
           </div>
           <h2 className="section-title" style={{ marginBottom: 0 }}>
             Stop guessing. <br/>
             <span className="italic-highlight" style={{ color: "var(--accent-blue)" }}>Start closing.</span>
           </h2>
        </div>
        
        <div className="pricing-grid">
          {/* Plan 1: Single Call */}
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

          {/* Plan 2: Multi-Call (One-time) */}
          <div className="price-card featured">
            <h3 className="price-name">Multi-Call Intelligence</h3>
            <div className="price-amount">
              <span className="price-currency">$</span>49
            </div>
            <p className="price-desc" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              Upload a batch of transcripts and get one master script built to fix recurring patterns.
            </p>
            <div className="price-features" style={{ marginBottom: '40px', flexGrow: 1 }}>
              <div className="feature"><Check size={16} className="feature-icon" /> Deep Pattern Recognition</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Master Correction Script</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Root-Cause Behavior Fixes</div>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Analyze My Batch <ArrowRight size={16} />
            </button>
          </div>

          {/* Plan 3: Unlimited */}
          <div className="price-card">
            <h3 className="price-name">Unlimited Intelligence</h3>
            <div className="price-amount">
              <span className="price-currency">$</span>99<span className="price-period">/mo</span>
            </div>
            <p className="price-desc" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              For teams that want every single call analyzed, tracked, and optimized daily.
            </p>
            <div className="price-features" style={{ marginBottom: '40px', flexGrow: 1 }}>
              <div className="feature"><Check size={16} className="feature-icon" /> Unlimited Transcript Uploads</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Ongoing Sales Coaching</div>
              <div className="feature"><Check size={16} className="feature-icon" /> Weekly Strategy Adjustments</div>
            </div>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Go Unlimited</button>
          </div>
        </div>
      </div>
    </section>
  );
}
