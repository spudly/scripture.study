import React, {
  ComponentProps,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {MdAdd} from '@meronex/icons/md';
import {PersonLinkRecord, PersonRecord} from '../types';
import CircleButton from '../widgets/CircleButton';
import uniqBy from '../utils/uniqBy';
import hasRole from '../utils/hasRole';
import UserContext from '../utils/UserContext';
import PersonLinkDialog from './PersonLinkDialog';
import FamilyTreePerson from './FamilyTreePerson';
import Arrow from './Arrow';
import useResizeObserver from './useResizeObserver';

const FamilyTree: FC<{
  self: PersonRecord;
  links: Array<PersonLinkRecord>;
}> = ({self, links}) => {
  const user = useContext(UserContext);
  const [arrows, setArrows] = useState<Array<ComponentProps<typeof Arrow>>>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [width, height] = useResizeObserver(rootRef);
  const individualsRef = useRef<{[id: string]: HTMLDivElement | null}>({});
  const [showAddLinkDialog, setShowAddLinkDialog] = useState(false);
  const [editLink, setEditLink] = useState<PersonLinkRecord | null>(null);

  useEffect(() => {
    const rootRect = rootRef.current!.getBoundingClientRect()!;
    const newArrows: Array<ComponentProps<typeof Arrow>> = links.flatMap(
      link => {
        if (link.type !== 'childOf' && link.type !== 'descendantOf') {
          return [];
        }
        const toRect = individualsRef.current[
          link.toPersonId
        ]?.getBoundingClientRect();
        const fromRect = individualsRef.current[
          link.fromPersonId
        ]?.getBoundingClientRect();
        if (!fromRect || !toRect) {
          return [];
        }
        return [
          {
            dashed: link.type === 'descendantOf',
            from: {
              x: fromRect.left + fromRect.width / 2 - rootRect.left,
              y: fromRect.top - rootRect.top,
            },
            to: {
              x: toRect.left + toRect.width / 2 - rootRect.left,
              y: toRect.bottom - rootRect.top,
            },
          },
        ];
      },
    );
    setArrows(newArrows);
  }, [links, width, height]);

  const ancestorLinks = uniqBy(l => l.toPersonId, links ?? []).filter(
    l => l.type === 'descendantOf' && l.fromPersonId === self.id,
  );
  const descendantLinks = uniqBy(l => l.toPersonId, links ?? []).filter(
    l => l.type === 'descendantOf' && l.toPersonId === self.id,
  );

  const parentLinks = uniqBy(l => l.toPersonId, links ?? []).filter(
    l => l.type === 'childOf' && l.fromPersonId === self.id,
  );

  const siblingLinks = uniqBy(link => link.fromPersonId, links ?? []).filter(
    l => l.type === 'childOf' && l.toPersonId !== self.id,
  );
  const indexOfSelf = siblingLinks.findIndex(
    link => link.fromPersonId === self.id,
  );
  const siblingsWithoutSelf = [
    ...siblingLinks.slice(0, indexOfSelf),
    ...siblingLinks.slice(indexOfSelf + 1),
  ];
  const centerIndex = Math.floor(siblingsWithoutSelf.length / 2);
  const spouseLinks = uniqBy(
    l => (l.toPersonId === self.id ? l.fromPersonId : l.toPersonId),
    (links ?? []).filter(l => l.type === 'spouseOf'),
  );
  const siblingAndSpouseLinks = [
    ...siblingsWithoutSelf.slice(0, centerIndex),
    siblingLinks[indexOfSelf],
    ...spouseLinks,
    ...siblingsWithoutSelf.slice(centerIndex),
  ].filter(Boolean);
  console.log({siblingAndSpouseLinks});

  const childLinks = uniqBy(l => l.fromPersonId, links ?? []).filter(
    l => l.type === 'childOf' && l.toPersonId === self.id,
  );

  return (
    <>
      <div className="relative" ref={rootRef}>
        <div className="flex justify-around">
          {[...ancestorLinks, ...parentLinks].map(link => (
            <FamilyTreePerson
              key={link.id}
              id={link.toPersonId}
              ref={el => {
                individualsRef.current[link.toPersonId] = el;
              }}
              link={link}
              setEditLink={setEditLink}
            />
          ))}
        </div>
        <div className="flex justify-around">
          {siblingAndSpouseLinks.map(link => (
            <FamilyTreePerson
              key={link.id}
              id={link.fromPersonId}
              isActive={link.fromPersonId === self.id}
              ref={el => {
                individualsRef.current[link.fromPersonId] = el;
              }}
              link={link}
              setEditLink={setEditLink}
            />
          ))}
          {siblingAndSpouseLinks.find(
            l => l.fromPersonId === self.id,
          ) ? null : (
            <FamilyTreePerson
              id={self.id}
              isActive
              ref={el => {
                individualsRef.current[self.id] = el;
              }}
              setEditLink={setEditLink}
            />
          )}
        </div>
        <div className="flex justify-around">
          {[...childLinks, ...descendantLinks].map(link => (
            <FamilyTreePerson
              key={link.id}
              id={link.fromPersonId}
              ref={el => {
                individualsRef.current[link.fromPersonId] = el;
              }}
              link={link}
              setEditLink={setEditLink}
            />
          ))}
        </div>
        {arrows.map((arrow, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Arrow key={i} {...arrow} />
        ))}
        {hasRole('author', user) && (
          <div className="absolute right-0 bottom-0">
            <CircleButton
              themeId="blue"
              onClick={() => setShowAddLinkDialog(true)}
            >
              <MdAdd />
            </CircleButton>
          </div>
        )}
      </div>
      {showAddLinkDialog && (
        <PersonLinkDialog
          self={self}
          close={() => setShowAddLinkDialog(false)}
        />
      )}
      {editLink && (
        <PersonLinkDialog
          self={self}
          link={editLink}
          close={() => setEditLink(null)}
        />
      )}
    </>
  );
};

export default FamilyTree;
