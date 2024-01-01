import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'

function TodoList() {

  const todoList = useSelector((state) => state.todos)
  console.log("primary importance",todoList.todos.importance)

  return (
    <Fragment>
      <ul>
        {todoList.map((todo) =>
          <TodoListItem
            id={todo.id}
            todoText={todo.inputText}
            completed={todo.completed}
            timestamp={todo.timestamp}
            reminders = {todo.todosDetails.reminder}
            importance={todo.important}
            active={todo.selected}
            todosDetails = {todo.todosDetails}
          />
          ).reverse()}
      </ul>
    </Fragment>
  )
}

export default TodoList
