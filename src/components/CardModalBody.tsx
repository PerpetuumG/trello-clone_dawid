import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import DeleteWithConfirmation from '@/components/DeleteWithConfirmation';
import CancelButton from '@/components/CancelButton';
import { faComments, faFileLines } from '@fortawesome/free-regular-svg-icons';
import CardDescription from '@/components/CardDescription';
import { Composer, Thread } from '@liveblocks/react-comments';
import { useParams, useRouter } from 'next/navigation';
import { Card, useMutation, useStorage, useThreads } from '@/app/liveblocks.config';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { BoardContext, BoardContextProps } from '@/components/BoardContext';
import { shallow } from '@liveblocks/core';

const CardModalBody = () => {
  const router = useRouter();
  const params = useParams();
  const { threads } = useThreads({ query: { metadata: { cardId: params.cardId.toString() } } });
  const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
  const [editMode, setEditMode] = useState(false);

  const card = useStorage(root => {
    return root.cards.find(c => c.id === params.cardId);
  }, shallow);

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get('cards').map(c => c.toObject());
    const index = cards.findIndex(c => c.id === cardId);
    const card = storage.get('cards').get(index);
    for (let updateKey in updateData) {
      card?.set(updateKey as keyof Card, updateData[updateKey]);
    }
  }, []);

  const deleteCard = useMutation(({ storage }, id) => {
    const cards = storage.get('cards');
    const cardIndex = cards.findIndex(c => c.toObject().id === id);
    cards.delete(cardIndex);
  }, []);

  useEffect(() => {
    if (params.cardId && setOpenCard) {
      setOpenCard(params.cardId.toString());
    }
  }, [params]);

  const handleDelete = () => {
    deleteCard(params.cardId);
    if (setOpenCard) {
      setOpenCard(null);
    }
    router.back();
  };

  const handleNameChangeSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const newName = input.value;
      updateCard(params.cardId, { name: newName });
      setEditMode(false);
    }
  };

  return (
    <>
      {!editMode && (
        <div className={'flex justify-between'}>
          <h4 className={'text-2xl'}>{card?.name}</h4>
          <button className={'text-gray-400'} onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}

      {editMode && (
        <div>
          <form onSubmit={handleNameChangeSubmit}>
            <input type='text' defaultValue={card?.name} className={'mb-4'} />
            <button type={'submit'} className={'w-full'}>
              Save
            </button>
          </form>

          <div className={'mt-2'}>
            <DeleteWithConfirmation onDelete={() => handleDelete()} />
          </div>

          <CancelButton onClick={() => setEditMode(false)} />
        </div>
      )}

      {!editMode && (
        <div>
          <h2 className={'flex gap-2 items-center mt-4'}>
            <FontAwesomeIcon icon={faFileLines} />
            Description
          </h2>
          <CardDescription />

          <h2 className={'flex gap-2 items-center mt-4'}>
            <FontAwesomeIcon icon={faComments} />
            Comments
          </h2>
          <div className={'-mx-4'}>
            {threads &&
              threads.map(thread => (
                <div key={thread.id}>
                  <Thread id={thread.id} thread={thread} />
                </div>
              ))}
            {threads?.length === 0 && (
              <div>
                <Composer metadata={{ cardId: params.cardId.toString() }} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardModalBody;
