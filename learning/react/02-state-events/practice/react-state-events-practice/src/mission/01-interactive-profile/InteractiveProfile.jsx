import { useState } from "react";

const initialProfile = {
  name: "JIHUN",
  role: "Backend Developer",
  introduction: "Java and Spring Boot developer",
};

function InteractiveProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState({ ...initialProfile });
  const [isEditing, setIsEditing] = useState(false);

  const displayName =
    profile.name.trim() === "" ? "Unknown User" : profile.name;

  function handleEdit() {
    setForm({ ...profile });
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setProfile({ ...form });
    setIsEditing(false);
  }

  function handleCancel() {
    setForm({ ...profile });
    setIsEditing(false);
  }

  return (
    <section>
      <h1>Interactive Profile</h1>

      {isEditing ? (
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
            Role
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
          </label>

          <label>
            Introduction
            <textarea
              name="introduction"
              value={form.introduction}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Save</button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h2>{displayName}</h2>
          <p>{profile.role}</p>
          <p>{profile.introduction}</p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default InteractiveProfile;
