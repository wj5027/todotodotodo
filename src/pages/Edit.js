import ToDoEditor from '../components/ToDoEditor';

const Edit = () => {
    return (
        <div>
            <ToDoEditor
                isEdit={true}
                originData={""}
            />
        </div>
    )

}
export default Edit;