import React from 'react';
import {Volume, Book} from '../utils/types';
import * as queries from '../graphql/queries';
import getClient from '../graphql/client';
import {NextPage} from 'next';
import Head from 'next/head';
import bySortPosition from '../utils/bySortPosition';
import Directory from '../components/Directory';
import getBaseUrl from '../utils/getBaseUrl';

type Props = {
  volume?: Volume;
  books?: Array<Book>;
};

const VolumePage: NextPage<Props> = ({volume, books}) => {
  if (!volume || !books) {
    return <>error 404</>;
  }
  return (
    <>
      <Head>
        <title>WikiMarks: {volume.longTitle}</title>
      </Head>
      <Directory
        heading={volume.longTitle}
        entries={books.sort(bySortPosition).map((book) => ({
          id: book.id,
          href: `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
            /\s/g,
            '.',
          )}`,
          title: book.title,
        }))}
      />
    </>
  );
};

VolumePage.getInitialProps = async ({
  query: {volume: volumeRef},
  req,
  res,
}): Promise<Props> => {
  const title = (volumeRef as string).replace(/\./g, ' ');
  const client = getClient(getBaseUrl(req));
  const result = await client.query<
    queries.GetVolume,
    queries.GetVolumeVariables
  >({
    query: queries.getVolume,
    variables: {
      title,
    },
  });

  const volumeData = result.data.volume;

  if (volumeData == null) {
    if (res) {
      res.writeHead(404);
    }
    return {};
  }

  const {books, ...volume} = volumeData;

  return {
    volume: volume as Volume,
    books,
  };
};

export default VolumePage;
