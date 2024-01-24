import Board from '@/components/Board';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import LoginView from '@/components/views/LoginView';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginView />;
  }

  return (
    <div>
      <h1 className={'text-4xl'}>Your boards:</h1>
        boards go here...

      {/*<Board />*/}
    </div>
  );
}
