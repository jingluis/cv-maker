import styles from "./WizardShell.module.css";

export default function WizardShell({
  steps,
  currentStep,
  onNext,
  onBack,
  onGenerate,
  loading,
  error,
  children,
}) {
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>CV Maker</h1>
          <div className={styles.progressBar}>
            {steps.map((s, i) => (
              <div
                key={s.key}
                className={[
                  styles.progressStep,
                  i < currentStep ? styles.done : "",
                  i === currentStep ? styles.active : "",
                ].join(" ")}
              >
                <div className={styles.dot}>{i < currentStep ? "✓" : i + 1}</div>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        <main className={styles.body}>
          <h2 className={styles.sectionTitle}>{steps[currentStep].label}</h2>
          {children}
        </main>

        {error && <p className={styles.error}>{error}</p>}

        <footer className={styles.footer}>
          <button
            className={styles.btnSecondary}
            onClick={onBack}
            disabled={isFirst}
          >
            Back
          </button>
          <div className={styles.rightButtons}>
            {!isLast && (
              <button className={styles.btnSkip} onClick={onNext}>
                Skip
              </button>
            )}
            {!isLast ? (
              <button className={styles.btnPrimary} onClick={onNext}>
                Next
              </button>
            ) : (
              <button
                className={styles.btnGenerate}
                onClick={onGenerate}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate CV"}
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
