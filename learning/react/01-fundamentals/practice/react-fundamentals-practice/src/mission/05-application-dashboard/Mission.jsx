const applications = [
  {
    id: 1,
    company: "NEZOT",
    position: "Backend Developer",
    status: "passed",
    technologies: ["Java", "Spring Boot", "MySQL"],
    interviews: [
      { id: 101, type: "Aptitude Test", completed: true },
      { id: 102, type: "Technical Interview", completed: false },
    ],
  },
  {
    id: 2,
    company: "TechFlow",
    position: "Java Developer",
    status: "pending",
    technologies: ["Java", "Docker"],
    interviews: [{ id: 201, type: "Document Review", completed: true }],
  },
  {
    id: 3,
    company: "CloudWorks",
    position: "Backend Engineer",
    status: "rejected",
    technologies: ["Spring Boot", "AWS"],
    interviews: [],
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

function Interview({ type, completed }) {
  return (
    <section>
      <p>
        {type} - {completed ? "Completed" : "Scheduled"}
      </p>
    </section>
  );
}

function Application({ company, position, status, technologies, interviews }) {
  return (
    <section>
      <h2>{company}</h2>
      <p>{position}</p>
      <p>
        {status === "passed"
          ? "Passed"
          : status === "pending"
            ? "Pending"
            : "Rejected"}
      </p>
      {status === "passed" && <button>Prepare Interview</button>}
      <h3>Technologies</h3>
      <ul>
        {technologies.map((technology) => {
          return <li key={technology}>{technology}</li>;
        })}
      </ul>
      <h3>Interviews</h3>
      {interviews.length === 0 ? (
        <p>No Interviews</p>
      ) : (
        interviews.map((interview) => {
          return (
            <Interview
              key={interview.id}
              type={interview.type}
              completed={interview.completed}
            />
          );
        })
      )}
    </section>
  );
}

function ApplicationDashboardMission() {
  return (
    <section>
      <Panel title="Applications">
        {applications.map((application) => {
          return (
            <Application
              key={application.id}
              company={application.company}
              position={application.position}
              status={application.status}
              technologies={application.technologies}
              interviews={application.interviews}
            />
          );
        })}
      </Panel>
    </section>
  );
}

export default ApplicationDashboardMission;
