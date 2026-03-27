import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import BulletListEditor from "../../ui/BulletListEditor.jsx";
import styles from "./Step.module.css";

const EMPTY = { name: "", role: "", date: "", bullets: [] };

export default function ProjectsStep({ data, onChange, tr }) {
  const p = tr.projects;
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel={p.add}
      renderItem={(item, update) => (
        <div className={styles.stack}>
          <div className={styles.grid2}>
            <Field label={p.name} value={item.name} placeholder={p.namePh} onChange={(v) => update({ ...item, name: v })} />
            <Field label={p.role} value={item.role} placeholder={p.rolePh} hint={p.roleHint} onChange={(v) => update({ ...item, role: v })} />
            <Field label={p.date} value={item.date} placeholder={p.datePh} onChange={(v) => update({ ...item, date: v })} />
          </div>
          <p className={styles.sectionLabel}>{p.bullets}</p>
          <BulletListEditor items={item.bullets} onChange={(v) => update({ ...item, bullets: v })} placeholder={p.bulletPh} />
        </div>
      )}
    />
  );
}
