import { useState, useCallback, useMemo } from "react";
import WizardShell from "./components/wizard/WizardShell.jsx";
import HeaderStep from "./components/wizard/steps/HeaderStep.jsx";
import SummaryStep from "./components/wizard/steps/SummaryStep.jsx";
import EducationStep from "./components/wizard/steps/EducationStep.jsx";
import ExperienceStep from "./components/wizard/steps/ExperienceStep.jsx";
import ProjectsStep from "./components/wizard/steps/ProjectsStep.jsx";
import SkillsStep from "./components/wizard/steps/SkillsStep.jsx";
import { generateCV } from "./lib/api.js";
import { t } from "./lib/i18n.js";

const EMPTY_CV = {
  header: { name: "", email: "", linkedin: "", location: "", extra: [] },
  summary: [],
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

export default function App() {
  const [cvData, setCvData] = useState(EMPTY_CV);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("en");

  const tr = t[lang];
  const maxStep = tr.steps.length - 1;

  const setSection = useCallback((key, value) => {
    setCvData((prev) => ({ ...prev, [key]: value }));
  }, []);

  function next() { if (step < maxStep) setStep((s) => s + 1); }
  function back() { if (step > 0) setStep((s) => s - 1); }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      await generateCV(cvData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const stepComponents = useMemo(() => [
    <HeaderStep data={cvData.header} onChange={(v) => setSection("header", v)} tr={tr} />,
    <SummaryStep data={cvData.summary} onChange={(v) => setSection("summary", v)} tr={tr} />,
    <EducationStep data={cvData.education} onChange={(v) => setSection("education", v)} tr={tr} />,
    <ExperienceStep data={cvData.experience} onChange={(v) => setSection("experience", v)} tr={tr} />,
    <ProjectsStep data={cvData.projects} onChange={(v) => setSection("projects", v)} tr={tr} />,
    <SkillsStep data={cvData.skills} onChange={(v) => setSection("skills", v)} tr={tr} />,
  ], [cvData, tr, setSection]);

  return (
    <WizardShell
      tr={tr}
      currentStep={step}
      onNext={next}
      onBack={back}
      onGenerate={handleGenerate}
      loading={loading}
      error={error}
      onLangToggle={() => setLang((l) => (l === "en" ? "zh" : "en"))}
    >
      {stepComponents[step]}
    </WizardShell>
  );
}
