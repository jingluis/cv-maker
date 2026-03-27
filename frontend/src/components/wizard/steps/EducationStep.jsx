import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

const EMPTY = {
  institution: "",
  location: "",
  degree: "",
  dates: "",
  note: "",
};

export default function EducationStep({ data, onChange }) {
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel="Add education"
      renderItem={(item, update) => (
        <div className={styles.grid2}>
          <Field
            label="Institution"
            value={item.institution}
            placeholder="ETH Zürich"
            onChange={(v) => update({ ...item, institution: v })}
          />
          <Field
            label="Location"
            value={item.location}
            placeholder="Zürich, Switzerland"
            onChange={(v) => update({ ...item, location: v })}
          />
          <Field
            label="Degree"
            value={item.degree}
            placeholder="Bachelor of Computer Science"
            onChange={(v) => update({ ...item, degree: v })}
          />
          <Field
            label="Dates"
            value={item.dates}
            placeholder="Sep. 2020 -- Feb 2021"
            onChange={(v) => update({ ...item, dates: v })}
          />
          <Field
            label="Note (optional)"
            value={item.note}
            placeholder="GPA: 9/10 (Ranked 12th of 323)"
            hint="Shown in bold below the degree line"
            onChange={(v) => update({ ...item, note: v })}
          />
        </div>
      )}
    />
  );
}
