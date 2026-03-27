import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

export default function HeaderStep({ data, onChange }) {
  function set(key, value) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className={styles.grid2}>
      <Field
        label="Full Name"
        value={data.name}
        placeholder="Jing Luis Cao"
        onChange={(v) => set("name", v)}
      />
      <Field
        label="Email"
        value={data.email}
        placeholder="you@example.com"
        onChange={(v) => set("email", v)}
      />
      <Field
        label="LinkedIn URL"
        value={data.linkedin}
        placeholder="https://linkedin.com/in/yourprofile"
        onChange={(v) => set("linkedin", v)}
      />
      <Field
        label="Location"
        value={data.location}
        placeholder="Barcelona, Spain"
        onChange={(v) => set("location", v)}
      />
    </div>
  );
}
