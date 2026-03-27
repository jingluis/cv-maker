import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import BulletListEditor from "../../ui/BulletListEditor.jsx";
import styles from "./Step.module.css";

const EMPTY = { title: "", company: "", location: "", dates: "", bullets: [] };

export default function ExperienceStep({ data, onChange, tr }) {
  const e = tr.experience;
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel={e.add}
      renderItem={(item, update) => (
        <div className={styles.stack}>
          <div className={styles.grid2}>
            <Field label={e.jobTitle} value={item.title} placeholder={e.titlePh} onChange={(v) => update({ ...item, title: v })} />
            <Field label={e.company} value={item.company} placeholder={e.companyPh} onChange={(v) => update({ ...item, company: v })} />
            <Field label={e.location} value={item.location} placeholder={e.locationPh} onChange={(v) => update({ ...item, location: v })} />
            <Field label={e.dates} value={item.dates} placeholder={e.datesPh} onChange={(v) => update({ ...item, dates: v })} />
          </div>
          <p className={styles.sectionLabel}>{e.bullets}</p>
          <BulletListEditor items={item.bullets} onChange={(v) => update({ ...item, bullets: v })} placeholder={e.bulletPh} />
        </div>
      )}
    />
  );
}
