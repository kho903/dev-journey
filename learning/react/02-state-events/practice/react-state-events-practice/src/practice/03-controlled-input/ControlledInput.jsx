import { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <section>
      <input type="text" value={name} onChange={handleChange} />

      <p>{name.trim() === "" ? "Please enter your name" : `Hello, ${name}`}</p>
      <p>Length: {name.length}</p>
    </section>
  );
}
export default ControlledInput;
