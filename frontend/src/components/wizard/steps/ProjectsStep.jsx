import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import BulletListEditor from "../../ui/BulletListEditor.jsx";
import styles from "./Step.module.css";

const EMPTY = {
  name: "",
  role: "",
  date: "",
  bullets: [],
};

export default function ProjectsStep({ data, onChange }) {
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel="Add project"
      renderItem={(item, update) => (
        <div className={styles.stack}>
          <div className={styles.grid2}>
            <Field
              label="Project Name"
              value={item.name}
              placeholder="Google HashCode 2020"
              onChange={(v) => update({ ...item, name: v })}
            />
            <Field
              label="Role / Tech Stack"
              value={item.role}
              placeholder="Participant"
              hint="Shown after | separator"
              onChange={(v) => update({ ...item, role: v })}
            />
            <Field
              label="Date"
              value={item.date}
              placeholder="Feb. 2020"
              onChange={(v) => update({ ...item, date: v })}
            />
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#444", marginBottom: "0.5rem" }}>
              Bullet Points
            </p>
            <BulletListEditor
              items={item.bullets}
              onChange={(v) => update({ ...item, bullets: v })}
              placeholder="Describe what you built or accomplished..."
            />
          </div>
        </div>
      )}
    />
  );
}
