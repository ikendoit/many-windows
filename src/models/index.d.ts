import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type TabGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerTabGroup = {
  readonly id: string;
  readonly data: string;
  readonly encrypted_with_password?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTabGroup = {
  readonly id: string;
  readonly data: string;
  readonly encrypted_with_password?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TabGroup = LazyLoading extends LazyLoadingDisabled ? EagerTabGroup : LazyTabGroup

export declare const TabGroup: (new (init: ModelInit<TabGroup, TabGroupMetaData>) => TabGroup) & {
  copyOf(source: TabGroup, mutator: (draft: MutableModel<TabGroup, TabGroupMetaData>) => MutableModel<TabGroup, TabGroupMetaData> | void): TabGroup;
}