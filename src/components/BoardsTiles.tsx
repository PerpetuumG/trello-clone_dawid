'use client';

import { RoomInfo } from '@liveblocks/node';
import Link from 'next/link';
import PresenceAvatars from '@/components/PresenceAvatars';
import { RoomProvider } from '@/app/liveblocks.config';

const BoardsTiles = ({ boards }: { boards: RoomInfo[] }) => {
  return (
    <div className={'my-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2'}>
      {boards?.length > 0 &&
        boards.map(board => (
          <Link
            href={`/boards/${board.id}`}
            key={board.id}
            className={'bg-gray-200 border px-8 py-12 rounded-md block relative'}
          >
            {board.metadata.boardName}
            <div className={'absolute bottom-1 right-1'}>
              <RoomProvider id={board.id} initialPresence={{}}>
                <PresenceAvatars presenceKey={'boardId'} presenceValue={board.id} />
              </RoomProvider>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BoardsTiles;
