import { FileText, CreditCard, PenTool, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <FileText size={28} />,
      title: "Paste",
      desc: "Drop in a single call transcript or upload a batch of past calls."
    },
    {
      num: "02",
      icon: <CreditCard size={28} />,
      title: "Pay",
      desc: "Choose the $9 one-time or $49/mo unlimited plan. Zero friction."
    },
    {
      num: "03",
      icon: <PenTool size={28} />,
      title: "Fix",
      desc: "Get an instant AI teardown and a word-for-word script to use on your next call."
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
