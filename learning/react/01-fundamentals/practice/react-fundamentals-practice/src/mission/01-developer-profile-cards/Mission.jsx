const developers = [
  {
    id: 1,
    name: "JIHUN",
    role: "Backend Developer",
    skills: ["Java", "Spring Boot", "MySQL"],
    isActive: true,
  },
  {
    id: 2,
    name: "MINJI",
    role: "Frontend Developer",
    skills: ["JavaScript", "React", "CSS"],
    isActive: false,
  },
  {
    id: 3,
    name: "YUNA",
    role: "Full Stack Developer",
    skills: ["Java", "React", "Docker"],
    isActive: true,
  },
];

function DeveloperStatus({ name, role, skills, isActive }) {
  return (
    <section className="developer-status">
      <h2>{name}</h2>
      <p>{role}</p>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <p>{isActive ? "Active" : "Offline"}</p>
      {isActive && <button>Message</button>}
    </section>
  );
}

function DeveloperProfileMission() {
  return (
    <section>
      {developers.map((developer) => (
        <DeveloperStatus
          key={developer.id}
          name={developer.name}
          role={developer.role}
          skills={developer.skills}
          isActive={developer.isActive}
        />
      ))}
    </section>
  );
}

export default DeveloperProfileMission;
