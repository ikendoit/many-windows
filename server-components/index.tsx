import Amplify, { withSSRContext, graphqlOperation, AUTH_TYPE} from 'aws-amplify'
import config from "../aws-exports" // gitignored
import { createTabGroup, updateTabGroup } from '../src/graphql/mutations';
import { getTabGroup } from '../src/graphql/queries';

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
  const { API } = withSSRContext();
  let tabGroupQueryResponse = await API.graphql(graphqlOperation(getTabGroup, {
    id: params.id
  }))
  const tabGroup = tabGroupQueryResponse.data.getTabGroup

  let insertResponse = null
  let updateResponse = null

  // if not exist, create
  if (tabGroup == null) {

    console.log("Creating a new tab group");

    insertResponse = await API.graphql(graphqlOperation(createTabGroup, {
      input: {
        "data": params.data,
        "encrypted_with_password": params.encrypted_with_password
      }
    }))

  } else {

    console.log("Updating existing tab group");

    updateResponse = await API.graphql(graphqlOperation(updateTabGroup, {
      input: {
        "id": params.id,
        "data": params.data,
        "encrypted_with_password": params.encrypted_with_password,
        "_version": tabGroup._version
      }
    }))

  }

  if (insertResponse !== null) {
    return insertResponse.data.createTabGroup
  } else {
    return updateResponse.data.updateTabGroup
  }

}

export default {
  configuredAwsAmplify: Amplify,
  configuredAwsWithSSRContext: withSSRContext,
  upsertTabGroups
} 