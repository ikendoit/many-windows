import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { Input, message } from 'antd'
import {
  UnlockOutlined 
} from '@ant-design/icons';
import {decryptData, PaneWindowsTab} from '../types/ui-components/index'
import HeaderBarComponent from './HeaderBarComponent';

const { Search } = Input;
const passwordInputSuffix = (
  <UnlockOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

interface UnlockRequiredComponentProps {
  paneWindowsTabsEncrypted: string
  currentTabGroupId: string
  unlockTabGroupData: (newData: PaneWindowsTab[]) => void
}

function UnlockRequiredComponent(props: UnlockRequiredComponentProps) {

  const onPasswordSubmit = async (userInput: string) =>{

    let decryptedDataString = null
    let decryptedDataJson = null

    try {
      decryptedDataString = await decryptData(userInput, props.paneWindowsTabsEncrypted)
    } catch(err) {
      message.error("Invalid Password, please retry")
      console.log(err)
      return;
    }

    try {
      if (!decryptedDataString) throw new Error("No response after decrypting");
      decryptedDataJson = JSON.parse(decryptedDataString)
    } catch(err) {
      message.error("Error using decrypted data, please contact developer")
      console.log(err)
      return;
    }


    // if yes, decrypt data, set state to home component to use decrypted object
    //   then store to local storage
    localStorage.setItem(props.currentTabGroupId, userInput);

    props.unlockTabGroupData(decryptedDataJson)

  }

  // Before render, check if we can unlock using password stored in localStorage
  if (typeof window !== "undefined") {
    const cachedPassword = localStorage.getItem(props.currentTabGroupId)
    if (cachedPassword) {
      onPasswordSubmit(cachedPassword)
    }
  }


  return (
    <div className={styles.container}>

      <Head>
        <meta name="description" content="Many Windows, Tool to manage and open multiple websites organized on your whole screen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBarComponent
        changeVisibility={(_: "PUBLIC" | "PRIVATE") => async (_?: string) => {}}
        saveThisTabGroup={() => {}}
        tabGroupIsEncrypted={false}
        tabGroupIsSavedToCloud={false}
        tabGroupCanBeSaved={false}
      />
      <title>Many Windows</title>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome back to <b>Many Windows</b>
        </h1>
        <br />

        <h2>
          Please enter password:
        </h2>

        <Search
          placeholder="Password to unlock"
          enterButton="Unlock"
          size="large"
          suffix={passwordInputSuffix}
          onSearch={onPasswordSubmit}
        />

      </main>

      <footer className={`${styles.footer} ${styles.footer_fixed_bottom_position}`}>
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

export default UnlockRequiredComponent