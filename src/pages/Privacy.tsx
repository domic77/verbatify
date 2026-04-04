export default function Privacy() {
  return (
    <section className="legal-section" style={{ padding: '120px 0', maxWidth: '800px', margin: '0 auto' }}>
      <div className="container">
        <h1 className="section-title text-gradient" style={{ textAlign: 'left', marginBottom: '24px' }}>Privacy Policy</h1>
        <div className="legal-card" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
          <p style={{ marginBottom: '24px' }}>At Verbatify, we take your privacy and the security of your sales data seriously. This Privacy Policy explains how we collect, use, and protect your information.</p>
          
          <h3 style={{ color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '1.25rem' }}>1. Data Collection</h3>
          <p style={{ marginBottom: '24px' }}>We collect transcripts and audio data you upload solely for the purpose of providing AI analysis. We do not use your proprietary sales data to train public AI models without explicit consent.</p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '1.25rem' }}>2. Data Security</h3>
          <p style={{ marginBottom: '24px' }}>Your data is encrypted at rest and in transit. We utilize industry-standard security practices to ensure your competitive intelligence remains confidential.</p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '1.25rem' }}>3. Third-Party Processors</h3>
          <p style={{ marginBottom: '24px' }}>We process transcripts using secure API endpoints from industry-leading AI providers. We have strict agreements in place to ensure your data is not retained or used for model training by these partners.</p>

          <p style={{ marginTop: '48px' }}>For any privacy-related questions, please contact us at privacy@verbatify.com.</p>
        </div>
      </div>
    </section>
  );
}
