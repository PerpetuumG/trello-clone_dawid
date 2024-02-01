import BoardPage from '@/app/boards/[boardId]/page';

type PageProps = {
  params: {
    boardId: string;
    cardId: string;
  };
};

const CardPage = ({ params }: PageProps) => {
  return <BoardPage params={params} />;
};
export default CardPage;
