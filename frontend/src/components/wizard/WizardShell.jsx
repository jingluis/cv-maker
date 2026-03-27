import Footer from "./Footer.jsx";
import styles from "./WizardShell.module.css";

export default function WizardShell({
  tr, currentStep, onNext, onBack, onGenerate,
  loading, error, lang, onLangToggle, children,
}) {
  const isLast = currentStep === tr.steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.logo}>
            <span className={styles.logoDot} />
            {tr.appTitle}
          </span>
          <button className={styles.langBtn} onClick={onLangToggle}>
            {tr.lang}
          </button>
        </div>

        {/* Progress */}
        <div className={styles.progressRow}>
          {tr.steps.map((label, i) => (
            <div key={i} className={styles.progressItem}>
              <div className={[
                styles.progressDot,
                i < currentStep ? styles.done : "",
                i === currentStep ? styles.active : "",
              ].join(" ")}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span className={[
                styles.progressLabel,
                i === currentStep ? styles.activeLabel : "",
              ].join(" ")}>{label}</span>
              {i < tr.steps.length - 1 && (
                <div className={[styles.connector, i < currentStep ? styles.connectorDone : ""].join(" ")} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <main className={styles.body}>
          {children}
        </main>

        {error && <p className={styles.error}>{error}</p>}

        {/* Nav */}
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
