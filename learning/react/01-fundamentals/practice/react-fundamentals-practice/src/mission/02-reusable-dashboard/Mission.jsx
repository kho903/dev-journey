const projects = [
  {
    id: 1,
    title: "JihunPage",
    tech: ["React", "Spring Boot", "MySQL"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "Dev Journey",
    tech: ["JavaScript", "React"],
    isFeatured: false,
  },
  {
    id: 3,
    title: "Home Library",
    tech: ["Java", "MySQL"],
    isFeatured: true,
  },
];

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="panel-content">{children}</div>
    </section>
  );
}

function ProjectCard({ title, tech, isFeatured }) {
  return (
    <section>
      <ul>
        <li>{title}</li>
        {tech.map((t) => {
          return <li key={t}>{t}</li>;
        })}
      </ul>
      {isFeatured && <p>Featured</p>}
    </section>
  );
}

function ReusableDashboardMission() {
  return (
    <section>
      <Panel title="Profile">
        <p>JIHUN</p>
        <p>Backend Developer</p>
        <p>Seoul</p>
      </Panel>
      <Panel title="Projects">
        {projects.map((project) => {
          return (
            <ProjectCard
              key={project.id}
              title={project.title}
              tech={project.tech}
              isFeatured={project.isFeatured}
            />
          );
        })}
      </Panel>
    </section>
  );
}

export default ReusableDashboardMission;
