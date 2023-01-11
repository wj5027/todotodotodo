import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToDoStateContext } from '../App';
import ToDoEditor from '../components/ToDoEditor';

const Edit = () => {
    const [originData, setoriginData] = useState();

    const navigate = useNavigate();
    const { id } = useParams();

    const toDoList = useContext(ToDoStateContext);

    useEffect(() => {
        if (toDoList.length >= 1) {
            const targetToDo = toDoList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if (targetToDo) { //할 일 존재
                setoriginData(targetToDo);
            } else {  //할 일 없을 때
                navigate('/', { replace: true });
            }
        }
    }, [id, toDoList]);

    return (
        <div>
            {originData &&
                <ToDoEditor
                    isEdit={true}
                    originData={originData}
                />}
        </div>
    );

}
export default Edit;