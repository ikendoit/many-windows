import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Home from '../index'
import serverTools from "../../server-components"
import { HomeComponentProps, PaneWindowsTab } from '../../types/ui-components'
import { TabGroup } from '../../models'
import UnlockRequired from '../../ui-components/UnlockRequiredComponent'
import { useState } from 'react'
import { HydratedTabGroupLocked, HydratedTabGroupUnLocked } from '../../types/api-components'

export default function Post(props: HomeComponentProps) {

  if (props.currentTabGroup === null) throw new Error("Error #TGI-10")

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
    const { DataStore } = serverTools.configuredAwsWithSSRContext();
    const tabGroup = await DataStore.query(TabGroup, context.query.tabGroupId)
    let unlocked = true;

    // fail safe, in perfect world, both these should be true when encrypted
    if (tabGroup.encrypted_with_password === true || tabGroup.data.match('^encrypted_')) {
      unlocked = false;
      console.log("encrypted data")
      // check local storage, if this id exists, decrypt data with that. 
      console.log("checking local storage for existing passwords")
      // if local storage is empty, store as string so we can prompt user later
      console.log("If password exists for this id, try to decrypt it it.")

      console.log('setting unlocked: true/false')
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