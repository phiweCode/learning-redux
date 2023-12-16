import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COMPLETE_TODO_ITEM, REMOVE_TODO_ITEM, SET_REMINDER, TOGGLE_REMINDER, TOGGLE_SELECTION } from '../reducer'
import reminder from '../utils/reminder'

function TodoListItem({ id, todoText, completed, timestamp, reminders, active }) {

    const dispatch = useDispatch()

    const handleDelete = (e) => {
        dispatch({ "type": REMOVE_TODO_ITEM, "payload": id })
        e.stopPropagation()
    }

    const handleCompletion = (e) => {
        console.log("Trying to complete")
        dispatch({"type": COMPLETE_TODO_ITEM, "payload": id})
        e.stopPropagation()
    }

    const handleReminder = (e) =>
    {
        console.log(reminders, id, "reminder and id")
        console.log(e.target.value.split('T'))
        console.log(new Date().toLocaleString().split((',')))

        let setDateTime = e.target.value.toString().split('T')

        dispatch({"type": SET_REMINDER, "payload": {
        id: id,
        dueDate : setDateTime[0],
        dueTime : setDateTime[1],
        formattedDate: e.target.value,
        }})

        e.stopPropagation()
    }

    const toggleReminder = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch({"type": TOGGLE_REMINDER, "payload": {
            id: id,
        }})

    }

    const handleSelection = (e) => {

        dispatch({"type": TOGGLE_SELECTION, "payload": id})
        e.stopPropagation()
    }

    return (
    <Fragment>
        <li key={id}>
            <article
            className={ active ? 'active' :'todo-item'}
            onClick={handleSelection}>

                <div className='list-details'>
                    <article className='checkbox'>
                        <input type='checkbox' onChange={handleCompletion}  checked={completed? true : false}/>
                    </article>

                    <article className='todo-text'>
                        <p>{todoText}</p>
                    </article>

                    <article className='reminder'>
                        {(
                            reminders.isReminding ?
                            <input
                            type='datetime-local'
                            id="datetime"
                            name="datetime"
                            onClick={(e)=>e.stopPropagation()}
                            onKeyDown={handleReminder}
                            onChange={handleReminder}/>
                            :
                            <span>No reminder</span>
                        )}

                        <button type='button' onClick={toggleReminder}>
                            Switch
                        </button>
                    </article>

                    <button onClick={handleDelete}>Delete</button>
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
