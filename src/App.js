import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import ToDo from './pages/ToDo';
import Edit from './pages/Edit';

import ToDoEditor from './components/ToDoEditor';
import MyFooter from './components/MyFooter';

const reducer = (state, action) => {
  let newState = [];

  switch (action) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      break;
    }

    case "REMOVE": {
      break;
    }

    case "EDIT": {
      break;
    }
    default:
      return state;
  }

  return newState;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
