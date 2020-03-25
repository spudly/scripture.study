/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMarks
// ====================================================

export interface DeleteMarks_deleteMarks {
  __typename: "MutationResponse";
  success: boolean;
  message: string;
}

export interface DeleteMarks {
  deleteMarks: DeleteMarks_deleteMarks | null;
}

export interface DeleteMarksVariables {
  ids: string[];
}
