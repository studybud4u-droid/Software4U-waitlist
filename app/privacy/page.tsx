'use client';
export default function PrivacyPage() {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1>Privacy Policy</h1>
                <p style={styles.date}>Last Updated: April 14, 2026</p>
                <section style={styles.section}>
                    <h2>Data Collection</h2>
                    <p>We collect email address, IP address, and browser information when you sign up.</p>
                </section>
                <section style={styles.section}>
                    <h2>Use of Data</h2>
                    <p>We use data to provide service, send launch updates, and analyze growth.</p>
                </section>
                <section style={styles.section}>
                    <h2>Data Security</h2>
                    <p>Data is stored securely in Supabase with encryption.</p>
                </section>
                <section style={styles.section}>
                    <h2>Contact</h2>
                    <p>Email: privacy@software4u.com</p>
                </section>
            </div>
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', background: 'var(--background)', padding: '40px 20px' } as React.CSSProperties,
    content: { maxWidth: '800px', margin: '0 auto', color: 'var(--foreground)' } as React.CSSProperties,
    section: { marginBottom: '30px' } as React.CSSProperties,
    date: { color: 'var(--muted-foreground)', marginBottom: '40px' } as React.CSSProperties,
};
