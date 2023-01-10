import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import ToDo from './pages/ToDo';
import Edit from './pages/Edit';

import ToDoEditor from './components/ToDoEditor';
import MyFooter from './components/MyFooter';
import { useReducer, useRef } from 'react';

import React from 'react';

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

  return newState;
}
export const ToDoStateContext = React.createContext();
export const ToDoDispatchContext = React.createContext();

function App() {
  const dummyData = [
    {
      id: 1,
      emotion: 1,
      content: "할 일 1번",
      date: 1673008252332
    },
    {
      id: 2,
      emotion: 2,
      content: "할 일 2번",
      date: 1673008252333
    },
    {
      id: 3,
      emotion: 3,
      content: "할 일 3번",
      date: 1673008252334
    },
    {
      id: 4,
      emotion: 4,
      content: "할 일 4번",
      date: 1673008252335
    },
    {
      id: 5,
      emotion: 5,
      content: "할 일 5번",
      date: 1673008252336
    }
  ]

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
  const [data, dispatch] = useReducer(reducer, dummyData);

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
