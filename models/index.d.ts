import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TabGroupsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TabGroups {
  readonly id: string;
  readonly data?: string;
  readonly url?: string;
  readonly access_password_hash?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TabGroups, TabGroupsMetaData>);
  static copyOf(source: TabGroups, mutator: (draft: MutableModel<TabGroups, TabGroupsMetaData>) => MutableModel<TabGroups, TabGroupsMetaData> | void): TabGroups;
}