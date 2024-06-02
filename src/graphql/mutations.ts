/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTabGroup = /* GraphQL */ `mutation CreateTabGroup(
  $input: CreateTabGroupInput!
  $condition: ModelTabGroupConditionInput
) {
  createTabGroup(input: $input, condition: $condition) {
    id
    data
    encrypted_with_password
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTabGroupMutationVariables,
  APITypes.CreateTabGroupMutation
>;
export const updateTabGroup = /* GraphQL */ `mutation UpdateTabGroup(
  $input: UpdateTabGroupInput!
  $condition: ModelTabGroupConditionInput
) {
  updateTabGroup(input: $input, condition: $condition) {
    id
    data
    encrypted_with_password
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTabGroupMutationVariables,
  APITypes.UpdateTabGroupMutation
>;
export const deleteTabGroup = /* GraphQL */ `mutation DeleteTabGroup(
  $input: DeleteTabGroupInput!
  $condition: ModelTabGroupConditionInput
) {
  deleteTabGroup(input: $input, condition: $condition) {
    id
    data
    encrypted_with_password
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTabGroupMutationVariables,
  APITypes.DeleteTabGroupMutation
>;
