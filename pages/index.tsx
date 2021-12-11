import React from 'react'
import type { NextPage } from 'next'
import { Button, message } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import { TabGroupShowWindowOrganization } from '../ui-components/TabGroupShowWindowOrganization'
import { TableGridDrawer } from '../ui-components/TableGridDrawer'
import styles from '../styles/Home.module.css'
import {PaneWindowCoordinates, PaneWindowsTab} from '../types/ui-components/index'

const defaultValue: PaneWindowsTab[] = [
  {
    tabTitle: "Default",
    tabContent: [{
        link: 'https://vnexpress.net',
        title: 'Vnexpress',
        nw: [0, 0],
        se: [7, 7]
      },
      {
        link: 'https://vietnamnet.vn',
        title: 'Vietnam net',
        nw: [8, 0],
        se: [16, 7]
      },
    ]
  },
  {
    tabTitle: "Ops",
    tabContent: [{
        link: 'https://youtube.com',
        title: 'Youtube',
        nw: [0, 0],
        se: [7, 7]
      },
      {
        link: 'https://github.com',
        title: 'Github',
        nw: [8, 0],
        se: [16, 7]
      },
    ]
  },
]

const Home: NextPage = () => {

  let [paneWindowsTabs, setPaneWindowsTabs] = React.useState<PaneWindowsTab[]>(defaultValue);
  let [paneWindowTabIndexInFocus, setPaneWindowTabIndexInFocus] = React.useState<number>(0);
  let [paneWindowIndexInFocus, setPaneWindowIndexInFocus] = React.useState<number>(0);
  let [windowPanes, setWindowPanes] = React.useState<PaneWindowCoordinates[]>(paneWindowsTabs[paneWindowTabIndexInFocus].tabContent);
  let [openedWindows, setOpenedWindows] = React.useState<(Window | null)[]>([]);

  const setWindowPanesAndRerender = () => {
    let tabFocusIndex = 0;
    if (paneWindowTabIndexInFocus < paneWindowsTabs.length) {
      tabFocusIndex = paneWindowTabIndexInFocus
    }
    setWindowPanes(paneWindowsTabs[tabFocusIndex].tabContent);
  }
  const setPaneWindowTabIndexInFocusAndRerender = (paneIndex: number) => {
    setPaneWindowTabIndexInFocus(paneIndex)
    setWindowPanes(paneWindowsTabs[paneIndex].tabContent);
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

    const windowWidth: number = window.screen.availWidth;
    const windowHeight: number = window.screen.availHeight;
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
      ));

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
    setOpenedWindows([...openedWindows]);

  }

  const triggerWebsitesClose = () => {

    for (let wdIndex = 0; wdIndex < openedWindows.length; wdIndex++) {
      const currentWindow: any = openedWindows[wdIndex];
      currentWindow.close();
    }
    openedWindows.splice(0);
    setOpenedWindows(openedWindows);

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Many Windows</title>
        <meta name="description" content="Many Windows, Tool to manage and open multiple websites organized on your whole screen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome back to <b>Many Windows</b>
        </h1>
        <br/>

        <Button className={styles.open_close_button} onClick={triggerWebsitesOpen}>Open Websites</Button>

        <Button className={styles.open_close_button} onClick={triggerWebsitesClose}>Close Websites</Button>

        <TabGroupShowWindowOrganization 
          paneWindowTabIndexInFocus={paneWindowTabIndexInFocus} 
          paneWindowsTabs={paneWindowsTabs} 
          paneWindowIndexInFocus={paneWindowIndexInFocus}
          setPaneWindowTabIndexInFocusAndRerender={setPaneWindowTabIndexInFocusAndRerender}
          setPaneWindowsTabsAndRerender={setPaneWindowsTabsAndRerender}
          setPaneWindowIndexAndRerender={setPaneWindowIndexAndRerender}
        />

        <TableGridDrawer 
          paneWindowsCoordinates={windowPanes} 
          paneWindowIndexInFocus={paneWindowIndexInFocus}
          setPaneWindowsCoordinates={setWindowPanes}
          setPaneWindowIndexAndRerender={setPaneWindowIndexAndRerender}
        />

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