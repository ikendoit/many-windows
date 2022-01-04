import React, { Ref } from 'react'
import styles from '../styles/Home.module.css'
import { Input, Button, message, Modal } from 'antd'
import {
  CopyOutlined, TeamOutlined, UnlockOutlined, UserOutlined 
} from '@ant-design/icons';

interface HeaderBarComponentProps {
  changeVisibility: (visibility: "PUBLIC" | "PRIVATE") => (password?: string) => Promise<void>
  saveThisTabGroup: (overwriteEncryptedWithPassword: boolean, encryptionPassword: string) => void
  tabGroupIsEncrypted: boolean
  tabGroupIsSavedToCloud: boolean
  tabGroupCanBeSaved: boolean
}

function HeaderBarComponent(props: HeaderBarComponentProps) {

  const [modalPasswordEncryptShow, setModalPasswordEncryptShow] = React.useState<boolean>(false)
  const refPasswordInputOne = React.useRef<Ref<Input>>() as Ref<Input>
  const refPasswordInputTwo = React.useRef<Ref<Input>>() as Ref<Input>

  const showModal = () => {
    setModalPasswordEncryptShow(true)
  };

  const handleModalOk = () => {

    // check if 2 passwords input match 

    if (refPasswordInputOne == null || refPasswordInputTwo == null) {
      throw new Error("ERROR #HBC-31")
    }

    const pwdOne = (refPasswordInputOne as { current: any}).current.input.value
    const pwdTwo = (refPasswordInputTwo as { current: any}).current.input.value

    if (pwdOne !== pwdTwo) {
      message.error("Passwords don't align, try again")
      return
    }

    if (pwdOne.length < 6) {
      message.error("Password Length must be longer than 6 characters")
      return
    }

    props.changeVisibility('PRIVATE')(pwdOne)
    setModalPasswordEncryptShow(false)
  };

  const handleModalCancel = () => {
    message.info("Cancelled setting visibility, Your many-windows view are Public.")
    setModalPasswordEncryptShow(false)
  };

  return (
    <div className={styles.header_menu}>
      <Button disabled={!props.tabGroupCanBeSaved} className={styles.header_menu_button} onClick={() => props.saveThisTabGroup(props.tabGroupIsEncrypted, "")}><CopyOutlined /> Save this group</Button>
      {
        props.tabGroupIsEncrypted === true ?
          <Button disabled={!props.tabGroupIsSavedToCloud} className={styles.header_menu_button} onClick={() => props.changeVisibility('PUBLIC')()}><TeamOutlined /> Make Public</Button>
          : <Button disabled={!props.tabGroupIsSavedToCloud} className={styles.header_menu_button} onClick={showModal}><UserOutlined /> Make Private</Button>
      }

      <Modal
        title="Basic Modal"
        visible={modalPasswordEncryptShow}
        onOk={handleModalOk}
        okText={"Encrypt View"}
        onCancel={handleModalCancel}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
      >
        <h2>
          Enter password to encrypt your many-windows view:
        </h2>

        <Input
          placeholder="Password to encrypt"
          size="large"
          ref={refPasswordInputOne}
        />

        <Input
          placeholder="Type Password again"
          size="large"
          ref={refPasswordInputTwo}
        />
      </Modal>
    </div>
  )

}

export default HeaderBarComponent
