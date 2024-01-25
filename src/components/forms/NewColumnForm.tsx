'use client';

import { FormEvent } from 'react';

const NewColumnForm = () => {
  const handleNewColumn = (ev: FormEvent) => {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector('input');
    const columnName = input?.value;
    alert('new column: ' + columnName);
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
