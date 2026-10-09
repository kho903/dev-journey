import { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "JIHUN",
    role: "backend",
    active: true,
  },
  {
    id: 2,
    name: "MINJI",
    role: "frontend",
    active: false,
  },
  {
    id: 3,
    name: "YUNA",
    role: "fullstack",
    active: true,
  },
];

const initialForm = {
  name: "",
  role: "backend",
};

const roleLabels = {
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Full Stack",
};

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.active).length;
  const inactiveUsers = totalUsers - activeUsers;
  const isEditing = editingId !== null;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = form.name.trim();

    if (trimmedName === "") {
      return;
    }

    if (isEditing) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name: trimmedName,
                role: form.role,
              }
            : user,
        ),
      );
    } else {
      const newUser = {
        id: Date.now(),
        name: trimmedName,
        role: form.role,
        active: false,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    resetForm();
  }

  function handleToggle(id) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              active: !user.active,
            }
          : user,
      ),
    );
  }

  function handleEdit(user) {
    setForm({
      name: user.name,
      role: user.role,
    });

    setEditingId(user.id);
  }

  function handleDelete(id) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

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
      <h1>User Management</h1>

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
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
            <option value="fullstack">Full Stack</option>
          </select>
        </label>

        <button type="submit">{isEditing ? "Save User" : "Add User"}</button>

        {isEditing && (
          <button type="button" onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
      </form>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>

            <p>{roleLabels[user.role]}</p>

            <p>{user.active ? "Active" : "Inactive"}</p>

            <button type="button" onClick={() => handleToggle(user.id)}>
              Toggle
            </button>

            <button type="button" onClick={() => handleEdit(user)}>
              Edit
            </button>

            <button type="button" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <p>Total Users: {totalUsers}</p>
        <p>Active Users: {activeUsers}</p>
        <p>Inactive Users: {inactiveUsers}</p>
      </div>
    </section>
  );
}

export default UserManagement;
