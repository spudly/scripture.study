import React from 'react';
import {Volume} from '../utils/types';
import * as queries from '../graphql/queries';
import getClient from '../graphql/client';
import {NextPage} from 'next';
import Head from 'next/head';
import bySortPosition from '../utils/bySortPosition';
import Directory from '../components/Directory';
import getBaseUrl from '../utils/getBaseUrl';

const Index: NextPage<{volumes: Array<Volume>}> = ({volumes}) => (
  <>
    <Head>
      <title>WikiMarks: Volumes</title>
    </Head>
    <Directory
      entries={volumes.sort(bySortPosition).map((v) => ({
        id: v.id,
        href: `/${v.title.replace(/\s/g, '.')}`,
        title: v.longTitle,
      }))}
    />
  </>
);

Index.getInitialProps = async ({req}) => {
  const client = getClient(getBaseUrl(req));
  const {
    data: {volumes},
  } = await client.query<queries.GetVolumes, never>({
    query: queries.getVolumes,
  });
  return {
    volumes,
  };
};

export default Index;
