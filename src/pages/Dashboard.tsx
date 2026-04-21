import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BookOpen, Plus, TrendingUp, History, FileText, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="scanline-bg" style={{ minHeight: 'calc(100vh - 61px)', background: 'var(--bg-navy)' }}>
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
        
        {/* Header & Main Metric */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Command Center
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Pattern analysis and active playbooks.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'rgba(15, 24, 41, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px 32px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Calls Analyzed
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                14
              </div>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--accent-blue)', padding: '16px 32px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-blue)', marginBottom: '4px' }}>
                Total Revenue Leaked
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                $124,500
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          
          {/* Top Flaws */}
          <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 24, 41, 0.6)', padding: '32px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="var(--accent-red)" /> Top Recurring Flaws
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '4px', borderLeft: '2px solid var(--accent-red)' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Defending price before isolating</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Detected in 80% of recent calls</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '4px', borderLeft: '2px solid #F59E0B' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Accepting vague next steps</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Detected in 60% of recent calls</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '4px', borderLeft: '2px solid #F59E0B' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Talking over the prospect</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Detected in 50% of recent calls</div>
              </div>
            </div>
          </div>

          {/* Master Playbook */}
          <div style={{ border: '1px solid var(--accent-blue)', background: 'rgba(59,130,246,0.05)', padding: '32px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--accent-blue)" /> Active Master Scripts
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(10,15,30,0.8)', padding: '16px', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price Objection</div>
                <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontFamily: 'var(--font-script)', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                  "I understand price is a concern. But before we talk numbers, are you comparing that to the cost of doing nothing, or to another solution?"
                </div>
              </div>
              <div style={{ background: 'rgba(10,15,30,0.8)', padding: '16px', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Steps</div>
                <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontFamily: 'var(--font-script)', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                  "Let's not leave this up in the air. If you need to talk to your team, let's put a 15-minute placeholder on the calendar for next Tuesday so we don't drop the ball."
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Action */}
          <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 24, 41, 0.6)', padding: '32px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={18} color="var(--text-secondary)" /> Workflow
            </h2>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px', border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', marginBottom: '16px' }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Upload New Batch</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.5' }}>
                Drop your latest transcripts to update your playbooks and track improvements.
              </p>
              <Link to="/analyze" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 24px', fontSize: '0.875rem' }}>
                <Plus size={16} style={{ marginRight: '8px' }} /> Start Analysis
              </Link>
            </div>
          </div>

        </div>

        {/* Recent Analyses List */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--text-secondary)" /> Recent Analyses
          </h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '16px 24px', background: 'rgba(15, 24, 41, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <div>Transcript Name</div>
              <div>Date</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {/* List Items */}
            <Link to="/analyze" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '20px 24px', background: 'rgba(15, 24, 41, 0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center', textDecoration: 'none', transition: 'background 0.2s' }} className="history-row">
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '8px', borderRadius: '4px', color: 'var(--accent-blue)' }}><FileText size={16} /></div>
                Discovery_Call_AcmeCorp.txt
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Oct 12, 2026</div>
              <div><span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Critical Flaws</span></div>
              <div style={{ color: 'var(--text-secondary)' }}><ChevronRight size={20} /></div>
            </Link>

            <Link to="/analyze" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '20px 24px', background: 'rgba(15, 24, 41, 0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center', textDecoration: 'none', transition: 'background 0.2s' }} className="history-row">
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '8px', borderRadius: '4px', color: 'var(--accent-blue)' }}><FileText size={16} /></div>
                Demo_TechNova_Q3.pdf
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Oct 10, 2026</div>
              <div><span style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Needs Review</span></div>
              <div style={{ color: 'var(--text-secondary)' }}><ChevronRight size={20} /></div>
            </Link>

            <Link to="/analyze" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '20px 24px', background: 'rgba(15, 24, 41, 0.4)', alignItems: 'center', textDecoration: 'none', transition: 'background 0.2s' }} className="history-row">
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '8px', borderRadius: '4px', color: 'var(--accent-blue)' }}><FileText size={16} /></div>
                FollowUp_Zenith_V2.txt
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Oct 08, 2026</div>
              <div><span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Strong Call</span></div>
              <div style={{ color: 'var(--text-secondary)' }}><ChevronRight size={20} /></div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}