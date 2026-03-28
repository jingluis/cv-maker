import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import styles from "./Step.module.css";

const EMPTY = { title: "", content: "" };

export default function SkillsStep({ data, onChange, tr }) {
  const s = tr.skills;
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel={s.add}
      renderItem={(item, update) => (
        <div className={styles.stack}>
          <Field
            label={s.blockTitle}
            value={item.title}
            placeholder={s.blockTitlePh}
            onChange={(v) => update({ ...item, title: v })}
          />
          <Field
            label={s.blockContent}
            value={item.content}
            placeholder={s.blockContentPh}
            multiline
            onChange={(v) => update({ ...item, content: v })}
          />
        </div>
      )}
    />
  );
}
