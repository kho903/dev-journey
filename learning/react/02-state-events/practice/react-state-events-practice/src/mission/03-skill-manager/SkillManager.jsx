import { useState } from "react";

const initialSkills = [
  {
    id: 1,
    name: "Java",
    learned: true,
  },
  {
    id: 2,
    name: "Spring Boot",
    learned: true,
  },
  {
    id: 3,
    name: "React",
    learned: false,
  },
];

function SkillManager() {
  const [skills, setSkills] = useState(initialSkills);
  const [skillName, setSkillName] = useState("");

  const totalSkills = skills.length;

  const learnedSkills = skills.filter((skill) => skill.learned).length;

  const learningSkills = totalSkills - learnedSkills;

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedSkillName = skillName.trim();

    if (trimmedSkillName === "") {
      return;
    }

    const newSkill = {
      id: Date.now(),
      name: trimmedSkillName,
      learned: false,
    };

    setSkills((prevSkills) => [...prevSkills, newSkill]);

    setSkillName("");
  }

  function handleToggle(id) {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              learned: !skill.learned,
            }
          : skill,
      ),
    );
  }

  function handleDelete(id) {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  }

  return (
    <section>
      <h1>Skill Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={skillName}
          onChange={(event) => setSkillName(event.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <div>
        {skills.map((skill) => (
          <div key={skill.id}>
            <p>
              {skill.name} - {skill.learned ? "Learned" : "Learning"}
            </p>

            <button type="button" onClick={() => handleToggle(skill.id)}>
              Toggle
            </button>

            <button type="button" onClick={() => handleDelete(skill.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <p>Total Skills: {totalSkills}</p>
        <p>Learned Skills: {learnedSkills}</p>
        <p>Learning Skills: {learningSkills}</p>
      </div>
    </section>
  );
}

export default SkillManager;
