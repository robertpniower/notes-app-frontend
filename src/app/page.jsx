"use client";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  console.log("🚀 Fetching projects from Rails...");

  fetch('http://localhost:3000/projects')
    .then(res => {
      console.log("📡 Response Received. Status:", res.status);
      if (!res.ok) {
        console.error("❌ Server returned an error status!");
      }
      return res.json();
    })
    .then(data => {
      console.log("✅ Data parsed successfully:", data);
      setProjects(data);
    })
    .catch(err => {
      console.error("🔥 Fetch error (Check if Rails is running or CORS is blocked):", err);
    });
}, []);
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Projects</h1>
      <div className="project-grid">
        {projects.map(project => (
          <div key={project.id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
            <h3>{project.title || project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
