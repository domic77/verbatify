import { Activity } from 'lucide-react';

interface IntelligencePanelProps {
  appState: 'input' | 'paywall' | 'analyzing' | 'results';
}

export default function IntelligencePanel({ appState }: IntelligencePanelProps) {
  if (appState === 'input' || appState === 'paywall') {
    return (
      <div className="panel-empty fade-in">
        <img src="/main-logo-2.png" alt="Verbatify Logo" height="48" style={{ marginBottom: '24px', opacity: 0.2, filter: 'invert(1)' }} />
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>Results Panel</h3>
        <p>Paste a transcript on the left and click Analyze to generate your custom breakdown and recovery script.</p>
      </div>
    );
  }

  if (appState === 'analyzing') {
    return (
      <div className="panel-empty fade-in">
        <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid rgba(59, 130, 246, 0.2)', borderRadius: '50%', animation: 'spin 2s linear infinite', borderTopColor: 'var(--accent-blue)' }}></div>
          <Activity size={24} color="var(--accent-blue)" />
        </div>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>Tearing down your call...</h3>
        <p style={{ fontSize: '0.875rem' }}>Mapping missed buying signals and generating your recovery script.</p>
      </div>
    );
  }

  return null;
}