import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import LogoutButton from '@/components/LogoutButton';
import LoginButton from '@/components/LoginButton';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className={'bg-gray-200 p-4 px-8'}>
      <div className={'flex justify-between items-center'}>
        <a href='' className={'logo'}>
          Trello
        </a>

        <div>
          {session && (
            <>
              Hello, {session?.user?.name}
              <LogoutButton />
            </>
          )}

          {!session && (
            <>
              Not logged in
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;