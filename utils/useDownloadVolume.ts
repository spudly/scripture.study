import {useCallback, useState} from 'react';
import titleToRef from './titleToRef';
import {Volume} from './types';

type State =
  | {status: 'NOT_DOWNLOADED'}
  | {status: 'DOWNLOADING'; progress: number}
  | {status: 'DOWNLOADED'}
  | {status: 'ERROR'; error: Error};

const SIZE = 10 * 1024 * 1024; // 10mb

const useFetchVolume = (volume: Volume) => {
  const [state, setState] = useState<State>({status: 'NOT_DOWNLOADED'});

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
    const handleProgress = () => {
      switch (bgFetch.result) {
        case '':
          setState({
            status: 'DOWNLOADING',
            progress: Math.round(bgFetch.downloaded / SIZE),
          });
          break;
        case 'failure':
          setState({status: 'ERROR', error: new Error(bgFetch.failureReason)});
          break;
        case 'success':
          setState({status: 'DOWNLOADED'});
          return;
        default: {
          const neverFetchResult: never = bgFetch.result;
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
