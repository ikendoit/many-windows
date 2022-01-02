import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Home from '../index'
import serverTools from "../../server-components"
import { HomeComponentProps, PaneWindowsTab } from '../../types/ui-components'
import UnlockRequired from '../../ui-components/UnlockRequiredComponent'
import { useState } from 'react'
import { HydratedTabGroupLocked, HydratedTabGroupUnLocked } from '../../types/api-components'
import { message } from 'antd'
import { graphqlOperation } from 'aws-amplify'
import { getTabGroup } from '../../src/graphql/queries'

export default function Post(props: HomeComponentProps) {

  if (props.currentTabGroup === null) {
    message.error("Many Windows View Not found, using default view")
    return (
      <Home
        currentTabGroup={null}
      />
    )
  }

  const [currentTabGroup, setCurrentTabGroup] = useState<HydratedTabGroupUnLocked | HydratedTabGroupLocked>(props.currentTabGroup);

  const unlockTabGroupData = (newData: PaneWindowsTab[]) => {

    currentTabGroup.data = newData;

    if (typeof currentTabGroup.data === 'string') throw new Error("ERROR #TGI-20")

    setCurrentTabGroup({
      ...currentTabGroup,
      unlocked: true,
    } as HydratedTabGroupUnLocked);
  }

  if (currentTabGroup.unlocked === false) {

    if (typeof currentTabGroup.data !== "string") throw new Error('ERROR #TGI-17')

    return (
      <UnlockRequired currentTabGroupId={currentTabGroup.id} paneWindowsTabsEncrypted={currentTabGroup.data} unlockTabGroupData={unlockTabGroupData} />
    )
  }
  return (
    <Home
      currentTabGroup={props.currentTabGroup}
    />
  )

}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomeComponentProps>> {

  try {
    const { API } = serverTools.configuredAwsWithSSRContext();
    const tabGroupQueryResponse = await API.graphql(graphqlOperation(getTabGroup, {
      id: context.query.tabGroupId
    }))
    const tabGroup = tabGroupQueryResponse.data.getTabGroup
    let unlocked = true;

    // Both these should be true when encrypted, using "or" just in case
    if (tabGroup.encrypted_with_password === true || tabGroup.data.match('^encrypted_')) {
      unlocked = false;
    }

    if (unlocked) {

      const parsedJsonData: PaneWindowsTab[] = JSON.parse(tabGroup.data) // just 1 isn't enough, why?

      return {
        props: {
          currentTabGroup: {
            id: tabGroup.id,
            data: parsedJsonData,
            encrypted_with_password: tabGroup.encrypted_with_password,
            unlocked: true
          }
        }
      }
    }

    return {
      props: {
        currentTabGroup: {
          id: tabGroup.id,
          data: tabGroup.data,
          encrypted_with_password: tabGroup.encrypted_with_password,
          unlocked: false
        }
      }
    }

  } catch (err) {

    // TODO: research apps logs telemetry on Amplify
    console.log('err on loading: ', err)

    return {
      props: {
        currentTabGroup: null
      }
    }

  }

}