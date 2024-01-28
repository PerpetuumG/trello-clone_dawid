'use server';

import { getUserEmail } from '@/lib/userClient';
import { liveblocksClient } from '@/lib/liveblocksClient';
import Board from '@/components/Board';

type PageProps = {
  params: {
    boardId: string;
  };
};

const BoardPage = async (props: PageProps) => {
  const boardId = props.params.boardId;
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);

  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes('room:write');

  if (!hasAccess) {
    return <div>Access denied!</div>;
  }

  return (
    <div>
      Board: {boardInfo.metadata.boardName}
      <Board id={boardId} />
    </div>
  );
};

export default BoardPage;
