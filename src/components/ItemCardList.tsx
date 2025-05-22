import type { IProduct } from '../constant';
import { Card } from './Card';

interface CardProps {
  list: IProduct[];
  title?: string;
}

export const ItemCardList: React.FunctionComponent<CardProps> = (props) => {
  return (
    <section className='w-full bg-white dark:border-gray-700 dark:bg-gray-800'>
      {props.title && (
        <h2 className='my-4 text-center text-4xl font-bold text-black dark:text-white'>
          {props.title}
        </h2>
      )}
      <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {props.list.map((item) => (
          <li key={item.id}>
            <Card {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
};
