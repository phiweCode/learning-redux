import React, {Fragment, useState} from 'react'
import ModeHeader from '../../Layout/ModeHeader'
import UserInput from '../userInput'
import { useSelector } from 'react-redux'
import TodoListItem from '../TodoListItem'

function Tasks() {
  const todoList = useSelector((state) => state.todos)
  const [optionsState, setOptionState] = useState(false)

  const handleOptionsState = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setOptionState((prev)=>!prev)

  }

  return (
    <Fragment>
    <section className="main-display-content">

    <header className='current-page-header'>
      <article className="icon-and-label tasks">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
      </div>
      <h1>Tasks</h1>
      </article>

      <article className='more-options-main'>
          <article className="more-options-main-icon" >
            <svg
              onClick={handleOptionsState}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="6"
              viewBox="0 0 128 512"
            >
              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
            </svg>
            {
              optionsState ?
              <article className='more-options-main-display'>
                  <article className="sort-by-wrapper option-wrapper">
                  <article className='option-icon'>
                  <svg  xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>
                  </article>
                  <p>Sort by</p>
                  <article className='option-icon shevron'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                  </article>
                </article>

                <article className='theme-selections option-wrapper'>
                  <p>Themes</p>
                  <article className='color-themes-grid'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>


                  </article>
                </article>

                <article className='print-list option-wrapper'>
                <article className='option-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                  </article>
                  <span><p>Print list</p></span>
                </article>

                <article className='print-list option-wrapper'>
                  <article className="option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
                  </article>
                  <span><p>Email list</p></span>
                </article>

              </article>
              : ''
            }

          </article>
      </article>
    </header>

    <article className='current-page-content'>


    {todoList.map((todo) =>
      <TodoListItem
        id={todo?.id}
        todoText={todo?.inputText}
        completed={todo?.completed}
        timestamp={todo?.timestamp}
        reminders = {todo?.todosDetails.reminder}
        active={todo?.selected}
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
