import Myheader from "../components/MyHeader";
import MyButton from "../components/MyButtons";

import { getStringDate } from "../util/date";
import { Navigate, useNavigate } from "react-router-dom";

const ToDo = () => {
    const navigate = useNavigate();

    return (
        <div className="ToDoPage">
            <Myheader headText={`새 할 일 추가`}
                leftChild={<MyButton text={"< 뒤로"}
                    onClick={() => navigate(-1)}
                />}
                rightChild={<MyButton text={"수정"}
                    onClick={() => navigate(`/edit`)} />}


            />

        </div>
    )

}

export default ToDo;