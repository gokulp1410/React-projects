import "./App.css";

import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <section className="showhide">
        <h2>Show Hide App</h2>
        <button type="button" onClick={() =>  setShow((show) => !show)}>
           {show ? "Hide Message" : "Show Message"}
        </button>
        {show && <p> Hello React!</p>}
      </section>
    </>
  );
}

export default App;
