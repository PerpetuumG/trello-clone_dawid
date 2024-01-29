'use client';

import { deleteBoard } from '@/app/actions/boardActions';
import { useRouter } from 'next/navigation';

const BoardDeleteButton = ({ boardId }: { boardId: string }) => {
  const router = useRouter();

  const handleDeleteBoard = async () => {
    await deleteBoard(boardId);
    router.push('/');
  };

  return (
    <div className={''}>
      <button
        className={'bg-red-500 text-white px-4 py-2 rounded-md'}
        onClick={() => handleDeleteBoard()}
      >
        Delete board
      </button>
    </div>
  );
};

export default BoardDeleteButton;
