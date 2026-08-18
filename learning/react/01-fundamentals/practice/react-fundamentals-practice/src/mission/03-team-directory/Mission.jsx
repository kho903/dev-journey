const teams = [
  {
    id: 1,
    name: "Backend Team",
    isHiring: true,
    members: [
      {
        id: 101,
        name: "JIHUN",
        role: "Backend Developer",
        skills: ["Java", "Spring Boot"],
        isLeader: true,
      },
      {
        id: 102,
        name: "YUNA",
        role: "Backend Developer",
        skills: ["Java", "MySQL"],
        isLeader: false,
      },
    ],
  },
  {
    id: 2,
    name: "Frontend Team",
    isHiring: false,
    members: [
      {
        id: 201,
        name: "MINJI",
        role: "Frontend Developer",
        skills: ["JavaScript", "React"],
        isLeader: true,
      },
      {
        id: 202,
        name: "SORA",
        role: "Frontend Developer",
        skills: ["React", "CSS"],
        isLeader: false,
      },
    ],
  },
];

function Member({ name, role, skills, isLeader }) {
  return (
    <section>
      <ul>
        <li>{name}</li>
        <li>{role}</li>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
      {isLeader && <strong>Leader</strong>}
    </section>
  );
}

function Team({ name, isHiring, members }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{isHiring ? "Hiring" : "Not Hiring"}</p>

      {members.map((member) => (
        <Member
          key={member.id}
          name={member.name}
          role={member.role}
          skills={member.skills}
          isLeader={member.isLeader}
        />
      ))}
    </section>
  );
}

function TeamDirectoryMission() {
  return (
    <section>
      {teams.map((team) => (
        <Team
          key={team.id}
          name={team.name}
          isHiring={team.isHiring}
          members={team.members}
        />
      ))}
    </section>
  );
}

export default TeamDirectoryMission;
