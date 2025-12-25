"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Section {
  id: number;
  name: string;
  slug: string;
}

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch("/api/sections").then(res => res.json()).then(setSections);
  }, []);

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
