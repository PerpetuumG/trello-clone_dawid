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

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  };
};

type RoomEvent = {};

type ThreadMetadata = {
  cardId: string;
};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
  /* ...all the other hooks you’re using... */
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client, {
  resolveUsers: async ({ userIds }) => {
    const response = await fetch('/api/users?ids=' + userIds.join(','));
    return await response.json();
  },
  resolveMentionSuggestions: async ({ text }) => {
    const response = await fetch('/api/users?search=' + text);
    const users = await response.json();
    return users.map((user: UserMeta) => user.id);
  },
});
