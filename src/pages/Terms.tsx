export default function Terms() {
  return (
    <section className="legal-section" style={{ padding: '120px 0', maxWidth: '800px', margin: '0 auto' }}>
      <div className="container">
        <h1 className="section-title text-gradient" style={{ textAlign: 'left', marginBottom: '24px' }}>Terms of Service</h1>
        <div className="legal-card" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
          <p style={{ marginBottom: '24px' }}>Welcome to Verbatify. By using our service, you agree to these terms.</p>
          
          <h3 style={{ color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '1.25rem' }}>1. Service Description</h3>
          <p style={{ marginBottom: '24px' }}>Verbatify provides AI-powered analysis of sales transcripts. The service is provided "as is" and we make no guarantees regarding the exact financial outcome of implementing our suggested scripts.</p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '1.25rem' }}>2. Acceptable Use</h3>
          <p style={{ marginBottom: '24px' }}>You agree to only upload transcripts for calls you have the legal right to record and analyze according to your local, state, and federal laws.</p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '1.25rem' }}>3. Subscriptions & Payments</h3>
          <p style={{ marginBottom: '24px' }}>All payments are processed securely. The $49/month subscription can be canceled at any time. The $9 single analysis is a one-time non-refundable fee due to the immediate compute cost incurred during processing.</p>

          <p style={{ marginTop: '48px' }}>If you have any questions about these terms, please contact legal@verbatify.com.</p>
        </div>
      </div>
    </section>
  );
}
