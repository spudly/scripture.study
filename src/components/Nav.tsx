import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useContext,
  ReactNode,
  MouseEvent,
} from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';
import classnames from 'classnames';
import UserContext from '../utils/UserContext';
import {Link, useRouteMatch} from 'react-router-dom';
import hasRole from '../utils/hasRole';
import type {Volume, Book, Chapter, Unstyled} from '../utils/types';
import titleToRef from '../utils/titleToRef';
import {get, compareBy} from '@spudly/pushpop';

const compareNumber = compareBy(get('number'));
const compareSortPosition = compareBy(get('sortPosition'));

const NavButton: FC<
  Unstyled<'button'> & {checked?: boolean; icon?: ReactNode}
> = ({checked, icon, children, ...props}) => (
  <button
    {...props}
    className={classnames(
      'text-4xl focus:outline-none transform text-gray-400 focus:text-white duration-100 inline-flex items-center border border-transparent hover:border-gray-700 focus:border-gray-700 pl-4 pr-2 space-x-2 whitespace-no-wrap',
    )}
  >
    {icon}
    {children}
  </button>
);

const NavLink: FC<
  Unstyled<'a'> & {
    href: string;
    external?: boolean;
    icon?: ReactNode;
  }
> = ({external, icon, children, href, ref, ...props}) => {
  const className = classnames(
    'text-4xl focus:outline-none transform text-gray-400 focus:text-white duration-100 inline-flex items-center border border-transparent hover:border-gray-700 focus:border-gray-700 pl-4 pr-2 space-x-2',
  );
  const childElements = (
    <>
      {icon}
      {children}
    </>
  );

  return external ? (
    <a {...props} href={href} className={className}>
      {childElements}
    </a>
  ) : (
    <Link {...props} to={href} className={className}>
      {childElements}
    </Link>
  );
};

// TODO: rename
const ThingLink: FC<{
  href: string;
  isActive?: boolean;
  small?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}> = ({href, children, small, isActive, onClick}) => (
  <Link
    to={href}
    className={classnames(
      'flex flex-col justify-center items-center p-4 border rounded transform shadow-lg text-center duration-100 bg-white uppercase font-serif font-bold space-y-4 text-xs',
      {
        'w-16 sm:w-32 h-24 sm:h-48 m-2 sm:m-4': !small,
        'w-16 h-16 m-2': small,
        'bg-gray-200 scale-125': isActive,
        'active:scale-110 hover:scale-110 hover:bg-gray-200': !isActive,
      },
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

const VolumeThingLink: FC<{volume: Volume; isActive?: boolean}> = ({
  volume,
  isActive,
}) => {
  return (
    <ThingLink href={`/read/${titleToRef(volume.title)}`} isActive={isActive}>
      {volume.longTitle}
    </ThingLink>
  );
};

const Volumes: FC<{volumes: Array<Volume>; volume?: Volume}> = ({
  volumes,
  volume,
}) => {
  return (
    <>
      {volumes.sort(compareSortPosition).map((v) => (
        <VolumeThingLink
          key={v.id}
          volume={v}
          isActive={volume && v.id === volume.id}
        />
      ))}
    </>
  );
};

const Nav: FC<{
  volumes: Array<Volume>;
  books: Array<Book>;
  chapters: Array<Chapter>;
  volume?: Volume;
  book?: Book;
  chapter?: Chapter;
}> = ({volumes, books, chapters, volume, book, chapter}) => {
  const scrollPositionRef = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
  const [didScrollUp, setDidScrollUp] = useState(true);
  const [selectedView, setSelectedView] = useState<
    'volumes' | 'books' | 'chapters' | null
  >(null);
  const user = useContext(UserContext);
  const read = Boolean(useRouteMatch('/read'));
  const view =
    selectedView ||
    (read
      ? volume == null
        ? 'volumes'
        : book == null
        ? 'books'
        : chapter == null
        ? 'chapters'
        : null
      : null);
  const isVisible = didScrollUp || view != null;

  useEffect(() => {
    const handleScoll = () => {
      const position = window.scrollY;
      setDidScrollUp(position < scrollPositionRef.current);
      scrollPositionRef.current = position;
    };
    window.addEventListener('scroll', handleScoll);
  }, []);

  const toggleView = (view: 'volumes' | 'books' | 'chapters') => () => {
    setSelectedView((v) => (v !== view ? view : null));
  };

  return (
    <div className="fixed top-0 w-full flex flex-col">
      <div
        className={classnames('bg-black duration-100 w-full overflow-hidden', {
          'max-h-0': !isVisible,
          'max-h-20': isVisible,
        })}
      >
        <div className="flex items-center p-2">
          <NavButton onClick={toggleView('volumes')}>
            {volume?.title ?? 'Volume'}
            <MdKeyboardArrowRight
              className={classnames('ml-2 transform duration-100', {
                'rotate-90': view === 'volumes',
              })}
            />
          </NavButton>
          {volume && (
            <NavButton onClick={toggleView('books')}>
              {book?.title ?? 'Book'}
              <MdKeyboardArrowRight
                className={classnames('ml-2 transform duration-100', {
                  'rotate-90': view === 'books',
                })}
              />
            </NavButton>
          )}
          {book && (
            <NavButton onClick={toggleView('chapters')}>
              {chapter?.number ?? 'Chapter'}
              <MdKeyboardArrowRight
                className={classnames('ml-2 transform duration-100', {
                  'opacity-0': view !== 'chapters',
                  'rotate-90': view === 'chapters',
                })}
              />
            </NavButton>
          )}
          <div className="flex-1" />
          {user && hasRole(user, 'author') && (
            <NavLink href="/speakers">Speakers</NavLink>
          )}
          {user ? (
            <NavLink external href="/auth/logout">
              Logout
            </NavLink>
          ) : (
            <NavLink external href="/auth/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <div
        className={classnames('bg-gray-900 duration-100 flex w-full', {
          'h-0 opacity-0': view == null,
          'h-screen opacity-100': view != null,
        })}
      >
        <div className="flex-1 flex justify-start items-start content-start flex-wrap overflow-y-auto">
          {view === 'volumes' && <Volumes volumes={volumes} volume={volume} />}
          {view === 'books' &&
            books.sort(compareSortPosition).map((b) => (
              <ThingLink
                key={b.id}
                href={`/read/${titleToRef(volume!.title)}/${titleToRef(
                  b.title,
                )}`}
                isActive={book && b.id === book.id}
              >
                {b.title}
              </ThingLink>
            ))}
          {view === 'chapters' &&
            chapters.sort(compareNumber).map((c) => (
              <ThingLink
                key={c.id}
                href={`/read/${titleToRef(volume!.title)}/${titleToRef(
                  book!.title,
                )}/${c.number}`}
                isActive={chapter && c.id === chapter.id}
                small
              >
                {c.number}
              </ThingLink>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Nav;
