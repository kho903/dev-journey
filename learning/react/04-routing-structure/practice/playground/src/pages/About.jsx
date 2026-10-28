import { Link } from "react-router";

function About() {
  return (
    <section>
      <h1>About Page</h1>
      <p>Learn about this application.</p>

      <Link to="/">Back to Home</Link>
    </section>
  );
}

export default About;
