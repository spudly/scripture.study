import React, {ReactElement} from 'react';
import {PersonRecord} from '../types';
import superNumber from './superNumber';

export const serializePerson = ({
  name,
  order,
  description,
}: PersonRecord): string =>
  [`${name ?? ''}${order ? superNumber(order) : ''}`, description]
    .filter(x => x != null && x !== '')
    .join(', ');

export const serializePersonJsx = (
  {name, order, description}: PersonRecord,
  {includeDescription = true}: {includeDescription: boolean | 'as-needed'},
): ReactElement => {
  const shouldRenderDescription =
    description &&
    (includeDescription === true ||
      (includeDescription === 'as-needed' && !name));
  return (
    <>
      {name}
      {name && order && <sup>{order}</sup>}
      {shouldRenderDescription && (
        <>
          {name ? ', ' : ''}
          {description}
        </>
      )}
    </>
  );
};
