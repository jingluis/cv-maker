import BulletListEditor from "../../ui/BulletListEditor.jsx";

export default function SummaryStep({ data, onChange, tr }) {
  return (
    <BulletListEditor
      items={data}
      onChange={onChange}
      placeholder={tr.summary.placeholder}
    />
  );
}
