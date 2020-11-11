import React, {FC} from 'react';
import {MdRecordVoiceOver} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {ID, PersonRecord} from '../types';
import {serializePerson, serializePersonJsx} from '../utils/serializePerson';

const SpeakerIndicator: FC<{
  speakerId: ID;
  speakers: Array<PersonRecord>;
}> = ({speakers, speakerId}) => {
  const speaker = speakers.find(s => s.id === speakerId);
  if (!speaker) {
    return null;
  }
  return (
    <Link
      to={`/people/${speakerId}`}
      className="inline-flex flex-col justify-center w-rel-8 h-rel-8 mx-rel-1 align-middle overflow-hidden select-none transform hover:scale-110 focus:outline-none focus:shadow-outline"
      data-selection-ignore
      title={serializePerson(speaker)}
    >
      <div className="flex justify-center">
        <MdRecordVoiceOver />
      </div>
      <div className="text-rel-3xs text-center truncate uppercase leading-none min-w-0 pt-1">
        {serializePersonJsx(speaker, {includeDescription: 'as-needed'})}
      </div>
    </Link>
  );
};

export default SpeakerIndicator;
