import Myheader from "../components/MyHeader";
import MyButton from "../components/MyButtons";

import { getStringDate } from "../util/date";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToDoStateContext } from "../App";

const ToDo = () => {
    const { id } = useParams();
    const toDoList = useContext(ToDoStateContext);
    const [data, setData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (toDoList.length >= 1) {
            const targetToDo = toDoList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            if (targetToDo) { //할 일 존재
                setData(targetToDo);
            } else {  //할 일 없을 때
                alert("할 일이 존재하지 않습니다.");
                navigate('/', { replace: true });
            }
        }
    }, [id, toDoList]);

    if (!data) {
        return <div className="ToDoPage">로딩중입니다...</div>
    } else {
        return (
            <div className="ToDoPage">
                <Myheader headText={`${getStringDate(new Date(data.todo_date))}`}
                    leftChild={<MyButton text={"< 뒤로"}
                        onClick={() => navigate(-1)}
                    />}
                    rightChild={<MyButton text={"수정"}
                        onClick={() => navigate(`/edit/${data.id}`)} />}
                />
                <section>
                    <h4>할 일</h4>
                    <div className="todo_content_wrapper">
                        <p>{data.content}</p>
                    </div>
                </section>
            </div>
        )
    }
}

export default ToDo;