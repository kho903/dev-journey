import { useState } from "react";

const initialTasks = [
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

function FinalReview() {
  const [tasks, setTasks] = useState(initialTasks);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const isEditing = editingId !== null;

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const pendingCount = totalCount - completedCount;

  const visibleTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
        ? tasks.filter((task) => task.completed)
        : tasks.filter((task) => !task.completed);

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
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title: trimmedTitle,
                category: form.category,
              }
            : task,
        ),
      );
    } else {
      const newTask = {
        id: Date.now(),
        title: trimmedTitle,
        category: form.category,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setForm(initialForm);
    setEditingId(null);
  }

  function handleToggle(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  }

  function handleDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleEdit(task) {
    setForm({
      title: task.title,
      category: task.category,
    });

    setEditingId(task.id);
  }

  function handleCancel() {
    setEditingId(null);
    setForm(initialForm);
  }

  return (
    <section>
      <h1>Final Task Management</h1>

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

        <button type="submit">{isEditing ? "Save Task" : "Add Task"}</button>

        {isEditing && (
          <button type="button" onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
      </form>

      <div>
        <h2>Filters</h2>

        <button type="button" onClick={() => setFilter("all")}>
          All
        </button>

        <button type="button" onClick={() => setFilter("completed")}>
          Completed
        </button>

        <button type="button" onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      <div>
        <h2>Task List</h2>

        {visibleTasks.length === 0 && <p>No tasks found</p>}

        {visibleTasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>

            <p>{categoryLabels[task.category]}</p>

            <p>{task.completed ? "Completed" : "Pending"}</p>

            <button type="button" onClick={() => handleToggle(task.id)}>
              Toggle
            </button>

            <button type="button" onClick={() => handleEdit(task)}>
              Edit
            </button>

            <button type="button" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Statistics</h2>

        <p>Total: {totalCount}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>
    </section>
  );
}

export default FinalReview;
