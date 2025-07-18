/*
 * @Author: ppmiao ppmiao@tencent.com
 * @Date: 2025-07-18 20:52:00
 * @LastEditors: ppmiao ppmiao@tencent.com
 * @LastEditTime: 2025-07-18 22:24:19
 * @FilePath: /my-react/src/KanbanNewCard.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from 'react';
export function KanbanNewCard({ onSubmit, setKey }) {
  const [title, setTitle] = useState('');
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newCard = { title, status: new Date().getTime() };
      onSubmit(newCard);
    }
  }
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" ref={inputElem} value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  )
}