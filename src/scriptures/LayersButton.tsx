import React, {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import {
  MdCheck,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdLayers,
  MdRecordVoiceOver,
} from '@meronex/icons/md';
import {GoMention} from '@meronex/icons/go';
import classnames from 'classnames';
import {Layers} from '../types';
import Action from '../widgets/Action';

const layerInfo: {
  [KEY in keyof Layers]: {
    key: KEY;
    displayName: string;
    icon: ReactNode;
  };
} = {
  speaker: {
    key: 'speaker',
    displayName: 'Speaker',
    icon: <MdRecordVoiceOver />,
  },
  mention: {
    key: 'mention',
    displayName: 'Mentions',
    icon: <GoMention />,
  },
};

const LayersButton: FC<{
  layers: Layers;
  onChange: Dispatch<SetStateAction<Layers>>;
}> = ({layers, onChange}) => (
  <Action themeId="blue" icon={<MdLayers />}>
    {() => (
      <div className="flex flex-col">
        <ul>
          {Object.values(layerInfo).map(l => (
            <li key={l.key}>
              <button
                type="button"
                className={classnames(
                  'flex items-center space-x-2 text-2xl p-2',
                  {
                    'opacity-50': !layers[l.key],
                  },
                )}
                onClick={() => {
                  onChange(map => ({...map, [l.key]: !map[l.key]}));
                }}
              >
                {layers[l.key] ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                {l.icon}
                <span>{l.displayName}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </Action>
);

export default LayersButton;
