import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

const EMPTY = { institution: "", location: "", degree: "", dates: "", note: "" };

export default function EducationStep({ data, onChange, tr }) {
  const e = tr.education;
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel={e.add}
      renderItem={(item, update) => (
        <div className={styles.grid2}>
          <Field label={e.institution} value={item.institution} placeholder={e.institutionPh} onChange={(v) => update({ ...item, institution: v })} />
          <Field label={e.location} value={item.location} placeholder={e.locationPh} onChange={(v) => update({ ...item, location: v })} />
          <Field label={e.degree} value={item.degree} placeholder={e.degreePh} onChange={(v) => update({ ...item, degree: v })} />
          <Field label={e.dates} value={item.dates} placeholder={e.datesPh} onChange={(v) => update({ ...item, dates: v })} />
          <Field label={e.note} value={item.note} placeholder={e.notePh} hint={e.noteHint} onChange={(v) => update({ ...item, note: v })} />
        </div>
      )}
    />
  );
}
