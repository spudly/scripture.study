import React, {FC} from 'react';
import {ImBooks} from 'react-icons/im';
import {useQuery} from 'react-query';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import {getAllVolumes} from '../api/api.client';
import SideNavLinkBranch from './SideNavLinkBranch';
import BookLinks from './BookLinks';

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

export default VolumeLinks;
