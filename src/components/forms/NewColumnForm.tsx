'use client';

import { FormEvent } from 'react';
import { useMutation } from '@/app/liveblocks.config';
import uniqid from 'uniqid';
import { LiveObject } from '@liveblocks/core';

const NewColumnForm = () => {
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage.get('columns').push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 9999,
      }),
    );
  }, []);

  const handleNewColumn = (ev: FormEvent) => {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const columnName = input?.value;

      addColumn(columnName);

      input.value = '';
    }
  };

  return (
    <form onSubmit={handleNewColumn} className='max-w-xs'>
      <label className='block'>
        <span className='text-gray-600 block'>Column name:</span>
        <input type='text' placeholder='new column name' />
      </label>
      <button type='submit' className='mt-2 block w-full'>
        Create column
      </button>
    </form>
  );
};

export default NewColumnForm;
