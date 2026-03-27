import styles from "./Field.module.css";

export default function Field({ label, value, onChange, placeholder, multiline, hint }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {hint && <span className={styles.hint}>{hint}</span>}
      {multiline ? (
        <textarea
          className={styles.input}
          value={value}
          rows={3}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
