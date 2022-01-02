/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTabGroup = /* GraphQL */ `
  query GetTabGroup($id: ID!) {
    getTabGroup(id: $id) {
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
export const listTabGroups = /* GraphQL */ `
  query ListTabGroups(
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
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTabGroups = /* GraphQL */ `
  query SyncTabGroups(
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
      }
      nextToken
      startedAt
    }
  }
`;
