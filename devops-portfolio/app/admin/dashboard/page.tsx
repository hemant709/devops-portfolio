"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Section {
  id: number;
  name: string;
  slug: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  sectionId: number;
}

export default function Dashboard() {
  const [sections, setSections] = useState<Section[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newSection, setNewSection] = useState({ name: "", slug: "" });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    githubUrl: "",
    sectionId: "",
  });
  const [resumeUrl, setResumeUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/admin/login");

    fetchSections();
    fetchProjects();
    fetchResume();
  }, []);

  const fetchSections = async () => {
    const res = await fetch("/api/sections");
    const data = await res.json();
    setSections(data);
  };

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const fetchResume = async () => {
    const res = await fetch("/api/resume");
    const data = await res.json();
    if (data) setResumeUrl(data.fileUrl);
  };

  const addSection = async () => {
    const token = localStorage.getItem("token");
    await fetch("/api/sections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(newSection),
    });
    setNewSection({ name: "", slug: "" });
    fetchSections();
  };

  const addProject = async () => {
    const token = localStorage.getItem("token");
    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify({ ...newProject, sectionId: parseInt(newProject.sectionId) }),
    });
    setNewProject({ title: "", description: "", githubUrl: "", sectionId: "" });
    fetchProjects();
  };

  const updateResume = async () => {
    await fetch("/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl: resumeUrl }),
    });
    fetchResume();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Sections</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newSection.name}
            onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Slug"
            value={newSection.slug}
            onChange={(e) => setNewSection({ ...newSection, slug: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={addSection} className="bg-green-500 text-white p-2">
            Add Section
          </button>
        </div>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>{s.name} ({s.slug})</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Projects</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={newProject.githubUrl}
            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
            className="border p-2 mr-2"
          />
          <select
            value={newProject.sectionId}
            onChange={(e) => setNewProject({ ...newProject, sectionId: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button onClick={addProject} className="bg-green-500 text-white p-2">
            Add Project
          </button>
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              {p.title} - {p.description} ({p.githubUrl})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Resume</h2>
        <input
          type="text"
          placeholder="Resume File URL"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={updateResume} className="bg-blue-500 text-white p-2">
          Update Resume
        </button>
      </div>
    </div>
  );
}