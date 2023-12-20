import React, {Fragment} from 'react'
import UserInput from '../userInput'
import { useDispatch, useSelector } from 'react-redux'
import TodoListItem from '../TodoListItem'

function MyDay() {

  const dispatch = useDispatch()
  const stateSample = useSelector((state)=>state.todos)
  const inMyDay = stateSample.filter(todo=>todo.todosDetails.isInMyDay)

  return (
    <Fragment >
      <section className="main-display-content">

        <header className='current-page-header'>
          <h1>My day</h1>
        </header>

        <article className='current-page-content'>
        {inMyDay.map((todo) =>
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

export default MyDay
