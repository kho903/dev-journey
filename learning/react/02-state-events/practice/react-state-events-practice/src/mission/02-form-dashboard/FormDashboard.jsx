import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  role: "backend",
};

function FormDashboard() {
  const [form, setForm] = useState(initialForm);
  const [submittedUser, setSubmittedUser] = useState(null);
  const [error, setError] = useState("");

  const isFormValid = form.name.trim() !== "" && form.email.trim() !== "";

  const roleLabels = {
    backend: "Backend",
    frontend: "Frontend",
    fullstack: "Full Stack",
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      setError("Please fill in all fields");
      return;
    }

    setSubmittedUser({
      ...form,
    });

    setError("");
    setForm(initialForm);
  }

  return (
    <section>
      <h1>User Registration</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
            <option value="fullstack">Full Stack</option>
          </select>
        </label>

        <p>Name Length: {form.name.length}</p>

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>

      {error && <p>{error}</p>}

      {submittedUser && (
        <div>
          <h2>Submitted User</h2>

          <p>Name: {submittedUser.name}</p>
          <p>Email: {submittedUser.email}</p>
          <p>Role: {roleLabels[submittedUser.role]}</p>
        </div>
      )}
    </section>
  );
}

export default FormDashboard;
