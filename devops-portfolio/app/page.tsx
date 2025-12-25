import Link from "next/link";

interface Section {
  id: number;
  name: string;
  slug: string;
}

async function getSections(): Promise<Section[]> {
  const res = await fetch("http://localhost:3000/api/sections", { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const sections = await getSections();

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">DevOps Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link key={section.id} href={`/projects/${section.slug}`}>
            <div className="border p-4 rounded hover:bg-gray-100">
              <h2 className="text-xl">{section.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
