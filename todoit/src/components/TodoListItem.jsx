import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COMPLETE_TODO_ITEM, REMOVE_TODO_ITEM, SET_REMINDER, TOGGLE_IMPORTANCE, TOGGLE_REMINDER, TOGGLE_SELECTION } from '../reducer'


function TodoListItem({ id, todoText, completed, timestamp, active, todoDetails }) {

    const dispatch = useDispatch()
    const importanceStatus = useSelector((state)=>state.todos)
    const importance = importanceStatus.filter(todo=>todo?.id === id)

    console.log("importance status", importance[0].important)

    const handleCompletion = (e) =>
    {
        e.preventDefault()
        e.stopPropagation()
        console.log("Trying to complete")
        dispatch({"type": COMPLETE_TODO_ITEM, "payload": id})
    }

    const handleImportance = (e) => {

        console.log("importance toggled", importance)
        dispatch({
            "type": TOGGLE_IMPORTANCE,
            "payload": id
        })
        e.preventDefault()
        e.stopPropagation()
    }

    const handleSelection = (e) => {
        dispatch({"type": TOGGLE_SELECTION, "payload": id})
        e.stopPropagation()
    }

    return (
    <Fragment>
        <li key={id}>
            <article
            className={ active ? 'todo-item active' :'todo-item inactive'}
            onClick={handleSelection}>

                <div className='list-details'>
                    <article className='checkbox'>

                    <article className="completion-status"  onClick={handleCompletion}>
                    {completed ? (

                      <article className="incomplete-icons" >
                        <div className="first-complete"  >
                      <svg
                      className="checked-filled"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                    </div>
                    </article>


                    ) : (
                      <article className="incomplete-icons" >
                        <div className="first"  >

                          <svg
                            className="checked-hollow"
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                          </svg>

                        </div>
                        <div className="second" >

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            viewBox="0 0 512 512"
                          >
                            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                          </svg>

                        </div>
                      </article>
                    )}
                  </article>

                        <input type='checkbox'
                        onChange={(e)=>handleCompletion(e)}
                        checked={completed? true : false}/>
                    </article>

                    <article className='todo-text'>
                      {todoText}
                    </article>

                    <article className="importance-status" onClick={handleImportance}>
                    {importance[0].important ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 576 512"
                      >
                        <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                      </svg>
                    )}
                    </article>
                </div>

                <div className='timestamp'>
                    <p>{timestamp}</p>
                </div>
            </article>
        </li>
    </Fragment>
    )
}

export default TodoListItem
