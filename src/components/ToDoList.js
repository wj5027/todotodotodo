import { useNavigate } from "react-router-dom";
import MyButton from "./MyButtons";
import ToDoItem from "./ToDoItem";

import React from "react";

const ToDoList = React.memo(({ toDoList }) => {
    const navigate = useNavigate();

    const getSortedList = () => {
        const compare = (a, b) => {
            return new Date(b.todo_date) - new Date(a.todo_date);
        }
        const copyList = JSON.parse(JSON.stringify(toDoList));
        const sortedList = copyList.sort(compare);
        return copyList;
    }

    return (
        <div className="ToDoList">

            {getSortedList().map((it) => (
                <ToDoItem key={it.id}  {...it} />
            ))}
            <div className="ToDoNewBtn">
                <MyButton text={"할 일 추가"} onClick={() => navigate('/new')} />
            </div>
        </div>
    )
});

ToDoList.defaultProps = {
    toDoList: [],
};

export default ToDoList;