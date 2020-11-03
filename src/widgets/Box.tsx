import React, {FC} from 'react';

const Box: FC = ({children}) => (
  <div className="border shadow p-2">{children}</div>
);

export default Box;
