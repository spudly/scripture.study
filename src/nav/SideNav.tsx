import React, {
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import Overlay from '../widgets/Overlay';
import classnames from 'classnames';
import {
  MdClose,
  MdKeyboardArrowRight,
  MdPeople,
  MdSettings,
  MdPerson,
} from 'react-icons/md';
import {VscBook} from 'react-icons/vsc';
import {ImBooks} from 'react-icons/im';
import {BiBook} from 'react-icons/bi';
import {FiLogOut} from 'react-icons/fi';
import Button from '../widgets/Button';
import {NavLink, useLocation} from 'react-router-dom';
import UserContext from '../utils/UserContext';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import {
  getAllChaptersByBookId,
  getAllBooksByVolumeId,
  getAllVolumes,
} from '../api/api.client';
import {useQuery} from 'react-query';
import {BookRecord, VolumeRecord} from '../types';
import useBoolean from '../utils/useBoolean';

const SideNavLink: FC<{
  href: string;
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  level?: 0 | 1 | 2 | 3;
  icon?: ReactNode;
}> = ({href, icon, external, children, onClick, level = 0}) => {
  const className = classnames(
    'flex items-center p-2 space-x-2 hover:bg-gray-800 space-x-2',
    {
      'pl-4': level === 1,
      'pl-8': level === 2,
      'pl-12': level === 3,
    },
  );
  const kids = (
    <>
      {icon}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </>
  );
  return external ? (
    <a href={href} className={className} onClick={onClick}>
      {kids}
    </a>
  ) : (
    <NavLink
      to={href}
      className={className}
      activeClassName="bg-gray-700"
      onClick={onClick}
    >
      {kids}
    </NavLink>
  );
};

const SideNavLinkBranch: FC<
  ComponentProps<typeof SideNavLink> & {
    icon?: ReactNode;
    label: ReactNode;
    isOpen: boolean;
  }
> = ({isOpen: isOpenProp, children, label, ...rest}) => {
  const [isOpen, setIsOpen, , , toggle] = useBoolean(isOpenProp);
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [setIsOpen, isOpenProp]);
  return (
    <>
      <SideNavLink {...rest} onClick={toggle}>
        <div>{label}</div>
        <div className="flex-1" />
        <OpenIndicator isOpen={isOpen} />
      </SideNavLink>
      {isOpen && children}
    </>
  );
};

const ChapterLinks: FC<{
  volume: VolumeRecord;
  book: BookRecord;
  closeSideNav: () => void;
}> = ({volume, book, closeSideNav}) => {
  const {data: {items: chapters = undefined} = {}} = useQuery(
    ['chapters', book.id],
    useCallback((key, bookId) => getAllChaptersByBookId(bookId), []),
  );

  return (
    <div className="flex flex-wrap pl-8">
      {chapters?.map((chapter) => (
        <NavLink
          key={chapter.id}
          to={scriptureLinkHref(volume.title, book.title, chapter.number)}
          className="block m-2 p-2 w-12 h-12 text-center"
          activeClassName="bg-gray-700"
          onClick={closeSideNav}
        >
          {chapter.number}
        </NavLink>
      ))}
    </div>
  );
};

const BookLinks: FC<{
  volume: VolumeRecord;
  bookTitle?: string;
  closeSideNav: () => void;
}> = ({volume, bookTitle, closeSideNav}) => {
  const {data: {items: books = undefined} = {}} = useQuery(
    ['books', volume.id],
    useCallback((key, volumeId) => getAllBooksByVolumeId(volumeId), []),
    {enabled: volume},
  );

  return (
    <>
      {books?.map((book) => (
        <SideNavLinkBranch
          key={book.id}
          isOpen={book.title === bookTitle}
          href={scriptureLinkHref(volume.title, book.title)}
          icon={<BiBook />}
          label={book.title}
          level={2}
        >
          {book.title === bookTitle && (
            <ChapterLinks
              volume={volume}
              book={book}
              closeSideNav={closeSideNav}
            />
          )}
        </SideNavLinkBranch>
      ))}
    </>
  );
};

const VolumeLinks: FC<{
  volumeTitle?: string;
  bookTitle?: string;
  closeSideNav: () => void;
}> = ({volumeTitle, bookTitle, closeSideNav}) => {
  const {data: {items: volumes = undefined} = {}} = useQuery(
    ['volumes'],
    getAllVolumes,
  );

  return (
    <>
      {volumes?.map((volume) => (
        <SideNavLinkBranch
          key={volume.id}
          isOpen={volume.title === volumeTitle}
          href={scriptureLinkHref(volume.title)}
          icon={<ImBooks />}
          label={volume.title}
          level={1}
        >
          {volume.title === volumeTitle && (
            <BookLinks
              volume={volume}
              bookTitle={bookTitle}
              closeSideNav={closeSideNav}
            />
          )}
        </SideNavLinkBranch>
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

const SideNavDivider: FC = () => <hr className="border-t border-gray-700" />;

const SideNav: FC<{isOpen: boolean; close: () => void}> = ({isOpen, close}) => {
  const user = useContext(UserContext);
  const {
    match: scriptureMatch,
    volumeTitle,
    bookTitle,
  } = useScripturesRouteMatch();
  const loc = useLocation();

  return (
    <div className="fixed z-10">
      {isOpen && <Overlay darken onClick={close} />}
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
          <span className="text-base">Scripture Study</span>
          <Button minimal aria-label="Close">
            <MdClose onClick={close} />
          </Button>
        </div>

        <SideNavDivider />

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
              closeSideNav={close}
            />
          )}
        </SideNavLinkBranch>

        <SideNavLink href="/people" icon={<MdPeople />} onClick={close}>
          People
        </SideNavLink>

        <div className="flex-1" />
        <SideNavDivider />

        {user ? (
          <>
            <SideNavLink
              href="/user/profile"
              icon={<MdPerson />}
              onClick={close}
            >
              {user.name}
            </SideNavLink>
            <SideNavLink
              href={`/user/settings`}
              icon={<MdSettings />}
              onClick={close}
            >
              Settings
            </SideNavLink>
            <SideNavLink
              external
              href={`/auth/logout?authRedirectUrl=${loc.pathname}`}
              icon={<FiLogOut />}
            >
              Logout
            </SideNavLink>
          </>
        ) : (
          <SideNavLink
            external
            href={`/auth/google?authRedirectUrl=${loc.pathname}`}
          >
            Login
          </SideNavLink>
        )}
      </div>
    </div>
  );
};

export default SideNav;
