import React, { FC } from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { Volume } from "../utils/types";
import normalize from "../utils/normalize";

const Index: NextPage<{
  volumes: Array<Volume>;
}> = ({ volumes }) => {
  return (
    <div className="flex h-screen">
      {volumes.map(v => (
        <a
          key={v.id}
          href={normalize(v.title)}
          className="block w-24 h-24 border rounded"
        >
          {v.title}
        </a>
      ))}
    </div>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/volumes");
  if (res.ok) {
    const { volumes } = await res.json();
    return { volumes };
  }
  throw new Error(res.statusText);
};

export default Index;
