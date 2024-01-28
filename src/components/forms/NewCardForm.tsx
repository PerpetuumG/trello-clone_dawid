'use client';

import { FormEvent } from 'react';
import { Card, useMutation } from '@/app/liveblocks.config';
import uniqid from 'uniqid';
import { LiveObject } from '@liveblocks/core';

const NewCardForm = ({ columnId }: { columnId: string }) => {
  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get('cards').push(
        new LiveObject<Card>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        }),
      );
    },
    [columnId],
  );

  const handleNewCardFormSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = '';
    }
  };

  return (
    <form onSubmit={handleNewCardFormSubmit}>
      <input type='text' placeholder={'card name'} />
    </form>
  );
};

export default NewCardForm;
