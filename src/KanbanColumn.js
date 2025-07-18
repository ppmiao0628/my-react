/*
 * @Author: ppm ppmiao@tencent.com
 * @Date: 2025-07-17 12:17:21
 * @LastEditors: ppm ppmiao@tencent.com
 * @LastEditTime: 2025-07-17 12:20:15
 * @FilePath: /my-react/src/KanBanColumn.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react';
export default function KanbanColumn({
  children, className, title,
  setIsDragSource = () => { },
  setIsDragTarget = () => { },
  onDrop
 }) {
  const combinedClassName = `kanban-column ${className}`;
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
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}