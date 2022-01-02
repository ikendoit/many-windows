import React from 'react'
import { Button, message } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// UI Components
import {
  PaneWindowCoordinates, 
  PaneWindowsTab, 
  HomeComponentProps, 
  encryptData 
} from '../types/ui-components/index'
import { TabGroupShowWindowOrganization } from '../ui-components/TabGroupShowWindowOrganization'
import {DEFAULT_TAB_GROUP} from '../ui-components/Constants'
import { TableGridDrawer } from '../ui-components/TableGridDrawer'
import HeaderBarComponent from '../ui-components/HeaderBarComponent';

// API Components
import {HydratedTabGroupUnLocked} from '../types/api-components/index'


const defaultTabGroup: HydratedTabGroupUnLocked = DEFAULT_TAB_GROUP;

function Home(props: HomeComponentProps) {

  const currentTabGroup = props.currentTabGroup || defaultTabGroup

  // When we communicate Post/Update/Create rule to API, 
  // This object should be merged with paneWindowTabs object, because the two objects (parent & child) might be out of sync
  // This code will be improved 
  // Additionally, when receiving new tabGroup data from clients, both this object and paneWindowsTabs should have their state updated.
  // tags: frontend, rules, logic, technical-logic, data-parse
  let [paneWindowsTabsMeta, setPaneWindowsTabsMeta] = React.useState<{id: string, encrypted_with_password: boolean, unlocked: boolean}>({
    id: currentTabGroup.id,
    encrypted_with_password: currentTabGroup.encrypted_with_password || false,
    unlocked: currentTabGroup.unlocked
  })

  // Refer to paneWindowsTabsMeta above
  // tags: frontend, rules, logic, technical-logic, data-parse
  let [paneWindowsTabs, setPaneWindowsTabs] = React.useState<PaneWindowsTab[]>(currentTabGroup.data as PaneWindowsTab[])

  let [paneWindowTabIndexInFocus, setPaneWindowTabIndexInFocus] = React.useState<number>(0)
  let [paneWindowIndexInFocus, setPaneWindowIndexInFocus] = React.useState<number>(0)
  let [windowPanes, setWindowPanes] = React.useState<PaneWindowCoordinates[]>(paneWindowsTabs[paneWindowTabIndexInFocus].tabContent)
  let [openedWindows, setOpenedWindows] = React.useState<(Window | null)[]>([])

  const setWindowPanesAndRerender = () => {
    let tabFocusIndex = 0
    if (paneWindowTabIndexInFocus < paneWindowsTabs.length) {
      tabFocusIndex = paneWindowTabIndexInFocus
    }
    setWindowPanes(paneWindowsTabs[tabFocusIndex].tabContent)
  }
  const setPaneWindowTabIndexInFocusAndRerender = (paneIndex: number) => {
    setPaneWindowTabIndexInFocus(paneIndex)
    setWindowPanes(paneWindowsTabs[paneIndex].tabContent)
  }
  const setPaneWindowsTabsAndRerender = (paneWindowsTab: PaneWindowsTab[]) => {
    setPaneWindowsTabs(paneWindowsTab)
    setWindowPanesAndRerender()
  }
  const setPaneWindowIndexAndRerender = (paneWindowIndex: number) => {
    setPaneWindowIndexInFocus(paneWindowIndex)
    setWindowPanesAndRerender()
  }

  const configStringGenerate = (height: string | number, width: string | number, top: string | number, left: string | number) => (
    `height=${height},width=${width},top=${top},left=${left},scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes`
  )
  const triggerWebsitesOpen = () => {

    const windowWidth: number = window.screen.availWidth
    const windowHeight: number = window.screen.availHeight
    const unitCellWidth = windowWidth / 20
    const unitCellHeight = windowHeight / 20

    windowPanes.forEach(windowPane => {
      const height = windowPane.se[0] - windowPane.nw[0]
      const width = windowPane.se[1] - windowPane.nw[1]
      const windowRef = window.open(windowPane.link, '_blank', configStringGenerate(
        unitCellHeight * height,
        unitCellWidth * width + unitCellWidth,
        unitCellHeight * windowPane.nw[0],
        unitCellWidth * windowPane.nw[1]
      ))

      if (windowRef === null) {
        if (openedWindows[0] != null) {
          openedWindows[0].close()
        }

        message.error(
          <div>
            <p> Please enable Popup </p>
            <Image src="/enable-popups.png" alt="Enable Popup Guide" width={1500} height={500} />
          </div>,
          10
        )
      }
      openedWindows.push(windowRef)
    })
    setOpenedWindows([...openedWindows])

  }

  const triggerWebsitesClose = () => {

    for (let wdIndex = 0; wdIndex < openedWindows.length; wdIndex++) {
      const currentWindow: any = openedWindows[wdIndex]
      currentWindow.close()
    }
    openedWindows.splice(0)
    setOpenedWindows(openedWindows)

  }

  // TODO: research how we can get setState() to work synchronously, so we
  // avoid passing this override
  const saveThisTabGroup = async (overwriteEncryptedWithPassword: boolean = false, encryptionPassword: string = "") => {

    let paneWindowsTabsDataToUpload = JSON.stringify(paneWindowsTabs);
    if (overwriteEncryptedWithPassword === true && encryptionPassword != "") {
      // generate encrypted data
      paneWindowsTabsDataToUpload = await encryptData(encryptionPassword, paneWindowsTabsDataToUpload)

    }

    // send to server
    const responseRaw = await fetch(`${location.origin}/api/tab_groups/${paneWindowsTabsMeta.id}`, {
      method: "POST",
      body: JSON.stringify({
        id: paneWindowsTabsMeta.id,
        encrypted_with_password: overwriteEncryptedWithPassword,
        data: paneWindowsTabsDataToUpload
      })
    })

    const responseJson = await responseRaw.json()

    navigator.clipboard.writeText(`${location.origin}/tab-group/${responseJson.id}`);
    location.href = `${location.origin}/tab-group/${responseJson.id}`
    message.info("Copied link to Clipboard")

  }

  const changeVisibility = (visibility: "PUBLIC" | "PRIVATE") => async (userInputPassword: string = "") => {

    if ( visibility === 'PUBLIC') {

      // prompt to type password
      // set encrypted to false then save current web-ui data on database

      setPaneWindowsTabsMeta({
        id: paneWindowsTabsMeta.id,
        encrypted_with_password: false,
        unlocked: true
      })

      await saveThisTabGroup(false)

    } else if (visibility === 'PRIVATE') {

      // prompt to type password, store to local storage
      // set encrypted to true then save current web-ui data on database
      // storing to local storage 

      setPaneWindowsTabsMeta({
        id: paneWindowsTabsMeta.id,
        encrypted_with_password: true,
        unlocked: true
      })

      await saveThisTabGroup(true, userInputPassword)

    }

  }

  return (
    <div className={styles.container}>

      <Head>
        <meta name="description" content="Many Windows, Tool to manage and open multiple websites organized on your whole screen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBarComponent
        changeVisibility={changeVisibility}
        saveThisTabGroup={saveThisTabGroup}
        tabGroupIsEncrypted={paneWindowsTabsMeta.encrypted_with_password}
        tabGroupIsSavedToCloud={paneWindowsTabsMeta.id !== 'null'}
        tabGroupCanBeSaved={true}
      />
      <title>Many Windows</title>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome back to <b>Many Windows</b>
        </h1>
        <br />

        <Button className={styles.open_close_button} onClick={triggerWebsitesOpen}>Open Websites</Button>

        <Button className={styles.open_close_button} onClick={triggerWebsitesClose}>Close Websites</Button>

        <TabGroupShowWindowOrganization
          paneWindowTabIndexInFocus={paneWindowTabIndexInFocus}
          paneWindowsTabs={paneWindowsTabs}
          paneWindowIndexInFocus={paneWindowIndexInFocus}
          closeAllOpenedWindows={triggerWebsitesClose}
          setPaneWindowTabIndexInFocusAndRerender={setPaneWindowTabIndexInFocusAndRerender}
          setPaneWindowsTabsAndRerender={setPaneWindowsTabsAndRerender}
          setPaneWindowIndexAndRerender={setPaneWindowIndexAndRerender} />

        <TableGridDrawer
          paneWindowsCoordinates={windowPanes}
          paneWindowIndexInFocus={paneWindowIndexInFocus}
          setPaneWindowsCoordinates={setWindowPanes}
          setPaneWindowIndexAndRerender={setPaneWindowIndexAndRerender} />

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home