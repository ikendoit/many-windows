import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TabGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TabGroup {
  readonly id: string;
  readonly data: string;
  readonly encrypted_with_password?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TabGroup, TabGroupMetaData>);
  static copyOf(source: TabGroup, mutator: (draft: MutableModel<TabGroup, TabGroupMetaData>) => MutableModel<TabGroup, TabGroupMetaData> | void): TabGroup;
}