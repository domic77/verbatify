import { HandCoins, Repeat, AlertTriangle, Bot } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="features" className="problem-section">
      <div className="container">
        <h2 className="section-title">
          Your calls are telling you something. <br/>
          <span className="italic-highlight" style={{ color: "var(--accent-blue)" }}>Are you listening?</span>
        </h2>

        <div className="bento-grid">
          {/* Main Large Card */}
          <div className="bento-card bento-large group">
            <div className="bento-icon-wrapper">
              <Bot size={32} color="var(--accent-blue)" />
            </div>
            <h3 className="bento-title">AI Agents Hallucinate</h3>
            <p className="bento-text">
              Automated cold callers are incredible, until a prospect asks an edge-case question. The LLM gets stuck in a logic loop, hangs up, or gives away pricing too early.
            </p>
            <div className="bento-visual stepping-stones">
               <div className="stone success"></div>
               <div className="stone success"></div>
               <div className="stone danger pulse">
                  <AlertTriangle size={16} color="var(--accent-red)" />
               </div>
               <div className="stone empty"></div>
               <div className="stone empty"></div>
            </div>
            <div className="bento-glow"></div>
          </div>

          {/* Side Cards Column */}
          <div className="bento-side-column">
            {/* Small Card 1 */}
            <div className="bento-card bento-small group">
              <div className="bento-icon-wrapper green">
                <HandCoins size={24} color="var(--accent-green)" />
              </div>
              <h3 className="bento-title">Missed Signals</h3>
              <p className="bento-text">
                Human reps are completely ignoring the subtle cues prospects drop indicating they are ready to buy.
              </p>
              <div className="bento-glow"></div>
            </div>

            {/* Small Card 2 */}
            <div className="bento-card bento-small group">
              <div className="bento-icon-wrapper red">
                <Repeat size={24} color="var(--accent-red)" />
              </div>
              <h3 className="bento-title">No Feedback Loop</h3>
              <p className="bento-text">
                You have no system to turn losing calls into an optimized AI prompt or a winning human script.
              </p>
              <div className="bento-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
