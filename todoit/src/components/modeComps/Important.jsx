import React, {Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoListItem from '../TodoListItem'
import UserInput from '../userInput'

function Important() {;

  const important = useSelector(state=>state.todos)

  const importantTaskList = important.filter(todo=>todo.important)


  return (
    <Fragment>
    <section className="main-display-content">

    <header className='current-page-header'>
      <h1>Important</h1>
    </header>

    <article className='current-page-content'>
    {importantTaskList.map((todo) =>
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

export default Important
