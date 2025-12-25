import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  section: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Props {
  params: { section: string };
}

async function getProjects(section: string): Promise<Project[]> {
  const res = await fetch(`http://localhost:3000/api/projects?section=${section}`, { cache: "no-store" });
  return res.json();
}

export default async function SectionPage({ params }: Props) {
  const projects = await getProjects(params.section);

  return (
    <div className="p-6">
      <Link href="/">← Back to Home</Link>
      <h1 className="text-3xl mb-6">{projects[0]?.section.name || "Section"} Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded">
            <h2 className="text-xl">{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}