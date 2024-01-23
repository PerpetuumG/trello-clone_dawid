'use client'

const NewColumnForm = () => {
    const handleNewColumn = (ev) => {
      ev.preventDefault()
    }

  return (
    <form onSubmit={handleNewColumn} className={'max-w-xs'}>
      <label className={'block'}>
        <span className={'text-gray-600 block'}>Column name:</span>
        <input type='text' placeholder={'new column name'} />
      </label>
      <button type={'submit'} className={'mt-2 block w-full'}>
        Create column
      </button>
    </form>
  );
};

export default NewColumnForm;
