import styles from "./BulletListEditor.module.css";

export default function BulletListEditor({ items, onChange, placeholder = "Add a bullet point..." }) {
  function update(i, value) {
    const next = [...items];
    next[i] = value;
    onChange(next);
  }

  function add() {
    onChange([...items, ""]);
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className={styles.wrapper}>
      {items.map((item, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.bullet}>•</span>
          <textarea
            className={styles.input}
            value={item}
            rows={2}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => remove(i)}
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={add}>
        + Add bullet
      </button>
    </div>
  );
}
