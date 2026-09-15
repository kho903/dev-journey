import { useState } from "react";

function ArrayState() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "JIHUN",
      active: true,
    },
    {
      id: 2,
      name: "MINJI",
      active: false,
    },
    {
      id: 3,
      name: "YUNA",
      active: true,
    },
  ]);

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

  function handleDelete(id) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }

  function handleAdd() {
    const newUser = {
      id: 4,
      name: "SORA",
      active: false,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
  }

  return (
    <section>
      <h1>User List</h1>

      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.name} - {user.active ? "Active" : "Inactive"}
          </p>

          <button onClick={() => handleToggle(user.id)}>Toggle</button>

          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}

      <button onClick={handleAdd}>Add User</button>
    </section>
  );
}

export default ArrayState;
