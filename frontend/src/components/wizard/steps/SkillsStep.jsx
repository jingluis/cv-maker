import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

export default function SkillsStep({ data, onChange, tr }) {
  const s = tr.skills;
  function set(key, value) { onChange({ ...data, [key]: value }); }

  return (
    <div className={styles.stack}>
      <Field label={s.itSkills} value={data["IT Skills"] ?? ""} multiline placeholder={s.itPh} onChange={(v) => set("IT Skills", v)} />
      <Field label={s.certs} value={data["Certifications"] ?? ""} multiline placeholder={s.certsPh} onChange={(v) => set("Certifications", v)} />
      <Field label={s.lang} value={data["Language Skills"] ?? ""} multiline placeholder={s.langPh} onChange={(v) => set("Language Skills", v)} />
      <Field label={s.activities} value={data["Activities"] ?? ""} multiline placeholder={s.activitiesPh} onChange={(v) => set("Activities", v)} />
    </div>
  );
}
