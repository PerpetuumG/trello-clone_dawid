import { NextRequest } from 'next/server';
import { liveblocksClient } from '@/lib/liveblocksClient';
import { Liveblocks } from '@liveblocks/node';

export const PUT = async (req: NextRequest) => {
  const { id, update } = await req.json();
  const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET_KEY as string });

  await liveblocksClient.updateRoom(id, update);

  return Response.json(true);
};
