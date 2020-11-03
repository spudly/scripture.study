import React, {ComponentProps, FC, ReactNode, useEffect} from 'react';
import useBoolean from '../utils/useBoolean';
import OpenIndicator from '../widgets/OpenIndicator';
import SideNavLink from './SideNavLink';

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

export default SideNavLinkBranch;
