import { X, Check } from 'lucide-react';

interface PaywallModalProps {
  onClose: () => void;
  onPay: (plan: 'single' | 'multi' | 'unlimited') => void;
  isProcessingPayment: boolean;
}

export default function PaywallModal({ onClose, onPay, isProcessingPayment }: PaywallModalProps) {
  return (
    <div className="paywall-overlay">
      <div className="paywall-slide">
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', zIndex: 10 }}
        >
          <X size={20} />
        </button>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>Unlock Your Analysis</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '32px' }}>We found critical flaws in your transcript. Choose a plan to see the exact breakdown and your recovery script.</p>
        
        <div className="paywall-cards">
          {/* Multi Plan */}
          <div style={{ flex: 1, border: '1px solid var(--accent-blue)', background: 'rgba(59,130,246,0.05)', padding: '32px', borderRadius: '4px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: 0, right: '24px', transform: 'translateY(-50%)', background: 'var(--accent-blue)', color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.1em' }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Multi-Call Intelligence</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6', flex: 1 }}>
              Upload a batch of transcripts and get one master script built to fix recurring patterns.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.25rem', marginTop: '4px', marginRight: '2px' }}>$</span>49<span style={{ fontSize: '1.25rem', marginTop: '4px' }}>.99</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-blue)" /> Deep Pattern Recognition</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-blue)" /> Master Correction Script</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-blue)" /> Root-Cause Behavior Fixes</div>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
              onClick={() => onPay('multi')}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : 'Analyze Batch'}
            </button>
          </div>

          {/* Unlimited Plan */}
          <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', padding: '32px', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Unlimited Intelligence</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6', flex: 1 }}>
              For teams that want every single call analyzed, tracked, and optimized daily. Includes ongoing coaching.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.25rem', marginTop: '4px', marginRight: '2px' }}>$</span>99<span style={{ fontSize: '1.25rem', marginTop: '4px' }}>.99</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500, alignSelf: 'flex-end', marginBottom: '6px', marginLeft: '4px' }}>/mo</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-blue)" /> Unlimited Transcript Uploads</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-blue)" /> Ongoing Sales Coaching</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-blue)" /> Weekly Strategy Adjustments</div>
            </div>
            <button 
              className="btn-secondary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
              onClick={() => onPay('unlimited')}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}