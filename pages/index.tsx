import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Volume } from "../utils/types";
import normalize from "../utils/normalize";
import Spinner from "../components/Spinner";
import * as queries from "../graphql/queries";
import client from "../graphql/client";
import { NextPage } from "next";
import bySortPosition from "../utils/bySortPosition";
import Directory from "../components/Directory";

const Index: NextPage<{ volumes: Array<Volume> }> = ({ volumes }) => (
  <Directory
    entries={volumes.sort(bySortPosition).map(v => ({
      id: v.id,
      href: `/${v.title.replace(/\s/g, ".")}`,
      title: v.longTitle
    }))}
  />
);

Index.getInitialProps = async () => {
  const {
    data: { volumes }
  } = await client.query({ query: queries.getVolumes });
  return {
    volumes
  };
};

export default Index;
