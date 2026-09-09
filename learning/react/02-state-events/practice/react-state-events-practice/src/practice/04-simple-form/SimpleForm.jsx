import { useState } from "react";

function SimpleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submittedUser, setSubmittedUser] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      setError("Please fill in all fields");
      return;
    }

    setSubmittedUser({
      name,
      email,
    });

    setError("");
    setName("");
    setEmail("");
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {error && <p>{error}</p>}

      {submittedUser && (
        <div>
          <p>Name: {submittedUser.name}</p>
          <p>Email: {submittedUser.email}</p>
        </div>
      )}
    </section>
  );
}

export default SimpleForm;
