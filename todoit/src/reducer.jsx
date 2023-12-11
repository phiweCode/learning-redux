// Auto increment id
function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
  }

const setReminder = (action) => {

    let currentDate = new Date().toLocaleDateString()
    let dueDate = action.payload;



}


//action items
export const ADD_TODO_ITEM = "todo/addTodo"
export const REMOVE_TODO_ITEM = "todo/removeTodo"
export const COMPLETE_TODO_ITEM = "todo/completeTodo"

export const SET_REMINDER = "todo/setReminder"
export const TOGGLE_REMINDER = "todo/toggleReminder"


// This is the initial state of the application
const initialState = {
    todos: [
        {
            id: 1,
            inputText: "New test",
            completed: false,
            timestamp: new Date().toLocaleString(),
            alerts :
                {
                    isSet: false,
                    dueReminder: {
                        dueDate: "2023-12-12",
                        dueTime: "18:25:25",
                        formattedDate: ""

                    },
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
                    important: false,
                    timestamp: new Date().toLocaleString(),
                    alerts :
                    {
                        isSet: false,
                        dueReminder: {
                            dueDate: "",
                            dueTime: "",
                            formattedDate: ""
                        },
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

        case SET_REMINDER: {

            return {
                ...state,
                todos: state.todos.map((todo)=>{

                    if(todo.id === action.payload.id){
                        return {
                            ...todo,
                            alerts: {
                            ...todo.alerts,
                            dueReminder : {
                                dueDate: action.payload.dueDate,
                                dueTime: action.payload.dueTime,
                                formattedDate: action.payload.formattedDate,
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
                            alerts: {
                                ...todo.alerts,
                                isSet: !todo.alerts.isSet,
                            }

                        }

                    }

                    return todo

                })
            }
        }

        default:{return state}
    }
}

export default todoReducer;