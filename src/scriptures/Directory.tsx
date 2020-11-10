import React, {FC} from 'react';

const Directory: FC = ({children}) => (
  <div className="flex justify-around items-center content-around flex-wrap">
    {children}
  </div>
);

export default Directory;
