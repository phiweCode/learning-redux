import { useState } from "react";
import "./App.css";
import store from "./store";
import TodoList from "./components/TodoList";
import UserInput from "./components/userInput";

function App() {


  return (
    <>
        <main className="main">
          <article className="main-content">

              <article className="user-input-container">
                <UserInput />
              </article>

              <article className="todolist-container">
                <TodoList />
              </article>

          </article>
        </main>
    </>
  );
}

export default App;
