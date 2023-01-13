
import { useContext, useEffect, useState } from "react";
import { ToDoStateContext } from "../App";
import MyButton from "../components/MyButtons";
import MyHeader from "../components/MyHeader";

import { useNavigate } from "react-router-dom";

import ToDoList from "../components/ToDoList";

const Home = () => {
    const toDoList = useContext(ToDoStateContext);

    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월의 할 일`;

    const navigate = useNavigate();

    useEffect(() => {
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0,
            23,
            59,
            59
        ).getTime();

        setData(toDoList.filter((it) =>
            firstDay <= new Date(it.todo_date) && new Date(it.todo_date) <= lastDay));

    }, [toDoList, curDate]);

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        )
    }
    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        )
    }

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}
                />}
                rightChild={<MyButton text={">"} onClick={increaseMonth}
                />}
            />
            <ToDoList toDoList={data} />

        </div>

    )

}
export default Home;