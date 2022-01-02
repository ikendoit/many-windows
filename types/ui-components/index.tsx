// Remember: [row, column] ordering

import { HydratedTabGroupUnLocked, HydratedTabGroupLocked } from "../api-components";

// tags: frontend, rules, logic, technical-logic, data-parse
export interface PaneWindowCoordinates {
  key?: string | undefined
  link: string
  title: string
  nw: [number, number] // [row, column]
  se: [number, number] // [row, column]
}

export interface PaneWindowsTab {
  tabTitle: string
  tabContent: PaneWindowCoordinates[]
} 

export interface HomeComponentProps {
  currentTabGroup: HydratedTabGroupUnLocked | HydratedTabGroupLocked | null
}

function stringToUint8ArrayLimitedLength(str: string): Uint8Array {
  let buf = new ArrayBuffer(32); // AES requires key to be exactly 32 chars
  let bufView = new Uint8Array(buf);
  for (let i=0, strLen=str.length; i < strLen; i++) {
    const arrBufferIndex = i >= 32 ? i % 32 : i;
    bufView[arrBufferIndex] += str.charCodeAt(i);
  }
  return bufView;
}

function arrayBufferToString(buf: ArrayBuffer): string {
  // @ts-ignore
  return String.fromCharCode(...new Uint8Array(buf));
}

function stringToArrayBuffer(str: string): ArrayBuffer {
  const strLen = str.length
  const buf = new ArrayBuffer(strLen);
  const bufView = new Uint8Array(buf)
  for (let i=0; i < strLen; i++) {
    bufView[i] += str.charCodeAt(i);
  }
  return buf;
}
function generateAES_IV_12_FromString(inputStr: string): Uint8Array {
  var buf = new ArrayBuffer(12); // iv for AES-CGM is recommended to be 12 bytes
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=inputStr.length; i < strLen; i++) {
    const arrBufferIndex = i >= 32 ? i % 32 : i;
    bufView[arrBufferIndex] += inputStr.charCodeAt(i);
  }
  return bufView;
}

export async function encryptData(userPwd: string, data: string): Promise<string> {

  const userPwdBuffer = stringToUint8ArrayLimitedLength(userPwd);
  const textEncoder = new TextEncoder();
  const encodedData = textEncoder.encode(data);

  const encryptionKey = await window.crypto.subtle.importKey(
    "raw",
    userPwdBuffer,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  )

  const iv = generateAES_IV_12_FromString(userPwd);
  const encryptedDataArrayBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    encryptionKey,
    encodedData
  )
  const encryptedData = `encrypted_${arrayBufferToString(encryptedDataArrayBuffer)}`

  return encryptedData

}

export async function decryptData(userPwd: string, data: string): Promise<string | undefined> {

  if (!data.includes('encrypted_')) throw new Error("Data Already Decrypted")

  const userPwdBuffer = stringToUint8ArrayLimitedLength(userPwd);
  const nonHeaderEncryptedData = stringToArrayBuffer(data.slice("encrypted_".length))
  const iv = generateAES_IV_12_FromString(userPwd);

  const encryptionKey = await window.crypto.subtle.importKey(
    "raw",
    userPwdBuffer,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  )

  const decryptedDataArrayBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    encryptionKey,
    nonHeaderEncryptedData
  );

  const decryptedData = arrayBufferToString(decryptedDataArrayBuffer)

  return decryptedData

}

