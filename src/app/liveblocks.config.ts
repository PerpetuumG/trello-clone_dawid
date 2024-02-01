import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';
import { LiveList, LiveObject } from '@liveblocks/core';

const client = createClient({
  // publicApiKey: "pk_dev_kvwxfB1QrIVzudsl4Qd7FZJXDA3pzT8dRNMsABDYUB4o7oQLxCJDG58PvM2TsUst",
  authEndpoint: '/api/liveblocks-auth',
  throttle: 100,
});

type Presence = {
  // cursor: { x: number, y: number } | null,
  // ...
};

export type Column = {
  name: string;
  id: string;
  index: number;
};

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
};

type Storage = {
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<Card>>;
};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  /* ...all the other hooks you’re using... */
} = createRoomContext<
  Presence,
  Storage
  /* UserMeta, RoomEvent, ThreadMetadata */
>(client);
