import {useCallback, useState, useEffect} from 'react';
import titleToRef from './titleToRef';
import {Volume} from './types';

type State =
  | {status: 'NOT_DOWNLOADED'}
  | {status: 'DOWNLOADING'; progress: number | null}
  | {status: 'DOWNLOADED'}
  | {status: 'ERROR'; error: Error};

const SIZE = 10 * 1024 * 1024; // 10mb

const dbExists = async (name: string) => {
  const dbs = await indexedDB.databases();
  return dbs.some((db) => db.name === name);
};

const useFetchVolume = (volume: Volume) => {
  const [state, setState] = useState<State>({status: 'NOT_DOWNLOADED'});

  useEffect(() => {
    let unloaded = false;
    const effect = async () => {
      const exists = await dbExists(volume.id);
      if (exists && !unloaded) {
        setState({status: 'DOWNLOADED'});
      }
    };
    effect();
    return () => {
      unloaded = true;
    };
  }, [volume.id]);

  const download = useCallback(async () => {
    const swReg = await navigator.serviceWorker.ready;
    setState({status: 'DOWNLOADING', progress: 0});
    const bgFetch = await swReg.backgroundFetch.fetch(
      volume.title,
      [`/data/volumes/${titleToRef(volume.title)}.json`],
      {
        title: volume.title,
        icons: [], // TODO
        downloadTotal: SIZE,
      },
    );
    const handleProgress = (event: any) => {
      const progress: BackgroundFetchRegistration = event.currentTarget;
      switch (progress.result) {
        case '':
          console.log(
            'DOWNLOAD PROGRESS:',
            progress.downloaded,
            '/',
            progress.downloadTotal,
            `(${Math.round((progress.downloaded / SIZE) * 100)}%)`,
          );
          setState({
            status: 'DOWNLOADING',
            progress: progress.downloadTotal
              ? progress.downloaded / SIZE
              : null,
          });
          break;
        case 'failure':
          setState({status: 'ERROR', error: new Error(progress.failureReason)});
          break;
        case 'success':
          setState({status: 'DOWNLOADED'});
          return;
        default: {
          const neverFetchResult: never = progress.result;
          throw new Error(neverFetchResult);
        }
      }
    };
    bgFetch.addEventListener('progress', handleProgress);
    return () => bgFetch.removeEventListener('progress', handleProgress);
  }, [volume.title]);

  return [download, state] as const;
};

export default useFetchVolume;
