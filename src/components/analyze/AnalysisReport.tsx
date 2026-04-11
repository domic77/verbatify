import { AlertTriangle, AlertCircle, CheckCircle2, PenTool, Copy, Check, ArrowUpRight, FileText } from 'lucide-react';
import type { AnalysisResult } from '../../services/ai';
import { useState } from 'react';

interface AnalysisReportProps {
  onReset: () => void;
  result: AnalysisResult | null;
}

export default function AnalysisReport({ onReset, result }: AnalysisReportProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (result?.recoveryScript) {
      navigator.clipboard.writeText(result.recoveryScript);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!result) return null;

  return (
    <div className="results-feed">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>Analysis Report</h2>
        <button onClick={onReset} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
          Analyze Another
        </button>
      </div>

      {/* Step 1: Diagnosis */}
      {result.diagnosis.length > 0 && (
        <div className="result-item">
          <div className="result-header" style={{ color: 'var(--accent-red)' }}>
            <AlertTriangle size={16} /> What Went Wrong
          </div>
          <ul className="result-list">
            {result.diagnosis.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Missed Opportunities */}
      {result.missedOpportunities.length > 0 && (
        <div className="result-item">
          <div className="result-header" style={{ color: '#F59E0B' }}>
            <AlertCircle size={16} /> Missed Opportunities
          </div>
          <ul className="result-list">
            {result.missedOpportunities.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Missed Upsell */}
      {result.missedUpsell.length > 0 && (
        <div className="result-item">
          <div className="result-header" style={{ color: 'var(--accent-blue)' }}>
            <ArrowUpRight size={16} /> Missed Upsell
          </div>
          <ul className="result-list">
            {result.missedUpsell.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Praise */}
      {result.praise.length > 0 && (
        <div className="result-item">
          <div className="result-header" style={{ color: 'var(--accent-green)' }}>
            <CheckCircle2 size={16} /> What You Did Well
          </div>
          <ul className="result-list">
            {result.praise.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Exact Fixes */}
      {result.exactFixes.length > 0 && (
        <div className="result-item">
          <div className="result-header" style={{ color: 'var(--accent-blue)' }}>
            <PenTool size={16} /> Exact Fixes
          </div>
          <ul className="result-list">
            {result.exactFixes.map((fix, i) => (
              <li key={i}>
                <span className={`severity-tag ${fix.severity.toLowerCase()}`}>{fix.severity}</span>
                {fix.text.split(':').map((part, index) => 
                   index === 0 ? <strong key={index}>{part}:</strong> : part
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* The Recovery Script */}
      <div className="hero-script-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
           <div className="result-header" style={{ color: 'var(--accent-blue)', marginBottom: 0 }}>
             <FileText size={16} /> Your Recovery Script
           </div>
           <button 
             onClick={handleCopy}
             style={{ background: 'transparent', border: 'none', color: isCopied ? 'var(--accent-green)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }} 
             title="Copy to clipboard"
           >
             {isCopied ? <Check size={16} /> : <Copy size={16} />}
           </button>
        </div>
        <div className="hero-script-text">
          {result.recoveryScript}
        </div>
      </div>
    </div>
  );
}