import React, {FC} from 'react';
import Spacer from './Spacer';
import Verses from './Verses';
import Pagination from './Pagination';
import {Volume, Book, Chapter as $Chapter, Verse, Person} from '../utils/types';

type Props = {
  volume: Volume;
  book: Book;
  chapter: $Chapter;
  prev: string | null;
  next: string | null;
  verses: Array<Verse>;
  people: Array<Person>;
};

const Chapter: FC<Props> = ({
  volume,
  book,
  chapter,
  verses,
  people,
  prev,
  next,
}) => {
  return (
    <div className="flex-1 flex flex-col px-4 sm:px-32">
      {chapter.number === 1 && (
        <h1 className="text-center text-6xl uppercase font-serif select-none">
          {book.longTitle}
        </h1>
      )}
      <h2 className="text-center text-4xl uppercase font-serif select-none">
        {chapter.number === 1 ? 'Chapter' : book.title} {chapter.number}
      </h2>

      <Spacer y={8} />

      <p className="text-4xl italic font-serif select-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus
        suscipit congue. Quisque accumsan posuere elementum. Morbi nec sapien
        convallis, condimentum diam non, aliquet tellus.
      </p>

      <Spacer y={8} />
      <Pagination prevHref={prev} nextHref={next} />
      <Verses verses={verses} allSpeakers={people} />
    </div>
  );
};

export default Chapter;
