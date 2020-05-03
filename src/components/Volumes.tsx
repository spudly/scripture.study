import React, {FC, Suspense} from 'react';
import bySortPosition from '../utils/bySortPosition';
import Directory from '../components/Directory';
import Head from './Head';
import Suspender from './Suspender';
import useFns from '../utils/useFns';
import Spinner from './Spinner';

const Volumes: FC<{}> = () => {
  const resource = useFns({volumes: {fn: 'getAllVolumes'}});
  return (
    <>
      <Head>
        <title>WikiMarks: Volumes</title>
      </Head>
      <Suspense fallback={<Spinner />}>
        <Suspender resource={resource}>
          {({volumes}) => (
            <Directory
              entries={volumes.sort(bySortPosition).map((v) => ({
                id: v.id,
                href: `/${v.title.replace(/\s/g, '.')}`,
                title: v.longTitle,
              }))}
            />
          )}
        </Suspender>
      </Suspense>
    </>
  );
};

export default Volumes;
