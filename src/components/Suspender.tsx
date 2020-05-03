import {ReactElement} from 'react';
import {Resource} from '../utils/types';

const Suspender = <T extends any>({
  resource,
  children,
}: {
  resource: Resource<T>;
  children: (value: T) => ReactElement;
}) => children(resource.read());

export default Suspender;
