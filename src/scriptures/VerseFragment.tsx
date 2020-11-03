import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';
import classnames from 'classnames';
import {MarkRecord, PersonRecord} from '../types';
import {theme} from '../utils/themes';
import ErrorBoundary from '../widgets/ErrorBoundary';
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
  const speakerIds = marks.flatMap((m) =>
    (m.type === 'speaker' ? [m.speakerId] : []),
  );
  const user = useContext(UserContext);
  const isAuthor = hasRole('author', user);
  const lastSpeakerId = speakerIds[speakerIds.length - 1];
  const lastMark = marks[marks.length - 1];
  const classes = classnames(
    lastSpeakerId &&
      theme(allSpeakerIds.indexOf(lastSpeakerId), {
        colors: ['bgColor', 'textColor'],
        states:
          isVerseNumber || !isAuthor || !selectMarks
            ? ['default']
            : selectedMarkIds?.includes(lastMark.id)
            ? ['activated']
            : undefined,
      }),
    'py-rel-2',
    {'cursor-pointer': isAuthor && marks.length !== 0 && selectMarks},
  );
  const mark = marks.length ? (
    <mark className={classes}>
      <ErrorBoundary grow>
        {speakerIds.map((id) => (
          <SpeakerIndicator key={id} speakerId={id} speakers={speakers} />
        ))}
      </ErrorBoundary>
      {children}
    </mark>
  ) : null;
  return mark ? (
    isAuthor && selectMarks ? (
      <>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          // TODO: for now, we'll support selecting a single mark. eventually it'd be nice to prompt the user to choose which mark they want to select.
          onClick={
            selectMarks
              ? (e) => {
                  e.stopPropagation();
                  const markId = marks[marks.length - 1].id;
                  if (e.ctrlKey) {
                    selectMarks((markIds) => [...(markIds ?? []), markId]);
                  } else {
                    selectMarks([markId]);
                  }
                }
              : undefined
          }
        >
          {mark}
        </a>
      </>
    ) : (
      mark
    )
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default VerseFragment;
