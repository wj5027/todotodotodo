import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButtons";
import MyHeader from "./MyHeader";

import { getStringDate } from "../util/date";
import { ToDoDispatchContext } from "../App";

const ToDoEditor = ({ isEdit, originData }) => {
    //const [author, setAuthor] = useState("");
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit, onRemove } = useContext(ToDoDispatchContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "수정하시겠습니까?" : "추가하시겠습니까?")) {
            if (!isEdit) {  //추가일 경우
                onCreate(date, content);
            } else {  //수정일 경우
                onEdit(originData.id, date, content);
            }
        }
        navigate('/', { replace: true });
    }

    const handleRemove = () => {
        if (window.confirm("삭제 하시겠습니까?")) {
            onRemove(originData.id);
            navigate('/', { replace: true });
        }
    }

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setContent(originData.content);

        }
    }, [isEdit, originData]);

    return (
        <div className="ToDoEditor">
            <MyHeader
                headText={isEdit ? "할 일 수정" : "할 일 추가"}
                leftChild={<MyButton text={"< 뒤로"}
                    onClick={() => navigate(-1)}
                />}
                rightChild={isEdit && <MyButton text={"삭제"}
                    onClick={handleRemove} />}
            />
            <section>
                <div className="input_box">
                    <h4>날짜</h4>
                    <input className="input_date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type='date'
                    />
                </div>
            </section>
            <section>
                <h4>할 일</h4>
                <div className="input_box text_wrapper">
                    <textarea
                        placeholder="할 일을 적어주세요"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </section>
            <section>
                <div className="control_box">
                    <MyButton text={"취소"} onClick={() => navigate(-1)} />
                    <MyButton text={"완료"} onClick={handleSubmit} />
                </div>
            </section>
        </div >
    )
}
export default ToDoEditor;