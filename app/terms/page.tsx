'use client';

export default function TermsPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1>Terms of Use</h1>
        <p style={styles.date}>Last Updated: April 14, 2026</p>

        <section style={styles.section}>
          <h2>1. Agreement to Terms</h2>
          <p>By accessing and using the Software4U waitlist, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        </section>

        <section style={styles.section}>
          <h2>2. Waitlist Benefits</h2>
          <p>Early signup benefits are granted based on your position in the waitlist at the time of signup. Benefits are non-transferable and apply only to the email address provided during signup.</p>
        </section>

        <section style={styles.section}>
          <h2>3. Communications</h2>
          <p>By joining the waitlist, you consent to receive email communications about Software4U's launch and updates. You may unsubscribe at any time.</p>
        </section>

        <section style={styles.section}>
          <h2>4. Contact</h2>
          <p>Email: legal@software4u.com</p>
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--background)',
    padding: '40px 20px',
  } as React.CSSProperties,
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    color: 'var(--foreground)',
  } as React.CSSProperties,
  section: {
    marginBottom: '30px',
  } as React.CSSProperties,
  date: {
    color: 'var(--muted-foreground)',
    marginBottom: '40px',
  } as React.CSSProperties,
};
