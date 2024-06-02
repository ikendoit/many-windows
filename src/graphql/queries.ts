/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTabGroup = /* GraphQL */ `query GetTabGroup($id: ID!) {
  getTabGroup(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTabGroupQueryVariables,
  APITypes.GetTabGroupQuery
>;
export const listTabGroups = /* GraphQL */ `query ListTabGroups(
  $filter: ModelTabGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listTabGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTabGroupsQueryVariables,
  APITypes.ListTabGroupsQuery
>;
export const syncTabGroups = /* GraphQL */ `query SyncTabGroups(
  $filter: ModelTabGroupFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTabGroups(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTabGroupsQueryVariables,
  APITypes.SyncTabGroupsQuery
>;
