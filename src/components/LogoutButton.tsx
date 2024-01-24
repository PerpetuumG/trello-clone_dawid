'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className={'bg-gray-300 py-2 px-4 ml-2 rounded-md'}>
      Logout
    </button>
  );
};

export default LogoutButton;
