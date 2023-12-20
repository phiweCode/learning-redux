import { combineReducers } from "redux"
import todoDetailedReducer from "./features/detailedTodos/todoDetailedReducer"
import todoItemsReducer from "./features/todo_items/todo_items_reducer"
import DetailedTodo from "./components/DetailedTodo"

// Auto increment id
function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
  }


//action items
export const ADD_TODO_ITEM = "todo/addTodo"
export const REMOVE_TODO_ITEM = "todo/removeTodo"
export const COMPLETE_TODO_ITEM = "todo/completeTodo"

export const TOGGLE_IMPORTANCE = "todo/toggleImportance"
export const TOGGLE_ADD_TO_MY_DAY = "todo/toggleAddToMyDay"

export const SET_REMINDER = "todo/setReminder"
export const TOGGLE_REMINDER = "todo/toggleReminder"

export const TOGGLE_SELECTION = "todo/toggleSelection"
export const ADD_STEPS = "todo/addSteps"
export const ADD_NOTE = "todo/addNote"


// This is the initial state of the application
const initialState = {
    todos: [
        {
            id: 1,
            inputText: "New test",
            completed: false,
            selected: true,
            important: true,
            steps : [''],
            timestamp: new Date().toLocaleString(),
            notes: "This is a personal note",
            todosDetails: {
                steps: [],
                isInMyDay: true,
                reminder: {
                    isReminding: false,
                    reminderDate: "",
                    reminderTime: "",
                    dateTime: "",
                    type: ""
                },
                dueDate: {
                    isDue: false,
                    dueDate: "",
                    dueTime: "",
                    type: "",

                },
                repeat: {
                    isRepeating: false,
                    frequency: ""
                }

                    },
        },
    ],

}

const todoReducer = (state = initialState, action) =>
{
    switch (action.type){

        case ADD_TODO_ITEM:{

            return {
                ...state,
               todos: [
                ...state.todos,
                {
                    id: nextTodoId(state.todos),
                    inputText: action.payload,
                    completed: false,
                    selected: false,
                    steps : [''],
                    important: false,
                    timestamp: new Date().toLocaleString(),
                    notes: "",
                    todosDetails: {
                        steps: [],
                        isInMyDay: false,
                        reminder: {
                            isReminding: false,
                            reminderDate: "",
                            reminderTime: "",
                            dateTime: "",
                            type: ""
                        },
                        dueDate: {
                            isDue: false,
                            dueDate: "",
                            dueTime: "",
                            dateTime: ""
                        },
                        repeat: {
                            isRepeating: false,
                            frequency: ""
                        }

                            },
                }
               ]

            }
        }

        case REMOVE_TODO_ITEM: {

            return {
                ...state,
                todos: state.todos.filter(todo => todo.id != action.payload)
            }
        }

        case COMPLETE_TODO_ITEM: {
            return {
                ...state,
                todos: state.todos.map((todo)=>{
                    if(todo.id == action.payload)
                    {
                        return {
                            ...todo,
                            completed: !todo.completed
                         }
                    }
                    return todo

                })
            }
        }

        case TOGGLE_IMPORTANCE: {
            return {
                ...state,
                todos: state.todos.map(todo=>{
                    if(todo.id == action.payload)
                    {
                        return {
                            ...todo,
                            important: !todo.important
                        }
                    }

                    return todo
                })
            }
        }

        case TOGGLE_ADD_TO_MY_DAY:{

            return {
                ...state,
                todos: state.todos.map(todo=>{

                    if(todo.id == action.payload)
                    {
                        return {
                            ...todo,
                            todosDetails: {
                                ...todo.todosDetails,
                                isInMyDay: !todo.todosDetails.isInMyDay
                            }
                        }
                    }

                    return todo
                })
            }

        }

        case ADD_STEPS: {

            return {
                ...state,
                todos: state.todos.map(todo=>{

                if (todo.id == action.payload.id)
                {
                    return {
                        ...todo,
                        todosDetails: {...todo.todosDetails,
                            steps: [...todo.todosDetails.steps, action.payload.steps]
                        }

                    }
                }

                return todo
                })
            }
        }

        case TOGGLE_SELECTION: {
            return {
                ...state,
                todos: state.todos.map((todo)=>{

                if(todo.id == action.payload)
                {
                 return {
                    ...todo,
                    selected: !todo.selected
                 }
                }
                return {
                    ...todo,
                    selected: false
                }
                })
            }
        }

        case SET_REMINDER: {

            return {
                ...state,
                todos: state.todos.map((todo)=>{

                    if(todo.id === action.payload.id){
                        return {
                            ...todo,
                            todosDetails: {
                            ...todo.todosDetails,
                            reminder : {
                              isReminding: true,
                              reminderDate: action.payload.dueDate,
                              reminderTime: action.payload.dueTime,
                              dateTime: action.payload.formattedDate,
                              type: action.payload.type
                            }}
                        }}

                        return todo
                   })
                }}


        case TOGGLE_REMINDER: {

            return {
                ...state,
                todos: state.todos.map((todo)=>{

                    if (todo.id == action.payload.id)
                    {
                        return {
                            ...todo,
                            todosDetails: {
                                ...todo.todosDetails,
                                reminder:{
                                     ...todo.todosDetails.reminder,
                                     isReminding: !todo.todosDetails.reminder.isReminding
                                }
                            }

                        }

                    }

                    return todo

                })
            }
        }

        case ADD_NOTE: {

            return {
                ...state,
                todos: state.todos.map((todo)=>{

                    if (todo.id == action.payload.id)
                    {
                        return {
                            ...todo,
                            notes: action.payload.note
                        }
                    }

                    return todo
                })
            }
        }

        default:{return state}
    }
}

const rootReducer = combineReducers({

})

export default todoReducer;