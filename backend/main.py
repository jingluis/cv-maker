import os
import subprocess
import tempfile
import shutil
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from jinja2 import Environment, FileSystemLoader
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "https://jingl-ll.github.io",
        "https://cv-maker-jing.duckdns.org",
    ],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

TEMPLATE_DIR = Path(__file__).parent
jinja_env = Environment(
    loader=FileSystemLoader(str(TEMPLATE_DIR)),
    autoescape=False,
    block_start_string="<<",
    block_end_string=">>",
    variable_start_string="<{",
    variable_end_string="}>",
    comment_start_string="<#",
    comment_end_string="#>",
)


# ---------- Pydantic models ----------

class BulletItem(BaseModel):
    text: str = ""
    bold: bool = False


class ExtraField(BaseModel):
    label: str = ""
    value: str = ""

class Header(BaseModel):
    name: str = ""
    email: str = ""
    linkedin: str = ""
    location: str = ""
    extra: list[ExtraField] = []


class EducationEntry(BaseModel):
    institution: str = ""
    location: str = ""
    degree: str = ""
    dates: str = ""
    note: str = ""


class ExperienceEntry(BaseModel):
    title: str = ""
    company: str = ""
    location: str = ""
    dates: str = ""
    bullets: list[BulletItem] = []


class ProjectEntry(BaseModel):
    name: str = ""
    role: str = ""
    date: str = ""
    bullets: list[BulletItem] = []


class CVData(BaseModel):
    header: Header = Header()
    summary: list[BulletItem] = []
    education: list[EducationEntry] = []
    experience: list[ExperienceEntry] = []
    projects: list[ProjectEntry] = []
    skills: list[dict] = []


# ---------- LaTeX escaping ----------

_LATEX_ESCAPE = [
    ("\\", "\\textbackslash{}"),
    ("&",  "\\&"),
    ("%",  "\\%"),
    ("$",  "\\$"),
    ("#",  "\\#"),
    ("_",  "\\_"),
    ("{",  "\\{"),
    ("}",  "\\}"),
    ("~",  "\\textasciitilde{}"),
    ("^",  "\\textasciicircum{}"),
]

def tex(value: str) -> str:
    """Escape a string for safe inclusion in LaTeX."""
    # Handle backslash first to avoid double-escaping
    result = value.replace("\\", "\\textbackslash{}")
    for char, replacement in _LATEX_ESCAPE[1:]:
        result = result.replace(char, replacement)
    return result


# ---------- Endpoint ----------

@app.post("/api/generate")
async def generate_cv(data: CVData):
    tmpdir = tempfile.mkdtemp()
    try:
        template = jinja_env.get_template("template.tex.j2")
        rendered = template.render(cv=data, tex=tex)

        tex_path = os.path.join(tmpdir, "cv.tex")
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(rendered)

        for _ in range(2):
            result = subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "cv.tex"],
                cwd=tmpdir,
                capture_output=True,
                text=True,
            )
            if result.returncode != 0:
                raise HTTPException(
                    status_code=500,
                    detail=f"pdflatex failed:\n{result.stdout[-2000:]}",
                )

        pdf_path = os.path.join(tmpdir, "cv.pdf")
        if not os.path.exists(pdf_path):
            raise HTTPException(status_code=500, detail="PDF was not produced.")

        # Copy PDF out of tmpdir so we can clean up and still serve it
        out_path = os.path.join(tempfile.gettempdir(), "cv_output.pdf")
        shutil.copy(pdf_path, out_path)
        return FileResponse(
            out_path,
            media_type="application/pdf",
            filename="cv.pdf",
        )
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)
