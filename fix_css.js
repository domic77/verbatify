const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');
const splitIndex = css.indexOf('/* Custom Auth Pages */');
if (splitIndex !== -1) {
  css = css.substring(0, splitIndex);
}

const newCss = `/* Custom Auth Pages */
.auth-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 80px);
}
@media (max-width: 1024px) {
  .auth-split {
    grid-template-columns: 1fr;
  }
}
.auth-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}
@media (max-width: 1024px) {
  .auth-left {
    display: none;
  }
}
.auth-quote {
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 24px;
  color: var(--text-primary);
}
.auth-quote-author {
  font-size: 1.125rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 12px;
}
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  position: relative;
  width: 100%;
}
.auth-spotlight {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}
.auth-card {
  width: 100%;
  max-width: 440px;
  background: rgba(15, 24, 41, 0.8);
  backdrop-filter: blur(20px);
  padding: 48px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

/* Animated Border */
.auth-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: conic-gradient(from 0deg, transparent 75%, rgba(59, 130, 246, 0.2) 90%, var(--accent-blue) 100%);
  animation: rotateBorder 8s linear infinite;
  z-index: -2;
  transform-origin: center;
}
.auth-card::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background: var(--bg-card);
  z-index: -1;
}

.auth-header-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  text-decoration: none;
  margin-bottom: 32px;
  justify-content: center;
}

.auth-title {
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  text-align: center;
}
.auth-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 32px;
  text-align: center;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row {
  display: flex;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.form-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}
.form-input {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  padding: 14px 16px;
  font-family: var(--font-sans);
  font-size: 1rem;
  transition: all 0.2s ease;
  border-radius: 0;
  width: 100%;
}
.form-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 1px var(--accent-blue), 0 0 15px rgba(59, 130, 246, 0.2);
}
.form-input::placeholder {
  color: rgba(148, 163, 184, 0.4);
}
.auth-footer {
  text-align: center;
  margin-top: 32px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}
.auth-link {
  color: var(--accent-blue);
  font-weight: 600;
  transition: opacity 0.2s;
  text-decoration: none;
}
.auth-link:hover {
  opacity: 0.8;
}
.auth-error {
  background: rgba(239, 68, 68, 0.1);
  border-left: 2px solid var(--accent-red);
  color: var(--accent-red);
  padding: 12px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 24px;
}
`;

fs.writeFileSync('src/App.css', css + newCss);
