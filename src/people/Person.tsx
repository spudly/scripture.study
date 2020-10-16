import React, {FC, ReactElement, ReactNode, useMemo} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import fetchJson from '../utils/fetchJson';
import {stringify} from 'querystring';
import {
  ChapterRecord,
  GetAllResponseBody,
  ID,
  PersonLinkRecord,
  PersonRecord,
  MarkRecordPlus,
  BookRecord,
  VolumeRecord,
  VerseRecord,
  MarkRecord,
} from '../utils/types';
import usePerson from '../api/usePerson';
import FamilyTree from './FamilyTree';
import Verse from '../scriptures/Verse';
import Heading from '../widgets/Heading';
import Spacer from '../widgets/Spacer';
import Button from '../widgets/Button';
import Spinner from '../widgets/Spinner';
import {isNotNil} from '@spudly/pushpop';

const Box: FC = ({children}) => (
  <div className="border shadow p-2">{children}</div>
);

const VERSES_PER_PAGE = 5;

type MarkedVerse = {
  verse: VerseRecord;
  chapter: ChapterRecord;
  book: BookRecord;
  volume: VolumeRecord;
  marks: Array<MarkRecord>;
};

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
          verse,
          chapter,
          book,
          volume,
          marks: [mark],
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
            {isFetching ? (
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

const Person: FC<{id: string}> = ({id}) => {
  const [self] = usePerson(id);
  const {data: links} = useQuery(
    ['people_links', id],
    async (key: string, selfId: ID): Promise<Array<PersonLinkRecord>> => {
      const [{items: parentLinks}, {items: childLinks}] = await Promise.all([
        fetchJson<GetAllResponseBody<PersonLinkRecord>>(
          `/api/people-links?${stringify({
            type: 'childOf',
            fromPersonId: selfId,
          })}`,
        ),
        fetchJson<GetAllResponseBody<PersonLinkRecord>>(
          `/api/people-links?${stringify({
            type: 'childOf',
            toPersonId: selfId,
          })}`,
        ),
      ]);
      const siblingLinks = (
        await Promise.all(
          parentLinks.map(async (parentLink) => {
            const result = await fetchJson<
              GetAllResponseBody<PersonLinkRecord>
            >(
              `/api/people-links?${stringify({
                type: 'childOf',
                toPersonId: parentLink.toPersonId,
              })}`,
            );
            return result.items;
          }),
        )
      ).flat();
      return [...parentLinks, ...siblingLinks, ...childLinks];
    },
  );

  if (!self) {
    return <h1>no such person</h1>;
  }

  return (
    <>
      <Heading>{self.name}</Heading>

      {self.biography && (
        <>
          <Heading level={2}>Biography</Heading>
          <p>{self.biography}</p>
        </>
      )}

      {links && links.length !== 0 && (
        <>
          <Spacer y={8} />
          <Heading level={2}>Family</Heading>
          <Box>
            <FamilyTree self={self} links={links} />
          </Box>
        </>
      )}

      <>
        <Spacer y={8} />
        <Heading level={2}>Scriptures</Heading>
        <Box>
          <PersonVerses person={self} />
        </Box>
      </>
    </>
  );
};

export default Person;
