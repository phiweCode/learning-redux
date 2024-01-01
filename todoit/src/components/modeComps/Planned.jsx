import React, {Fragment} from 'react'
import ModeHeader from '../../Layout/ModeHeader'
import ModeFooter from '../../Layout/ModeFooter'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import UserInput from '../userInput';
import TodoListItem from '../TodoListItem';
import { useSelector } from 'react-redux';



function Planned() {
  const [startDate, setStartDate] = useState(new Date());
  const todoListStore = useSelector(state=>state.todos)
  const todoList = todoListStore.filter(todo=>{
    if(
      todo.todosDetails.reminder.isReminding ||
      todo.todosDetails.dueDate.isDue ||
      todo.todosDetails.repeat.isRepeating
  ) return true
  })
  
  return (
    <Fragment>
    <section className="main-display-content">

    <header className='current-page-header'>
      <article className="icon-and-label tasks">
        <div>
        <svg className='planned-link' xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H224z"/></svg>
        </div>
        <h1>Planned</h1>
      </article>
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

export default Planned
