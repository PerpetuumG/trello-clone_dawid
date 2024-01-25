'use client';

import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className={'bg-gray-300 py-2 px-4 ml-2 rounded-md inline-flex gap-2 items-center'}
    >
      Logout
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
