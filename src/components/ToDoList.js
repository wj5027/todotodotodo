import { useNavigate } from "react-router-dom";
import MyButton from "./MyButtons";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ toDoList }) => {

    const navigate = useNavigate();

    const getSortedList = () => {
        const compare = (a, b) => {
            return parseInt(b.date) - parseInt(a.date);
        }
        const copyList = JSON.parse(JSON.stringify(toDoList));
        const sortedList = copyList.sort(compare);
        return sortedList;
    }

    return (
        <div className="ToDoList">

            {getSortedList().map((it) => (
                <ToDoItem key={it.id} {...it} />
            ))}
            <div className="ToDoNewBtn">
                <MyButton text={"할 일 추가"} onClick={() => navigate('/new')} />
            </div>
        </div>
    )
};

ToDoList.defaultProps = {
    toDoList: [],
};

export default ToDoList;