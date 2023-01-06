import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButtons";
import MyHeader from "./MyHeader";

const ToDoEditor = ({ isEdit, originData }) => {
    //const [author, setAuthor] = useState("");

    const navigate = useNavigate();

    return (
        <div className="ToDoEditor">
            <MyHeader
                headText={isEdit ? "할 일 수정" : "할 일 추가"}
                leftChild={<MyButton text={"뒤로가기"}
                    onClick={() => navigate(-1)}
                />}
                rightChild={isEdit && <MyButton text={"삭제"}
                    onClick={""} />}
            />
            {/* <textarea className="content" placeholder="할 일을 추가해주세요" /> */}
        </div >
    )
}
export default ToDoEditor;