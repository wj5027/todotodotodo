import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButtons";

import MyHeader from "../components/MyHeader";
import ToDoEditor from "../components/ToDoEditor";

const New = () => {

    return (
        <div>
            <ToDoEditor />
        </div>
    )

}
export default New;