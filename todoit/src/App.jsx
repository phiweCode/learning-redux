import { useState } from "react";
import "./App.css";
import store from "./store";
import TodoList from "./components/TodoList";
import UserInput from "./components/userInput";
import DetailedTodo from "./components/DetailedTodo";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {


  return (
    <>
        <main className="main">
          <Header />
          <article className="main-content">

              <article className="todolist-container">
               {/*  <TodoList /> */}
                <Outlet />
              </article>

          </article>
          <aside className="todo-detail">
            <DetailedTodo />
          </aside>
        </main>
    </>
  );
}

export default App;
