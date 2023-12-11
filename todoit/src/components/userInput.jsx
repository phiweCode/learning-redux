import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

function UserInput() {

    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();


    const handleInput = (e) => {

    const todoText = e.target.value.trim();

    if (e.key === "Enter" && todoText)
        {
        dispatch({ type: "todo/addTodo", payload: todoText });
        setInputText('')
        }
    };

    return (
        <Fragment>
          
            <input
                type="text"
                id="todo-text"
                name="todo-text"
                value={inputText}
                placeholder="whats on your mind ?"
                onKeyDown={handleInput}
                onChange={(e) => setInputText(e.target.value)}
            />
        </Fragment>
    )
}

export default UserInput
