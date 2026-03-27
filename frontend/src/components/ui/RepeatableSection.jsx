import styles from "./RepeatableSection.module.css";

export default function RepeatableSection({ items, onChange, emptyItem, renderItem, addLabel = "Add entry" }) {
  function update(i, value) {
    const next = [...items];
    next[i] = value;
    onChange(next);
  }

  function add() {
    onChange([...items, { ...emptyItem }]);
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className={styles.wrapper}>
      {items.map((item, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIndex}>#{i + 1}</span>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => remove(i)}
            >
              Remove
            </button>
          </div>
          {renderItem(item, (v) => update(i, v))}
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={add}>
        + {addLabel}
      </button>
    </div>
  );
}
