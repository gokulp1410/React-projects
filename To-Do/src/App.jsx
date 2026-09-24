import "./App.css";
import { useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");

  // Add Todo
  function addTodo() {
    if (toDo.trim() === "") {
      return;
    }

    setToDos([
      ...toDos,
      {
        id: Date.now(),
        text: toDo,
        status: false,
      },
    ]);

    // Clear input
    setToDo("");
  }

  // Delete Todo
  function deleteTodo(id) {
    setToDos(toDos.filter((todo) => todo.id !== id));
  }

  // Complete / Uncomplete Todo
  function toggleTodo(id) {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo,
      ),
    );
  }

  return (
    <div className="app">
      {/* Heading */}
      <div className="mainHeading">
        <h1>To_Do List</h1>
      </div>

      <div className="subHeading">
        <h2>Whoop, it's Monday 🌝 ☕</h2>
      </div>

      {/* Input */}
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          type="text"
          placeholder="🖊️ Add item..."
        />

        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>

      {/* Todo List */}
      <div className="todos">
        {toDos.length === 0 && (
          <p className="empty">No tasks yet. Add your first task!</p>
        )}

        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={obj.status}
                onChange={() => toggleTodo(obj.id)}
              />

              <p
                style={{
                  textDecoration: obj.status ? "line-through" : "none",
                  opacity: obj.status ? 0.5 : 1,
                }}
              >
                {obj.text}
              </p>
            </div>

            <div className="right">
              <i
                onClick={() => deleteTodo(obj.id)}
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Todos */}
      <div className="completed">
        <h2>Completed Tasks</h2>

        {toDos
          .filter((todo) => todo.status)
          .map((todo) => (
            <p key={todo.id}>✅ {todo.text}</p>
          ))}
      </div>
    </div>
  );
}

export default App;
