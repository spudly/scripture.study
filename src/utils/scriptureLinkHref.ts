import titleToRef from './titleToRef';

const scriptureLinkHref = (
  volumeTitle?: string,
  bookTitle?: string,
  chapterNumber?: number,
): string => {
  let href = '/scriptures';
  if (volumeTitle) {
    href += `/${titleToRef(volumeTitle)}`;
    if (bookTitle) {
      href += `/${titleToRef(bookTitle)}`;
      if (chapterNumber) {
        href += `/${chapterNumber}`;
      }
    }
  }
  return href;
};

export default scriptureLinkHref;
