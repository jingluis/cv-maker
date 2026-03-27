import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

const DEFAULT_CATEGORIES = ["IT Skills", "Certifications", "Language Skills", "Activities"];

export default function SkillsStep({ data, onChange }) {
  function set(key, value) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className={styles.stack}>
      {DEFAULT_CATEGORIES.map((cat) => (
        <Field
          key={cat}
          label={cat}
          value={data[cat] ?? ""}
          multiline
          placeholder={
            cat === "IT Skills"
              ? "Python (Expert), Java (Proficient), C++ (Proficient)..."
              : cat === "Language Skills"
              ? "Spanish (Native), English (C1), Chinese (Native)..."
              : cat === "Certifications"
              ? "Cambridge Advanced English (Grade: 196/210)..."
              : "Google HashCode, HackUPC..."
          }
          onChange={(v) => set(cat, v)}
        />
      ))}
    </div>
  );
}
