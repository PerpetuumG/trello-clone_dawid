import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className='mt-4 w-full flex gap-2 items-center justify-center uppercase text-sm text-gray-400'
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faClose} />
      Cancel edit
    </button>
  );
};

export default CancelButton;
