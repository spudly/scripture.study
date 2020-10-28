import React, {ReactElement} from 'react';
import {PersonRecord} from '../types';

export const serializePerson = ({
  name,
  order,
  description,
}: PersonRecord): string =>
  [`${name ?? ''}${order ?? ''}`, description]
    .filter((x) => x != null && x !== '')
    .join(', ');

export const serializePersonJsx = (
  {name, order, description}: PersonRecord,
  includeDescription = true,
): ReactElement => (
  <>
    {name}
    {order && <sup>{order}</sup>}
    {includeDescription === true && <>, {description}</>}
  </>
);
