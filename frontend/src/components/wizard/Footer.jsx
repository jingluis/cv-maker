import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

const START_TIME = Date.now();
const YEAR = new Date().getFullYear();

function formatUptime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

export default function Footer() {
  const [uptime, setUptime] = useState("0s");

  useEffect(() => {
    const id = setInterval(() => {
      setUptime(formatUptime(Date.now() - START_TIME));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className={styles.footer}>
      <span>© {YEAR} Jing Luis Cao</span>
      <span className={styles.dot}>·</span>
      <span>Session: {uptime}</span>
      <span className={styles.dot}>·</span>
      <a
        className={styles.link}
        href="https://github.com/jingl-ll/cv-maker"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </footer>
  );
}
