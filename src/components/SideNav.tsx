import React, {
  ComponentProps,
  FC,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import Overlay from './reusable/Overlay';
import classnames from 'classnames';
import {MdClose, MdKeyboardArrowRight} from 'react-icons/md';
import {VscBook} from 'react-icons/vsc';
import Button from './reusable/Button';
import {NavLink} from 'react-router-dom';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import {queries} from '../data-sources/fetch';
import {useQuery} from 'react-query';
import {Book, Volume} from '../utils/types';
import useToggle from '../utils/useToggle';

const SideNavLink: FC<{
  href: string;
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  level?: 0 | 1 | 2 | 3;
}> = ({href, external, children, onClick, level = 0}) => {
  const className = classnames(
    'flex items-center p-2 space-x-2 hover:bg-gray-800 space-x-2',
    {
      'pl-4': level === 1,
      'pl-8': level === 2,
      'pl-12': level === 3,
    },
  );
  return external ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <NavLink
      to={href}
      className={className}
      activeClassName="bg-gray-700"
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

const SideNavLinkBranch: FC<
  ComponentProps<typeof SideNavLink> & {
    icon?: ReactNode;
    label: ReactNode;
    isOpen: boolean;
  }
> = ({icon, isOpen: isOpenProp, children, label, ...rest}) => {
  const [isOpen, toggle] = useToggle(isOpenProp);
  useEffect(() => {
    toggle(isOpenProp);
  }, [toggle, isOpenProp]);
  return (
    <>
      <SideNavLink {...rest} onClick={toggle}>
        {icon}
        <div>{label}</div>
        <div className="flex-1" />
        <OpenIndicator isOpen={isOpen} />
      </SideNavLink>
      {isOpen && children}
    </>
  );
};

const ChapterLinks: FC<{
  volume: Volume;
  book: Book;
  toggleSideNav: (arg: unknown) => void;
}> = ({volume, book, toggleSideNav}) => {
  const {
    data: chapters,
  } = useQuery(`getChaptersByBookId(${volume?.id}, ${book?.id})`, () =>
    queries.getAllChaptersByBookId(volume.id, book.id),
  );

  return (
    <div className="flex flex-wrap pl-8">
      {chapters?.map((chapter) => (
        <>
          <NavLink
            to={scriptureLinkHref(volume.title, book.title, chapter.number)}
            className="block m-2 p-2 w-12 h-12 text-center"
            activeClassName="bg-gray-700"
            onClick={() => toggleSideNav(false)}
          >
            {chapter.number}
          </NavLink>
        </>
      ))}
    </div>
  );
};

const BookLinks: FC<{
  volume: Volume;
  bookTitle?: string;
  toggleSideNav: (arg: unknown) => void;
}> = ({volume, bookTitle, toggleSideNav}) => {
  const {data: books} = useQuery(
    `getAllBooksByVolumeId(${volume.id})`,
    () => queries.getAllBooksByVolumeId(volume!.id),
    {enabled: volume},
  );

  return (
    <>
      {books?.map((book) => (
        <>
          <SideNavLinkBranch
            isOpen={book.title === bookTitle}
            href={scriptureLinkHref(volume.title, book.title)}
            label={book.title}
            level={2}
          >
            {book.title === bookTitle && (
              <ChapterLinks
                volume={volume}
                book={book}
                toggleSideNav={toggleSideNav}
              />
            )}
          </SideNavLinkBranch>
        </>
      ))}
    </>
  );
};

const VolumeLinks: FC<{
  volumeTitle?: string;
  bookTitle?: string;
  toggleSideNav: (arg: unknown) => void;
}> = ({volumeTitle, bookTitle, toggleSideNav}) => {
  const {data: volumes} = useQuery('getAllVolumes', queries.getAllVolumes);

  return (
    <>
      {volumes?.map((volume) => (
        <>
          <SideNavLinkBranch
            isOpen={volume.title === volumeTitle}
            href={scriptureLinkHref(volume.title)}
            label={volume.title}
            level={1}
          >
            {volume.title === volumeTitle && (
              <BookLinks
                volume={volume}
                bookTitle={bookTitle}
                toggleSideNav={toggleSideNav}
              />
            )}
          </SideNavLinkBranch>
        </>
      ))}
    </>
  );
};

const OpenIndicator: FC<{isOpen: boolean}> = ({isOpen}) => (
  <MdKeyboardArrowRight
    className={classnames('transform duration-50', {
      'rotate-90': isOpen,
    })}
  />
);

const SideNav: FC<{isOpen: boolean; toggle: (arg?: unknown) => void}> = ({
  isOpen,
  toggle,
}) => {
  const user = useContext(UserContext);
  const {
    match: scriptureMatch,
    volumeTitle,
    bookTitle,
  } = useScripturesRouteMatch();

  return (
    <div className="fixed z-10">
      {isOpen && <Overlay darken onClick={toggle} />}
      <div
        className={classnames(
          'flex flex-col w-128 max-w-3/4 bg-gray-900 text-gray-100 fixed top-0 bottom-0 overflow-hidden duration-200 text-2xl overflow-y-auto',
          {
            '-left-128': !isOpen,
            'left-0': isOpen,
          },
        )}
      >
        <div className="flex p-2 items-center justify-between">
          <span className="text-base">scripture.study</span>
          <Button minimal>
            <MdClose onClick={() => toggle(false)} />
          </Button>
        </div>

        {user && hasRole(user, 'author') && (
          <SideNavLink href="/speakers">People</SideNavLink>
        )}

        <SideNavLinkBranch
          isOpen={scriptureMatch}
          href="/scriptures"
          icon={<VscBook />}
          label="Scriptures"
        >
          {scriptureMatch && (
            <VolumeLinks
              volumeTitle={volumeTitle}
              bookTitle={bookTitle}
              toggleSideNav={toggle}
            />
          )}
        </SideNavLinkBranch>

        <div className="flex-1" />

        {user ? (
          <SideNavLink external href="/auth/logout">
            Logout
          </SideNavLink>
        ) : (
          <SideNavLink external href="/auth/login">
            Login
          </SideNavLink>
        )}
      </div>
    </div>
  );
};

export default SideNav;
