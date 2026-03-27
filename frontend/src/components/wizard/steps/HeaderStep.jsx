import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";
import headerStyles from "./HeaderStep.module.css";

export default function HeaderStep({ data, onChange, tr }) {
  const h = tr.header;

  function set(key, value) { onChange({ ...data, [key]: value }); }

  function addExtra() {
    onChange({ ...data, extra: [...data.extra, { label: "", value: "" }] });
  }

  function updateExtra(i, field, value) {
    const next = [...data.extra];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, extra: next });
  }

  function removeExtra(i) {
    onChange({ ...data, extra: data.extra.filter((_, idx) => idx !== i) });
  }

  return (
    <div className={styles.stack}>
      <div className={styles.grid2}>
        <Field label={h.name} value={data.name} placeholder={h.namePh} onChange={(v) => set("name", v)} />
        <Field label={h.email} value={data.email} placeholder={h.emailPh} onChange={(v) => set("email", v)} />
        <Field label={h.linkedin} value={data.linkedin} placeholder={h.linkedinPh} onChange={(v) => set("linkedin", v)} />
        <Field label={h.location} value={data.location} placeholder={h.locationPh} onChange={(v) => set("location", v)} />
      </div>

      <div className={headerStyles.divider} />

      <p className={styles.sectionLabel}>{h.extraFields}</p>

      {data.extra.map((field, i) => (
        <div key={i} className={headerStyles.extraRow}>
          <div className={headerStyles.extraFields}>
            <Field
              label={h.extraLabel}
              value={field.label}
              placeholder={h.extraLabelPh}
              onChange={(v) => updateExtra(i, "label", v)}
            />
            <Field
              label={h.extraValue}
              value={field.value}
              placeholder={h.extraValuePh}
              onChange={(v) => updateExtra(i, "value", v)}
            />
          </div>
          <button className={headerStyles.removeBtn} onClick={() => removeExtra(i)} title="Remove">×</button>
        </div>
      ))}

      <button className={headerStyles.addBtn} onClick={addExtra}>
        + {h.addField}
      </button>

      <p className={headerStyles.note}>{h.cvLanguageNote}</p>
    </div>
  );
}
