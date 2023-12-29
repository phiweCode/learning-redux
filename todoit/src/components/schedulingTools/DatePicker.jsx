import React, {Fragment, useState} from 'react'
import { useDispatch } from 'react-redux'
import { SET_DUE_DATE, SET_REMINDER } from '../../reducer'
import DatePicker from 'react-datepicker'

function DatePicking({activeTodo, scheduleType, handleCloseModal , customReminder}) {

  const [isClosed, setIsClosed] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [datetime, setDateTimes] = useState({
    date:activeTodo[0].todosDetails.reminderDate,
    time:activeTodo[0].todosDetails.reminderTime,
  })

  console.log("New date",startDate)

  const dispatch = useDispatch()

  const handleDateInput = (e) =>
  {
      setStartDate(e)
  }

  const handleClosing = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsClosed(true)

  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log("handle save", e)
    const activeTodoId = activeTodo[0].id


   switch(scheduleType)
   {

    case "custom-reminder":
       dispatch({
           "type": SET_REMINDER,
           "payload":{
           id: activeTodoId,
           dueDate: `${startDate.getDate()} / ${startDate.getMonth()} / ${startDate.getFullYear()}`,
           dueTime: `${startDate.getHours()}:${startDate.getMinutes()}`,
           formattedDate: "",
           type: "custom",
           }
       })

       break;

    case "custom-due-date":
      dispatch({
        "type": SET_DUE_DATE,
        "payload":{
        id: activeTodoId,
        dueDate: `${startDate.getDate()} / ${startDate.getMonth()} / ${startDate.getFullYear()}`,
        dueTime: `${startDate.getHours()}:${startDate.getMinutes()}`,
        formattedDate: "",
        type: "custom",
        }
    })
       break

    default:
       break;
   }
   setIsClosed(true)

  }

  return (
    <Fragment>
    {isClosed?
    <span></span>:
    <form>
        <article className='datepicker' >
        <DatePicker
        id="datePickerInput"
        selected={startDate}
        onChange={(e)=>handleDateInput(e)}
        inline
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
        </article>

        <article className='form-btn'>
           <button onClick={handleClosing}>Cancel</button>
           <button onClick={handleSave}>Save</button>
        </article>
    </form>



    }
    </Fragment>
  )
}

export default DatePicking
