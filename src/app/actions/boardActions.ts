'use server';

import { Liveblocks, RoomInfo } from '@liveblocks/node';
import uniqid from 'uniqid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const createBoard = async (name: string): Promise<boolean | RoomInfo> => {
  const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
  });

  const session = await getServerSession(authOptions);
  const email = session?.user?.email || '';
  if (email) {
    const roomId = uniqid.time();
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ['room:write'],
      },
      metadata: {
        boardName: name,
      },
    });
  }

  return false;
};
