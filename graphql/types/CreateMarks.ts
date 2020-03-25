/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewMark } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMarks
// ====================================================

export interface CreateMarks_createMarks {
  __typename: "MutationResponse";
  success: boolean;
  message: string;
}

export interface CreateMarks {
  createMarks: CreateMarks_createMarks | null;
}

export interface CreateMarksVariables {
  marks: NewMark[];
}
