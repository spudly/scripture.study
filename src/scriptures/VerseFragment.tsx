import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';
import classnames from 'classnames';
import {diff, unique} from '@spudly/pushpop';
import {MarkRecord, PersonRecord} from '../types';
import {theme} from '../utils/themes';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import SpeakerIndicator from './SpeakerIndicator';

const VerseFragment: FC<{
  children: ReactNode;
  isVerseNumber?: boolean;
  marks: Array<MarkRecord>;
  selectMarks?: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds?: Array<string>;
  speakerIds: Array<string>;
  speakers: Array<PersonRecord>;
}> = ({
  isVerseNumber = false,
  children,
  selectMarks,
  marks,
  selectedMarkIds,
  speakerIds: allSpeakerIds,
  speakers,
}) => {
  const speakerIds = marks.flatMap(m =>
    m.type === 'speaker' ? [m.speakerId] : [],
  );
  const user = useContext(UserContext);

  if (!marks.length) {
    return <>{children}</>;
  }

  const isAuthor = hasRole('author', user);
  const lastSpeakerId = speakerIds[speakerIds.length - 1];
  const lastMark = marks[marks.length - 1];

  const toggleCurrentMarks = () => {
    const currentMarkIds = marks.map(m => m.id);
    selectMarks?.(markIds =>
      markIds.includes(currentMarkIds[0])
        ? [...diff(markIds, currentMarkIds)]
        : unique([...markIds, ...currentMarkIds]),
    );
  };

  const isSelectable = isAuthor && selectMarks;

  return (
    <mark
      role="button"
      className={classnames(
        lastSpeakerId &&
          theme(allSpeakerIds.indexOf(lastSpeakerId), {
            colors: ['bgColor', 'textColor'],
            states:
              isVerseNumber || !isSelectable
                ? ['default']
                : selectedMarkIds?.includes(lastMark.id)
                ? ['activated']
                : undefined,
          }),
        'py-rel-2',
        {
          'cursor-pointer': isSelectable,
          'focus:outline-none': isSelectable,
          'focus:shadow-outline': isSelectable,
        },
      )}
      onClick={
        isSelectable
          ? e => {
              e.stopPropagation();
              const markId = marks[marks.length - 1].id;
              if (e.ctrlKey) {
                selectMarks?.(markIds => [...(markIds ?? []), markId]);
              } else {
                selectMarks?.([markId]);
              }
            }
          : undefined
      }
      onKeyDown={
        isSelectable
          ? e => {
              switch (e.key) {
                case 'Escape':
                  e.preventDefault();
                  selectMarks?.([]);
                // eslint-disable-next-line no-fallthrough
                case ' ':
                case 'Spacebar': // older browsers according to MDN
                case 'Space Bar': // older browsers according to MDN
                  e.preventDefault();
                  toggleCurrentMarks();
              }
            }
          : undefined
      }
      tabIndex={isSelectable ? 0 : undefined}
    >
      {speakerIds.map(id => (
        <SpeakerIndicator key={id} speakerId={id} speakers={speakers} />
      ))}
      {children}
    </mark>
  );
};

export default VerseFragment;
