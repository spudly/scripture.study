/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVolumes
// ====================================================

export interface GetVolumes_volumes {
  __typename: "Volume";
  id: string;
  title: string;
  longTitle: string;
  shortTitle: string;
  sortPosition: number;
}

export interface GetVolumes {
  volumes: GetVolumes_volumes[];
}
