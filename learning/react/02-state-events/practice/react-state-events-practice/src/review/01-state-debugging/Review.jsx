import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Learn Java", completed: true },
  { id: 2, title: "Learn React", completed: false },
  { id: 3, title: "Learn Spring Boot", completed: false },
];

function Review() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = totalCount - completedCount;

  const visibleTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
        ? tasks.filter((task) => task.completed)
        : tasks.filter((task) => !task.completed);

  function handleSubmit(event) {
    event.preventDefault();

    if (draft.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: draft.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setDraft("");
  }

  function handleToggle(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <section>
      <h1>Task Review</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div>
        <button onClick={() => setFilter("all")}>All</button>

        <button onClick={() => setFilter("completed")}>Completed</button>

        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {visibleTasks.length === 0 && <p>No tasks found</p>}

      {visibleTasks.map((task) => (
        <div key={task.id}>
          <p>
            {task.title} - {task.completed ? "Completed" : "Pending"}
          </p>

          <button onClick={() => handleToggle(task.id)}>Toggle</button>

          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}

      <div>
        <p>Total: {totalCount}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>
    </section>
  );
}

export default Review;
