import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import bySortPosition from '../utils/bySortPosition';
import Head from './Head';
import Spinner from './Spinner';
import ProgressSpinner from './ProgressSpinner';
import {Volume} from '../utils/types';
import {MdFileDownload} from 'react-icons/md';
import useFetchVolume from '../utils/useDownloadVolume';
import useAsync from '../utils/useAsync';
import {queries} from '../queries/fetch';
import ErrorAlert from './ErrorAlert';

const VolumeThing: FC<{volume: Volume}> = ({volume}) => {
  const [download, downloadState] = useFetchVolume(volume);
  const [hasServiceWorker, setHasServiceWorker] = useState(false);

  const className =
    'flex flex-row sm:flex-col-reverse justify-between items-center p-4 border rounded transform hover:scale-125 sm:m-4 shadow-lg text-center active:scale-110 duration-75 bg-white uppercase hover:bg-gray-200 w-full sm:w-40 sm:h-40';

  const link = (
    <Link
      key={volume.id}
      to={`/${volume.title.replace(/\s/g, '.')}`}
      className={className}
    >
      {volume.longTitle}
    </Link>
  );

  useEffect(() => {
    navigator.serviceWorker.ready.then(() => setHasServiceWorker(true));
  }, []);

  if (!hasServiceWorker) {
    return link;
  }

  switch (downloadState.status) {
    case 'NOT_DOWNLOADED':
      return (
        <button type="button" className={className} onClick={download}>
          {volume.longTitle}
          <MdFileDownload size="3em" />
        </button>
      );
    case 'DOWNLOADING':
      return (
        <div className={className}>
          {downloadState.progress != null ? (
            <ProgressSpinner progress={downloadState.progress} grow />
          ) : (
            <Spinner />
          )}
          {volume.longTitle}
        </div>
      );
    case 'DOWNLOADED':
      return link;
    case 'ERROR':
      return <p>Crap</p>;
    default: {
      const neverState: never = downloadState;
      throw new Error(`Unhandled status: ${neverState}`);
    }
  }
};

const Volumes: FC<{}> = () => {
  const {result: volumes, error} = useAsync(queries.getAllVolumes);

  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  if (!volumes) {
    return <Spinner grow />;
  }

  return (
    <>
      <Head>
        <title>WikiMarks: Volumes</title>
      </Head>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center content-center font-serif">
          {volumes.sort(bySortPosition).map((volume) => (
            <VolumeThing key={volume.id} volume={volume} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Volumes;
