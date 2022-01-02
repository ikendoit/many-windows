import Amplify, { withSSRContext } from 'aws-amplify'
import config from "../aws-exports" // gitignored
import { TabGroup } from '../models';

// Amplify.Logger.LOG_LEVEL = 'DEBUG'

// Amplify SSR configuration needs to be done within each API route
Amplify.configure({
  ...config,
  ssr: true,
});

interface upsertTabGroupsInterface {
  id: string
  data: string
  encrypted_with_password: boolean
}

const upsertTabGroups = async (params: upsertTabGroupsInterface) => {
  const { DataStore } = withSSRContext();
  let tabGroup = await DataStore.query(TabGroup, params.id)

  let insertResponse = null
  let updateResponse = null

  // if not exist, create
  if (tabGroup == null) {

    console.log("Creating a new tab group");

    insertResponse = await DataStore.save(
      new TabGroup({
        "data": params.data,
        "encrypted_with_password": params.encrypted_with_password
      })
    );

  } else {

    console.log("Updating existing tab group");

    updateResponse = await DataStore.save(TabGroup.copyOf(tabGroup, item => {
      item.data = params.data;
      item.encrypted_with_password = params.encrypted_with_password;
    }));

  }

  return insertResponse || updateResponse

}

export default {
  configuredAwsAmplify: Amplify,
  configuredAwsWithSSRContext: withSSRContext,
  upsertTabGroups
} 