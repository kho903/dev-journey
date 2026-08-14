function UserCard({ name, role, age }) {
  return (
    <article className="user-card">
      <h2>{name}</h2>
      <p>{role}</p>
      <p>Age: {age}</p>
    </article>
  );
}

function PropsPractice() {
  return (
    <section>
      <UserCard name="JIHUN" role="Backend Developer" age={29} />
      <UserCard name="MINJI" role="Frontend Developer" age={27} />
    </section>
  );
}

export default PropsPractice;
