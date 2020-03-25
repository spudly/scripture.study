/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMarks
// ====================================================

export interface GetMarks_marks {
  __typename: "Mark";
  id: string;
  type: string;
  verseId: string;
  range: number[] | null;
  speakerId: string;
}

export interface GetMarks {
  marks: GetMarks_marks[];
}

export interface GetMarksVariables {
  verseIds: string[];
}
