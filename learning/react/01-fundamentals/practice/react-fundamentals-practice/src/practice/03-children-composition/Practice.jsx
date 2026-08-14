function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </section>
  );
}

function ChildrenPractice() {
  return (
    <section>
      <Card title="Profile">
        <p>Name: JIHUN</p>
        <p>Role: Backend Developer</p>
      </Card>
      <Card title="Skills">
        <ul>
          <li>Java</li>
          <li>Spring Boot</li>
          <li>React</li>
        </ul>
      </Card>
    </section>
  );
}

export default ChildrenPractice;
