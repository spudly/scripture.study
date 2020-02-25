import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Reference from "../components/Reference";

const ReferencePage: NextPage<{ reference: string }> = props => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return isMounted ? <Reference reference={props.reference} /> : null;
};

ReferencePage.getInitialProps = async ({ query: { ref } }) => ({
  reference: ref as string
});

export default ReferencePage;
