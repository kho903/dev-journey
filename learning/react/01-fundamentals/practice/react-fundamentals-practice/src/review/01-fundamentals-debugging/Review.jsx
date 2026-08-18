const users = [
  {
    id: 1,
    name: "JIHUN",
    skills: ["Java", "Spring Boot"],
    isActive: true,
  },
  {
    id: 2,
    name: "MINJI",
    skills: ["JavaScript", "React"],
    isActive: false,
  },
];

function UserCard({ name, skills, isActive }) {
  return (
    <section>
      <h2>{name}</h2>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
      <p>{isActive ? "Active" : "Offline"}</p>

      {isActive && <button>Message</button>}
    </section>
  );
}

function UserReview() {
  return (
    <section className="users">
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          skills={user.skills}
          isActive={user.isActive}
        />
      ))}
    </section>
  );
}

export default UserReview;
