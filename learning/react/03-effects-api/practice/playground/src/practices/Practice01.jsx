import { useEffect, useState } from "react";

function Timer({ delayMs }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Timer Setup:", delayMs);

    // TODO 1
    // setInterval() 생성
    // Functional State Update로 count 증가
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, delayMs);

    return () => {
      console.log("Timer Cleanup:", delayMs);

      // TODO 2
      // clearInterval()로 기존 Interval 정리
      clearInterval(intervalId);
    };
  }, [delayMs]);

  return (
    <div>
      <h2>Timer</h2>
      <p>Count: {count}</p>

      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("WindowWidth Setup");

    // TODO 3
    // resize 이벤트를 처리할 Handler 선언
    // window.addEventListener() 호출
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      console.log("WindowWidth Cleanup");

      // TODO 4
      // window.removeEventListener() 호출
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h2>Window Width</h2>
      <p>{width}px</p>
    </div>
  );
}

function Practice01() {
  const [showComponents, setShowComponents] = useState(true);
  const [delayMs, setDelayMs] = useState(1000);

  function handleToggle() {
    setShowComponents((prev) => !prev);
  }

  function handleDelayChange(event) {
    setDelayMs(Number(event.target.value));
  }

  return (
    <main>
      <h1>Effect Lifecycle Lab</h1>

      <button onClick={handleToggle}>
        {showComponents ? "Hide Components" : "Show Components"}
      </button>

      <label>
        Interval Delay:
        <select value={delayMs} onChange={handleDelayChange}>
          <option value={500}>500ms</option>
          <option value={1000}>1000ms</option>
          <option value={2000}>2000ms</option>
        </select>
      </label>

      {showComponents && (
        <section>
          <Timer delayMs={delayMs} />
          <WindowWidth />
        </section>
      )}
    </main>
  );
}

export default Practice01;
