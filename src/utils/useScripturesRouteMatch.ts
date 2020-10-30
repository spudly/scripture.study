import refToNumber from './refToNumber';
import refToTitle from './refToTitle';
import {useRouteMatch} from 'react-router';

const useScripturesRouteMatch = (): {
  match: boolean;
  volumeTitle: string | undefined;
  bookTitle: string | undefined;
  chapterNumber: number | undefined;
} => {
  const match = useRouteMatch<{
    volumeRef?: string;
    bookRef?: string;
    chapterRef?: string;
  }>('/scriptures/:volumeRef?/:bookRef?/:chapterRef?');

  const {
    params: {volumeRef, bookRef, chapterRef},
  } = match ?? {params: {}};

  return {
    bookTitle: bookRef ? refToTitle(bookRef) : undefined,
    chapterNumber: chapterRef ? refToNumber(chapterRef) : undefined,
    match: Boolean(match),
    volumeTitle: volumeRef ? refToTitle(volumeRef) : undefined,
  };
};

export default useScripturesRouteMatch;
