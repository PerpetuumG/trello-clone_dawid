'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { deleteBoard, removeEmailFromBoard, updateBoard } from '@/app/actions/boardActions';
import { RoomAccesses } from '@liveblocks/node';

const EmailsAccessList = ({
  boardId,
  usersAccesses,
}: {
  boardId: string;
  usersAccesses: RoomAccesses;
}) => {
  const router = useRouter();

  const handleDelete = async (emailToDelete: string) => {
    await removeEmailFromBoard(boardId, emailToDelete);
    router.refresh();
  };

  return (
    <div className={'max-w-xs'}>
      {Object.keys(usersAccesses).map(email => (
        <div
          key={email}
          className={'flex gap-2 my-4 items-center max-w-xs justify-between border rounded-lg pl-4'}
        >
          {email}
          <button className='btn p-1' onClick={() => handleDelete(email)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmailsAccessList;
