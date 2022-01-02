/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTabGroup = /* GraphQL */ `
  mutation CreateTabGroup(
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
    }
  }
`;
export const updateTabGroup = /* GraphQL */ `
  mutation UpdateTabGroup(
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
    }
  }
`;
export const deleteTabGroup = /* GraphQL */ `
  mutation DeleteTabGroup(
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
    }
  }
`;
