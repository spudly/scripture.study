import React, {FC, Suspense} from 'react';
import bySortPosition from '../utils/bySortPosition';
import Directory from '../components/Directory';
import Head from './Head';
import Suspender from './Suspender';
import Spinner from './Spinner';
import ErrorBoundary from './ErrorBoundary';
import useVolumes from '../utils/useVolumes';

const Volumes: FC<{}> = () => {
  const resource = useVolumes();
  return (
    <>
      <Head>
        <title>WikiMarks: Volumes</title>
      </Head>
      <ErrorBoundary grow>
        <Suspense fallback={<Spinner grow />}>
          <Suspender resource={resource}>
            {(volumes) => (
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
      </ErrorBoundary>
    </>
  );
};

export default Volumes;
