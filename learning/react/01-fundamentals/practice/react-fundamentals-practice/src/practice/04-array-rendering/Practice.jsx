const skills = [
  { id: 1, name: "Java", level: "Intermediate" },
  { id: 2, name: "Spring Boot", level: "Intermediate" },
  { id: 3, name: "React", level: "Beginner" },
];

function SkillItem({ name, level }) {
  return (
    <li>
      {name} - {level}
    </li>
  );
}

function ArrayRenderingPractice() {
  return (
    <ul>
      {skills.map((skill) => (
        <SkillItem key={skill.id} name={skill.name} level={skill.level} />
      ))}
    </ul>
  );
}

export default ArrayRenderingPractice;
