import React, {Fragment} from 'react'
import ModeHeader from '../../Layout/ModeHeader'
import UserInput from '../userInput'
import { useSelector } from 'react-redux'
import TodoListItem from '../TodoListItem'

function Tasks() {
  const todoList = useSelector((state) => state.todos)

  return (
    <Fragment>
    <section className="main-display-content">

    <header className='current-page-header'>
      <h1>Tasks</h1>
    </header>

    <article className='current-page-content'>
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
    </article>

    <footer className='current-page-footer'>
      <UserInput />
    </footer>

  </section>
    </Fragment>
  )
}

export default Tasks
