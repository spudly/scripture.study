import refToTitle from './refToTitle';
import refToNumber from './refToNumber';
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
    match: !!match,
    volumeTitle: volumeRef ? refToTitle(volumeRef) : undefined,
    bookTitle: bookRef ? refToTitle(bookRef) : undefined,
    chapterNumber: chapterRef ? refToNumber(chapterRef) : undefined,
  };
};

export default useScripturesRouteMatch;
