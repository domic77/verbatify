import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import TranscriptEditor from '../components/analyze/TranscriptEditor';
import IntelligencePanel from '../components/analyze/IntelligencePanel';
import AnalysisReport from '../components/analyze/AnalysisReport';
import PaywallModal from '../components/analyze/PaywallModal';
import { analyzeTranscript } from '../services/ai';
import type { AnalysisResult } from '../services/ai';

type AppState = 'input' | 'paywall' | 'analyzing' | 'results';

const AI_THOUGHTS = [
  "Initializing neural processing engine...",
  "Parsing raw sales call transcript...",
  "Isolating speaker roles and identifying prospect...",
  "Running sentiment analysis on core objections...",
  "Detecting defensive positioning patterns...",
  "Cross-referencing missed buying signals against ideal flow...",
  "Quantifying potential lost revenue...",
  "Drafting targeted word-for-word recovery script...",
  "Finalizing intelligence brief..."
];

export default function Analyze() {
  const [appState, setAppState] = useState<AppState>('input');
  const [transcript, setTranscript] = useState(() => {
    return localStorage.getItem('verbatify_transcript') || '';
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [activeThoughts, setActiveThoughts] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [summaryState, setSummaryState] = useState<'hidden' | 'generating' | 'visible'>('hidden');

  useEffect(() => {
    if (appState === 'results') {
      setSummaryState('generating');
      const timer = setTimeout(() => {
        setSummaryState('visible');
      }, 2500); // Wait 2.5 seconds before revealing the summary
      return () => clearTimeout(timer);
    } else {
      setSummaryState('hidden');
    }
  }, [appState]);

  useEffect(() => {
    localStorage.setItem('verbatify_transcript', transcript);
  }, [transcript]);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    if (appState === 'analyzing' || appState === 'results') {
      setActiveThoughts([]);
      AI_THOUGHTS.forEach((thought, index) => {
        const timeout = setTimeout(() => {
          setActiveThoughts(prev => [...prev, thought]);
        }, index * 600 + 300); // spread out over a few seconds
        timeouts.push(timeout);
      });
    }
    return () => timeouts.forEach(clearTimeout);
  }, [appState]);

  const handleAnalyzeClick = (_mode: 'human' | 'ai') => {
    if (transcript.length > 10) {
      setAppState('paywall');
      // we could also save the mode here to state if needed later
    }
  };

  const handlePayment = (plan: 'single' | 'multi' | 'unlimited') => {
    setIsProcessingPayment(true);
    console.log(`Processing mock payment for: ${plan}`);
    // Mock payment processing delay
    setTimeout(async () => {
      setIsProcessingPayment(false);
      setAppState('analyzing');
      
      // Call mock AI service
      try {
        const result = await analyzeTranscript(transcript);
        setAnalysisResult(result);
        setAppState('results');
      } catch (error) {
        console.error("Failed to analyze transcript:", error);
        // Handle error state if needed
      }
    }, 1500);
  };

  const resetApp = () => {
    setAppState('input');
    setTranscript('');
    setAnalysisResult(null);
  };

  return (
    <>
      {/* Distraction-Free App Navbar */}
      <nav className="navbar" style={{ padding: '12px 24px', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <img src="/main-logo-2.png" alt="Verbatify Logo" height="28" style={{ display: 'block', filter: 'invert(1) brightness(2)' }} />
            <span style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>Verbatify</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: { borderRadius: '0px', width: '32px', height: '32px' } } }} />
          </div>
        </div>
      </nav>

      {/* Edge-to-Edge Split Workspace */}
      <div className="workspace-layout">
        
        {/* Left Pane: The Editor/Transcript View */}
        <div className="workspace-left">
          <div className="workspace-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              &larr; Dashboard
            </Link>
            <h1 className="app-title" style={{ fontSize: '1.25rem', marginBottom: 0, marginLeft: 'auto' }}>
              {(appState === 'analyzing' || appState === 'results') ? 'AI Processing Log' : 'New Analysis'}
            </h1>
          </div>
          
          <TranscriptEditor 
            transcript={transcript} 
            setTranscript={setTranscript} 
            appState={appState} 
            onAnalyze={handleAnalyzeClick} 
          />

          {(appState === 'analyzing' || appState === 'results') && (
            <div style={{ flex: 1, padding: '24px 32px', background: 'rgba(0, 0, 0, 0.2)', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--accent-blue)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeThoughts.map((thought, i) => (
                  <div key={i} className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>&gt;</span>
                    <span style={{ color: i === activeThoughts.length - 1 && appState === 'analyzing' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {thought}
                    </span>
                  </div>
                ))}
                
                {appState === 'analyzing' && activeThoughts.length < AI_THOUGHTS.length && (
                  <div className="pulse" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                    <span style={{ color: 'var(--accent-blue)' }}>&gt;</span>
                    <span style={{ width: '8px', height: '16px', background: 'var(--accent-blue)', display: 'inline-block', animation: 'blink 1s step-end infinite' }}></span>
                  </div>
                )}

                {summaryState === 'generating' && (
                  <div className="fade-in pulse" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                    <span style={{ color: 'var(--accent-blue)' }}>&gt;</span>
                    <span style={{ color: 'var(--text-primary)' }}>Synthesizing executive summary...</span>
                    <span style={{ width: '8px', height: '16px', background: 'var(--accent-blue)', display: 'inline-block', animation: 'blink 1s step-end infinite' }}></span>
                  </div>
                )}

                {summaryState === 'visible' && analysisResult && (
                  <div className="fade-in" style={{ marginTop: '24px', padding: '24px', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '4px', fontFamily: 'var(--font-sans)' }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} color="var(--accent-blue)" /> Executive Summary
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {analysisResult.executiveSummary}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Intelligence Panel */}
        <div className="workspace-right scanline-bg">
          
          <IntelligencePanel appState={appState} />

          {appState === 'results' && (
            <AnalysisReport onReset={resetApp} result={analysisResult} />
          )}
          
          {appState === 'paywall' && (
            <PaywallModal 
              onClose={() => setAppState('input')} 
              onPay={handlePayment} 
              isProcessingPayment={isProcessingPayment} 
            />
          )}

        </div>
      </div>
    </>
  );
}