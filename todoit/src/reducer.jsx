import { combineReducers } from "redux"
import todoDetailedReducer from "./features/detailedTodos/todoDetailedReducer"
import todoItemsReducer from "./features/todo_items/todo_items_reducer"
import DetailedTodo from "./components/DetailedTodo"

// Auto increment id
function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
  }

//update stats
const updateStats = (state) => {
      return {
          ...state,
            stats :{
            completedTasks: state.todos.filter(todo=>todo.completed).length,
            importantTasks: state.todos.filter(todo=>todo.important).length,
            inMyDayTasks: state.todos.filter(todo=>todo.todosDetails.isInMyDay).length,
            tasksTotal: state.todos.map(todo=>todo).length,
            isPlanned: state.todos.filter(todo=>{
                if(
                    todo.todosDetails.reminder.isReminding ||
                    todo.todosDetails.dueDate.isDue ||
                    todo.todosDetails.repeat.isRepeating
                ) return true

            }).length
    }

            }


}


//action items
export const ADD_TODO_ITEM = "todo/addTodo"
export const REMOVE_TODO_ITEM = "todo/removeTodo"
export const COMPLETE_TODO_ITEM = "todo/completeTodo"

export const EDIT_TODO_ITEM = "todo/editTodoItem"

export const TOGGLE_IMPORTANCE = "todo/toggleImportance"
export const TOGGLE_ADD_TO_MY_DAY = "todo/toggleAddToMyDay"

export const SET_REMINDER = "todo/setReminder"
export const TOGGLE_REMINDER = "todo/toggleReminder"

export const SET_DUE_DATE = "todo/setDueDate"
export const TOGGLE_DUE_DATE = "todo/toggleDueDate"

export const SET_REPEATING = "todo/setRepeating"
export const TOGGLE_REPEATING = "todo/toggleRepetition"

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

    stats: {
        completedTasks: 1,
        importantTasks: 1,
        inMyDayTasks: 1,
        tasksTotal: 1,
        isPlanned: 1,
    }

}


const todoReducer = (state = initialState, action) =>
{
    switch (action.type){

        case ADD_TODO_ITEM:{

            const newTask = {
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
               ],

           }

            return updateStats(newTask)

        }

        case REMOVE_TODO_ITEM: {
            const newTaskList =  {
                ...state,
                todos: state.todos.filter(todo => todo.id != action.payload)
                ,
            }


            return updateStats(newTaskList)
        }

        case COMPLETE_TODO_ITEM: {

            const newTask = {
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
                },

                ),

            }

            return updateStats(newTask)
        }

        case TOGGLE_IMPORTANCE: {

            const newState = {
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
                }),
            }

            return updateStats(newState)
        }

        case TOGGLE_ADD_TO_MY_DAY: {

            const newTask = {
                ...state,
                todos: state.todos.map(todo=>{

                    if(todo.id == action.payload)
                    {
                        console.log(`id target ${todo.id}\n id sent ${action.payload}`)
                        return {
                            ...todo,
                            todosDetails: {
                                ...todo.todosDetails,
                                isInMyDay: !todo.todosDetails.isInMyDay
                            }
                        }
                    }
                    console.log(`id target ${todo.id}\n id sent ${action.payload}`)

                    return todo
                },)

            }

            return  updateStats(newTask)

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

            const newState =  {
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
                   }),

                }
            return updateStats(newState)
        }

        case TOGGLE_REMINDER: {

            const newState = {
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

                }),
            }

            return updateStats(newState)
        }

        case SET_DUE_DATE: {

           const newState =  {
            ...state,
            todos: state.todos.map((todo)=>{

                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        todosDetails: {
                        ...todo.todosDetails,
                        dueDate: {
                            isDue: true,
                            dueDate: action.payload.dueDate,
                            dueTime: action.payload.dueTime,
                            type: action.payload.type,

                        }

                        }
                    }
                }
                return todo
            })
        }

            return updateStats(newState)
        }

        case TOGGLE_DUE_DATE: {

            const newState = {
                ...state,
                todos: state.todos.map((todo)=>{

                    if (todo.id == action.payload.id)
                    {
                        return {
                            ...todo,
                            todosDetails: {
                                ...todo.todosDetails,
                                dueDate:{
                                     ...todo.todosDetails.dueDate,
                                     isReminding: !todo.todosDetails.dueDate.isDue
                                }
                            }

                        }

                    }

                    return todo

                }),
            }

            return updateStats(newState)
        }

        case SET_REPEATING: {

            const newSate = {
                      ...state,
                    todos: state.todos.map(todo=>
                    {
                        if(todo.id === action.payload.id)
                        {
                            return {
                                ...todo,
                                todosDetails: {
                                    ...todo.todosDetails,
                                    repeat: {
                                        isRepeating: true,
                                        frequency: action.payload.frequency
                                    }

                                }
                            }
                        }

                        return todo
                    })

            }

            return updateStats(newSate)
        }

        case TOGGLE_REPEATING: {

            const newSate = {
                      ...state,
                    todos: state.todos.map(todo=>
                    {
                        if(todo.id === action.payload.id)
                        {
                            return {
                                ...todo,
                                todosDetails: {
                                    ...todo.todosDetails,
                                    repeat: {
                                        ...todo.todosDetails.repeat,
                                        isRepeating: !todo.todosDetails.repeat.isRepeating,

                                    }

                                }
                            }
                        }

                        return todo
                    })

            }

            return updateStats(newSate)
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

        case EDIT_TODO_ITEM: {

        const newState = {
            ...state,
            todos: state.todos.map(todo=>{
                if(todo.id === action.payload.id)
                {
                    return {
                        ...todo,
                        inputText: action.payload.editedText
                    }
                }
                return todo
            })
        }

        return updateStats(newState)
        }

        default:{return state}
    }
}

const rootReducer = combineReducers({

})

export default todoReducer;