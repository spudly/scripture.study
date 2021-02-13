import React, {FC, useContext} from 'react';
import classnames from 'classnames';
import {MdClose, MdPeople, MdPerson, MdSettings} from '@meronex/icons/md';
import {VscBook} from '@meronex/icons/vsc';
import {FiLogOut} from '@meronex/icons/fi';
import {useLocation} from 'react-router-dom';
import Button from '../widgets/Button';
import UserContext from '../utils/UserContext';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import Overlay from '../widgets/Overlay';
import SideNavDivider from '../widgets/SideNavDivider';
import SideNavLink from './SideNavLink';
import SideNavLinkBranch from './SideNavLinkBranch';
import VolumeLinks from './VolumeLinks';

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
        data-test-id="side-nav"
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
