import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="counter-app">
        <h2>Counter App</h2>
        <p>Count is {count}</p>

        <div className="counter-buttons">
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            Increment
          </button>

          <button type="button" onClick={() => setCount((count) => count - 1)}>
            Decrement
          </button>

          <button type="button" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
