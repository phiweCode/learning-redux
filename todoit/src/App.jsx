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
          <article className="todolist-container">
            <Outlet />
          </article>
          <DetailedTodo />
        </main>
    </>
  );
}

export default App;
