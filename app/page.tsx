'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signupCount, setSignupCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userPosition, setUserPosition] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    fetchSignupCount();
    
    const channel = supabase
      .channel('waitlist_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'waitlist_signups' },
        () => {
          setSignupCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSignupCount = async () => {
    const { count } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true });
    
    if (count !== null) {
      setSignupCount(count);
    }
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Privacy Policy and Terms of Use');
      return;
    }

    setIsLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('waitlist_signups')
        .insert([{ email, consent_given: true }])
        .select('id, email')
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
        } else {
          setError('Error joining waitlist. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      setUserPosition(signupCount + 1);
      setIsSubmitted(true);
      setEmail('');
      setAgreedToTerms(false);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Software4U</h1>
        <p style={styles.subtitle}>Your SaaS, Discovered</p>
        
        <div style={styles.counterBox}>
          <p style={styles.counterLabel}>Waitlist Signups</p>
          <p style={styles.counter}>{signupCount.toString().padStart(4, '0')}</p>
        </div>

        {!isSubmitted ? (
          <div style={styles.formBox}>
            {error && <div style={styles.errorBox}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.button,
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {isLoading ? 'Joining...' : 'Join Seller Waitlist'}
              </button>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>
                  I agree to the{' '}
                  <a href="/privacy" style={styles.link}>Privacy Policy</a>
                  {' '}and{' '}
                  <a href="/terms" style={styles.link}>Terms of Use</a>
                </span>
              </label>
            </form>
          </div>
        ) : (
          <div style={styles.successBox}>
            <h2 style={styles.successTitle}>You're on the list! ✓</h2>
            <p style={styles.successText}>
              Check your email for confirmation. You've secured spot #{userPosition}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--background)',
    padding: '20px',
  } as React.CSSProperties,
  content: {
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'var(--foreground)',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '24px',
    color: 'var(--muted-foreground)',
    marginBottom: '40px',
  } as React.CSSProperties,
  counterBox: {
    background: 'var(--card)',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '40px',
    border: '1px solid var(--border)',
  } as React.CSSProperties,
  counterLabel: {
    color: 'var(--muted-foreground)',
    fontSize: '14px',
    marginBottom: '10px',
  } as React.CSSProperties,
  counter: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'var(--primary)',
  } as React.CSSProperties,
  formBox: {
    background: 'var(--card)',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  } as React.CSSProperties,
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid var(--input)',
    background: 'var(--background)',
    color: 'var(--foreground)',
  } as React.CSSProperties,
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    background: 'var(--primary)',
    color: 'var(--primary-foreground)',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--muted-foreground)',
  } as React.CSSProperties,
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  } as React.CSSProperties,
  link: {
    color: 'var(--primary)',
    textDecoration: 'underline',
  } as React.CSSProperties,
  errorBox: {
    background: '#fee',
    color: '#c33',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '14px',
  } as React.CSSProperties,
  successBox: {
    background: 'var(--card)',
    padding: '40px',
    borderRadius: '12px',
    border: '2px solid var(--primary)',
  } as React.CSSProperties,
  successTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: 'var(--primary)',
  } as React.CSSProperties,
  successText: {
    color: 'var(--muted-foreground)',
    fontSize: '16px',
  } as React.CSSProperties,
};
