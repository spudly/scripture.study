import React, {FC} from 'react';
import {MdErrorOutline} from '@meronex/icons/md';

const Alert: FC = ({children}) => (
  <div className="flex-1 flex items-center justify-center bg-red-200 border border-red-800 text-red-800 p-2">
    <MdErrorOutline size="auto" className="flex-1 min-w-8 max-w-64 mr-4" />
    {children}
  </div>
);

export default Alert;
