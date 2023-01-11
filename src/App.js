import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import ToDo from './pages/ToDo';
import Edit from './pages/Edit';

import ToDoEditor from './components/ToDoEditor';
import MyFooter from './components/MyFooter';
import { useEffect, useReducer, useRef } from 'react';

import React from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
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
  //localStorage.setItem('todo', JSON.stringify(newState));
  return newState;
}
export const ToDoStateContext = React.createContext();
export const ToDoDispatchContext = React.createContext();

function App() {

  // useEffect(() => {
  //   const post = {
  //     id: "idddd"
  //   };
  //   console.log(post.id);
  //   fetch("http://localhost:3001/idplz", {
  //     method: "post", // 통신방법
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(post),
  //   });
  // }, [])

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
          dataId.current = parseInt(selectedData[0].id) + 1;

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
        date: new Date(date).getTime(),
        content
      }
    })
    dataId.current += 1;
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
