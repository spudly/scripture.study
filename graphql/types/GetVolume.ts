/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVolume
// ====================================================

export interface GetVolume_volume_books {
  __typename: "Book";
  id: string;
  volumeId: string;
  title: string;
  longTitle: string;
  subtitle: string;
  shortTitle: string;
  sortPosition: number;
}

export interface GetVolume_volume {
  __typename: "Volume";
  id: string;
  title: string;
  longTitle: string;
  shortTitle: string;
  sortPosition: number;
  books: GetVolume_volume_books[];
}

export interface GetVolume {
  volume: GetVolume_volume | null;
}

export interface GetVolumeVariables {
  title: string;
}
