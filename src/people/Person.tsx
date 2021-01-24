import {stringify} from 'querystring';
import React, {FC} from 'react';
import {useQuery} from 'react-query';
import fetchJson from '../utils/fetchJson';
import {GetAllResponseBody, ID, PersonLinkRecord} from '../types';
import usePerson from '../api/usePerson';
import Heading from '../widgets/Heading';
import Spacer from '../widgets/Spacer';
import uniqBy from '../utils/uniqBy';
import Box from '../widgets/Box';
import FamilyTree from './FamilyTree';
import PersonVerses from './PersonVerses';

const Person: FC<{id: string}> = ({id}) => {
  const [self] = usePerson(id);
  const {data: links} = useQuery(
    ['people_links', id],
    async (): Promise<Array<PersonLinkRecord>> => {
      const [
        {items: linksFromPerson},
        {items: linksToPerson},
      ] = await Promise.all([
        fetchJson<GetAllResponseBody<PersonLinkRecord>>(
          `/api/people-links?${stringify({
            fromPersonId: id,
          })}`,
        ),
        fetchJson<GetAllResponseBody<PersonLinkRecord>>(
          `/api/people-links?${stringify({
            toPersonId: id,
          })}`,
        ),
      ]);
      const siblingLinks = (
        await Promise.all(
          linksFromPerson
            .filter(l => l.type === 'childOf')
            .map(async parentLink => {
              const result = await fetchJson<
                GetAllResponseBody<PersonLinkRecord>
              >(
                `/api/people-links?${stringify({
                  toPersonId: parentLink.toPersonId,
                  type: 'childOf',
                })}`,
              );
              return result.items;
            }),
        )
      ).flat();
      return uniqBy(link => link.id, [
        ...linksFromPerson,
        ...siblingLinks,
        ...linksToPerson,
      ]);
    },
  );

  if (!self) {
    return <h1>no such person</h1>;
  }

  return (
    <>
      <Heading>{self.name}</Heading>

      {self.description && (
        <>
          <Heading level={2}>Description</Heading>
          <p>{self.description}</p>
        </>
      )}

      {links && (
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
