'use client';

import React from 'react';
import { BoardContextProvider } from '@/components/BoardContext';
import { RoomProvider } from '@/app/liveblocks.config';
import { useParams } from 'next/navigation';
import { LiveList } from '@liveblocks/core';

type PageProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const BoardLayout = ({ children, modal }: PageProps) => {
  const params = useParams();

  return (
    <BoardContextProvider>
      <RoomProvider
        id={params.boardId.toString()}
        initialPresence={{}}
        initialStorage={{ columns: new LiveList(), cards: new LiveList() }}
      >
        {children}
        {modal}
      </RoomProvider>
    </BoardContextProvider>
  );
};

export default BoardLayout;
