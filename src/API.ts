/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTabGroupInput = {
  id?: string | null,
  data: string,
  encrypted_with_password?: boolean | null,
  _version?: number | null,
};

export type ModelTabGroupConditionInput = {
  data?: ModelStringInput | null,
  encrypted_with_password?: ModelBooleanInput | null,
  and?: Array< ModelTabGroupConditionInput | null > | null,
  or?: Array< ModelTabGroupConditionInput | null > | null,
  not?: ModelTabGroupConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type TabGroup = {
  __typename: "TabGroup",
  id: string,
  data: string,
  encrypted_with_password?: boolean | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateTabGroupInput = {
  id: string,
  data?: string | null,
  encrypted_with_password?: boolean | null,
  _version?: number | null,
};

export type DeleteTabGroupInput = {
  id: string,
  _version?: number | null,
};

export type ModelTabGroupFilterInput = {
  id?: ModelIDInput | null,
  data?: ModelStringInput | null,
  encrypted_with_password?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTabGroupFilterInput | null > | null,
  or?: Array< ModelTabGroupFilterInput | null > | null,
  not?: ModelTabGroupFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTabGroupConnection = {
  __typename: "ModelTabGroupConnection",
  items:  Array<TabGroup | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionTabGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  data?: ModelSubscriptionStringInput | null,
  encrypted_with_password?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTabGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionTabGroupFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateTabGroupMutationVariables = {
  input: CreateTabGroupInput,
  condition?: ModelTabGroupConditionInput | null,
};

export type CreateTabGroupMutation = {
  createTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTabGroupMutationVariables = {
  input: UpdateTabGroupInput,
  condition?: ModelTabGroupConditionInput | null,
};

export type UpdateTabGroupMutation = {
  updateTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTabGroupMutationVariables = {
  input: DeleteTabGroupInput,
  condition?: ModelTabGroupConditionInput | null,
};

export type DeleteTabGroupMutation = {
  deleteTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetTabGroupQueryVariables = {
  id: string,
};

export type GetTabGroupQuery = {
  getTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTabGroupsQueryVariables = {
  filter?: ModelTabGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTabGroupsQuery = {
  listTabGroups?:  {
    __typename: "ModelTabGroupConnection",
    items:  Array< {
      __typename: "TabGroup",
      id: string,
      data: string,
      encrypted_with_password?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTabGroupsQueryVariables = {
  filter?: ModelTabGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTabGroupsQuery = {
  syncTabGroups?:  {
    __typename: "ModelTabGroupConnection",
    items:  Array< {
      __typename: "TabGroup",
      id: string,
      data: string,
      encrypted_with_password?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateTabGroupSubscriptionVariables = {
  filter?: ModelSubscriptionTabGroupFilterInput | null,
};

export type OnCreateTabGroupSubscription = {
  onCreateTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTabGroupSubscriptionVariables = {
  filter?: ModelSubscriptionTabGroupFilterInput | null,
};

export type OnUpdateTabGroupSubscription = {
  onUpdateTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTabGroupSubscriptionVariables = {
  filter?: ModelSubscriptionTabGroupFilterInput | null,
};

export type OnDeleteTabGroupSubscription = {
  onDeleteTabGroup?:  {
    __typename: "TabGroup",
    id: string,
    data: string,
    encrypted_with_password?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
