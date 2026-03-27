import BulletListEditor from "../../ui/BulletListEditor.jsx";

export default function SummaryStep({ data, onChange }) {
  return (
    <BulletListEditor
      items={data}
      onChange={onChange}
      placeholder="e.g. Experienced data analyst specializing in Python backend development..."
    />
  );
}
