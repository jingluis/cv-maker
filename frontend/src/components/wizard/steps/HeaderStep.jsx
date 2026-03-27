import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

export default function HeaderStep({ data, onChange, tr }) {
  const h = tr.header;
  function set(key, value) { onChange({ ...data, [key]: value }); }

  return (
    <div className={styles.grid2}>
      <Field label={h.name} value={data.name} placeholder={h.namePh} onChange={(v) => set("name", v)} />
      <Field label={h.email} value={data.email} placeholder={h.emailPh} onChange={(v) => set("email", v)} />
      <Field label={h.linkedin} value={data.linkedin} placeholder={h.linkedinPh} onChange={(v) => set("linkedin", v)} />
      <Field label={h.location} value={data.location} placeholder={h.locationPh} onChange={(v) => set("location", v)} />
    </div>
  );
}
