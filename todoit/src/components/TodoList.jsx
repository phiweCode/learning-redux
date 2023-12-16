import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'

function TodoList() {
  const todoList = useSelector((state) => state.todos)
  console.log(todoList)

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
            active={todo.selected}
          />
          ).reverse()}
      </ul>
    </Fragment>
  )
}

export default TodoList
