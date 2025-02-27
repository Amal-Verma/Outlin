'use client';

import { useRouter } from 'next/navigation';
import styles from './landing.module.css';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Outlin</div>
        <button 
          className={styles.loginButton}
          onClick={() => router.push('/dashboard')}
        >
          Get Started
        </button>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create, Collaborate, <span className={styles.highlight}>Outlin</span>
        </h1>
        <p className={styles.subtitle}>
          The modern workspace for your ideas and projects
        </p>
        <div className={styles.cta}>
          <button 
            className={styles.primaryButton}
            onClick={() => router.push('/dashboard')}
          >
            Start Creating
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => router.push('/about')}
          >
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}
