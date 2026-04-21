import { FileText, PenTool, ArrowRight, Bot } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <FileText size={28} />,
      title: "Upload",
      desc: "Drop in failed call transcripts from your human reps or AI Voice Agents."
    },
    {
      num: "02",
      icon: <Bot size={28} />,
      title: "Analyze",
      desc: "Our engine isolates logic loops, missed buying signals, and weak objection handling."
    },
    {
      num: "03",
      icon: <PenTool size={28} />,
      title: "Fix",
      desc: "Get an optimized System Prompt for your AI, or a word-for-word recovery script for your rep."
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <h2 className="section-title">
             See how Verbatify helps <br/>
             <span className="italic-highlight" style={{ color: "var(--accent-blue)" }}>improve your calls.</span>
           </h2>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-glass-card">
              <div className="step-glass-header">
                <span className="step-glass-num">{step.num}</span>
                <div className="step-glass-icon">
                  {step.icon}
                </div>
              </div>
              <h3 className="step-glass-title">{step.title}</h3>
              <p className="step-glass-desc">{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <ArrowRight size={24} color="var(--text-secondary)" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
