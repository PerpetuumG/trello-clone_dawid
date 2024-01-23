'use client';

import NewColumnForm from '@/components/forms/NewColumnForm';
import Column from '@/components/Column';
import { useState } from 'react';

const defaultColumns = [
  { id: '1', name: 'todo', index: 0 },
  { id: '2', name: 'in progress', index: 1 },
  { id: '3', name: 'done', index: 2 },
];

export type CardType = {
  id: string | number;
  name: string;
  index: number;
  columnId: string;
};

const defaultCards = [
  { id: '1', name: 'task 1', index: 0, columnId: '1' },
  { id: '5', name: 'task 5', index: 1, columnId: '1' },
  { id: '2', name: 'task 2', index: 1, columnId: '2' },
  { id: '3', name: 'task 3', index: 2, columnId: '3' },
];

const Board = () => {
  const [cards, setCards] = useState(defaultCards);
  const [columns, setColumns] = useState(defaultColumns);

  return (
    <div className={'flex gap-4'}>
      {defaultColumns.map(column => (
        <Column
          key={column.id}
          {...column}
          setCards={setCards}
          cards={cards.sort((a, b) => a.index - b.index).filter(c => c.columnId === column.id)}
        />
      ))}

      <NewColumnForm />
    </div>
  );
};

export default Board;
