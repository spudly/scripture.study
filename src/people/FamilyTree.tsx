import React, {ComponentProps, FC, useEffect, useRef, useState} from 'react';
import {PersonLinkRecord, PersonRecord} from '../utils/types';
import CircleButton from '../widgets/CircleButton';
import useToggle from '../utils/useToggle';
import PersonLinkDialog from './PersonLinkDialog';
import {MdAdd} from 'react-icons/md';
import FamilyTreePerson from './FamilyTreePerson';
import Arrow from './Arrow';
import uniqBy from '../utils/uniqBy';
import useResizeObserver from './useResizeObserver';
import centerBy from '../utils/centerBy';

const FamilyTree: FC<{
  self: PersonRecord;
  links: Array<PersonLinkRecord>;
}> = ({self, links}) => {
  const [arrows, setArrows] = useState<Array<ComponentProps<typeof Arrow>>>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [width, height] = useResizeObserver(rootRef);
  const individualsRef = useRef<{[id: string]: HTMLDivElement | null}>({});
  const [
    showAddLinkDialog,
    toggleShowAddLinkDialog,
    setShowAddLinkDialog,
  ] = useToggle(false);

  useEffect(() => {
    const rootRect = rootRef.current!.getBoundingClientRect()!;
    const newArrows: Array<ComponentProps<typeof Arrow>> = links.flatMap(
      (link) => {
        if (link.type === 'childOf') {
          if (
            !individualsRef.current[link.toPersonId] ||
            !individualsRef.current[link.toPersonId]
          ) {
            debugger;
          }
          const parentRect = individualsRef.current[
            link.toPersonId
          ]!.getBoundingClientRect();
          const childRect = individualsRef.current[
            link.fromPersonId
          ]!.getBoundingClientRect();
          return [
            {
              from: {
                x: parentRect.left + parentRect.width / 2 - rootRect.left,
                y: parentRect.bottom - rootRect.top,
              },
              to: {
                x: childRect.left + childRect.width / 2 - rootRect.left,
                y: childRect.top - rootRect.top,
              },
            },
          ];
        } else {
          return [];
        }
      },
    );
    setArrows(newArrows);
  }, [links, width, height]);

  const parentLinks = uniqBy((l) => l.toPersonId, links ?? []).filter(
    (l) => l.type === 'childOf' && l.fromPersonId === self.id,
  );

  const siblingLinks = centerBy(
    (link) => link.fromPersonId === self.id,
    uniqBy((link) => link.fromPersonId, links ?? []).filter(
      (l) => l.type === 'childOf' && l.toPersonId !== self.id,
    ),
  );

  const childLinks = uniqBy((l) => l.fromPersonId, links ?? []).filter(
    (l) => l.type === 'childOf' && l.toPersonId === self.id,
  );

  return (
    <>
      <div className="relative" ref={rootRef}>
        <div className="flex justify-around">
          {parentLinks.map((link) => (
            <FamilyTreePerson
              key={link.id}
              id={link.toPersonId}
              ref={(el) => {
                individualsRef.current[link.toPersonId] = el;
              }}
            />
          ))}
        </div>
        <div className="flex justify-around">
          {siblingLinks.map((link) => (
            <FamilyTreePerson
              key={link.id}
              id={link.fromPersonId}
              isActive={link.fromPersonId === self.id}
              ref={(el) => {
                individualsRef.current[link.fromPersonId] = el;
              }}
            />
          ))}
          {siblingLinks.find((l) => l.fromPersonId === self.id) ? null : (
            <FamilyTreePerson
              id={self.id}
              isActive
              ref={(el) => {
                individualsRef.current[self.id] = el;
              }}
            />
          )}
        </div>
        <div className="flex justify-around">
          {childLinks.map((link) => (
            <FamilyTreePerson
              key={link.id}
              id={link.fromPersonId}
              ref={(el) => {
                individualsRef.current[link.fromPersonId] = el;
              }}
            />
          ))}
        </div>
        {arrows.map((arrow, i) => (
          <Arrow key={i} {...arrow} />
        ))}
        <div className="absolute right-0 bottom-0">
          <CircleButton themeId="blue" onClick={toggleShowAddLinkDialog}>
            <MdAdd />
          </CircleButton>
        </div>
      </div>
      {showAddLinkDialog && (
        <PersonLinkDialog
          self={self}
          close={() => setShowAddLinkDialog(false)}
        />
      )}
    </>
  );
};

export default FamilyTree;
