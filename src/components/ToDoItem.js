import { useNavigate } from "react-router-dom";
import MyButton from "./MyButtons";


const ToDoItem = ({ id, content, todo_date }) => {
    //const strDate = new Date(parseInt(date)).toLocaleDateString();
    const strDate = todo_date.replaceAll("-", ".");
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/todo/${id}`);
    }

    const goEdit = () => {
        navigate(`edit/${id}`);
    }

    return (
        <div className="ToDoItem">
            <div className="info_wrapper"
                onClick={goDetail}>
                <div className="todo_date">{strDate}</div>
                <div className="todo_preview">
                    {content.length > 25 ? content.slice(0, 25) + "..."
                        : content}
                </div>
            </div>
            <div onClick={goEdit} className="btn_wrapper">
                <MyButton text={"수정"} />
            </div>
        </div>
    )
};

export default ToDoItem;