import React, {FC, ReactNode, useMemo} from 'react';
import {useInfiniteQuery} from 'react-query';
import {isNotNil} from '@spudly/pushpop';
import fetchJson from '../utils/fetchJson';
import {
  BookRecord,
  ChapterRecord,
  GetAllResponseBody,
  ID,
  MarkRecord,
  MarkRecordPlus,
  PersonRecord,
  VerseRecord,
  VolumeRecord,
} from '../types';
import Verse from '../scriptures/Verse';
import Heading from '../widgets/Heading';
import Spacer from '../widgets/Spacer';
import Button from '../widgets/Button';
import Spinner from '../widgets/Spinner';

// TODO: move to types file
type MarkedVerse = {
  verse: VerseRecord;
  chapter: ChapterRecord;
  book: BookRecord;
  volume: VolumeRecord;
  marks: Array<MarkRecord>;
};

const VERSES_PER_PAGE = 5;

const flattenAndCombineMarks = (
  groups: Array<GetAllResponseBody<MarkRecordPlus>> = [],
): Array<MarkedVerse> => {
  const x = groups.filter(isNotNil).flatMap((group) => group.items);
  const y = x.reduce<Array<MarkedVerse>>(
    (
      markedVerses,
      {
        verse: {
          chapter: {
            book: {volume, ...book},
            ...chapter
          },
          ...verse
        },
        ...mark
      },
    ) => {
      const lastIndex = markedVerses.length - 1;
      const prevMarkedVerse = markedVerses[lastIndex];
      if (prevMarkedVerse?.verse.id === verse.id) {
        return [
          ...markedVerses.slice(0, lastIndex),
          {...prevMarkedVerse, marks: [...prevMarkedVerse.marks, mark]},
        ];
      }
      return [
        ...markedVerses,
        {
          book,
          chapter,
          marks: [mark],
          verse,
          volume,
        },
      ];
    },
    [],
  );

  return y;
};

const PersonVerses: FC<{
  person: PersonRecord;
}> = ({person}) => {
  const {
    data: markGroups,
    fetchMore,
    isFetching,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['verses', 'marks', person.id],
    async (_, __, speakerId: ID, offset: number) => {
      return await fetchJson<GetAllResponseBody<MarkRecordPlus>>(
        `/api/verses/bySpeakerId/${encodeURIComponent(
          speakerId,
        )}?limit=${encodeURIComponent(
          VERSES_PER_PAGE,
        )}&offset=${encodeURIComponent(offset ?? '')}`,
      );
    },
    {
      getFetchMore: (lastGroup) => {
        const nextOffset = lastGroup.offset + VERSES_PER_PAGE;
        return nextOffset < lastGroup.count ? nextOffset : null;
      },
    },
  );

  const markedVerses = useMemo(() => flattenAndCombineMarks(markGroups), [
    markGroups,
  ]);

  if (isFetching && !isFetchingMore) {
    return <Spinner grow />;
  }

  let prevChapter: ChapterRecord | null = null;
  const lastGroup = markGroups?.[markGroups.length - 1];
  return (
    <>
      {lastGroup && (
        <div className="float-right text-xs text-gray-500">
          Showing 1-{lastGroup.offset + VERSES_PER_PAGE} of {lastGroup.count}
        </div>
      )}
      {markedVerses.map(({verse, chapter, book, volume, marks}) => {
        const els: Array<ReactNode> = [];
        if (prevChapter?.id !== chapter.id) {
          if (prevChapter != null) {
            els.push(<Spacer key={`${chapter.id}-spacer`} y={8} />);
          }
          els.push(
            <Heading key={chapter.id} level={3}>
              {book.title} {chapter.number}
            </Heading>,
          );
          prevChapter = chapter;
        }
        els.push(
          <div className="text-2xl" key={verse.id}>
            <Verse
              id={verse.id}
              number={verse.number}
              text={verse.text}
              marks={marks}
              speakers={[person]}
            />
          </div>,
        );
        return els;
      })}
      {canFetchMore && (
        <div className="text-center">
          <Button onClick={() => fetchMore()}>
            {isFetchingMore ? (
              <>
                <Spinner />
                <Spacer x={2} />
                Loading More...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default PersonVerses;
