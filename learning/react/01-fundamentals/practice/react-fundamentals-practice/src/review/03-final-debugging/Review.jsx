const projects = [
  {
    id: 1,
    title: "JihunPage",
    technologies: ["React", "Spring Boot"],
    status: "active",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Home Library",
    technologies: ["Java", "MySQL"],
    status: "inactive",
    isFeatured: false,
  },
];

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Project({ title, technologies, status, isFeatured }) {
  return (
    <Panel title={title}>
      <ul>
        {technologies.map((technology) => {
          return <li key={technology}>{technology}</li>;
        })}
      </ul>

      <p>{status === "active" ? "Active" : "Inactive"}</p>

      {isFeatured && <strong>Featured</strong>}
    </Panel>
  );
}

function ProjectList() {
  return (
    <section>
      {projects.map((project) => {
        return (
          <Project
            key={project.id}
            title={project.title}
            technologies={project.technologies}
            status={project.status}
            isFeatured={project.isFeatured}
          />
        );
      })}
    </section>
  );
}

export default ProjectList;
