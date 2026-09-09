import { useState } from "react";

function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <section>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
      {isOpen && <p>Content is visible</p>}
    </section>
  );
}

export default Toggle;
