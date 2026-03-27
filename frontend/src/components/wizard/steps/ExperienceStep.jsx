import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import BulletListEditor from "../../ui/BulletListEditor.jsx";
import styles from "./Step.module.css";

const EMPTY = {
  title: "",
  company: "",
  location: "",
  dates: "",
  bullets: [],
};

export default function ExperienceStep({ data, onChange }) {
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel="Add position"
      renderItem={(item, update) => (
        <div className={styles.stack}>
          <div className={styles.grid2}>
            <Field
              label="Job Title"
              value={item.title}
              placeholder="Lead Data Analyst"
              onChange={(v) => update({ ...item, title: v })}
            />
            <Field
              label="Company"
              value={item.company}
              placeholder="Boston Consulting Group"
              onChange={(v) => update({ ...item, company: v })}
            />
            <Field
              label="Location"
              value={item.location}
              placeholder="Madrid, Spain"
              onChange={(v) => update({ ...item, location: v })}
            />
            <Field
              label="Dates"
              value={item.dates}
              placeholder="2025 -- Present"
              onChange={(v) => update({ ...item, dates: v })}
            />
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#444", marginBottom: "0.5rem" }}>
              Bullet Points
            </p>
            <BulletListEditor
              items={item.bullets}
              onChange={(v) => update({ ...item, bullets: v })}
              placeholder="Describe your achievement or responsibility..."
            />
          </div>
        </div>
      )}
    />
  );
}
