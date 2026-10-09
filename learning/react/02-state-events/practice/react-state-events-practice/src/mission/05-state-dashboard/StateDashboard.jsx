import { useState } from "react";

const initialProjects = [
  {
    id: 1,
    title: "Spring Security Lab",
    category: "backend",
    completed: true,
  },
  {
    id: 2,
    title: "React State Practice",
    category: "frontend",
    completed: false,
  },
  {
    id: 3,
    title: "Docker Deployment",
    category: "infra",
    completed: false,
  },
];

const initialForm = {
  title: "",
  category: "backend",
};

const categoryLabels = {
  backend: "Backend",
  frontend: "Frontend",
  infra: "Infrastructure",
};

function StateDashboard() {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const isEditing = editingId !== null;

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => project.completed,
  ).length;

  const pendingProjects = totalProjects - completedProjects;

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) =>
          filter === "completed" ? project.completed : !project.completed,
        );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = form.title.trim();

    if (trimmedTitle === "") {
      return;
    }

    if (isEditing) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingId
            ? {
                ...project,
                title: trimmedTitle,
                category: form.category,
              }
            : project,
        ),
      );
    } else {
      const newProject = {
        id: Date.now(),
        title: trimmedTitle,
        category: form.category,
        completed: false,
      };

      setProjects((prevProjects) => [...prevProjects, newProject]);
    }

    resetForm();
  }

  function handleToggle(id) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? {
              ...project,
              completed: !project.completed,
            }
          : project,
      ),
    );
  }

  function handleEdit(project) {
    setForm({
      title: project.title,
      category: project.category,
    });

    setEditingId(project.id);
  }

  function handleDelete(id) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id),
    );

    if (editingId === id) {
      resetForm();
    }
  }

  function handleCancel() {
    resetForm();
  }

  function resetForm() {
    setForm({
      ...initialForm,
    });

    setEditingId(null);
  }

  return (
    <section>
      <h1>Project Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
            <option value="infra">Infrastructure</option>
          </select>
        </label>

        <button type="submit">
          {isEditing ? "Save Project" : "Add Project"}
        </button>

        {isEditing && (
          <button type="button" onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
      </form>

      <div>
        <h2>Filter Projects</h2>

        <button
          type="button"
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>

        <button
          type="button"
          onClick={() => setFilter("pending")}
          disabled={filter === "pending"}
        >
          Pending
        </button>
      </div>

      <div>
        <h2>Project List</h2>

        {filteredProjects.length === 0 && <p>No projects found</p>}

        {filteredProjects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>

            <p>{categoryLabels[project.category]}</p>

            <p>{project.completed ? "Completed" : "Pending"}</p>

            <button type="button" onClick={() => handleToggle(project.id)}>
              Toggle
            </button>

            <button type="button" onClick={() => handleEdit(project)}>
              Edit
            </button>

            <button type="button" onClick={() => handleDelete(project.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Statistics</h2>

        <p>Total Projects: {totalProjects}</p>
        <p>Completed Projects: {completedProjects}</p>
        <p>Pending Projects: {pendingProjects}</p>
      </div>
    </section>
  );
}

export default StateDashboard;
