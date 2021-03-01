import React, {FC, Fragment} from 'react';
import {useQuery} from 'react-query';
import {PersonRecord} from '../types';
import {getAllPeople} from '../api/api.client';
import getCircas from '../utils/getCircas';

type TimelinePerson = PersonRecord & {circaBirth: number; circaDeath: number};

const getTimelinePeople = async () => {
  const {items: people} = await getAllPeople();
  return people
    .flatMap((p): TimelinePerson[] => {
      const {birth, death} = getCircas(p);
      if (!birth || !death) {
        return [];
      }
      return [{...p, circaBirth: birth, circaDeath: death}];
    })
    .sort((a, b) => a.circaBirth - b.circaBirth);
};

const Time: FC = () => {
  const {data: timelinePeople = undefined} = useQuery(
    'people',
    getTimelinePeople,
  );

  const pixelsPerYear: number = 1;

  const cols: Array<Array<TimelinePerson>> = [[]];
  timelinePeople?.forEach(person => {
    let col = cols.find(c => {
      const lastPerson = c[c.length - 1];
      if (!lastPerson) {
        return true;
      }
      return lastPerson.circaDeath! < person.circaBirth;
    });
    if (!col) {
      col = [];
      cols.push(col);
    }
    col.push(person);
  });
  const startYear = timelinePeople?.[0].circaBirth ?? 0;
  return (
    <div className="flex justify-between">
      {cols.map((col, colIndex) => {
        return (
          // TODO: make cols into objects, so we can give them keys
          <div key={colIndex}>
            {col.map((p, personIndex) => {
              const prevDeath =
                personIndex === 0 ? startYear : col[personIndex - 1].circaDeath;
              return (
                <Fragment key={p.id}>
                  <div
                    style={{height: (p.circaBirth - prevDeath) * pixelsPerYear}}
                  />
                  <div
                    className="border border-black"
                    style={{
                      height: (p.circaDeath - p.circaBirth) * pixelsPerYear,
                    }}
                  >
                    {p.name ?? <i>Unnamed</i>} [c.{Math.abs(p.circaBirth)}-
                    {Math.abs(p.circaDeath)}{' '}
                    {p.circaDeath < 0 ? 'B.C.' : 'A.D.'}]
                  </div>
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Time;
