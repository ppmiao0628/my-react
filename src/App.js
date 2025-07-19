import logo from './logo.svg';
import './App.css';
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { KanbanBoard, COLUMN_KEY_TODO, COLUMN_KEY_ONGOING, COLUMN_KEY_DONE} from './KanbanBoard'

function App() {
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2025-07-13 15:49' },
    { title: '开发任务-3', status: '2025-07-13 12:49' },
    { title: '开发任务-5', status: '2025-07-13 11:49' },
    { title: '测试任务-3', status: '2025-07-11 15:49' }
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '2025-07-13 15:49' },
    { title: '开发任务-6', status: '2025-07-13 15:49' },
    { title: '测试任务-2', status: '2025-07-13 15:49' }
  ]);
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '2025-07-13 15:49' },
    { title: '测试任务-1', status: '2025-07-13 15:49' }
  ]);
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList
  };
  const handleAdd = (column, newCard) => {
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  };
  const handleRemove = (column, cardToRemove) => {
    updaters[column]((currentStat) =>
      currentStat.filter((item) => !Object.is(item, cardToRemove))
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard
        todoList={todoList}
        ongoingList={ongoingList}
        doneList={doneList}
        onAdd={handleAdd}
        onMove={handleRemove}
      />
    </div>
  );
}

export default App;
