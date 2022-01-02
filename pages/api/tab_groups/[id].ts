import type { NextApiResponse } from 'next'
import { TabGroup } from '../../../models'
import { DehydratedTabGroup } from '../../../types/api-components'
import serverTools from "../../../server-components/index"

type Data = {
  message: string
}

export default async function handler(
  req: any,
  res: NextApiResponse<Data>
) {

  try {

    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }

    const { DataStore } = serverTools.configuredAwsWithSSRContext({req});
    const { query } = req
    const { id } = query
    const body: DehydratedTabGroup = JSON.parse(req.body)
    let tabGroup = await DataStore.query(TabGroup, id)

    let insertResponse = null
    let updateResponse = null

    // if not exist, create
    if (tabGroup == null) {

      console.log("Creating a new tab group");

      insertResponse = await DataStore.save(
        new TabGroup({
          "data": body.data,
          "encrypted_with_password": body.encrypted_with_password
        })
      );

    } else {

      console.log("Updating existing tab group");

      updateResponse = await DataStore.save(TabGroup.copyOf(tabGroup, item => {
        item.data = body.data;
        item.encrypted_with_password = body.encrypted_with_password;
      }));

    }

    res.status(200).json(insertResponse || updateResponse)

  } catch(err) {

    console.log('Error: ', err)
    res.status(400).json({message: "Error during the api request."})

  }
}
