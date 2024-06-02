/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTabGroup = /* GraphQL */ `subscription OnCreateTabGroup($filter: ModelSubscriptionTabGroupFilterInput) {
  onCreateTabGroup(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTabGroupSubscriptionVariables,
  APITypes.OnCreateTabGroupSubscription
>;
export const onUpdateTabGroup = /* GraphQL */ `subscription OnUpdateTabGroup($filter: ModelSubscriptionTabGroupFilterInput) {
  onUpdateTabGroup(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTabGroupSubscriptionVariables,
  APITypes.OnUpdateTabGroupSubscription
>;
export const onDeleteTabGroup = /* GraphQL */ `subscription OnDeleteTabGroup($filter: ModelSubscriptionTabGroupFilterInput) {
  onDeleteTabGroup(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTabGroupSubscriptionVariables,
  APITypes.OnDeleteTabGroupSubscription
>;
