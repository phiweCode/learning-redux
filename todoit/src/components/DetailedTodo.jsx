import React, {Fragment, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_NOTE, ADD_STEPS, SET_REMINDER, TOGGLE_ADD_TO_MY_DAY } from '../reducer'
import Reminder from './schedulingTools/Reminder'


function DetailedTodo() {

  const dispatch = useDispatch()
  const [steps, setSteps] = useState('')
  const [customReminder, setCustomReminder] = useState(false)
  const getTodoDetails = useSelector((state)=>state.todos)
  const [selected, setSelected] = useState({
    remindme: false,
    dueDate: false,
    repeat: false,
  })

  const activeTodo = getTodoDetails.filter(active=>active.selected == true)
  const note = activeTodo[0]?.notes
  const id = activeTodo[0]?.id

  console.log("active todo", activeTodo[0]?.todosDetails.steps)

  const handleStepSubmit = (e) => {
    e.preventDefault()
    dispatch({"type": ADD_STEPS, "payload": {
        "id": activeTodo[0].id ,
        "steps" : steps
    }})
    setSteps('')
  }

  const checked = (e) => {

    const checkedOption = document.querySelectorAll('[name="options"')

    console.log(checkedOption)

    checkedOption.forEach((elem)=> {
      if(elem.checked)
      {

        switch(elem.id)
        {
            case 'remindme':
             setSelected({
              remindme: !selected.remindme,
              dueDate: false,
              repeat: false,
            })
             break;

            case 'due-date':
              setSelected({
                remindme: false,
                dueDate:  !selected.dueDate,
                repeat: false,
              })
              break;

            case 'repeat':
              setSelected({
                remindme: false,
                dueDate: false,
                repeat: !selected.repeat,
              })
              break;

            default:
              break;
        }

      }
  })
  }

  const handleBlur = (e) => {
    e.preventDefault()
    e.target.checked = false
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    dispatch({"type": ADD_NOTE, "payload":{
      id: activeTodo[0].id,
      note: e.target.value
    }})
  }

  const extractTime = (e) => {
    e.preventDefault()
    return e.target.value.toString().split('T')
  }

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

  const handleClose = (e) => {
    setCustomReminder(true)
    setSelected({
      remindme: false,
      dueDate: false,
      repeat: false})
  }

  const addToMyDay = (e) => {
    e.preventDefault()
    dispatch({
      "type": TOGGLE_ADD_TO_MY_DAY,
      "payload": id
    })
  }


  return (

    <Fragment>

    {(activeTodo.length != 0 ?

    <section className='detailed-todo-section'>
      <article className="detailed-todo-container">

          <article className='detailed-todo-elements'>
              <h2> {activeTodo[0].inputText} </h2>
              <article className='steps'>
              <button type='button' onClick={handleStepSubmit}>
              add
              </button>
                  <label htmlFor='step-input'>
                    +
                  </label>
                  <input type='text' id='step-input' name='step-input' value={steps} onChange={(e=>{
                      e.preventDefault()
                      setSteps(e.target.value)
                  })}/>

                  <ul>

                  {activeTodo[0].todosDetails.steps.map((step, idx)=><li key={activeTodo[0].id + 10255 + idx}>{step}</li>) }

                  </ul>
              </article>
          </article>

          <article className="detailed-todo-elements" onClick={addToMyDay}>
              <span>Add to my day</span>
          </article>

          <article id="edit-reminders" className='detailed-todo-elements'>
            <ul className='set-schedule'>

             {/*} <li className='detailed-customs'>

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
                        <li onClick={()=>reminderOptions("custom")}>Set date and time
                        </li>

                    </ul>
                  </article>
                  : customReminder ?
                  <span>
                    <article className='custom-reminder detailed-set-reminders'>
                          <input type="datetime-local" onChange={extractTime}  onKeyDown={()=>reminderOptions("custom")}/>
                    </article>
                  </span> : <span></span>
                  )}
                          </li> */}

              <Reminder
                handleBlur={handleBlur}
                checked = {checked}
                activeTodo={activeTodo}
                selected={selected}
                extractTime={extractTime}
                customReminder={customReminder}
                handleClose={handleClose}
                handleCustomReminder={handleClose}
            />



              <li className='detailed-customs'>

                  <input type='radio' className='detail-option'  onBlur={handleBlur} id="due-date"  name="options" onChange={checked}/>

                  <label htmlFor='due-date'>set due date</label>

                  {( selected.dueDate ?
                    <article className='detailed-set-reminders'>
                      <ul>
                          <button onClick={()=>setSelected({
                            remindme: false,
                            dueDate: false,
                            repeat: false,})}> close</button>
                          <li>Later today</li>
                          <li>Tommorow </li>
                          <li>Next week</li>
                          <li>Set date and time </li>
                      </ul>
                    </article>
                    : <span></span>)}
              </li>

              <li className='detailed-customs'>

                  <input type='radio' className='detail-option'  onBlur={handleBlur} id="repeat"  name="options" onChange={checked}/>

                  <label htmlFor='repeat'>repeat </label>

                  {( selected.repeat ?
                    <article className='detailed-set-reminders'>
                      <ul>
                          <button onClick={()=>setSelected({
                            remindme: false,
                            dueDate: false,
                            repeat: false,})}> close</button>
                          <li>daily</li>
                          <li>weekdays </li>
                          <li>weekly</li>
                          <li>monthly</li>
                      </ul>
                      </article>
                    : <span></span>)}
              </li>

            </ul>
          </article>


          <article className='detailed-todo-elements'>
              <h3>Add file</h3>
              <input type='file' accept=".jpg, .png" />
          </article>

          <article className='detailed-todo-elements'>
              <h3>Add note</h3>
              <textarea value={note} onChange={handleAddNote}  rows="4" cols="40">
              </textarea>
          </article>

      </article>

      </section> : ''

    )}

    </Fragment>
  )
}

export default DetailedTodo
