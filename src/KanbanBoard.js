/*
 * @Author: ppm ppmiao@tencent.com
 * @Date: 2025-07-17 12:13:38
 * @LastEditors: ppm ppmiao@tencent.com
 * @LastEditTime: 2025-07-17 12:19:33
 * @FilePath: /my-react/src/KanBan.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;
export default function KanbanBoard({ children }) {
  return (
    // <main className="kanban-board">{ children }</main>
    <main css={kanbanBoardStyles}>{children}</main>
  )
}