/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMarks
// ====================================================

export interface UpdateMarks_updateMarks {
  __typename: "MutationResponse";
  success: boolean;
  message: string;
}

export interface UpdateMarks {
  updateMarks: UpdateMarks_updateMarks | null;
}

export interface UpdateMarksVariables {
  marks: MarkUpdate[];
}
