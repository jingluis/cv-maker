import Footer from "./Footer.jsx";
import styles from "./WizardShell.module.css";
import { cx } from "../../lib/cx.js";

export default function WizardShell({
  tr, currentStep, onNext, onBack, onGenerate,
  loading, error, onLangToggle, children,
}) {
  const maxStep = tr.steps.length - 1;
  const isLast = currentStep === maxStep;
  const isFirst = currentStep === 0;

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.topBar}>
          <span className={styles.logo}>
            <span className={styles.logoDot} />
            {tr.appTitle}
          </span>
          <button className={styles.langBtn} onClick={onLangToggle}>
            {tr.lang}
          </button>
        </div>

        <div className={styles.progressRow}>
          {tr.steps.map((label, i) => (
            <div key={i} className={styles.progressItem}>
              <div className={cx(styles.progressDot, i < currentStep && styles.done, i === currentStep && styles.active)}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span className={cx(styles.progressLabel, i === currentStep && styles.activeLabel)}>
                {label}
              </span>
              {i < maxStep && (
                <div className={cx(styles.connector, i < currentStep && styles.connectorDone)} />
              )}
            </div>
          ))}
        </div>

        <main className={styles.body}>
          {children}
        </main>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.footer}>
          <button className={styles.btnBack} onClick={onBack} disabled={isFirst}>
            {tr.nav.back}
          </button>
          <div className={styles.rightBtns}>
            {!isLast && (
              <button className={styles.btnSkip} onClick={onNext}>
                {tr.nav.skip}
              </button>
            )}
            {!isLast ? (
              <button className={styles.btnNext} onClick={onNext}>
                {tr.nav.next}
              </button>
            ) : (
              <button className={styles.btnGenerate} onClick={onGenerate} disabled={loading}>
                {loading ? tr.nav.generating : tr.nav.generate}
              </button>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
