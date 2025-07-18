/*
 * @Author: ppm ppmiao@tencent.com
 * @Date: 2025-07-17 12:17:21
 * @LastEditors: ppmiao ppmiao@tencent.com
 * @LastEditTime: 2025-07-18 22:17:50
 * @FilePath: /my-react/src/KanBanColumn.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState} from 'react';
import { KanbanCard } from './KanbanCard';
import { KanbanNewCard } from './KanbanNewCard';
export default function KanbanColumn({
  className, title,
  cardList = [],
  canAddNew = false,
  onAdd,
  setDraggedItem,
  setIsDragSource = () => { },
  setIsDragTarget = () => { },
  onDrop
 }) {
  const combinedClassName = `kanban-column ${className}`;

  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (e) => {
    setShowAdd(true);
  }
  const handleSubmit = (newCard) => {
    onAdd && onAdd(newCard);
    setShowAdd(false);
  }
  return (
    <section
      onDragStart={()=>setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      }}
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'none';
        setIsDragTarget(false);
      }}
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
      }}
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
      className={combinedClassName}>
      <h2>
        {title}
        {
          canAddNew && <button onClick={handleAdd} disabled={showAdd}>&#8853; 添加新卡片</button>
        }
      </h2>
      <ul>
        { 
          canAddNew && showAdd && <KanbanNewCard onSubmit={handleSubmit} />
        }
        {
          cardList.map(props => (
            <KanbanCard
              key={props.title}
              onDragStart={()=>setDraggedItem(props)}
              {...props}
            />))
        }
      </ul>
    </section>
  )
}