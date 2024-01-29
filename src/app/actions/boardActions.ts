'use server';

import { Liveblocks, RoomInfo } from '@liveblocks/node';
import uniqid from 'uniqid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { liveblocksClient } from '@/lib/liveblocksClient';

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

export const addEmailToBoard = async (boardId: string, email: string) => {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses = room.usersAccesses;
  usersAccesses[email] = ['room:write'];

  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
};

export const updateBoard = async (boardId: string, updateData: any) => {
  const result = await liveblocksClient.updateRoom(boardId, updateData);
  return true;
};

export const removeEmailFromBoard = async (boardId: string, email: any) => {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses: any = room.usersAccesses;
  usersAccesses[email] = null;

  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
};

export const deleteBoard = async (boardId: string) => {
  await liveblocksClient.deleteRoom(boardId);
  return true;
};
