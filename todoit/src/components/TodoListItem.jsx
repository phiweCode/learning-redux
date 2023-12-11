import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COMPLETE_TODO_ITEM, REMOVE_TODO_ITEM, SET_REMINDER, TOGGLE_REMINDER } from '../reducer'
import reminder from '../utils/reminder'

function TodoListItem({ id, todoText, completed, timestamp, reminders }) {

   /*  useEffect(()=>{
        let intervalId = setInterval(() => {

            console.log("still: ",reminder(reminders.dueReminder))
            reminder(reminders.dueReminder) ? clearInterval(intervalId) : ''
        }, 1000);

        if (reminders.isSet)
        {
            intervalId()
        }

        return ()=> clearInterval(intervalId)

    },[]) */

    const dispatch = useDispatch()

    const handleDelete = (e) => {
        dispatch({ "type": REMOVE_TODO_ITEM, "payload": id })
    }

    const handleCompletion = (e) => {
        console.log("Trying to complete")
        dispatch({"type": COMPLETE_TODO_ITEM, "payload": id})
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

    }

    const toggleReminder = () => {
        dispatch({"type": TOGGLE_REMINDER, "payload": {
            id: id,
        }})
    }

    return (
        <Fragment>
            <li key={id}>
                <article className='todo-item'>
                <div className='list-details'>

                    <article className='checkbox'>
                    <input type='checkbox' onChange={handleCompletion} checked={completed? true : false}/>
                    </article>

                    <article className='todo-text'>
                    <p>{todoText}</p>
                    </article>

                    <button onClick={handleDelete}>Delete</button>

                    <article className='reminder'>

                        {(reminders.isSet? <input type='datetime-local'
                        value={reminders.dueReminder.formattedDate}
                        id="datetime"
                        name="datetime"
                        onKeyDown={handleReminder}
                        onChange={handleReminder}
                    />
                    :
                    <span>No reminder</span>
                    )}

                    <button type='button' onClick={toggleReminder}> Switch</button>

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
