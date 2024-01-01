import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ACTIVE_STEP,
  ADD_NOTE,
  ADD_STEPS,
  ADD_TODO_ITEM,
  COMPLETE_STEP,
  COMPLETE_TODO_ITEM,
  DISABLE_PLAN,
  EDIT_TODO_ITEM,
  REMOVE_STEP,
  REMOVE_TODO_ITEM,
  SET_DUE_DATE,
  SET_REMINDER,
  SET_REPEATING,
  TOGGLE_ADD_TO_MY_DAY,
  TOGGLE_IMPORTANCE,
  TOGGLE_REMINDER,
} from "../reducer";
import DatePicking from "./schedulingTools/DatePicker";

function DetailedTodo() {

  const dispatch = useDispatch();
  const [steps, setSteps] = useState("");
  const [customReminder, setCustomReminder] = useState({
    reminder: false,
    dueDate: false,
  });
  const getTodoDetails = useSelector((state) => state.todos);
  const [selected, setSelected] = useState({
    remindme: false,
    dueDate: false,
    repeat: false,
  });

  const [moreOpen, setMoreOpen] = useState(false)
  const [rows, setRows] = useState(1);
  const [rows1, setRows1] = useState(2);

  const activeTodo = getTodoDetails.filter((active) => active?.selected == true);
  const note = activeTodo[0]?.notes;
  const id = activeTodo[0]?.id;

  console.log("active todo", activeTodo[0]?.todosDetails.steps);

  const handleStepSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_STEPS,
      payload: {
        id: activeTodo[0].id,
        completed: false,
        textInput: steps,
        active: false,
      },
    });
    setSteps("");
  };

  const handleStepCompletion = (idx) => {

    dispatch({
      "type": COMPLETE_STEP,
      "payload": {
        id: id,
        index: idx,
      }
    })

  }

  const handleStepRemoval = (idx) => {

    dispatch({
      "type": REMOVE_STEP,
      "payload": {
        id: id,
        index: idx,
      }
    })

  }

  const handlePromoteToTask = (task) => {

    dispatch({
      "type": ADD_TODO_ITEM,
      "payload": task,
    })
  }

  const handleMoreOptions = (e,idx) => {
    e.preventDefault()
    e.stopPropagation()
    setMoreOpen((state)=>!state)
    dispatch({
      "type": ACTIVE_STEP,
      "payload": {
        id: id,
        index: idx,
      }
    })

  }


  const checked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomReminder({
      reminder: false,
      dueDate: false,
    });

    const checkedOption = document.querySelectorAll('[name="options"');
    console.log(checkedOption);

    checkedOption.forEach((elem) => {
      if (elem.checked) {
        switch (elem.id) {
          case "remindme":
            setSelected({
              remindme: !selected.remindme,
              dueDate: false,
              repeat: false,
            });
            setCustomReminder(false);
            break;

          case "due-date":
            setSelected({
              remindme: false,
              dueDate: !selected.dueDate,
              repeat: false,
            });
            break;

          case "repeat":
            setSelected({
              remindme: false,
              dueDate: false,
              repeat: !selected.repeat,
            });
            break;

          default:
            break;
        }
      }
    });
  };

  const handleBlur = (e) => {
    e.preventDefault();
    e.target.checked = false;
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const textarea = e.target;
    const minRows = 3;
    const maxRows = 10;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const currentRows = Math.ceil(textarea.scrollHeight / 40);
    setRows1(Math.min(maxRows, Math.max(minRows, currentRows)));
    dispatch({
      type: ADD_NOTE,
      payload: {
        id: activeTodo[0].id,
        note: e.target.value,
      },
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("custom reminder", customReminder);
    setCustomReminder({
      reminder: false,
      dueDate: false,
    });
    setSelected({
      remindme: false,
      dueDate: false,
      repeat: false,
    });
  };

  const addToMyDay = (e) => {
    console.log("current id", id);
    e.preventDefault();
    dispatch({
      type: TOGGLE_ADD_TO_MY_DAY,
      payload: id,
    });
  };

  const reminderOptions = (e) => {
    const today = new Date();
    const formattedTime = new Date(
      today.getTime() + 4 * 60 * 60 * 1000
    ).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    switch (e) {
      case "later today": {
        dispatch({
          type: SET_REMINDER,
          payload: {
            id: id,
            dueDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toDateString(),
            dueTime: formattedTime,
            formattedDate: "",
            type: "today",
          },
        });

        break;
      }

      case "tommorow": {
        dispatch({
          type: SET_REMINDER,
          payload: {
            id: id,
            dueDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 1
            ).toDateString(),
            dueTime: new Date(today.setHours(9, 0)).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            formattedDate: "",
            type: "tommorow",
          },
        });

        break;
      }

      case "next week": {
        dispatch({
          type: SET_REMINDER,
          payload: {
            id: id,
            dueDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 7
            ).toDateString(),
            dueTime: new Date(today.setHours(9, 0)).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            formattedDate: "",
            type: "Next week",
          },
        });

        break;
      }

      case "custom": {
        dispatch({
          type: SET_REMINDER,
          payload: {
            id: id,
            dueDate: datetime.date,
            dueTime: datetime.time,
            formattedDate: "",
            type: "custom",
          },
        });

        break;
      }
    }
  };

  const dueDateOptions = (e) => {
    const today = new Date();
    const formattedTime = new Date(
      today.getTime() + 4 * 60 * 60 * 1000
    ).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    switch (e) {
      case "later today": {
        dispatch({
          type: SET_DUE_DATE,
          payload: {
            id: id,
            dueDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toDateString(),
            dueTime: formattedTime,
            formattedDate: "",
            type: "today",
          },
        });

        break;
      }

      case "tommorow": {
        dispatch({
          type: SET_DUE_DATE,
          payload: {
            id: id,
            dueDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 1
            ).toDateString(),
            dueTime: new Date(today.setHours(9, 0)).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            formattedDate: "",
            type: "tommorow",
          },
        });

        break;
      }

      case "next week": {
        dispatch({
          type: SET_DUE_DATE,
          payload: {
            id: id,
            dueDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 7
            ).toDateString(),
            dueTime: new Date(today.setHours(9, 0)).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            formattedDate: "",
            type: "Next week",
          },
        });

        break;
      }

      case "custom": {
        dispatch({
          type: SET_DUE_DATE,
          payload: {
            id: id,
            dueDate: datetime.date,
            dueTime: datetime.time,
            formattedDate: "",
            type: "custom",
          },
        });

        break;
      }
    }
  };

  const repeatOptions = (e) => {
    switch (e) {
      case "Monthly": {
        dispatch({
          type: SET_REPEATING,
          payload: {
            id: id,
            frequency: e,
          },
        });

        break;
      }
      case "Daily": {
        dispatch({
          type: SET_REPEATING,
          payload: {
            id: id,
            frequency: e,
          },
        });

        break;
      }
      case "Weekdays": {
        dispatch({
          type: SET_REPEATING,
          payload: {
            id: id,
            frequency: e,
          },
        });

        break;
      }
      case "Weekly": {
        dispatch({
          type: SET_REPEATING,
          payload: {
            id: id,
            frequency: e,
          },
        });

        break;
      }

      default:
        break;
    }
  };

  const handleCustomReminder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomReminder({
      reminder: true,
      dueDate: false,
    });
    setSelected((obj) => (obj.remindme = true));
  };

  const handleCustomDueDate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomReminder({
      reminder: false,
      dueDate: true,
    });
    setSelected((obj) => (obj.remindme = true));
  };

  const handleDetailedInput = (e) => {
    e.preventDefault();
    const textarea = e.target;
    const minRows = 1;
    const maxRows = 5;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

   /*  const currentRows = Math.ceil(textarea.scrollHeight / 30);
    setRows(Math.min(maxRows, Math.max(minRows, currentRows))); */

    dispatch({
      type: EDIT_TODO_ITEM,
      payload: {
        id: id,
        editedText: e.target.value,
      },
    });
  };

  const handleCompletion = (e) => {
    console.log("Trying to complete")
    dispatch({"type": COMPLETE_TODO_ITEM, "payload": activeTodo[0].id})
    e.stopPropagation()
}

  const handleImportance = (e) => {

    dispatch({
      "type": TOGGLE_IMPORTANCE,
      "payload": id,
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch({
      "type": REMOVE_TODO_ITEM,
      "payload": id,
    })
  }


  const toggleReminder = (e) => {

    e.preventDefault()
    e.stopPropagation()

    dispatch({
      "type": TOGGLE_REMINDER,
      "payload": {
        id: id,
      }
    })
  }

  const disablePlan = (e, type) => {

    e.preventDefault()
    e.stopPropagation()

    console.log(type)

    dispatch({
      "type": DISABLE_PLAN,
      "payload": {
        id: id,
        "type": type,
      }
    })
  }

  const handleFileUpload = (e) => {

    const selectedFile = e.target.files[0]

    console.log("file object",selectedFile)
    console.log("file object",selectedFile.name)
    console.log("file object",selectedFile.type)
    console.log("file object",selectedFile.size)
  }

  return (
    <Fragment>
      {activeTodo.length != 0 ? (
        <section className="detailed-todo-section">

          <article className="detailed-todo-elements">
          {/*
              This is the detailed section view Ui to
              handle use interaction with  details of the
              todo tasks
          */}
            <article className="todo-detailed-view" >

              <article className="completion-status"  onClick={handleCompletion}>
                {activeTodo[0].completed ? (

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

              <article className="todo-detailed-input">
                <textarea
                  type="text"
                  id="todo-detailed-input"
                  rows ={ rows}
                  value={activeTodo[0].inputText}
                  onChange={handleDetailedInput}
                  maxLength={250}
                  style={{
                    width: '90%',
                    overflowY: "hidden",
                      }}
                />
              </article>

              <article className="importance-status" onClick={handleImportance}>
                {activeTodo[0].important ? (
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

            </article>

            <article className="steps">
              <ul>

                {activeTodo[0].todosDetails.steps.map((step, idx) => (
                  <li key={activeTodo[0].id + 10255 + idx}>
                    <article className="steps-container">
                        <article className="steps-icon  steps-check" onClick={()=> handleStepCompletion(idx)}>
                        {step.completed ? (

                          <article  >
                            <div >
                          <svg
                          className="checked-filled"
                          xmlns="http://www.w3.org/2000/svg"
                          height="15"
                          width="15"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                        </div>
                        </article>


                        ) : (
                          <article className="incomplete-icons-step" >
                            <div className="first-step"  >

                              <svg
                                className="checked-hollow"
                                xmlns="http://www.w3.org/2000/svg"
                                height="15"
                                width="15"
                                viewBox="0 0 512 512"
                              >
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                              </svg>

                            </div>
                            <div className="second" >

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="15"
                                width="15"
                                viewBox="0 0 512 512"
                              >
                                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                              </svg>

                            </div>
                          </article>
                        )}
                          </article>

                        <article className="step-item">
                          <article className="step-text">
                              <p>{step.textInput}</p>
                            </article>

                          <article className=" steps-menu-icon" >

                            <article className="more-options" onBlur={handleMoreOptions} onClick={(e)=>handleMoreOptions(e,idx)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20"
                                  width="6"
                                  viewBox="0 0 128 512"
                                >
                                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                                </svg>
                              </article>

                            { step.active ?
                            <article className="steps-more-options">
                            <article className="complete-step" onClick={()=>handleStepCompletion(idx)}>
                              <article className="complete-step-icon">
                              <svg
                              className="checked-hollow"
                              xmlns="http://www.w3.org/2000/svg"
                              height="20"
                              width="20"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                            </svg>
                              </article>
                              <article className="complete-step-texts">
                                <p>Mark as complete</p>
                              </article>
                            </article>

                            <article className="promote-step" onClick={()=>handlePromoteToTask(step.textInput) }>
                              <article className="promote-step-icon">
                              <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18"
                              width="18"
                              viewBox="0 0 448 512"
                            >
                              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                              </article>
                              <article className="promote-step-texts">
                                <p>Promote to task</p>
                              </article>
                            </article>

                            <hr />
                            <article className="delete-step" onClick={()=>handleStepRemoval(idx)}>
                            <article className="delete-step-icon">
                              <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="14"
                              viewBox="0 0 448 512"
                            >
                              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                            </article>

                            <article className="delete-step-texts">
                              <p>Delete step</p>
                            </article>
                            </article>
                              </article> : ''}

                            </article>
                          </article>

                    </article>
                  </li>
                ))}

              </ul>

              <label htmlFor="step-input">
                <button
                  className="add-step-btn"
                  type="button"
                  onClick={handleStepSubmit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    width="18"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </button>

                <input
                  type="text"
                  id="step-input"
                  name="step-input"
                  value={steps}
                  placeholder="Next step"
                  onChange={(e) => {
                    e.preventDefault();
                    setSteps(e.target.value);
                  }}
                />
              </label>
            </article>

           </article>

          <article className="detailed-todo-elements" onClick={addToMyDay}>
            <article className="add-to-my-day">
              {activeTodo[0]?.todosDetails.isInMyDay ? (
                <div className="in-my-day">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                  >
                    <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
                  </svg>{" "}
                  <p> Add to my day</p>
                </div>
              ) : (
                <div className="not-in-my-day">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                  >
                    <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                  </svg>
                  <p>Add to my day</p>
                </div>
              )}
            </article>
            </article>

          <article id="edit-reminders" className="detailed-todo-elements">
            <ul className="set-schedule">
              <li className="detailed-customs">
                  <input
                    type="radio"
                    className="detail-option"
                    id="remindme"
                    name="options"
                    onBlur={handleBlur}
                    onChange={checked}
                  />

                  <label className={activeTodo[0].todosDetails.reminder.isReminding ? "active-label": ""} htmlFor="remindme">
                    <article className="schedulings">
                      <article className="scheduling-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="14"
                          viewBox="0 0 448 512"
                        >
                          <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                        </svg>
                      </article>
                      {activeTodo[0].todosDetails.reminder.isReminding ? (
                        <article className="reminder-display">
                          <span>
                            {`Remind me at ${activeTodo[0].todosDetails.reminder.reminderTime}`}
                          </span>
                          <span>
                            {activeTodo[0].todosDetails.reminder.type == "today"
                              ? "Today"
                              : activeTodo[0].todosDetails.reminder.type ==
                                "tommorow"
                              ? "Tommorow"
                              : activeTodo[0].todosDetails.reminder.type ==
                                "Next week"
                              ? "Next week"
                              : activeTodo[0].todosDetails.reminder.type ==
                                "custom"
                              ? activeTodo[0].todosDetails.reminder.reminderDate
                              : ""}
                          </span>
                        </article>
                      ) : (
                        "Reminder"
                      )}
                    </article>
                    <article className="scheduling-icon" onClick={(e)=>disablePlan(e,"reminder")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="12"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </article>
                  </label>

                  {selected.remindme ? (
                    <article className="detailed-set-reminders">
                      <ul>
                        <button type="button" onClick={(e) => handleClose(e)}>
                          close
                        </button>

                        <li onClick={() => reminderOptions("later today")}>
                          Later today
                        </li>
                        <li onClick={() => reminderOptions("tommorow")}>
                          Tommorow{" "}
                        </li>
                        <li onClick={() => reminderOptions("next week")}>
                          Next week
                        </li>
                        <li onClick={handleCustomReminder}>Set date and time</li>
                      </ul>
                    </article>
                  ) : customReminder.reminder ? (
                    <article className="custom-reminder ">
                      <DatePicking
                        activeTodo={activeTodo}
                        scheduleType={"custom-reminder"}
                      />
                    </article>
                  ) : (
                    <span></span>
                  )}
                </li>

              <li className="detailed-customs">
                <input
                  type="radio"
                  className="detail-option"
                  onBlur={handleBlur}
                  id="due-date"
                  name="options"
                  onChange={checked}
                />

                <label className={activeTodo[0].todosDetails.dueDate.isDue ? "active-label": ""} htmlFor="due-date">
                  <article className="schedulings">
                    <article className="scheduling-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="14"
                        viewBox="0 0 448 512"
                      >
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                      </svg>
                    </article>

                    {activeTodo[0].todosDetails.dueDate.isDue ? (
                      <article className="reminder-display">
                        <span>
                          {`Due  ${
                            activeTodo[0].todosDetails.dueDate.type == "today"
                              ? "Today"
                              : activeTodo[0].todosDetails.dueDate.type ==
                                "tommorow"
                              ? "Tommorow"
                              : activeTodo[0].todosDetails.dueDate.type ==
                                "Next week"
                              ? "Next week"
                              : activeTodo[0].todosDetails.dueDate.type ==
                                "custom"
                              ? activeTodo[0].todosDetails.dueDate.dueDate
                              : ""
                          }`}
                        </span>
                      </article>
                    ) : (
                      "Add due date"
                    )}
                  </article>
                  <article className="scheduling-icon" onClick={(e)=>disablePlan(e,"due_date")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="12"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </article>
                </label>

                {selected.dueDate ? (
                  <article className="detailed-set-reminders">
                    <ul>
                      <button onClick={handleClose}> close</button>
                      <li onClick={() => dueDateOptions("later today")}>
                        Later today
                      </li>
                      <li onClick={() => dueDateOptions("tommorow")}>
                        Tommorow{" "}
                      </li>
                      <li onClick={() => dueDateOptions("next week")}>
                        Next week
                      </li>
                      <li onClick={handleCustomDueDate}>Set date and time</li>
                    </ul>
                  </article>
                ) : customReminder.dueDate ? (
                  <article className="custom-reminder detailed-set-reminders">
                    <DatePicking
                      activeTodo={activeTodo}
                      scheduleType={"custom-due-date"}
                    />
                  </article>
                ) : (
                  <span></span>
                )}
              </li>

              <li className="detailed-customs">
                <input
                  type="radio"
                  className="detail-option"
                  onBlur={handleBlur}
                  id="repeat"
                  name="options"
                  onChange={checked}
                />

                <label className={activeTodo[0].todosDetails.repeat.isRepeating ? "active-label": ""} htmlFor="repeat">
                  <article className="schedulings">
                    <article className="scheduling-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                      >
                        <path d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z" />
                      </svg>
                    </article>

                    {activeTodo[0].todosDetails.repeat.isRepeating ? (
                      <article className="reminder-display">
                        <span>
                          {`${
                            activeTodo[0].todosDetails.repeat.frequency ==
                            "Daily"
                              ? "Daily"
                              : activeTodo[0].todosDetails.repeat.frequency ==
                                "Weekdays"
                              ? "Weekdays"
                              : activeTodo[0].todosDetails.repeat.frequency ==
                                "Weekly"
                              ? "Weekly"
                              : activeTodo[0].todosDetails.repeat.frequency ==
                                "Monthly"
                              ? "Monthly"
                              : activeTodo[0].todosDetails.repeat.frequency ==
                                "Yearly"
                              ? "Yearly"
                              : ""
                          }`}
                        </span>
                      </article>
                    ) : (
                      "Repeat"
                    )}
                  </article>
                  <article className="scheduling-icon" onClick={(e)=>disablePlan(e,"repeat")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="12"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </article>
                </label>

                {selected.repeat ? (
                  <article className="detailed-set-reminders">
                    <ul>
                      <button onClick={handleClose}> close</button>
                      <li onClick={() => repeatOptions("Daily")}>daily</li>
                      <li onClick={() => repeatOptions("Weekdays")}>
                        weekdays{" "}
                      </li>
                      <li onClick={() => repeatOptions("Weekly")}>weekly</li>
                      <li onClick={() => repeatOptions("Monthly")}>monthly</li>
                    </ul>
                  </article>
                ) : (
                  <span></span>
                )}
              </li>
            </ul>
            </article>

          <article className="detailed-todo-elements">
                  <article className="button-wrap">

                    <label htmlFor="file-upload" className="file-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/></svg>
                    <span><p>Add file</p></span>
                    </label>

                    <input
                    type="file"
                    id="file-upload"
                    name="file-up"
                    accept=".jpg, .png"
                    onChange = {handleFileUpload}
                    />
                  </article>
            </article>

          <article className="detailed-todo-elements">
            <textarea
              value={note}
              id="add-to-note"
              onChange={handleAddNote}
              maxLength={100}
              rows={rows1}
              placeholder="Add note"
              style={{
                width: '100%',
                overflowY: "hidden",
                border: "none",
                outline: "none",
                fontSize: "10px !important"
                  }}
            ></textarea>
            </article>

          <article className="detailed-delete" onClick={handleDelete}>
            <article className="detailed-delete-text">
              {`Created on ${activeTodo[0].timestamp}`}
            </article>
            <article className="detailed-delete-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
              </svg>
            </article>
            </article>

        </section>

        ) : ("")}

    </Fragment>
  );
}

export default DetailedTodo;
