import { useState } from "react";
import WizardShell from "./components/wizard/WizardShell.jsx";
import HeaderStep from "./components/wizard/steps/HeaderStep.jsx";
import SummaryStep from "./components/wizard/steps/SummaryStep.jsx";
import EducationStep from "./components/wizard/steps/EducationStep.jsx";
import ExperienceStep from "./components/wizard/steps/ExperienceStep.jsx";
import ProjectsStep from "./components/wizard/steps/ProjectsStep.jsx";
import SkillsStep from "./components/wizard/steps/SkillsStep.jsx";
import { generateCV } from "./lib/api.js";

const EMPTY_CV = {
  header: { name: "", email: "", linkedin: "", location: "" },
  summary: [],
  education: [],
  experience: [],
  projects: [],
  skills: { "IT Skills": "", "Certifications": "", "Language Skills": "", "Activities": "" },
};

const STEPS = [
  { label: "Header",      key: "header" },
  { label: "Summary",     key: "summary" },
  { label: "Education",   key: "education" },
  { label: "Experience",  key: "experience" },
  { label: "Projects",    key: "projects" },
  { label: "Skills",      key: "skills" },
];

export default function App() {
  const [cvData, setCvData] = useState(EMPTY_CV);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setSection(key, value) {
    setCvData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

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

  const stepComponents = [
    <HeaderStep
      data={cvData.header}
      onChange={(v) => setSection("header", v)}
    />,
    <SummaryStep
      data={cvData.summary}
      onChange={(v) => setSection("summary", v)}
    />,
    <EducationStep
      data={cvData.education}
      onChange={(v) => setSection("education", v)}
    />,
    <ExperienceStep
      data={cvData.experience}
      onChange={(v) => setSection("experience", v)}
    />,
    <ProjectsStep
      data={cvData.projects}
      onChange={(v) => setSection("projects", v)}
    />,
    <SkillsStep
      data={cvData.skills}
      onChange={(v) => setSection("skills", v)}
    />,
  ];

  return (
    <WizardShell
      steps={STEPS}
      currentStep={step}
      onNext={next}
      onBack={back}
      onGenerate={handleGenerate}
      loading={loading}
      error={error}
    >
      {stepComponents[step]}
    </WizardShell>
  );
}
