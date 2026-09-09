import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount((count) => count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  function handleDecrease() {
    setCount((count) => count - 1);
  }

  return (
    <section>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDecrease}>Decrease</button>
    </section>
  );
}

export default Counter;
