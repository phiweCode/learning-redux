import React, {Fragment, useState} from 'react'
import { useDispatch } from 'react-redux'
import { SET_REMINDER } from '../../reducer'

function DatePicker({activeTodo, scheduleType, handleCloseModal , customReminder}) {

  const [isClosed, setIsClosed] = useState(false)
  const [datetime, setDateTimes] = useState({
    date:activeTodo[0].todosDetails.reminderDate,
    time:activeTodo[0].todosDetails.reminderTime,
  })

  const dispatch = useDispatch()

  const handleDateInput = (e) =>
  {
    e.preventDefault()
    const {name, value} = e.target
    setDateTimes((datetime)=>({
    ...datetime, [name]: value
    }))
  }

  const handleClosing = (e) => {
    e.preventDefault()
    setIsClosed(true)

  }

  const handleSave = (e) => {

    e.preventDefault()
    const activeTodoId = activeTodo[0].id

   switch(scheduleType)
   {

    case "custom-reminder":
       dispatch({
           "type": SET_REMINDER,
           "payload":{
           id: activeTodoId,
           dueDate: datetime.date,
           dueTime: datetime.time,
           formattedDate: "",
           type: "custom",
           }
       })

       break;

    case "custom-due-date":
       break

    default:
       break;
   }

  }

  return (
    <Fragment>
    {isClosed?
    <span></span>:
    <form>
        <article className="date">
            <input type='date' name="date" id="date" value={activeTodo[0].todosDetails.reminderDate} onChange={handleDateInput}/>
        </article>
        <article className="time">
            <input type="time" name="time" id="time" value={activeTodo[0].todosDetails.reminderTime} onChange={handleDateInput}/>
        </article>
        <article className='form-btn'>
            <span><button onClick={handleClosing}>Cancel</button></span>
            <span><button onClick={handleSave}>Save</button></span>
        </article>
    </form>

    }
    </Fragment>
  )
}

export default DatePicker
