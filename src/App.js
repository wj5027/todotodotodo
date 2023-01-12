import './App.css';
import { BrowserRouter, Routes, Route, useActionData } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import ToDo from './pages/ToDo';
import Edit from './pages/Edit';

import ToDoEditor from './components/ToDoEditor';
import MyFooter from './components/MyFooter';
import { useEffect, useReducer, useRef } from 'react';

import React from 'react';

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
      const todo = {
        id: action.data.id,
        todo_date: action.data.todo_date,
        content: action.data.content
      }

      fetch("http://localhost:3001/insertToDo", {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(todo),
      }).then((res) => res.json())
        .then((json) => {
        });

      break;
    }

    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId)
      break;
    }

    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ?
          { ...action.data } : it);
      break;
    }
    default:
      return state;
  }

  return newState;
}
export const ToDoStateContext = React.createContext();
export const ToDoDispatchContext = React.createContext();

function App() {

  useEffect(() => {
    fetch("http://localhost:3001/toDoList", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
    }).then((res => res.json()))
      .then((json) => {
        const selectedData = JSON.stringify(json);

        if (selectedData) {
          const todoList = JSON.parse(selectedData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
          //dataId.current = parseInt(selectedData[0].id) + 1;
          dataId.current = parseInt(todoList[0].id) + 1;
          dispatch({ type: "INIT", data: todoList });
        }
      })
  }, [])

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(6); //dataId 초기값 6

  //CREATE
  const onCreate = (date, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        todo_date: date,
        content
      }
    })
  }

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }

  //EDIT
  const onEdit = (targetId, date, content) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content
      }
    })
  }


  return (
    <ToDoStateContext.Provider value={data}>
      <ToDoDispatchContext.Provider
        value={
          {
            onCreate,
            onEdit,
            onRemove
          }
        }>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/todo/:id" element={<ToDo />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ToDoDispatchContext.Provider>
    </ToDoStateContext.Provider>
  );
}

export default App;
