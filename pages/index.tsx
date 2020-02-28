import React, { FC } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Volume } from "../utils/types";
import normalize from "../utils/normalize";
import { gql } from "apollo-boost";
import Spinner from "../components/Spinner";

const Index: FC<{}> = () => {
  const { loading, error, data } = useQuery<{
    volumes: Array<{ id: string; title: string }>;
  }>(gql`
    {
      volumes {
        id
        title
      }
    }
  `);
  return error ? (
    <>Error</>
  ) : loading ? (
    <Spinner />
  ) : data ? (
    <div className="flex h-screen">
      {data.volumes.map(v => (
        <a
          key={v.id}
          href={normalize(v.title)}
          className="block w-24 h-24 border rounded"
        >
          {v.title}
        </a>
      ))}
    </div>
  ) : null;
};

export default Index;
