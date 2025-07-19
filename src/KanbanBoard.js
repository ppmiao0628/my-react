/*
 * @Author: ppm ppmiao@tencent.com
 * @Date: 2025-07-17 12:13:38
 * @LastEditors: ppmiao ppmiao@tencent.com
 * @LastEditTime: 2025-07-19 08:06:33
 * @FilePath: /my-react/src/KanBan.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;

export const COLUMN_KEY_TODO = 'COLUMN_KEY_TODO';
export const COLUMN_KEY_ONGOING = 'COLUMN_KEY_ONGOING';
export const COLUMN_KEY_DONE = 'COLUMN_KEY_DONE';
export function KanbanBoard({ 
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onMove,
}) {

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (e) => { 
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }
    dragSource && onMove(dragSource, draggedItem);
    dragTarget && onAdd(dragTarget, draggedItem);
  }
  const handleAdd = (newCard) => {
    onAdd(COLUMN_KEY_TODO, newCard);
  }
  return (
    <main css={kanbanBoardStyles}>
      <KanbanColumn className="column-todo" title="待处理"
        canAddNew={true}
        onAdd={handleAdd}
        cardList={todoList}
        setDraggedItem={setDraggedItem}
        setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
        setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
        onDrop={handleDrop}
      >
      </KanbanColumn>
      <KanbanColumn
        className="column-ongoing"
        title="进行中"
        cardList={ongoingList}
        setDraggedItem={setDraggedItem}
        setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
        setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
        onDrop={handleDrop}
      >
      </KanbanColumn>
      <KanbanColumn
        className="column-done"
        title="已完成"
        cardList={doneList}
        setDraggedItem={setDraggedItem}
        setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
        setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
        onDrop={handleDrop}
      >
      </KanbanColumn>
    </main>
  )
}