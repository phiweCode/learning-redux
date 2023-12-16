//action list
export const TOGGLE_SELECTION = "todo/toggleSelection"
export const ADD_STEPS = "todo/addSteps"
export const ADD_NOTE = "todo/addNote"

//initial state
const initialState = {
    todos: [
        {
            id: 1,
            inputText: "New test",
            completed: false,
            selected: true,
            steps : [''],
            timestamp: new Date().toLocaleString(),
            notes: "This is a personal note",
            todosDetails: {
                steps: [],
                isInMyDay: false,
                reminder: {
                    isReminding: true,
                    reminderDate: "",
                    reminderTime: "",
                },
                dueDate: {
                    isDue: false,
                    dueDate: "",
                    dueTime: "",
                },
                repeat: {
                    isRepeating: false,
                    frequency: ""
                }

                    },
                },
    ],



}

//reducer for detailed todo options
const todoDetailedReducer = (state = initialState, action) =>  {

    switch(action.type)
    {
        case ADD_STEPS: {

            return {
                ...state,
                todosDetail: state.todosDetail.map(todo=>{

                if (todo.id == action.payload.id)
                {
                    return {
                        ...todo,
                        steps: [...todo.steps, action.payload.steps],
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
    }
}

export default todoDetailedReducer;
