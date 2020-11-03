import React, {FC} from 'react';

const Directory: FC = ({children}) => (
  <div className="flex-1 flex justify-around items-center content-around flex-wrap overflow-y-auto">
    {children}
  </div>
);

export default Directory;
