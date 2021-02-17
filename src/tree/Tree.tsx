import React, {FC, useMemo} from 'react';
import {useQuery} from 'react-query';
import {GetAllResponseBody, PersonLinkRecord} from '../types';
import fetchJson from '../utils/fetchJson';
import {getAllPeople} from '../api/api.client';
import buildTree from './buildTree';

const Tree: FC = () => {
  const {data: links} = useQuery(
    ['people_links'],
    async (): Promise<Array<PersonLinkRecord>> => {
      const result = await fetchJson<GetAllResponseBody<PersonLinkRecord>>(
        `/api/people-links`,
      );
      return result.items;
    },
  );
  const {data: {items: people = undefined} = {}, error} = useQuery(
    'people',
    getAllPeople,
  );
  const tree = useMemo(
    () => (links && people ? buildTree(links, people) : []),
    [links, people],
  );
  return (
    <table>
      <tbody>
        {tree.map((row, index) => (
          <tr key={row[0] ?? index}>
            <td>Generation {index}</td>
            {row.map(personId => (
              <td key={personId} className="border border-gray-900">
                {personId}
                {/* <FamilyTreePerson id={personId} /> */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tree;
