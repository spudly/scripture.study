import React, {FC} from 'react';
import {useQuery} from 'react-query';
import fetchJson from '../utils/fetchJson';
import {stringify} from 'querystring';
import type {Audited, ID, PersonLinkRecord} from '../utils/types';
import usePerson from '../api/usePerson';
import FamilyTree from './FamilyTree';

const Person: FC<{id: string}> = ({id}) => {
  const [self] = usePerson(id);
  const {data: links} = useQuery(
    ['people_links', id],
    async (
      key: string,
      selfId: ID,
    ): Promise<Array<Audited<PersonLinkRecord>>> => {
      const [parentLinks, childLinks] = await Promise.all([
        fetchJson<Array<Audited<PersonLinkRecord>>>(
          `/api/people-links?${stringify({
            type: 'childOf',
            fromPersonId: selfId,
          })}`,
        ),
        fetchJson<Array<Audited<PersonLinkRecord>>>(
          `/api/people-links?${stringify({
            type: 'childOf',
            toPersonId: selfId,
          })}`,
        ),
      ]);
      const siblingLinks = (
        await Promise.all(
          parentLinks.map((parentLink) =>
            fetchJson<Array<Audited<PersonLinkRecord>>>(
              `/api/people-links?${stringify({
                type: 'childOf',
                toPersonId: parentLink.toPersonId,
              })}`,
            ),
          ),
        )
      ).flat();
      return [...parentLinks, ...siblingLinks, ...childLinks];
    },
  );

  if (!self) {
    return <h1>no such person</h1>;
  }

  return (
    <div className="font-serif">
      <h1 className="text-3xl">{self.name}</h1>
      <h5 className="text-gray-400 text-xs mb-2">{self.id}</h5>

      <section className="border border-gray-400 p-2 shadow mb-2">
        <h2 className="font-bold uppercase mb-2">Biography</h2>
        {self.biography}
      </section>

      {links && (
        <section className="border border-gray-400 p-2 shadow mb-2">
          <h2 className="font-bold uppercase mb-2">Family</h2>
          <FamilyTree self={self} links={links} />
        </section>
      )}
    </div>
  );
};

export default Person;
