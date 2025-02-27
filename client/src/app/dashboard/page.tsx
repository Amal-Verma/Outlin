'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/workspace');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Welcome to Outlin</h1>
        <div className={styles.loader}></div>
        <p>Preparing your workspace...</p>
      </div>
    </div>
  );
}
