import logo from './logo.svg';
import './App.css';
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

const KanbanBoard = ({ children }) => {
  return (
    // <main className="kanban-board">{ children }</main>
    <main css={css`
      display: flex;
      flex-direction: row;
      flex: 10;
      gap: 1rem;
      margin: 0 1rem 1rem;
      `}>{children}</main>
  )
}
const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

const KanbanCard = ({ title, status }) => {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return function cleanup() {
      clearInterval(intervalId);
    }
  }, [status])
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status" title={status}>{displayTime}</div>
    </li>
  );
};

const KanbanNewCard = ({ onSubmit, setKey }) => {
  const [title, setTitle] = useState('');
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e) => {
    console.log('ppm e-36', e);
    if (e.key === 'Enter') {
      onSubmit(title, setKey);
      console.log('ppm setKey-40', setKey);
    }
  }
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  )
}

function App() {
  const [showAdd, setShowAdd] = useState(false);
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
  const handleAdd = (e) => {
    setShowAdd(true);
  }
  const SetKeyMap = {
    setTodoList,
    setOngoingList,
    setDoneList

  }
  const handleSubmit = (title, setKey) => {
    SetKeyMap[setKey](currentTodoList => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ])
    // todoList.unshift({ title, status: new Date().toDateString() });
    // setShowAdd(false);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanColumn className="column-todo" title={
          <>
            待处理<button onClick={handleAdd} disabled={showAdd}>&#8853; 添加新卡片</button>
          </>
        }>
        {showAdd && <KanbanNewCard onSubmit={handleSubmit} setKey={ 'setTodoList' } />}
        {
          todoList.map(props=><KanbanCard key={props.title} {...props}/>)
        }
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title={
            <>
              进行中<button>&#8853; 添加新卡片</button>
            </>
          }>
          <KanbanNewCard onSubmit={handleSubmit} setKey={ 'setOngoingList' } />
          {
            ongoingList.map(props=><KanbanCard key={props.title} {...props}/>)
          }
        </KanbanColumn>
        <KanbanColumn className="column-done" title={
            <>
              已完成<button>&#8853; 添加新卡片</button>
            </>
          }>
          <KanbanNewCard onSubmit={handleSubmit} setKey={ 'setDoneList' } />
          {
            doneList.map(props=><KanbanCard key={props.title} {...props}/>)
          }
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
