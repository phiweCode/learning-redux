import React, {Fragment} from 'react'

function Reminder() {

    const reminderOptions = (e) =>
    {
      const today = new Date()
      const formattedTime = new Date(today.getTime() +4 * 60 * 60 * 1000).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })


        switch(e)
        {
          case "later today":{

            dispatch({
              "type": SET_REMINDER,
              "payload":{
              id: id,
              dueDate: new Date(today.getFullYear(), today.getMonth(), (today.getDate())).toDateString(),
              dueTime: formattedTime,
              formattedDate: "",
              type: "today"
              }
            })

          break;
          }


          case "tommorow":{

            dispatch({
              "type": SET_REMINDER,
              "payload":{
              id: id,
              dueDate: new Date(today.getFullYear(), today.getMonth(), (today.getDate()+1)).toDateString(),
              dueTime: new Date(today.setHours(9,0)).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }),
              formattedDate: "",
              type: "tommorow",
              }
            })

          break;
          }

          case "next week":{

            dispatch({
              "type": SET_REMINDER,
              "payload":{
              id: id,
              dueDate: new Date(today.getFullYear(), today.getMonth(), (today.getDate()+7)).toDateString(),
              dueTime: new Date(today.setHours(9,0)).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }),
              formattedDate: "",
              type: "Next week",
              }
            })

          break;
          }

          case "custom":{

            setSelected({
              remindme: false,
              dueDate: false,
              repeat: false})

            setCustomReminder(true)

            console.log(extractTime(e), "extracted time")

            dispatch({
              "type": SET_REMINDER,
              "payload":{
              id: id,
              dueDate: new Date(today.getFullYear(), today.getMonth(), (today.getDate()+7)).toDateString(),
              dueTime: new Date(today.setHours(9,0)).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }),
              formattedDate: "",
              type: "custom",
              }
            })

          break;
          }



        }

    }

  return (
    <Fragment>
      <li className='detailed-customs'>

          <input type='radio' className='detail-option' id="remindme"  name="options"  onBlur={handleBlur}  onChange={checked}/>

          <label htmlFor='remindme'>
                {activeTodo[0].todosDetails.reminder.isReminding ?
                <article className='reminder-display'>
                    <span>
                      {`Remind me at ${activeTodo[0].todosDetails.reminder.reminderTime }`}
                    </span>
                    <span>
                      {activeTodo[0].todosDetails.reminder.type == "today" ? 'Today':
                      activeTodo[0].todosDetails.reminder.type == "tommorow" ? 'Tommorow':
                      activeTodo[0].todosDetails.reminder.type == "Next week" ? 'Next week'
                      :'' }
                    </span>
                </article>
                :
                "Reminder"}
          </label>

          {( selected.remindme ?
          <article className='detailed-set-reminders'>
            <ul>
                <button onClick={()=>setSelected({
                remindme: false,
                dueDate: false,
                repeat: false})}>
                close
                </button>

                <li onClick={()=>reminderOptions("later today")}>Later today</li>
                <li onClick={()=>reminderOptions("tommorow")}>Tommorow </li>
                <li onClick={()=>reminderOptions("next week")}>Next week</li>
                <li onClick={()=>reminderOptions("custom")}>Set date and time</li>
            </ul>
          </article>
          : customReminder ?
          <span>
            <article className='custom-reminder detailed-set-reminders'>
                  <input type="datetime-local" onChange={extractTime}  onKeyDown={()=>reminderOptions("custom")}/>
            </article>
          </span> :
          <span></span>
          )}

      </li>
    </Fragment>
  )
}

export default Reminder
